// First-visit onboarding: send newcomers to the welcome page once.
try {
  if (!localStorage.getItem('ddh-onboarded') && !location.pathname.includes('welcome')) {
    location.replace('/welcome.html');
  }
} catch (e) {}
const VALID_SOUNDS = ["adhan-prayer-call.mp3", "adhan-prayer-call-trimmed.mp3", "alarm.mp3", "alert-on-mobile.wav", "bell.wav", "double-car-honk.mp3", "nikin-short-chick-sound.mp3", "nostalgia.wav", "custom"];
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
    tag: "Prayer times", next: "Next prayer", timeRemaining: "Time Remaining", kaabaHint: "Hold your phone upright and turn until the Kaaba is centered.", moreTitle: "More", dualCal: "Dual calendar", resources: "Resources", articles: "Articles", aboutL: "About", privacyL: "Privacy", termsL: "Terms", openMap: "Open Qibla map", widgetLbl: "Widget", widgetNote: "Home-screen widget settings will appear here soon.", verseOfDay: "Verse of the Day", hadithOfDay: "Hadith of the Day", asmaDay: "Asma-ul Husna", brand: "Daily Deen Hub", namesDay: "Names of the Day", namesSub: "Newborn name ideas", tileMosques: "Mosques", tileTasbih: "Tasbih", hisnul: "Hisnul Muslim", qadha: "Qadha prayers", khatm: "Khatms", qvNone: "None", qvTrans: "Translation", qvPron: "Pronunciation", qvBoth: "Both", followLbl: "Follow recitation", tmClassic: "Classic", tmBeads: "Beads", beadTap: "Tap the beads — each tap moves one bead", monthTab: "Month", qiblaTab: "Qibla", quranTab: "Quran", quietTab: "Quiet",
    monthTitle: "This month", monthSub: "Imsak through isha for the selected place.", thisMonth: "This month", ramadan: "Ramadan", nextRamadan: "Next Ramadan",
    ramadanNote: "It is not Ramadan now. This is the next Ramadan timetable.",
    radioTitle: "Quran radio", radioPlay: "Listen", radioStop: "Stop",
    thDate: "Date",
    fajr: "Fajr", sun: "Sunrise", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha",
    ayahTitle: "A verse for the day", qiblaTitle: "Qibla", compass: "Use compass", mapTitle: "Qibla map",
    mapBody: "Drag the map. The curve is the great-circle path to the Kaaba, and it redraws from the center.",
    quranTitle: "Quran", play: "Play", pause: "Pause", tasbihTitle: "Tasbih", tap: "Tap to count", reset: "Reset",
    trackerTitle: "Today's prayers", streak: "day streak", streaks: "day streak", done: "done", markDone: "Tap a prayer to mark it done",
    cardHint: "Tap the ✓ on a card once you've prayed it",
    congrats: "Congratulations! May Allah accept your prayers.",
    ramadanHub: "Ramadan", suhoorIn: "Suhoor in", iftarIn: "Iftar in", suhoorDone: "Suhoor passed", fasting: "Fasting now",
    mosquesTab: "Find", mosquesTitle: "Find nearby", mosquesSub: "Mosques and halal restaurants near you, from OpenStreetMap.",
    mosquesFind: "Find mosques near me", mosquesLoading: "Searching…", mosquesNone: "No mosques found within 10 km.", mosquesError: "Could not load mosques.",
    mosquesRetrying: "Retrying…",
    halalFind: "Find halal restaurants near me", halalNone: "No halal restaurants found within 10 km.",
    footTag: "Free prayer times, qibla, Quran and more. No account, no ads.",
    footFeatures: "Features", footResources: "Resources", footFreeTools: "Free tools", footSupport: "Support",
    paidNote: "(paid · no account needed)",
    supportUs: "Support us",
    apkNoticeTitle: "Welcome to the new app! 🎉",
    apkNoticeBody: "If you still have the old DailyDeenHub icon on your home screen, long-press it and uninstall it — this new app replaces it.",
    apkNoticeOk: "Got it",
    adhanAtTime: "Play adhan at prayer time", adhanNote: "Plays the full adhan when the tab is open.",
    hijriCal: "Hijri calendar",
    focusTitle: "No ads", placeTitle: "Place", gps: "Use my location", close: "Close", setTitle: "Settings", setLoc: "Location", setCalc: "Prayer Calculation", setRemind: "Reminders", setAppear: "Appearance", setNotif: "Notifications", locNote: "Choose your city for accurate prayer times.", changeCity: "Change city", themeLbl: "Theme", themeSystem: "System", themeDark: "Night", themeLight: "Day", langLbl: "Language", vibLbl: "Vibration",
    method: "Calculation method", madhab: "Asr madhab", notify: "Notify while this tab is open", done: "Done",
    searchPh: "Search a city", surahPh: "Find a surah",
    menuHome: "Home", menuQibla: "Qibla", menuResources: "Resources", menuArticles: "Articles",
    menuCommunity: "Community", menuAbout: "About", menuLanguage: "Language", menuTheme: "Theme",
    menuLocation: "Location", menuSettings: "Settings", comingSoon: "Coming soon",
    remindBefore: "Minutes before prayer", atTimeOpt: "At prayer time", minBefore: "min before",
    pushLbl: "Prayer alerts (even when tab is closed)",
    pushOn: "Alerts on — you'll be notified even with the tab closed.",
    pushOff: "Alerts off.",
    pushError: "Couldn't set up alerts. Try again.",
    pushBlocked: "Notifications are blocked for this site — allow them in your browser settings.",
    pushUnsupported: "Push alerts aren't supported in this browser.",
    pushEnabled: "Prayer alerts enabled",
    installHint: "📲 Install on your device for proper alerts.",
    installBtn: "Install app",
    installIOS: "📲 iPhone alerts need the app installed — it takes 10 seconds:<br><span class=\"steps\">1.</span> Tap <b>Share</b> in this browser<br><span class=\"steps\">2.</span> Tap <b>“Add to Home Screen”</b><br><span class=\"steps\">3.</span> Open DailyDeenHub from your home screen — alerts will work there.",
    installPopTitle: "Install DailyDeenHub",
    installPopBody: "Get prayer alerts even when your browser is closed. Free, fast, no account needed.",
    installPopLater: "Not now",
    soundLbl: "Alert sound",
    soundAdhan: "Adhan (prayer call)", soundAdhanShort: "Adhan (short)", soundAlarm: "Alarm",
    soundMobile: "Mobile alert", soundBell: "Bell", soundHonk: "Car honk",
    soundChick: "Chick chirp", soundNostalgia: "Nostalgia",
    soundCustom: "Custom", uploadLbl: "Upload custom sound",
    inMinutes: "{n} min left", timeNow: "time",
    soundTooBig: "File too large (max 1.5 MB)", soundSaved: "Custom sound saved",
    supportSite: "Support the site", bmcBtn: "Buy me a coffee",
    terms: "Terms", privacy: "Privacy", moreApps: "More free apps",
    methodNote: "Times are calculated, not an official mosque feed. Diyanet suits Turkey; ISNA is the Montreal default.",
    names: { Fajr: "Fajr", Sunrise: "Sunrise", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" },
    remaining: "remaining", at: "at", passed: "passed", now: "now",
    kerahat: "Discouraged time — the sun is rising, at its peak, or setting.",
    qiblaHint: "The Kaaba mark sits on the great-circle bearing, measured from true north.",
    hijriNote: "Calculated Hijri calendar. Local moon sighting may differ by a day.",
    compassUnavailable: "Compass not available on this device — please use the map below.",
    howBody: "The small Kaaba is fixed on the verified bearing. Turn until it meets the gold arrow at the top. Phone compasses are magnetic and can be off by a few degrees near metal.",
    tasbihNote: "33 Subhanallah, 33 Alhamdulillah, 34 Allahu akbar. Saved on this device.",
    focusBody: "Prayer times, qibla, the month, and a Quran reader. No accounts, no ads, no tracking.",
    footer: "Times from the Aladhan engine. Quran text and audio from Quran.com. A local mosque may differ by a minute.",
    loading: "Loading times…", noResults: "No matches.", searching: "Searching…", gpsFail: "Location unavailable.",
    notified: "Prayer time", toward: "North is up. Line the Kaaba mark with the gold arrow, or enable the compass.",
    left: "left", right: "right", facing: "You are facing qibla.", loadFail: "Could not load times.", audioFail: "Could not play audio."
  },
  tr: {
    tag: "Namaz vakitleri", timeRemaining: "Kalan Süre", kaabaHint: "Telefonunuzu dik tutun ve Kâbe ortalanana kadar dönün.", moreTitle: "Daha fazla", dualCal: "Çift takvim", resources: "Kaynaklar", articles: "Makaleler", aboutL: "Hakkında", privacyL: "Gizlilik", termsL: "Şartlar", openMap: "Kıble haritasını aç", widgetLbl: "Widget", widgetNote: "Ana ekran widget ayarları yakında burada olacak.", verseOfDay: "Günün Ayeti", hadithOfDay: "Günün Hadisi", asmaDay: "Esma-ül Hüsna", brand: "Günlük Din Merkezi", namesDay: "Günün İsimleri", namesSub: "Yenidoğan isim önerileri", tileMosques: "Camiler", tileTasbih: "Tesbih", hisnul: "Hisnul Muslim", qadha: "Kaza namazı", khatm: "Hatimler", qvNone: "Yok", qvTrans: "Meal", qvPron: "Okunuş", qvBoth: "İkisi", followLbl: "Okumayı takip et", tmClassic: "Klasik", tmBeads: "Tesbih", beadTap: "Boncuklara dokunun — her dokunuş bir boncuk ilerletir", next: "Sonraki vakit", monthTab: "Ay", qiblaTab: "Kıble", quranTab: "Kur'an", quietTab: "Sükûnet",
    monthTitle: "Bu ay", monthSub: "Seçilen yer için imsaktan yatsıya.", thisMonth: "Bu ay", ramadan: "Ramazan", nextRamadan: "Sonraki Ramazan",
    ramadanNote: "Şu an Ramazan değil. Bu, sonraki Ramazan imsakiyesidir.",
    radioTitle: "Kur'an radyosu", radioPlay: "Dinle", radioStop: "Durdur",
    thDate: "Tarih",
    fajr: "İmsak", sun: "Güneş", dhuhr: "Öğle", asr: "İkindi", maghrib: "Akşam", isha: "Yatsı",
    ayahTitle: "Günün ayeti", qiblaTitle: "Kıble", compass: "Pusulayı aç", mapTitle: "Kıble haritası",
    mapBody: "Haritayı kaydırın. Eğri, Kâbe’ye giden büyük daire yoludur ve merkezden yeniden çizilir.",
    quranTitle: "Kur'an", play: "Oynat", pause: "Durdur", tasbihTitle: "Tesbih", tap: "Saymak için dokun", reset: "Sıfırla",
    trackerTitle: "Bugünkü namazlar", streak: "günlük seri", streaks: "günlük seri", done: "tamam", markDone: "Tamamlanan namaza dokun",
    cardHint: "Kıldığınız namazın kartındaki ✓'ye dokunun",
    congrats: "Tebrikler! Allah ibadetlerinizi kabul etsin.",
    ramadanHub: "Ramazan", suhoorIn: "Sahura", iftarIn: "İftara", suhoorDone: "Sahur geçti", fasting: "Oruçlusun",
    mosquesTab: "Bul", mosquesTitle: "Yakında bul", mosquesSub: "Yakındaki camiler ve helal restoranlar, OpenStreetMap'ten.",
    mosquesFind: "Yakınımdaki camileri bul", mosquesLoading: "Aranıyor…", mosquesNone: "10 km içinde cami bulunamadı.", mosquesError: "Camiler yüklenemedi.",
    mosquesRetrying: "Tekrar deneniyor…",
    halalFind: "Yakınımdaki helal restoranları bul", halalNone: "10 km içinde helal restoran bulunamadı.",
    footTag: "Ücretsiz namaz vakitleri, kıble, Kur'an ve daha fazlası. Hesap yok, reklam yok.",
    footFeatures: "Özellikler", footResources: "Kaynaklar", footFreeTools: "Ücretsiz araçlar", footSupport: "Destek",
    paidNote: "(ücretli · hesap gerekmez)",
    supportUs: "Bize destek ol",
    apkNoticeTitle: "Yeni uygulamaya hoş geldin! 🎉",
    apkNoticeBody: "Ana ekranında eski Günlük Din Merkezi simgesi duruyorsa, üzerine uzun basıp kaldır — bu yeni uygulama onun yerini alıyor.",
    apkNoticeOk: "Anladım",
    adhanAtTime: "Namaz vaktinde ezan çal", adhanNote: "Sekme açıkken vakit girince ezan çalar.",
    hijriCal: "Hicri takvim",
    focusTitle: "Reklamsız", placeTitle: "Yer", gps: "Konumumu kullan", close: "Kapat", setTitle: "Ayarlar", setLoc: "Konum", setCalc: "Namaz Hesaplama", setRemind: "Hatırlatıcılar", setAppear: "Görünüm", setNotif: "Bildirimler", locNote: "Doğru namaz vakitleri için şehrinizi seçin.", changeCity: "Şehir değiştir", themeLbl: "Tema", themeSystem: "Sistem", themeDark: "Gece", themeLight: "Gündüz", langLbl: "Dil", vibLbl: "Titreşim",
    method: "Hesap yöntemi", madhab: "İkindi mezhebi", notify: "Sekme açıkken haber ver", done: "Tamam",
    searchPh: "Şehir ara", surahPh: "Sure ara",
    menuHome: "Ana Sayfa", menuQibla: "Kıble", menuResources: "Kaynaklar", menuArticles: "Makaleler",
    menuCommunity: "Topluluk", menuAbout: "Hakkında", menuLanguage: "Dil", menuTheme: "Tema",
    menuLocation: "Konum", menuSettings: "Ayarlar", comingSoon: "Yakında",
    remindBefore: "Namazdan önce (dakika)", atTimeOpt: "Vakit girince", minBefore: "dk önce",
    pushLbl: "Namaz uyarıları (sekme kapalıyken bile)",
    pushOn: "Uyarılar açık — sekme kapalıyken bile bildirim alırsınız.",
    pushOff: "Uyarılar kapalı.",
    pushError: "Uyarılar kurulamadı. Tekrar deneyin.",
    pushBlocked: "Bu site için bildirimler engelli — tarayıcı ayarlarından izin verin.",
    pushUnsupported: "Bu tarayıcı push uyarılarını desteklemiyor.",
    pushEnabled: "Namaz uyarıları açıldı",
    installHint: "📲 Düzgün uyarılar için uygulamayı cihazınıza yükleyin.",
    installBtn: "Uygulamayı yükle",
    installIOS: "📲 iPhone uyarıları için uygulamanın yüklü olması gerekir — 10 saniye sürer:<br><span class=\"steps\">1.</span> Bu tarayıcıda <b>Paylaş</b>’a dokunun<br><span class=\"steps\">2.</span> <b>“Ana Ekrana Ekle”</b>’yi seçin<br><span class=\"steps\">3.</span> Günlük Din Merkezi’ni ana ekrandan açın — uyarılar orada çalışır.",
    installPopTitle: "Günlük Din Merkezi’ni Yükle",
    installPopBody: "Tarayıcınız kapalıyken bile namaz uyarıları alın. Ücretsiz, hızlı, hesap gerekmez.",
    installPopLater: "Şimdi değil",
    soundLbl: "Uyarı sesi",
    soundAdhan: "Ezan", soundAdhanShort: "Ezan (kısa)", soundAlarm: "Alarm",
    soundMobile: "Mobil uyarı", soundBell: "Çan", soundHonk: "Korna",
    soundChick: "Civciv sesi", soundNostalgia: "Nostalji",
    soundCustom: "Özel", uploadLbl: "Özel ses yükle",
    inMinutes: "{n} dk kaldı", timeNow: "vakti",
    soundTooBig: "Dosya çok büyük (en fazla 1,5 MB)", soundSaved: "Özel ses kaydedildi",
    supportSite: "Siteyi destekle", bmcBtn: "Bana bir kahve ısmarla",
    terms: "Kullanım Şartları", privacy: "Gizlilik", moreApps: "Diğer ücretsiz uygulamalar",
    methodNote: "Vakitler hesaplanır, resmi cami ilanı değildir. Türkiye için Diyanet, Montreal varsayılanı ISNA.",
    names: { Fajr: "İmsak", Sunrise: "Güneş", Dhuhr: "Öğle", Asr: "İkindi", Maghrib: "Akşam", Isha: "Yatsı" },
    remaining: "kaldı", at: "saat", passed: "geçti", now: "şimdi",
    kerahat: "Kerahat — güneş doğuyor, tepede, ya da batıyor.",
    qiblaHint: "Kâbe işareti, gerçek kuzeye göre büyük daire açısındadır.",
    hijriNote: "Hesaplanmış Hicri takvim. Yerel hilal gözlemi bir gün farklı olabilir.",
    howBody: "Küçük Kâbe, doğrulanmış açıdadır. Üstteki altın okla buluşana kadar dönün. Telefon pusulası manyetiktir; metal yanında birkaç derece kayabilir.",
    tasbihNote: "33 Sübhanallah, 33 Elhamdülillah, 34 Allahu ekber. Bu cihazda saklanır.",
    focusBody: "Namaz vakitleri, kıble, aylık tablo ve Kur’an okuyucu. Hesap yok, reklam yok, takip yok.",
    footer: "Vakitler Aladhan motorundan. Kur’an metni ve ses Quran.com üzerinden. Yerel cami bir dakika farklı olabilir.",
    loading: "Vakitler yükleniyor…", noResults: "Sonuç yok.", searching: "Aranıyor…", gpsFail: "Konum alınamadı.",
    notified: "Namaz vakti", toward: "Kuzey yukarıda. Kâbe işaretini altın okla hizalayın, ya da pusulayı açın.",
    compassUnavailable: "Bu cihazda pusula yok — lütfen aşağıdaki haritayı kullanın.",
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
// Magnetic declination (degrees, +east/-west) for Android compass true-north correction.
// iOS webkitCompassHeading already returns true north, so this is Android-only.
try { const _d = parseFloat(localStorage.getItem('ddh-dec')); if (!isNaN(_d)) state.declination = _d; } catch (e) {}
let calendar = [];
let apiMeta = { source: "Aladhan", methodName: "", timezone: "" };
let qiblaDirection = null;
let chapters = [];
let heading = null;
let qiblaWasAligned = false;
let lastBuzzMs = 0;
let notifiedKey = "";
let adhanPlayedKey = "";
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
  ["mishary", "Mishary Al-Afasy", "https://backup.qurango.net/radio/mishary_alafasi"],
  ["sudais", "Abdulrahman Al-Sudais", "https://backup.qurango.net/radio/abdulrahman_alsudaes"],
  ["shuraim", "Saud Al-Shuraim", "https://backup.qurango.net/radio/saud_alshuraim"],
  ["maher", "Maher Al-Muaiqly", "https://backup.qurango.net/radio/maher"],
  ["ghamdi", "Saad Al-Ghamdi", "https://backup.qurango.net/radio/saad_alghamdi"],
  ["basit", "Abdul Basit", "https://backup.qurango.net/radio/abdulbasit_abdulsamad"],
  ["shatri", "Abu Bakr Al-Shatri", "https://backup.qurango.net/radio/shaik_abu_bakr_al_shatri"],
  ["ajmy", "Ahmad Al-Ajmy", "https://backup.qurango.net/radio/ahmad_alajmy"],
  ["tunaiji", "Khalifa Al-Tunaiji", "https://backup.qurango.net/radio/khalifa_altunaiji"],
  ["johany", "Abdullah Al-Johany", "https://backup.qurango.net/radio/abdullah_aljohany"],
  ["jaber", "Ali Jaber", "https://backup.qurango.net/radio/ali_jaber"],
  ["budair", "Salah Al-Budair", "https://backup.qurango.net/radio/salah_albudair"],
  ["tarateel", "Tarateel", "https://backup.qurango.net/radio/tarateel"],
  ["ruqyah", "Ruqyah", "https://backup.qurango.net/radio/roqiah"],
  ["entrans", "Quran — English translation", "https://backup.qurango.net/radio/translation_quran_english_basit"],
  ["trtrans", "Quran — Turkish translation", "https://backup.qurango.net/radio/translation_quran_turkish"]
];

function load() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem("ezan-vakti") || "{}") || {}; } catch { saved = {}; }
  const st = {
    lang: saved.lang || (location.pathname.startsWith("/tr") ? "tr" : ((navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en")),
    theme: saved.theme || "night",
    method: saved.method ?? 2,
    school: saved.school ?? 0,
    notify: !!saved.notify,
    adhanAtTime: saved.adhanAtTime ?? true,
    remind: saved.remind || Object.fromEntries(["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(k => [k, saved.remindMin ?? 15])),
    sound: saved.sound || "bell.wav",
    customSound: saved.customSound || null,
    reciter: saved.reciter ?? 7,
    remindOn: saved.remindOn || {},
    vibration: saved.vibration ?? false,
    quranView: saved.quranView || "trans",
    quranFollow: !!saved.quranFollow,
    tasbihMode: saved.tasbihMode || "classic",
    beadStyle: saved.beadStyle || "melon",
    tasbihLoops: saved.tasbihLoops || 0,
    place: saved.place || { name: "Montreal", country: "Canada", lat: 45.5017, lon: -73.5673, tz: "America/Toronto" },
    tasbih: saved.tasbih || 0
  };
  // Old/removed sound names (beep, chime, bell, removed files) fall back to bell.wav
  if (!VALID_SOUNDS.includes(st.sound)) st.sound = "bell.wav";
  if (st.sound === "custom" && !st.customSound) st.sound = "bell.wav";
  return st;
}
function save() {
  try { localStorage.setItem("ezan-vakti", JSON.stringify(state)); } catch { /* private mode or quota (e.g. big custom sound) */ }
  if (window.DDHPush && window.DDHPush.resync) {
    try { window.DDHPush.resync(); } catch (e) {}
  }
}
function escapeHtml(v) {
  return String(v == null ? "" : v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
/* Quran.com translations can carry <sup> footnote markup; drop it, then escape the rest. */
function plainTranslation(v) {
  return escapeHtml(String(v || "").replace(/<sup[\s\S]*?<\/sup>/gi, "").replace(/<[^>]*>/g, ""));
}
function t(key) { return I18N[state.lang][key]; }
// Early nav: event delegation so bottom nav works even if later JS fails
document.addEventListener("click", e => {
  const g = e.target.closest("[data-goto]");
  if (g) {
    e.preventDefault();
    if (typeof showTab === "function") { showTab(g.dataset.goto); window.scrollTo(0, 0); }
    return;
  }
  if (e.target.closest("#bnavSet")) {
    if (typeof showTab === "function") { showTab("settings"); if (typeof syncSetControls === "function") syncSetControls(); if (typeof setShow === "function") setShow(null); window.scrollTo({ top: 0 }); }
  }
});

window.DDHLang = () => state.lang;
function nameOf(key) {
  // On Fridays, Dhuhr is Jumu'ah (Friday prayer)
  if (key === "Dhuhr" && isFridayToday()) return state.lang === "tr" ? "Cuma" : "Jumu'ah";
  return I18N[state.lang].names[key] || key;
}
function isFridayToday() {
  try {
    const entry = calendar && calendar[zoneParts(state.place.tz).d];
    return entry && entry.date && entry.date.gregorian && entry.date.gregorian.weekday.en === "Friday";
  } catch { return false; }
}
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
// One-time notice inside the installed APK (TWA): nudge users to remove the old PWA icon.
function maybeShowApkNotice() {
  try {
    if (document.referrer.indexOf("android-app://") !== 0) return; // not running in the APK
    if (localStorage.getItem("ddh_apk_noticed") === "1") return;
    const ov = document.createElement("div");
    ov.className = "modal";
    ov.style.zIndex = "70";
    ov.innerHTML = `<div class="sheet" style="text-align:center;max-width:420px">
      <h3>${t("apkNoticeTitle")}</h3>
      <p style="line-height:1.6">${t("apkNoticeBody")}</p>
      <button class="primary" id="apkNoticeOk" style="margin-top:12px;min-width:140px">${t("apkNoticeOk")}</button>
    </div>`;
    document.body.appendChild(ov);
    const close = () => { ov.remove(); localStorage.setItem("ddh_apk_noticed", "1"); };
    ov.querySelector("#apkNoticeOk").addEventListener("click", close);
    ov.addEventListener("click", e => { if (e.target === ov) close(); });
  } catch (e) {}
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
  const _le = document.getElementById("langEn"); if (_le) _le.classList.toggle("on", state.lang === "en");
  const _lt = document.getElementById("langTr"); if (_lt) _lt.classList.toggle("on", state.lang === "tr");
  const mEn = document.getElementById("mLangEn"), mTr = document.getElementById("mLangTr");
  if (mEn) mEn.classList.toggle("on", state.lang === "en");
  if (mTr) mTr.classList.toggle("on", state.lang === "tr");
  if (mEn) mEn.classList.toggle("on", state.lang === "en");
  if (mTr) mTr.classList.toggle("on", state.lang === "tr");
  const mTv = document.getElementById("mThemeVal");
  if (mTv) mTv.textContent = state.theme === "night" ? "☾" : "☀";
  const mLv = document.getElementById("mLocVal");
  if (mLv) mLv.textContent = state.place.name;
  const _tb = document.getElementById("themeBtn"); if (_tb) _tb.textContent = state.theme === "night" ? "☾" : "☀";
  document.body.dataset.theme = state.theme === "day" ? "day" : "";
  document.getElementById("locLabel").textContent = state.place.name;
  const bw = document.getElementById("brandWord");
  if (bw) { bw.src = state.lang === "tr" ? "/images/logo-text-tr.png" : "/images/logo-text-en.png"; bw.alt = state.lang === "tr" ? "Günlük Din" : "Daily Deen Hub"; }
  document.getElementById("footerNote").textContent = t("footer");
  const how = document.getElementById("howBody");
  if (how) how.textContent = t("howBody");
  const _qh = document.getElementById("qiblaHint"); if (_qh) _qh.textContent = t("qiblaHint");
  document.getElementById("tasbihNote").textContent = t("tasbihNote");
  document.getElementById("focusBody").textContent = t("focusBody");
  fillSelects();
  renderTasbih();
  renderTracker();
  renderAyah();
  renderTimes();
  renderMonth();
  renderQibla();
  renderChapters();
  const audio = document.getElementById("audio");
  document.getElementById("playBtn").textContent = audio && !audio.paused && audio.getAttribute("src") ? t("pause") : t("play");
  document.querySelectorAll("[data-cardinal]").forEach(el => { el.textContent = (COMPASS[state.lang] || COMPASS.en)[+el.dataset.cardinal]; });
}
function fillSelects() {
  document.getElementById("methodSel").innerHTML = METHODS.map(([id, label]) => `<option value="${id}">${label}</option>`).join("");
  document.getElementById("methodSel").value = String(state.method);
  document.getElementById("schoolSel").innerHTML = state.lang === "tr"
    ? `<option value="0">Şafii / Maliki / Hanbeli</option><option value="1">Hanefi</option>`
    : `<option value="0">Shafi / Maliki / Hanbali</option><option value="1">Hanafi</option>`;
  document.getElementById("schoolSel").value = String(state.school);
  document.getElementById("notifyChk").checked = state.notify;
  document.getElementById("adhanChk").checked = state.adhanAtTime;
  if (!state.remindOn) state.remindOn = {};
  document.getElementById("remindRows").innerHTML = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(k => {
    const on = state.remindOn[k] !== false;
    return `<div class="rrow"><span>${nameOf(k)}</span><input type="checkbox" data-ron="${k}" ${on ? "checked" : ""} aria-label="${nameOf(k)} on/off" /><select data-rp="${k}" class="field" ${on ? "" : "disabled"}>${
      [0, 5, 10, 15, 20, 30, 45, 60].map(n => `<option value="${n}"${(state.remind[k] ?? 15) === n ? " selected" : ""}>${n === 0 ? t("atTimeOpt") : n + " " + t("minBefore")}</option>`).join("")
    }</select></div>`;
  }).join("");
  document.querySelectorAll("#remindRows input[data-ron]").forEach(cb => {
    cb.onchange = () => {
      const sel = document.querySelector(`#remindRows select[data-rp="${cb.dataset.ron}"]`);
      if (sel) sel.disabled = !cb.checked;
    };
  });
  document.getElementById("soundSel").innerHTML =
    [["adhan-prayer-call.mp3", t("soundAdhan")], ["adhan-prayer-call-trimmed.mp3", t("soundAdhanShort")],
     ["alarm.mp3", t("soundAlarm")], ["alert-on-mobile.wav", t("soundMobile")],
     ["bell.wav", t("soundBell")], ["double-car-honk.mp3", t("soundHonk")],
     ["nikin-short-chick-sound.mp3", t("soundChick")], ["nostalgia.wav", t("soundNostalgia")],
     ["custom", t("soundCustom")]]
      .map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
  document.getElementById("soundSel").value = state.sound;
  document.getElementById("soundUploadRow").style.display = state.sound === "custom" ? "" : "none";
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
    school: state.school,
    tz: state.place.tz
  });
  if (offsetMonth === 0) {
    apiMeta = payload;
    if (payload.timezone) state.place.tz = payload.timezone;
  }
  return payload.days;
}
let refreshToken = 0;
async function refresh() {
  const token = ++refreshToken;
  document.getElementById("nextName").textContent = t("loading");
  try {
    let cal = await fetchCalendar(0);
    const now = zoneParts(state.place.tz);
    if (now.d === cal.length) cal = cal.concat((await fetchCalendar(1)).slice(0, 1));
    if (token !== refreshToken) return; // a newer refresh (place/method change) superseded this one
    calendar = cal;
    renderTimes();
    loadWeather();
    renderMonth();
    renderQibla();
  } catch {
    if (token === refreshToken) toast(t("loadFail"));
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
  const hm = document.getElementById("hdrMethod");
  if (hm && apiMeta.methodName) hm.textContent = apiMeta.methodName;
  const _at = document.getElementById("arcTime"); if (_at) _at.textContent = atTime;
  const _al = document.getElementById("arcLabel"); if (_al) _al.textContent = nameOf(nextKey);
  const prev = [...slots].reverse().find(s => s.min <= nowMin);
  const start = prev ? prev.min : minutes(entry.timings.Fajr) - 1440;
  const pct = Math.min(1, Math.max(0, (nowMin - start) / ((nextAt || start + 1) - start)));
  const _arc = document.getElementById("arc"); if (_arc) _arc.setAttribute("stroke-dashoffset", String(314 * (1 - pct)));
  const g = entry.date.gregorian, h = entry.date.hijri;
  document.getElementById("gDate").textContent = `${localWeekday(g.weekday.en)} ${g.day} ${localMonth(g.month.en)} ${g.year}`;
  document.getElementById("hDate").textContent = `${h.day} ${state.lang === "tr" ? HIJRI_TR[+h.month.number] || h.month.en : h.month.en} ${h.year}`;
  const sun = minutes(entry.timings.Sunrise), dhuhr = minutes(entry.timings.Dhuhr), maghrib = minutes(entry.timings.Maghrib);
  const kerahat = (nowMin >= sun && nowMin < sun + 18) || (nowMin >= dhuhr - 8 && nowMin < dhuhr) || (nowMin >= maghrib - 18 && nowMin < maghrib);
  document.getElementById("kerahat").textContent = kerahat ? t("kerahat") : "";
  document.getElementById("vaktGrid").innerHTML = PRAYERS.map(k => {
    const tm = entry.timings[k];
    const passed = minutes(tm) <= nowMin;
    const trk = getTracker(), done = trk[todayKey()] || [];
    const trackable = TRACKABLE.includes(k), isDone = done.includes(k);
    let check = "";
    if (trackable) {
      if (isDone) check = `<button type="button" class="vakt-check on" data-trk="${k}" aria-label="${nameOf(k)} ${t("done")}">✓</button>`;
      else if (passed) check = `<button type="button" class="vakt-check" data-trk="${k}" aria-label="${t("markDone")} ${nameOf(k)}"></button>`;
      else check = `<span class="vakt-check off" aria-hidden="true"></span>`;
    }
    return `<article class="vakt ${k === nextKey ? "on" : ""}">${check}<div class="nm">${nameOf(k)}</div><div class="tm">${tm}</div><div class="st">${passed ? t("passed") : ""}</div></article>`;
  }).join("");
  try { renderRamadanHub(entry); } catch (e) { /* never let the hub stop adhan/alerts below */ }
  // Adhan at prayer time: play the full adhan once, within a minute after the prayer
  // time begins (tolerates background-tab timer throttling).
  if (state.adhanAtTime && prev) {
    const adhanKey = `${g.date}-${prev.key}`;
    const sinceSecs = (nowMin - prev.min) * 60;
    if (sinceSecs >= 0 && sinceSecs < 60 && adhanPlayedKey !== adhanKey) {
      adhanPlayedKey = adhanKey;
      try { const a = new Audio("/audio/adhan-prayer-call.mp3"); a.play().catch(() => {}); } catch {}
    }
  }
  if (state.notify && !(state.remindOn && state.remindOn[nextKey] === false) && "Notification" in window && Notification.permission === "granted") {
    const minsLeft = nextAt - nowMin, rm = (state.remind && state.remind[nextKey] != null) ? state.remind[nextKey] : 15;
    const key = `${g.date}-${nextKey}-r${rm}`;
    if (minsLeft <= rm + 0.02 && minsLeft > -1 && notifiedKey !== key) {
      notifiedKey = key;
      playAlert();
      const title = rm === 0 ? `${nameOf(nextKey)} ${t("timeNow")}` : `${nameOf(nextKey)} — ${t("inMinutes").replace("{n}", rm)}`;
      showLocalNotification(title);
    }
  }
}
function showLocalNotification(title) {
  const fallback = () => { try { new Notification(title); } catch {} };
  if (navigator.serviceWorker && navigator.serviceWorker.ready) {
    // Android Chrome forbids `new Notification()`; go through the service worker.
    navigator.serviceWorker.ready
      .then(reg => reg.showNotification(title, { icon: "/icon-192.png", badge: "/icon-192.png", tag: "ddh-local" }))
      .catch(fallback);
  } else fallback();
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
/* ---------- Hijri month calendar ---------- */
const HIJRI_MONTHS_EN = ["Muharram","Safar","Rabiʿ al-awwal","Rabiʿ al-thani","Jumada al-awwal","Jumada al-thani","Rajab","Shaʿban","Ramadan","Shawwal","Dhu al-Qaʿdah","Dhu al-Hijjah"];
const HIJRI_MONTHS_TR = ["Muharrem","Safer","Rebiülevvel","Rebiülâhir","Cemaziyelevvel","Cemaziyelâhir","Receb","Şaban","Ramazan","Şevval","Zilkade","Zilhicce"];
function hijriName(m) { return (state.lang === "tr" ? HIJRI_MONTHS_TR : HIJRI_MONTHS_EN)[m - 1] || ""; }
function gToHLocal(y, m, d) {
  if (typeof PrayerCalc !== "undefined" && PrayerCalc.gToH) return PrayerCalc.gToH(y, m, d);
  return null;
}
function renderHijriCal() {
  const now = new Date();
  const h0 = gToHLocal(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const heading = document.getElementById("monthHeading");
  const note = document.getElementById("monthNote");
  const body = document.getElementById("monthBody");
  if (!h0) { if (heading) heading.textContent = t("hijriCal"); return; }
  const hy = +h0.year, hm = +h0.month.number;
  if (heading) heading.textContent = `${hijriName(hm)} ${hy}`;
  if (note) note.textContent = t("hijriNote");
  // find Gregorian date of Hijri day 1 by scanning back
  const d = new Date(now);
  for (let i = 0; i < 32; i++) {
    const h = gToHLocal(d.getFullYear(), d.getMonth() + 1, d.getDate());
    if (+h.day === 1 && +h.month.number === hm) break;
    d.setDate(d.getDate() - 1);
  }
  const first = new Date(d);
  // month length: scan forward until month changes
  let len = 29;
  const d2 = new Date(first);
  for (let i = 1; i <= 30; i++) {
    d2.setDate(d2.getDate() + 1);
    const h = gToHLocal(d2.getFullYear(), d2.getMonth() + 1, d2.getDate());
    if (+h.month.number !== hm) { len = i; break; }
    if (i === 30) len = 30;
  }
  const startDow = (first.getDay() + 6) % 7; // Monday-first
  const wd = state.lang === "tr" ? ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"] : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  let html = `<tr>${wd.map(w => `<th>${w}</th>`).join("")}</tr><tr>`;
  for (let i = 0; i < startDow; i++) html += "<td></td>";
  const todayStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  for (let day = 1; day <= len; day++) {
    const gd = new Date(first); gd.setDate(gd.getDate() + day - 1);
    const isToday = `${gd.getFullYear()}-${gd.getMonth()}-${gd.getDate()}` === todayStr;
    const col = (startDow + day - 1) % 7;
    if (day > 1 && col === 0) html += "</tr><tr>";
    html += `<td class="${isToday ? "today" : ""}"><b>${day}</b><span>${gd.getDate()}.${gd.getMonth() + 1}</span></td>`;
  }
  html += "</tr>";
  // swap table head for calendar: use thead for weekdays is already in first row; hide original thead via class
  body.innerHTML = html;
  document.querySelector("#panel-month thead").style.display = "none";
  document.getElementById("monthMode").classList.remove("on");
  document.getElementById("ramadanMode").classList.remove("on");
  document.getElementById("hijriMode").classList.add("on");
}
function renderMonth() {
  if (monthView === "hijri") { renderHijriCal(); return; }
  document.querySelector("#panel-month thead").style.display = "";
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
  document.getElementById("monthMode").classList.toggle("on", monthView === "month");
  document.getElementById("ramadanMode").classList.toggle("on", monthView === "ramadan");
  document.getElementById("hijriMode").classList.toggle("on", monthView === "hijri");
}
function renderAyah() {
  const a = AYAH[Math.floor(Date.now() / 86400000) % AYAH.length];
  document.getElementById("ayahAr").textContent = a.ar;
  document.getElementById("ayahText").textContent = state.lang === "tr" ? a.tr : a.en;
  document.getElementById("ayahRef").textContent = a.ref;
}

/* Build the sexy compass dial: degree ring, cardinals, needle, Kaaba marker. */
function buildCompassDial() {
  const dial = document.getElementById("dial");
  if (!dial) return;
  dial.innerHTML = ""; // clear stale dial content
  dial.dataset.built = "1";
  const NS = "http://www.w3.org/2000/svg";
  const cx = 110, cy = 110;
  const P = (deg, r) => {
    const a = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const el = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    (parent || dial).appendChild(e);
    return e;
  };
  // face
  el("circle", { cx, cy, r: 99, fill: "#0c1425", stroke: "#d4a574", "stroke-opacity": ".4", "stroke-width": 1.5 });
  el("circle", { cx, cy, r: 84, fill: "none", stroke: "#ffffff", "stroke-opacity": ".07" });
  // compass rose star (subtle)
  let star = "";
  for (let i = 0; i < 8; i++) {
    const a1 = (i * 45 - 90) * Math.PI / 180, a2 = (i * 45 + 22.5 - 90) * Math.PI / 180;
    const r1 = i % 2 === 0 ? 44 : 30, r2 = 12;
    star += `M${cx} ${cy}L${(cx + r1 * Math.cos(a1)).toFixed(1)} ${(cy + r1 * Math.sin(a1)).toFixed(1)}L${(cx + r2 * Math.cos(a2)).toFixed(1)} ${(cy + r2 * Math.sin(a2)).toFixed(1)}Z`;
  }
  el("path", { d: star, fill: "#ffffff", "fill-opacity": ".045" });
  // gear-feeling ticks: 2° minor, 10° medium, 30° major + numbers
  for (let d = 0; d < 360; d += 2) {
    const major = d % 30 === 0, medium = d % 10 === 0;
    const r1 = major ? 84 : medium ? 88 : 92;
    const [x1, y1] = P(d, r1), [x2, y2] = P(d, 96);
    el("line", { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1),
      stroke: "#f6f1e8", "stroke-opacity": major ? ".9" : medium ? ".5" : ".22",
      "stroke-width": major ? 2.2 : medium ? 1.4 : 0.8 });
    if (major) {
      const [tx, ty] = P(d, 73);
      const t = el("text", { x: tx.toFixed(1), y: (ty + 3).toFixed(1), "text-anchor": "middle",
        fill: "#8b93a7", "font-size": "8.5", "font-family": "Outfit, sans-serif", "data-upright": "1" });
      t.textContent = d + "\u00B0";
    }
  }
  // cardinals (localized N/E/S/W or K/D/G/B)
  const labels = COMPASS[state.lang] || COMPASS.en;
  [[0, 0], [90, 1], [180, 2], [270, 3]].forEach(([deg, i]) => {
    const [tx, ty] = P(deg, 62);
    const t = el("text", { x: tx.toFixed(1), y: (ty + 5.5).toFixed(1), "text-anchor": "middle",
      fill: i === 0 ? "#ef4444" : "#f6f1e8", "font-size": "16", "font-weight": "700",
      "font-family": "Outfit, sans-serif", "data-upright": "1", "data-cardinal": i });
    t.textContent = labels[i];
  });
  // Qibla needle group — rotated to the qibla bearing by renderQibla,
  // so the red tip (+ Kaaba) points at the Qibla. Turn the phone until
  // the red tip meets the gold arrow at the top.
  const needle = el("g", { id: "qiblaNeedle" });
  el("polygon", { points: "110,58 103.5,110 110,110", fill: "#b91c1c" }, needle);
  el("polygon", { points: "110,58 116.5,110 110,110", fill: "#ef4444" }, needle);
  el("polygon", { points: "110,162 103.5,110 110,110", fill: "#9aa0ae" }, needle);
  el("polygon", { points: "110,162 116.5,110 110,110", fill: "#e8e4da" }, needle);
  // small Kaaba riding at the red tip
  const km = el("g", { id: "qiblaMark" }, needle);
  el("circle", { cx: 110, cy: 66, r: 15, fill: "#0c1425", "fill-opacity": ".85", stroke: "#d4a574", "stroke-opacity": ".5", "stroke-width": 1 }, km);
  el("rect", { x: 102, y: 58, width: 16, height: 14, rx: 1.5, fill: "#141414", stroke: "#d4a574", "stroke-width": 1.4 }, km);
  el("rect", { x: 102, y: 63, width: 16, height: 2.4, fill: "#d4a574" }, km);
  el("rect", { x: 109.4, y: 65.5, width: 2.6, height: 6.5, fill: "#d4a574" }, km);
  // gold center cap (stays fixed, symmetric)
  el("circle", { cx, cy, r: 7, fill: "#d4a574", stroke: "#8d5e32", "stroke-width": 1.5 });
  el("circle", { cx, cy, r: 2.5, fill: "#0c1425" });
}

function renderQibla() {
  const qp = qiblaPlace();
  const local = qiblaBearing(qp.lat, qp.lon);
  const atKaaba = Math.abs(qp.lat - 21.4225) < 0.05 && Math.abs(qp.lon - 39.8262) < 0.05;
  const b = atKaaba ? 0 : local;
  const _qdeg = document.getElementById("qiblaDeg"); if (_qdeg) _qdeg.textContent = atKaaba ? (state.lang === "tr" ? "Kâbe" : "Kaaba") : `${b.toFixed(1)}°`;
  const qn = document.getElementById("qiblaNeedle");
  if (qn) qn.setAttribute("transform", `rotate(${b} 110 110)`);
  const dl = document.getElementById("dial");
  if (dl) dl.setAttribute("transform", `rotate(${heading == null ? 0 : -heading} 110 110)`);
  document.querySelectorAll("#dial [data-upright]").forEach(el => {
    el.setAttribute("transform", `rotate(${heading || 0} ${el.getAttribute("x")} ${el.getAttribute("y")})`);
  });
  const frame = document.getElementById("qiblaFrame");
  const open = document.getElementById("qiblaOpen");
  if (frame) {
    const src = `/qibla?embed=1&lat=${qp.lat}&lon=${qp.lon}&name=${encodeURIComponent(qp.name)}`;
    if (frame.dataset.place !== src) { frame.dataset.place = src; frame.src = src; }
    if (open) open.href = `/qibla?lat=${qp.lat}&lon=${qp.lon}&name=${encodeURIComponent(qp.name)}`;
  }
  document.getElementById("qiblaCheck").textContent = atKaaba
    ? (state.lang === "tr" ? "Kâbe’desiniz." : "You are at the Kaaba.")
    : `${b.toFixed(1)}° · ${state.lang === "tr" ? "gerçek kuzeye göre" : "from true north"}`;
  const km = kaabaKm(qp.lat, qp.lon);
  document.getElementById("qiblaDistance").textContent = atKaaba ? "" : `${km.toFixed(0)} km · ${state.lang === "tr" ? "Kâbe mesafesi" : "to the Kaaba"}`;
  // Warn when the compass uses GPS because the manual location is a test location.
  const qloc = document.getElementById("qiblaLocNote");
  if (qloc) {
    qloc.textContent = qiblaLoc
      ? (state.lang === "tr"
          ? `Pusula GPS konumunuzu kullanıyor (manuel konum: ${state.place.name}).`
          : `Compass is using your GPS location (manual location: ${state.place.name}).`)
      : "";
  }
  if (heading == null) { document.getElementById("qiblaTurn").textContent = ""; qiblaWasAligned = false; }
  else {
    const diff = ((b - heading + 540) % 360) - 180;
    // Celebratory lock-on: vibration pattern + pulsing Kaaba marker (Android vibrate; iOS gets visual only).
    const aligned = Math.abs(diff) < 4;
    const now = Date.now();
    const qn2 = document.getElementById("qiblaNeedle");
    if (aligned && !qiblaWasAligned && now - lastBuzzMs > 3000) {
      if (navigator.vibrate) { try { navigator.vibrate([90, 50, 90, 50, 180]); } catch (e) {} }
      lastBuzzMs = now;
    }
    if (qn2) qn2.classList.toggle("locked", aligned);
    qiblaWasAligned = aligned;
    const qt = document.getElementById("qiblaTurn");
    if (qt) {
      if (Math.abs(diff) < 6) { qt.innerHTML = `<span class="turn-found">✓ ${t("facing")}</span>`; }
      else {
        const dir = diff > 0 ? "→" : "←";
        const word = diff > 0 ? t("right") : t("left");
        qt.innerHTML = `<span class="turn-dir">${dir}</span> <span class="turn-deg">${Math.abs(diff).toFixed(0)}°</span> <span class="turn-word">${word}</span>`;
      }
    }
  }
}
function tasbihPhraseFor(n) { return n < 33 ? "Subhanallah" : n < 66 ? "Alhamdulillah" : "Allahu akbar"; }
function renderTasbih() {
  const n = state.tasbih % 100;
  document.getElementById("tasbihPhrase").textContent = tasbihPhraseFor(n);
  document.getElementById("tasbihCount").textContent = String(n);
  renderBeadText();
}
function renderBeadText() {
  const n = state.tasbih % 100;
  const inSet = n < 33 ? n : n < 66 ? n - 33 : n - 66;
  const target = n < 66 ? 33 : 34;
  const bp = document.getElementById("beadPhrase"); if (bp) bp.textContent = tasbihPhraseFor(n);
  const bc = document.getElementById("beadCount"); if (bc) bc.textContent = String(inSet);
  const bt = document.getElementById("beadTarget"); if (bt) bt.textContent = "/ " + target;
  const bl = document.getElementById("beadLoop"); if (bl) bl.textContent = (state.lang === "tr" ? "Tur " : "Loop ") + ((state.tasbihLoops || 0) + 1);
}
/* ---------- Tasbih beads mode ---------- */
const BEAD_STYLES = {
  melon: ["radial-gradient(circle at 35% 32%, #ff9a86, #e03222 52%, #8f130c 100%)", "#2f7d32"],
  onyx: ["radial-gradient(circle at 35% 32%, #7a7a7a, #1c1c1e 55%, #000000 100%)", "#333333"],
  pearl: ["radial-gradient(circle at 35% 32%, #ffffff, #e3e7ea 55%, #a7b0b8 100%)", "#c3ccd2"],
  amber: ["radial-gradient(circle at 35% 32%, #ffe082, #f0a202 58%, #96650a 100%)", "#b57e10"],
  wood: ["radial-gradient(circle at 35% 32%, #d29a55, #8a5a24 58%, #54340e 100%)", "#6e4517"]
};
let beadCtx = null;
function beadSound() {
  try {
    beadCtx = beadCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (beadCtx.state === "suspended") beadCtx.resume();
    const t0 = beadCtx.currentTime;
    const o = beadCtx.createOscillator(), g = beadCtx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(1100 + Math.random() * 180, t0);
    o.frequency.exponentialRampToValueAtTime(590, t0 + 0.07);
    g.gain.setValueAtTime(0.22, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.09);
    o.connect(g); g.connect(beadCtx.destination);
    o.start(t0); o.stop(t0 + 0.1);
  } catch {}
}
function buildBeads() {
  const strip = document.getElementById("beadStrip");
  if (!strip) return;
  const [bg, ring] = BEAD_STYLES[state.beadStyle] || BEAD_STYLES.melon;
  strip.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    const b = document.createElement("div");
    b.className = "bead";
    b.style.background = bg;
    b.style.border = "3px solid " + ring;
    strip.appendChild(b);
  }
  const picker = document.getElementById("beadStyles");
  if (picker) {
    picker.innerHTML = Object.keys(BEAD_STYLES).map(k =>
      `<button type="button" data-bs="${k}" class="${k === state.beadStyle ? "on" : ""}" style="background:${BEAD_STYLES[k][0]}" aria-label="${k}"></button>`).join("");
    picker.querySelectorAll("button").forEach(btn => btn.onclick = e => {
      e.stopPropagation();
      state.beadStyle = btn.dataset.bs; save();
      buildBeads(); renderBeads(false);
    });
  }
}
function renderBeads(animate) {
  const n = state.tasbih % 100;
  renderBeadText();
  const strip = document.getElementById("beadStrip");
  if (strip) {
    strip.style.transition = animate && n !== 0 ? "transform .22s ease" : "none";
    strip.style.transform = `translateX(${-n * 54}px)`;
  }
}
function bumpTasbih(withSound) {
  state.tasbih = (state.tasbih || 0) + 1;
  if (state.tasbih >= 100) { state.tasbih = 0; state.tasbihLoops = (state.tasbihLoops || 0) + 1; }
  save();
  renderTasbih();
  if (state.tasbihMode === "beads") { renderBeads(true); if (withSound) beadSound(); }
}
function applyTasbihMode() {
  const beads = state.tasbihMode === "beads";
  document.getElementById("tasbihClassic").classList.toggle("hidden", beads);
  document.getElementById("tasbihBeads").classList.toggle("hidden", !beads);
  document.querySelectorAll("#tasbihModeSeg button").forEach(b => b.classList.toggle("on", b.dataset.tm === state.tasbihMode));
  if (beads) { buildBeads(); renderBeads(false); }
}
/* ---------- prayer tracker with streaks ---------- */
const TRACKABLE = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
function todayKey(d) { return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : todayKey(new Date()); }
function getTracker() {
  try { return JSON.parse(localStorage.getItem("ddh-tracker") || "{}"); } catch { return {}; }
}
function saveTracker(tr) {
  try { localStorage.setItem("ddh-tracker", JSON.stringify(tr)); } catch {}
}
function togglePrayer(key) {
  const tr = getTracker(), tk = todayKey();
  tr[tk] = tr[tk] || [];
  const i = tr[tk].indexOf(key);
  if (i >= 0) tr[tk].splice(i, 1); else tr[tk].push(key);
  saveTracker(tr);
  renderTracker();
  renderTimes(); // refresh the card checkboxes immediately
}
function streakDays() {
  const tr = getTracker();
  let streak = 0;
  const d = new Date();
  // don't break streak if today is incomplete yet
  if (!(tr[todayKey(d)] && TRACKABLE.every(k => tr[todayKey(d)].includes(k)))) d.setDate(d.getDate() - 1);
  while (true) {
    const k = todayKey(d);
    if (tr[k] && TRACKABLE.every(p => tr[k].includes(p))) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}
function renderTracker() {
  const tr = getTracker(), done = tr[todayKey()] || [];
  const box = document.getElementById("trackerBox");
  if (!box) return;
  const n = streakDays();
  const allDone = TRACKABLE.every(k => done.includes(k));
  box.innerHTML =
    `<div class="tracker-head">` +
    (n > 0 ? `<span class="streak">🔥 ${n} ${t(n === 1 ? "streak" : "streaks")}</span>` : `<span>${t("trackerTitle")}</span>`) +
    `</div>` +
    (allDone ? `<div class="tracker-congrats">🎉 ${t("congrats")}</div>` : `<div class="tracker-hint">${t("cardHint")}</div>`);
}
/* ---------- nearby mosques (OpenStreetMap / Overpass) ---------- */
function mosqueDistKm(lat1, lon1, lat2, lon2) {
  const R = 6371, dLa = (lat2 - lat1) * Math.PI / 180, dLo = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
async function nearbySearch(kind) {
  const list = document.getElementById("mosqueList");
  const btn = document.getElementById(kind === "halal" ? "halalFind" : "mosqueFind");
  btn.disabled = true;
  // 1) Prefer GPS location, fall back to selected place
  let lat = state.place.lat, lon = state.place.lon;
  list.innerHTML = `<p class="hint">${t("mosquesLoading")}</p>`;
  if (navigator.geolocation) {
    try {
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000, maximumAge: 600000 });
      });
      lat = pos.coords.latitude; lon = pos.coords.longitude;
    } catch {} // fall back to selected place
  }
  // 2) Build query
  const q = kind === "halal"
    ? `[out:json][timeout:25];(node["amenity"~"^(restaurant|fast_food|cafe)$"]["diet:halal"="yes"](around:10000,${lat},${lon});way["amenity"~"^(restaurant|fast_food|cafe)$"]["diet:halal"="yes"](around:10000,${lat},${lon}););out center 20;`
    : `[out:json][timeout:25];(node["amenity"="place_of_worship"]["religion"="muslim"](around:10000,${lat},${lon});way["amenity"="place_of_worship"]["religion"="muslim"](around:10000,${lat},${lon}););out center 20;`;
  const endpoints = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
  const fallbackName = kind === "halal" ? (state.lang === "tr" ? "Helal restoran" : "Halal restaurant") : (state.lang === "tr" ? "Cami" : "Mosque");
  const icon = kind === "halal" ? "🍽️" : "🕌";
  const noneKey = kind === "halal" ? "halalNone" : "mosquesNone";
  let items = null, attempt = 0;
  const maxAttempts = 6;
  while (items === null && attempt < maxAttempts) {
    attempt++;
    if (attempt > 1) list.innerHTML = `<p class="hint">${t("mosquesRetrying")} (${attempt}/${maxAttempts})</p>`;
    for (const ep of endpoints) {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 20000);
        const res = await fetch(ep + "?data=" + encodeURIComponent(q), { signal: ctrl.signal });
        clearTimeout(timer);
        if (!res.ok) continue;
        const data = await res.json();
        const seen = new Set();
        items = (data.elements || []).map(el => {
          const mlat = el.lat ?? el.center?.lat, mlon = el.lon ?? el.center?.lon;
          if (mlat == null) return null;
          const key = mlat.toFixed(5) + "," + mlon.toFixed(5);
          if (seen.has(key)) return null;
          seen.add(key);
          return { name: el.tags?.name || fallbackName, lat: mlat, lon: mlon, d: mosqueDistKm(lat, lon, mlat, mlon) };
        }).filter(Boolean).sort((a, b) => a.d - b.d).slice(0, 15);
        break;
      } catch {}
    }
    if (items === null && attempt < maxAttempts) await new Promise(r => setTimeout(r, 2000 * attempt));
  }
  btn.disabled = false;
  if (items === null) { list.innerHTML = `<p class="hint">${t("mosquesError")}</p>`; return; }
  if (!items.length) { list.innerHTML = `<p class="hint">${t(noneKey)}</p>`; return; }
  list.innerHTML = items.map(m =>
    `<a class="mosque" href="https://www.google.com/maps/search/?api=1&query=${m.lat},${m.lon}" target="_blank" rel="noopener">` +
    `<span class="mq-name">${icon} ${escapeHtml(m.name)}</span><span class="mq-d">${m.d < 1 ? Math.round(m.d * 1000) + " m" : m.d.toFixed(1) + " km"}</span></a>`
  ).join("");
}
async function findMosques() { return nearbySearch("mosque"); }
async function findHalal() { return nearbySearch("halal"); }
/* ---------- Ramadan hub: Suhoor/Iftar countdown during Ramadan ---------- */
function isRamadan(entry) {
  const h = entry && entry.date && entry.date.hijri;
  return h && +h.month.number === 9;
}
function renderRamadanHub(entry) {
  let hub = document.getElementById("ramadanHub");
  if (!isRamadan(entry)) { if (hub) hub.remove(); return; }
  if (!hub) {
    hub = document.createElement("div");
    hub.id = "ramadanHub";
    hub.className = "ramadan-hub";
    document.getElementById("vaktGrid").after(hub);
  }
  const zp = zoneParts(state.place.tz || "UTC");
  const nowMin = zp.hh * 60 + zp.mm;
  const fajr = minutes(entry.timings.Fajr), maghrib = minutes(entry.timings.Maghrib);
  let label, target;
  if (nowMin < fajr) { label = t("suhoorIn"); target = fajr; }
  else if (nowMin < maghrib) { label = t("iftarIn"); target = maghrib; }
  else { label = t("suhoorIn"); target = fajr + 1440; } // after iftar: next suhoor
  const diff = target - nowMin, hh = Math.floor(diff / 60), mm = Math.floor(diff % 60);
  hub.innerHTML = `<div class="rh-title">🌙 ${t("ramadanHub")}</div>` +
    `<div class="rh-count">${label} <b>${hh}:${String(mm).padStart(2, "0")}</b></div>` +
    (nowMin >= fajr && nowMin < maghrib ? `<div class="rh-note">${t("fasting")}</div>` : "");
}
function showTab(id) {
  const homeIds = ["homeHero", "panel-home"];
  const isHome = (id === "home");
  homeIds.forEach(hid => {
    const el = document.getElementById(hid);
    if (el) el.classList.toggle("hidden", !isHome);
  });
  ["month", "qibla", "quran", "quiet", "mosques", "settings", "more"].forEach(k => {
    const p = document.getElementById("panel-" + k);
    if (p) p.classList.toggle("hidden", k !== id);
  });
  document.querySelectorAll(".bnav button").forEach(b => b.classList.toggle("on",
    b.dataset.goto === id || (b.dataset.goto === "more" && id === "month")));
  if (id === "quran" && !chapters.length) loadChapters();
  // New page must open at its top (iOS keeps the previous page's scroll otherwise)
  const toTop = () => {
    window.scrollTo(0, 0);
    document.querySelectorAll("main, main *").forEach(el => { if (el.scrollTop) el.scrollTop = 0; });
  };
  toTop();
  requestAnimationFrame(toTop);
}

async function loadChapters() {
  try {
    const res = await fetch(`https://api.quran.com/api/v4/chapters?language=${state.lang === "tr" ? "tr" : "en"}`);
    if (!res.ok) throw new Error("chapters " + res.status);
    const json = await res.json();
    chapters = json.chapters || [];
  } catch {
    toast(t("loadFail"));
    document.getElementById("chapterList").innerHTML = `<p class="hint">${t("loadFail")}</p>`;
    return;
  }
  renderChapters();
  if (!document.getElementById("verses").childElementCount) openChapter(1);
}
function renderChapters() {
  const q = (document.getElementById("surahSearch").value || "").toLowerCase();
  document.getElementById("chapterList").innerHTML = chapters.filter(c => `${c.id} ${c.name_simple} ${c.name_arabic} ${c.translated_name?.name || ""}`.toLowerCase().includes(q)).map(c =>
    `<button type="button" data-id="${c.id}"><b>${c.id}. ${escapeHtml(c.name_simple)}</b><small>${escapeHtml(c.name_arabic)} · ${escapeHtml(c.translated_name?.name || "")} · ${c.verses_count}</small></button>`
  ).join("");
  document.querySelectorAll("#chapterList button").forEach(btn => btn.onclick = () => openChapter(+btn.dataset.id));
}
let chapterToken = 0;
async function openChapter(id, keepAudio = false) {
  currentChapter = id;
  const token = ++chapterToken;
  const chapter = chapters.find(c => c.id === id);
  document.getElementById("surahTitle").textContent = chapter ? chapter.name_simple : `Surah ${id}`;
  const verses = document.getElementById("verses");
  const previousHeight = verses.scrollTop;
  verses.innerHTML = `<p class="hint">${t("loading")}</p>`;
  const translation = state.lang === "tr" ? 77 : 20;
  let uthmani, meal;
  try {
    [uthmani, meal] = await Promise.all([
      fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),
      fetch(`https://api.quran.com/api/v4/quran/translations/${translation}?chapter_number=${id}`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    ]);
  } catch {
    if (token === chapterToken) verses.innerHTML = `<p class="hint">${t("loadFail")}</p>`;
    return;
  }
  if (token !== chapterToken) return; // user already opened another surah
  stopFollow();
  chapterData = { id, uthmani: uthmani.verses || [], meal: meal.translations || [], pron: null };
  renderVerses();
  verses.scrollTop = previousHeight;
  if (!keepAudio) document.getElementById("audio").removeAttribute("src");
  if (state.quranView === "pron" || state.quranView === "both") ensurePron().then(() => { if (chapterData && chapterData.id === id) renderVerses(); });
}
let chapterData = null;
async function ensurePron() {
  if (!chapterData || chapterData.pron) return;
  try {
    const j = await (await fetch(`https://api.alquran.cloud/v1/surah/${chapterData.id}/en.transliteration`)).json();
    if (j && j.data && j.data.ayahs) chapterData.pron = j.data.ayahs.map(a => a.text);
  } catch { if (chapterData) chapterData.pron = []; }
}
function renderVerses() {
  const box = document.getElementById("verses");
  if (!box || !chapterData) return;
  const mode = state.quranView || "trans";
  box.innerHTML = chapterData.uthmani.map((v, i) => {
    const pron = chapterData.pron && chapterData.pron[i] ? `<div class="pron">${escapeHtml(chapterData.pron[i])}</div>` : "";
    const tr = `<div class="tr">${plainTranslation(chapterData.meal[i]?.text)}</div>`;
    const extra = mode === "none" ? "" : mode === "pron" ? pron : mode === "both" ? pron + tr : tr;
    return `<article class="verse" data-v="${i}"><div class="kicker">${escapeHtml(v.verse_key)}</div><div class="ar">${escapeHtml(v.text_uthmani)}</div>${extra}</article>`;
  }).join("");
  document.querySelectorAll("#quranViewSeg button").forEach(b => b.classList.toggle("on", b.dataset.qv === mode));
  const fc = document.getElementById("followChk");
  if (fc) fc.checked = !!state.quranFollow;
}
async function refreshQuranLanguage() {
  const openId = currentChapter || 1;
  chapters = [];
  renderChapters();
  await loadChapters();
  await openChapter(openId, true);
}

// ===== Follow recitation: per-verse audio + shading that advances verse by verse =====
const followState = { playing: false, idx: 0, urls: null, key: "" };
async function ensureVerseAudio() {
  const key = currentChapter + ":" + state.reciter;
  if (followState.key === key && followState.urls) return followState.urls;
  const res = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${currentChapter}?audio=${state.reciter}&per_page=300&words=false`);
  const j = await res.json();
  followState.urls = (j.verses || []).map(v => {
    const u = v.audio && v.audio.url;
    if (!u) return null;
    return u.startsWith("http") ? u : "https://audio.qurancdn.com/" + u.replace(/^\//, "");
  });
  followState.key = key;
  return followState.urls;
}
function markVerse(i) {
  document.querySelectorAll("#verses .verse.on").forEach(el => el.classList.remove("on"));
  const el = document.querySelector(`#verses .verse[data-v="${i}"]`);
  if (el) { el.classList.add("on"); el.scrollIntoView({ block: "center", behavior: "smooth" }); }
}
function stopFollow() {
  if (!followState.playing && !followState.urls) return;
  followState.playing = false;
  document.querySelectorAll("#verses .verse.on").forEach(el => el.classList.remove("on"));
}
function playVerseAt(i) {
  const audio = document.getElementById("audio");
  const btn = document.getElementById("playBtn");
  const urls = followState.urls || [];
  if (i >= urls.length) { stopFollow(); btn.textContent = t("play"); return; }
  if (!urls[i]) { playVerseAt(i + 1); return; }
  followState.idx = i;
  followState.playing = true;
  markVerse(i);
  if (audio.getAttribute("src") !== urls[i]) audio.src = urls[i];
  btn.textContent = t("pause");
  const p = audio.play();
  if (p) p.catch(() => { followState.playing = false; btn.textContent = t("play"); toast(t("audioFail")); });
}
async function toggleFollow() {
  const audio = document.getElementById("audio");
  const btn = document.getElementById("playBtn");
  if (followState.playing && !audio.paused) { audio.pause(); followState.playing = false; btn.textContent = t("play"); return; }
  if (followState.playing && audio.paused && audio.getAttribute("src")) { followState.playing = true; btn.textContent = t("pause"); audio.play().catch(() => {}); return; }
  document.getElementById("radioAudio").pause();
  const rb = document.getElementById("radioBtn"); if (rb) rb.textContent = t("radioPlay");
  btn.textContent = t("loading");
  try { await ensureVerseAudio(); } catch { btn.textContent = t("play"); return toast(t("audioFail")); }
  playVerseAt(followState.idx || 0);
}
document.getElementById("audio").addEventListener("ended", () => {
  if (followState.playing) playVerseAt(followState.idx + 1);
});

function playChapter() {
  if (state.quranFollow) { toggleFollow(); return; }
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
  if (!STATIONS.some(s => s[0] === station)) station = STATIONS[0][0];
  document.getElementById("stations").innerHTML =
    `<select id="stationSel" class="field" aria-label="Quran radio station">${STATIONS.map(([id, label]) => `<option value="${id}"${id === station ? " selected" : ""}>${label}</option>`).join("")}</select>`;
  document.getElementById("stationSel").onchange = e => {
    station = e.target.value;
    const audio = document.getElementById("radioAudio");
    const wasPlaying = !audio.paused && audio.getAttribute("src");
    audio.pause();
    audio.removeAttribute("src");
    if (wasPlaying) playRadio();
  };
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
  list.innerHTML = results.map((r, i) => `<li><button type="button" data-i="${i}">${escapeHtml(r.name)}<small>${escapeHtml([r.admin1, r.country].filter(Boolean).join(" · "))}</small></button></li>`).join("");
  list.querySelectorAll("button[data-i]").forEach(btn => btn.onclick = () => choosePlace(results[+btn.dataset.i]));
}
function choosePlace(r) {
  state.place = { name: r.name, country: r.country || "", lat: r.latitude, lon: r.longitude, tz: r.timezone || "UTC" };
  save();
  updateDeclination(r.latitude, r.longitude);
  document.getElementById("locLabel").textContent = r.name;
  document.getElementById("locModal").classList.add("hidden");
  refresh();
}
// Fetch magnetic declination (NOAA) so the Android compass can correct
// magnetic north -> true north. Cached; changes ~0.08°/year.
async function updateDeclination(lat, lon) {
  try {
    const res = await fetch(`https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${lat}&lon1=${lon}&key=zNEw7&resultFormat=json`);
    const j = await res.json();
    const dec = j.result && j.result[0] && j.result[0].declination;
    if (typeof dec === 'number' && !isNaN(dec)) {
      state.declination = dec;
      try { localStorage.setItem('ddh-dec', String(dec)); } catch (e) {}
    }
  } catch (e) {}
}

document.getElementById("locBtn").onclick = () => { document.getElementById("locModal").classList.remove("hidden"); document.getElementById("citySearch").focus(); };
document.getElementById("locClose").onclick = () => document.getElementById("locModal").classList.add("hidden");
const _sb = document.getElementById("setBtn"); if (_sb) _sb.onclick = () => { showTab("settings"); syncSetControls(); setShow(null); };
function playAlert() {
  let src;
  if (state.sound === "custom" && state.customSound) src = state.customSound;
  else src = "/audio/" + (state.sound === "custom" ? "bell.wav" : state.sound);
  try { const a = new Audio(src); a.play().catch(() => {}); } catch {}
}
document.getElementById("soundSel").onchange = e => {
  state.sound = e.target.value; save();
  document.getElementById("soundUploadRow").style.display = state.sound === "custom" ? "" : "none";
};
document.getElementById("soundPreview").onclick = () => playAlert();
document.getElementById("soundFile").onchange = e => {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  if (f.size > 1.5 * 1024 * 1024) { toast(t("soundTooBig")); e.target.value = ""; return; }
  const r = new FileReader();
  r.onload = () => { state.customSound = r.result; state.sound = "custom"; save(); applyI18n(); toast(t("soundSaved")); };
  r.readAsDataURL(f);
};
const menuPanel = document.getElementById("menuPanel"), menuBtn = document.getElementById("menuBtn");
if (!menuPanel || !menuBtn) { /* menu removed in redesign */ } else {
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
  document.getElementById("mSet").onclick = mClose(() => { showTab("settings"); syncSetControls(); setShow(null); });
  menuPanel.querySelectorAll("[data-soon]").forEach(b => b.onclick = () => toast(t("comingSoon")));
  menuPanel.querySelectorAll("a.menu-link").forEach(a => a.onclick = closeMenu);
}
} // end menu guard (settings code below is top-level)
// Multi-screen settings navigation
function setShow(name){
  document.getElementById("setMain").classList.toggle("hidden", !!name);
  ["loc","calc","remind","appear","notif"].forEach(k => {
    document.getElementById("setSub-"+k).classList.toggle("hidden", k !== name);
  });
}
document.querySelectorAll("[data-setgo]").forEach(b => b.onclick = () => setShow(b.dataset.setgo));
document.querySelectorAll("[data-setback]").forEach(b => b.onclick = () => setShow(null));
document.querySelectorAll("[data-morego]").forEach(b => b.onclick = () => {
  const k = b.dataset.morego;
  showTab("month");
  const modeBtn = document.getElementById(k === "ramadan" ? "ramadanMode" : k === "hijri" ? "hijriMode" : "monthMode");
  if (modeBtn) modeBtn.click();
  window.scrollTo({ top: 0 });
});
document.querySelectorAll("#panel-more [data-soon]").forEach(b => b.onclick = () => toast(t("comingSoon")));
// Collapse the open sub-screen when clicking anywhere outside the settings panel
document.addEventListener("click", e => {
  const main = document.getElementById("setMain");
  if (!main || !main.classList.contains("hidden")) return;
  if (e.target.closest("#panel-settings")) return;
  setShow(null);
});
// Keep Location + Appearance language selects in sync
(function() {
  const a = document.getElementById("langSel"), b = document.getElementById("langSel2");
  if (a && b) {
    a.addEventListener("change", () => { b.value = a.value; });
    b.addEventListener("change", () => { a.value = b.value; });
  }
})();
// Auto-collapse: after a selection in a sub-screen, return to the Settings menu
["methodSel", "schoolSel", "themeSel", "langSel", "langSel2", "soundSel"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("change", () => setShow(null));
});
// Reset to main screen whenever the modal opens
["setBtn","mSet"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", () => { setShow(null); syncSetControls(); }, true);
});
document.getElementById("setClose").onclick = () => {
  state.method = +document.getElementById("methodSel").value;
  state.school = +document.getElementById("schoolSel").value;
  state.notify = document.getElementById("notifyChk").checked;
  state.adhanAtTime = document.getElementById("adhanChk").checked;
  document.querySelectorAll("#remindRows select[data-rp]").forEach(sel => { state.remind[sel.dataset.rp] = +sel.value; });
  if (!state.remindOn) state.remindOn = {};
  document.querySelectorAll("#remindRows input[data-ron]").forEach(cb => { state.remindOn[cb.dataset.ron] = cb.checked; });
  state.sound = document.getElementById("soundSel").value;
  // New multi-screen controls
  var themeVal = document.getElementById("themeSel").value;
  if (themeVal === "system") {
    state.theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "day" : "night";
  } else {
    state.theme = themeVal === "light" ? "day" : "night";
  }
  var langVal = document.getElementById("langSel").value;
  if (langVal !== state.lang) { state.lang = langVal; }
  state.vibration = document.getElementById("vibChk").checked;
  save();
  showTab("home");
  if (state.notify && "Notification" in window) Notification.requestPermission();
  applyI18n();
  refresh();
};
// Location shortcut inside settings
document.getElementById("setLocBtn").onclick = () => {
  document.getElementById("locModal").classList.remove("hidden");
  document.getElementById("citySearch").focus();
};
// Sync new controls when the settings modal opens
function syncSetControls(){
  var ts = document.getElementById("themeSel");
  if (ts) ts.value = state.theme === "day" ? "light" : "dark";
  var ls = document.getElementById("langSel");
  if (ls) ls.value = state.lang;
  var vc = document.getElementById("vibChk");
  if (vc) vc.checked = !!state.vibration;
}
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
  // keep the URL in sync without reloading, so the user stays exactly where they are
  const target = lang === "tr" ? "/tr/" : "/";
  const here = location.pathname.startsWith("/tr") ? "/tr/" : "/";
  if (target !== here) { try { history.replaceState(null, "", target); } catch {} }
  applyI18n();
  refreshQuranLanguage().catch(() => toast(t("loadFail")));
}
const _le2 = document.getElementById("langEn"); if (_le2) _le2.onclick = () => setLanguage("en");
const _lt2 = document.getElementById("langTr"); if (_lt2) _lt2.onclick = () => setLanguage("tr");
const _tb2 = document.getElementById("themeBtn"); if (_tb2) _tb2.onclick = () => { state.theme = state.theme === "night" ? "day" : "night"; save(); applyI18n(); };
document.getElementById("surahSearch").addEventListener("input", renderChapters);
document.getElementById("playBtn").onclick = playChapter;
document.getElementById("radioBtn").onclick = playRadio;
document.getElementById("monthMode").onclick = () => { monthView = "month"; renderMonth(); };
document.getElementById("ramadanMode").onclick = () => showRamadan().catch(() => toast(t("loadFail")));
document.getElementById("hijriMode").onclick = () => { monthView = "hijri"; renderMonth(); };
renderStations();
document.getElementById("audio").addEventListener("pause", () => { if (!startingAudio) document.getElementById("playBtn").textContent = t("play"); });
document.getElementById("audio").addEventListener("ended", () => { if (!followState.playing) document.getElementById("playBtn").textContent = t("play"); });
document.getElementById("reciterSel").onchange = e => { state.reciter = +e.target.value; save(); stopFollow(); followState.urls = null; followState.idx = 0; document.getElementById("audio").removeAttribute("src"); };
document.querySelectorAll("#quranViewSeg button").forEach(b => b.onclick = async () => {
  state.quranView = b.dataset.qv; save();
  if (state.quranView === "pron" || state.quranView === "both") { await ensurePron(); }
  renderVerses();
});
const _fc = document.getElementById("followChk");
if (_fc) _fc.onchange = () => { state.quranFollow = _fc.checked; save(); if (!state.quranFollow) stopFollow(); };
// (menu guard closed above)
document.getElementById("tasbihBtn").onclick = () => bumpTasbih(false);
document.getElementById("tasbihReset").onclick = () => { state.tasbih = 0; state.tasbihLoops = 0; save(); renderTasbih(); };
document.querySelectorAll("#tasbihModeSeg button").forEach(b => b.onclick = () => { state.tasbihMode = b.dataset.tm; save(); applyTasbihMode(); });
const _bstage = document.getElementById("beadStage");
if (_bstage) _bstage.onclick = () => bumpTasbih(true);
const _breset = document.getElementById("beadReset");
if (_breset) _breset.onclick = () => { state.tasbih = 0; state.tasbihLoops = 0; save(); renderTasbih(); renderBeads(false); };
applyTasbihMode();
document.getElementById("mosqueFind").onclick = () => findMosques();
document.getElementById("halalFind").onclick = () => findHalal();

// Weather via Open-Meteo (free, no key) for header
const WX_CODE = {0:"Clear",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Fog",51:"Drizzle",53:"Drizzle",55:"Drizzle",61:"Rain",63:"Rain",65:"Rain",71:"Snow",73:"Snow",75:"Snow",77:"Snow",80:"Showers",81:"Showers",82:"Showers",95:"Thunderstorm",96:"Storm",99:"Storm"};
const WX_CODE_TR = {0:"Açık",1:"Çoğunlukla açık",2:"Parçalı bulutlu",3:"Kapalı",45:"Sis",48:"Sis",51:"Çisenti",53:"Çisenti",55:"Çisenti",61:"Yağmur",63:"Yağmur",65:"Yağmur",71:"Kar",73:"Kar",75:"Kar",77:"Kar",80:"Sağanak",81:"Sağanak",82:"Sağanak",95:"Gök gürültüsü",96:"Fırtına",99:"Fırtına"};
const WX_ICON = {0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",48:"🌫️",51:"🌦️",53:"🌦️",55:"🌦️",61:"🌧️",63:"🌧️",65:"🌧️",71:"🌨️",73:"🌨️",75:"🌨️",77:"🌨️",80:"🌧️",81:"🌧️",82:"🌧️",95:"⛈️",96:"⛈️",99:"⛈️"};
let wxCache = { t: 0, html: "" };
async function loadWeather() {
  const el = document.getElementById("hdrWx");
  if (!el || !state.place) return;
  // cache 30 min
  if (Date.now() - wxCache.t < 18e5 && wxCache.html) { el.innerHTML = wxCache.html; return; }
  try {
    const { lat, lon } = state.place;
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto&forecast_days=1`);
    if (!r.ok) throw 0;
    const j = await r.json();
    const temp = Math.round(j.current.temperature_2m);
    const code = j.current.weather_code;
    const tr = state.lang === "tr";
    const cond = (tr ? WX_CODE_TR : WX_CODE)[code] || "";
    const icon = WX_ICON[code] || "";
    wxCache = { t: Date.now(), html: `<span class="wx-t">${icon} ${temp}°</span><span class="wx-c">${cond}</span>` };
    el.innerHTML = wxCache.html;
  } catch { /* leave placeholder */ }
}


// Vertical Kaaba view: when phone is held upright (not flat), show the
// Kaaba panorama instead of the compass. Pan it so the Kaaba centers
// when facing the Qibla direction.
let lastBeta = 0;
function checkTilt(beta) {
  lastBeta = beta == null ? lastBeta : beta;
  const cv = document.getElementById("compassView"), kv = document.getElementById("kaabaView");
  if (!cv || !kv) return;
  // beta ~0 = flat, ~90 = upright. Switch at 50°.
  const vertical = Math.abs(lastBeta) > 50;
  cv.classList.toggle("hidden", vertical);
  kv.classList.toggle("hidden", !vertical);
  if (vertical) panKaaba();
}
function panKaaba() {
  const img = document.getElementById("kaabaImg");
  if (!img || heading == null) return;
  const qp = qiblaPlace();
  const b = qiblaBearing(qp.lat, qp.lon);
  const diff = ((b - heading + 540) % 360) - 180; // -180..180, 0 = facing qibla
  // Image is ~3x wider than viewport; Kaaba at center. Shift so Kaaba
  // centers when diff=0, pans away as you turn.
  const maxShift = img.offsetWidth - img.parentElement.offsetWidth;
  const shift = Math.max(0, Math.min(maxShift, maxShift / 2 - (diff / 180) * (maxShift / 2)));
  img.style.transform = `translateX(${-shift}px)`;
  const kd = document.getElementById("kaabaDeg");
  if (kd) kd.textContent = `${Math.abs(diff).toFixed(0)}°`;
  const kt = document.getElementById("kaabaTurn");
  if (kt) kt.innerHTML = Math.abs(diff) < 6
    ? `<span class="turn-found">✓ ${t("facing")}</span>`
    : `<span class="turn-dir">${diff > 0 ? "→" : "←"}</span> <span class="turn-deg">${Math.abs(diff).toFixed(0)}°</span>`;
}

const bnavSet = document.getElementById("bnavSet");
if (bnavSet) bnavSet.onclick = () => { showTab("settings"); syncSetControls(); setShow(null); };
document.querySelectorAll("[data-goto]").forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  if (a.dataset.goto === "radio") { showTab("today"); setTimeout(() => { const el = $("radioSel"); if (el) el.closest(".panel").scrollIntoView({ block: "center" }); }, 80); return; }
  showTab(a.dataset.goto);
  window.scrollTo(0, 0);
}));
let compassOn = false, compassTimer = 0;
// Physical location for the Qibla compass (from GPS). The manual state.place
// may be a test location (e.g. Mardin) — the compass must use where the phone is.
let qiblaLoc = null;
function qiblaPlace() { return qiblaLoc || state.place; }
document.getElementById("compassBtn").onclick = async () => {
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") {
    try { if (await DeviceOrientationEvent.requestPermission() !== "granted") return; }
    catch (e) { return; }
  }
  if (compassOn) return; // already listening — don't stack listeners
  compassOn = true;
  // Use the phone's real GPS position for the compass — the manual state.place
  // may be a test location. Fall back to state.place if GPS is unavailable.
  if (navigator.geolocation) {
    try {
      const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000, maximumAge: 60000 }));
      const glat = pos.coords.latitude, glon = pos.coords.longitude;
      // Only use GPS if it meaningfully differs from the manual location (>1km).
      const dLat = Math.abs(glat - state.place.lat), dLon = Math.abs(glon - state.place.lon);
      if (dLat > 0.01 || dLon > 0.01) {
        qiblaLoc = { name: state.lang === "tr" ? "GPS konumu" : "GPS location", lat: glat, lon: glon };
        updateDeclination(glat, glon); // declination must match the physical location too
      }
    } catch (e) {}
  }
  let lastAbsMs = 0; // last time the absolute sensor fired
  const smooth = (prev, next) => {
    if (prev == null) return next;
    const delta = ((next - prev + 540) % 360) - 180;
    if (Math.abs(delta) < 2.0) return prev; // deadband: absorb sensor jitter
    return (prev + delta * 0.12 + 360) % 360; // gentle easing, no quiver
  };
  const onHeading = (ev, isAbsEvent) => {
    let next = null;
    const iosCompass = typeof ev.webkitCompassHeading === "number" && !Number.isNaN(ev.webkitCompassHeading);
    if (iosCompass) {
      next = ev.webkitCompassHeading; // iOS: true north directly, always authoritative
    } else {
      // Android: prefer the absolute sensor; ignore the plain one while
      // absolute is alive — two sensors disagreeing causes the quiver.
      if (!isAbsEvent && Date.now() - lastAbsMs < 2000) return;
      if (ev.alpha == null || Number.isNaN(ev.alpha)) return;
      const screenAngle = (screen.orientation && screen.orientation.angle) || Number(window.orientation) || 0;
      next = (360 - ev.alpha + screenAngle) % 360;
    }
    if (isAbsEvent) lastAbsMs = Date.now();
    next = ((next % 360) + 360) % 360;
    // Android magnetometer reads magnetic north; correct to true north.
    // iOS webkitCompassHeading already returns true north — skip it there.
    if (!iosCompass && typeof state.declination === 'number' && !isNaN(state.declination)) {
      next = ((next + state.declination + 360) % 360);
    }
    const h = smooth(heading, next);
    if (h !== heading) { heading = h; renderQibla(); if (typeof panKaaba === "function") panKaaba(); }
    if (typeof checkTilt === "function" && ev.beta != null) checkTilt(ev.beta);
  };
  // Listen to BOTH: some Android builds only fire one of them.
  window.addEventListener("deviceorientation", ev => onHeading(ev, false), true);
  window.addEventListener("deviceorientationabsolute", ev => onHeading(ev, true), true);
  clearTimeout(compassTimer);
  compassTimer = setTimeout(() => {
    if (heading == null) document.getElementById("qiblaTurn").textContent = t("compassUnavailable");
  }, 4000);
};
document.querySelectorAll(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m) m.classList.add("hidden"); }));

if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
applyI18n();
buildCompassDial();
refresh();
maybeShowApkNotice();
// Fetch magnetic declination for the saved location (cached in localStorage).
if (state.place && typeof state.place.lat === 'number') updateDeclination(state.place.lat, state.place.lon);
// prayer-card checkboxes use delegation (cards re-render every second)
const vg = document.getElementById("vaktGrid");
if (vg) vg.addEventListener("click", e => {
  const b = e.target.closest("[data-trk]");
  if (b) togglePrayer(b.dataset.trk);
});
setInterval(renderTimes, 1000);
