/* DailyDeenHub Learning Center — lesson content (EN/TR) + list/reader renderer.
   Body blocks: ["h", text] heading | ["p", text] paragraph | ["ar", text] Arabic
   | ["tn", text] transliteration | ["dua", {ar, tn, mean}] dua card. */
let learnCurrent = null;
function learnArticles() { return (LEARN[state.lang] || LEARN.en); }
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
]
};

document.getElementById("learnBack").onclick = learnBackToList;
renderLearnList();
