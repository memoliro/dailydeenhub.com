#!/usr/bin/env python3
"""Build per-verse timing fractions for the DailyDeenHub Quran player.

For each reciter x chapter: fetch the first 8KB of every per-verse MP3 from
everyayah.com via HTTP Range, parse the Xing/Info header (VBR) or fall back to
CBR size/bitrate math, and write cumulative start-time fractions (0.0-1.0).

Output: ~/workspace/dailydeenhub/timings/{reciter_id}/{chapter}.json
"""
import json
import os
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone

import requests

OUT = os.path.expanduser("~/workspace/dailydeenhub/timings")

RECITERS = {
    "7": "Alafasy_128kbps",
    "3": "Abdurrahmaan_As-Sudais_192kbps",
    "9": "Minshawy_Murattal_128kbps",
    "2": "Abdul_Basit_Murattal_192kbps",
}

# Standard Madani verse counts for chapters 1..114
VERSE_COUNTS = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128,
    111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73,
    54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60,
    49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52,
    44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19,
    26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3,
    6, 3, 5, 4, 5, 6,
]
assert len(VERSE_COUNTS) == 114 and sum(VERSE_COUNTS) == 6236, "verse counts wrong"

BR_MPEG1_L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0]
BR_MPEG2_L3 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0]

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"


def parse_duration(head, total_size):
    """Return duration in seconds from the first bytes of an MP3, or None."""
    data = head
    pos = 0
    # Skip ID3v2 tags (there can be more than one in theory)
    for _ in range(3):
        if len(data) >= pos + 10 and data[pos:pos + 3] == b"ID3":
            size = ((data[pos + 6] & 0x7F) << 21) | ((data[pos + 7] & 0x7F) << 14) | \
                   ((data[pos + 8] & 0x7F) << 7) | (data[pos + 9] & 0x7F)
            pos += 10 + size
        else:
            break
    # Find a valid MPEG audio frame sync
    while pos < len(data) - 4:
        if data[pos] == 0xFF and (data[pos + 1] & 0xE0) == 0xE0:
            b1, b2 = data[pos + 1], data[pos + 2]
            ver, lay = (b1 >> 3) & 3, (b1 >> 1) & 3
            bri, sri = (b2 >> 4) & 15, (b2 >> 2) & 3
            if ver != 1 and lay != 0 and bri not in (0, 15) and sri != 3:
                break
        pos += 1
    else:
        return None
    hdr = data[pos:pos + 4]
    ver = (hdr[1] >> 3) & 3
    lay = (hdr[1] >> 1) & 3
    prot = hdr[1] & 1
    bri = (hdr[2] >> 4) & 15
    sri = (hdr[2] >> 2) & 3
    if lay != 1:  # not Layer 3
        return None
    # Path 1: Xing/Info header (VBR)
    side_info = 32 if ver == 3 else 17
    xoff = pos + 4 + (0 if prot else 2) + side_info
    if xoff + 12 <= len(data) and data[xoff:xoff + 4] in (b"Xing", b"Info"):
        flags = int.from_bytes(data[xoff + 4:xoff + 8], "big")
        if flags & 1:
            frames = int.from_bytes(data[xoff + 8:xoff + 12], "big")
            if frames > 0:
                if ver == 3:
                    sr, spf = (44100, 48000, 32000)[sri], 1152
                elif ver == 2:
                    sr, spf = (22050, 24000, 16000)[sri], 576
                else:
                    sr, spf = (11025, 12000, 8000)[sri], 576
                return frames * spf / sr
    # Path 2: CBR fallback from file size + bitrate
    tbl = BR_MPEG1_L3 if ver == 3 else BR_MPEG2_L3
    bitrate = tbl[bri] * 1000
    if bitrate > 0 and total_size and total_size > 0:
        return total_size * 8 / bitrate
    return None


_tls = threading.local()


def get_session():
    s = getattr(_tls, "session", None)
    if s is None:
        s = requests.Session()
        s.headers.update({"User-Agent": UA})
        _tls.session = s
    return s


def fetch_duration(edition, key):
    """Duration of one verse file, or None after retries."""
    url = f"https://everyayah.com/data/{edition}/{key}.mp3"
    sess = get_session()
    for attempt in range(4):
        try:
            r = sess.get(url, headers={"Range": "bytes=0-8191"}, timeout=15)
            if r.status_code == 429:
                time.sleep(5 * (attempt + 1))
                continue
            if r.status_code not in (200, 206):
                raise RuntimeError(f"HTTP {r.status_code}")
            data = r.content[:8192]
            total = len(r.content)
            cr = r.headers.get("Content-Range")
            if cr and "/" in cr:
                try:
                    total = int(cr.rsplit("/", 1)[1])
                except ValueError:
                    pass
            d = parse_duration(data, total)
            if d is not None and 0.2 <= d <= 600:
                return d
            raise RuntimeError("duration parse failed")
        except Exception:
            if attempt < 3:
                time.sleep(1.5 * (attempt + 1))
    return None


def build_chapter(reciter_id, chapter):
    edition = RECITERS[reciter_id]
    n = VERSE_COUNTS[chapter - 1]
    durations = []
    failed = []
    for v in range(1, n + 1):
        key = f"{chapter:03d}{v:03d}"
        d = fetch_duration(edition, key)
        if d is None:
            failed.append(v)
            durations.append(None)
        else:
            durations.append(d)
        time.sleep(0.03)  # be polite between requests
    if failed:
        known = [x for x in durations if x]
        if not known or len(failed) / n > 0.10:
            return {"ok": False, "failed_verses": failed, "verses": n}
        med = sorted(known)[len(known) // 2]
        durations = [x if x else med for x in durations]
    total = sum(durations)
    fracs, acc = [], 0.0
    for d in durations:
        fracs.append(round(acc / total, 4))
        acc += d
    out_dir = os.path.join(OUT, reciter_id)
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, f"{chapter}.json"), "w") as f:
        json.dump(fracs, f)
    return {"ok": True, "failed_verses": failed, "verses": n}


def main():
    only = sys.argv[1:]  # e.g. "7:114" to build just one chapter
    jobs = []
    if only:
        for spec in only:
            rid, ch = spec.split(":")
            jobs.append((rid, int(ch)))
    else:
        for rid in RECITERS:
            for ch in range(1, 115):
                jobs.append((rid, ch))
    results = {}
    done = 0
    lock = threading.Lock()

    def run(job):
        nonlocal done
        rid, ch = job
        res = build_chapter(rid, ch)
        with lock:
            done += 1
            results[f"{rid}:{ch}"] = res
            if done % 20 == 0 or done == len(jobs):
                print(f"[{done}/{len(jobs)}] reciter={rid} chapter={ch} ok={res['ok']}",
                      flush=True)
        return job, res

    with ThreadPoolExecutor(max_workers=15) as ex:
        list(ex.map(run, jobs))

    if only:
        print(json.dumps(results, indent=1))
        return

    # Manifest
    manifest = {
        "built_at": datetime.now(timezone.utc).isoformat(),
        "method": "everyayah.com per-verse MP3: Xing/Info frame count (VBR) or "
                  "file-size/bitrate (CBR); cumulative start fractions rounded to 4dp",
        "reciters": {},
    }
    for rid, edition in RECITERS.items():
        built = [int(k.split(":")[1]) for k, r in results.items()
                 if k.startswith(rid + ":") and r["ok"]]
        failed = [int(k.split(":")[1]) for k, r in results.items()
                  if k.startswith(rid + ":") and not r["ok"]]
        est = {str(ch): results[f"{rid}:{ch}"]["failed_verses"]
               for ch in built if results[f"{rid}:{ch}"]["failed_verses"]}
        verses = sum(results[f"{rid}:{ch}"]["verses"] for ch in built)
        manifest["reciters"][rid] = {
            "edition": edition,
            "chapters_expected": 114,
            "chapters_built": len(built),
            "failed_chapters": sorted(failed),
            "verses_total": verses,
            "estimated_verses_by_chapter": est,
        }
    with open(os.path.join(OUT, "MANIFEST.json"), "w") as f:
        json.dump(manifest, f, indent=1)
    print("MANIFEST written")
    print(json.dumps({r: {k: v for k, v in m.items() if k != "estimated_verses_by_chapter"}
                      for r, m in manifest["reciters"].items()}, indent=1))


if __name__ == "__main__":
    main()
