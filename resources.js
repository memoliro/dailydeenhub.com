/* DailyDeenHub Resources — Kutub al-Sittah library shelf + cross-book keyword search. */
const KUTUB = [
  { id: "quran", quran: true, cover: "/img/resources/covers/quran.jpg?v=1" },
  { id: "bukhari",  cover: "/img/resources/covers/bukhari.jpg?v=1" },
  { id: "muslim",   cover: "/img/resources/covers/muslim.jpg?v=1" },
  { id: "abudawud", cover: "/img/resources/covers/abudawud.jpg?v=1" },
  { id: "tirmidhi", cover: "/img/resources/covers/tirmidhi.jpg?v=1" },
  { id: "nasai",    cover: "/img/resources/covers/nasai.jpg?v=1" },
  { id: "ibnmajah", cover: "/img/resources/covers/ibnmajah.jpg?v=1" }
];
const RES = { query: "", results: null, searching: false, searchId: 0 };

function kutubTitle(b) {
  if (b.quran) return t("quranTab");
  const hb = (typeof HD_BOOKS !== "undefined") ? HD_BOOKS[b.id] : null;
  if (!hb) return b.id;
  return state.lang === "tr" ? hb.tr : hb.en;
}

function renderResources() {
  renderResSearch();
  renderShelf();
}

function renderShelf() {
  const box = document.getElementById("kutubList");
  if (!box) return;
  box.className = "shelf-grid";
  box.innerHTML = KUTUB.map(function (b) {
    const title = kutubTitle(b);
    const badge = (!b.quran && typeof hdIsDownloaded === "function" && hdIsDownloaded(b.id))
      ? '<span class="shelf-dl">\u2713</span>' : "";
    const inner = '<span class="shelf-cover"><img src="' + b.cover + '" alt="' +
      escapeHtml(title) + '" loading="lazy">' + badge + "</span>" +
      '<span class="shelf-title">' + escapeHtml(title) + "</span>";
    if (b.quran) return '<button class="shelf-book" data-goto="quran" type="button">' + inner + "</button>";
    return '<button class="shelf-book" data-book="' + b.id + '" type="button">' + inner + "</button>";
  }).join("");
  box.querySelectorAll("[data-book]").forEach(function (el) {
    el.onclick = function () { hdOpenBook(el.dataset.book); };
  });
}

/* ---- Cross-book keyword search ---- */
function renderResSearch() {
  const wrap = document.getElementById("resSearchWrap");
  if (!wrap) return;
  const tr = state.lang === "tr";
  wrap.innerHTML =
    '<input id="resSearch" class="hd-search" type="search" autocomplete="off" placeholder="' +
    escapeHtml(t("resSearchPh")) + '" value="' + escapeHtml(RES.query) + '">' +
    '<div id="resResults"></div>';
  const si = document.getElementById("resSearch");
  let deb = 0;
  si.addEventListener("input", function () {
    clearTimeout(deb);
    deb = setTimeout(function () { resDoSearch(si.value.trim()); }, 450);
  });
  if (RES.query) resRenderResults();
}

function resDoSearch(q) {
  RES.query = q;
  const box = document.getElementById("resResults");
  const shelf = document.getElementById("kutubList");
  if (!box) return;
  if (!q) {
    RES.results = null; RES.searching = false;
    box.innerHTML = "";
    if (shelf) shelf.style.display = "";
    if (typeof hdTrimCache === "function") hdTrimCache();
    return;
  }
  if (shelf) shelf.style.display = "none";
  const my = ++RES.searchId;
  RES.searching = true; RES.results = null;
  box.innerHTML = '<p class="note">' + escapeHtml(t("resSearching")) + "</p>";
  hdSearchAll(q, 15).then(function (results) {
    if (my !== RES.searchId) return; // a newer search started
    RES.searching = false; RES.results = results;
    resRenderResults();
  });
}

function resSnippet(hh, which, q, terms) {
  const enHit = which === "en";
  const raw = (enHit ? hh.en.slice(0, 140) : hh.ar.slice(0, 120)) + "\u2026";
  return { html: hdHighlight(raw, q, terms, enHit), rtl: !enHit };
}

function resRenderResults() {
  const box = document.getElementById("resResults");
  if (!box || !RES.query) return;
  const tr = state.lang === "tr";
  const q = RES.query, terms = hdQueryTerms(q);
  if (RES.searching) {
    box.innerHTML = '<p class="note">' + escapeHtml(t("resSearching")) + "</p>";
    return;
  }
  const results = RES.results || [];
  // Book data may have been trimmed (e.g. after opening a book) — reload if so.
  if (results.some(function (r) { return !HD.cache[r.book]; })) { resDoSearch(q); return; }
  let h = "";
  const totalHits = results.reduce(function (a, r) { return a + r.hits.length; }, 0);
  if (!totalHits) h += '<p class="note">' + escapeHtml(t("resNoRes")) + "</p>";
  results.forEach(function (r) {
    const b = HD_BOOKS[r.book];
    const d = HD.cache[r.book];
    h += '<div class="res-bookhead"><img src="' + b.cover + '" alt="">' +
      '<span class="res-bookt">' + escapeHtml(hdTitle(b)) + "</span>" +
      '<span class="res-bookc">' + r.hits.length + " " + escapeHtml(t("hdResults")) + "</span></div>";
    h += '<div class="res-hits">' + r.hits.map(function (hit) {
      const i = hit[0], hh = d.hadiths[i];
      const sec = d.sections[String(hh.s)];
      const sn = resSnippet(hh, hit[1], q, terms);
      return '<button class="hd-resrow" data-b="' + r.book + '" data-i="' + i + '" type="button">' +
        '<span class="hd-num">#' + hh.n + "</span>" +
        '<span class="hd-rMain"><span class="hd-rSec">' + escapeHtml(tr ? sec.tr : sec.en) + "</span>" +
        '<span class="hd-rSnip"' + (sn.rtl ? ' dir="rtl" lang="ar"' : "") + ">" + sn.html + "</span></span></button>";
    }).join("") + "</div>";
  });
  // Books not yet downloaded: offer to add them to the search corpus.
  const missing = KUTUB.filter(function (b) { return !b.quran && !hdIsDownloaded(b.id); });
  if (missing.length) {
    h += '<div class="res-bookhead"><span class="res-bookt">' + escapeHtml(t("resDlToSearch")) + "</span></div>";
    h += missing.map(function (b) {
      const hb = HD_BOOKS[b.id];
      return '<div class="res-dlrow"><img src="' + b.cover + '" alt="">' +
        '<span class="res-bookt">' + escapeHtml(hdTitle(hb)) + ' \u00b7 ~' + hb.mb + " MB</span>" +
        '<button class="kutub-inapp res-dlbtn" data-dl="' + b.id + '" type="button">' +
        escapeHtml(t("hdDlBtn")) + "</button></div>";
    }).join("");
  }
  box.innerHTML = h;
  box.querySelectorAll("[data-b]").forEach(function (el) {
    el.onclick = function () { hdOpenResult(el.dataset.b, +el.dataset.i); };
  });
  box.querySelectorAll("[data-dl]").forEach(function (el) {
    el.onclick = function () { hdOpenBook(el.dataset.dl); };
  });
}
