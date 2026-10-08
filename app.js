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
const RECITER_PATHS = {
  7: "mishari_al_afasy/murattal",
  3: "abdurrahmaan_as_sudais/murattal",
  6: "khalil_al_husary/murattal",
  9: "siddiq_minshawi/murattal",
  2: "abdul_baset/murattal"
};
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
    monthTitle: "This month", monthSub: "Imsak through isha for the selected place.", thisMonth: "This month", ramadan: "Ramadan", nextRamadan: "Next Ramadan",
    ramadanNote: "It is not Ramadan now. This is the next Ramadan timetable.",
    radioTitle: "Quran radio", radioPlay: "Listen", radioStop: "Stop",
    thDate: "Date",
    fajr: "Fajr", sun: "Sunrise", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha",
    ayahTitle: "A verse for the day", qiblaTitle: "Qibla", compass: "Use compass", mapTitle: "Qibla map",
    mapBody: "Drag the map. The curve is the great-circle path to the Kaaba, and it redraws from the center.",
    quranTitle: "Quran", play: "Play", pause: "Pause", tasbihTitle: "Tasbih", tap: "Tap to count", reset: "Reset",
    focusTitle: "No ads", placeTitle: "Place", gps: "Use my location", close: "Close", setTitle: "Settings",
    method: "Calculation method", madhab: "Asr madhab", notify: "Notify while this tab is open", done: "Done",
    searchPh: "Search a city", surahPh: "Find a surah",
    methodNote: "Times are calculated, not an official mosque feed. Diyanet suits Turkey; ISNA is the Montreal default.",
    names: { Fajr: "Fajr", Sunrise: "Sunrise", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" },
    remaining: "remaining", at: "at", passed: "passed", now: "now",
    kerahat: "Discouraged time — the sun is rising, at its peak, or setting.",
    qiblaHint: "Kaaba mark sits on the great-circle bearing. Checked against Aladhan.",
    howBody: "The small Kaaba is fixed on the verified bearing. Turn until it meets the gold arrow at the top. Phone compasses are magnetic and can be off by a few degrees near metal.",
    tasbihNote: "33 Subhanallah, 33 Alhamdulillah, 34 Allahu akbar. Saved on this device.",
    focusBody: "Prayer times, qibla, the month, and a Quran reader. No accounts, no ads, no tracking.",
    footer: "Times from the Aladhan engine. Quran text and audio from Quran.com. A local mosque may differ by a minute.",
    loading: "Loading times…", noResults: "No matches.", searching: "Searching…", gpsFail: "Location unavailable.",
    notified: "Prayer time", toward: "North is up. Line the Kaaba mark with the gold arrow, or enable the compass.",
    left: "left", right: "right", facing: "You are facing qibla.", loadFail: "Could not load times.", audioFail: "Could not play audio."
  },
  tr: {
    tag: "Namaz vakitleri", next: "Sonraki vakit", monthTab: "Ay", qiblaTab: "Kıble", quranTab: "Kur'an", quietTab: "Sükûnet",
    monthTitle: "Bu ay", monthSub: "Seçilen yer için imsaktan yatsıya.", thisMonth: "Bu ay", ramadan: "Ramazan", nextRamadan: "Sonraki Ramazan",
    ramadanNote: "Şu an Ramazan değil. Bu, sonraki Ramazan imsakiyesidir.",
    radioTitle: "Kur'an radyosu", radioPlay: "Dinle", radioStop: "Durdur",
    thDate: "Tarih",
    fajr: "İmsak", sun: "Güneş", dhuhr: "Öğle", asr: "İkindi", maghrib: "Akşam", isha: "Yatsı",
    ayahTitle: "Günün ayeti", qiblaTitle: "Kıble", compass: "Pusulayı aç", mapTitle: "Kıble haritası",
    mapBody: "Haritayı kaydırın. Eğri, Kâbe’ye giden büyük daire yoludur ve merkezden yeniden çizilir.",
    quranTitle: "Kur'an", play: "Oynat", pause: "Durdur", tasbihTitle: "Tesbih", tap: "Saymak için dokun", reset: "Sıfırla",
    focusTitle: "Reklamsız", placeTitle: "Yer", gps: "Konumumu kullan", close: "Kapat", setTitle: "Ayarlar",
    method: "Hesap yöntemi", madhab: "İkindi mezhebi", notify: "Sekme açıkken haber ver", done: "Tamam",
    searchPh: "Şehir ara", surahPh: "Sure ara",
    menuHome: "Ana Sayfa", menuQibla: "Kıble", menuResources: "Kaynaklar", menuArticles: "Makaleler",
    menuCommunity: "Topluluk", menuAbout: "Hakkında", menuLanguage: "Dil", menuTheme: "Tema",
    menuLocation: "Konum", menuSettings: "Ayarlar", comingSoon: "Yakında",
    methodNote: "Vakitler hesaplanır, resmi cami ilanı değildir. Türkiye için Diyanet, Montreal varsayılanı ISNA.",
    names: { Fajr: "İmsak", Sunrise: "Güneş", Dhuhr: "Öğle", Asr: "İkindi", Maghrib: "Akşam", Isha: "Yatsı" },
    remaining: "kaldı", at: "saat", passed: "geçti", now: "şimdi",
    kerahat: "Kerahat — güneş doğuyor, tepede, ya da batıyor.",
    qiblaHint: "Kâbe işareti, büyük daire açısındadır. Aladhan ile doğrulandı.",
    howBody: "Küçük Kâbe, doğrulanmış açıdadır. Üstteki altın okla buluşana kadar dönün. Telefon pusulası manyetiktir; metal yanında birkaç derece kayabilir.",
    tasbihNote: "33 Sübhanallah, 33 Elhamdülillah, 34 Allahu ekber. Bu cihazda saklanır.",
    focusBody: "Namaz vakitleri, kıble, aylık tablo ve Kur’an okuyucu. Hesap yok, reklam yok, takip yok.",
    footer: "Vakitler Aladhan motorundan. Kur’an metni ve ses Quran.com üzerinden. Yerel cami bir dakika farklı olabilir.",
    loading: "Vakitler yükleniyor…", noResults: "Sonuç yok.", searching: "Aranıyor…", gpsFail: "Konum alınamadı.",
    notified: "Namaz vakti", toward: "Kuzey yukarıda. Kâbe işaretini altın okla hizalayın, ya da pusulayı açın.",
    left: "sol", right: "sağ", facing: "Kıbleye dönüksünüz.", loadFail: "Vakitler alınamadı.", audioFail: "Ses açılamadı."
  }
};
const WEEKDAYS = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  tr: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
};
const WEEKDAYS_SHORT = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  tr: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]
};
const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
};
const COMPASS = { en: ["N", "E", "S", "W"], tr: ["K", "D", "G", "B"] };
const HIJRI_TR = ["", "Muharrem", "Safer", "Rebiülevvel", "Rebiülahir", "Cemaziyelevvel", "Cemaziyelahir", "Recep", "Şaban", "Ramazan", "Şevval", "Zilkade", "Zilhicce"];

const state = load();
let calendar = [];
let apiMeta = { source: "Aladhan", methodName: "", timezone: "" };
let qiblaDirection = null;
let chapters = [];
let heading = null;
let notifiedKey = "";
let searchTimer = 0;
let currentChapter = 1;
let startingAudio = false;
let monthView = "month";
let ramadan = [];
let ramadanStartParts = null;
function ramadanStartLabel() {
  if (!ramadanStartParts) return "";
  return `${ramadanStartParts.day} ${localMonth(ramadanStartParts.monthEn)} ${ramadanStartParts.year}`;
}
let station = "mishary";
const STATIONS = [
  ["mishary", "Al-Afasy", "https://backup.qurango.net/radio/mishary_alafasi"],
  ["sudais", "As-Sudais", "https://backup.qurango.net/radio/abdulrahman_alsudaes"],
  ["basit", "Abdul Basit", "https://backup.qurango.net/radio/abdulbasit_abdulsamad"],
  ["tarateel", "Tarateel", "https://backup.qurango.net/radio/tarateel"]
];

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
function weekdayIndex(name) {
  const i = WEEKDAYS.en.indexOf(name);
  return i < 0 ? 0 : i;
}
function localWeekday(name, short) {
  const i = weekdayIndex(name);
  return (short ? WEEKDAYS_SHORT : WEEKDAYS)[state.lang][i];
}
function localMonth(name) {
  const i = MONTHS.en.indexOf(name);
  return i < 0 ? name : MONTHS[state.lang][i];
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
  const mEn = document.getElementById("mLangEn"), mTr = document.getElementById("mLangTr");
  if (mEn) mEn.classList.toggle("on", state.lang === "en");
  if (mTr) mTr.classList.toggle("on", state.lang === "tr");
  const mTv = document.getElementById("mThemeVal");
  if (mTv) mTv.textContent = state.theme === "night" ? "☾" : "☀";
  const mLv = document.getElementById("mLocVal");
  if (mLv) mLv.textContent = state.place.name;
  document.getElementById("themeBtn").textContent = state.theme === "night" ? "☾" : "☀";
  document.body.dataset.theme = state.theme === "day" ? "day" : "";
  document.getElementById("locLabel").textContent = state.place.name;
  const bw = document.getElementById("brandWord");
  if (bw) { bw.src = state.lang === "tr" ? "images/logo-text-tr.png" : "images/logo-text-en.png"; bw.alt = state.lang === "tr" ? "Günlük Din" : "Daily Deen Hub"; }
  document.getElementById("footerNote").textContent = t("footer");
  const how = document.getElementById("howBody");
  if (how) how.textContent = t("howBody");
  document.getElementById("qiblaHint").textContent = t("qiblaHint");
  document.getElementById("tasbihNote").textContent = t("tasbihNote");
  document.getElementById("focusBody").textContent = t("focusBody");
  fillSelects();
  renderTasbih();
  renderAyah();
  renderTimes();
  renderMonth();
  renderQibla();
  renderChapters();
  const audio = document.getElementById("audio");
  document.getElementById("playBtn").textContent = audio && !audio.paused && audio.getAttribute("src") ? t("pause") : t("play");
  document.querySelectorAll("[data-compass]").forEach(el => { el.textContent = COMPASS[state.lang][+el.dataset.compass]; });
}
function fillSelects() {
  document.getElementById("methodSel").innerHTML = METHODS.map(([id, label]) => `<option value="${id}">${label}</option>`).join("");
  document.getElementById("methodSel").value = String(state.method);
  document.getElementById("schoolSel").innerHTML = state.lang === "tr"
    ? `<option value="0">Şafii / Maliki / Hanbeli</option><option value="1">Hanefi</option>`
    : `<option value="0">Shafi / Maliki / Hanbali</option><option value="1">Hanafi</option>`;
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
  const payload = await PrayerAPI.month({
    lat: state.place.lat,
    lon: state.place.lon,
    year: y,
    month: m,
    method: state.method,
    school: state.school
  });
  if (offsetMonth === 0) {
    apiMeta = payload;
    if (payload.timezone) state.place.tz = payload.timezone;
  }
  return payload.days;
}
async function refresh() {
  document.getElementById("nextName").textContent = t("loading");
  try {
    calendar = await fetchCalendar(0);
    const now = zoneParts(state.place.tz);
    if (now.d === calendar.length) calendar = calendar.concat((await fetchCalendar(1)).slice(0, 1));
    try {
      const q = await PrayerAPI.qibla(state.place.lat, state.place.lon);
      if (typeof q.direction === "number") qiblaDirection = q.direction;
    } catch { qiblaDirection = null; }
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
  document.getElementById("sourceLine").textContent = [apiMeta.source || "Aladhan", apiMeta.methodName, apiMeta.timezone].filter(Boolean).join(" · ");
  document.getElementById("arcTime").textContent = atTime;
  document.getElementById("arcLabel").textContent = nameOf(nextKey);
  const prev = [...slots].reverse().find(s => s.min <= nowMin);
  const start = prev ? prev.min : minutes(entry.timings.Fajr) - 1440;
  const pct = Math.min(1, Math.max(0, (nowMin - start) / ((nextAt || start + 1) - start)));
  document.getElementById("arc").setAttribute("stroke-dashoffset", String(314 * (1 - pct)));
  const g = entry.date.gregorian, h = entry.date.hijri;
  document.getElementById("gDate").textContent = `${localWeekday(g.weekday.en)} ${g.day} ${localMonth(g.month.en)} ${g.year}`;
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
function kaabaKm(lat, lon) {
  const R = 6371;
  const φ1 = lat * Math.PI / 180, φ2 = 21.4225 * Math.PI / 180;
  const dφ = (21.4225 - lat) * Math.PI / 180, dλ = (39.8262 - lon) * Math.PI / 180;
  const a = Math.sin(dφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}
function monthName(day) {
  const n = +day.date.gregorian.month.number;
  return MONTHS[state.lang][n - 1] || day.date.gregorian.month.en;
}
function renderMonth() {
  const now = zoneParts(state.place.tz);
  const monthOf = d => +d.date.gregorian.month.number || +String(d.date.gregorian.date).split("-")[1];
  const rows = monthView === "ramadan" ? ramadan : (calendar.filter(d => monthOf(d) === now.m).length ? calendar.filter(d => monthOf(d) === now.m) : calendar);
  const heading = document.getElementById("monthHeading");
  const note = document.getElementById("monthNote");
  if (heading) heading.textContent = monthView === "ramadan" ? t("nextRamadan") : t("monthTitle");
  if (note) note.textContent = monthView === "ramadan" ? `${t("ramadanNote")} ${ramadanStartLabel()}` : "";
  document.getElementById("monthBody").innerHTML = rows.map(d => {
    const tm = d.timings;
    const today = +d.date.gregorian.day === now.d && +d.date.gregorian.month.number === now.m;
    const date = monthView === "ramadan"
      ? `${d.date.gregorian.day} ${monthName(d)}`
      : `${d.date.gregorian.day} ${localWeekday(d.date.gregorian.weekday.en, true)}`;
    return `<tr class="${today ? "today" : ""}"><td>${date}</td><td>${cleanTime(tm.Fajr)}</td><td>${cleanTime(tm.Sunrise)}</td><td>${cleanTime(tm.Dhuhr)}</td><td>${cleanTime(tm.Asr)}</td><td>${cleanTime(tm.Maghrib)}</td><td>${cleanTime(tm.Isha)}</td></tr>`;
  }).join("");
  document.getElementById("monthMode").classList.toggle("on", monthView !== "ramadan");
  document.getElementById("ramadanMode").classList.toggle("on", monthView === "ramadan");
}
function renderAyah() {
  const a = AYAH[Math.floor(Date.now() / 86400000) % AYAH.length];
  document.getElementById("ayahAr").textContent = a.ar;
  document.getElementById("ayahText").textContent = state.lang === "tr" ? a.tr : a.en;
  document.getElementById("ayahRef").textContent = a.ref;
}
function renderQibla() {
  const local = qiblaBearing(state.place.lat, state.place.lon);
  const atKaaba = Math.abs(state.place.lat - 21.4225) < 0.05 && Math.abs(state.place.lon - 39.8262) < 0.05;
  const b = atKaaba ? 0 : (typeof qiblaDirection === "number" ? qiblaDirection : local);
  document.getElementById("qiblaDeg").textContent = atKaaba ? (state.lang === "tr" ? "Kâbe" : "Kaaba") : `${b.toFixed(1)}°`;
  document.getElementById("qiblaMark").setAttribute("transform", `rotate(${b} 110 110)`);
  document.getElementById("dial").setAttribute("transform", `rotate(${heading == null ? 0 : -heading} 110 110)`);
  document.querySelectorAll("[data-compass]").forEach(el => {
    el.setAttribute("transform", `rotate(${heading || 0} ${el.getAttribute("x")} ${el.getAttribute("y")})`);
  });
  const frame = document.getElementById("qiblaFrame");
  const open = document.getElementById("qiblaOpen");
  if (frame) {
    const src = `/qibla?embed=1&lat=${state.place.lat}&lon=${state.place.lon}&name=${encodeURIComponent(state.place.name)}`;
    if (frame.dataset.place !== src) { frame.dataset.place = src; frame.src = src; }
    if (open) open.href = `/qibla?lat=${state.place.lat}&lon=${state.place.lon}&name=${encodeURIComponent(state.place.name)}`;
  }
  const agree = atKaaba || Math.abs(((qiblaDirection ?? local) - local + 540) % 360 - 180) < 0.2;
  document.getElementById("qiblaCheck").textContent = atKaaba
    ? (state.lang === "tr" ? "Kâbe’desiniz." : "You are at the Kaaba.")
    : `${b.toFixed(1)}° · ${agree ? (state.lang === "tr" ? "hesap Aladhan ile aynı" : "matches Aladhan") : (state.lang === "tr" ? "Aladhan açısından fark var" : "differs from Aladhan")}`;
  const km = kaabaKm(state.place.lat, state.place.lon);
  document.getElementById("qiblaDistance").textContent = atKaaba ? "" : `${km.toFixed(0)} km · ${state.lang === "tr" ? "Kâbe mesafesi" : "to the Kaaba"}`;
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
async function openChapter(id, keepAudio = false) {
  currentChapter = id;
  const chapter = chapters.find(c => c.id === id);
  document.getElementById("surahTitle").textContent = chapter ? chapter.name_simple : `Surah ${id}`;
  const verses = document.getElementById("verses");
  const previousHeight = verses.scrollTop;
  verses.innerHTML = `<p class="hint">${t("loading")}</p>`;
  const translation = state.lang === "tr" ? 77 : 20;
  const [uthmani, meal] = await Promise.all([
    fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`).then(r => r.json()),
    fetch(`https://api.quran.com/api/v4/quran/translations/${translation}?chapter_number=${id}`).then(r => r.json())
  ]);
  verses.innerHTML = (uthmani.verses || []).map((v, i) =>
    `<article class="verse"><div class="kicker">${v.verse_key}</div><div class="ar">${v.text_uthmani}</div><div class="tr">${meal.translations?.[i]?.text || ""}</div></article>`
  ).join("");
  verses.scrollTop = previousHeight;
  if (!keepAudio) document.getElementById("audio").removeAttribute("src");
}
async function refreshQuranLanguage() {
  const openId = currentChapter || 1;
  chapters = [];
  renderChapters();
  await loadChapters();
  await openChapter(openId, true);
}
function playChapter() {
  const audio = document.getElementById("audio");
  const btn = document.getElementById("playBtn");
  if (audio.getAttribute("src") && !audio.paused) {
    audio.pause();
    btn.textContent = t("play");
    return;
  }
  const path = RECITER_PATHS[state.reciter];
  if (!path) return toast(t("audioFail"));
  document.getElementById("radioAudio").pause();
  document.getElementById("radioBtn").textContent = t("radioPlay");
  const url = `https://download.quranicaudio.com/qdc/${path}/${currentChapter}.mp3`;
  startingAudio = true;
  if (audio.getAttribute("src") !== url) audio.src = url;
  btn.textContent = t("pause");
  const pending = audio.play();
  if (pending) pending.then(() => { startingAudio = false; }).catch(() => {
    startingAudio = false;
    btn.textContent = t("play");
    toast(t("audioFail"));
  });
}
function renderStations() {
  document.getElementById("stations").innerHTML = STATIONS.map(([id, label]) => `<button type="button" class="${id === station ? "on" : ""}" data-station="${id}">${label}</button>`).join("");
  document.querySelectorAll("#stations button").forEach(btn => btn.onclick = () => {
    station = btn.dataset.station;
    const audio = document.getElementById("radioAudio");
    const wasPlaying = !audio.paused && audio.getAttribute("src");
    audio.pause();
    audio.removeAttribute("src");
    renderStations();
    if (wasPlaying) playRadio();
  });
}
function playRadio() {
  const audio = document.getElementById("radioAudio");
  const btn = document.getElementById("radioBtn");
  if (audio.getAttribute("src") && !audio.paused) {
    audio.pause();
    btn.textContent = t("radioPlay");
    return;
  }
  document.getElementById("audio").pause();
  const url = STATIONS.find(s => s[0] === station)[2];
  if (audio.getAttribute("src") !== url) audio.src = url;
  btn.textContent = t("radioStop");
  const pending = audio.play();
  if (pending) pending.catch(() => { btn.textContent = t("radioPlay"); toast(t("audioFail")); });
}
async function showRamadan() {
  monthView = "ramadan";
  if (!ramadan.length) {
    document.getElementById("monthBody").innerHTML = `<tr><td colspan="7">${t("loading")}</td></tr>`;
    const today = zoneParts(state.place.tz);
    const hijri = await (await fetch(`https://api.aladhan.com/v1/gToH/${pad(today.d)}-${pad(today.m)}-${today.y}`)).json();
    const year = +hijri.data.hijri.year;
    const month = +hijri.data.hijri.month.number;
    const ramadanYear = month > 9 ? year + 1 : year;
    const res = await fetch(`https://api.aladhan.com/v1/hijriCalendar/${ramadanYear}/9?latitude=${state.place.lat}&longitude=${state.place.lon}&method=${state.method}&school=${state.school}`);
    ramadan = (await res.json()).data || [];
    const first = ramadan[0];
    ramadanStartParts = first ? { day: first.date.gregorian.day, monthEn: first.date.gregorian.month.en, year: first.date.gregorian.year } : null;
  }
  renderMonth();
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
const menuPanel = document.getElementById("menuPanel"), menuBtn = document.getElementById("menuBtn");
const closeMenu = () => menuPanel && menuPanel.classList.remove("open");
if (menuBtn) menuBtn.onclick = (e) => { e.stopPropagation(); menuPanel.classList.toggle("open"); };
document.addEventListener("click", (e) => { if (menuPanel && menuPanel.classList.contains("open") && !menuPanel.contains(e.target) && e.target !== menuBtn) closeMenu(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
const mClose = (fn) => () => { closeMenu(); fn(); };
if (menuPanel) {
  document.getElementById("mLangEn").onclick = () => setLanguage("en");
  document.getElementById("mLangTr").onclick = () => setLanguage("tr");
  document.getElementById("mTheme").onclick = () => { state.theme = state.theme === "night" ? "day" : "night"; save(); applyI18n(); };
  document.getElementById("mLoc").onclick = mClose(() => { document.getElementById("locModal").classList.remove("hidden"); document.getElementById("citySearch").focus(); });
  document.getElementById("mSet").onclick = mClose(() => document.getElementById("setModal").classList.remove("hidden"));
  menuPanel.querySelectorAll("[data-soon]").forEach(b => b.onclick = () => toast(t("comingSoon")));
  menuPanel.querySelectorAll("a.menu-link").forEach(a => a.onclick = closeMenu);
}
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
function setLanguage(lang) {
  if (state.lang === lang) return;
  state.lang = lang;
  save();
  applyI18n();
  renderMonth();
  refreshQuranLanguage().catch(() => toast(t("loadFail")));
}
document.getElementById("langEn").onclick = () => setLanguage("en");
document.getElementById("langTr").onclick = () => setLanguage("tr");
document.getElementById("themeBtn").onclick = () => { state.theme = state.theme === "night" ? "day" : "night"; save(); applyI18n(); };
document.querySelectorAll(".tabs button").forEach(b => b.onclick = () => showTab(b.dataset.tab));
document.getElementById("surahSearch").addEventListener("input", renderChapters);
document.getElementById("playBtn").onclick = playChapter;
document.getElementById("radioBtn").onclick = playRadio;
document.getElementById("monthMode").onclick = () => { monthView = "month"; renderMonth(); };
document.getElementById("ramadanMode").onclick = () => showRamadan().catch(() => toast(t("loadFail")));
renderStations();
document.getElementById("audio").addEventListener("pause", () => { if (!startingAudio) document.getElementById("playBtn").textContent = t("play"); });
document.getElementById("audio").addEventListener("ended", () => { document.getElementById("playBtn").textContent = t("play"); });
document.getElementById("reciterSel").onchange = e => { state.reciter = +e.target.value; save(); document.getElementById("audio").removeAttribute("src"); };
document.getElementById("tasbihBtn").onclick = () => { state.tasbih = (state.tasbih + 1) % 100; save(); renderTasbih(); };
document.getElementById("tasbihReset").onclick = () => { state.tasbih = 0; save(); renderTasbih(); };
document.getElementById("compassBtn").onclick = async () => {
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") {
    if (await DeviceOrientationEvent.requestPermission() !== "granted") return;
  }
  const smooth = (prev, next) => {
    if (prev == null) return next;
    const delta = ((next - prev + 540) % 360) - 180;
    if (Math.abs(delta) < 1.2) return prev;
    return (prev + delta * 0.18 + 360) % 360;
  };
  const onHeading = ev => {
    let next = null;
    if (typeof ev.webkitCompassHeading === "number" && !Number.isNaN(ev.webkitCompassHeading)) next = ev.webkitCompassHeading;
    else if (ev.absolute && ev.alpha != null) {
      const screenAngle = (screen.orientation && screen.orientation.angle) || Number(window.orientation) || 0;
      next = (360 - ev.alpha + screenAngle) % 360;
    }
    if (next == null) return;
    heading = smooth(heading, next);
    renderQibla();
  };
  const ios = typeof DeviceOrientationEvent.requestPermission === "function";
  if (ios || !("ondeviceorientationabsolute" in window)) window.addEventListener("deviceorientation", onHeading, true);
  else window.addEventListener("deviceorientationabsolute", onHeading, true);
};
document.querySelectorAll(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m) m.classList.add("hidden"); }));

if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
applyI18n();
refresh();
setInterval(renderTimes, 1000);
