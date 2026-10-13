/* DailyDeenHub Resources — Kutub al-Sittah, the six canonical hadith collections. */
const KUTUB = [
  { ar: "صحيح البخاري", en: "Sahih al-Bukhari", tr: "Sahih-i Buhârî",
    compEn: "Imam Muhammad al-Bukhari (d. 870)", compTr: "İmam Muhammed el-Buhârî (ö. 870)",
    count: "7,563",
    descEn: "The most authentic book after the Quran.",
    descTr: "Kur'an'dan sonra en sahih kitap.",
    url: "https://sunnah.com/bukhari" },
  { ar: "صحيح مسلم", en: "Sahih Muslim", tr: "Sahih-i Müslim",
    compEn: "Imam Muslim ibn al-Hajjaj (d. 875)", compTr: "İmam Müslim b. el-Haccâc (ö. 875)",
    count: "7,500",
    descEn: "Second only to Bukhari in authenticity.",
    descTr: "Sıhhat bakımından Buhârî'den sonra ikinci sırada.",
    url: "https://sunnah.com/muslim" },
  { ar: "سنن أبي داود", en: "Sunan Abu Dawud", tr: "Sünen-i Ebû Dâvûd",
    compEn: "Imam Abu Dawud (d. 889)", compTr: "İmam Ebû Dâvûd (ö. 889)",
    count: "5,274",
    descEn: "Focused on hadith of legal rulings.",
    descTr: "Fıkhî hükümlere dair hadislere odaklanır.",
    url: "https://sunnah.com/abudawud" },
  { ar: "جامع الترمذي", en: "Jami' at-Tirmidhi", tr: "Câmiu't-Tirmizî",
    compEn: "Imam at-Tirmidhi (d. 892)", compTr: "İmam Tirmizî (ö. 892)",
    count: "3,956",
    descEn: "Notes each hadith's grade and the jurists' views.",
    descTr: "Her hadisin derecesini ve fakihlerin görüşlerini kaydeder.",
    url: "https://sunnah.com/tirmidhi" },
  { ar: "سنن النسائي", en: "Sunan an-Nasa'i", tr: "Sünen-i Nesâî",
    compEn: "Imam an-Nasa'i (d. 915)", compTr: "İmam Nesâî (ö. 915)",
    count: "5,270",
    descEn: "Strong on purification and prayer.",
    descTr: "Temizlik ve namaz konularında güçlüdür.",
    url: "https://sunnah.com/nasai" },
  { ar: "سنن ابن ماجه", en: "Sunan Ibn Majah", tr: "Sünen-i İbn Mâce",
    compEn: "Imam Ibn Majah (d. 887)", compTr: "İmam İbn Mâce (ö. 887)",
    count: "4,341",
    descEn: "Completes the six canonical collections.",
    descTr: "Altı sahih kitabı tamamlar.",
    url: "https://sunnah.com/ibnmajah" }
];
function renderResources() {
  const box = document.getElementById("kutubList");
  if (!box) return;
  const tr = state.lang === "tr";
  box.innerHTML = KUTUB.map((b, i) => {
    const inner =
      `<span class="kutub-num">${i + 1}</span>` +
      `<span class="kutub-main">` +
      `<span class="kutub-ar" dir="rtl" lang="ar">${escapeHtml(b.ar)}</span>` +
      `<span class="kutub-en">${escapeHtml(tr ? b.tr : b.en)}</span>` +
      `<span class="kutub-meta">${escapeHtml(tr ? b.compTr : b.compEn)} · ~${b.count} ${escapeHtml(t("resHadith"))}</span>` +
      `<span class="kutub-desc">${escapeHtml(tr ? b.descTr : b.descEn)}</span>`;
    if (i === 0) {
      // Sahih al-Bukhari pilot: read inside the app, or online as before.
      return `<div class="kutub-card">` + inner +
        `<span class="kutub-actions"><button type="button" class="kutub-inapp" data-goto="hadith">\uD83D\uDCD6 ${escapeHtml(t("resReadInApp"))}</button>` +
        `<a class="kutub-link" href="${b.url}" target="_blank" rel="noopener">${escapeHtml(t("resRead"))} →</a></span>` +
        `</span></div>`;
    }
    return `<a class="kutub-card" href="${b.url}" target="_blank" rel="noopener">` + inner +
      `<span class="kutub-link">${escapeHtml(t("resRead"))} →</span>` +
      `</span></a>`;
  }).join("");
}
