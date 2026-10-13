/* DailyDeenHub Resources — Kutub al-Sittah library shelf. */
const KUTUB = [
  { id: "bukhari", cover: "/img/resources/covers/bukhari.jpg?v=1",
    en: "Sahih al-Bukhari", tr: "Sahih-i Buhârî",
    inapp: true, url: "https://sunnah.com/bukhari" },
  { id: "muslim", cover: "/img/resources/covers/muslim.jpg?v=1",
    en: "Sahih Muslim", tr: "Sahih-i Müslim",
    url: "https://sunnah.com/muslim" },
  { id: "abudawud", cover: "/img/resources/covers/abudawud.jpg?v=1",
    en: "Sunan Abu Dawud", tr: "Sünen-i Ebû Dâvûd",
    url: "https://sunnah.com/abudawud" },
  { id: "tirmidhi", cover: "/img/resources/covers/tirmidhi.jpg?v=1",
    en: "Jami' at-Tirmidhi", tr: "Câmiu't-Tirmizî",
    url: "https://sunnah.com/tirmidhi" },
  { id: "nasai", cover: "/img/resources/covers/nasai.jpg?v=1",
    en: "Sunan an-Nasa'i", tr: "Sünen-i Nesâî",
    url: "https://sunnah.com/nasai" },
  { id: "ibnmajah", cover: "/img/resources/covers/ibnmajah.jpg?v=1",
    en: "Sunan Ibn Majah", tr: "Sünen-i İbn Mâce",
    url: "https://sunnah.com/ibnmajah" }
];
function renderResources() {
  const box = document.getElementById("kutubList");
  if (!box) return;
  const tr = state.lang === "tr";
  box.className = "shelf-grid";
  box.innerHTML = KUTUB.map(function (b) {
    const title = tr ? b.tr : b.en;
    const badge = (b.inapp && typeof hdIsDownloaded === "function" && hdIsDownloaded())
      ? '<span class="shelf-dl">\u2713</span>' : "";
    const cover = '<span class="shelf-cover"><img src="' + b.cover + '" alt="' +
      escapeHtml(title) + '" loading="lazy">' + badge + "</span>";
    const cap = '<span class="shelf-title">' + escapeHtml(title) + "</span>";
    if (b.inapp) {
      return '<button class="shelf-book" data-goto="hadith" type="button">' + cover + cap + "</button>";
    }
    return '<a class="shelf-book" href="' + b.url + '" target="_blank" rel="noopener">' + cover + cap + "</a>";
  }).join("");
}
