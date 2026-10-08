const METHODS = [
  [2, "ISNA (North America)"],
  [13, "Diyanet İşleri Başkanlığı"],
  [3, "Muslim World League"],
  [4, "Umm al-Qura, Makkah"],
  [5, "Egyptian General Authority"],
  [1, "Karachi"],
  [9, "Kuwait"],
  [10, "Qatar"],
  [11, "Singapore"],
  [12, "UOIF, France"],
  [15, "Moonsighting Committee"]
];
const RECITERS = [
  [7, "Mishari Rashid al-Afasy"],
  [3, "Abdur-Rahman as-Sudais"],
  [6, "Mahmoud Khalil al-Husary"],
  [9, "Mohamed Siddiq al-Minshawi"],
  [2, "AbdulBaset AbdulSamad"]
];
const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const SALAH = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const AYAH = [
  { ref: "Ar-Ra'd 13:28", ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", en: "Surely in the remembrance of Allah hearts find rest.", tr: "Kalpler ancak Allah’ı anmakla huzur bulur." },
  { ref: "Al-Inshirah 94:6", ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "Indeed, with hardship comes ease.", tr: "Şüphesiz her güçlükle birlikte bir kolaylık vardır." },
  { ref: "Al-Baqarah 2:186", ar: "فَإِنِّي قَرِيبٌ", en: "Indeed I am near.", tr: "Şüphesiz ben çok yakınım." },
  { ref: "At-Tawbah 9:40", ar: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", en: "Do not grieve; indeed Allah is with us.", tr: "Üzülme, Allah bizimle beraberdir." }
];
const I18N = {
  en: {
    tag: "Prayer times", next: "Next prayer", monthTab: "Month", qiblaTab: "Qibla", quranTab: "Quran", quietTab: "Quiet",
    monthTitle: "This month", monthSub: "Imsak through isha for the selected place.", thDate: "Date",
    fajr: "Fajr", sun: "Sunrise", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha",
    ayahTitle: "A verse for the day", qiblaTitle: "Qibla", compass: "Use compass", howTitle: "How to use it",
    quranTitle: "Quran", play: "Play", pause: "Pause", tasbihTitle: "Tasbih", tap: "Tap to count", reset: "Reset",
    focusTitle: "No ads", placeTitle: "Place", gps: "Use my location", close: "Close", setTitle: "Settings",
    method: "Calculation method", madhab: "Asr madhab", notify: "Notify while this tab is open", done: "Done",
    searchPh: "Search a city", surahPh: "Find a surah",
    methodNote: "Times are calculated, not an official mosque feed. Diyanet suits Turkey; ISNA is the Montreal default.",
    names: { Fajr: "Fajr", Sunrise: "Sunrise", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" },
    remaining: "remaining", at: "at", passed: "passed", now: "now",
    kerahat: "Discouraged time — the sun is rising, at its peak, or setting.",
    qiblaHint: "Direction of the Kaaba from this place.",
    howBody: "Hold the phone flat, enable the compass, and turn until the gold needle points up.",
    tasbihNote: "33 Subhanallah, 33 Alhamdulillah, 34 Allahu akbar. Saved on this device.",
    focusBody: "Prayer times, qibla, the month, and a Quran reader. No accounts, no ads, no tracking.",
    footer: "Times from the Aladhan engine. Quran text and audio from Quran.com. A local mosque may differ by a minute.",
    loading: "Loading times…", noResults: "No matches.", searching: "Searching…", gpsFail: "Location unavailable.",
    notified: "Prayer time", toward: "Enable the compass, or turn until the needle meets north.",
    left: "left", right: "right", facing: "You are facing qibla.", loadFail: "Could not load times."
  },
  tr: {
    tag: "Namaz vakitleri", next: "Sonraki vakit", monthTab: "Ay", qiblaTab: "Kıble", quranTab: "Kur'an", quietTab: "Sükûnet",
    monthTitle: "Bu ay", monthSub: "Seçilen yer için imsaktan yatsıya.", thDate: "Tarih",
    fajr: "İmsak", sun: "Güneş", dhuhr: "Öğle", asr: "İkindi", maghrib: "Akşam", isha: "Yatsı",
    ayahTitle: "Günün ayeti", qiblaTitle: "Kıble", compass: "Pusulayı aç", howTitle: "Nasıl kullanılır",
    quranTitle: "Kur'an", play: "Oynat", pause: "Durdur", tasbihTitle: "Tesbih", tap: "Saymak için dokun", reset: "Sıfırla",
    focusTitle: "Reklamsız", placeTitle: "Yer", gps: "Konumumu kullan", close: "Kapat", setTitle: "Ayarlar",
    method: "Hesap yöntemi", madhab: "İkindi mezhebi", notify: "Sekme açıkken haber ver", done: "Tamam",
    searchPh: "Şehir ara", surahPh: "Sure ara",
    methodNote: "Vakitler hesaplanır, resmi cami ilanı değildir. Türkiye için Diyanet, Montreal varsayılanı ISNA.",
    names: { Fajr: "İmsak", Sunrise: "Güneş", Dhuhr: "Öğle", Asr: "İkindi", Maghrib: "Akşam", Isha: "Yatsı" },
    remaining: "kaldı", at: "saat", passed: "geçti", now: "şimdi",
    kerahat: "Kerahat — güneş doğuyor, tepede, ya da batıyor.",
    qiblaHint: "Bu yerden Kâbe’nin yönü.",
    howBody: "Telefonu düz tutun, pusulayı açın, altın ibre yukarı bakana kadar dönün.",
    tasbihNote: "33 Sübhanallah, 33 Elhamdülillah, 34 Allahu ekber. Bu cihazda saklanır.",
    focusBody: "Namaz vakitleri, kıble, aylık tablo ve Kur’an okuyucu. Hesap yok, reklam yok, takip yok.",
    footer: "Vakitler Aladhan motorundan. Kur’an metni ve ses Quran.com üzerinden. Yerel cami bir dakika farklı olabilir.",
    loading: "Vakitler yükleniyor…", noResults: "Sonuç yok.", searching: "Aranıyor…", gpsFail: "Konum alınamadı.",
    notified: "Namaz vakti", toward: "Pusulayı açın, ya da ibre kuzeyle buluşana kadar dönün.",
    left: "sol", right: "sağ", facing: "Kıbleye dönüksünüz.", loadFail: "Vakitler alınamadı."
  }
};
const HIJRI_TR = ["", "Muharrem", "Safer", "Rebiülevvel", "Rebiülahir", "Cemaziyelevvel", "Cemaziyelahir", "Recep", "Şaban", "Ramazan", "Şevval", "Zilkade", "Zilhicce"];

const state = load();
let calendar = [];
let chapters = [];
let heading = null;
let notifiedKey = "";
let searchTimer = 0;
let currentChapter = 1;

function load() {
  const saved = JSON.parse(localStorage.getItem("ezan-vakti") || "{}");
  return {
    lang: saved.lang || ((navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en"),
    theme: saved.theme || "night",
    method: saved.method ?? 2,
    school: saved.school ?? 0,
    notify: !!saved.notify,
    reciter: saved.reciter ?? 7,
    place: saved.place || { name: "Montreal", country: "Canada", lat: 45.5017, lon: -73.5673, tz: "America/Toronto" },
    tasbih: saved.tasbih || 0
  };
}
function save() { localStorage.setItem("ezan-vakti", JSON.stringify(state)); }
function t(key) { return I18N[state.lang][key]; }
function nameOf(key) { return I18N[state.lang].names[key] || key; }
function pad(n) { return String(n).padStart(2, "0"); }
function cleanTime(v) { return String(v).slice(0, 5); }
function minutes(hhmm) { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; }
function fmtDur(total) {
  const s = Math.max(0, total);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
}
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 2400);
}
function zoneParts(tz, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  }).formatToParts(date);
  const g = Object.fromEntries(parts.filter(p => p.type !== "literal").map(p => [p.type, p.value]));
  return { y: +g.year, m: +g.month, d: +g.day, hh: +g.hour, mm: +g.minute, ss: +g.second };
}
function qiblaBearing(lat, lon) {
  const φ1 = lat * Math.PI / 180, λ1 = lon * Math.PI / 180;
  const φ2 = 21.4225 * Math.PI / 180, λ2 = 39.8262 * Math.PI / 180;
  const y = Math.sin(λ2 - λ1);
  const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(λ2 - λ1);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

function applyI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i]").forEach(el => { el.textContent = t(el.dataset.i); });
  document.querySelectorAll("[data-i-ph]").forEach(el => { el.placeholder = t(el.dataset.iPh); });
  document.getElementById("langEn").classList.toggle("on", state.lang === "en");
  document.getElementById("langTr").classList.toggle("on", state.lang === "tr");
  document.getElementById("themeBtn").textContent = state.theme === "night" ? "☾" : "☀";
  document.body.dataset.theme = state.theme === "day" ? "day" : "";
  document.getElementById("locLabel").textContent = state.place.name;
  document.getElementById("footerNote").textContent = t("footer");
  document.getElementById("howBody").textContent = t("howBody");
  document.getElementById("qiblaHint").textContent = t("qiblaHint");
  document.getElementById("tasbihNote").textContent = t("tasbihNote");
  document.getElementById("focusBody").textContent = t("focusBody");
  fillSelects();
  renderTasbih();
  renderAyah();
  renderChapters();
  renderTimes();
}
function fillSelects() {
  document.getElementById("methodSel").innerHTML = METHODS.map(([id, label]) => `<option value="${id}">${label}</option>`).join("");
  document.getElementById("methodSel").value = String(state.method);
  document.getElementById("schoolSel").value = String(state.school);
  document.getElementById("notifyChk").checked = state.notify;
  document.getElementById("reciterSel").innerHTML = RECITERS.map(([id, label]) => `<option value="${id}">${label}</option>`).join("");
  document.getElementById("reciterSel").value = String(state.reciter);
}

async function fetchCalendar(offsetMonth = 0) {
  const now = zoneParts(state.place.tz || "UTC");
  let y = now.y, m = now.m + offsetMonth;
  if (m > 12) { m -= 12; y += 1; }
  if (m < 1) { m += 12; y -= 1; }
  const url = `https://api.aladhan.com/v1/calendar/${y}/${m}?latitude=${state.place.lat}&longitude=${state.place.lon}&method=${state.method}&school=${state.school}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("times");
  const json = await res.json();
  return json.data.map(day => {
    const timings = {};
    for (const k of Object.keys(day.timings)) timings[k] = cleanTime(day.timings[k]);
    return { date: day.date, timings };
  });
}
async function refresh() {
  document.getElementById("nextName").textContent = t("loading");
  try {
    calendar = await fetchCalendar(0);
    const now = zoneParts(state.place.tz);
    if (now.d === calendar.length) calendar = calendar.concat((await fetchCalendar(1)).slice(0, 1));
    renderTimes();
    renderMonth();
    renderQibla();
  } catch {
    toast(t("loadFail"));
  }
}
function todayEntry() {
  const now = zoneParts(state.place.tz || "UTC");
  const key = `${pad(now.d)}-${pad(now.m)}-${now.y}`;
  return calendar.find(d => d.date.gregorian.date === key) || calendar[0];
}
function renderTimes() {
  const entry = todayEntry();
  if (!entry) return;
  const now = zoneParts(state.place.tz);
  const nowMin = now.hh * 60 + now.mm + now.ss / 60;
  const tomorrow = calendar[calendar.indexOf(entry) + 1];
  const slots = SALAH.map(k => ({ key: k, min: minutes(entry.timings[k]) }));
  const next = slots.find(s => s.min > nowMin);
  const nextKey = next ? next.key : "Fajr";
  const nextAt = next ? next.min : minutes((tomorrow || entry).timings.Fajr) + (tomorrow ? 1440 : 0);
  const atTime = next ? entry.timings[nextKey] : (tomorrow || entry).timings.Fajr;
  document.getElementById("nextName").textContent = nameOf(nextKey);
  document.getElementById("countdown").textContent = fmtDur(Math.round((nextAt - nowMin) * 60));
  document.getElementById("nextMeta").textContent = `${nameOf(nextKey)} ${t("at")} ${atTime} · ${t("remaining")}`;
  document.getElementById("arcTime").textContent = atTime;
  document.getElementById("arcLabel").textContent = nameOf(nextKey);
  const prev = [...slots].reverse().find(s => s.min <= nowMin);
  const start = prev ? prev.min : minutes(entry.timings.Fajr) - 1440;
  const pct = Math.min(1, Math.max(0, (nowMin - start) / ((nextAt || start + 1) - start)));
  document.getElementById("arc").setAttribute("stroke-dashoffset", String(314 * (1 - pct)));
  const g = entry.date.gregorian, h = entry.date.hijri;
  document.getElementById("gDate").textContent = `${g.weekday.en} ${g.day} ${g.month.en} ${g.year}`;
  document.getElementById("hDate").textContent = `${h.day} ${state.lang === "tr" ? HIJRI_TR[+h.month.number] || h.month.en : h.month.en} ${h.year}`;
  const sun = minutes(entry.timings.Sunrise), dhuhr = minutes(entry.timings.Dhuhr), maghrib = minutes(entry.timings.Maghrib);
  const kerahat = (nowMin >= sun && nowMin < sun + 18) || (nowMin >= dhuhr - 8 && nowMin < dhuhr) || (nowMin >= maghrib - 18 && nowMin < maghrib);
  document.getElementById("kerahat").textContent = kerahat ? t("kerahat") : "";
  document.getElementById("vaktGrid").innerHTML = PRAYERS.map(k => {
    const tm = entry.timings[k];
    return `<article class="vakt ${k === nextKey ? "on" : ""}"><div class="nm">${nameOf(k)}</div><div class="tm">${tm}</div><div class="st">${minutes(tm) <= nowMin ? t("passed") : ""}</div></article>`;
  }).join("");
  if (state.notify && nextAt - nowMin <= 0.02 && "Notification" in window && Notification.permission === "granted") {
    const key = `${g.date}-${nextKey}`;
    if (notifiedKey !== key) {
      notifiedKey = key;
      new Notification(`${t("notified")}: ${nameOf(nextKey)}`, { body: atTime });
    }
  }
}
function renderMonth() {
  const now = zoneParts(state.place.tz);
  document.getElementById("monthBody").innerHTML = calendar.filter(d => +d.date.gregorian.month.number === now.m).map(d => {
    const tm = d.timings;
    return `<tr class="${+d.date.gregorian.day === now.d ? "today" : ""}"><td>${d.date.gregorian.day} ${d.date.gregorian.weekday.en.slice(0, 3)}</td><td>${tm.Fajr}</td><td>${tm.Sunrise}</td><td>${tm.Dhuhr}</td><td>${tm.Asr}</td><td>${tm.Maghrib}</td><td>${tm.Isha}</td></tr>`;
  }).join("");
}
function renderAyah() {
  const a = AYAH[Math.floor(Date.now() / 86400000) % AYAH.length];
  document.getElementById("ayahAr").textContent = a.ar;
  document.getElementById("ayahText").textContent = state.lang === "tr" ? a.tr : a.en;
  document.getElementById("ayahRef").textContent = a.ref;
}
function renderQibla() {
  const b = qiblaBearing(state.place.lat, state.place.lon);
  document.getElementById("qiblaDeg").textContent = `${b.toFixed(1)}°`;
  document.getElementById("needle").setAttribute("transform", `rotate(${heading == null ? b : b - heading} 110 110)`);
  if (heading == null) document.getElementById("qiblaTurn").textContent = t("toward");
  else {
    const diff = ((b - heading + 540) % 360) - 180;
    document.getElementById("qiblaTurn").textContent = Math.abs(diff) < 6 ? t("facing") : `${Math.abs(diff).toFixed(0)}° ${diff > 0 ? t("right") : t("left")}`;
  }
}
function renderTasbih() {
  const n = state.tasbih % 100;
  document.getElementById("tasbihPhrase").textContent = n < 33 ? "Subhanallah" : n < 66 ? "Alhamdulillah" : "Allahu akbar";
  document.getElementById("tasbihCount").textContent = String(n);
}
function showTab(id) {
  ["month", "qibla", "quran", "quiet"].forEach(k => document.getElementById("panel-" + k).classList.toggle("hidden", k !== id));
  document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === id));
  if (id === "quran" && !chapters.length) loadChapters();
}

async function loadChapters() {
  const res = await fetch(`https://api.quran.com/api/v4/chapters?language=${state.lang === "tr" ? "tr" : "en"}`);
  const json = await res.json();
  chapters = json.chapters || [];
  renderChapters();
  if (!document.getElementById("verses").childElementCount) openChapter(1);
}
function renderChapters() {
  const q = (document.getElementById("surahSearch").value || "").toLowerCase();
  document.getElementById("chapterList").innerHTML = chapters.filter(c => `${c.id} ${c.name_simple} ${c.name_arabic} ${c.translated_name?.name || ""}`.toLowerCase().includes(q)).map(c =>
    `<button type="button" data-id="${c.id}"><b>${c.id}. ${c.name_simple}</b><small>${c.name_arabic} · ${c.translated_name?.name || ""} · ${c.verses_count}</small></button>`
  ).join("");
  document.querySelectorAll("#chapterList button").forEach(btn => btn.onclick = () => openChapter(+btn.dataset.id));
}
async function openChapter(id) {
  currentChapter = id;
  const chapter = chapters.find(c => c.id === id);
  document.getElementById("surahTitle").textContent = chapter ? `${chapter.name_simple}` : `Surah ${id}`;
  document.getElementById("verses").innerHTML = `<p class="hint">${t("loading")}</p>`;
  const translation = state.lang === "tr" ? 77 : 20;
  const [uthmani, meal] = await Promise.all([
    fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`).then(r => r.json()),
    fetch(`https://api.quran.com/api/v4/quran/translations/${translation}?chapter_number=${id}`).then(r => r.json())
  ]);
  document.getElementById("verses").innerHTML = (uthmani.verses || []).map((v, i) =>
    `<article class="verse"><div class="kicker">${v.verse_key}</div><div class="ar">${v.text_uthmani}</div><div class="tr">${meal.translations?.[i]?.text || ""}</div></article>`
  ).join("");
  document.getElementById("audio").removeAttribute("src");
}
async function playChapter() {
  const audio = document.getElementById("audio");
  if (audio.getAttribute("src") && !audio.paused) { audio.pause(); document.getElementById("playBtn").textContent = t("play"); return; }
  const res = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${state.reciter}/${currentChapter}`);
  const json = await res.json();
  audio.src = json.audio_file.audio_url;
  await audio.play();
  document.getElementById("playBtn").textContent = t("pause");
}

async function searchCities(q) {
  const list = document.getElementById("cityResults");
  if (q.length < 2) { list.innerHTML = ""; return; }
  list.innerHTML = `<li><button type="button" disabled>${t("searching")}</button></li>`;
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=${state.lang}`);
  const results = (await res.json()).results || [];
  if (!results.length) { list.innerHTML = `<li><button type="button" disabled>${t("noResults")}</button></li>`; return; }
  list.innerHTML = results.map((r, i) => `<li><button type="button" data-i="${i}">${r.name}<small>${[r.admin1, r.country].filter(Boolean).join(" · ")}</small></button></li>`).join("");
  list.querySelectorAll("button[data-i]").forEach(btn => btn.onclick = () => choosePlace(results[+btn.dataset.i]));
}
function choosePlace(r) {
  state.place = { name: r.name, country: r.country || "", lat: r.latitude, lon: r.longitude, tz: r.timezone || "UTC" };
  save();
  document.getElementById("locLabel").textContent = r.name;
  document.getElementById("locModal").classList.add("hidden");
  refresh();
}

document.getElementById("locBtn").onclick = () => { document.getElementById("locModal").classList.remove("hidden"); document.getElementById("citySearch").focus(); };
document.getElementById("locClose").onclick = () => document.getElementById("locModal").classList.add("hidden");
document.getElementById("setBtn").onclick = () => document.getElementById("setModal").classList.remove("hidden");
document.getElementById("setClose").onclick = () => {
  state.method = +document.getElementById("methodSel").value;
  state.school = +document.getElementById("schoolSel").value;
  state.notify = document.getElementById("notifyChk").checked;
  save();
  document.getElementById("setModal").classList.add("hidden");
  if (state.notify && "Notification" in window) Notification.requestPermission();
  refresh();
};
document.getElementById("citySearch").addEventListener("input", e => { clearTimeout(searchTimer); searchTimer = setTimeout(() => searchCities(e.target.value.trim()), 250); });
document.getElementById("gpsBtn").onclick = () => {
  if (!navigator.geolocation) return toast(t("gpsFail"));
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude, lon = pos.coords.longitude;
    let name = state.lang === "tr" ? "Konumum" : "My location", tz = state.place.tz;
    try {
      const j = await (await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=${state.lang}`)).json();
      if (j.name) { name = j.name; tz = j.timezone || tz; }
    } catch {}
    choosePlace({ name, latitude: lat, longitude: lon, timezone: tz });
  }, () => toast(t("gpsFail")), { enableHighAccuracy: true, timeout: 8000 });
};
document.getElementById("langEn").onclick = () => { state.lang = "en"; save(); chapters = []; applyI18n(); };
document.getElementById("langTr").onclick = () => { state.lang = "tr"; save(); chapters = []; applyI18n(); };
document.getElementById("themeBtn").onclick = () => { state.theme = state.theme === "night" ? "day" : "night"; save(); applyI18n(); };
document.querySelectorAll(".tabs button").forEach(b => b.onclick = () => showTab(b.dataset.tab));
document.getElementById("surahSearch").addEventListener("input", renderChapters);
document.getElementById("playBtn").onclick = () => playChapter().catch(() => toast(t("loadFail")));
document.getElementById("audio").addEventListener("pause", () => { document.getElementById("playBtn").textContent = t("play"); });
document.getElementById("reciterSel").onchange = e => { state.reciter = +e.target.value; save(); document.getElementById("audio").removeAttribute("src"); };
document.getElementById("tasbihBtn").onclick = () => { state.tasbih = (state.tasbih + 1) % 100; save(); renderTasbih(); };
document.getElementById("tasbihReset").onclick = () => { state.tasbih = 0; save(); renderTasbih(); };
document.getElementById("compassBtn").onclick = async () => {
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") {
    if (await DeviceOrientationEvent.requestPermission() !== "granted") return;
  }
  window.addEventListener("deviceorientation", ev => {
    heading = ev.webkitCompassHeading != null ? ev.webkitCompassHeading : ev.alpha != null ? (360 - ev.alpha) % 360 : heading;
    renderQibla();
  }, true);
};
document.querySelectorAll(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m) m.classList.add("hidden"); }));

if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
applyI18n();
refresh();
setInterval(renderTimes, 1000);
