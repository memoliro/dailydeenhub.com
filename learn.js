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
  if (b[0] === "img") return "<figure class=\"learn-fig\"><img src=\"/" + b[1] + "\" alt=\"" + escapeHtml(b[2] || "") + "\" loading=\"lazy\"></figure>";
  if (b[0] === "dua") return "<div class=\"dua\"><p class=\"ar\" dir=\"rtl\" lang=\"ar\">" + escapeHtml(b[1].ar) + "</p>" +
    (b[1].tn ? "<p class=\"tn\">" + escapeHtml(b[1].tn) + "</p>" : "") +
    "<p class=\"dm\">" + escapeHtml(b[1].mean) + "</p></div>";
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
["p", "\u2022 When sitting, rest with both feet drawn out to the right side."]
] }
,
{ id: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "The foundation of the faith",
body: [
["h", "1. Shahada \u2014 the testimony"],
["p", "Declaring with conviction that there is no god but Allah and that Muhammad is His Messenger:"],
["dua", { ar: "\u0623\u064E\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064E\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0627\u0644\u0644\u0647\u064f \u0648\u064e\u0623\u064E\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064E\u0646\u064e\u0651 \u0645\u064F\u062d\u064e\u0645\u064e\u0651\u062f\u064B\u0627 \u0631\u064e\u0633\u064F\u0648\u0644\u064f \u0627\u0644\u0644\u0647\u0650", tn: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasoolullah", mean: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah." }],
["h", "2. Salah \u2014 the five daily prayers"],
["p", "Fajr, Dhuhr, Asr, Maghrib and Isha, prayed at their appointed times facing the qibla. They are the daily connection between the believer and Allah."],
["h", "3. Zakat \u2014 obligatory charity"],
["p", "Each lunar year, Muslims give 2.5% of their qualifying savings and wealth to the poor and needy. It purifies wealth and reminds us that everything belongs to Allah."],
["h", "4. Sawm \u2014 fasting Ramadan"],
["p", "From dawn to sunset throughout the month of Ramadan, Muslims abstain from food, drink and marital relations \u2014 training patience, gratitude and God-consciousness."],
["h", "5. Hajj \u2014 the pilgrimage"],
["p", "Once in a lifetime, for those who are physically and financially able: the pilgrimage to the Kaaba in Makkah during the month of Dhul-Hijjah."]
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
["p", "Before the Eid prayer, give Zakat al-Fitr \u2014 a measure of staple food (or its value) for each member of the household \u2014 so the poor can celebrate too. Eid al-Fitr begins with the congregational prayer and the takbirat, followed by days of joy: visiting family, sharing food, and remembering Allah."]
] }
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
["p", "\u2022 Oturuşta iki ayağı sağ tarafa alarak oturun."]
] },
{ id: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Dinin temeli",
body: [
["h", "1. Kelime-i Şehadet"],
["p", "Allah'tan başka ilah olmadığına ve Muhammed'in O'nun elçisi olduğuna gönülden şahitlik etmek:"],
["dua", { ar: "\u0623\u064E\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064E\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0627\u0644\u0644\u0647\u064f \u0648\u064e\u0623\u064E\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064E\u0646\u064e\u0651 \u0645\u064F\u062d\u064E\u0645\u064e\u0651\u062f\u064B\u0627 \u0631\u064e\u0633\u064F\u0648\u0644\u064f \u0627\u0644\u0644\u0647\u0650", tn: "Eşhedü en la ilahe illallah ve eşhedü enne Muhammeden resulullah", mean: "Şahitlik ederim ki Allah'tan başka ilah yoktur ve yine şahitlik ederim ki Muhammed Allah'ın elçisidir." }],
["h", "2. Namaz"],
["p", "Sabah, öğle, ikindi, akşam ve yatsı; vakitlerinde, kıbleye dönerek kılınan beş vakit namaz. Kul ile Allah arasındaki günlük bağdır."],
["h", "3. Zekât"],
["p", "Her kameri yılda, birikim ve malların nisap miktarını aşan kısmının %2,5'i yoksullara verilir. Malı arındırır; her şeyin Allah'a ait olduğunu hatırlatır."],
["h", "4. Oruç"],
["p", "Ramazan ayı boyunca imsaktan gün batımına yeme, içme ve cinsel ilişkiden uzak durmak \u2014 sabrı, şükrü ve takvayı eğitir."],
["h", "5. Hac"],
["p", "Gücü yetenler için ömürde bir kez: Zilhicce ayında Mekke'de Kâbe'yi ziyaret. Bedensel ve maddi imkân şarttır."]
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
["p", "Bayram namazından önce fitreyi verin \u2014 evdeki her kişi için bir ölçü temel gıda (veya bedeli) \u2014 ki yoksullar da bayramı yaşayabilsin. Ramazan Bayramı, cemaatle kılınan bayram namazı ve tekbirlerle başlar; ardından sevinç günleri gelir: akraba ziyareti, sofra paylaşımı ve Allah'ı anmak."]
] }
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
["p", "\u2022 En position assise, reposez-vous les deux pieds sortis du c\u00f4t\u00e9 droit."],
] },
{ id: "pillars", title: "Les cinq piliers de l'islam", desc: "Le fondement de la foi",
body: [
["h", "1. Shahada \u2014 le t\u00e9moignage"],
["p", "D\u00e9clarer avec conviction qu'il n'y a de dieu qu'Allah et que Muhammad est Son Messager :"],
["dua", { ar: "\u0623\u064E\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064E\u0646\u0652 \u0644\u064e\u0627 \u0625\u0650\u0644\u0647\u064e \u0625\u0650\u0644\u0627\u064e\u0651 \u0627\u0644\u0644\u0647\u064f \u0648\u064e\u0623\u064E\u0634\u0652\u0647\u064e\u062f\u064f \u0623\u064E\u0646\u064e\u0651 \u0645\u064F\u062d\u064e\u0645\u064e\u0651\u062f\u064B\u0627 \u0631\u064e\u0633\u064F\u0648\u0644\u064f \u0627\u0644\u0644\u0647\u0650", tn: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasoolullah", mean: "J'atteste qu'il n'y a de dieu qu'Allah, et j'atteste que Muhammad est le Messager d'Allah." }],
["h", "2. Salah \u2014 les cinq pri\u00e8res quotidiennes"],
["p", "Le Fajr, le Dhuhr, le Asr, le Maghrib et l'Isha, pri\u00e9s \u00e0 leurs heures fix\u00e9es, face \u00e0 la qibla. C'est le lien quotidien entre le croyant et Allah."],
["h", "3. Zakat \u2014 l'aum\u00f4ne obligatoire"],
["p", "Chaque ann\u00e9e lunaire, les musulmans versent 2,5 % de leurs \u00e9conomies et biens \u00e9ligibles aux pauvres et aux n\u00e9cessiteux. Cela purifie les biens et nous rappelle que tout appartient \u00e0 Allah."],
["h", "4. Sawm \u2014 le je\u00fbne de Ramadan"],
["p", "De l'aube au coucher du soleil, pendant tout le mois de Ramadan, les musulmans s'abstiennent de nourriture, de boisson et de relations conjugales \u2014 une \u00e9cole de patience, de gratitude et de conscience d'Allah."],
["h", "5. Hajj \u2014 le p\u00e8lerinage"],
["p", "Une fois dans la vie, pour ceux qui en ont la capacit\u00e9 physique et financi\u00e8re : le p\u00e8lerinage vers la Kaaba \u00e0 La Mecque, pendant le mois de Dhul-Hijjah."],
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
["p", "Avant la pri\u00e8re de l'A\u00efd, versez la Zakat al-Fitr \u2014 une mesure d'aliment de base (ou sa valeur) pour chaque membre du foyer \u2014 afin que les pauvres puissent eux aussi c\u00e9l\u00e9brer. L'A\u00efd al-Fitr commence par la pri\u00e8re en congr\u00e9gation et les takbirat, suivies de jours de joie : visites en famille, partage de nourriture et rappel d'Allah."],
] },
]
};

document.getElementById("learnBack").onclick = learnBackToList;
renderLearnList();
