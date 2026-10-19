/* DailyDeenHub Learning Center — lesson content (EN/TR) + list/reader renderer.
   Body blocks: ["h", text] heading | ["p", text] paragraph | ["ar", text] Arabic
   | ["tn", text] transliteration | ["dua", {ar, tn, mean}] dua card. */
let learnCurrent = null;
function learnArticles() {
  if (state.lang === "fr" && LEARN.fr) {
    const frById = {};
    LEARN.fr.forEach(function (f) { frById[f.id] = f; });
    return LEARN.en.map(function (e) {
      const f = frById[e.id];
      return f ? Object.assign({}, e, { title: f.title, desc: f.desc, body: f.body || e.body }) : e;
    });
  }
  return (LEARN[state.lang] || LEARN.en);
}
function learnBlock(b) {
  if (b[0] === "h") return "<h4>" + escapeHtml(b[1]) + "</h4>";
  if (b[0] === "p") return "<p>" + escapeHtml(b[1]) + "</p>";
  if (b[0] === "ar") return "<p class=\"ar\" dir=\"rtl\" lang=\"ar\">" + escapeHtml(b[1]) + "</p>";
  if (b[0] === "tn") return "<p class=\"tn\">" + escapeHtml(b[1]) + "</p>";
  if (b[0] === "img") return "<figure class=\"learn-fig\"><img src=\"/" + b[1] + "\" alt=\"" + escapeHtml(b[2] || "") + "\" loading=\"lazy\">" +
    (b[3] ? "<figcaption>" + escapeHtml(b[3]) + "</figcaption>" : "") + "</figure>";
  if (b[0] === "dua") return "<div class=\"dua\"><p class=\"ar\" dir=\"rtl\" lang=\"ar\">" + escapeHtml(b[1].ar) + "</p>" +
    (b[1].tn ? "<p class=\"tn\">" + escapeHtml(b[1].tn) + "</p>" : "") +
    "<p class=\"dm\">" + escapeHtml(b[1].mean) + "</p></div>";
  if (b[0] === "link") return "<button class=\"learn-card learn-inlink\" data-article-link=\"" + b[1].to + "\" type=\"button\">" +
    "<span class=\"learn-ic\">" + (b[1].icon || "📖") + "</span>" +
    "<span class=\"learn-tx\"><span class=\"learn-ti\">" + escapeHtml(b[1].title) + "</span>" +
    "<span class=\"learn-de\">" + escapeHtml(b[1].desc) + "</span></span>" +
    "<span class=\"learn-go\">\u203A</span></button>";
  return "";
}
function renderLearnList() {
  const el = document.getElementById("learnList");
  if (!el) return;
  el.innerHTML = learnArticles().map(function (a) {
    return "<button class=\"learn-card\" data-article=\"" + a.id + "\" type=\"button\">" +
      "<span class=\"learn-ic\">" + a.icon + "</span>" +
      "<span class=\"learn-tx\"><span class=\"learn-ti\">" + escapeHtml(a.title) + "</span>" +
      "<span class=\"learn-de\">" + escapeHtml(a.desc) + "</span></span>" +
      "<span class=\"learn-go\">\u203A</span></button>";
  }).join("");
  el.querySelectorAll("[data-article]").forEach(function (b) {
    b.onclick = function () { openLearnArticle(b.dataset.article); };
  });
}
const LEARN_WUDU_IMGS = ["img/learn/wudu-1-hands.webp","img/learn/wudu-2-mouth.webp","img/learn/wudu-3-nose.webp","img/learn/wudu-4-face.webp","img/learn/wudu-5-arms.webp","img/learn/wudu-6-head.webp","img/learn/wudu-7-feet.webp"];
const LEARN_PRAYER_IMGS = ["img/learn/prayer-1-qiyam.webp","img/learn/prayer-2-ruku.webp","img/learn/prayer-3-sujud.webp","img/learn/prayer-4-sitting.webp","img/learn/prayer-5-salam.webp"];
/* Free-licensed illustrations for the newer guides (Wikimedia Commons). Inserted after the first heading. */
const LEARN_IMGS = {
  "shahada": { src: "img/learn/shahada.webp", credit: "Public domain · Wikimedia Commons",
    alt: { en: "The Shahada in Arabic calligraphy", tr: "Arapça hat sanatıyla Kelime-i Şehadet", fr: "La Shahada en calligraphie arabe" } },
  "prayer-virtues": { src: "img/learn/prayer-virtues.webp", credit: "CC BY-SA 4.0 · Wikimedia Commons",
    alt: { en: "Muslims praying in congregation", tr: "Cemaatle namaz kılan Müslümanlar", fr: "Des musulmans priant en congrégation" } },
  "zakat": { src: "img/learn/zakat.webp", credit: "CC0 public domain · Wikimedia Commons",
    alt: { en: "The eight categories of zakat recipients", tr: "Zekâtın verileceği sekiz sınıf", fr: "Les huit catégories de bénéficiaires de la zakat" } },
  "sadaqah": { src: "img/learn/sadaqah.webp", credit: "CC BY-SA 4.0 · Wikimedia Commons",
    alt: { en: "An Ottoman charity stone (sadaka taşı) in Eyüp", tr: "Eyüp'te bir Osmanlı sadaka taşı", fr: "Une pierre de charité ottomane (sadaka taşı) à Eyüp" } },
  "fasting-virtues": { src: "img/learn/fasting-virtues.webp", credit: "CC BY-SA 4.0 · Wikimedia Commons",
    alt: { en: "Dates prepared for iftar", tr: "İftar için hazırlanmış hurmalar", fr: "Dattes préparées pour l'iftar" } },
  "hajj-umrah": { src: "img/learn/hajj-umrah.webp", credit: "CC BY-SA 4.0 · Wikimedia Commons",
    alt: { en: "Pilgrims around the Kaaba during Hajj", tr: "Hac sırasında Kâbe çevresinde hacılar", fr: "Pèlerins autour de la Kaaba pendant le Hajj" } }
};
function learnBodyWithImages(a) {
  const out = [];
  if (a.id === "wudu") {
    let n = 0;
    a.body.forEach(function (b) {
      out.push(b);
      if (b[0] === "p" && /^\d+\. /.test(b[1]) && n < LEARN_WUDU_IMGS.length) {
        out.push(["img", LEARN_WUDU_IMGS[n], b[1]]); n++;
      }
    });
    return out;
  }
  if (a.id === "prayer") {
    // headings: 0 Before, 1 Opening takbir, 2 Recitation, 3 Bowing, 4 Prostration, 5 Tashahhud, 6 Ending
    const afterH = { 1: 0, 3: 1, 4: 2, 5: 3, 6: 4 };
    let h = -1;
    a.body.forEach(function (b) {
      out.push(b);
      if (b[0] === "h") { h++; if (h in afterH) out.push(["img", LEARN_PRAYER_IMGS[afterH[h]], b[1]]); }
    });
    return out;
  }
  if (a.id in LEARN_IMGS) {
    const im = LEARN_IMGS[a.id];
    const alt = (im.alt[state.lang] || im.alt.en);
    let done = false;
    a.body.forEach(function (b) {
      out.push(b);
      if (!done && b[0] === "h") { out.push(["img", im.src, alt, im.credit]); done = true; }
    });
    return out;
  }
  return a.body;
}
function openLearnArticle(id) {
  const a = learnArticles().find(function (x) { return x.id === id; });
  if (!a) return;
  learnCurrent = id;
  document.getElementById("learnArticle").innerHTML =
    "<h3>" + a.icon + " " + escapeHtml(a.title) + "</h3>" +
    learnBodyWithImages(a).map(learnBlock).join("");
  document.getElementById("learnListView").classList.add("hidden");
  document.getElementById("learnArticleView").classList.remove("hidden");
  document.getElementById("learnArticle").querySelectorAll("[data-article-link]").forEach(function (el) {
    el.onclick = function () { openLearnArticle(el.getAttribute("data-article-link")); };
  });
  window.scrollTo(0, 0);
}
function learnBackToList() {
  learnCurrent = null;
  document.getElementById("learnArticleView").classList.add("hidden");
  document.getElementById("learnListView").classList.remove("hidden");
  window.scrollTo(0, 0);
}
function refreshLearnView() {
  renderLearnList();
  if (learnCurrent) {
    const id = learnCurrent; learnCurrent = null; openLearnArticle(id);
  }
}
const LEARN = {
en: [
{ id: "wudu", icon: "🧼", title: "How to Perform Wudu", desc: "Ritual ablution before prayer, step by step",
body: [
["h", "Before you begin"],
["p", "You need clean water and the intention (niyyah) in your heart to purify yourself for prayer. Begin by saying Bismillah."],
["h", "The steps"],
["p", "1. Wash both hands up to the wrists three times."],
["p", "2. Rinse the mouth three times."],
["p", "3. Rinse the nose three times, drawing water in gently and blowing it out."],
["p", "4. Wash the whole face three times, from the hairline to the chin and from ear to ear."],
["p", "5. Wash the right arm up to and including the elbow three times, then the left arm."],
["p", "6. With wet hands, wipe over the whole head once (mas\u1E25): place your wet hand at your front hairline and wipe backward over your head, then wipe the ears inside and out once. (Wiping over a headcover is only an exception for extreme necessity \u2014 for example, when visible to non-mahrams.)"],
["p", "7. Wash the right foot up to and including the ankle three times, then the left, making sure water reaches between the toes."],
["p", "Note: washing three times is sunnah \\u2014 washing once fulfills the obligation."],
["h", "What breaks wudu"],
["p", "Sleep, using the toilet, passing wind, and any bleeding are among the things that nullify wudu. When any of these happen, perform wudu again before the next prayer."],
["h", "Good to know"],
["p", "Keep the order, do not leave long gaps between the steps, and be thorough without wasting water \u2014 the Prophet \uFDFA warned against excess even at a flowing river."]
] },
{ id: "prayer", icon: "🕌", title: "How to Pray \u2014 Step by Step", desc: "A two-rak'ah prayer from takbir to salam",
body: [
["h", "Before you pray"],
["p", "Make sure you have wudu, your body, clothes and prayer place are clean, you are dressed for prayer (men cover from navel to knee; women cover everything except the face and hands), you are facing the qibla, and the prayer time has begun."],
["h", "The opening takbir"],
["p", "Stand facing the qibla and make the intention in your heart for the prayer you are about to perform. Raise your hands to your ears and say:"],
["dua", { ar: "\u0627\u0644\u0644\u0647\u064F \u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064F", tn: "Allahu Akbar", mean: "Allah is the Greatest." }],
["h", "Recitation"],
["p", "Place your right hand over your left on your chest and recite Surah Al-Fatiha:"],
["ar", "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650. \u0627\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f \u0644\u0650\u0644\u0647\u0650 \u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0652\u0639\u064e\u0627\u0644\u064e\u0645\u0650\u064a\u0646\u064e. \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650. \u0645\u064e\u0627\u0644\u0650\u0643\u0650 \u064a\u064e\u0648\u0652\u0645\u0650 \u0627\u0644\u062f\u0650\u0651\u064a\u0646\u0650. \u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e \u0646\u064e\u0639\u0652\u0628\u064f\u062f\u064f \u0648\u064e\u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e \u0646\u064e\u0633\u0652\u062a\u064e\u0639\u0650\u064a\u0646\u064f. \u0627\u0647\u0652\u062f\u0650\u0646\u064e\u0627 \u0627\u0644\u0635\u0650\u0651\u0631\u064e\u0627\u0637\u064e \u0627\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0650\u064a\u0645\u064e. \u0635\u0650\u0631\u064e\u0627\u0637\u064e \u0627\u0644\u064e\u0651\u0630\u0650\u064a\u0646\u064e \u0623\u064e\u0646\u0652\u0639\u064e\u0645\u0652\u062a\u064e \u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652 \u063a\u064e\u064a\u0652\u0631\u0650 \u0627\u0644\u0652\u0645\u064e\u063a\u0652\u0636\u064f\u0648\u0628\u0650 \u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652 \u0648\u064e\u0644\u064e\u0627 \u0627\u0644\u0636\u064e\u0651\u0627\u0644\u0650\u0651\u064a\u0646\u064e. \u0622\u0645\u0650\u064a\u0646\u064e."],
["tn", "Bismillahir-rahmanir-raheem. Alhamdu lillahi rabbil-'alameen. Ar-rahmanir-raheem. Maliki yawmid-deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinas-siratal-mustaqeem. Siratal-lazeena an'amta 'alayhim, ghayril-maghdoobi 'alayhim wa lad-dalleen. Ameen."],
["p", "Then recite a short surah, for example Al-Ikhlas:"],
["ar", "\u0642\u064F\u0644\u0652 \u0647\u064F\u0648\u064E \u0627\u0644\u0644\u0647\u064F \u0623\u064E\u062d\u064E\u062f\u064C. \u0627\u0644\u0644\u0647\u064F \u0627\u0644\u0635\u064e\u0651\u0645\u064E\u062f\u064F. \u0644\u064e\u0645\u0652 \u064a\u064e\u0644\u0650\u062f\u0652 \u0648\u064e\u0644\u064e\u0645\u0652 \u064a\u064F\u0648\u0644\u064e\u062f\u0652. \u0648\u064e\u0644\u064e\u0645\u0652 \u064a\u064e\u0643\u064F\u0646\u0652 \u0644\u064e\u0647\u064F \u0643\u064F\u0641\u064F\u0648\u064B\u0627 \u0623\u064E\u062d\u064E\u062f\u064C."],
["tn", "Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yoolad. Wa lam yakun lahu kufuwan ahad."],
["p", "Meaning: Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, and there is nothing like Him."],
["h", "Bowing (ruku')"],
["p", "Say Allahu Akbar, bow with your hands on your knees and your back level, and say three times:"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0631\u064e\u0628\u0650\u0651\u064a\u064e \u0627\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u0650", tn: "Subhana Rabbiyal-'Adheem", mean: "Glory be to my Lord, the Most Great." }],
["p", "Rise from bowing saying:"],
["dua", { ar: "\u0633\u064E\u0645\u0650\u0639\u064E \u0627\u0644\u0644\u0647\u064F \u0644\u0650\u0645\u064e\u0646\u0652 \u062d\u064e\u0645\u0650\u062f\u064e\u0647\u064F", tn: "Sami' Allahu liman hamidah", mean: "Allah hears those who praise Him." }],
["p", "Standing upright, say: Rabban\u0101 wa lakal-\u1E25amd \u2014 Our Lord, to You belongs all praise."],
["h", "Prostration (sujud)"],
["p", "Say Allahu Akbar and prostrate with your forehead, nose, both hands, both knees and the toes of both feet on the ground. Say three times:"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0631\u064e\u0628\u0650\u0651\u064a\u064e \u0627\u0644\u0652\u0623\u064e\u0639\u0652\u0644\u064e\u0649", tn: "Subhana Rabbiyal-A'la", mean: "Glory be to my Lord, the Most High." }],
["p", "Sit up briefly, then prostrate a second time. This completes one rak'ah. Stand up for the second rak'ah, which is performed the same way."],
["h", "The tashahhud"],
["p", "After the second prostration of the second rak'ah, sit and recite:"],
["ar", "\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f \u0644\u0650\u0644\u0647\u0650 \u0648\u064e\u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f \u0648\u064e\u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f\u060c \u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064e \u0623\u064e\u064a\u064f\u0651\u0647\u064e\u0627 \u0627\u0644\u0646\u064e\u0651\u0628\u0650\u064a\u064f\u0651 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u0647\u0650 \u0648\u064e\u0628\u064e\u0631\u064e\u0643\u064e\u0627\u062a\u064f\u0647\u064f\u060c \u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0639\u0650\u0628\u064e\u0627\u062f\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u0650\u064a\u0646\u064e\u060c \u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0627\u0644\u0644\u0647\u064f \u0648\u064e\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u064e\u0651 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064b\u0627 \u0639\u064e\u0628\u0652\u062f\u064f\u0647\u064f \u0648\u064e\u0631\u064e\u0633\u064f\u0648\u0644\u064f\u0647\u064f."],
["tn", "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu 'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-saliheen. Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan 'abduhu wa rasooluh."],
["p", "Meaning: All greetings, prayers and good things belong to Allah. Peace be upon you, O Prophet, and Allah's mercy and blessings. Peace be upon us and upon Allah's righteous servants. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and Messenger."],
["h", "Ending the prayer"],
["p", "Turn your head to the right and say:"],
["dua", { ar: "\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064f\u0645\u0652 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u0647\u0650", tn: "As-salamu 'alaykum wa rahmatullah", mean: "Peace and Allah's mercy be upon you." }],
["p", "Then turn to the left and repeat it. Your prayer is complete. Fajr is prayed as two rak'ahs like this; Dhuhr, Asr and Isha are four rak'ahs; Maghrib is three."],
["h", "Notes for sisters"],
["p", "The prayer is the same, with a few differences in posture (Hanafi practice):"],
["p", "\u2022 At the opening takbir, raise your hands to shoulder height rather than to the ears."],
["p", "\u2022 Fold your hands on your chest."],
["p", "\u2022 In ruku, bow a little less deeply and keep your arms close to your body."],
["p", "\u2022 In sujud, keep your elbows tucked against your sides and your body compact."],
["p", "\u2022 When sitting, rest with both feet drawn out to the right side."],
["link", { to: "prayer-virtues", icon: "✨", title: "The Virtues of Prayer", desc: "Why the five daily prayers are a gift, not a burden" }]
] }
,
{ id: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "The foundation of the faith — tap a pillar for its detailed guide",
body: [
["p", "The Prophet \uFDFA said: \u201CIslam is built upon five: the testimony that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, giving zakat, fasting Ramadan, and Hajj to the House.\u201D (Sahih al-Bukhari, Sahih Muslim). Each pillar below opens its own detailed guide \u2014 with how-tos, virtues, duas and dhikr."],
["link", { to: "shahada", icon: "\u261D\uFE0F", title: "1. Shahada \u2014 The Testimony", desc: "Its meaning, conditions and what it demands" }],
["link", { to: "prayer", icon: "🕌", title: "2. Salah \u2014 The Five Daily Prayers", desc: "Step-by-step guide, plus the virtues of prayer" }],
["link", { to: "zakat", icon: "🤲", title: "3. Zakat \u2014 Obligatory Charity", desc: "Nisab, rates, recipients and Zakat al-Fitr" }],
["link", { to: "fasting-virtues", icon: "🌙", title: "4. Sawm \u2014 Fasting", desc: "The virtues of fasting, plus the Ramadan guide" }],
["link", { to: "hajj-umrah", icon: "🕋", title: "5. Hajj & Umrah \u2014 The Pilgrimage", desc: "The rites step by step, with duas and dhikr" }]
] },
{ id: "duas", icon: "🤲", title: "Morning & Evening Remembrances", desc: "Daily adhkar from Hisnul Muslim",
body: [
["p", "The Prophet \uFDFA taught short remembrances for the morning and evening. Here are five to begin with \u2014 even one of them, said with presence of heart, is a strong start."],
["h", "Ayat al-Kursi"],
["p", "Recite after every prayer and before sleep:"],
["ar", "\u0627\u0644\u0644\u0647\u064F \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0647\u064F\u0648\u064E \u0627\u0644\u0652\u062d\u064e\u064a\u064f\u0651 \u0627\u0644\u0652\u0642\u064e\u064a\u064f\u0651\u0648\u0645\u064f \u06da \u0644\u064e\u0627 \u062a\u064e\u0623\u0652\u062e\u064f\u0630\u064f\u0647\u064F \u0633\u0650\u0646\u064e\u0629\u064C \u0648\u064e\u0644\u064e\u0627 \u0646\u064e\u0648\u0652\u0645\u064C \u06da \u0644\u064e\u0647\u064F \u0645\u064e\u0627 \u0641\u0650\u064a \u0627\u0644\u0633\u064e\u0651\u0645\u064e\u0627\u0648\u064e\u0627\u062a\u0650 \u0648\u064e\u0645\u064e\u0627 \u0641\u0650\u064a \u0627\u0644\u0652\u0623\u064e\u0631\u0652\u0636\u0650 \u06da \u0645\u064e\u0646\u0652 \u0630\u064e\u0627 \u0627\u0644\u064e\u0651\u0630\u0650\u064a \u064a\u064e\u0634\u0652\u0641\u064e\u0639\u064f \u0639\u0650\u0646\u0652\u062f\u064e\u0647\u064F \u0625\u0650\u0644\u0627\u064e\u0651 \u0628\u0650\u0625\u0650\u0630\u0652\u0646\u0650\u0647\u0650 \u06da \u064a\u064e\u0639\u0652\u0644\u064e\u0645\u064f \u0645\u064e\u0627 \u0628\u064e\u064a\u0652\u0646\u064e \u0623\u064e\u064a\u0652\u062f\u0650\u064a\u0647\u0650\u0645\u0652 \u0648\u064e\u0645\u064e\u0627 \u062e\u064e\u0644\u0652\u0641\u064e\u0647\u064f\u0645\u0652 \u06d6 \u0648\u064e\u0644\u064e\u0627 \u064a\u064f\u062d\u0650\u064a\u0637\u064f\u0648\u0646\u064e \u0628\u0650\u0634\u064e\u064a\u0652\u0621\u064D \u0645\u0650\u0652\u0646\u0652 \u0639\u0650\u0644\u0652\u0645\u0650\u0647\u0650 \u0625\u0650\u0644\u0627\u064e\u0651 \u0628\u0650\u0645\u064e\u0627 \u0634\u064e\u0627\u0621\u064e \u06da \u0648\u064e\u0633\u0650\u0639\u064e \u0643\u064F\u0631\u0652\u0633\u0650\u064a\u064f\u0651\u0647\u064f \u0627\u0644\u0633\u064e\u0651\u0645\u064e\u0627\u0648\u064e\u0627\u062a\u0650 \u0648\u064e\u0627\u0644\u0652\u0623\u064e\u0631\u0652\u0636\u064e \u06d6 \u0648\u064e\u0644\u064e\u0627 \u064a\u064e\u0626\u064f\u0648\u062f\u064f\u0647\u064F \u062d\u0650\u0641\u0652\u0638\u064f\u0647\u064f\u0645\u064e\u0627 \u06da \u0648\u064e\u0647\u064F\u0648\u064e \u0627\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u064f\u0651 \u0627\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u064f"],
["p", "Meaning: Allah \u2014 there is no god but He, the Ever-Living, the Sustainer. Neither drowsiness nor sleep overtakes Him\u2026 (Quran 2:255)"],
["h", "Sayyid al-Istighfar \u2014 the master of seeking forgiveness"],
["p", "Say once in the morning and once in the evening:"],
["ar", "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e \u0631\u064e\u0628\u0650\u0651\u064a \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e\u060c \u062e\u064e\u0644\u064e\u0642\u0652\u062a\u064e\u0646\u0650\u064a \u0648\u064e\u0623\u064e\u0646\u064e\u0627 \u0639\u064e\u0628\u0652\u062f\u064f\u0643\u064e\u060c \u0648\u064e\u0623\u064e\u0646\u064e\u0627 \u0639\u064e\u0644\u064e\u0649 \u0639\u064e\u0647\u0652\u062f\u0650\u0643\u064e \u0648\u064e\u0648\u064e\u0639\u0652\u062f\u0650\u0643\u064e \u0645\u064e\u0627 \u0627\u0633\u0652\u062a\u064e\u0637\u064e\u0639\u0652\u062a\u064f\u060c \u0623\u064e\u0639\u064f\u0648\u0630\u064f \u0628\u0650\u0643\u064e \u0645\u0650\u0646\u0652 \u0634\u064e\u0631\u0650\u0651 \u0645\u064e\u0627 \u0635\u064e\u0646\u064e\u0639\u0652\u062a\u064f\u060c \u0623\u064e\u0628\u064f\u0648\u0621\u064f \u0644\u064e\u0643\u064e \u0628\u0650\u0646\u0650\u0639\u0652\u0645\u064e\u062a\u0650\u0643\u064e \u0639\u064e\u0644\u064e\u064a\u064e\u0651\u060c \u0648\u064e\u0623\u064e\u0628\u064f\u0648\u0621\u064f \u0628\u0650\u0630\u064e\u0646\u0652\u0628\u0650\u064a \u0641\u064e\u0627\u063a\u0652\u0641\u0650\u0631\u0652 \u0644\u0650\u064a\u060c \u0641\u064e\u0625\u0650\u0646\u064e\u0651\u0647\u064f \u0644\u064e\u0627 \u064a\u064e\u063a\u0652\u0641\u0650\u0631\u064f \u0627\u0644\u0630\u064f\u0651\u0646\u064f\u0648\u0628\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e"],
["tn", "Allahumma anta Rabbi, la ilaha illa ant; khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't; a'udhu bika min sharri ma sana't; aboo'u laka bi ni'matika 'alayy, wa aboo'u bi dhanbi faghfir li, fa innahu la yaghfiruz-zunooba illa ant."],
["p", "Meaning: O Allah, You are my Lord; there is no god but You. You created me and I am Your servant, and I hold to Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin \u2014 so forgive me, for none forgives sins but You."],
["h", "The morning and evening dua"],
["ar", "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0628\u0650\u0643\u064e \u0623\u064e\u0635\u0652\u0628\u064e\u062d\u0652\u0646\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0623\u064e\u0645\u0652\u0633\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0646\u064e\u062d\u0652\u064a\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0646\u064e\u0645\u064f\u0648\u062a\u064f \u0648\u064e\u0625\u0650\u0644\u064e\u064a\u0652\u0643\u064e \u0627\u0644\u0646\u064f\u0651\u0634\u064f\u0648\u0631\u064f"],
["tn", "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namootu, wa ilaykan-nushoor."],
["p", "Meaning: O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the resurrection. (In the evening: \u2026wa ilaykal-maseer \u2014 and to You is the return.)"],
["h", "SubhanAllahi wa bihamdihi \u2014 100 times"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0627\u0644\u0644\u0647\u0650 \u0648\u064e\u0628\u0650\u062d\u064e\u0645\u0652\u062f\u0650\u0647\u0650", tn: "SubhanAllahi wa bihamdihi", mean: "Glory be to Allah and praise Him." }],
["p", "The Prophet \uFDFA said: whoever says this one hundred times a day, his sins are forgiven even if they are like the foam of the sea."],
["h", "For protection \u2014 3 times"],
["dua", { ar: "\u0623\u064e\u0639\u064F\u0648\u0630\u064f \u0628\u0650\u0643\u064e\u0644\u0650\u0645\u064e\u0627\u062a\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u062a\u064e\u0651\u0627\u0645\u064e\u0651\u0627\u062a\u0650 \u0645\u0650\u0646\u0652 \u0634\u064e\u0631\u0650\u0651 \u0645\u064e\u0627 \u062e\u064e\u0644\u064e\u0642\u064e", tn: "A'udhu bikalimatillah it-tammati min sharri ma khalaq", mean: "I seek refuge in the perfect words of Allah from the evil of what He created." }]
] },
{ id: "ramadan", icon: "🌙", title: "Ramadan Guide", desc: "Fasting, taraweeh, Laylat al-Qadr and Eid",
body: [
["h", "The fast"],
["p", "From the first light of dawn (fajr) until sunset (maghrib), abstain from food, drink and marital relations. The sick, travelers, pregnant and nursing women, and women in menstruation are excused \u2014 they make up the missed days later, or feed a poor person for each day if they are unable to fast at all."],
["h", "Suhoor and iftar"],
["p", "Take the pre-dawn meal (suhoor) \u2014 even a sip of water carries blessing \u2014 and break the fast at sunset, following the sunnah with dates and water. At iftar say:"],
["dua", { ar: "\u0630\u064e\u0647\u064e\u0628\u064e \u0627\u0644\u0638\u064e\u0651\u0645\u064e\u0623\u064f \u0648\u064e\u0627\u0628\u0652\u062a\u064e\u0644\u064e\u0651\u062a\u0650 \u0627\u0644\u0652\u0639\u064f\u0631\u064f\u0648\u0642\u064f \u0648\u064e\u062b\u064e\u0628\u064e\u062a\u064e \u0627\u0644\u0652\u0623\u064e\u062c\u0652\u0631\u064f \u0625\u0650\u0646\u0652 \u0634\u064e\u0627\u0621\u064e \u0627\u0644\u0644\u0647\u064f", tn: "Dhahabaz-zama'u wabtallatil-'urooqu wa thabatal-ajru in sha Allah", mean: "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills." }],
["h", "Taraweeh and Laylat al-Qadr"],
["p", "The night prayer (taraweeh) is prayed after Isha, often in congregation at the mosque. Seek Laylat al-Qadr \u2014 the Night of Decree, better than a thousand months \u2014 in the odd nights of the last ten days. On those nights repeat often:"],
["dua", { ar: "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0625\u0646\u064e\u0651\u0643\u064e \u0639\u064e\u0641\u064f\u0648\u064c\u0651 \u062a\u064f\u062d\u0650\u0628\u064f\u0651 \u0627\u0644\u0652\u0639\u064e\u0641\u0652\u0648\u064e \u0641\u064e\u0627\u0639\u0652\u0641\u064f \u0639\u064e\u0646\u0650\u0651\u064a", tn: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni", mean: "O Allah, You are Pardoning and love to pardon, so pardon me." }],
["h", "Zakat al-Fitr and Eid"],
["p", "Before the Eid prayer, give Zakat al-Fitr \u2014 a measure of staple food (or its value) for each member of the household \u2014 so the poor can celebrate too. Eid al-Fitr begins with the congregational prayer and the takbirat, followed by days of joy: visiting family, sharing food, and remembering Allah."],
["link", { to: "fasting-virtues", icon: "🌙", title: "The Virtues of Fasting", desc: "Why fasting is among the most beloved deeds" }]
] },
{ id: "shahada", icon: "\u261D\uFE0F", title: "The Shahada \u2014 The Testimony of Faith", desc: "Its meaning, conditions and what it demands",
body: [
["h", "The words"],
["dua", { ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ", tn: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasoolullah", mean: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah." }],
["h", "What it means"],
["p", "\u201CLa ilaha illa Allah\u201D is a denial and an affirmation: a denial that anything deserves worship \u2014 no idol, no saint, no power of nature \u2014 and an affirmation that worship belongs to Allah alone."],
["p", "\u201CMuhammadan rasoolullah\u201D means accepting him \uFDFA as Allah's final Messenger: believing his message, obeying his commands, and following his example."],
["h", "Its conditions"],
["p", "Scholars mention seven conditions for the testimony to benefit the one who says it: (1) knowledge of its meaning, (2) certainty without doubt, (3) acceptance, (4) submission and compliance, (5) truthfulness, (6) sincerity \u2014 said for Allah alone, and (7) love for it and its people."],
["h", "What contradicts it"],
["p", "The testimony is broken by its opposites \u2014 above all shirk (associating partners with Allah), and by mocking anything of the religion. Allah says: \u201CIndeed, Allah does not forgive association with Him...\u201D (Quran 4:48)."],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "prayer-virtues", icon: "✨", title: "The Virtues of Prayer", desc: "Why the five daily prayers are a gift, not a burden",
body: [
["h", "An expiation between prayers"],
["p", "\u201CThe five daily prayers and from one Jumu'ah to the next expiate the sins committed between them, as long as major sins are avoided.\u201D \u2014 Sahih Muslim"],
["h", "A river at your door"],
["p", "The Prophet \uFDFA asked: if there were a river at one's door in which he bathed five times a day, would any dirt remain? \u201CThat is the parable of the five prayers \u2014 Allah wipes out sins with them.\u201D \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Congregation: twenty-seven times more"],
["p", "\u201CPrayer in congregation is twenty-seven times more meritorious than prayer performed alone.\u201D \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Fajr and Isha in congregation"],
["p", "\u201CWhoever prays Isha in congregation, it is as if he prayed half the night; and whoever prays Fajr in congregation, it is as if he prayed the whole night.\u201D \u2014 Sahih Muslim"],
["h", "Steps to the mosque"],
["p", "Every step taken toward the mosque raises a degree and erases a sin \u2014 Sahih Muslim. And waiting for the next prayer after finishing one is \u201Cribat\u201D (like guarding the frontiers) \u2014 Sahih Muslim."],
["h", "The first thing asked about"],
["p", "\u201CThe first deed for which a person will be brought to account on the Day of Resurrection is the prayer.\u201D \u2014 Sunan al-Tirmidhi"],
["link", { to: "prayer", icon: "🕌", title: "How to Pray \u2014 Step by Step", desc: "The practical guide to the prayer itself" }],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "zakat", icon: "🤲", title: "Zakat \u2014 The Obligatory Charity", desc: "Nisab, rates, recipients and Zakat al-Fitr",
body: [
["h", "What it is"],
["p", "Zakat is the obligatory charity on qualifying wealth held for one lunar year \u2014 2.5% of savings, gold, silver and trade goods. It is not a favour to the poor; it is their right in your wealth (Quran 51:19)."],
["h", "The nisab (threshold)"],
["p", "Zakat becomes due when your zakatable wealth reaches the nisab \u2014 approximately 85 grams of gold or 595 grams of silver \u2014 and a full lunar year has passed over it."],
["h", "Who receives it"],
["p", "Allah names eight categories in the Quran (9:60): the poor (fuqara), the needy (masakin), those employed to administer it, those whose hearts are to be reconciled, freeing captives, those in debt, in the cause of Allah, and the stranded traveller."],
["h", "Zakat al-Fitr"],
["p", "Before the Eid al-Fitr prayer, every Muslim \u2014 for themselves and each dependent \u2014 gives about 2.5 to 3 kg of staple food (or its value) to the poor, so that no one goes hungry on the day of Eid. It also purifies the fast from idle talk. \u2014 Sunan Abi Dawud"],
["h", "A warning"],
["p", "\u201CAnd those who hoard gold and silver and do not spend it in the way of Allah \u2014 give them tidings of a painful punishment.\u201D \u2014 Quran 9:34"],
["link", { to: "sadaqah", icon: "💝", title: "Sadaqah \u2014 Voluntary Charity", desc: "Beyond the obligation: the virtues of giving" }],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "sadaqah", icon: "💝", title: "Sadaqah \u2014 Voluntary Charity", desc: "The virtues of giving beyond the obligation",
body: [
["h", "A shade on the Last Day"],
["p", "\u201CSeven will be shaded by Allah on the Day when there is no shade but His...\u201D \u2014 among them, a person who gives charity so secretly that his left hand does not know what his right hand has given. \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "It extinguishes sin"],
["p", "\u201CCharity extinguishes sin as water extinguishes fire.\u201D \u2014 Sunan al-Tirmidhi"],
["h", "Even half a date"],
["p", "\u201CProtect yourselves from the Fire, even with half a date.\u201D No gift is too small. \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "A smile is charity"],
["p", "Smiling at your brother, enjoining good, forbidding evil, guiding a lost person, removing harm from the road \u2014 all are sadaqah. \u2014 Sunan al-Tirmidhi"],
["h", "Sadaqah Jariyah \u2014 charity that keeps giving"],
["p", "\u201CWhen a person dies, his deeds come to an end except three: ongoing charity, knowledge that is benefited from, or a righteous child who prays for him.\u201D \u2014 Sahih Muslim"],
["h", "Give in secret, give often"],
["p", "Secret charity is more virtuous and more sincere; but giving openly is also good when it encourages others. The best charity is what the soul can truly spare, given consistently."],
["link", { to: "zakat", icon: "🤲", title: "Zakat \u2014 The Obligatory Charity", desc: "The pillar of obligatory giving" }],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "fasting-virtues", icon: "🌙", title: "The Virtues of Fasting", desc: "Why fasting is among the most beloved deeds",
body: [
["h", "\u201CFasting is for Me\u201D"],
["p", "Allah says in a hadith qudsi: \u201CEvery deed of the son of Adam is for him, except fasting \u2014 it is for Me, and I shall reward for it.\u201D \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "The gate of Ar-Rayyan"],
["p", "\u201CIn Paradise there is a gate called Ar-Rayyan, through which those who fasted will enter on the Day of Resurrection, and no one else will enter through it.\u201D \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Two joys"],
["p", "The fasting person has two joys: joy at breaking the fast, and joy at meeting Allah. And the breath of the fasting person is sweeter to Allah than the scent of musk. \u2014 Sahih al-Bukhari"],
["h", "A shield"],
["p", "\u201CFasting is a shield\u201D \u2014 it guards against sinful desires and, with patience, against the Fire. \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Laylat al-Qadr"],
["p", "\u201CWhoever stands (in prayer) on Laylat al-Qadr out of faith and hope for reward, his previous sins are forgiven.\u201D Seek it in the odd nights of the last ten days of Ramadan. \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Voluntary fasts through the year"],
["p", "Mondays and Thursdays (the Prophet's \uFDFA habit \u2014 Sunan al-Tirmidhi); six days of Shawwal (\u201Cas if he fasted the whole year\u201D \u2014 Sahih Muslim); the day of Arafah (expiates the past and coming year \u2014 Sahih Muslim); Ashura (the 10th of Muharram); and the \u201Cwhite days\u201D \u2014 the 13th, 14th and 15th of each lunar month."],
["link", { to: "ramadan", icon: "🌙", title: "Ramadan Guide", desc: "Fasting, taraweeh, Laylat al-Qadr and Eid" }],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "hajj-umrah", icon: "🕋", title: "Hajj & Umrah \u2014 A Practical Guide", desc: "The rites step by step, with duas and dhikr",
body: [
["h", "What they are"],
["p", "Hajj is the pilgrimage to the Kaaba in Makkah during Dhul-Hijjah \u2014 obligatory once in a lifetime for every Muslim who is physically and financially able (Quran 3:97). Umrah is the lesser pilgrimage, which can be performed at any time of year."],
["h", "The Talbiyah"],
["p", "From the moment of ihram, the pilgrim repeatedly recites:"],
["dua", { ar: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ", tn: "Labbayka Allahumma labbayk, labbayka la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.", mean: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise and blessings are Yours, and all sovereignty \u2014 You have no partner." }],
["h", "Umrah \u2014 step by step"],
["p", "1. Enter ihram at the miqat: ghusl, the two white cloths (men), and the intention with the Talbiyah. 2. Tawaf: circle the Kaaba seven times counter-clockwise, starting at the Black Stone. 3. Pray two rak'ahs behind Maqam Ibrahim. 4. Sa'i: walk seven times between Safa and Marwa. 5. Halq or taqsir: shave or trim the hair \u2014 Umrah is complete."],
["h", "Hajj \u2014 step by step"],
["p", "1. Ihram on the 8th of Dhul-Hijjah (Yawm al-Tarwiyah) and go to Mina. 2. On the 9th, stand at Arafah from noon until sunset \u2014 the heart of Hajj (\u201CHajj is Arafah\u201D \u2014 Sunan al-Tirmidhi). 3. After sunset go to Muzdalifah, pray Maghrib and Isha together, and collect pebbles. 4. On the 10th (Eid day): stone the Jamarat al-Aqaba, offer the sacrifice, shave/trim, then Tawaf al-Ifadah. 5. The days of Tashriq (11th\u201313th): stone all three jamarat each day, staying at Mina. 6. Farewell Tawaf before leaving Makkah."],
["h", "The best dua"],
["p", "\u201CThe best supplication is the supplication of the day of Arafah.\u201D Repeat often: La ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir. \u2014 Sunan al-Tirmidhi"],
["h", "Dhikr of the ten days"],
["p", "The first ten days of Dhul-Hijjah are the most beloved days for good deeds \u2014 fill them with tahlil (La ilaha illa Allah), takbir (Allahu Akbar) and tahmid (Alhamdulillah). \u2014 Sahih al-Bukhari"],
["h", "Before you go"],
["p", "Learn the rites from a reliable scholar or guide before travelling, settle debts, seek forgiveness from people, and make sincere intention \u2014 Hajj Mabroor (the accepted Hajj) has no reward but Paradise (Sahih al-Bukhari, Sahih Muslim)."],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
],
tr: [
{ id: "wudu", icon: "🧼", title: "Abdest Nasıl Alınır", desc: "Namaz öncesi abdest, adım adım",
body: [
["h", "Başlamadan önce"],
["p", "Temiz suya ve namaz için arınma niyetine ihtiyacınız var; niyet kalpten yapılır. Bismillah diyerek başlayın."],
["h", "Adımlar"],
["p", "1. Elleri bileklere kadar üç kez yıkayın."],
["p", "2. Ağzı üç kez çalkalayın."],
["p", "3. Burna üç kez su çekip sümkürün."],
["p", "4. Yüzü saç bitiminden çeneye, kulaktan kulağa üç kez yıkayın."],
["p", "5. Önce sağ, sonra sol kolu dirseklerle birlikte üç kez yıkayın."],
["p", "6. Islak ellerle başın tamamını bir kez mesh edin: ıslak elinizi alnınızdaki saç bitimine koyup başınızın üzerinden geriye doğru mesh edin, ardından kulakların içini ve dışını bir kez mesh edin. (Başörtüsü üzerinden mesh etmek, yalnızca aşırı zaruret hâlinde \u2014 örneğin nâmahremlerin görebileceği bir yerde \u2014 istisnadır.)"],
["p", "7. Önce sağ, sonra sol ayağı topuklarla birlikte üç kez yıkayın; suyun parmak aralarına ulaştığından emin olun."],
["p", "Not: Üçer kez yıkamak sünnettir \\u2014 birer kez yıkamak farzı yerine getirir."],
["h", "Abdesti bozan şeyler"],
["p", "Uyku, tuvalet ihtiyacı, yellenme ve kanama abdesti bozan şeylerdendir. Bunlardan biri olursa bir sonraki namazdan önce yeniden abdest alın."],
["h", "Bilmekte fayda var"],
["p", "Sıraya uyun, adımlar arasında uzun ara vermeyin; suyu israf etmeden ama eksiksiz yıkayın \u2014 Peygamberimiz \uFDFA, akan bir nehir kenarında bile israftan sakındırmıştır."]
] },
{ id: "prayer", icon: "🕌", title: "Namaz Nasıl Kılınır \u2014 Adım Adım", desc: "Tekbirden selama iki rekât namaz",
body: [
["h", "Namazdan önce"],
["p", "Abdestli olun; bedeniniz, elbiseniz ve namaz kıldığınız yer temiz olsun; namaza uygun giyinin (erkekler göbek ile diz arasını, kadınlar yüz ve eller hariç her yerini örter); kıbleye dönün ve vaktin girdiğinden emin olun."],
["h", "İftitah tekbiri"],
["p", "Kıbleye dönün, kılacağınız namaza kalben niyet edin, ellerinizi kulak hizasına kaldırıp şöyle deyin:"],
["dua", { ar: "\u0627\u0644\u0644\u0647\u064F \u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064F", tn: "Allahu Ekber", mean: "Allah en büyüktür." }],
["h", "Kıraat"],
["p", "Sağ eli sol elin üzerine göğse koyun ve Fatiha suresini okuyun:"],
["ar", "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650. \u0627\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f \u0644\u0650\u0644\u0647\u0650 \u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0652\u0639\u064e\u0627\u0644\u064e\u0645\u0650\u064a\u0646\u064e. \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650. \u0645\u064e\u0627\u0644\u0650\u0643\u0650 \u064a\u064e\u0648\u0652\u0645\u0650 \u0627\u0644\u062f\u0650\u0651\u064a\u0646\u0650. \u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e \u0646\u064e\u0639\u0652\u0628\u064f\u062f\u064f \u0648\u064e\u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e \u0646\u064e\u0633\u0652\u062a\u064e\u0639\u0650\u064a\u0646\u064f. \u0627\u0647\u0652\u062f\u0650\u0646\u064e\u0627 \u0627\u0644\u0635\u0650\u0651\u0631\u064e\u0627\u0637\u064e \u0627\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0650\u064a\u0645\u064e. \u0635\u0650\u0631\u064e\u0627\u0637\u064e \u0627\u0644\u064e\u0651\u0630\u0650\u064a\u0646\u064e \u0623\u064e\u0646\u0652\u0639\u064e\u0645\u0652\u062a\u064e \u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652 \u063a\u064e\u064a\u0652\u0631\u0650 \u0627\u0644\u0652\u0645\u064e\u063a\u0652\u0636\u064f\u0648\u0628\u0650 \u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652 \u0648\u064e\u0644\u064e\u0627 \u0627\u0644\u0636\u064e\u0651\u0627\u0644\u0650\u0651\u064a\u0646\u064e. \u0622\u0645\u0650\u064a\u0646\u064e."],
["tn", "Bismillahirrahmanirrahim. Elhamdü lillahi rabbil âlemin. Errahmanirrahim. Maliki yevmiddin. İyyake na'büdü ve iyyake neste'in. İhdinas-sıratal müstakim. Sıratallezine en'amte aleyhim, ğayril mağdubi aleyhim ve leddallin. Âmin."],
["p", "Ardından kısa bir sure okuyun, örneğin İhlas:"],
["ar", "\u0642\u064F\u0644\u0652 \u0647\u064F\u0648\u064E \u0627\u0644\u0644\u0647\u064F \u0623\u064E\u062d\u064E\u062f\u064C. \u0627\u0644\u0644\u0647\u064F \u0627\u0644\u0635\u064e\u0651\u0645\u064E\u062f\u064F. \u0644\u064e\u0645\u0652 \u064a\u064e\u0644\u0650\u062f\u0652 \u0648\u064e\u0644\u064e\u0645\u0652 \u064a\u064F\u0648\u0644\u064e\u062f\u0652. \u0648\u064e\u0644\u064e\u0645\u0652 \u064a\u064e\u0643\u064F\u0646\u0652 \u0644\u064e\u0647\u064F \u0643\u064F\u0641\u064F\u0648\u064B\u0627 \u0623\u064E\u062d\u064E\u062f\u064C."],
["tn", "Kul hüvallahü ehad. Allahüs-samed. Lem yelid ve lem yuled. Ve lem yekün lehu küfüven ehad."],
["p", "Anlamı: De ki: O Allah birdir. Allah Samed'dir (her şey O'na muhtaçtır, O hiçbir şeye muhtaç değildir). Doğurmamış ve doğurulmamıştır. Hiçbir şey O'na denk değildir."],
["h", "Rükû"],
["p", "Allahu Ekber diyerek rükûa eğilin; eller dizlerde, sırt düz olsun ve üç kez söyleyin:"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0631\u064e\u0628\u0650\u0651\u064a\u064e \u0627\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u0650", tn: "Sübhane Rabbiyel-azim", mean: "Yüce Rabbimi bütün noksanlıklardan tenzih ederim." }],
["p", "Rükûdan doğrulurken deyin:"],
["dua", { ar: "\u0633\u064E\u0645\u0650\u0639\u064E \u0627\u0644\u0644\u0647\u064F \u0644\u0650\u0645\u064e\u0646\u0652 \u062d\u064e\u0645\u0650\u062f\u064e\u0647\u064F", tn: "Semi'allahü limen hamideh", mean: "Allah, kendisine hamd edeni işitti." }],
["p", "Dik durunca deyin: Rabbenâ ve lekel-hamd \u2014 Rabbimiz, hamd sanadır."],
["h", "Secde"],
["p", "Allahu Ekber diyerek secdeye gidin; alın, burun, iki el, iki diz ve ayak parmak uçları yerde olsun. Üç kez söyleyin:"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0631\u064e\u0628\u0650\u0651\u064a\u064e \u0627\u0644\u0652\u0623\u064e\u0639\u0652\u0644\u064e\u0649", tn: "Sübhane Rabbiyel-a'lâ", mean: "En Yüce Rabbimi tenzih ederim." }],
["p", "Kısaca oturun, sonra ikinci secdeyi yapın. Böylece bir rekât tamamlanır. İkinci rekât için ayağa kalkın; aynı şekilde kılınır."],
["h", "Teşehhüd"],
["p", "İkinci rekâtın ikinci secdesinden sonra oturun ve okuyun:"],
["ar", "\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f \u0644\u0650\u0644\u0647\u0650 \u0648\u064e\u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f \u0648\u064e\u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f\u060c \u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064e \u0623\u064e\u064a\u064f\u0651\u0647\u064e\u0627 \u0627\u0644\u0646\u064e\u0651\u0628\u0650\u064a\u064f\u0651 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u0647\u0650 \u0648\u064e\u0628\u064e\u0631\u064e\u0643\u064e\u0627\u062a\u064f\u0647\u064f\u060c \u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0639\u0650\u0628\u064e\u0627\u062f\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u0650\u064a\u0646\u064e\u060c \u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0627\u0644\u0644\u0647\u064f \u0648\u064e\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u064e\u0651 \u0645\u064F\u062d\u064e\u0645\u064e\u0651\u062f\u064B\u0627 \u0639\u064e\u0628\u0652\u062f\u064f\u0647\u064f \u0648\u064e\u0631\u064e\u0633\u064f\u0648\u0644\u064f\u0647\u064f."],
["tn", "Ettehiyyatü lillahi ves-salavatü vet-tayyibat. Esselamü aleyke eyyühen-nebiyyü ve rahmetullahi ve berakatüh. Esselamü aleyna ve ala ibadillahis-salihin. Eşhedü en la ilahe illallah ve eşhedü enne Muhammeden abdühü ve resulüh."],
["p", "Anlamı: Bütün dualar, ibadetler ve güzellikler Allah'a aittir. Ey Nebi, selam sana; Allah'ın rahmeti ve bereketi üzerine olsun. Selam bize ve Allah'ın salih kullarına olsun. Şahitlik ederim ki Allah'tan başka ilah yoktur ve yine şahitlik ederim ki Muhammed O'nun kulu ve elçisidir."],
["h", "Namazı bitirme"],
["p", "Başınızı sağa çevirip deyin:"],
["dua", { ar: "\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064f\u0645\u0652 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u0647\u0650", tn: "Esselamü aleyküm ve rahmetullah", mean: "Selam üzerinize olsun, Allah'ın rahmeti de." }],
["p", "Sonra sola çevirip tekrarlayın. Namazınız tamamdır. Sabah namazı böyle iki rekât kılınır; öğle, ikindi ve yatsı dört, akşam üç rekâttır."],
["h", "Hanımlar için notlar"],
["p", "Namaz aynıdır; duruşta birkaç fark vardır (Hanefi mezhebine göre):"],
["p", "\u2022 İftitah tekbirinde elleri kulaklara değil omuz hizasına kaldırın."],
["p", "\u2022 Elleri göğüs üzerinde bağlayın."],
["p", "\u2022 Rükûda biraz daha az eğilin ve kolları vücuda yakın tutun."],
["p", "\u2022 Secdede dirsekleri vücuda yapışık tutun, vücudu toplu tutun."],
["p", "\u2022 Oturuşta iki ayağı sağ tarafa alarak oturun."],
["link", { to: "prayer-virtues", icon: "✨", title: "Namazın Faziletleri", desc: "Beş vakit namaz neden bir yük değil, bir nimettir" }]
] },
{ id: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Dinin temeli — detaylı rehber için bir şarta dokunun",
body: [
["p", "Peygamber Efendimiz \uFDFA buyurdu: \u201Cİslam beş esas üzerine kurulmuştur: Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın elçisi olduğuna şahitlik etmek, namazı kılmak, zekâtı vermek, Ramazan orucunu tutmak ve Beytullah'ı haccetmek.\u201D (Sahih-i Buhari, Sahih-i Müslim). Her şartın altında detaylı rehberi bulacaksınız \u2014 yapılışı, faziletleri, duaları ve zikirleriyle."],
["link", { to: "shahada", icon: "\u261D\uFE0F", title: "1. Kelime-i Şehadet", desc: "Manası, şartları ve gerekleri" }],
["link", { to: "prayer", icon: "🕌", title: "2. Namaz \u2014 Beş Vakit", desc: "Adım adım kılınışı ve namazın faziletleri" }],
["link", { to: "zakat", icon: "🤲", title: "3. Zekât", desc: "Nisap, oranlar, kimlere verilir ve fitre" }],
["link", { to: "fasting-virtues", icon: "🌙", title: "4. Oruç", desc: "Orucun faziletleri ve Ramazan rehberi" }],
["link", { to: "hajj-umrah", icon: "🕋", title: "5. Hac ve Umre", desc: "Adım adım menasik, dualar ve zikirler" }]
] },
{ id: "duas", icon: "🤲", title: "Sabah-Akşam Zikirleri", desc: "Hisnul Muslim'den günlük dualar",
body: [
["p", "Peygamberimiz \uFDFA sabah ve akşam için kısa zikirler öğretmiştir. İşte başlangıç için beş tanesi \u2014 kalpten gelerek söylenen biri bile güçlü bir başlangıçtır."],
["h", "Ayetel Kürsi"],
["p", "Her namazdan sonra ve yatmadan önce okuyun:"],
["ar", "\u0627\u0644\u0644\u0647\u064F \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0647\u064F\u0648\u064E \u0627\u0644\u0652\u062d\u064e\u064a\u064f\u0651 \u0627\u0644\u0652\u0642\u064e\u064a\u064f\u0651\u0648\u0645\u064f \u06da \u0644\u064e\u0627 \u062a\u064e\u0623\u0652\u062e\u064f\u0630\u064f\u0647\u064F \u0633\u0650\u0646\u064e\u0629\u064C \u0648\u064e\u0644\u064e\u0627 \u0646\u064e\u0648\u0652\u0645\u064C \u06da \u0644\u064e\u0647\u064F \u0645\u064e\u0627 \u0641\u0650\u064a \u0627\u0644\u0633\u064e\u0651\u0645\u064e\u0627\u0648\u064e\u0627\u062a\u0650 \u0648\u064e\u0645\u064e\u0627 \u0641\u0650\u064a \u0627\u0644\u0652\u0623\u064e\u0631\u0652\u0636\u0650 \u06da \u0645\u064e\u0646\u0652 \u0630\u064e\u0627 \u0627\u0644\u064e\u0651\u0630\u0650\u064a \u064a\u064e\u0634\u0652\u0641\u064e\u0639\u064f \u0639\u0650\u0646\u0652\u062f\u064e\u0647\u064F \u0625\u0650\u0644\u0627\u064e\u0651 \u0628\u0650\u0625\u0650\u0630\u0652\u0646\u0650\u0647\u0650 \u06da \u064a\u064e\u0639\u0652\u0644\u064e\u0645\u064f \u0645\u064e\u0627 \u0628\u064e\u064a\u0652\u0646\u064e \u0623\u064e\u064a\u0652\u062f\u0650\u064a\u0647\u0650\u0645\u0652 \u0648\u064e\u0645\u064e\u0627 \u062e\u064e\u0644\u0652\u0641\u064e\u0647\u064f\u0645\u0652 \u06d6 \u0648\u064e\u0644\u064e\u0627 \u064a\u064f\u062d\u0650\u064a\u0637\u064f\u0648\u0646\u064e \u0628\u0650\u0634\u064e\u064a\u0652\u0621\u064D \u0645\u0650\u0652\u0646\u0652 \u0639\u0650\u0644\u0652\u0645\u0650\u0647\u0650 \u0625\u0650\u0644\u0627\u064e\u0651 \u0628\u0650\u0645\u064e\u0627 \u0634\u064e\u0627\u0621\u064e \u06da \u0648\u064e\u0633\u0650\u0639\u064e \u0643\u064F\u0631\u0652\u0633\u0650\u064a\u064f\u0651\u0647\u064f \u0627\u0644\u0633\u064e\u0651\u0645\u064e\u0627\u0648\u064e\u0627\u062a\u0650 \u0648\u064e\u0627\u0644\u0652\u0623\u064e\u0631\u0652\u0636\u064e \u06d6 \u0648\u064e\u0644\u064e\u0627 \u064a\u064e\u0626\u064f\u0648\u062f\u064f\u0647\u064F \u062d\u0650\u0641\u0652\u0638\u064f\u0647\u064f\u0645\u064e\u0627 \u06da \u0648\u064e\u0647\u064F\u0648\u064e \u0627\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u064f\u0651 \u0627\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u064f"],
["p", "Anlamı: Allah \u2014 O'ndan başka ilah yoktur; diridir, her şeyi ayakta tutandır. O'nu ne uyuklama ne uyku tutar\u2026 (Bakara 2:255)"],
["h", "Seyyidül İstiğfar \u2014 istiğfarın efendisi"],
["p", "Sabah ve akşam birer kez söyleyin:"],
["ar", "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e \u0631\u064e\u0628\u0650\u0651\u064a \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e\u060c \u062e\u064e\u0644\u064e\u0642\u0652\u062a\u064e\u0646\u0650\u064a \u0648\u064e\u0623\u064e\u0646\u064e\u0627 \u0639\u064e\u0628\u0652\u062f\u064f\u0643\u064e\u060c \u0648\u064e\u0623\u064e\u0646\u064e\u0627 \u0639\u064e\u0644\u064e\u0649 \u0639\u064e\u0647\u0652\u062f\u0650\u0643\u064e \u0648\u064e\u0648\u064e\u0639\u0652\u062f\u0650\u0643\u064e \u0645\u064e\u0627 \u0627\u0633\u0652\u062a\u064e\u0637\u064e\u0639\u0652\u062a\u064f\u060c \u0623\u064e\u0639\u064f\u0648\u0630\u064f \u0628\u0650\u0643\u064e \u0645\u0650\u0646\u0652 \u0634\u064e\u0631\u0650\u0651 \u0645\u064e\u0627 \u0635\u064e\u0646\u064e\u0639\u0652\u062a\u064f\u060c \u0623\u064e\u0628\u064f\u0648\u0621\u064f \u0644\u064e\u0643\u064e \u0628\u0650\u0646\u0650\u0639\u0652\u0645\u064e\u062a\u0650\u0643\u064e \u0639\u064e\u0644\u064e\u064a\u064e\u0651\u060c \u0648\u064e\u0623\u064e\u0628\u064f\u0648\u0621\u064f \u0628\u0650\u0630\u064e\u0646\u0652\u0628\u0650\u064a \u0641\u064e\u0627\u063a\u0652\u0641\u0650\u0631\u0652 \u0644\u0650\u064a\u060c \u0641\u064e\u0625\u0650\u0646\u064e\u0651\u0647\u064f \u0644\u064e\u0627 \u064a\u064e\u063a\u0652\u0641\u0650\u0631\u064f \u0627\u0644\u0630\u064f\u0651\u0646\u064f\u0648\u0628\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e"],
["tn", "Allahümme ente Rabbi, la ilahe illa ente; halakteni ve ene abdüke, ve ene ala ahdike ve va'dike mesteta'tü; eûzü bike min şerri ma sana'tü; ebûü leke bi ni'metike aleyye ve ebûü bi zenbi fağfir li, fe innehu la yağfiruz-zünübe illa ente."],
["p", "Anlamı: Allah'ım, Sen benim Rabbimsin; Senden başka ilah yoktur. Beni Sen yarattın, ben Senin kulunum; gücüm yettiğince ahdine ve vaadine bağlıyım. Yaptıklarımın şerrinden Sana sığınırım. Üzerimdeki nimetini itiraf eder, günahımı itiraf ederim; beni bağışla, çünkü günahları Senden başka bağışlayacak yoktur."],
["h", "Sabah-akşam duası"],
["ar", "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0628\u0650\u0643\u064e \u0623\u064e\u0635\u0652\u0628\u064e\u062d\u0652\u0646\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0623\u064e\u0645\u0652\u0633\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0646\u064e\u062d\u0652\u064a\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0646\u064e\u0645\u064f\u0648\u062a\u064f \u0648\u064e\u0625\u0650\u0644\u064e\u064a\u0652\u0643\u064e \u0627\u0644\u0646\u064f\u0651\u0634\u064f\u0648\u0631\u064f"],
["tn", "Allahümme bike asbahnâ ve bike emseynâ ve bike nahyâ ve bike nemûtü ve ileyken-nüşûr."],
["p", "Anlamı: Allah'ım, Seninle sabahladık, Seninle akşamladık; Seninle yaşar, Seninle ölürüz ve diriliş Sanadır. (Akşam: \u2026ve ileykel-masîr \u2014 dönüş Sanadır.)"],
["h", "Sübhanallahi ve bihamdihi \u2014 100 kez"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0627\u0644\u0644\u0647\u0650 \u0648\u064e\u0628\u0650\u062d\u064e\u0645\u0652\u062f\u0650\u0647\u0650", tn: "Sübhanallahi ve bihamdihi", mean: "Allah'ı hamd ile tesbih ederim." }],
["p", "Peygamberimiz \uFDFA buyurdu: Kim günde yüz kez bunu söylerse, günahları deniz köpüğü kadar da olsa bağışlanır."],
["h", "Korunma duası \u2014 3 kez"],
["dua", { ar: "\u0623\u064e\u0639\u064F\u0648\u0630\u064f \u0628\u0650\u0643\u064e\u0644\u0650\u0645\u064e\u0627\u062a\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u062a\u064e\u0651\u0627\u0645\u064e\u0651\u0627\u062a\u0650 \u0645\u0650\u0646\u0652 \u0634\u064e\u0631\u0650\u0651 \u0645\u064e\u0627 \u062e\u064e\u0644\u064e\u0642\u064e", tn: "Eûzü bi kelimatillah-it-tâmmâti min şerri ma halak", mean: "Yarattıklarının şerrinden Allah'ın eksiksiz kelimelerine sığınırım." }]
] },
{ id: "ramadan", icon: "🌙", title: "Ramazan Rehberi", desc: "Oruç, teravih, Kadir Gecesi ve bayram",
body: [
["h", "Oruç"],
["p", "İmsaktan (sabah namazı vakti) gün batımına (akşam) kadar yeme, içme ve cinsel ilişkiden uzak durulur. Unutarak yemek orucu bozmaz. Hasta, yolcu, hamile ve emziren kadınlar ile âdetli kadınlar muaftır; tutamadıkları günleri sonra kaza ederler (hiç tutamayan her gün için bir yoksulu doyurur)."],
["h", "Sahur ve iftar"],
["p", "Sahura kalkın \u2014 bir yudum su bile berekettir \u2014 ve güneş batınca, sünnete uyarak hurma ve su ile orucu açın. İftarda şöyle deyin:"],
["dua", { ar: "\u0630\u064e\u0647\u064e\u0628\u064e \u0627\u0644\u0638\u064e\u0651\u0645\u064e\u0623\u064f \u0648\u064e\u0627\u0628\u0652\u062a\u064e\u0644\u064e\u0651\u062a\u0650 \u0627\u0644\u0652\u0639\u064f\u0631\u064f\u0648\u0642\u064f \u0648\u064e\u062b\u064e\u0628\u064e\u062a\u064e \u0627\u0644\u0652\u0623\u064e\u062c\u0652\u0631\u064f \u0625\u0650\u0646\u0652 \u0634\u064e\u0627\u0621\u064e \u0627\u0644\u0644\u0647\u064f", tn: "Zehebez-zameü vebtelletil-urûku ve sebetel-ecru inşaallah", mean: "Susuzluk gitti, damarlar ıslandı ve inşaallah ecir sabit oldu." }],
["h", "Teravih ve Kadir Gecesi"],
["p", "Yatsıdan sonra cemaatle teravih namazı kılınır. Bin aydan hayırlı Kadir Gecesi'ni son on günün tek gecelerinde arayın. O gecelerde sık sık şunu tekrarlayın:"],
["dua", { ar: "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0625\u0646\u064e\u0651\u0643\u064e \u0639\u064e\u0641\u064f\u0648\u064c\u0651 \u062a\u064f\u062d\u0650\u0628\u064f\u0651 \u0627\u0644\u0652\u0639\u064e\u0641\u0652\u0648\u064e \u0641\u064e\u0627\u0639\u0652\u0641\u064f \u0639\u064e\u0646\u0650\u0651\u064a", tn: "Allahümme inneke afüvvün tühibbül-afve fa'fü anni", mean: "Allah'ım, Sen affedicisin, affetmeyi seversin; beni affet." }],
["h", "Fitre ve bayram"],
["p", "Bayram namazından önce fitreyi verin \u2014 evdeki her kişi için bir ölçü temel gıda (veya bedeli) \u2014 ki yoksullar da bayramı yaşayabilsin. Ramazan Bayramı, cemaatle kılınan bayram namazı ve tekbirlerle başlar; ardından sevinç günleri gelir: akraba ziyareti, sofra paylaşımı ve Allah'ı anmak."],
["link", { to: "fasting-virtues", icon: "🌙", title: "Orucun Faziletleri", desc: "Oruç neden en sevimli amellerdendir" }]
] },
{ id: "shahada", icon: "\u261D\uFE0F", title: "Kelime-i Şehadet", desc: "Manası, şartları ve gerekleri",
body: [
["h", "Sözleri"],
["dua", { ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ", tn: "Eşhedü en la ilahe illallah ve eşhedü enne Muhammeden resulullah", mean: "Şahitlik ederim ki Allah'tan başka ilah yoktur ve yine şahitlik ederim ki Muhammed Allah'ın elçisidir." }],
["h", "Manası"],
["p", "\u201CLa ilahe illallah\u201D bir inkâr ve bir ikrardır: ibadete layık hiçbir varlığın olmadığı inkârı \u2014 ne put, ne evliya, ne tabiat gücü \u2014 ve ibadetin yalnızca Allah'a ait olduğunun ikrarı."],
["p", "\u201CMuhammeden resulullah\u201D ise O'nu \uFDFA Allah'ın son elçisi olarak kabul etmek demektir: mesajına inanmak, emirlerine uymak ve örneğini takip etmek."],
["h", "Şartları"],
["p", "Âlimler, şehadetin söyleyene fayda vermesi için yedi şart sayar: (1) manasını bilmek, (2) şüphesiz kesin inanmak, (3) kabul etmek, (4) teslim olup gereğini yapmak, (5) doğru sözlü olmak, (6) ihlâs \u2014 yalnızca Allah için söylemek ve (7) onu ve ehlini sevmek."],
["h", "Onu bozan şeyler"],
["p", "Şehadet, zıtlarıyla bozulur \u2014 başta şirk (Allah'a ortak koşmak) ve dinle alay etmek gelir. Allah buyurur: \u201CŞüphesiz Allah, kendisine ortak koşulmasını bağışlamaz...\u201D (Nisâ 4:48)."],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "prayer-virtues", icon: "✨", title: "Namazın Faziletleri", desc: "Beş vakit namaz neden bir yük değil, bir nimettir",
body: [
["h", "Namazlar arası günahlara kefaret"],
["p", "\u201CBeş vakit namaz ve bir cumadan diğerine, büyük günahlardan sakınıldıkça aralarındaki günahlara kefarettir.\u201D \u2014 Sahih-i Müslim"],
["h", "Kapının önündeki nehir"],
["p", "Peygamber Efendimiz \uFDFA sordu: Birinizin kapısı önünde bir nehir olsa ve günde beş kez yıkansa kirden eser kalır mı? \u201Cİşte beş vakit namaz da böyledir \u2014 Allah onlarla günahları siler.\u201D \u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Cemaatle namaz: yirmi yedi kat"],
["p", "\u201CCemaatle kılınan namaz, tek başına kılınan namazdan yirmi yedi kat daha faziletlidir.\u201D \u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Sabah ve yatsıyı cemaatle kılmak"],
["p", "\u201CKim yatsıyı cemaatle kılarsa gece yarısını namazla geçirmiş gibi olur; kim sabahı cemaatle kılarsa bütün geceyi namazla geçirmiş gibi olur.\u201D \u2014 Sahih-i Müslim"],
["h", "Camiye atılan adımlar"],
["p", "Camiye doğru atılan her adım bir derece yükseltir, bir günahı siler \u2014 Sahih-i Müslim. Bir namazı kılıp diğerini beklemek ise \u201Cribât\u201Dtır (nöbet tutmak gibidir) \u2014 Sahih-i Müslim."],
["h", "İlk sorulacak amel"],
["p", "\u201CKıyamet günü kulun ilk hesaba çekileceği amel namazdır.\u201D \u2014 Sünen-i Tirmizî"],
["link", { to: "prayer", icon: "🕌", title: "Namaz Nasıl Kılınır \u2014 Adım Adım", desc: "Namazın kılınışının pratik rehberi" }],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "zakat", icon: "🤲", title: "Zekât", desc: "Nisap, oranlar, kimlere verilir ve fitre",
body: [
["h", "Nedir"],
["p", "Zekât, bir kamerî yıl elde tutulan malın farz olan sadakasıdır: birikim, altın, gümüş ve ticaret mallarının %2,5'i. Yoksula yapılan bir iyilik değil, malınızdaki onların hakkıdır (Zâriyât 51:19)."],
["h", "Nisap (ölçü)"],
["p", "Zekâta tabi mal nisaba \u2014 yaklaşık 85 gram altın veya 595 gram gümüş değerine \u2014 ulaşıp üzerinden bir kamerî yıl geçince zekât farz olur."],
["h", "Kimlere verilir"],
["p", "Allah Kur'an'da (Tevbe 9:60) sekiz sınıf sayar: fakirler, miskinler, zekât memurları, kalpleri ısındırılacaklar, esirler, borçlular, Allah yolundakiler ve yolda kalmışlar."],
["h", "Fitre (fıtır sadakası)"],
["p", "Ramazan Bayramı namazından önce her Müslüman \u2014 kendisi ve bakmakla yükümlü olduğu her kişi için \u2014 yaklaşık 2,5\u20133 kg temel gıda (veya değeri) verir; ta ki bayram günü kimse aç kalmasın. Ayrıca orucun boş sözlerden arınmasına vesile olur. \u2014 Sünen-i Ebû Dâvûd"],
["h", "Bir uyarı"],
["p", "\u201CAltını ve gümüşü biriktirip Allah yolunda harcamayanlara acı bir azabı müjdele.\u201D \u2014 Tevbe 9:34"],
["link", { to: "sadaqah", icon: "💝", title: "Sadaka", desc: "Farzın ötesinde: vermenin faziletleri" }],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "sadaqah", icon: "💝", title: "Sadaka", desc: "Farzın ötesinde vermenin faziletleri",
body: [
["h", "Mahşerde bir gölge"],
["p", "\u201CAllah, kendi gölgesinden başka gölge olmayan günde yedi sınıfı gölgelendirecektir...\u201D \u2014 bunlardan biri, sağ elinin verdiğini sol eli bilmeyecek kadar gizli sadaka verendir. \u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Günahı söndürür"],
["p", "\u201CSadaka, suyun ateşi söndürdüğü gibi günahı söndürür.\u201D \u2014 Sünen-i Tirmizî"],
["h", "Yarım hurma bile"],
["p", "\u201CYarım hurmayla da olsa cehennemden korunun.\u201D Hiçbir iyilik küçük değildir. \u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Tebessüm de sadakadır"],
["p", "Kardeşine tebessüm, iyiliği emredip kötülükten sakındırmak, yolunu kaybedene yol göstermek, yoldaki eziyeti kaldırmak \u2014 hepsi sadakadır. \u2014 Sünen-i Tirmizî"],
["h", "Sadaka-i câriye \u2014 devam eden sadaka"],
["p", "\u201Cİnsan ölünce ameli kesilir; ancak üçü müstesna: devam eden sadaka, faydalanılan ilim ve kendisine dua eden salih evlat.\u201D \u2014 Sahih-i Müslim"],
["h", "Gizli ver, düzenli ver"],
["p", "Gizli sadaka daha faziletli ve daha ihlâslıdır; ancak başkalarını teşvik edecekse açıktan vermek de güzeldir. En hayırlı sadaka, gönlün gerçekten kıyabildiği ve düzenli olandır."],
["link", { to: "zakat", icon: "🤲", title: "Zekât", desc: "Farz olan vermenin şartı" }],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "fasting-virtues", icon: "🌙", title: "Orucun Faziletleri", desc: "Oruç neden en sevimli amellerdendir",
body: [
["h", "\u201COruç benim içindir\u201D"],
["p", "Allah kutsi hadiste buyurur: \u201CÂdemoğlunun her ameli kendisi içindir; ancak oruç müstesna \u2014 o benim içindir ve onun mükâfatını ben veririm.\u201D \u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Reyyân kapısı"],
["p", "\u201CCennette Reyyân denilen bir kapı vardır; kıyamet günü oruçlular oradan girer, başkası giremez.\u201D \u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "İki sevinç"],
["p", "Oruçlunun iki sevinci vardır: iftar sevinci ve Rabbine kavuşma sevinci. Oruçlunun ağız kokusu Allah katında misk kokusundan daha güzeldir. \u2014 Sahih-i Buhari"],
["h", "Bir kalkandır"],
["p", "\u201COruç kalkandır\u201D \u2014 nefsin arzularına karşı korur, sabırla cehenneme karşı da siper olur. \u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Kadir Gecesi"],
["p", "\u201CKim Kadir Gecesi'ni imanla ve sevabını umarak ihya ederse geçmiş günahları bağışlanır.\u201D Onu Ramazan'ın son on gününün tek gecelerinde arayın. \u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Yıl içindeki nafile oruçlar"],
["p", "Pazartesi ve perşembe (Efendimiz'in \uFDFA âdeti \u2014 Sünen-i Tirmizî); Şevval'den altı gün (\u201Cyılı oruçla geçirmiş gibi olur\u201D \u2014 Sahih-i Müslim); Arefe günü (geçmiş ve gelecek yılın günahlarına kefaret \u2014 Sahih-i Müslim); Aşure (Muharrem'in 10'u); ve \u201Cbeyaz günler\u201D \u2014 her kamerî ayın 13, 14 ve 15'i."],
["link", { to: "ramadan", icon: "🌙", title: "Ramazan Rehberi", desc: "Oruç, teravih, Kadir Gecesi ve bayram" }],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "hajj-umrah", icon: "🕋", title: "Hac ve Umre \u2014 Pratik Rehber", desc: "Adım adım menasik, dualar ve zikirler",
body: [
["h", "Nedirler"],
["p", "Hac, Zilhicce ayında Mekke'de Kâbe'yi ziyarettir \u2014 gücü yeten her Müslümana ömürde bir kez farzdır (Âl-i İmrân 3:97). Umre ise yılın her zamanı yapılabilen küçük hacdır."],
["h", "Telbiye"],
["p", "İhrama girildiği andan itibaren hacı şu sözleri tekrarlar:"],
["dua", { ar: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ", tn: "Lebbeyk Allahümme lebbeyk, lebbeyke lâ şerîke leke lebbeyk. İnnel-hamde ven-ni'mete leke vel-mülk, lâ şerîke lek.", mean: "Buyur Allah'ım buyur, emrindeyim. Buyur, senin ortağın yoktur, buyur. Hamd ve nimet sanadır, mülk de senindir \u2014 ortağın yoktur." }],
["h", "Umre \u2014 adım adım"],
["p", "1. Mîkatta ihrama girilir: gusül, iki parça beyaz ihram (erkekler), telbiye ile niyet. 2. Tavaf: Hacerülesved'den başlayarak Kâbe yedi kez tavaf edilir. 3. Makam-ı İbrahim arkasında iki rekât namaz. 4. Sa'y: Safa ile Merve arasında yedi kez yürünür. 5. Tıraş veya saç kısaltma \u2014 umre tamamlanır."],
["h", "Hac \u2014 adım adım"],
["p", "1. Zilhicce'nin 8'inde (terviye günü) ihrama girilip Mina'ya gidilir. 2. 9'unda Arafat'ta öğleden gün batımına vakfe \u2014 haccın özüdür (\u201CHac Arafat'tır\u201D \u2014 Sünen-i Tirmizî). 3. Gün batımından sonra Müzdelife'ye gidilir, akşamla yatsı birleştirilir, taşlar toplanır. 4. 10'unda (bayram günü): büyük şeytana taş atılır, kurban kesilir, tıraş olunur, ardından ziyaret tavafı yapılır. 5. Teşrik günleri (11\u201313): Mina'da kalınıp her gün üç cemreye taş atılır. 6. Mekke'den ayrılmadan önce veda tavafı yapılır."],
["h", "En faziletli dua"],
["p", "\u201CEn hayırlı dua, Arefe günü yapılan duadır.\u201D Sıkça tekrarlayın: Lâ ilahe illallah vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr. \u2014 Sünen-i Tirmizî"],
["h", "On günün zikri"],
["p", "Zilhicce'nin ilk on günü, salih amellerin en sevimli olduğu günlerdir \u2014 tehlil (Lâ ilahe illallah), tekbir (Allahu Ekber) ve tahmid (Elhamdülillah) ile doldurun. \u2014 Sahih-i Buhari"],
["h", "Yola çıkmadan önce"],
["p", "Güvenilir bir hocadan menasiki öğrenin, borçlarınızı kapatın, insanlardan helallik alın ve niyeti halis tutun \u2014 makbul haccın karşılığı ancak cennettir (Sahih-i Buhari, Sahih-i Müslim)."],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
],
fr: [
{ id: "wudu", title: "Comment faire le Wudu", desc: "Les ablutions rituelles avant la pri\u00e8re, \u00e9tape par \u00e9tape",
body: [
["h", "Avant de commencer"],
["p", "Pour prier, il vous faut de l'eau propre et l'intention (niyyah) dans votre c\u0153ur de vous purifier. Commencez par dire Bismillah."],
["h", "Les \u00e9tapes"],
["p", "1. Lavez-vous les deux mains jusqu'aux poignets, trois fois."],
["p", "2. Rincez-vous la bouche trois fois."],
["p", "3. Rincez-vous le nez trois fois, en inspirant l'eau doucement puis en la rejetant."],
["p", "4. Lavez-vous tout le visage trois fois, de la racine des cheveux au menton, et d'une oreille \u00e0 l'autre."],
["p", "5. Lavez-vous le bras droit jusqu'au coude inclus trois fois, puis le bras gauche."],
["p", "6. Avec les mains mouill\u00e9es, passez-les une fois sur toute la t\u00eate (mas\u1e25) : placez votre main mouill\u00e9e \u00e0 la naissance des cheveux sur le front et passez-la vers l'arri\u00e8re sur la t\u00eate, puis essuyez l'int\u00e9rieur et l'ext\u00e9rieur des oreilles une fois. (Passer les mains sur un couvre-chef n'est une exception qu'en cas d'extr\u00eame n\u00e9cessit\u00e9 \u2014 par exemple, en pr\u00e9sence de personnes non-mahram.)"],
["p", "7. Lavez-vous le pied droit jusqu'\u00e0 la cheville incluse trois fois, puis le pied gauche, en veillant \u00e0 ce que l'eau atteigne entre les orteils."],
["p", "Note : laver trois fois est une sunna \u2014 laver une seule fois remplit l'obligation."],
["h", "Ce qui annule le wudu"],
["p", "Le sommeil, le fait d'aller aux toilettes, les gaz et tout saignement font partie des choses qui annulent le wudu. Si l'un de ces cas survient, refaites le wudu avant la prochaine pri\u00e8re."],
["h", "Bon \u00e0 savoir"],
["p", "Respectez l'ordre, ne laissez pas de longs intervalles entre les \u00e9tapes, et soyez minutieux sans gaspiller l'eau \u2014 le Proph\u00e8te \ufdfa a mis en garde contre l'exc\u00e8s, m\u00eame au bord d'une rivi\u00e8re qui coule."],
] },
{ id: "prayer", title: "Comment prier \u2014 \u00c9tape par \u00e9tape", desc: "Une pri\u00e8re de deux rak'ahs, du takbir au salam",
body: [
["h", "Avant de prier"],
["p", "Assurez-vous d'avoir le wudu ; votre corps, vos v\u00eatements et votre lieu de pri\u00e8re doivent \u00eatre propres ; habillez-vous convenablement pour la pri\u00e8re (les hommes couvrent du nombril aux genoux ; les femmes couvrent tout sauf le visage et les mains) ; tournez-vous vers la qibla et assurez-vous que l'heure de la pri\u00e8re est entr\u00e9e."],
["h", "Le takbir d'ouverture"],
["p", "Tenez-vous face \u00e0 la qibla et formulez dans votre c\u0153ur l'intention pour la pri\u00e8re que vous allez accomplir. Levez les mains \u00e0 hauteur des oreilles et dites :"],
["dua", { ar: "\u0627\u0644\u0644\u0647\u064F \u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064F", tn: "Allahu Akbar", mean: "Allah est le Plus Grand." }],
["h", "La r\u00e9citation"],
["p", "Posez votre main droite sur votre main gauche, sur votre poitrine, et r\u00e9citez la sourate Al-Fatiha :"],
["ar", "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650. \u0627\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f \u0644\u0650\u0644\u0647\u0650 \u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0652\u0639\u064e\u0627\u0644\u064e\u0645\u0650\u064a\u0646\u064e. \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650. \u0645\u064e\u0627\u0644\u0650\u0643\u0650 \u064a\u064e\u0648\u0652\u0645\u0650 \u0627\u0644\u062f\u0650\u0651\u064a\u0646\u0650. \u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e \u0646\u064e\u0639\u0652\u0628\u064f\u062f\u064f \u0648\u064e\u0625\u0650\u064a\u064e\u0651\u0627\u0643\u064e \u0646\u064e\u0633\u0652\u062a\u064e\u0639\u0650\u064a\u0646\u064f. \u0627\u0647\u0652\u062f\u0650\u0646\u064e\u0627 \u0627\u0644\u0635\u0650\u0651\u0631\u064e\u0627\u0637\u064e \u0627\u0644\u0652\u0645\u064f\u0633\u0652\u062a\u064e\u0642\u0650\u064a\u0645\u064e. \u0635\u0650\u0631\u064e\u0627\u0637\u064e \u0627\u0644\u064e\u0651\u0630\u0650\u064a\u0646\u064e \u0623\u064e\u0646\u0652\u0639\u064e\u0645\u0652\u062a\u064e \u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652 \u063a\u064e\u064a\u0652\u0631\u0650 \u0627\u0644\u0652\u0645\u064e\u063a\u0652\u0636\u064f\u0648\u0628\u0650 \u0639\u064e\u0644\u064e\u064a\u0652\u0647\u0650\u0645\u0652 \u0648\u064e\u0644\u064e\u0627 \u0627\u0644\u0636\u064e\u0651\u0627\u0644\u0650\u0651\u064a\u0646\u064e. \u0622\u0645\u0650\u064a\u0646\u064e."],
["tn", "Bismillahir-rahmanir-raheem. Alhamdu lillahi rabbil-'alameen. Ar-rahmanir-raheem. Maliki yawmid-deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinas-siratal-mustaqeem. Siratal-lazeena an'amta 'alayhim, ghayril-maghdoobi 'alayhim wa lad-dalleen. Ameen."],
["p", "Puis r\u00e9citez une courte sourate, par exemple Al-Ikhlas :"],
["ar", "\u0642\u064F\u0644\u0652 \u0647\u064F\u0648\u064E \u0627\u0644\u0644\u0647\u064F \u0623\u064E\u062d\u064E\u062f\u064C. \u0627\u0644\u0644\u0647\u064F \u0627\u0644\u0635\u064e\u0651\u0645\u064E\u062f\u064F. \u0644\u064e\u0645\u0652 \u064a\u064e\u0644\u0650\u062f\u0652 \u0648\u064e\u0644\u064e\u0645\u0652 \u064a\u064F\u0648\u0644\u064e\u062f\u0652. \u0648\u064e\u0644\u064e\u0645\u0652 \u064a\u064e\u0643\u064F\u0646\u0652 \u0644\u064e\u0647\u064F \u0643\u064F\u0641\u064F\u0648\u064B\u0627 \u0623\u064E\u062d\u064E\u062f\u064C."],
["tn", "Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yoolad. Wa lam yakun lahu kufuwan ahad."],
["p", "Signification : Dis : Il est Allah, l'Unique. Allah, le Refuge \u00c9ternel. Il n'engendre pas et n'a pas \u00e9t\u00e9 engendr\u00e9, et rien ne Lui est semblable."],
["h", "L'inclinaison (ruku')"],
["p", "Dites Allahu Akbar, inclinez-vous les mains sur les genoux, le dos \u00e0 l'horizontale, et dites trois fois :"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0631\u064e\u0628\u0650\u0651\u064a\u064e \u0627\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u0650", tn: "Subhana Rabbiyal-'Adheem", mean: "Gloire \u00e0 mon Seigneur, le Tr\u00e8s Grand." }],
["p", "Relevez-vous de l'inclinaison en disant :"],
["dua", { ar: "\u0633\u064E\u0645\u0650\u0639\u064E \u0627\u0644\u0644\u0647\u064F \u0644\u0650\u0645\u064e\u0646\u0652 \u062d\u064e\u0645\u0650\u062f\u064e\u0647\u064F", tn: "Sami' Allahu liman hamidah", mean: "Allah entend celui qui Le loue." }],
["p", "Debout, bien droit, dites : Rabban\u0101 wa lakal-\u1e25amd \u2014 Notre Seigneur, \u00e0 Toi appartient toute louange."],
["h", "La prosternation (sujud)"],
["p", "Dites Allahu Akbar et prosternez-vous, le front, le nez, les deux mains, les deux genoux et les orteils des deux pieds au sol. Dites trois fois :"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0631\u064e\u0628\u0650\u0651\u064a\u064e \u0627\u0644\u0652\u0623\u064e\u0639\u0652\u0644\u064e\u0649", tn: "Subhana Rabbiyal-A'la", mean: "Gloire \u00e0 mon Seigneur, le Tr\u00e8s Haut." }],
["p", "Asseyez-vous bri\u00e8vement, puis prosternez-vous une seconde fois. Cela compl\u00e8te une rak'ah. Levez-vous pour la seconde rak'ah, qui s'accomplit de la m\u00eame mani\u00e8re."],
["h", "Le tashahhud"],
["p", "Apr\u00e8s la seconde prosternation de la seconde rak'ah, asseyez-vous et r\u00e9citez :"],
["ar", "\u0627\u0644\u062a\u064e\u0651\u062d\u0650\u064a\u064e\u0651\u0627\u062a\u064f \u0644\u0650\u0644\u0647\u0650 \u0648\u064e\u0627\u0644\u0635\u064e\u0651\u0644\u064e\u0648\u064e\u0627\u062a\u064f \u0648\u064e\u0627\u0644\u0637\u064e\u0651\u064a\u0650\u0651\u0628\u064e\u0627\u062a\u064f\u060c \u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064e \u0623\u064e\u064a\u064f\u0651\u0647\u064e\u0627 \u0627\u0644\u0646\u064e\u0651\u0628\u0650\u064a\u064f\u0651 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u0647\u0650 \u0648\u064e\u0628\u064e\u0631\u064e\u0643\u064e\u0627\u062a\u064f\u0647\u064f\u060c \u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0639\u064e\u0644\u064e\u0649 \u0639\u0650\u0628\u064e\u0627\u062f\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u0650\u064a\u0646\u064e\u060c \u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0627\u0644\u0644\u0647\u064f \u0648\u064e\u0623\u064e\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064e\u0646\u064e\u0651 \u0645\u064f\u062d\u064e\u0645\u064e\u0651\u062f\u064b\u0627 \u0639\u064e\u0628\u0652\u062f\u064f\u0647\u064f \u0648\u064e\u0631\u064e\u0633\u064f\u0648\u0644\u064f\u0647\u064f."],
["tn", "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu 'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-saliheen. Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan 'abduhu wa rasooluh."],
["p", "Signification : Toutes les salutations, les pri\u00e8res et les bonnes choses appartiennent \u00e0 Allah. Paix sur toi, \u00f4 Proph\u00e8te, ainsi que la mis\u00e9ricorde d'Allah et Ses b\u00e9n\u00e9dictions. Paix sur nous et sur les serviteurs vertueux d'Allah. J'atteste qu'il n'y a de dieu qu'Allah, et j'atteste que Muhammad est Son serviteur et Son Messager."],
["h", "La fin de la pri\u00e8re"],
["p", "Tournez la t\u00eate vers la droite et dites :"],
["dua", { ar: "\u0627\u0644\u0633\u064e\u0651\u0644\u064e\u0627\u0645\u064f \u0639\u064e\u0644\u064e\u064a\u0652\u0643\u064f\u0645\u0652 \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064f \u0627\u0644\u0644\u0647\u0650", tn: "As-salamu 'alaykum wa rahmatullah", mean: "Que la paix et la mis\u00e9ricorde d'Allah soient sur vous." }],
["p", "Puis tournez-vous vers la gauche et r\u00e9p\u00e9tez. Votre pri\u00e8re est termin\u00e9e. Le Fajr se prie ainsi en deux rak'ahs ; le Dhuhr, le Asr et l'Isha se prient en quatre rak'ahs ; le Maghrib en trois."],
["h", "Notes pour les s\u0153urs"],
["p", "La pri\u00e8re est la m\u00eame, avec quelques diff\u00e9rences de posture (pratique hanafite) :"],
["p", "\u2022 Lors du takbir d'ouverture, levez les mains \u00e0 hauteur des \u00e9paules plut\u00f4t qu'\u00e0 hauteur des oreilles."],
["p", "\u2022 Croisez les mains sur la poitrine."],
["p", "\u2022 En ruku', inclinez-vous un peu moins profond\u00e9ment et gardez les bras pr\u00e8s du corps."],
["p", "\u2022 En sujud, gardez les coudes serr\u00e9s contre les flancs et le corps ramass\u00e9."],
["p", "\u2022 En position assise, reposez-vous les deux pieds sortis du c\u00f4t\u00e9 droit."],,
["link", { to: "prayer-virtues", icon: "✨", title: "Les m\u00E9rites de la pri\u00E8re", desc: "Pourquoi les cinq pri\u00E8res sont un don, pas un fardeau" }]
] },
{ id: "pillars", title: "Les cinq piliers de l'islam", desc: "Le fondement de la foi — touchez un pilier pour son guide détaillé",
body: [
["p", "Le Prophète \uFDFA a dit : \u00ABL'islam est b\u00E2ti sur cinq : le t\u00E9moignage qu'il n'y a de dieu qu'Allah et que Muhammad est le Messager d'Allah, l'accomplissement de la pri\u00E8re, le versement de la zakat, le je\u00FBne de Ramadan, et le Hajj vers la Maison.\u00BB (Sahih al-Bukhari, Sahih Muslim). Chaque pilier ci-dessous ouvre son propre guide d\u00E9taill\u00E9 \u2014 avec modes d'emploi, m\u00E9rites, duas et dhikr."],
["link", { to: "shahada", icon: "\u261D\uFE0F", title: "1. Shahada \u2014 Le t\u00E9moignage", desc: "Son sens, ses conditions et ses exigences" }],
["link", { to: "prayer", icon: "🕌", title: "2. Salah \u2014 Les cinq pri\u00E8res", desc: "Guide \u00E9tape par \u00E9tape, et les m\u00E9rites de la pri\u00E8re" }],
["link", { to: "zakat", icon: "🤲", title: "3. Zakat \u2014 L'aum\u00F4ne obligatoire", desc: "Nisab, taux, b\u00E9n\u00E9ficiaires et Zakat al-Fitr" }],
["link", { to: "fasting-virtues", icon: "🌙", title: "4. Sawm \u2014 Le je\u00FBne", desc: "Les m\u00E9rites du je\u00FBne, et le guide du Ramadan" }],
["link", { to: "hajj-umrah", icon: "🕋", title: "5. Hajj et Umra \u2014 Le p\u00E8lerinage", desc: "Les rites \u00E9tape par \u00E9tape, avec duas et dhikr" }]
] },
{ id: "duas", title: "Invocations du matin et du soir", desc: "Adhkar quotidiens tir\u00e9s de Hisnul Muslim",
body: [
["p", "Le Proph\u00e8te \ufdfa a enseign\u00e9 de courtes invocations pour le matin et le soir. En voici cinq pour commencer \u2014 m\u00eame une seule, dite avec un c\u0153ur pr\u00e9sent, est un excellent d\u00e9but."],
["h", "Ayat al-Kursi"],
["p", "R\u00e9citez apr\u00e8s chaque pri\u00e8re et avant de dormir :"],
["ar", "\u0627\u0644\u0644\u0647\u064F \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0647\u064F\u0648\u064E \u0627\u0644\u0652\u062d\u064e\u064a\u064f\u0651 \u0627\u0644\u0652\u0642\u064e\u064a\u064f\u0651\u0648\u0645\u064f \u06da \u0644\u064e\u0627 \u062a\u064e\u0623\u0652\u062e\u064f\u0630\u064f\u0647\u064F \u0633\u0650\u0646\u064e\u0629\u064C \u0648\u064e\u0644\u064e\u0627 \u0646\u064e\u0648\u0652\u0645\u064C \u06da \u0644\u064e\u0647\u064F \u0645\u064e\u0627 \u0641\u0650\u064a \u0627\u0644\u0633\u064e\u0651\u0645\u064e\u0627\u0648\u064e\u0627\u062a\u0650 \u0648\u064e\u0645\u064e\u0627 \u0641\u0650\u064a \u0627\u0644\u0652\u0623\u064e\u0631\u0652\u0636\u0650 \u06da \u0645\u064e\u0646\u0652 \u0630\u064e\u0627 \u0627\u0644\u064e\u0651\u0630\u0650\u064a \u064a\u064e\u0634\u0652\u0641\u064e\u0639\u064f \u0639\u0650\u0646\u0652\u062f\u064e\u0647\u064F \u0625\u0650\u0644\u0627\u064e\u0651 \u0628\u0650\u0625\u0650\u0630\u0652\u0646\u0650\u0647\u0650 \u06da \u064a\u064e\u0639\u0652\u0644\u064e\u0645\u064f \u0645\u064e\u0627 \u0628\u064e\u064a\u0652\u0646\u064e \u0623\u064e\u064a\u0652\u062f\u0650\u064a\u0647\u0650\u0645\u0652 \u0648\u064e\u0645\u064e\u0627 \u062e\u064e\u0644\u0652\u0641\u064e\u0647\u064f\u0645\u0652 \u06d6 \u0648\u064e\u0644\u064e\u0627 \u064a\u064f\u062d\u0650\u064a\u0637\u064f\u0648\u0646\u064e \u0628\u0650\u0634\u064e\u064a\u0652\u0621\u064D \u0645\u0650\u0652\u0646\u0652 \u0639\u0650\u0644\u0652\u0645\u0650\u0647\u0650 \u0625\u0650\u0644\u0627\u064e\u0651 \u0628\u0650\u0645\u064e\u0627 \u0634\u064e\u0627\u0621\u064e \u06da \u0648\u064e\u0633\u0650\u0639\u064e \u0643\u064F\u0631\u0652\u0633\u0650\u064a\u064f\u0651\u0647\u064f \u0627\u0644\u0633\u064e\u0651\u0645\u064e\u0627\u0648\u064e\u0627\u062a\u0650 \u0648\u064e\u0627\u0644\u0652\u0623\u064e\u0631\u0652\u0636\u064e \u06d6 \u0648\u064e\u0644\u064e\u0627 \u064a\u064e\u0626\u064f\u0648\u062f\u064f\u0647\u064F \u062d\u0650\u0641\u0652\u0638\u064f\u0647\u064f\u0645\u064e\u0627 \u06da \u0648\u064e\u0647\u064F\u0648\u064e \u0627\u0644\u0652\u0639\u064e\u0644\u0650\u064a\u064f\u0651 \u0627\u0644\u0652\u0639\u064e\u0638\u0650\u064a\u0645\u064f"],
["p", "Signification : Allah \u2014 il n'y a de dieu que Lui, le Vivant, le Subsistant par Lui-m\u00eame. Ni somnolence ni sommeil ne Le prennent\u2026 (Coran 2:255)"],
["h", "Sayyid al-Istighfar \u2014 le ma\u00eetre de la demande de pardon"],
["p", "Dites une fois le matin et une fois le soir :"],
["ar", "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e \u0631\u064e\u0628\u0650\u0651\u064a \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e\u060c \u062e\u064e\u0644\u064e\u0642\u0652\u062a\u064e\u0646\u0650\u064a \u0648\u064e\u0623\u064e\u0646\u064e\u0627 \u0639\u064e\u0628\u0652\u062f\u064f\u0643\u064e\u060c \u0648\u064e\u0623\u064e\u0646\u064e\u0627 \u0639\u064e\u0644\u064e\u0649 \u0639\u064e\u0647\u0652\u062f\u0650\u0643\u064e \u0648\u064e\u0648\u064e\u0639\u0652\u062f\u0650\u0643\u064e \u0645\u064e\u0627 \u0627\u0633\u0652\u062a\u064e\u0637\u064e\u0639\u0652\u062a\u064f\u060c \u0623\u064e\u0639\u064f\u0648\u0630\u064f \u0628\u0650\u0643\u064e \u0645\u0650\u0646\u0652 \u0634\u064e\u0631\u0650\u0651 \u0645\u064e\u0627 \u0635\u064e\u0646\u064e\u0639\u0652\u062a\u064f\u060c \u0623\u064e\u0628\u064f\u0648\u0621\u064f \u0644\u064e\u0643\u064e \u0628\u0650\u0646\u0650\u0639\u0652\u0645\u064e\u062a\u0650\u0643\u064e \u0639\u064e\u0644\u064e\u064a\u064e\u0651\u060c \u0648\u064e\u0623\u064e\u0628\u064f\u0648\u0621\u064f \u0628\u0650\u0630\u064e\u0646\u0652\u0628\u0650\u064a \u0641\u064e\u0627\u063a\u0652\u0641\u0650\u0631\u0652 \u0644\u0650\u064a\u060c \u0641\u064e\u0625\u0650\u0646\u064e\u0651\u0647\u064f \u0644\u064e\u0627 \u064a\u064e\u063a\u0652\u0641\u0650\u0631\u064f \u0627\u0644\u0630\u064f\u0651\u0646\u064f\u0648\u0628\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0623\u064e\u0646\u0652\u062a\u064e"],
["tn", "Allahumma anta Rabbi, la ilaha illa ant; khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't; a'udhu bika min sharri ma sana't; aboo'u laka bi ni'matika 'alayy, wa aboo'u bi dhanbi faghfir li, fa innahu la yaghfiruz-zunooba illa ant."],
["p", "Signification : \u00d4 Allah, Tu es mon Seigneur ; il n'y a de dieu que Toi. Tu m'as cr\u00e9\u00e9 et je suis Ton serviteur, et je m'attache \u00e0 Ton pacte et \u00e0 Ta promesse du mieux que je peux. Je cherche refuge aupr\u00e8s de Toi contre le mal de ce que j'ai fait. Je reconnais Ton bienfait envers moi et je reconnais mon p\u00e9ch\u00e9 \u2014 pardonne-moi donc, car nul ne pardonne les p\u00e9ch\u00e9s sauf Toi."],
["h", "L'invocation du matin et du soir"],
["ar", "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0628\u0650\u0643\u064e \u0623\u064e\u0635\u0652\u0628\u064e\u062d\u0652\u0646\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0623\u064e\u0645\u0652\u0633\u064e\u064a\u0652\u0646\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0646\u064e\u062d\u0652\u064a\u064e\u0627 \u0648\u064e\u0628\u0650\u0643\u064e \u0646\u064e\u0645\u064f\u0648\u062a\u064f \u0648\u064e\u0625\u0650\u0644\u064e\u064a\u0652\u0643\u064e \u0627\u0644\u0646\u064f\u0651\u0634\u064f\u0648\u0631\u064f"],
["tn", "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namootu, wa ilaykan-nushoor."],
["p", "Signification : \u00d4 Allah, par Toi nous entrons dans le matin et par Toi nous entrons dans le soir ; par Toi nous vivons et par Toi nous mourons, et vers Toi est la r\u00e9surrection. (Le soir : \u2026wa ilaykal-maseer \u2014 et vers Toi est le retour.)"],
["h", "SubhanAllahi wa bihamdihi \u2014 100 fois"],
["dua", { ar: "\u0633\u064F\u0628\u0652\u062d\u064e\u0627\u0646\u064e \u0627\u0644\u0644\u0647\u0650 \u0648\u064e\u0628\u0650\u062d\u064e\u0645\u0652\u062f\u0650\u0647\u0650", tn: "SubhanAllahi wa bihamdihi", mean: "Gloire \u00e0 Allah et louange \u00e0 Lui." }],
["p", "Le Proph\u00e8te \ufdfa a dit : quiconque dit cela cent fois par jour, ses p\u00e9ch\u00e9s sont pardonn\u00e9s, m\u00eame s'ils sont comme l'\u00e9cume de la mer."],
["h", "Pour la protection \u2014 3 fois"],
["dua", { ar: "\u0623\u064e\u0639\u064F\u0648\u0630\u064f \u0628\u0650\u0643\u064e\u0644\u0650\u0645\u064e\u0627\u062a\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u062a\u064e\u0651\u0627\u0645\u064e\u0651\u0627\u062a\u0650 \u0645\u0650\u0646\u0652 \u0634\u064e\u0631\u0650\u0651 \u0645\u064e\u0627 \u062e\u064e\u0644\u064e\u0642\u064e", tn: "A'udhu bikalimatillah it-tammati min sharri ma khalaq", mean: "Je cherche refuge dans les paroles parfaites d'Allah contre le mal de ce qu'Il a cr\u00e9\u00e9." }],
] },
{ id: "ramadan", title: "Guide du Ramadan", desc: "Je\u00fbne, tarawih, Laylat al-Qadr et l'A\u00efd",
body: [
["h", "Le je\u00fbne"],
["p", "De la premi\u00e8re lueur de l'aube (fajr) jusqu'au coucher du soleil (maghrib), abstenez-vous de nourriture, de boisson et de relations conjugales. Les malades, les voyageurs, les femmes enceintes et allaitantes, et les femmes en menstruation sont dispens\u00e9s \u2014 ils rattrapent les jours manqu\u00e9s plus tard, ou nourrissent un pauvre pour chaque jour s'ils sont incapables de je\u00fbner."],
["h", "Suhoor et iftar"],
["p", "Prenez le repas d'avant l'aube (suhoor) \u2014 m\u00eame une gorg\u00e9e d'eau est b\u00e9nie \u2014 et rompez le je\u00fbne au coucher du soleil, en suivant la sunna avec des dattes et de l'eau. \u00c0 l'iftar, dites :"],
["dua", { ar: "\u0630\u064e\u0647\u064e\u0628\u064e \u0627\u0644\u0638\u064e\u0651\u0645\u064e\u0623\u064f \u0648\u064e\u0627\u0628\u0652\u062a\u064e\u0644\u064e\u0651\u062a\u0650 \u0627\u0644\u0652\u0639\u064f\u0631\u064f\u0648\u0642\u064f \u0648\u064e\u062b\u064e\u0628\u064e\u062a\u064e \u0627\u0644\u0652\u0623\u064e\u062c\u0652\u0631\u064f \u0625\u0650\u0646\u0652 \u0634\u064e\u0627\u0621\u064e \u0627\u0644\u0644\u0647\u064f", tn: "Dhahabaz-zama'u wabtallatil-'urooqu wa thabatal-ajru in sha Allah", mean: "La soif est partie, les veines sont humidifi\u00e9es, et la r\u00e9compense est confirm\u00e9e, si Allah le veut." }],
["h", "Tarawih et Laylat al-Qadr"],
["p", "La pri\u00e8re de nuit (tarawih) se prie apr\u00e8s l'Isha, souvent en congr\u00e9gation \u00e0 la mosqu\u00e9e. Cherchez Laylat al-Qadr \u2014 la Nuit du Destin, meilleure que mille mois \u2014 dans les nuits impaires des dix derni\u00e8res nuits. Durant ces nuits, r\u00e9p\u00e9tez souvent :"],
["dua", { ar: "\u0627\u0644\u0644\u0647\u064f\u0645\u064e\u0651 \u0625\u0646\u064e\u0651\u0643\u064e \u0639\u064e\u0641\u064f\u0648\u064c\u0651 \u062a\u064f\u062d\u0650\u0628\u064f\u0651 \u0627\u0644\u0652\u0639\u064e\u0641\u0652\u0648\u064e \u0641\u064e\u0627\u0639\u0652\u0641\u064f \u0639\u064e\u0646\u0650\u0651\u064a", tn: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni", mean: "\u00d4 Allah, Tu es Pardonneur et Tu aimes pardonner, pardonne-moi donc." }],
["h", "Zakat al-Fitr et l'A\u00efd"],
["p", "Avant la pri\u00e8re de l'A\u00efd, versez la Zakat al-Fitr \u2014 une mesure d'aliment de base (ou sa valeur) pour chaque membre du foyer \u2014 afin que les pauvres puissent eux aussi c\u00e9l\u00e9brer. L'A\u00efd al-Fitr commence par la pri\u00e8re en congr\u00e9gation et les takbirat, suivies de jours de joie : visites en famille, partage de nourriture et rappel d'Allah."],,
["link", { to: "fasting-virtues", icon: "🌙", title: "Les m\u00E9rites du je\u00FBne", desc: "Pourquoi le je\u00FBne compte parmi les \u0153uvres les plus aim\u00E9es" }]
] },
{ id: "shahada", icon: "\u261D\uFE0F", title: "La Shahada \u2014 Le t\u00E9moignage de foi", desc: "Son sens, ses conditions et ses exigences",
body: [
["h", "Les paroles"],
["dua", { ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ", tn: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasoolullah", mean: "J'atteste qu'il n'y a de dieu qu'Allah, et j'atteste que Muhammad est le Messager d'Allah." }],
["h", "Ce qu'elle signifie"],
["p", "\u00AB La ilaha illa Allah \u00BB est une n\u00E9gation et une affirmation : la n\u00E9gation que quoi que ce soit m\u00E9rite l'adoration \u2014 ni idole, ni saint, ni force de la nature \u2014 et l'affirmation que l'adoration appartient \u00E0 Allah seul."],
["p", "\u00AB Muhammadan rasoolullah \u00BB signifie accepter le Proph\u00E8te \uFDFA comme dernier Messager d'Allah : croire en son message, ob\u00E9ir \u00E0 ses ordres et suivre son exemple."],
["h", "Ses conditions"],
["p", "Les savants mentionnent sept conditions pour que le t\u00E9moignage profite \u00E0 celui qui le prononce : (1) conna\u00EEtre son sens, (2) la certitude sans doute, (3) l'acceptation, (4) la soumission et la conformit\u00E9, (5) la v\u00E9racit\u00E9, (6) la sinc\u00E9rit\u00E9 \u2014 prononc\u00E9e pour Allah seul, et (7) l'amour pour elle et ses gens."],
["h", "Ce qui l'annule"],
["p", "Le t\u00E9moignage est annul\u00E9 par ses contraires \u2014 avant tout le shirk (associer des partenaires \u00E0 Allah), et le fait de se moquer de quoi que ce soit de la religion. Allah dit : \u00AB Certes, Allah ne pardonne pas qu'on Lui associe... \u00BB (Coran 4:48)."],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \u00E0 l'aper\u00E7u des piliers" }]
] },
{ id: "prayer-virtues", icon: "✨", title: "Les m\u00E9rites de la pri\u00E8re", desc: "Pourquoi les cinq pri\u00E8res sont un don, pas un fardeau",
body: [
["h", "Une expiation entre les pri\u00E8res"],
["p", "\u00AB Les cinq pri\u00E8res quotidiennes et d'un Jumu'ah au suivant expient les p\u00E9ch\u00E9s commis entre eux, tant que les p\u00E9ch\u00E9s majeurs sont \u00E9vit\u00E9s. \u00BB \u2014 Sahih Muslim"],
["h", "Une rivi\u00E8re \u00E0 votre porte"],
["p", "Le Proph\u00E8te \uFDFA demanda : s'il y avait une rivi\u00E8re \u00E0 la porte de l'un de vous o\u00F9 il se laverait cinq fois par jour, resterait-il une trace de salet\u00E9 ? \u00AB Tel est l'exemple des cinq pri\u00E8res \u2014 Allah efface par elles les p\u00E9ch\u00E9s. \u00BB \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "En congr\u00E9gation : vingt-sept fois plus"],
["p", "\u00AB La pri\u00E8re en congr\u00E9gation est vingt-sept fois plus m\u00E9ritoire que la pri\u00E8re accomplie seul. \u00BB \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Le Fajr et l'Isha en congr\u00E9gation"],
["p", "\u00AB Quiconque prie l'Isha en congr\u00E9gation, c'est comme s'il avait pri\u00E9 la moiti\u00E9 de la nuit ; et quiconque prie le Fajr en congr\u00E9gation, c'est comme s'il avait pri\u00E9 toute la nuit. \u00BB \u2014 Sahih Muslim"],
["h", "Les pas vers la mosqu\u00E9e"],
["p", "Chaque pas vers la mosqu\u00E9e \u00E9l\u00E8ve d'un degr\u00E9 et efface un p\u00E9ch\u00E9 \u2014 Sahih Muslim. Et attendre la pri\u00E8re suivante apr\u00E8s avoir termin\u00E9 l'une est un \u00AB ribat \u00BB \u2014 Sahih Muslim."],
["h", "La premi\u00E8re chose sur laquelle on sera interrog\u00E9"],
["p", "\u00AB La premi\u00E8re \u0153uvre sur laquelle une personne sera jug\u00E9e le Jour de la R\u00E9surrection est la pri\u00E8re. \u00BB \u2014 Sunan al-Tirmidhi"],
["link", { to: "prayer", icon: "🕌", title: "Comment prier \u2014 \u00C9tape par \u00E9tape", desc: "Le guide pratique de la pri\u00E8re" }],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \u00E0 l'aper\u00E7u des piliers" }]
] },
{ id: "zakat", icon: "🤲", title: "La Zakat \u2014 L'aum\u00F4ne obligatoire", desc: "Nisab, taux, b\u00E9n\u00E9ficiaires et Zakat al-Fitr",
body: [
["h", "Ce qu'elle est"],
["p", "La zakat est l'aum\u00F4ne obligatoire sur les biens \u00E9ligibles d\u00E9tenus pendant une ann\u00E9e lunaire \u2014 2,5 % des \u00E9conomies, de l'or, de l'argent et des marchandises. Ce n'est pas une faveur aux pauvres ; c'est leur droit dans vos biens (Coran 51:19)."],
["h", "Le nisab (seuil)"],
["p", "La zakat devient due lorsque vos biens \u00E9ligibles atteignent le nisab \u2014 environ 85 grammes d'or ou 595 grammes d'argent \u2014 et qu'une ann\u00E9e lunaire compl\u00E8te s'est \u00E9coul\u00E9e."],
["h", "Qui la re\u00E7oit"],
["p", "Allah nomme huit cat\u00E9gories dans le Coran (9:60) : les pauvres, les n\u00E9cessiteux, ceux charg\u00E9s de la collecter, ceux dont les c\u0153urs sont \u00E0 gagner, l'affranchissement des captifs, les endett\u00E9s, dans le sentier d'Allah, et le voyageur en d\u00E9tresse."],
["h", "Zakat al-Fitr"],
["p", "Avant la pri\u00E8re de l'A\u00EEd al-Fitr, chaque musulman \u2014 pour lui-m\u00EAme et chaque personne \u00E0 charge \u2014 donne environ 2,5 \u00E0 3 kg de nourriture de base (ou sa valeur) aux pauvres, afin que personne n'ait faim le jour de l'A\u00EEd. Elle purifie aussi le je\u00FBne des paroles futiles. \u2014 Sunan Abi Dawud"],
["h", "Un avertissement"],
["p", "\u00AB Et ceux qui th\u00E9saurisent l'or et l'argent et ne les d\u00E9pensent pas dans le sentier d'Allah \u2014 annonce-leur un ch\u00E2timent douloureux. \u00BB \u2014 Coran 9:34"],
["link", { to: "sadaqah", icon: "💝", title: "Sadaqah \u2014 L'aum\u00F4ne volontaire", desc: "Au-del\u00E0 de l'obligation : les m\u00E9rites du don" }],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \u00E0 l'aper\u00E7u des piliers" }]
] },
{ id: "sadaqah", icon: "💝", title: "Sadaqah \u2014 L'aum\u00F4ne volontaire", desc: "Les m\u00E9rites du don au-del\u00E0 de l'obligation",
body: [
["h", "Une ombre au Jour Dernier"],
["p", "\u00AB Sept seront ombrag\u00E9s par Allah le Jour o\u00F9 il n'y aura d'ombre que la Sienne... \u00BB \u2014 parmi eux, celui qui donne l'aum\u00F4ne si secr\u00E8tement que sa main gauche ne sait pas ce que sa main droite a donn\u00E9. \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Elle \u00E9teint le p\u00E9ch\u00E9"],
["p", "\u00AB L'aum\u00F4ne \u00E9teint le p\u00E9ch\u00E9 comme l'eau \u00E9teint le feu. \u00BB \u2014 Sunan al-Tirmidhi"],
["h", "M\u00EAme la moiti\u00E9 d'une datte"],
["p", "\u00AB Prot\u00E9gez-vous du Feu, m\u00EAme avec la moiti\u00E9 d'une datte. \u00BB Aucun don n'est trop petit. \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Un sourire est une aum\u00F4ne"],
["p", "Sourire \u00E0 son fr\u00E8re, ordonner le bien, interdire le mal, guider une personne \u00E9gar\u00E9e, \u00E9carter un obstacle du chemin \u2014 tout cela est sadaqah. \u2014 Sunan al-Tirmidhi"],
["h", "Sadaqah Jariyah \u2014 l'aum\u00F4ne qui continue"],
["p", "\u00AB Quand une personne meurt, ses \u0153uvres s'arr\u00EAtent sauf trois : une aum\u00F4ne continue, une science dont on profite, ou un enfant pieux qui prie pour lui. \u00BB \u2014 Sahih Muslim"],
["h", "Donnez en secret, donnez souvent"],
["p", "L'aum\u00F4ne secr\u00E8te est plus m\u00E9ritoire et plus sinc\u00E8re ; mais donner ouvertement est aussi bien quand cela encourage les autres. La meilleure aum\u00F4ne est celle que l'\u00E2me peut vraiment offrir, donn\u00E9e avec r\u00E9gularit\u00E9."],
["link", { to: "zakat", icon: "🤲", title: "La Zakat \u2014 L'aum\u00F4ne obligatoire", desc: "Le pilier du don obligatoire" }],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \u00E0 l'aper\u00E7u des piliers" }]
] },
{ id: "fasting-virtues", icon: "🌙", title: "Les m\u00E9rites du je\u00FBne", desc: "Pourquoi le je\u00FBne compte parmi les \u0153uvres les plus aim\u00E9es",
body: [
["h", "\u00AB Le je\u00FBne est pour Moi \u00BB"],
["p", "Allah dit dans un hadith qudsi : \u00AB Toute \u0153uvre du fils d'Adam est pour lui, sauf le je\u00FBne \u2014 il est pour Moi, et c'est Moi qui le r\u00E9compenserai. \u00BB \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "La porte d'Ar-Rayyan"],
["p", "\u00AB Au Paradis, il y a une porte appel\u00E9e Ar-Rayyan, par laquelle entreront ceux qui je\u00FBnaient au Jour de la R\u00E9surrection, et personne d'autre n'y entrera. \u00BB \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Deux joies"],
["p", "Le je\u00FBneur a deux joies : la joie de rompre le je\u00FBne, et la joie de rencontrer Allah. Et l'haleine du je\u00FBneur est plus douce pour Allah que le parfum du musc. \u2014 Sahih al-Bukhari"],
["h", "Un bouclier"],
["p", "\u00AB Le je\u00FBne est un bouclier \u00BB \u2014 il prot\u00E8ge contre les d\u00E9sirs coupables et, avec la patience, contre le Feu. \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Laylat al-Qadr"],
["p", "\u00AB Quiconque veille Laylat al-Qadr avec foi et espoir de r\u00E9compense, ses p\u00E9ch\u00E9s pass\u00E9s lui sont pardonn\u00E9s. \u00BB Cherchez-la dans les nuits impaires des dix derniers jours de Ramadan. \u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Les je\u00FBnes volontaires de l'ann\u00E9e"],
["p", "Les lundis et jeudis (l'habitude du Proph\u00E8te \uFDFA \u2014 Sunan al-Tirmidhi) ; six jours de Shawwal (\u00AB comme s'il avait je\u00FBn\u00E9 toute l'ann\u00E9e \u00BB \u2014 Sahih Muslim) ; le jour d'Arafah (expie l'ann\u00E9e pass\u00E9e et \u00E0 venir \u2014 Sahih Muslim) ; Achoura (le 10 Muharram) ; et les \u00AB jours blancs \u00BB \u2014 les 13, 14 et 15 de chaque mois lunaire."],
["link", { to: "ramadan", icon: "🌙", title: "Guide du Ramadan", desc: "Je\u00FBne, tarawih, Laylat al-Qadr et l'A\u00EEd" }],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \u00E0 l'aper\u00E7u des piliers" }]
] },
{ id: "hajj-umrah", icon: "🕋", title: "Hajj et Umra \u2014 Guide pratique", desc: "Les rites \u00E9tape par \u00E9tape, avec duas et dhikr",
body: [
["h", "Ce qu'ils sont"],
["p", "Le Hajj est le p\u00E8lerinage vers la Kaaba \u00E0 La Mecque pendant Dhul-Hijjah \u2014 obligatoire une fois dans la vie pour tout musulman physiquement et financi\u00E8rement capable (Coran 3:97). La Umra est le petit p\u00E8lerinage, accomplissable \u00E0 tout moment de l'ann\u00E9e."],
["h", "La Talbiyah"],
["p", "D\u00E8s l'entr\u00E9e en ihram, le p\u00E8lerin r\u00E9p\u00E8te :"],
["dua", { ar: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ", tn: "Labbayka Allahumma labbayk, labbayka la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.", mean: "Me voici, \u00F4 Allah, me voici. Me voici, Tu n'as pas d'associ\u00E9, me voici. Certes, la louange et les bienfaits T'appartiennent, ainsi que la royaut\u00E9 \u2014 Tu n'as pas d'associ\u00E9." }],
["h", "La Umra \u2014 \u00E9tape par \u00E9tape"],
["p", "1. Entrer en ihram au miqat : ghusl, les deux pi\u00E8ces de tissu blanc (hommes), et l'intention avec la Talbiyah. 2. Tawaf : tourner sept fois autour de la Kaaba dans le sens inverse des aiguilles d'une montre, en commen\u00E7ant \u00E0 la Pierre Noire. 3. Prier deux rak'ahs derri\u00E8re le Maqam Ibrahim. 4. Sa'i : marcher sept fois entre Safa et Marwa. 5. Halq ou taqsir : se raser ou se couper les cheveux \u2014 la Umra est termin\u00E9e."],
["h", "Le Hajj \u2014 \u00E9tape par \u00E9tape"],
["p", "1. Ihram le 8 Dhul-Hijjah (Yawm al-Tarwiyah) puis Mina. 2. Le 9, stationner \u00E0 Arafah de midi au coucher du soleil \u2014 le c\u0153ur du Hajj (\u00AB Le Hajj, c'est Arafah \u00BB \u2014 Sunan al-Tirmidhi). 3. Apr\u00E8s le coucher du soleil, Muzdalifah : Maghrib et Isha regroup\u00E9es, ramasser les cailloux. 4. Le 10 (jour de l'A\u00EEd) : lapider la Jamarat al-Aqaba, sacrifier, se raser/couper, puis Tawaf al-Ifadah. 5. Jours de Tashriq (11\u201313) : lapider les trois jamarat chaque jour, en restant \u00E0 Mina. 6. Tawaf d'adieu avant de quitter La Mecque."],
["h", "La meilleure dua"],
["p", "\u00AB La meilleure invocation est celle du jour d'Arafah. \u00BB R\u00E9p\u00E9tez souvent : La ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir. \u2014 Sunan al-Tirmidhi"],
["h", "Le dhikr des dix jours"],
["p", "Les dix premiers jours de Dhul-Hijjah sont les jours les plus aim\u00E9s pour les bonnes \u0153uvres \u2014 remplissez-les de tahlil (La ilaha illa Allah), takbir (Allahu Akbar) et tahmid (Alhamdulillah). \u2014 Sahih al-Bukhari"],
["h", "Avant de partir"],
["p", "Apprenez les rites aupr\u00E8s d'un savant ou d'un guide fiable avant de voyager, r\u00E9glez vos dettes, demandez pardon aux gens, et faites une intention sinc\u00E8re \u2014 le Hajj Mabroor (le Hajj accept\u00E9) n'a d'autre r\u00E9compense que le Paradis (Sahih al-Bukhari, Sahih Muslim)."],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \u00E0 l'aper\u00E7u des piliers" }]
] },
]
};

document.getElementById("learnBack").onclick = learnBackToList;
renderLearnList();
