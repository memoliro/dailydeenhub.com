/* DailyDeenHub Hadith reader — Kutub al-Sittah (all six books).
   Book data: /data/hadith/<book>.json (Arabic: public domain; English: see per-book attribution).
   One book downloads at a time, on demand, with an ask-first prompt (~5-12 MB each).
   Views: book (chapters + search) -> chapter (hadith list). EN/TR UI. */
const HD_BOOKS = {
  bukhari:  { file: "/data/hadith/bukhari.json?v=1",  ar: "صحيح البخاري", en: "Sahih al-Bukhari",   tr: "Sahih-i Buhârî",    cover: "/img/resources/covers/bukhari.jpg?v=1",  mb: 12, attr: { en: "Dr. M. Muhsin Khan", tr: "Dr. M. Muhsin Khan" } },
  muslim:   { file: "/data/hadith/muslim.json?v=1",   ar: "صحيح مسلم",    en: "Sahih Muslim",      tr: "Sahih-i Müslim",    cover: "/img/resources/covers/muslim.jpg?v=1",   mb: 10, attr: { en: "hadith-api edition (translator varies by book)", tr: "hadith-api sürümü (çevirmen kitaba göre değişir)" } },
  abudawud: { file: "/data/hadith/abudawud.json?v=1", ar: "سنن أبي داود",  en: "Sunan Abu Dawud",   tr: "Sünen-i Ebû Dâvûd", cover: "/img/resources/covers/abudawud.jpg?v=1", mb: 7,  attr: { en: "hadith-api edition (translator varies by book)", tr: "hadith-api sürümü (çevirmen kitaba göre değişir)" } },
  tirmidhi: { file: "/data/hadith/tirmidhi.json?v=1", ar: "جامع الترمذي",  en: "Jami' at-Tirmidhi", tr: "Câmiu't-Tirmizî",   cover: "/img/resources/covers/tirmidhi.jpg?v=1",  mb: 7,  attr: { en: "hadith-api edition (translator varies by book)", tr: "hadith-api sürümü (çevirmen kitaba göre değişir)" } },
  nasai:    { file: "/data/hadith/nasai.json?v=1",    ar: "سنن النسائي",   en: "Sunan an-Nasa'i",   tr: "Sünen-i Nesâî",     cover: "/img/resources/covers/nasai.jpg?v=1",    mb: 7,  attr: { en: "hadith-api edition (translator varies by book)", tr: "hadith-api sürümü (çevirmen kitaba göre değişir)" } },
  ibnmajah: { file: "/data/hadith/ibnmajah.json?v=1", ar: "سنن ابن ماجه",  en: "Sunan Ibn Majah",   tr: "Sünen-i İbn Mâce",  cover: "/img/resources/covers/ibnmajah.jpg?v=1", mb: 5,  attr: { en: "hadith-api edition (translator varies by book)", tr: "hadith-api sürümü (çevirmen kitaba göre değişir)" } }
};
const HD_ORDER = ["bukhari", "muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah"];

/* Turkish -> English keyword glossary. The hadith texts are Arabic+English, so a
   Turkish query like "namaz" is expanded to its English equivalents ("prayer", "salat").
   Keys are normalized (no diacritics); matching is substring-based. */
const HD_TR_GLOSS = {
"namaz": ["prayer", "salat"], "abdest": ["ablution", "wudu"], "gusul": ["ghusl", "bathing"],
"oruc": ["fasting", "fast", "siyam"], "zekat": ["zakat", "zakah"], "fitre": ["fitr"],
"hac": ["hajj", "pilgrimage"], "umre": ["umra"], "cuma": ["friday", "jumuah"],
"bayram": ["eid"], "ezan": ["adhan", "call to prayer"], "kible": ["qibla"],
"cami": ["mosque"], "mescit": ["mosque"], "kuran": ["quran", "koran"],
"dua": ["supplication", "dua"], "tevbe": ["repentance"], "istigfar": ["forgiveness", "istighfar"],
"zikir": ["remembrance", "dhikr"], "sadaka": ["charity", "sadaqah"], "kurban": ["sacrifice"],
"cenaze": ["funeral", "janaza"], "nikah": ["marriage", "nikah"], "bosanma": ["divorce", "talaq"],
"miras": ["inheritance"], "yemin": ["oath"], "adak": ["vow"], "ruya": ["dream"],
"tip": ["medicine"], "giyim": ["clothing", "dress"], "ticaret": ["trade", "business", "commerce"],
"cihad": ["jihad"], "savas": ["war", "battle", "fighting"], "cennet": ["paradise"],
"cehennem": ["hell", "hellfire"], "kiyamet": ["judgment", "resurrection", "hour"],
"iman": ["faith", "belief"], "ilim": ["knowledge"], "taharet": ["purification"],
"temizlik": ["purification", "cleanliness"], "hayiz": ["menstruation"], "teyemmum": ["tayammum"],
"vitir": ["witr"], "teravih": ["taraweeh"], "itikaf": ["itikaf"], "iftar": ["iftar", "breaking fast"],
"sahur": ["suhoor"], "imsak": ["imsak"], "vakit": ["time"], "kaza": ["qada", "make up", "missed"],
"sehiv": ["forgetfulness", "sahw"], "secde": ["prostration"], "ruku": ["bowing", "ruku"],
"kiyam": ["standing", "qiyam"], "imam": ["imam"], "muezzin": ["muezzin"],
"cemaat": ["congregation"], "hutbe": ["sermon", "khutbah"], "selam": ["greeting", "salam", "peace"],
"hediye": ["gift"], "borc": ["debt"], "vasiyet": ["will", "bequest"], "kole": ["slave"],
"emanet": ["trust"], "adalet": ["justice"], "zulum": ["injustice", "oppression"],
"merhamet": ["mercy"], "sifa": ["healing", "cure"], "hastalik": ["illness", "sickness"],
"olum": ["death"], "kader": ["destiny", "decree", "qadar"], "rizik": ["provision", "rizq"],
"sabir": ["patience"], "sukur": ["gratitude"], "hamd": ["praise"], "tekbir": ["takbir"],
"tesbih": ["tasbih", "glorification"], "salavat": ["salawat", "blessings"],
"tevekkul": ["trust", "tawakkul"], "ihlas": ["sincerity"], "takva": ["piety", "taqwa"],
"sunnet": ["sunnah", "circumcision"], "bidat": ["innovation"], "sirk": ["shirk", "polytheism"],
"kufur": ["disbelief", "kufr"], "munafik": ["hypocrite"], "sahabe": ["companion"],
"peygamber": ["prophet"], "melek": ["angel"], "seytan": ["satan", "devil"], "cin": ["jinn"],
"ahiret": ["hereafter"], "kabir": ["grave"], "mahser": ["gathering"], "sirat": ["sirat"],
"sefaat": ["intercession"], "tavaf": ["tawaf"], "arafat": ["arafah"], "ihram": ["ihram"],
"akika": ["aqiqah"], "helal": ["halal", "lawful", "permissible"], "haram": ["haram", "forbidden", "prohibited"],
"icki": ["wine", "alcohol", "drink", "intoxicant"], "kumar": ["gambling"], "faiz": ["usury", "interest", "riba"],
"yalan": ["lie", "lying", "falsehood"], "gibet": ["backbiting"], "haset": ["envy"],
"zina": ["adultery", "fornication", "zina"], "hirsizlik": ["theft", "stealing"],
"diyet": ["blood money", "diya"], "kisas": ["retaliation", "qisas"], "kefaret": ["expiation"],
"anne": ["mother"], "baba": ["father"], "akraba": ["relatives", "kinship", "kin"],
"komsu": ["neighbor", "neighbour"], "misafir": ["guest"], "evlat": ["child", "offspring"],
"kadin": ["woman", "women"], "erkek": ["man", "men"], "cocuk": ["child", "children"], "aile": ["family"],
"kadir gecesi": ["laylat al-qadr", "night of decree"], "mirac": ["ascension", "miraj"]
};
function hdNormTr(s) {
  return s.replace(/İ/g, "i").toLowerCase().replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
}
/* All text variants to match: the raw query (Arabic direct) + English terms incl. TR glossary. */
function hdQueryTerms(q) {
  const qn = hdNormTr(q), seen = {}, out = [q.toLowerCase()];
  for (const k in HD_TR_GLOSS) {
    if (qn.indexOf(k) !== -1) HD_TR_GLOSS[k].forEach(function (en) {
      if (!seen[en]) { seen[en] = 1; out.push(en); }
    });
  }
  return out;
}
/* Returns "ar", "en", or null. */
function hdMatchText(hh, q, terms) {
  if (hh.ar.indexOf(q) !== -1) return "ar";
  const enl = hh.en.toLowerCase();
  for (let i = 0; i < terms.length; i++) if (enl.indexOf(terms[i]) !== -1) return "en";
  return null;
}

const HD = {
  book: "bukhari", cache: {}, data: null,
  loading: false, progress: 0,
  view: "book", chapter: null, query: "", lang: "both", scrollIdx: -1
};
try {
  const _hl = localStorage.getItem("ddh-hadith-lang");
  if (_hl === "ar" || _hl === "en" || _hl === "both") HD.lang = _hl;
} catch (e) {}

function hdBook() { return HD_BOOKS[HD.book]; }
function hdTitle(b) { const tr = state.lang === "tr"; return tr ? b.tr : b.en; }

/* Per-book download flag + reading position (migrates the old single-book keys). */
function hdDlKey(id) { return "ddh-hadith-dl-" + id; }
function hdLastKey(id) { return "ddh-hadith-last-" + id; }
function hdIsDownloaded(id) {
  id = id || HD.book;
  try {
    if (localStorage.getItem(hdDlKey(id)) === "1") return true;
    if (id === "bukhari" && localStorage.getItem("ddh-hadith-dl") === "1") return true; // legacy
    return false;
  } catch (e) { return false; }
}
function hdMarkDownloaded(id) { try { localStorage.setItem(hdDlKey(id || HD.book), "1"); } catch (e) {} }
function hdLast(id) {
  try {
    let raw = localStorage.getItem(hdLastKey(id || HD.book));
    if (!raw && (id || HD.book) === "bukhari") raw = localStorage.getItem("ddh-hadith-last"); // legacy
    return JSON.parse(raw || "null");
  } catch (e) { return null; }
}
function hdSaveLast(s, idx, n) { try { localStorage.setItem(hdLastKey(HD.book), JSON.stringify({ s: s, idx: idx, n: n })); } catch (e) {} }

/* Open a book in the reader (from the shelf or search results). */
function hdOpenBook(id) {
  if (!HD_BOOKS[id]) return;
  HD.book = id; HD.view = "book"; HD.chapter = null; HD.query = ""; HD.scrollIdx = -1;
  HD.data = HD.cache[id] || null;
  hdTrimCache();
  showTab("hadith");
  renderHadith();
}

/* Jump straight to a search hit: [bookId, hadithIndex]. */
function hdOpenResult(bookId, idx) {
  const go = function () {
    HD.book = bookId; HD.data = HD.cache[bookId];
    const hh = HD.data.hadiths[idx];
    HD.view = "chapter"; HD.chapter = hh.s; HD.scrollIdx = idx; HD.query = "";
    showTab("hadith");
    renderHadith();
    requestAnimationFrame(function () {
      const el = document.getElementById("hdi-" + idx);
      if (el) el.scrollIntoView({ block: "start" });
    });
  };
  if (HD.cache[bookId]) { go(); return; }
  hdLoadBookData(bookId).then(function (d) { HD.cache[bookId] = d; go(); });
}

/* Raw data loader (no prompt UI) — used by the cross-book search. */
function hdLoadBookData(id) {
  if (HD.cache[id]) return Promise.resolve(HD.cache[id]);
  return fetch(HD_BOOKS[id].file).then(function (r) {
    if (!r.ok) throw new Error("http " + r.status);
    return r.json();
  });
}
/* Drop cached books except the one being read, to keep memory low. */
function hdTrimCache() {
  Object.keys(HD.cache).forEach(function (k) { if (k !== HD.book) delete HD.cache[k]; });
}

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
  const b = hdBook(), tr = state.lang === "tr";
  v.className = "hd-wrap";
  v.innerHTML =
    '<button class="ghost hd-back" data-goto="resources" type="button">\u2190 ' + escapeHtml(t("hdBack")) + "</button>" +
    '<div class="hd-dlcard">' +
    '<img class="hd-dlcover" src="' + b.cover + '" alt="">' +
    '<h3 class="hd-title"><span dir="rtl" lang="ar">' + escapeHtml(b.ar) + "</span><br>" +
    escapeHtml(hdTitle(b)) + "</h3>" +
    '<p class="note">' + escapeHtml(hdTitle(b)) + " \u00b7 ~" + b.mb + " MB, " + escapeHtml(t("hdDlOnce")) + "</p>" +
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
  const bookId = HD.book, b = hdBook();
  const w = document.getElementById("hdDlProgWrap");
  if (w) {
    w.style.display = "";
    document.getElementById("hdProgTxt").style.display = "";
    const btns = document.querySelector(".hd-dlbtns");
    if (btns) btns.style.display = "none";
  } else {
    hdLoadingView(v);
  }
  fetch(b.file).then(function (r) {
    if (!r.ok) throw new Error("http " + r.status);
    const total = parseInt(r.headers.get("content-length") || "0", 10);
    const reader = r.body.getReader();
    const chunks = []; let got = 0;
    function pump() {
      return reader.read().then(function (res) {
        if (res.done) return chunks;
        chunks.push(res.value); got += res.value.length;
        if (total && bookId === HD.book) { HD.progress = Math.round(got / total * 100); hdProgressView(); }
        return pump();
      });
    }
    return pump().then(function (chunks) {
      const buf = new Uint8Array(got); let off = 0;
      chunks.forEach(function (c) { buf.set(c, off); off += c.length; });
      return JSON.parse(new TextDecoder().decode(buf));
    });
  }).then(function (d) {
    HD.cache[bookId] = d;
    if (bookId === HD.book) { HD.data = d; }
    HD.loading = false; hdMarkDownloaded(bookId);
    if (bookId === HD.book) renderHadith();
    else if (typeof renderResources === "function") renderResources();
  }).catch(function () {
    HD.loading = false;
    v.innerHTML = '<p class="note">Failed to load the book. Please check your connection and try again.</p>' +
      '<button class="ghost" id="hdRetry" type="button">' + escapeHtml(t("hdRetry")) + "</button>";
    const rb = document.getElementById("hdRetry");
    if (rb) rb.onclick = function () { hdFetchBook(v); };
  });
}

function hdBookView(v) {
  const b = hdBook(), tr = state.lang === "tr";
  const d = HD.data;
  const secs = Object.keys(d.sections).sort(function (a, b2) { return a - b2; });
  const last = hdLast();
  let h = "";
  h += '<button class="ghost hd-back" data-goto="resources" type="button">\u2190 ' + escapeHtml(t("hdBack")) + "</button>";
  h += '<h3 class="hd-title"><span dir="rtl" lang="ar">' + escapeHtml(b.ar) + "</span><br>" +
       escapeHtml(hdTitle(b)) + "</h3>";
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
  h += '<p class="note hd-attr">' + escapeHtml(t("hdAttrAr")) + " \u00b7 " + escapeHtml(t("hdAttrEn")) +
       ": " + escapeHtml(tr ? b.attr.tr : b.attr.en) + "</p>";
  v.innerHTML = h;
  v.querySelectorAll("[data-ch]").forEach(function (btn) {
    btn.onclick = function () { hdOpenChapter(+btn.dataset.ch, hdFirstIdx(+btn.dataset.ch)); };
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
  const terms = hdQueryTerms(q);
  const d = HD.data, tr = state.lang === "tr";
  const out = [];
  for (let i = 0; i < d.hadiths.length && out.length < 60; i++) {
    const hh = d.hadiths[i];
    const m = hdMatchText(hh, q, terms);
    if (m) out.push([i, hh, m]);
  }
  if (!out.length) { box.innerHTML = '<p class="note">' + escapeHtml(t("hdNoRes")) + "</p>"; return; }
  box.innerHTML = '<p class="note">' + out.length + (out.length >= 60 ? "+" : "") + " " +
    escapeHtml(t("hdResults")) + "</p>" + out.map(function (triple) {
      const i = triple[0], hh = triple[1];
      const sec = d.sections[String(hh.s)];
      const enHit = triple[2] === "en";
      const snip = (enHit ? hh.en.slice(0, 140) : hh.ar.slice(0, 120)) + "\u2026";
      return '<button class="hd-resrow" data-i="' + i + '" type="button">' +
        '<span class="hd-num">#' + hh.n + "</span>" +
        '<span class="hd-rMain"><span class="hd-rSec">' + escapeHtml(tr ? sec.tr : sec.en) + "</span>" +
        '<span class="hd-rSnip"' + (enHit ? "" : ' dir="rtl" lang="ar"') + ">" + escapeHtml(snip) + "</span></span></button>";
    }).join("");
  box.querySelectorAll("[data-i]").forEach(function (btn) {
    btn.onclick = function () { const i = +btn.dataset.i; hdOpenChapter(HD.data.hadiths[i].s, i); };
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
  const b = hdBook(), tr = state.lang === "tr";
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
  v.querySelectorAll("[data-l]").forEach(function (btn) {
    btn.onclick = function () {
      HD.lang = btn.dataset.l;
      try { localStorage.setItem("ddh-hadith-lang", HD.lang); } catch (e) {}
      v.className = "hd-wrap hd-show-" + HD.lang;
      v.querySelectorAll("[data-l]").forEach(function (x) { x.classList.toggle("on", x === btn); });
    };
  });
  const fi = hdFirstIdx(HD.chapter);
  hdSaveLast(HD.chapter, fi, d.hadiths[fi].n);
  hdTrackScroll();
}

/* Cross-book keyword search: scans every downloaded book, one at a time
   (keeps phone memory low). Returns [{book, hits: [hadithIdx...]}]. */
function hdSearchAll(q, perBookCap) {
  const terms = hdQueryTerms(q), cap = perBookCap || 20;
  const ids = HD_ORDER.filter(hdIsDownloaded);
  const results = [];
  let chain = Promise.resolve();
  ids.forEach(function (id) {
    chain = chain.then(function () {
      return hdLoadBookData(id).then(function (d) {
        const hits = [];
        for (let i = 0; i < d.hadiths.length && hits.length < cap; i++) {
          const hh = d.hadiths[i];
          const m = hdMatchText(hh, q, terms);
          if (m) hits.push([i, m]);
        }
        if (hits.length) results.push({ book: id, hits: hits, total: d.hadiths.length });
      });
    });
  });
  return chain.then(function () { hdTrimCache(); return results; });
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
