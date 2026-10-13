/* DailyDeenHub Hadith reader — Sahih al-Bukhari pilot.
   Book data: /data/hadith/bukhari.json (Arabic: public domain; English: Dr. M. Muhsin Khan).
   Views: book (chapters + search) -> chapter (hadith list). EN/TR UI. */
const HD = {
  data: null, loading: false, progress: 0,
  view: "book", chapter: null, query: "", lang: "both", scrollIdx: -1
};
try {
  const _hl = localStorage.getItem("ddh-hadith-lang");
  if (_hl === "ar" || _hl === "en" || _hl === "both") HD.lang = _hl;
} catch (e) {}
const HD_BOOK = { file: "/data/hadith/bukhari.json?v=1", ar: "صحيح البخاري", en: "Sahih al-Bukhari", tr: "Sahih-i Buhârî" };

function hdLast() { try { return JSON.parse(localStorage.getItem("ddh-hadith-last") || "null"); } catch (e) { return null; } }
function hdSaveLast(s, idx, n) { try { localStorage.setItem("ddh-hadith-last", JSON.stringify({ s: s, idx: idx, n: n })); } catch (e) {} }
function hdIsDownloaded() { try { return localStorage.getItem("ddh-hadith-dl") === "1"; } catch (e) { return false; } }
function hdMarkDownloaded() { try { localStorage.setItem("ddh-hadith-dl", "1"); } catch (e) {} }

function renderHadith() {
  const v = document.getElementById("hadithView");
  if (!v) return;
  if (!HD.data) { hdLoad(v); return; }
  v.className = "hd-wrap hd-show-" + HD.lang;
  if (HD.view === "chapter") hdChapterView(v); else hdBookView(v);
}

function hdLoadingView(v) {
  v.className = "hd-wrap";
  v.innerHTML =
    '<button class="ghost hd-back" data-goto="resources" type="button">\u2190 ' + escapeHtml(t("hdBack")) + "</button>" +
    '<h3 class="hd-title">' + escapeHtml(t("resTitle")) + "</h3>" +
    '<p class="note">' + escapeHtml(t("hdLoading")) + "</p>" +
    '<div class="hd-prog"><i id="hdProgBar"></i></div>' +
    '<p class="note" id="hdProgTxt"></p>';
  hdProgressView();
}
function hdProgressView() {
  const b = document.getElementById("hdProgBar"), x = document.getElementById("hdProgTxt");
  if (b) b.style.width = HD.progress + "%";
  if (x && HD.progress) x.textContent = HD.progress + "%";
}

function hdLoad(v) {
  if (HD.data) { renderHadith(); return; }
  if (hdIsDownloaded()) { hdFetchBook(v); return; }
  hdPromptView(v);
}

/* Download prompt: the book lives on the device after a one-time download
   (the service worker also caches it, so it keeps working offline). */
function hdPromptView(v) {
  const tr = state.lang === "tr";
  v.className = "hd-wrap";
  v.innerHTML =
    '<button class="ghost hd-back" data-goto="resources" type="button">\u2190 ' + escapeHtml(t("hdBack")) + "</button>" +
    '<div class="hd-dlcard">' +
    '<img class="hd-dlcover" src="/img/resources/covers/bukhari.png?v=1" alt="">' +
    '<h3 class="hd-title"><span dir="rtl" lang="ar">' + escapeHtml(HD_BOOK.ar) + "</span><br>" +
    escapeHtml(tr ? HD_BOOK.tr : HD_BOOK.en) + "</h3>" +
    '<p class="note">' + escapeHtml(t("hdDlBody")) + "</p>" +
    '<div class="hd-prog" id="hdDlProgWrap" style="display:none"><i id="hdProgBar"></i></div>' +
    '<p class="note" id="hdProgTxt" style="display:none"></p>' +
    '<div class="hd-dlbtns">' +
    '<button class="kutub-inapp" id="hdDlBtn" type="button">' + escapeHtml(t("hdDlBtn")) + "</button>" +
    '<button class="ghost" id="hdDlLater" type="button">' + escapeHtml(t("hdDlLater")) + "</button>" +
    "</div></div>";
  document.getElementById("hdDlBtn").onclick = function () { hdFetchBook(v); };
  document.getElementById("hdDlLater").onclick = function () { showTab("resources"); };
}

function hdFetchBook(v) {
  if (HD.loading) return;
  HD.loading = true; HD.progress = 0;
  const w = document.getElementById("hdDlProgWrap");
  if (w) {
    w.style.display = "";
    document.getElementById("hdProgTxt").style.display = "";
    const btns = document.querySelector(".hd-dlbtns");
    if (btns) btns.style.display = "none";
  } else {
    hdLoadingView(v);
  }
  fetch(HD_BOOK.file).then(function (r) {
    if (!r.ok) throw new Error("http " + r.status);
    const total = parseInt(r.headers.get("content-length") || "0", 10);
    const reader = r.body.getReader();
    const chunks = []; let got = 0;
    function pump() {
      return reader.read().then(function (res) {
        if (res.done) return chunks;
        chunks.push(res.value); got += res.value.length;
        if (total) { HD.progress = Math.round(got / total * 100); hdProgressView(); }
        return pump();
      });
    }
    return pump().then(function (chunks) {
      const buf = new Uint8Array(got); let off = 0;
      chunks.forEach(function (c) { buf.set(c, off); off += c.length; });
      return JSON.parse(new TextDecoder().decode(buf));
    });
  }).then(function (d) {
    HD.data = d; HD.loading = false; hdMarkDownloaded(); renderHadith();
  }).catch(function () {
    HD.loading = false;
    v.innerHTML = '<p class="note">Failed to load the book. Please check your connection and try again.</p>' +
      '<button class="ghost" id="hdRetry" type="button">' + escapeHtml(t("hdRetry")) + "</button>";
    const b = document.getElementById("hdRetry");
    if (b) b.onclick = function () { hdFetchBook(v); };
  });
}

function hdBookView(v) {
  const tr = state.lang === "tr";
  const d = HD.data;
  const secs = Object.keys(d.sections).sort(function (a, b) { return a - b; });
  const last = hdLast();
  let h = "";
  h += '<button class="ghost hd-back" data-goto="resources" type="button">\u2190 ' + escapeHtml(t("hdBack")) + "</button>";
  h += '<h3 class="hd-title"><span dir="rtl" lang="ar">' + escapeHtml(HD_BOOK.ar) + "</span><br>" +
       escapeHtml(tr ? HD_BOOK.tr : HD_BOOK.en) + "</h3>";
  h += '<p class="note">' + secs.length + " " + escapeHtml(t("hdChapters")) + " \u00b7 " +
       d.hadiths.length.toLocaleString() + " " + escapeHtml(t("resHadith")) + "</p>";
  if (last && d.sections[String(last.s)]) {
    h += '<button class="kutub-inapp hd-continue" id="hdContinue" type="button">\u25b6 ' +
         escapeHtml(t("hdContinue")) + ": #" + last.n + "</button>";
  }
  h += '<input id="hdSearch" class="hd-search" type="search" autocomplete="off" placeholder="' +
       escapeHtml(t("hdSearchPh")) + '" value="' + escapeHtml(HD.query) + '">';
  h += '<div id="hdResults"></div>';
  h += '<div class="hd-chlist" id="hdChList">' + secs.map(function (k) {
    const s = d.sections[k];
    return '<button class="hd-chrow" data-ch="' + k + '" type="button">' +
      '<span class="kutub-num">' + k + "</span>" +
      '<span class="hd-cht"><span class="hd-chen">' + escapeHtml(tr ? s.tr : s.en) + "</span>" +
      '<span class="hd-chc">' + s.n + " " + escapeHtml(t("resHadith")) + "</span></span>" +
      '<span class="hd-chev">\u203a</span></button>';
  }).join("") + "</div>";
  h += '<p class="note hd-attr">' + escapeHtml(t("hdAttr")) + "</p>";
  v.innerHTML = h;
  v.querySelectorAll("[data-ch]").forEach(function (b) {
    b.onclick = function () { hdOpenChapter(+b.dataset.ch, hdFirstIdx(+b.dataset.ch)); };
  });
  const si = document.getElementById("hdSearch");
  let deb = 0;
  si.addEventListener("input", function () {
    clearTimeout(deb);
    deb = setTimeout(function () { hdDoSearch(si.value.trim()); }, 350);
  });
  const cb = document.getElementById("hdContinue");
  if (cb && last) cb.onclick = function () { hdOpenChapter(last.s, last.idx); };
  if (HD.query) hdDoSearch(HD.query);
}

function hdFirstIdx(s) {
  const hs = HD.data.hadiths;
  for (let i = 0; i < hs.length; i++) if (hs[i].s === s) return i;
  return 0;
}

function hdDoSearch(q) {
  HD.query = q;
  const box = document.getElementById("hdResults");
  const list = document.getElementById("hdChList");
  if (!box) return;
  if (!q) { box.innerHTML = ""; if (list) list.style.display = ""; return; }
  if (list) list.style.display = "none";
  const ql = q.toLowerCase();
  const d = HD.data, tr = state.lang === "tr";
  const out = [];
  for (let i = 0; i < d.hadiths.length && out.length < 60; i++) {
    const hh = d.hadiths[i];
    if (hh.ar.indexOf(q) !== -1 || hh.en.toLowerCase().indexOf(ql) !== -1) out.push([i, hh]);
  }
  if (!out.length) { box.innerHTML = '<p class="note">' + escapeHtml(t("hdNoRes")) + "</p>"; return; }
  box.innerHTML = '<p class="note">' + out.length + (out.length >= 60 ? "+" : "") + " " +
    escapeHtml(t("hdResults")) + "</p>" + out.map(function (pair) {
      const i = pair[0], hh = pair[1];
      const sec = d.sections[String(hh.s)];
      const enHit = hh.en.toLowerCase().indexOf(ql) !== -1;
      const snip = (enHit ? hh.en.slice(0, 140) : hh.ar.slice(0, 120)) + "\u2026";
      return '<button class="hd-resrow" data-i="' + i + '" type="button">' +
        '<span class="hd-num">#' + hh.n + "</span>" +
        '<span class="hd-rMain"><span class="hd-rSec">' + escapeHtml(tr ? sec.tr : sec.en) + "</span>" +
        '<span class="hd-rSnip"' + (enHit ? "" : ' dir="rtl" lang="ar"') + ">" + escapeHtml(snip) + "</span></span></button>";
    }).join("");
  box.querySelectorAll("[data-i]").forEach(function (b) {
    b.onclick = function () { const i = +b.dataset.i; hdOpenChapter(HD.data.hadiths[i].s, i); };
  });
}

function hdOpenChapter(s, idx) {
  HD.view = "chapter"; HD.chapter = s; HD.scrollIdx = idx;
  renderHadith();
  requestAnimationFrame(function () {
    const el = document.getElementById("hdi-" + idx);
    if (el) el.scrollIntoView({ block: "start" });
  });
}

function hdChapterView(v) {
  const tr = state.lang === "tr";
  const d = HD.data, s = d.sections[String(HD.chapter)];
  let h = "";
  h += '<button class="ghost hd-back" id="hdBackCh" type="button">\u2190 ' + escapeHtml(t("hdBackCh")) + "</button>";
  h += '<h3 class="hd-title">' + escapeHtml(tr ? s.tr : s.en) + "</h3>";
  if (String(HD.chapter) === "0") h += '<p class="note">' + escapeHtml(t("hdGeneralNote")) + "</p>";
  h += '<div class="hd-langrow">' + ["both", "ar", "en"].map(function (l) {
    return '<button type="button" class="hd-langbtn' + (HD.lang === l ? " on" : "") + '" data-l="' + l + '">' +
      escapeHtml(t("hdLang" + l[0].toUpperCase() + l.slice(1))) + "</button>";
  }).join("") + "</div>";
  h += '<p class="note">' + s.n + " " + escapeHtml(t("resHadith")) + "</p>";
  h += '<div class="hd-cards">';
  d.hadiths.forEach(function (hh, i) {
    if (hh.s !== HD.chapter) return;
    h += '<article class="hd-card" id="hdi-' + i + '" data-i="' + i + '">' +
      '<div class="hd-num">#' + hh.n + "</div>" +
      '<p class="hd-ar" dir="rtl" lang="ar">' + escapeHtml(hh.ar) + "</p>" +
      '<p class="hd-en">' + escapeHtml(hh.en) + "</p></article>";
  });
  h += "</div>";
  h += '<button class="ghost hd-back" id="hdBackCh2" type="button">\u2190 ' + escapeHtml(t("hdBackCh")) + "</button>";
  v.innerHTML = h;
  const back = function () { HD.view = "book"; renderHadith(); };
  document.getElementById("hdBackCh").onclick = back;
  document.getElementById("hdBackCh2").onclick = back;
  v.querySelectorAll("[data-l]").forEach(function (b) {
    b.onclick = function () {
      HD.lang = b.dataset.l;
      try { localStorage.setItem("ddh-hadith-lang", HD.lang); } catch (e) {}
      v.className = "hd-wrap hd-show-" + HD.lang;
      v.querySelectorAll("[data-l]").forEach(function (x) { x.classList.toggle("on", x === b); });
    };
  });
  const fi = hdFirstIdx(HD.chapter);
  hdSaveLast(HD.chapter, fi, d.hadiths[fi].n);
  hdTrackScroll();
}

let hdScrollBound = false;
function hdTrackScroll() {
  if (hdScrollBound) return; hdScrollBound = true;
  let tm = 0;
  window.addEventListener("scroll", function () {
    clearTimeout(tm);
    tm = setTimeout(function () {
      if (HD.view !== "chapter" || !HD.data) return;
      const cards = document.querySelectorAll(".hd-card");
      for (const c of cards) {
        const r = c.getBoundingClientRect();
        if (r.top >= -100) {
          const i = +c.dataset.i, hh = HD.data.hadiths[i];
          hdSaveLast(HD.chapter, i, hh.n);
          break;
        }
      }
    }, 600);
  }, { passive: true });
}
