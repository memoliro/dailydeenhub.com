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
  [9, "Mohamed Siddiq al-Minshawi"],
  [2, "AbdulBaset AbdulSamad"]
];
const RECITER_PATHS = {
  7: "mishari_al_afasy/murattal",
  3: "abdurrahmaan_as_sudais/murattal",
  9: "siddiq_minshawi/murattal",
  2: "abdul_baset/murattal"
};
const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const SALAH = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const AYAH = [
  { ref: "Ar-Ra'd 13:28", ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", en: "Surely in the remembrance of Allah hearts find rest.", tr: "Kalpler ancak Allah’ı anmakla huzur bulur.", fr: "En vérité, c'est par l'évocation d'Allah que les cœurs s'apaisent." },
  { ref: "Al-Inshirah 94:6", ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "Indeed, with hardship comes ease.", tr: "Şüphesiz her güçlükle birlikte bir kolaylık vardır.", fr: "Certes, avec la difficulté vient la facilité." },
  { ref: "Al-Baqarah 2:186", ar: "فَإِنِّي قَرِيبٌ", en: "Indeed I am near.", tr: "Şüphesiz ben çok yakınım.", fr: "Je suis tout près." },
  { ref: "At-Tawbah 9:40", ar: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", en: "Do not grieve; indeed Allah is with us.", tr: "Üzülme, Allah bizimle beraberdir.", fr: "Ne t'attriste pas, Allah est avec nous." }
];
const I18N = {
  en: { kaabaHint: "Hold your phone upright and turn until the Kaaba is centered.", moreTitle: "More",
    home: "Home", tasbihTab: "Tasbih", findTab: "Find", settingsTab: "Settings", dualCal: "Dual calendar", resources: "Resources", articles: "Articles", articlesTitle: "About & FAQ", articlesSub: "How DailyDeenHub works, and answers to common questions.", aboutL: "About", privacyL: "Privacy", termsL: "Terms", openMap: "Open Qibla map", widgetLbl: "Widget", widgetNote: "Home-screen widgets come with the Android app — long-press your home screen, tap Widgets, then choose DailyDeenHub.", verseOfDay: "Verse of the Day", hadithOfDay: "Hadith of the Day", duaOfDay: "Dua of the Day", momentTitle: "A moment for today", momentSub: "Read, reflect, then share with someone you love.", momentLang: "Cards follow your selected language", asmaDay: "Asma-ul Husna", brand: "Daily Deen Hub", namesDay: "Names of the Day", namesSub: "Newborn name ideas", tileMosques: "Mosques", tileTasbih: "Tasbih", hisnul: "Hisnul Muslim", qadha: "Qadha prayers", khatm: "Khatms", khatmTitle: "Khatms", khatmSub: "Track your Quran completions, Juz by Juz. Tap a Juz to mark it read.", khatmNew: "+ New khatm", khatmNamePh: "Khatm name\u2026", khatmDelete: "Delete", khatmDelConfirm: "Delete this khatm?", khatmDone: "Khatm complete! \uD83C\uDF89 May Allah accept it.", khatmDefault: "My Khatm", khatmJuz: "Juz", qvNone: "None", qvTrans: "Translation", qvPron: "Pronunciation", qvBoth: "Both", qvMushaf: "Mushaf", juzLbl: "Juz", verseSearchPh: "Search verses\u2026", voiceTile: "Voice search", libraryTile: "Library", libraryTitle: "Library", librarySub: "In-app books open instantly; external links open trusted free libraries.", vmPlay: "Play verse", vmPause: "Pause", vmOpen: "Open in reader", voiceWinTitle: "Find a recited verse", voiceTapToStart: "Tap the microphone and recite", voiceLangName: "Arabic (Saudi Arabia)", vPlayFrom: "Play from here", vPlayOne: "Play this verse", voiceBtn: "Find a recited verse", voiceListening: "Listening\u2026 recite the verse", voiceUnsupported: "Voice search needs Chrome on Android", voiceMicDenied: "Microphone is blocked \u2014 allow it to use voice search", voiceNoSpeech: "Didn't catch that \u2014 please try again", voiceError: "Voice search failed \u2014 please try again", voiceNote: "Recite a verse and we'll find it \u2014 your voice is transcribed by Google's speech service.", followLbl: "Shade verses", tmClassic: "Classic", tmBeads: "Beads", beadTap: "Tap anywhere — each tap moves one bead", monthTab: "Month", qiblaTab: "Qibla", quranTab: "Quran", quranResume: "Continue listening / reading",
    monthTitle: "This month", thisMonth: "This month", ramadan: "Ramadan", nextRamadan: "Next Ramadan", prevMonth: "Previous month", nextMonth: "Next month",
    ramadanNote: "It is not Ramadan now. This is the next Ramadan timetable.",
    radioTitle: "Quran radio", radioPlay: "Listen", radioStop: "Stop",
    thDate: "Date",
    fajr: "Fajr", sun: "Sunrise", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha",
    ayahTitle: "A verse for the day", compass: "Use compass", mapTitle: "Qibla map",
    mapBody: "Drag the map. The curve is the great-circle path to the Kaaba, and it redraws from the center.",
    quranTitle: "Quran", play: "Play", pause: "Pause", tasbihTitle: "Tasbih", tap: "Tap anywhere to count", reset: "Reset",
    trackerTitle: "Today's prayers", streak: "day streak", streaks: "day streak", done: "done", markDone: "Tap a prayer to mark it done",
    cardHint: "Tap the ✓ on a card once you've prayed it",
    congrats: "Congratulations! May Allah accept your prayers.",
    ramadanHub: "Ramadan", suhoorIn: "Suhoor in", iftarIn: "Iftar in", fasting: "Fasting now",
    mosquesTab: "Find", mosquesTitle: "Find nearby", mosquesSub: "Mosques and halal restaurants near you, from OpenStreetMap.",
    mosquesFind: "Find mosques near me", mosquesLoading: "Searching…", mosquesNone: "No mosques found within 20 km.", mosquesError: "Could not load mosques.",
    mosquesRetrying: "Retrying…", tryAgain: "Try again", finderCached: "Showing saved results — the map server couldn't be reached.",
    halalFind: "Find halal restaurants near me", halalNone: "No halal restaurants found within 20 km.", marketFind: "Find halal markets/butchers near me", marketNone: "No halal markets found within 20 km.", mqSuggest: "Missing a place? Suggest it to us →", mqFavTitle: "★ Favorites", addMosque: "Add mosque", addPrayer: "Add prayer room",
    mqMosqueTmpl: "🕌 New mosque suggestion\nPlace name: \nAddress: \nNotes (prayer times, Jumu'ah, parking…):",
    mqPrayerTmpl: "🛐 New prayer room suggestion\nPlace name (e.g. the mall, airport terminal, university building): \nLocation description — for people unfamiliar with this place (which floor, near what, how to find it): \nNotes (open hours, wudu facilities…):",
    footTag: "Free prayer times, qibla, Quran and more. No account, no ads.",
    footFeatures: "Features", footResources: "Resources", footFreeTools: "Free tools",
    paidNote: "(paid · no account needed)",
    supportUs: "Support us",
    apkNoticeTitle: "Welcome to the new app! 🎉",
    apkNoticeBody: "If you still have the old DailyDeenHub icon on your home screen, long-press it and uninstall it — this new app replaces it.",
    apkNoticeOk: "Got it",
    adhanAtTime: "Play adhan at prayer time", adhanNote: "Plays the full adhan when the tab is open.",
    focusTitle: "No ads", placeTitle: "Place", gps: "Use my location", close: "Close", setTitle: "Settings", setLoc: "Location", setCalc: "Prayer Calculation", setRemind: "Reminders", setAppear: "Language", setNotif: "Notifications", locNote: "Choose your city for accurate prayer times.", changeCity: "Change city", langLbl: "Language", vibLbl: "Vibration",
    method: "Calculation method", madhab: "Asr madhab", notify: "Notify while the App is open", done: "Done", savedMsg: "Settings saved",
    searchPh: "Search a city", surahPh: "Find a surah", menuAbout: "About", comingSoon: "Coming soon", learnTile: "Learning", learnTitle: "Learning Center", learnSub: "Step-by-step guides, daily duas and the essentials of the faith.", learnBack: "Back", hisnulTitle: "Hisnul Muslim",
    qadhaTitle: "Qadha Prayers", qadhaSub: "Missed a prayer? Log it here, then mark each one as you make it up.",
    qadhaOwed: "prayers to make up", qadhaCaughtUp: "All caught up — nothing owed.",
    qadhaRakats: "rakats", qadhaMadeUp: "Made up one", qadhaMissed: "Missed one", qadhaMissDay: "+ Missed a full day",
    qadhaRecent: "Recent activity", qadhaMadeUpLog: "made up", qadhaMissedLog: "missed", qadhaFullDay: "Full day",
    qadhaNow: "just now", qadhaMinAgo: "min ago", qadhaHrsAgo: "h ago", qadhaDaysAgo: "d ago",
    qadhaRamadanNote: "Fasting too? Track your Ramadan fasts the same way \u2192",
    resTitle: "Kutub al-Sittah", resSub: "The six canonical hadith collections.", resHadith: "hadith", hdBack: "Books", hdBackCh: "Chapters", hdChapters: "chapters", hdSearchPh: "Search all hadith\u2026", hdLoading: "Downloading the book\u2026 (one time only)", hdContinue: "Continue reading", hdNoRes: "No hadith found for this search.", hdResults: "results", hdGeneralNote: "The source data did not specify a chapter for these hadith.", hdRetry: "Try again", hdLangBoth: "AR + EN", hdLangAr: "\u0639\u0631\u0628\u064a", hdLangEn: "EN", hdDlBtn: "Download", hdDlLater: "Not now", resSearchPh: "Search all six books\u2026", resSearching: "Searching downloaded books\u2026", resNoRes: "No results found.", resDlToSearch: "Download a book to include it in search", hdDlOnce: "downloaded once to your device. Read anytime, even offline.", hdAttrAr: "Arabic text: public domain", hdAttrEn: "English translation", 
    ramTimes: "Prayer times", ramFasts: "My fasts", fastDay: "Day", fastOwed: "fasts to make up",
    fastCaughtUp: "Nothing owed — all fasts accounted for.", fastProgress: "fasted",
    fastFasted: "Fasted", fastMissed: "Missed", fastMadeUp: "Made up",
    fastRecent: "Recent activity", fastFastedLog: "fasted", fastMissedLog: "missed", fastMadeUpLog: "made up", hisnulSub: "Authentic daily duas — Arabic, transliteration and translation.", dayYesterday: "Yesterday", dayTomorrow: "Tomorrow", dayToday: "Today", learnSupportTx: "DailyDeenHub is free and always will be. If these lessons helped you, consider supporting the project.",
    remindBefore: "Minutes before prayer", atTimeOpt: "At prayer time", minBefore: "min before",
    extraRem: "Extra reminders", extraSub: "Wake-up and fasting reminders, anchored to prayer times.",
    holyDays: "Holy days", holyDaysSub: "Islamic holy days and kandil nights.", holyDaysNote: "Dates follow Diyanet's calculation (Türkiye). Your local mosque may observe them a day earlier or later — especially Ramadan and the Eids, which depend on moon sighting.", holyDaysNext: "Next", holyDaysInDays: "days left", holyDaysToday: "today", holyDaysTomorrow: "tomorrow",
    cardsTile: "Greeting cards", greetTitle: "Ready-made greetings — tap share to send", cardsSub: "Pick a background, write your message, share it with loved ones.", cardsPickBg: "Choose a background", cardsTapType: "Tap to write…", cardsMnuBg: "Background", cardsMnuText: "Text", cardsMnuAdj: "Adjust", cardsBright: "Brightness", cardsBlur: "Blur", cardsYourMsg: "Your message", cardsMsgPh: "Write your message…", cardsFont: "Font", cardsSize: "Size", cardsColor: "Color", cardsPos: "Position", cardsTop: "Top", cardsMid: "Middle", cardsBot: "Bottom", cardsShare: "Share", cardsDownload: "Save", cardsBack: "← Backgrounds", cardsForDay: "Make a card for", cardsSugg: "Suggestions", cardsShared: "Card shared!", cardsSaved: "Card saved to your device.", cardsShareFail: "Sharing isn't supported here — the card was saved instead.",
    extraHonest: "These are reminders, not alarms — notifications are best-effort, especially with the tab closed. Keep a phone alarm for sahur.",
    xSahur: "Sahur", xTahajjud: "Tahajjud", xFast: "Mon / Thu fast", xJumuah: "Jumu'ah",
    xBeforeFajr: "before Fajr", xBeforeDhuhr: "before Dhuhr (Friday)",
    xFastEve: "Nudge the evening before (9 PM)", xFastEveTitle: "Fast tomorrow",
    pushLbl: "Prayer alerts (even when the app is closed)", langSystem: "System", watchLive: "Watch Live", feedback: "Feedback", fbTitle: "Feedback & requests", fbSub: "Tell us what you think — report a problem, request a feature, or suggest an improvement. Your message goes straight to the developer.", fbType: "Type", fbOptFeedback: "Feedback", fbOptProblem: "Report a problem", fbOptRequest: "Feature request", fbOptSuggestion: "Suggestion", fbMsg: "Your message", fbMsgPh: "Write your message…", fbName: "Name (optional)", fbEmail: "Email (optional — only if you want a reply)", fbSend: "Send feedback", fbSending: "Sending…", fbThanks: "Thank you! Your message was sent.", fbError: "Something went wrong — please try again.", fbEmpty: "Please write a message first.", liveTitle: "Watch Live", liveSub: "Live broadcasts from the two holy mosques, via the official Saudi Quran TV and Sunnah TV channels.", liveHaram: "Masjid al-Haram — Makkah", liveNabawi: "Masjid an-Nabawi — Madinah", liveBadge: "● LIVE", liveYt: "Watch on YouTube",
    pushOn: "Alerts on — you'll be notified even with the app closed.",
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
    soundCustom: "Custom", soundSystem: "System default", soundSystemPreview: "System sound preview",
    soundSystemNeedNotif: "Turn on Notifications to hear the system sound", uploadLbl: "Upload custom sound",
    uploadNote: "On iPhone, tapping Upload may ask for photo access — the app never sees your photos; choose Files to pick an audio file.",
    inMinutes: "{n} min left", timeNow: "time",
    soundTooBig: "File too large (max 1.5 MB)", soundSaved: "Custom sound saved",
    terms: "Terms", privacy: "Privacy",
    methodNote: "Times are calculated, not an official mosque feed. Diyanet suits Turkey; ISNA is the Montreal default.",
    names: { Fajr: "Fajr", Sunrise: "Sunrise", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha", Witr: "Witr" },
    remaining: "remaining", at: "at", passed: "passed",
    kerahat: "Discouraged time — the sun is rising, at its peak, or setting.",
    qiblaHint: "The Kaaba mark sits on the great-circle bearing, measured from true north.",
    compassUnavailable: "Compass not available on this device — please use the map below.",
    howBody: "The small Kaaba is fixed on the verified bearing. Turn until it meets the gold arrow at the top. Phone compasses are magnetic and can be off by a few degrees near metal.",
    tasbihNote: "33 Subhanallah, 33 Alhamdulillah, 34 Allahu akbar. Saved on this device.",
    focusBody: "Prayer times, qibla, the month, and a Quran reader. No accounts, no ads, no tracking.",
    footer: "Times from the Aladhan engine. Quran text and audio from Quran.com. A local mosque may differ by a minute.",
    loading: "Loading times…", noResults: "No matches.", searching: "Searching…", gpsFail: "Location unavailable.",
    left: "left", right: "right", facing: "You are facing qibla.", loadFail: "Could not load times.", audioFail: "Could not play audio."
  },
  tr: { kaabaHint: "Telefonunuzu dik tutun ve Kâbe ortalanana kadar dönün.", moreTitle: "Daha fazla",
    home: "Ana Sayfa", tasbihTab: "Tesbih", findTab: "Bul", settingsTab: "Ayarlar", dualCal: "Çift takvim", resources: "Kaynaklar", articles: "Makaleler", articlesTitle: "Hakk\u0131nda & SSS", articlesSub: "DailyDeenHub nas\u0131l \u00e7al\u0131\u015f\u0131r ve s\u0131k sorulan sorular\u0131n yan\u0131tlar\u0131.", aboutL: "Hakkında", privacyL: "Gizlilik", termsL: "Şartlar", openMap: "Kıble haritasını aç", widgetLbl: "Widget", widgetNote: "Ana ekran widget'ları Android uygulaması ile gelir — ana ekrana uzun basın, Widget'ler\u2019e dokunun ve DailyDeenHub\u2019ı seçin.", verseOfDay: "Günün Ayeti", hadithOfDay: "Günün Hadisi", duaOfDay: "Günün Duası", momentTitle: "Bugün için bir an", momentSub: "Oku, tefekkür et, sonra sevdiğin biriyle paylaş.", momentLang: "Kartlar seçtiğin dili takip eder", asmaDay: "Esma-ül Hüsna", brand: "Günlük Din Merkezi", namesDay: "Günün İsimleri", namesSub: "Yenidoğan isim önerileri", tileMosques: "Camiler", tileTasbih: "Tesbih", hisnul: "Hisnul Muslim", qadha: "Kaza namazı", khatm: "Hatimler", khatmTitle: "Hatimler", khatmSub: "Kur'an hatimlerinizi c\u00fcz c\u00fcz takip edin. Okudu\u011funuz c\u00fcze dokunun.", khatmNew: "+ Yeni hatim", khatmNamePh: "Hatim ad\u0131\u2026", khatmDelete: "Sil", khatmDelConfirm: "Bu hatim silinsin mi?", khatmDone: "Hatim tamamland\u0131! \uD83C\uDF89 Allah kabul etsin.", khatmDefault: "Hatmim", khatmJuz: "C\u00fcz", qvNone: "Sade", qvTrans: "Meal", qvPron: "Okunuş", qvBoth: "İkisi", qvMushaf: "Mushaf", juzLbl: "Cüz", verseSearchPh: "Ayetlerde ara\u2026", voiceTile: "Sesli arama", libraryTile: "K\u00fcthane", libraryTitle: "K\u00fcthane", librarySub: "Uygulama i\u00e7i kitaplar an\u0131nda a\u00e7\u0131l\u0131r; d\u0131\u015f ba\u011flant\u0131lar g\u00fcvenilir \u00fccretsiz k\u00fct\u00fcphanelere gider.", vmPlay: "Ayeti dinle", vmPause: "Duraklat", vmOpen: "Okuyucuda a\u00e7", voiceWinTitle: "Okunan Ayeti Bul", voiceTapToStart: "Mikrofona dokunun ve okuyun", voiceLangName: "Arap\u00e7a (Suudi Arabistan)", vPlayFrom: "Buradan başla", vPlayOne: "Bu ayeti dinle", voiceBtn: "Okunan ayeti bul", voiceListening: "Dinleniyor\u2026 ayeti okuyun", voiceUnsupported: "Sesli arama i\u00e7in Android'de Chrome gerekli", voiceMicDenied: "Mikrofon engelli \u2014 sesli arama i\u00e7in izin verin", voiceNoSpeech: "Anla\u015f\u0131lmad\u0131 \u2014 l\u00fctfen tekrar deneyin", voiceError: "Sesli arama ba\u015far\u0131s\u0131z \u2014 l\u00fctfen tekrar deneyin", voiceNote: "Bir ayet okuyun, bulal\u0131m \u2014 sesiniz Google'\u0131n konu\u015fma servisiyle yaz\u0131ya \u00e7evrilir.", followLbl: "Ayetleri g\u00f6lgelendir", tmClassic: "Klasik", tmBeads: "Tesbih", beadTap: "Her yere dokunun — her dokunuş bir boncuk ilerletir", monthTab: "Ay", qiblaTab: "Kıble", quranTab: "Kur'an", quranResume: "Dinlemeye / Okumaya devam et",
    monthTitle: "Bu ay", thisMonth: "Bu ay", ramadan: "Ramazan", nextRamadan: "Sonraki Ramazan", prevMonth: "Önceki ay", nextMonth: "Sonraki ay",
    ramadanNote: "Şu an Ramazan değil. Bu, sonraki Ramazan imsakiyesidir.",
    radioTitle: "Kur'an radyosu", radioPlay: "Dinle", radioStop: "Durdur",
    thDate: "Tarih",
    fajr: "İmsak", sun: "Güneş", dhuhr: "Öğle", asr: "İkindi", maghrib: "Akşam", isha: "Yatsı",
    ayahTitle: "Günün ayeti", compass: "Pusulayı aç", mapTitle: "Kıble haritası",
    mapBody: "Haritayı kaydırın. Eğri, Kâbe’ye giden büyük daire yoludur ve merkezden yeniden çizilir.",
    quranTitle: "Kur'an", play: "Oynat", pause: "Durdur", tasbihTitle: "Tesbih", tap: "Saymak için her yere dokunun", reset: "Sıfırla",
    trackerTitle: "Bugünkü namazlar", streak: "günlük seri", streaks: "günlük seri", done: "tamam", savedMsg: "Ayarlar kaydedildi", markDone: "Tamamlanan namaza dokun",
    cardHint: "Kıldığınız namazın kartındaki ✓'ye dokunun",
    congrats: "Tebrikler! Allah ibadetlerinizi kabul etsin.",
    ramadanHub: "Ramazan", suhoorIn: "Sahura", iftarIn: "İftara", fasting: "Oruçlusun",
    mosquesTab: "Bul", mosquesTitle: "Yakında bul", mosquesSub: "Yakındaki camiler ve helal restoranlar, OpenStreetMap'ten.",
    mosquesFind: "Yakınımdaki camileri bul", mosquesLoading: "Aranıyor…", mosquesNone: "20 km içinde cami bulunamadı.", mosquesError: "Camiler yüklenemedi.",
    mosquesRetrying: "Tekrar deneniyor…", tryAgain: "Tekrar dene", finderCached: "Kaydedilmiş sonuçlar gösteriliyor — harita sunucusuna ulaşılamadı.",
    halalFind: "Yakınımdaki helal restoranları bul", halalNone: "20 km içinde helal restoran bulunamadı.", marketFind: "Yakınımdaki helal market/kasapları bul", marketNone: "20 km içinde helal market bulunamadı.", mqSuggest: "Eksik bir yer mi var? Bize önerin →", mqFavTitle: "★ Favoriler", addMosque: "Cami ekle", addPrayer: "Namaz odası ekle",
    mqMosqueTmpl: "🕌 Yeni cami önerisi\nYer adı: \nAdres: \nNotlar (namaz vakitleri, Cuma, otopark…):",
    mqPrayerTmpl: "🛐 Yeni namaz odası önerisi\nYer adı (örn. AVM, havaalanı terminali, üniversite binası): \nKonum tarifi — burayı bilmeyenler için (kaçıncı kat, neyin yanında, nasıl bulunur?): \nNotlar (açık saatler, abdest imkânı…):",
    footTag: "Ücretsiz namaz vakitleri, kıble, Kur'an ve daha fazlası. Hesap yok, reklam yok.",
    footFeatures: "Özellikler", footResources: "Kaynaklar", footFreeTools: "Ücretsiz araçlar",
    paidNote: "(ücretli · hesap gerekmez)",
    supportUs: "Bize destek ol",
    apkNoticeTitle: "Yeni uygulamaya hoş geldin! 🎉",
    apkNoticeBody: "Ana ekranında eski Günlük Din Merkezi simgesi duruyorsa, üzerine uzun basıp kaldır — bu yeni uygulama onun yerini alıyor.",
    apkNoticeOk: "Anladım",
    adhanAtTime: "Namaz vaktinde ezan çal", adhanNote: "Sekme açıkken vakit girince ezan çalar.",
    focusTitle: "Reklamsız", placeTitle: "Yer", gps: "Konumumu kullan", close: "Kapat", setTitle: "Ayarlar", setLoc: "Konum", setCalc: "Namaz Hesaplama", setRemind: "Hatırlatıcılar", setAppear: "Dil", setNotif: "Bildirimler", locNote: "Doğru namaz vakitleri için şehrinizi seçin.", changeCity: "Şehir değiştir", langLbl: "Dil", vibLbl: "Titreşim",
    method: "Hesap yöntemi", madhab: "İkindi mezhebi", notify: "Uygulama açıkken haber ver", done: "Tamam",
    searchPh: "Şehir ara", surahPh: "Sure ara", menuAbout: "Hakkında", comingSoon: "Yakında", learnTile: "Öğren", learnTitle: "Öğrenme Merkezi", learnSub: "Adım adım rehberler, günlük dualar ve dinin esasları.", learnBack: "Geri", hisnulTitle: "Hisnül Müslim",
    qadhaTitle: "Kaza Namazları", qadhaSub: "Kaçırdığın namazı buraya kaydet, kıldıkça işaretle.",
    qadhaOwed: "kılınacak namaz", qadhaCaughtUp: "Hepsi tamam — borç namaz yok.",
    qadhaRakats: "rekat", qadhaMadeUp: "Birini kıldım", qadhaMissed: "Birini kaçırdım", qadhaMissDay: "+ Koskoca bir gün kaçırdım",
    qadhaRecent: "Son hareketler", qadhaMadeUpLog: "kılındı", qadhaMissedLog: "kaçırıldı", qadhaFullDay: "Tüm gün",
    qadhaNow: "az önce", qadhaMinAgo: "dk önce", qadhaHrsAgo: "sa önce", qadhaDaysAgo: "gün önce",
    qadhaRamadanNote: "Oru\u00e7 da tutuyor musun? Ramazan oru\u00e7lar\u0131n\u0131 da ayn\u0131 \u015fekilde takip et \u2192",
    resTitle: "K\u00fct\u00fcb-i Sitte", resSub: "Alt\u0131 sahih hadis kitab\u0131.", resHadith: "hadis", hdBack: "Kitaplar", hdBackCh: "B\u00f6l\u00fcmler", hdChapters: "b\u00f6l\u00fcm", hdSearchPh: "T\u00fcm hadislerde ara\u2026", hdLoading: "Kitap indiriliyor\u2026 (yaln\u0131zca bir kez)", hdContinue: "Okumaya devam et", hdNoRes: "Bu aramada hadis bulunamad\u0131.", hdResults: "sonu\u00e7", hdGeneralNote: "Kaynak veride bu hadislerin b\u00f6l\u00fcm\u00fc belirtilmemi\u015f.", hdRetry: "Tekrar dene", hdLangBoth: "AR + EN", hdLangAr: "\u0639\u0631\u0628\u064a", hdLangEn: "EN", hdDlBtn: "\u0130ndir", hdDlLater: "\u015eimdi de\u011fil", resSearchPh: "Alt\u0131 kitapta ara\u2026", resSearching: "\u0130ndirilen kitaplarda aran\u0131yor\u2026", resNoRes: "Sonu\u00e7 bulunamad\u0131.", resDlToSearch: "Aramaya dahil etmek i\u00e7in kitap indir", hdDlOnce: "cihaz\u0131na bir kez indirilir. \u00c7evrimd\u0131\u015f\u0131yken bile diledi\u011fin zaman oku.", hdAttrAr: "Arap\u00e7a metin: kamu mal\u0131", hdAttrEn: "\u0130ngilizce \u00e7eviri", 
    ramTimes: "Vakitler", ramFasts: "Oruçlarım", fastDay: "Gün", fastOwed: "kaza orucu",
    fastCaughtUp: "Borç yok — tüm oruçlar tamam.", fastProgress: "tutuldu",
    fastFasted: "Tuttum", fastMissed: "Kaçırdım", fastMadeUp: "Kaza ettim",
    fastRecent: "Son hareketler", fastFastedLog: "tutuldu", fastMissedLog: "kaçırıldı", fastMadeUpLog: "kaza edildi", hisnulSub: "Sahih günlük dualar — Arapça, okunuş ve meal.", dayYesterday: "Dün", dayTomorrow: "Yarın", dayToday: "Bugün", learnSupportTx: "DailyDeenHub \u00fccretsizdir ve hep \u00f6yle kalacak. Bu dersler size faydal\u0131 olduysa projeyi desteklemeyi d\u00fc\u015f\u00fcn\u00fcn.",
    remindBefore: "Namazdan önce (dakika)", atTimeOpt: "Vakit girince", minBefore: "dk önce",
    extraRem: "Ek hatırlatıcılar", extraSub: "Namaz vakitlerine bağlı uyandırma ve oruç hatırlatıcıları.",
    holyDays: "Dini günler", holyDaysSub: "Dini günler ve kandil geceleri.", holyDaysNote: "Tarihler Diyanet'in hesaplamasına göredir (Türkiye). Bulunduğunuz yerdeki camiler, özellikle hilal gözlemine bağlı Ramazan ve bayramları bir gün önce veya sonra idrak edebilir.", holyDaysNext: "Sıradaki", holyDaysInDays: "gün kaldı", holyDaysToday: "bugün", holyDaysTomorrow: "yarın",
    cardsTile: "Tebrik kartları", greetTitle: "Hazır tebrikler — paylaşmak için dokunun", cardsSub: "Bir arka plan seçin, mesajınızı yazın, sevdiklerinizle paylaşın.", cardsPickBg: "Arka plan seçin", cardsTapType: "Yazmak için dokunun…", cardsMnuBg: "Arka plan", cardsMnuText: "Yazı", cardsMnuAdj: "Ayarla", cardsBright: "Parlaklık", cardsBlur: "Buğu", cardsYourMsg: "Mesajınız", cardsMsgPh: "Mesajınızı yazın…", cardsFont: "Yazı tipi", cardsSize: "Boyut", cardsColor: "Renk", cardsPos: "Konum", cardsTop: "Üst", cardsMid: "Orta", cardsBot: "Alt", cardsShare: "Paylaş", cardsDownload: "Kaydet", cardsBack: "← Arka planlar", cardsForDay: "Kart hazırla:", cardsSugg: "Öneriler", cardsShared: "Kart paylaşıldı!", cardsSaved: "Kart cihazınıza kaydedildi.", cardsShareFail: "Paylaşım burada desteklenmiyor — kart kaydedildi.",
    extraHonest: "Bunlar hatırlatıcıdır, alarm değil — özellikle sekme kapalıyken bildirimler her zaman ulaşmayabilir. Sahur için telefon alarmı kurun.",
    xSahur: "Sahur", xTahajjud: "Teheccüd", xFast: "Pzt / Per orucu", xJumuah: "Cuma namazı",
    xBeforeFajr: "İmsak'tan önce", xBeforeDhuhr: "öğleden önce (cuma)",
    xFastEve: "Bir gün önce akşam hatırlat (21.00)", xFastEveTitle: "Yarın oruç",
    pushLbl: "Namaz uyarıları (uygulama kapalıyken bile)", langSystem: "Sistem", watchLive: "Canlı İzle", feedback: "Geri Bildirim", fbTitle: "Geri bildirim ve istekler", fbSub: "Düşüncelerinizi söyleyin — bir sorun bildirin, özellik isteyin veya iyileştirme önerin. Mesajınız doğrudan geliştiriciye gider.", fbType: "Tür", fbOptFeedback: "Geri bildirim", fbOptProblem: "Sorun bildir", fbOptRequest: "Özellik isteği", fbOptSuggestion: "Öneri", fbMsg: "Mesajınız", fbMsgPh: "Mesajınızı yazın…", fbName: "İsim (isteğe bağlı)", fbEmail: "E-posta (isteğe bağlı — yalnızca yanıt isterseniz)", fbSend: "Gönder", fbSending: "Gönderiliyor…", fbThanks: "Teşekkürler! Mesajınız gönderildi.", fbError: "Bir şeyler ters gitti — lütfen tekrar deneyin.", fbEmpty: "Lütfen önce bir mesaj yazın.", liveTitle: "Canlı İzle", liveSub: "İki kutsal mescidden canlı yayınlar — resmi Suudi Kur'an TV ve Sünnet TV kanallarından.", liveHaram: "Mescid-i Haram — Mekke", liveNabawi: "Mescid-i Nebevi — Medine", liveBadge: "● CANLI", liveYt: "YouTube'da izle",
    pushOn: "Uyarılar açık — uygulama kapalıyken bile bildirim alırsınız.",
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
    soundCustom: "Özel", soundSystem: "Sistem varsayılanı", soundSystemPreview: "Sistem sesi önizlemesi",
    soundSystemNeedNotif: "Sistem sesini duymak için Bildirimleri açın", uploadLbl: "Özel ses yükle",
    uploadNote: "iPhone'da Yükle'ye dokununca fotoğraf erişimi istenebilir — uygulama fotoğraflarınızı asla görmez; ses dosyası seçmek için Dosyalar'ı seçin.",
    inMinutes: "{n} dk kaldı", timeNow: "vakti",
    soundTooBig: "Dosya çok büyük (en fazla 1,5 MB)", soundSaved: "Özel ses kaydedildi",
    terms: "Kullanım Şartları", privacy: "Gizlilik",
    methodNote: "Vakitler hesaplanır, resmi cami ilanı değildir. Türkiye için Diyanet, Montreal varsayılanı ISNA.",
    names: { Fajr: "İmsak", Sunrise: "Güneş", Dhuhr: "Öğle", Asr: "İkindi", Maghrib: "Akşam", Isha: "Yatsı", Witr: "Vitir" },
    remaining: "kaldı", at: "saat", passed: "geçti",
    kerahat: "Kerahat — güneş doğuyor, tepede, ya da batıyor.",
    qiblaHint: "Kâbe işareti, gerçek kuzeye göre büyük daire açısındadır.",
    howBody: "Küçük Kâbe, doğrulanmış açıdadır. Üstteki altın okla buluşana kadar dönün. Telefon pusulası manyetiktir; metal yanında birkaç derece kayabilir.",
    tasbihNote: "33 Sübhanallah, 33 Elhamdülillah, 34 Allahu ekber. Bu cihazda saklanır.",
    focusBody: "Namaz vakitleri, kıble, aylık tablo ve Kur’an okuyucu. Hesap yok, reklam yok, takip yok.",
    footer: "Vakitler Aladhan motorundan. Kur’an metni ve ses Quran.com üzerinden. Yerel cami bir dakika farklı olabilir.",
    loading: "Vakitler yükleniyor…", noResults: "Sonuç yok.", searching: "Aranıyor…", gpsFail: "Konum alınamadı.",
    compassUnavailable: "Bu cihazda pusula yok — lütfen aşağıdaki haritayı kullanın.",
    left: "sol", right: "sağ", facing: "Kıbleye dönüksünüz.", loadFail: "Vakitler alınamadı.", audioFail: "Ses açılamadı."
  },
  fr: {
    monthTitle: "Ce mois-ci",
    ramadanNote: "Ce n'est pas le Ramadan en ce moment. Voici l'horaire du prochain Ramadan.",
    radioTitle: "Radio Coran",
    thDate: "Date",
    fajr: "Fajr",
    ayahTitle: "Verset du jour",
    mapBody: "Glissez la carte. La courbe montre le chemin le plus court vers la Kaaba, recalculé depuis le centre.",
    quranTitle: "Coran",
    trackerTitle: "Prières d'aujourd'hui",
    cardHint: "Touchez le ✓ d'une carte après avoir prié",
    congrats: "Félicitations ! Qu'Allah accepte vos prières.",
    ramadanHub: "Ramadan",
    mosquesTab: "Recherche",
    mosquesFind: "Trouver une mosquée près de moi",
    mosquesRetrying: "Nouvelle tentative…", tryAgain: "Réessayer",
    halalFind: "Trouver un restaurant halal près de moi",
    mqMosqueTmpl: "🕌 Nouvelle suggestion de mosquée\nNom du lieu : \nAdresse : \nNotes (horaires des prières, Joumou'a, stationnement…) :",
    mqPrayerTmpl: "🛐 Nouvelle suggestion de salle de prière\nNom du lieu (p. ex. centre commercial, aéroport, bâtiment universitaire) : \nDescription de l'emplacement — pour les personnes qui ne connaissent pas l'endroit (quel étage, près de quoi, comment y aller) : \nNotes (heures d'ouverture, ablutions…) :",
    footTag: "Horaires des prières gratuits, qibla, Coran et plus. Sans compte, sans pub.",
    footFeatures: "Fonctionnalités",
    paidNote: "(payant · sans compte)",
    supportUs: "Nous soutenir",
    apkNoticeTitle: "Bienvenue dans la nouvelle app ! 🎉",
    apkNoticeBody: "Si l'ancienne icône DailyDeenHub est encore sur votre écran d'accueil, appuyez dessus longuement et désinstallez-la — cette nouvelle app la remplace.",
    apkNoticeOk: "Compris",
    adhanAtTime: "Jouer l'adhan à l'heure de la prière",
    focusTitle: "Sans pub",
    method: "Méthode de calcul",
    searchPh: "Rechercher une ville",
    qadhaTitle: "Prières qada",
    qadhaOwed: "prières à rattraper",
    qadhaRakats: "rakats",
    qadhaRecent: "Activité récente",
    qadhaNow: "à l'instant",
    qadhaRamadanNote: "Vous jeûnez aussi ? Suivez vos jeûnes du Ramadan de la même façon →",
    resTitle: "Kutub al-Sittah",
    ramTimes: "Horaires des prières",
    fastCaughtUp: "Rien à rattraper — tous les jeûnes sont comptabilisés.",
    fastFasted: "Jeûné",
    fastRecent: "Activité récente",
    remindBefore: "Minutes avant la prière",
    extraRem: "Rappels supplémentaires",
    holyDays: "Jours saints",
    cardsTile: "Cartes de vœux",
    extraHonest: "Ce sont des rappels, pas des alarmes — les notifications ne sont pas garanties, surtout quand l'app est fermée. Gardez une alarme de téléphone pour le sahur.",
    xSahur: "Sahur",
    xBeforeFajr: "avant le Fajr",
    xFastEve: "Rappel la veille au soir (21 h)",
    pushLbl: "Alertes de prière (même quand l'app est fermée)",
    pushOn: "Alertes activées — vous recevrez des notifications même si l'app est fermée.",
    pushOff: "Alertes désactivées.",
    pushError: "Impossible d'activer les alertes. Réessayez.",
    pushBlocked: "Les notifications sont bloquées pour ce site — autorisez-les dans les paramètres de votre navigateur.",
    pushUnsupported: "Les alertes push ne sont pas prises en charge par ce navigateur.",
    pushEnabled: "Alertes de prière activées",
    installHint: "📲 Installez l'app sur votre appareil pour des alertes fiables.",
    installBtn: "Installer l'app",
    installIOS: "📲 Les alertes sur iPhone nécessitent l'app installée — ça prend 10 secondes :<br><span class=\\\"steps\\\">1.</span> Touchez <b>Partager</b> dans ce navigateur<br><span class=\\\"steps\\\">2.</span> Touchez <b>« Sur l'écran d'accueil »</b><br><span class=\\\"steps\\\">3.</span> Ouvrez DailyDeenHub depuis votre écran d'accueil — les alertes y fonctionneront.",
    installPopTitle: "Installer DailyDeenHub",
    installPopBody: "Recevez des alertes de prière même quand votre navigateur est fermé. Gratuit, rapide, sans compte.",
    installPopLater: "Plus tard",
    soundLbl: "Son d'alerte",
    soundAdhan: "Adhan (appel à la prière)",
    soundMobile: "Alerte mobile",
    soundChick: "Poussin",
    soundCustom: "Personnalisé",
    soundSystemNeedNotif: "Activez les notifications pour entendre le son du système",
    uploadNote: "Sur iPhone, toucher Importer peut demander l'accès aux photos — l'app ne voit jamais vos photos ; choisissez Fichiers pour sélectionner un fichier audio.",
    inMinutes: "il reste {n} min",
    soundTooBig: "Fichier trop volumineux (max 1,5 Mo)",
    terms: "Conditions",
    methodNote: "Les horaires sont calculés, pas un flux officiel de mosquée. Diyanet convient à la Turquie ; ISNA est le réglage par défaut à Montréal.",
    remaining: "restant",
    kerahat: "Moment déconseillé — le soleil se lève, est à son zénith ou se couche.",
    qiblaHint: "Le repère de la Kaaba suit le cap orthodromique, mesuré depuis le nord vrai.",
    compassUnavailable: "Boussole indisponible sur cet appareil — utilisez la carte ci-dessous.",
    howBody: "La petite Kaaba est fixée sur le cap vérifié. Tournez jusqu'à ce qu'elle rejoigne la flèche dorée en haut. Les boussoles de téléphone sont magnétiques et peuvent dévier de quelques degrés près du métal.",
    tasbihNote: "33 Subhanallah, 33 Alhamdulillah, 34 Allahu akbar. Enregistré sur cet appareil.",
    focusBody: "Horaires des prières, qibla, le mois et un lecteur du Coran. Sans compte, sans pub, sans suivi.",
    footer: "Horaires calculés par le moteur Aladhan. Texte et audio du Coran via Quran.com. Votre mosquée locale peut différer d'une minute.",
    loading: "Chargement des horaires…",
    left: "restant",
  
    hdAttrEn: "Traduction anglaise",
    facing: "Vous êtes face à la Qibla.",
    radioStop: "Arrêter",
    hdSearchPh: "Rechercher dans les hadiths…",
    footResources: "Ressources",
    xFastEveTitle: "Jeûner demain",
    fbOptRequest: "Demande de fonctionnalité",
    brand: "Daily Deen Hub",
    fastDay: "Jour",
    madhab: "Madhab pour l'Asr",
    hdLoading: "Téléchargement du livre… (une seule fois)",
    mapTitle: "Carte de la Qibla",
    cardsMnuAdj: "Ajuster",
    cardsYourMsg: "Votre message",
    fbOptProblem: "Signaler un problème",
    fastMadeUpLog: "rattrapé",
    vmPlay: "Écouter le verset",
    ramadan: "Ramadan",
    resDlToSearch: "Téléchargez un livre pour l'inclure dans la recherche",
    holyDaysSub: "Jours saints islamiques et nuits de kandil.",
    voiceListening: "Écoute… récitez le verset",
    feedback: "Commentaires",
    verseSearchPh: "Rechercher des versets…",
    fasting: "Jeûne en cours",
    holyDaysInDays: "jours restants",
    iftarIn: "Iftar dans",
    hisnul: "Hisnul Muslim",
    dhuhr: "Dhuhr",
    learnTile: "Apprentissage",
    beadTap: "Touchez n'importe où — chaque toucher avance un grain",
    Dhuhr: "Dhuhr",
    hdGeneralNote: "Les données sources ne précisent pas de chapitre pour ces hadiths.",
    cardsPos: "Position",
    fbOptFeedback: "Commentaires",
    cardsDownload: "Enregistrer",
    xJumuah: "Joumou'a",
    voiceMicDenied: "Le microphone est bloqué — autorisez-le pour utiliser la recherche vocale",
    locNote: "Choisissez votre ville pour des heures de prière précises.",
    hdChapters: "chapitres",
    mosquesTitle: "Trouver à proximité",
    namesDay: "Noms du jour",
    fbSub: "Dites-nous ce que vous en pensez — signalez un problème, demandez une fonctionnalité ou suggérez une amélioration. Votre message va directement au développeur.",
    cardsColor: "Couleur",
    ramFasts: "Mes jeûnes",
    khatmDelConfirm: "Supprimer ce khatm ?",
    tileMosques: "Mosquées",
    momentSub: "Lisez, méditez, puis partagez avec un proche.",
    cardsBot: "Bas",
    qadhaMissed: "Manquée",
    xTahajjud: "Tahajjud",
    khatmSub: "Suivez vos lectures complètes du Coran, Juz par Juz. Touchez un Juz pour le marquer comme lu.",
    vmOpen: "Ouvrir dans le lecteur",
    qvBoth: "Les deux",
    qadhaMinAgo: "min auparavant",
    voiceUnsupported: "La recherche vocale nécessite Chrome sur Android",
    soundAlarm: "Alarme",
    minBefore: "min avant",
    widgetLbl: "Widget",
    soundNostalgia: "Nostalgie",
    cardsMsgPh: "Écrivez votre message…",
    cardsShared: "Carte partagée !",
    qvNone: "Aucun",
    voiceNoSpeech: "Non compris — veuillez réessayer",
    fbOptSuggestion: "Suggestion",
    cardsFont: "Police",
    setNotif: "Notifications",
    cardsSaved: "Carte enregistrée sur votre appareil.",
    qvMushaf: "Moushaf",
    menuAbout: "À propos",
    cardsForDay: "Créez une carte pour",
    radioPlay: "Écouter",
    maghrib: "Maghrib",
    voiceNote: "Récitez un verset et nous le trouverons — votre voix est transcrite par le service vocal de Google.",
    uploadLbl: "Ajouter un son personnalisé",
    learnSupportTx: "DailyDeenHub est gratuit et le restera toujours. Si ces leçons vous ont été utiles, pensez à soutenir le projet.",
    voiceError: "La recherche vocale a échoué — veuillez réessayer",
    hisnulSub: "Dou'as authentiques du quotidien — arabe, translittération et traduction.",
    cardsSize: "Taille",
    openMap: "Ouvrir la carte Qibla",
    mosquesSub: "Mosquées et restaurants halal près de chez vous, via OpenStreetMap.",
    atTimeOpt: "À l'heure de la prière",
    setLoc: "Emplacement",
    qadhaCaughtUp: "Tout est à jour — rien à rattraper.",
    cardsMnuText: "Texte",
    resSearching: "Recherche dans les livres téléchargés…",
    mosquesNone: "Aucune mosquée trouvée dans un rayon de 20 km.",
    loadFail: "Impossible de charger les horaires.",
    cardsTop: "Haut",
    dayTomorrow: "Demain",
    articles: "Articles",
    surahPh: "Rechercher une sourate",
    aboutL: "À propos",
    mosquesLoading: "Recherche…",
    xBeforeDhuhr: "avant le Dhuhr (vendredi)",
    Maghrib: "Maghrib",
    liveYt: "Regarder sur YouTube",
    librarySub: "Les livres intégrés s'ouvrent instantanément ; les liens externes ouvrent des bibliothèques gratuites de confiance.",
    soundSaved: "Son personnalisé enregistré",
    gps: "Utiliser ma position",
    khatmTitle: "Khatms",
    fbName: "Nom (facultatif)",
    liveTitle: "Regarder en direct",
    tmBeads: "Perles",
    fbEmail: "E-mail (facultatif — uniquement si vous souhaitez une réponse)",
    cardsSugg: "Suggestions",
    play: "Lire",
    tap: "Touchez n'importe où pour compter",
    privacy: "Confidentialité",
    qadhaDaysAgo: "j",
    learnBack: "Retour",
    hdDlBtn: "Télécharger",
    hdContinue: "Continuer la lecture",
    vPlayFrom: "Lire à partir d'ici",
    verseOfDay: "Verset du jour",
    juzLbl: "Juz",
    mosquesError: "Impossible de charger les mosquées.",
    holyDaysTomorrow: "demain",
    hdDlLater: "Pas maintenant",
    fastMissedLog: "manqué",
    cardsTapType: "Touchez pour écrire…",
    privacyL: "Confidentialité",
    vmPause: "Pause",
    greetTitle: "Vœux prêts à l'emploi — touchez partager pour envoyer",
    qadhaFullDay: "Journée complète",
    qadhaMissDay: "+ Journée complète manquée",
    khatmNamePh: "Nom du khatm…",
    resSub: "Les six recueils canoniques de hadiths.",
    soundBell: "Cloche",
    extraSub: "Rappels de réveil et de jeûne, basés sur les horaires de prière.",
    khatmDelete: "Supprimer",
    pause: "Pause",
    learnTitle: "Centre d'apprentissage",
    voiceWinTitle: "Trouver un verset récité",
    holyDaysNote: "Les dates suivent le calcul du Diyanet (Türkiye). Votre mosquée locale peut les observer un jour plus tôt ou plus tard — en particulier Ramadan et les fêtes, qui dépendent de l'observation lunaire.",
    sun: "Lever du soleil",
    hisnulTitle: "Hisnul Muslim",
    done: "Terminé",
    setAppear: "Langue",
    resHadith: "hadith",
    hadithOfDay: "Hadith du jour",
    moreTitle: "Plus",
    home: "Accueil", tasbihTab: "Tasbih", findTab: "Recherche", settingsTab: "Paramètres",
    duaOfDay: "Dou'a du jour",
    soundHonk: "Klaxon",
    right: "droite",
    qadha: "Prières de qadha",
    langLbl: "Langue",
    streaks: "série de jours",
    addPrayer: "Ajouter une salle de prière",
    gpsFail: "Position indisponible.",
    xFast: "Jeûne lun. / jeu.",
    voiceTile: "Recherche vocale",
    hdResults: "résultats",
    vPlayOne: "Lire ce verset",
    mqFavTitle: "★ Favoris",
    fbEmpty: "Veuillez d'abord écrire un message.",
    followLbl: "Ombrer les versets",
    resources: "Ressources",
    compass: "Utiliser la boussole",
    soundSystem: "Système par défaut",
    hdLangEn: "FR",
    fbThanks: "Merci ! Votre message a été envoyé.",
    hdLangBoth: "AR + FR",
    qvPron: "Prononciation",
    cardsPickBg: "Choisir un arrière-plan",
    Asr: "Asr",
    learnSub: "Guides pas à pas, dou'as quotidiens et l'essentiel de la foi.",
    cardsMid: "Milieu",
    khatmJuz: "Juz",
    qadhaSub: "Une prière manquée ? Notez-la ici, puis cochez chacune au fur et à mesure.",
    soundSystemPreview: "Aperçu du son système",
    voiceLangName: "Arabe (Arabie saoudite)",
    fbMsg: "Votre message",
    fbSend: "Envoyer un commentaire",
    noResults: "Aucun résultat.",
    addMosque: "Ajouter une mosquée",
    searching: "Recherche…",
    streak: "série de jours",
    resSearchPh: "Rechercher dans les six livres\\u2026",
    quranTab: "Coran", quranResume: "Continuer l'écoute / la lecture",
    hdBack: "Livres",
    langSystem: "Système",
    fbType: "Type",
    cardsBack: "← Arrière-plans",
    setTitle: "Paramètres",
    timeNow: "heure",
    marketFind: "Trouver des boucheries/marchés halal près de moi",
    momentLang: "Les cartes suivent la langue choisie",
    at: "à",
    holyDaysNext: "Prochain",
    khatmNew: "+ Nouveau khatm",
    notify: "M'avertir lorsque l'appli est ouverte",
    asr: "Asr",
    monthTab: "Mois",
    Witr: "Witr",
    mqSuggest: "Un lieu manquant ? Proposez-le nous →",
    watchLive: "Regarder en direct",
    tmClassic: "Classique",
    Sunrise: "Lever du soleil",
    dualCal: "Calendrier double",
    khatm: "Khatms",
    suhoorIn: "Sahour dans",
    savedMsg: "Paramètres enregistrés",
    dayYesterday: "Hier",
    voiceTapToStart: "Touchez le micro et récitez",
    hdLangAr: "\\u0639\\u0631\\u0628\\u064a",
    Isha: "Isha",
    changeCity: "Changer de ville",
    khatmDone: "Khatm terminé ! \\uD83C\\uDF89 Qu'Allah l'accepte.",
    fastProgress: "jeûné",
    qvTrans: "Traduction",
    qadhaMissedLog: "manquée",
    qadhaHrsAgo: "il y a h",
    finderCached: "Résultats enregistrés affichés — le serveur cartographique est injoignable.",
    widgetNote: "Les widgets d'écran d'accueil sont inclus dans l'application Android — appui long sur l'écran d'accueil, touchez Widgets puis choisissez DailyDeenHub.",
    fastFastedLog: "jeûné",
    soundAdhanShort: "Adhan (court)",
    footFreeTools: "Outils gratuits",
    cardsShareFail: "Le partage n'est pas pris en charge ici — la carte a été enregistrée.",
    hdNoRes: "Aucun hadith trouvé pour cette recherche.",
    fastMadeUp: "Rattrapé",
    fbTitle: "Avis et demandes",
    halalNone: "Aucun restaurant halal trouvé dans un rayon de 20 km.",
    kaabaHint: "Tenez votre téléphone à la verticale et tournez jusqu'à centrer la Kaaba.",
    liveNabawi: "Masjid an-Nabawi — Médine",
    qiblaTab: "Qibla",
    qadhaMadeUp: "Rattrapée une",
    fastOwed: "jeûnes à rattraper",
    nextRamadan: "Prochain Ramadan",
    prevMonth: "Mois précédent", nextMonth: "Mois suivant",
    tasbihTitle: "Tasbih",
    Fajr: "Fajr",
    vibLbl: "Vibration",
    hdBackCh: "Chapitres",
    fbError: "Une erreur s'est produite — veuillez réessayer.",
    liveSub: "Diffusions en direct des deux saintes mosquées, via les chaînes officielles Quran TV et Sunnah TV.",
    reset: "Réinitialiser",
    voiceBtn: "Trouver un verset récité",
    khatmDefault: "Mon Khatm",
    cardsSub: "Choisissez un arrière-plan, écrivez votre message, partagez-le avec vos proches.",
    momentTitle: "Un moment pour aujourd'hui",
    hdDlOnce: "téléchargé une fois sur votre appareil. Lisez à tout moment, même hors ligne.",
    setCalc: "Calcul des prières",
    cardsShare: "Partager",
    thisMonth: "Ce mois-ci",
    namesSub: "Idées de prénoms pour nouveau-né",
    liveHaram: "Masjid al-Haram — La Mecque",
    libraryTile: "Bibliothèque",
    fastMissed: "Manqué",
    termsL: "Conditions",
    close: "Fermer",
    fbSending: "Envoi…",
    fbMsgPh: "Écrivez votre message…",
    placeTitle: "Lieu",
    cardsBright: "Luminosité",
    qadhaMadeUpLog: "rattrapée",
    asmaDay: "Asma-ul Husna",
    articlesTitle: "À propos et FAQ",
    resNoRes: "Aucun résultat trouvé.",
    dayToday: "Aujourd'hui",
    passed: "passé",
    cardsMnuBg: "Arrière-plan",
    libraryTitle: "Bibliothèque",
    hdRetry: "Réessayer",
    cardsBlur: "Flou",
    tileTasbih: "Tasbih",
    audioFail: "Impossible de lire l'audio.",
    holyDaysToday: "aujourd'hui",
    hdAttrAr: "Texte arabe : domaine public",
    marketNone: "Aucune épicerie halal trouvée dans un rayon de 20 km.",
    articlesSub: "Comment fonctionne DailyDeenHub, et réponses aux questions fréquentes.",
    adhanNote: "Joue l'adhan complet quand l'onglet est ouvert.",
    liveBadge: "● EN DIRECT",
    isha: "Isha",
    comingSoon: "Bientôt disponible",
    setRemind: "Rappels",
    markDone: "Touchez une prière pour la marquer comme accomplie",
    names: { Fajr: "Fajr", Sunrise: "Lever du soleil", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha", Witr: "Witr" } },

};
const WEEKDAYS = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  tr: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
  fr: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
};
const WEEKDAYS_SHORT = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  tr: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  fr: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."]
};
const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
};
const COMPASS = { en: ["N", "E", "S", "W"], tr: ["K", "D", "G", "B"], fr: ["N", "E", "S", "O"] };
// Hijri month names live in HIJRI_MONTHS_TR / HIJRI_MONTHS_EN (used via hijriName()).

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
let ramadanSub = "times"; // "times" | "fasts"
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

function langPath(l) { return l === "tr" ? "/tr/" : l === "fr" ? "/fr/" : "/"; }
function pickL(trV, frV, enV, l) { l = l || (typeof state !== "undefined" ? state.lang : "en"); return l === "tr" ? trV : l === "fr" ? frV : enV; }
function pathLang() { const p = location.pathname; return p.startsWith("/tr") ? "tr" : p.startsWith("/fr") ? "fr" : "en"; }
function sysLang() { const l = (navigator.language || "").toLowerCase(); return l.startsWith("tr") ? "tr" : l.startsWith("fr") ? "fr" : "en"; }
function load() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem("ezan-vakti") || "{}") || {}; } catch { saved = {}; }
  // Language preference: "system" (the default) follows the device language; an explicit
  // EN/TR choice (including one saved by older versions) always wins. The /tr path counts
  // as a Turkish signal only on a true first visit (nothing saved yet).
  const pref = saved.langPref || saved.lang || (() => { try { return localStorage.getItem("ddh-lang"); } catch (e) { return null; } })() || "system";
  const firstVisit = !saved.lang && !saved.langPref;
  const st = {
    langPref: pref,
    lang: pref === "system" ? ((firstVisit && pathLang() !== "en") ? pathLang() : sysLang()) : pref,
    theme: "night", // Dark only — any saved Day/System choice migrates to Dark
    method: saved.method ?? 2,
    school: saved.school ?? 0,
    notify: saved.notify ?? true,
    adhanAtTime: saved.adhanAtTime ?? true,
    remind: saved.remind || Object.fromEntries(["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(k => [k, saved.remindMin ?? 15])),
    sound: saved.sound || "bell.wav",
    customSound: saved.customSound || null,
    reciter: saved.reciter ?? 7,
    remindOn: saved.remindOn || {},
    extraRemind: normalizeExtra(saved.extraRemind),
    vibration: saved.vibration ?? true,
    quranView: saved.quranView || "trans",
    quranFollow: saved.quranFollow ?? true,
    tasbihMode: saved.tasbihMode || "classic",
    beadStyle: saved.beadStyle || "melon",
    tasbihLoops: saved.tasbihLoops || 0,
    place: saved.place || { name: "Montreal", country: "Canada", lat: 45.5017, lon: -73.5673, tz: "America/Toronto" },
    tasbih: saved.tasbih || 0,
    favs: saved.favs || []
  };
  // Old/removed sound names (beep, chime, bell, removed files) fall back to bell.wav
  if (!VALID_SOUNDS.includes(st.sound)) st.sound = "bell.wav";
  if (st.sound === "custom" && !st.customSound) st.sound = "bell.wav";
  // v170: Follow recitation now defaults ON. A stored `false` predates the new
  // default (off was the old default, persisted by save()), so migrate once —
  // an explicit untick after this version keeps working as before.
  try {
    if (!localStorage.getItem("ddh-follow-migrated")) {
      st.quranFollow = true;
      localStorage.setItem("ddh-follow-migrated", "1");
    }
  } catch { /* private mode */ }
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
  const stripped = String(v || "").replace(/<sup[\s\S]*?<\/sup>/gi, "").replace(/<[^>]*>/g, "");
  return escapeHtml(decodeEnt(stripped));
}
function t(key) { var b = I18N[state.lang] || I18N.en; return b[key] !== undefined ? b[key] : I18N.en[key]; }
/* Extra reminders (More tile): sahur/tahajjud = minutes before Fajr;
   fast = Mon/Thu minutes before Fajr (+ optional 9 PM evening-before nudge);
   jumuah = minutes before Friday Dhuhr. All off by default. */
function defaultExtra() {
  return {
    sahur: { on: false, mins: 90 },
    tahajjud: { on: false, mins: 120 },
    fast: { on: false, mins: 60, eve: false },
    jumuah: { on: false, mins: 60 },
  };
}
function normalizeExtra(s) {
  const d = defaultExtra();
  if (s) for (const k of Object.keys(d)) if (s[k] && typeof s[k] === "object") d[k] = { ...d[k], ...s[k] };
  return d;
}
// Early nav: event delegation so bottom nav works even if later JS fails
document.addEventListener("click", e => {
  // Settings gear needs its controls synced — check BEFORE the generic
  // data-goto handler, because the gear also carries data-goto="settings"
  // (the generic branch returns early and would skip the sync).
  if (e.target.closest("#bnavSet")) {
    e.preventDefault();
    if (typeof showTab === "function") { showTab("settings"); if (typeof syncSetControls === "function") syncSetControls(); if (typeof setShow === "function") setShow(null); window.scrollTo({ top: 0 }); }
    return;
  }
  const g = e.target.closest("[data-goto]");
  if (g) {
    e.preventDefault();
    if (typeof showTab === "function") { showTab(g.dataset.goto); window.scrollTo(0, 0); }
    return;
  }
});

window.DDHLang = () => state.lang;
function nameOf(key) {
  // On Fridays, Dhuhr is Jumu'ah (Friday prayer)
  if (key === "Dhuhr" && isFridayToday()) return pickL("Cuma", "Joumou'a", "Jumu'ah");
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
  document.querySelectorAll("[data-i-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.iAria)); el.title = t(el.dataset.iAria); });
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
  if (mLv) mLv.textContent = displayPlaceName();
  const _tb = document.getElementById("themeBtn"); if (_tb) _tb.textContent = state.theme === "night" ? "☾" : "☀";
  document.body.dataset.theme = state.theme === "day" ? "day" : "";
  document.getElementById("locLabel").textContent = displayPlaceName();
  if (typeof refreshLearnView === "function") refreshLearnView();
  if (typeof renderLibrary === "function") renderLibrary(false);
  const bw = document.getElementById("brandWord");
  if (bw) { bw.src = state.lang === "tr" ? "/images/logo-text-tr.png" : "/images/logo-text-en.png"; bw.alt = pickL("Günlük Din", "Daily Deen Hub", "Daily Deen Hub"); }
  const _fn = document.getElementById("footerNote"); if (_fn) _fn.textContent = t("footer");
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
  if (typeof renderExtraRows === "function") renderExtraRows();
  const audio = document.getElementById("audio");
  setPlayLabel(audio && !audio.paused && audio.getAttribute("src") ? t("pause") : t("play"));
  document.querySelectorAll("[data-cardinal]").forEach(el => { el.textContent = (COMPASS[state.lang] || COMPASS.en)[+el.dataset.cardinal]; });
}
function fillSelects() {
  if (!METHODS.some(([id]) => id === state.method)) state.method = 2;
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
    [["system", t("soundSystem")],
     ["adhan-prayer-call.mp3", t("soundAdhan")], ["adhan-prayer-call-trimmed.mp3", t("soundAdhanShort")],
     ["alarm.mp3", t("soundAlarm")], ["alert-on-mobile.wav", t("soundMobile")],
     ["bell.wav", t("soundBell")], ["double-car-honk.mp3", t("soundHonk")],
     ["nikin-short-chick-sound.mp3", t("soundChick")], ["nostalgia.wav", t("soundNostalgia")],
     ["custom", t("soundCustom")]]
      .map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
  document.getElementById("soundSel").value = state.sound;
  document.getElementById("soundUploadRow").style.display = state.sound === "custom" ? "" : "none";
  document.getElementById("reciterSel").innerHTML = RECITERS.map(([id, label]) => `<option value="${id}">${label}</option>`).join("");
  if (!RECITER_PATHS[state.reciter]) state.reciter = 7;
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
  dayOffset = 0;
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
let dayOffset = 0, gridDate = null; // prayer-grid day navigation (swipe); hero always stays on today
function gridEntry() {
  const now = zoneParts(state.place.tz || "UTC");
  const base = new Date(Date.UTC(now.y, now.m - 1, now.d) + dayOffset * 864e5);
  const y = base.getUTCFullYear(), m = base.getUTCMonth() + 1, d = base.getUTCDate();
  gridDate = new Date(y, m - 1, d);
  const key = `${pad(d)}-${pad(m)}-${y}`;
  let entry = (calendar || []).find(e => e.date.gregorian.date === key);
  if (!entry && typeof PrayerCalc !== "undefined") {
    // outside the cached month: compute this exact day offline
    const tzOff = PrayerCalc.tzOffsetHours(state.place.tz, y, m, d);
    entry = { date: { gregorian: { date: key } }, timings: PrayerCalc.dayTimes(y, m, d, state.place.lat, state.place.lon, tzOff, state.method, state.school) };
  }
  return { entry, y, m, d };
}
const EN_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const EN_WDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function renderDayBar(y, m, d) {
  const bar = document.getElementById("gridDayBar");
  if (!bar) return;
  bar.classList.remove("hidden");
  let txt;
  if (dayOffset === -1) txt = t("dayYesterday");
  else if (dayOffset === 1) txt = t("dayTomorrow");
  else if (dayOffset === 0) txt = t("dayToday");
  else txt = `${localWeekday(EN_WDAYS[gridDate.getDay()])} ${d} ${localMonth(EN_MONTHS[m - 1])} ${y}`;
  document.getElementById("gridDayLabel").textContent = txt;
}
/* Step the prayer-grid day with a little slide animation (page-turn feel). */
function stepDay(d) {
  const nd = Math.max(-60, Math.min(60, dayOffset + d));
  if (nd === dayOffset || !d) return;
  dayOffset = nd;
  const el = document.getElementById("vaktGrid");
  if (el) {
    el.classList.remove("dslide-next", "dslide-prev");
    void el.offsetWidth;
    el.classList.add(d > 0 ? "dslide-next" : "dslide-prev");
  }
  renderTimes();
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
  const g = entry.date.gregorian;
  // Single Hijri source of truth: the offline Kuwaiti calc (same as the dual-calendar grid),
  // so the hero pill always agrees with the month view on both the day and the month name.
  const h = gToHLocal(now.y, now.m, now.d) || entry.date.hijri;
  document.getElementById("gDate").textContent = `${localWeekday(g.weekday.en)} ${g.day} ${localMonth(g.month.en)} ${g.year}`;
  document.getElementById("hDate").textContent = `${h.day} ${hijriName(+h.month.number)} ${h.year}`;
  const sun = minutes(entry.timings.Sunrise), dhuhr = minutes(entry.timings.Dhuhr), maghrib = minutes(entry.timings.Maghrib);
  const kerahat = (nowMin >= sun && nowMin < sun + 18) || (nowMin >= dhuhr - 8 && nowMin < dhuhr) || (nowMin >= maghrib - 18 && nowMin < maghrib);
  document.getElementById("kerahat").textContent = kerahat ? t("kerahat") : "";
  const ge = gridEntry(), gEntry = ge.entry;
  renderDayBar(ge.y, ge.m, ge.d);
  const gDone = (getTracker())[todayKey(gridDate)] || [];
  const isToday = dayOffset === 0;
  document.getElementById("vaktGrid").innerHTML = PRAYERS.map(k => {
    const tm = gEntry.timings[k];
    const passed = !isToday ? dayOffset < 0 : minutes(tm) <= nowMin;
    const trackable = TRACKABLE.includes(k), isDone = gDone.includes(k);
    let check = "";
    if (trackable) {
      if (isDone) check = `<button type="button" class="vakt-check on" data-trk="${k}" aria-label="${nameOf(k)} ${t("done")}">✓</button>`;
      else if (dayOffset <= 0 && (dayOffset < 0 || passed)) check = `<button type="button" class="vakt-check" data-trk="${k}" aria-label="${t("markDone")} ${nameOf(k)}"></button>`;
      else check = `<span class="vakt-check off" aria-hidden="true"></span>`;
    }
    return `<article class="vakt ${isToday && k === nextKey ? "on" : ""}">${check}<div class="nm">${nameOf(k)}</div><div class="tm">${tm}</div><div class="st">${passed ? t("passed") : ""}</div></article>`;
  }).join("");
  try { renderRamadanHub(entry); } catch (e) { /* never let the hub stop adhan/alerts below */ }
  // Adhan at prayer time: play the full adhan once, within a minute after the prayer
  // time begins (tolerates background-tab timer throttling).
  if (dayOffset === 0 && state.adhanAtTime && prev) {
    const adhanKey = `${g.date}-${prev.key}`;
    const sinceSecs = (nowMin - prev.min) * 60;
    if (sinceSecs >= 0 && sinceSecs < 60 && adhanPlayedKey !== adhanKey) {
      adhanPlayedKey = adhanKey;
      try { const a = new Audio("/audio/adhan-prayer-call.mp3"); a.play().catch(() => {}); } catch {}
    }
  }
  // Only fire from a VISIBLE tab: a backgrounded tab's reminder would double
  // up with the push notification (the service worker shows push only when
  // no tab is visible, so visible-tab ⟺ local and hidden-tab ⟺ push are
  // mutually exclusive — exactly one notification ever fires).
  if (dayOffset === 0 && state.notify && !(state.remindOn && state.remindOn[nextKey] === false) && "Notification" in window && Notification.permission === "granted" && document.visibilityState === "visible") {
    const minsLeft = nextAt - nowMin, rm = (state.remind && state.remind[nextKey] != null) ? state.remind[nextKey] : 15;
    const key = `${g.date}-${nextKey}-r${rm}`;
    if (minsLeft <= rm + 0.02 && minsLeft > -1 && notifiedKey !== key) {
      notifiedKey = key;
      playAlert();
      const title = rm === 0 ? `${nameOf(nextKey)} ${t("timeNow")}` : `${nameOf(nextKey)} — ${t("inMinutes").replace("{n}", rm)}`;
      showLocalNotification(title, "prayer-" + nextKey);
    }
  }
  if (dayOffset === 0 && state.notify && "Notification" in window && Notification.permission === "granted") {
    try { checkExtraReminders(slots, nowMin, now); } catch (e) { /* extras never break the main render */ }
  }
}
function showLocalNotification(title, tag) {
  const fallback = () => { try { new Notification(title); } catch {} };
  if (navigator.serviceWorker && navigator.serviceWorker.ready) {
    // Android Chrome forbids `new Notification()`; go through the service worker.
    navigator.serviceWorker.ready
      .then(reg => reg.showNotification(title, { icon: "/icon-192.png", badge: "/icon-192.png", tag: tag || "ddh-local" }))
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
const HIJRI_MONTHS_FR = ["Mouharram","Safar","Rabi\u02bf al-awwal","Rabi\u02bf ath-thani","Joumada al-oula","Joumada ath-thania","Rajab","Cha\u02bfban","Ramadan","Chawwal","Dhou al-qi\u02bfda","Dhou al-hijja"];
function hijriName(m) { return pickL(HIJRI_MONTHS_TR, HIJRI_MONTHS_FR, HIJRI_MONTHS_EN)[m - 1] || ""; }
function gToHLocal(y, m, d) {
  if (typeof PrayerCalc !== "undefined" && PrayerCalc.gToH) return PrayerCalc.gToH(y, m, d);
  return null;
}

let calY = null, calM = null, calSel = null; // dual-calendar grid state
function calDayTimes(y, m, d) {
  const key = `${pad(d)}-${pad(m)}-${y}`;
  const entry = (calendar || []).find(e => e.date.gregorian.date === key);
  if (entry) return entry.timings;
  if (typeof PrayerCalc !== "undefined") {
    const tzOff = PrayerCalc.tzOffsetHours(state.place.tz, y, m, d);
    return PrayerCalc.dayTimes(y, m, d, state.place.lat, state.place.lon, tzOff, state.method, state.school);
  }
  return null;
}
function renderCalDetail() {
  const el = document.getElementById("calDetail");
  if (!el) return;
  if (monthView !== "month" || calY === null) { el.innerHTML = ""; return; }
  const now = zoneParts(state.place.tz);
  const d = calSel || (calY === now.y && calM === now.m ? now.d : 1);
  const tm = calDayTimes(calY, calM, d);
  if (!tm) { el.innerHTML = ""; return; }
  el.innerHTML = `<div class="cald-head">${d} ${localMonth(EN_MONTHS[calM - 1])} ${calY}</div><div class="cald-times">` +
    PRAYERS.map(k => `<span><i>${nameOf(k)}</i>${tm[k]}</span>`).join("") + `</div>`;
}
function renderDualCal() {
  const now = zoneParts(state.place.tz);
  if (calY === null) { calY = now.y; calM = now.m; }
  const heading = document.getElementById("monthHeading");
  const note = document.getElementById("monthNote");
  const body = document.getElementById("monthBody");
  if (heading) {
    const hMid = gToHLocal(calY, calM, 15);
    const hPart = hMid ? `<span class="hh"> \u00b7 ${hijriName(+hMid.month.number)} ${hMid.year}</span>` : "";
    heading.innerHTML = `${localMonth(EN_MONTHS[calM - 1])} ${calY}${hPart}`;
  }
  if (note) note.textContent = "";
  document.querySelector("#panel-month thead").style.display = "none";
  const daysInMonth = new Date(calY, calM, 0).getDate();
  const startDow = (new Date(calY, calM - 1, 1).getDay() + 6) % 7; // Monday-first
  const wd = pickL(["Pzt","Sal","\u00c7ar","Per","Cum","Cmt","Paz"], ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"], ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]);
  let html = `<tr>${wd.map(w => `<th>${w}</th>`).join("")}</tr><tr>`;
  for (let i = 0; i < startDow; i++) html += "<td></td>";
  for (let d = 1; d <= daysInMonth; d++) {
    const col = (startDow + d - 1) % 7;
    if (d > 1 && col === 0) html += "</tr><tr>";
    const h = gToHLocal(calY, calM, d);
    const isToday = calY === now.y && calM === now.m && d === now.d;
    const isSel = calSel === d;
    html += `<td class="${isToday ? "today" : ""}${isSel ? " sel" : ""}" data-calday="${d}"><b>${d}</b><span class="hday">${h ? h.day : ""}</span></td>`;
  }
  html += "</tr>";
  body.innerHTML = html;
  document.getElementById("monthMode").classList.add("on");
  document.getElementById("ramadanMode").classList.remove("on");
  const cp = document.getElementById("calPrev"), cn = document.getElementById("calNext");
  if (cp) cp.style.display = ""; if (cn) cn.style.display = "";
  // leaving Ramadan view: hide its sub-row, fasts box; reshow the table
  const _dSub = document.getElementById("ramadanSubRow");
  if (_dSub) _dSub.style.display = "none";
  const _dFast = document.getElementById("ramadanFasts");
  if (_dFast) _dFast.style.display = "none";
  const _dTbl = document.querySelector("#panel-month .scroll");
  if (_dTbl) _dTbl.style.display = "";
  renderCalDetail();
}
function renderMonth() {
  if (monthView === "month") { renderDualCal(); return; }
  const _subRow = document.getElementById("ramadanSubRow");
  const _fastBox = document.getElementById("ramadanFasts");
  const _scrollTbl = document.querySelector("#panel-month .scroll");
  const _isRam = monthView === "ramadan";
  if (_subRow) _subRow.style.display = _isRam ? "" : "none";
  if (_isRam && ramadanSub === "fasts") {
    document.querySelector("#panel-month thead").style.display = "none";
    if (_scrollTbl) _scrollTbl.style.display = "none";
    if (_fastBox) _fastBox.style.display = "";
    const _cp0 = document.getElementById("calPrev"), _cn0 = document.getElementById("calNext");
    if (_cp0) _cp0.style.display = "none"; if (_cn0) _cn0.style.display = "none";
    const _rt = document.getElementById("ramTimes"), _rf = document.getElementById("ramFasts");
    if (_rt) _rt.classList.remove("on"); if (_rf) _rf.classList.add("on");
    document.getElementById("monthMode").classList.remove("on");
    document.getElementById("ramadanMode").classList.add("on");
    ensureRamadan().then(() => { if (monthView === "ramadan" && ramadanSub === "fasts" && typeof renderRamadanFasts === "function") renderRamadanFasts(); }).catch(() => {});
    if (typeof renderRamadanFasts === "function") renderRamadanFasts();
    return;
  }
  if (_scrollTbl) _scrollTbl.style.display = "";
  if (_fastBox) _fastBox.style.display = "none";
  const _rt2 = document.getElementById("ramTimes"), _rf2 = document.getElementById("ramFasts");
  if (_rt2) _rt2.classList.add("on"); if (_rf2) _rf2.classList.remove("on");
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
  const _cp2 = document.getElementById("calPrev"), _cn2 = document.getElementById("calNext");
  if (_cp2) _cp2.style.display = "none"; if (_cn2) _cn2.style.display = "none";
  const _cd2 = document.getElementById("calDetail"); if (_cd2) _cd2.innerHTML = "";
}
function renderAyah() {
  const a = AYAH[Math.floor(Date.now() / 86400000) % AYAH.length];
  document.getElementById("ayahAr").textContent = a.ar;
  document.getElementById("ayahText").textContent = pickL(a.tr, a.fr, a.en);
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
  const _qdeg = document.getElementById("qiblaDeg"); if (_qdeg) _qdeg.textContent = atKaaba ? pickL("Kâbe", "Kaaba", "Kaaba") : `${b.toFixed(1)}°`;
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
    const src = `/qibla?embed=1&lat=${qp.lat}&lon=${qp.lon}&name=${encodeURIComponent(qp.name)}&lang=${state.lang}`;
    if (frame.dataset.place !== src) { frame.dataset.place = src; frame.src = src; }
    if (open) open.href = `/qibla?lat=${qp.lat}&lon=${qp.lon}&name=${encodeURIComponent(qp.name)}&lang=${state.lang}`;
  }
  document.getElementById("qiblaCheck").textContent = atKaaba
    ? pickL("Kâbe’desiniz.", "Vous êtes à la Kaaba.", "You are at the Kaaba.")
    : `${b.toFixed(1)}° · ${pickL("gerçek kuzeye göre", "du nord vrai", "from true north")}`;
  const km = kaabaKm(qp.lat, qp.lon);
  document.getElementById("qiblaDistance").textContent = atKaaba ? "" : `${km.toFixed(0)} km · ${pickL("Kâbe mesafesi", "distance à la Kaaba", "to the Kaaba")}`;
  // Warn when the compass uses GPS because the manual location is a test location.
  const qloc = document.getElementById("qiblaLocNote");
  if (qloc) {
    qloc.textContent = qiblaLoc
      ? pickL(`Pusula GPS konumunuzu kullanıyor (manuel konum: ${state.place.name}).`,
              `La boussole utilise votre position GPS (position manuelle : ${state.place.name}).`,
              `Compass is using your GPS location (manual location: ${state.place.name}).`)
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
  const bl = document.getElementById("beadLoop"); if (bl) bl.textContent = pickL("Tur ", "Tour ", "Loop ") + ((state.tasbihLoops || 0) + 1);
}
/* ---------- Tasbih beads mode ---------- */
const BEAD_STYLES = {
  melon: ["radial-gradient(circle at 35% 32%, #ff9a86, #e03222 52%, #8f130c 100%)", "#2f7d32"],
  onyx: ["radial-gradient(circle at 35% 32%, #7a7a7a, #1c1c1e 55%, #000000 100%)", "#333333"],
  pearl: ["radial-gradient(circle at 35% 32%, #ffffff, #e3e7ea 55%, #a7b0b8 100%)", "#c3ccd2"],
  amber: ["radial-gradient(circle at 35% 32%, #ffe082, #f0a202 58%, #96650a 100%)", "#b57e10"],
  wood: ["radial-gradient(circle at 35% 32%, #d29a55, #8a5a24 58%, #54340e 100%)", "#6e4517"],
  turquoise: ["radial-gradient(circle at 35% 32%, #8ff0e8, #2bb8b0 55%, #0d6b66 100%)", "#147a72"]
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
  const frame = document.getElementById("tasbihFrame");
  if (frame) frame.classList.toggle("hidden", beads);
  else document.getElementById("tasbihClassic").classList.toggle("hidden", beads);
  document.getElementById("tasbihBeads").classList.toggle("hidden", !beads);
  document.querySelectorAll("#tasbihModeSeg button").forEach(b => b.classList.toggle("on", b.dataset.tm === state.tasbihMode));
  if (beads) { buildBeads(); renderBeads(false); }
  else setTimeout(layoutBeadFrame, 60);
}
/* ===== Tasbih bead frame: 33 turquoise beads, silver divider every 11 ===== */
function beadFramePoint(segs, r, total, d) {
  d = ((d % total) + total) % total;
  for (const g of segs) {
    if (d <= g.len) {
      const f = g.len ? d / g.len : 0;
      if (g.t === "line") return [g.x1 + (g.x2 - g.x1) * f, g.y1 + (g.y2 - g.y1) * f];
      const a = g.a0 + (g.a1 - g.a0) * f;
      return [g.cx + r * Math.cos(a), g.cy + r * Math.sin(a)];
    }
    d -= g.len;
  }
  return [0, 0];
}
function layoutBeadFrame() {
  const wrap = document.getElementById("tasbihFrame"), layer = document.getElementById("tasbihBeadFrame");
  if (!wrap || !layer || wrap.classList.contains("hidden")) return;
  const W = wrap.offsetWidth, H = wrap.offsetHeight;
  if (W < 60 || H < 60) return;
  if (!layer.children.length) {
    for (let i = 0; i < 36; i++) {
      const isSilver = (i === 11 || i === 23 || i === 35);
      const el = document.createElement("img");
      el.src = isSilver ? "img/bead-ag.png" : "img/bead-tq.png";
      el.alt = ""; el.draggable = false;
      layer.appendChild(el);
    }
  }
  const bs = Math.round(Math.max(22, Math.min(34, W / 11)));
  const ss = Math.round(bs * 0.94);
  const r = bs * 1.25, pad = bs / 2 + 4;
  const x0 = pad, y0 = pad, w = W - pad * 2, h = H - pad * 2;
  const st = Math.max(1, w - 2 * r), sv = Math.max(1, h - 2 * r), arc = Math.PI * r / 2;
  const segs = [
    { t: "line", x1: x0 + r, y1: y0, x2: x0 + w - r, y2: y0, len: st },
    { t: "arc", cx: x0 + w - r, cy: y0 + r, a0: -Math.PI / 2, a1: 0, len: arc },
    { t: "line", x1: x0 + w, y1: y0 + r, x2: x0 + w, y2: y0 + h - r, len: sv },
    { t: "arc", cx: x0 + w - r, cy: y0 + h - r, a0: 0, a1: Math.PI / 2, len: arc },
    { t: "line", x1: x0 + w - r, y1: y0 + h, x2: x0 + r, y2: y0 + h, len: st },
    { t: "arc", cx: x0 + r, cy: y0 + h - r, a0: Math.PI / 2, a1: Math.PI, len: arc },
    { t: "line", x1: x0, y1: y0 + h - r, x2: x0, y2: y0 + r, len: sv },
    { t: "arc", cx: x0 + r, cy: y0 + r, a0: Math.PI, a1: Math.PI * 1.5, len: arc }
  ];
  const total = 2 * st + 2 * sv + 4 * arc, n = 36;
  [...layer.children].forEach((el, i) => {
    const isSilver = (i === 11 || i === 23 || i === 35);
    const sz = isSilver ? ss : bs, p = beadFramePoint(segs, r, total, i / n * total);
    el.style.width = sz + "px"; el.style.height = sz + "px";
    el.style.left = (p[0] - sz / 2) + "px"; el.style.top = (p[1] - sz / 2) + "px";
  });
}
let beadFrameRT = 0;
window.addEventListener("resize", () => {
  clearTimeout(beadFrameRT);
  beadFrameRT = setTimeout(layoutBeadFrame, 200);
});
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
  const tr = getTracker(), tk = todayKey(gridDate || new Date());
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
let lastFinder = null; // { items, kind } — kept so favorite toggles can re-render
function favKey(lat, lon) { return lat.toFixed(5) + "," + lon.toFixed(5); }
function isFav(m) { return state.favs.some(f => f.key === favKey(m.lat, m.lon)); }
function renderFinder() {
  const list = document.getElementById("mosqueList");
  if (!lastFinder) return;
  const { items, kind } = lastFinder;  const icon = kind === "halal" ? "🍽️" : kind === "market" ? "🏪" : "🕌";
  const favs = items.filter(isFav), rest = items.filter(m => !isFav(m));
  const row = m =>
    `<div class="mq-row"><a class="mosque" href="https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}" target="_blank" rel="noopener">` +
    `<span class="mq-name">${icon} ${escapeHtml(m.name)}</span><span class="mq-d">${m.d < 1 ? Math.round(m.d * 1000) + " m" : m.d.toFixed(1) + " km"}</span></a>` +
    `<button class="mq-fav${isFav(m) ? " on" : ""}" type="button" data-lat="${m.lat}" data-lon="${m.lon}" data-name="${escapeHtml(m.name)}" aria-label="${isFav(m) ? "★" : "☆"}">${isFav(m) ? "★" : "☆"}</button></div>`;
  list.innerHTML =
    (lastFinder.stale ? `<p class="hint">${t("finderCached")}</p>` : "") +
    (favs.length ? `<p class="mq-favhead" data-i="mqFavTitle">${t("mqFavTitle")}</p>` + favs.map(row).join("") : "") +
    rest.map(row).join("");
  list.querySelectorAll(".mq-fav").forEach(b => b.onclick = () => {
    const lat = +b.dataset.lat, lon = +b.dataset.lon, key = favKey(lat, lon);
    const i = state.favs.findIndex(f => f.key === key);
    if (i >= 0) state.favs.splice(i, 1);
    else state.favs.push({ key, name: b.dataset.name, lat, lon, kind });
    save(); renderFinder();
  });
}
/* ---------- nearby finder cache (localStorage) ---------- */
// Repeat searches from the same ~1km grid are instant and work offline-ish:
// results are saved on every successful search and reused for 7 days.
const FINDER_TTL = 7 * 24 * 3600 * 1000;
function finderCacheKey(kind, lat, lon) { return kind + ":" + lat.toFixed(2) + "," + lon.toFixed(2); }
function readFinderCache() { try { return JSON.parse(localStorage.getItem("ddh-finder") || "{}"); } catch { return {}; } }
function writeFinderCache(c) {
  try {
    const keys = Object.keys(c);
    if (keys.length > 20) { // keep it small: drop oldest beyond 20 grids
      keys.sort((a, b) => (c[a].t || 0) - (c[b].t || 0));
      for (const k of keys.slice(0, keys.length - 20)) delete c[k];
    }
    localStorage.setItem("ddh-finder", JSON.stringify(c));
  } catch {}
}
function finderQuery(kind, lat, lon) {
  return kind === "halal"
    ? `[out:json][timeout:25];(node["amenity"~"^(restaurant|fast_food|cafe)$"]["diet:halal"="yes"](around:20000,${lat},${lon});way["amenity"~"^(restaurant|fast_food|cafe)$"]["diet:halal"="yes"](around:20000,${lat},${lon}););out center 20;`
    : kind === "market"
    ? `[out:json][timeout:25];(node["shop"~"^(butcher|convenience|grocery|supermarket)$"]["diet:halal"="yes"](around:20000,${lat},${lon});way["shop"~"^(butcher|convenience|grocery|supermarket)$"]["diet:halal"="yes"](around:20000,${lat},${lon}););out center 20;`
    // Mosques: catch the two reliable OSM taggings — (1) amenity=place_of_worship
    // + religion=muslim, (2) building=mosque. (A name-regex third clause was
    // tried 2026-10-17 but made the query too heavy for the free servers.)
    : `[out:json][timeout:25];(node["amenity"="place_of_worship"]["religion"="muslim"](around:20000,${lat},${lon});way["amenity"="place_of_worship"]["religion"="muslim"](around:20000,${lat},${lon});node["building"="mosque"](around:20000,${lat},${lon});way["building"="mosque"](around:20000,${lat},${lon}););out center 20;`;
}
function finderFallbackName(kind) {
  return kind === "halal" ? pickL("Helal restoran", "Restaurant halal", "Halal restaurant") : kind === "market" ? pickL("Helal market", "Marché halal", "Halal market") : pickL("Cami", "Mosquée", "Mosque");
}
// Ask every Overpass mirror at once — the first good answer wins, stragglers are cancelled.
// (kumi/private.coffee mirror retired: it answers 3-4x slower than the German cluster.)
async function fetchOverpass(q) {
  // German cluster + French mirror for redundancy. (maps.mail.ru was removed
  // 2026-10-17 — it returned geographically wrong results, e.g. Tunisia/Ghana
  // for a Montreal query.)
  const endpoints = ["https://overpass-api.de/api/interpreter", "https://z.overpass-api.de/api/interpreter", "https://overpass.openstreetmap.fr/api/interpreter"];
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  try {
    return await Promise.any(endpoints.map(ep =>
      fetch(ep + "?data=" + encodeURIComponent(q), { signal: ctrl.signal }).then(async res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        if (!data || !Array.isArray(data.elements)) throw new Error("bad payload");
        return data;
      })
    ));
  } catch { return null; }
  finally { clearTimeout(timer); }
}
function finderItemsFromData(data, lat, lon, fallbackName) {
  const seen = new Set();
  return (data.elements || []).map(el => {
    const mlat = el.lat ?? el.center?.lat, mlon = el.lon ?? el.center?.lon;
    if (mlat == null || mlon == null) return null;
    const d = mosqueDistKm(lat, lon, mlat, mlon);
    // Safety net: the query asks for 20km radius — drop anything absurdly far
    // (a misbehaving mirror once returned Tunisia/Ghana for a Montreal query).
    if (d > 30) return null;
    const key = mlat.toFixed(5) + "," + mlon.toFixed(5);
    if (seen.has(key)) return null;
    seen.add(key);
    return { name: el.tags?.name || fallbackName, lat: mlat, lon: mlon, d };
  }).filter(Boolean).sort((a, b) => a.d - b.d).slice(0, 15);
}
// Merge fresh items into the saved grid: keep old, add new, refresh names. Returns merged list.
function mergeFinderCache(ck, items) {
  const cache = readFinderCache();
  const prev = (cache[ck] && Array.isArray(cache[ck].items)) ? cache[ck].items : [];
  const byKey = new Map(prev.map(m => [m.lat.toFixed(5) + "," + m.lon.toFixed(5), m]));
  for (const m of items) byKey.set(m.lat.toFixed(5) + "," + m.lon.toFixed(5), { name: m.name, lat: m.lat, lon: m.lon });
  let merged = [...byKey.values()];
  if (merged.length > 40) { // keep the saved list bounded: nearest 40 to the grid center
    const [clat, clon] = ck.split(":")[1].split(",").map(Number);
    merged = merged.map(m => ({ ...m, _d: mosqueDistKm(clat, clon, m.lat, m.lon) }))
      .sort((a, b) => a._d - b._d).slice(0, 40).map(({ _d, ...m }) => m);
  }
  cache[ck] = { t: Date.now(), items: merged };
  writeFinderCache(cache);
  return merged;
}
async function nearbySearch(kind) {
  const list = document.getElementById("mosqueList");
  const btn = document.getElementById(kind === "halal" ? "halalFind" : kind === "market" ? "marketFind" : "mosqueFind");
  btn.disabled = true;
  // Highlight the active finder button so it's clear which search ran
  for (const id of ["mosqueFind", "halalFind", "marketFind"]) {
    const b = document.getElementById(id);
    if (b) b.classList.toggle("on", b === btn);
  }
  list.innerHTML = `<p class="hint">${t("mosquesLoading")}</p>`;
  // 0) Locate first: the silently-tracked live position when fresh (<2 min),
  //    else a persistent GPS fix, else the saved place. Everything below (cache key,
  //    distances, server query) uses these coords, so being out and about
  //    correctly misses the home grid instead of showing home mosques with
  //    home distances. Tries hard: 10s getCurrentPosition + 5s tracker wait.
  let lat = state.place.lat, lon = state.place.lon;
  try { startLiveTracking(); } catch {}
  if (livePosFresh(120000)) {
    lat = livePos.lat; lon = livePos.lon;
  } else if (navigator.geolocation) {
    try {
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 10000, maximumAge: 60000 });
      });
      lat = pos.coords.latitude; lon = pos.coords.longitude;
    } catch {
      // getCurrentPosition failed (denied, timeout, or prompt dismissed):
      // give the background tracker up to 5s to produce a fix.
      for (let i = 0; i < 10 && !livePosFresh(120000); i++) {
        await new Promise(r => setTimeout(r, 500));
      }
      if (livePosFresh(120000)) { lat = livePos.lat; lon = livePos.lon; }
      // else fall back to selected place
    }
  }
  // 1) Instant path: show fresh saved results right away, then keep looking
  // in the background — the cache might hold 2-3 while the servers know 10.
  const ck = finderCacheKey(kind, lat, lon);
  const cache = readFinderCache();
  const hit = cache[ck];
  const freshHit = hit && Date.now() - hit.t < FINDER_TTL && Array.isArray(hit.items) && hit.items.length;
  if (freshHit) {
    lastFinder = { kind, stale: false, items: hit.items.map(m => ({ ...m, d: mosqueDistKm(lat, lon, m.lat, m.lon) })).sort((a, b) => a.d - b.d).slice(0, 15) };
    renderFinder();
    btn.disabled = false;
    // Background refresh: don't block the UI, just update if more turn up.
    (async () => {
      try {
        const bgData = await fetchOverpass(finderQuery(kind, lat, lon));
        if (!bgData) return;
        const bgItems = finderItemsFromData(bgData, lat, lon, finderFallbackName(kind));
        if (!bgItems.length) return;
        const before = lastFinder.items.length;
        const merged = mergeFinderCache(ck, bgItems);
        const nowItems = merged.map(m => ({ ...m, d: mosqueDistKm(lat, lon, m.lat, m.lon) })).sort((a, b) => a.d - b.d).slice(0, 15);
        if (nowItems.length > before) {
          lastFinder = { kind, stale: false, items: nowItems };
          // Only re-render if the user is still looking at this finder tab
          if (document.getElementById("panel-mosques") && !document.getElementById("panel-mosques").classList.contains("hidden")) renderFinder();
        }
      } catch {}
    })();
    return;
  }
  // 2) Ask the map servers
  const q = finderQuery(kind, lat, lon);
  const fallbackName = finderFallbackName(kind);
  const noneKey = kind === "halal" ? "halalNone" : kind === "market" ? "marketNone" : "mosquesNone";
  let items = null;
  const maxAttempts = 5;
  for (let attempt = 1; attempt <= maxAttempts && items === null; attempt++) {
    if (attempt > 1) list.innerHTML = `<p class="hint">${t("mosquesRetrying")} (${attempt}/${maxAttempts})</p>`;
    const data = await fetchOverpass(q);
    if (data) {
      items = finderItemsFromData(data, lat, lon, fallbackName);
    } else if (attempt < maxAttempts) {
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
  btn.disabled = false;
  if (items === null) {
    // Network failed everywhere — fall back to the last saved search for this grid, if any
    if (hit && Array.isArray(hit.items) && hit.items.length) {
      lastFinder = { kind, stale: true, items: hit.items.map(m => ({ ...m, d: mosqueDistKm(lat, lon, m.lat, m.lon) })).sort((a, b) => a.d - b.d).slice(0, 15) };
      renderFinder();
      return;
    }
    list.innerHTML = `<p class="hint">${t("mosquesError")}</p><p style="margin-top:10px"><button type="button" class="primary" data-retry="${kind}">${t("tryAgain")}</button></p>`;
    list.querySelector("[data-retry]").onclick = () => nearbySearch(kind);
    return;
  }
  if (!items.length) { list.innerHTML = `<p class="hint">${t(noneKey)}</p>`; return; }
  const merged = mergeFinderCache(ck, items);
  lastFinder = { kind, stale: false, items: merged.map(m => ({ ...m, d: mosqueDistKm(lat, lon, m.lat, m.lon) })).sort((a, b) => a.d - b.d).slice(0, 15) };
  renderFinder();
}
async function findMosques() { return nearbySearch("mosque"); }
async function findHalal() { return nearbySearch("halal"); }
async function findMarkets() { return nearbySearch("market"); }
// Quietly pre-search all three finder kinds for the saved place after the app
// opens, so "Find near me" is instant even on first tap. Best-effort: no GPS
// (would pop a permission prompt), no UI — a failed warm just means the button
// tap fetches normally.
let finderWarmed = false;
async function warmFinderGrid(lat, lon) {
  for (const kind of ["mosque", "halal", "market"]) {
    try {
      const ck = finderCacheKey(kind, lat, lon);
      const hit = readFinderCache()[ck];
      if (hit && Date.now() - hit.t < FINDER_TTL && Array.isArray(hit.items) && hit.items.length) continue;
      const data = await fetchOverpass(finderQuery(kind, lat, lon));
      if (data && Array.isArray(data.elements) && data.elements.length) {
        mergeFinderCache(ck, finderItemsFromData(data, lat, lon, finderFallbackName(kind)));
      }
    } catch {}
    await new Promise(r => setTimeout(r, 3000)); // stagger: polite to the free servers
  }
}
async function warmFinderCache() {
  if (finderWarmed) return;
  finderWarmed = true;
  await warmFinderGrid(state.place.lat, state.place.lon);
  // Then warm the LIVE position too, so the Finder is instant even when he's
  // out: by the time he taps it, the search for his real grid is already done.
  // Only when the silent tracker is actually running (permission granted) —
  // never trigger a location prompt from a background warm-up.
  if (!livePos.watching && !livePosFresh(120000)) return;
  for (let i = 0; i < 20 && !livePosFresh(120000); i++) {
    await new Promise(r => setTimeout(r, 500));
  }
  if (!livePosFresh(120000)) return;
  // Same ~1km grid as the saved place? Already warmed above — skip.
  if (finderCacheKey("mosque", livePos.lat, livePos.lon) ===
      finderCacheKey("mosque", state.place.lat, state.place.lon)) return;
  await warmFinderGrid(livePos.lat, livePos.lon);
}
/* ---------- Live position: silently tracked while the app is open ----------
   The finder (mosques/halal/markets) should "just know" where he is when he
   taps it — no GPS wait, no stale home results. A low-power watchPosition
   (no high accuracy, 30s max age) keeps an in-memory fix fresh; it never
   changes state.place (his chosen city for prayer times) and never leaves
   the device except inside the map queries the finder already makes. */
const livePos = { lat: null, lon: null, t: 0, watching: false };
function livePosFresh(maxAgeMs) {
  return livePos.lat != null && Date.now() - livePos.t < maxAgeMs;
}
async function startLiveTracking() {
  if (!navigator.geolocation || livePos.watching) return;
  try {
    // Never pop a permission prompt silently: only watch when already granted.
    if (navigator.permissions && navigator.permissions.query) {
      const s = await navigator.permissions.query({ name: "geolocation" });
      if (s.state !== "granted") return;
    }
    livePos.watching = true;
    navigator.geolocation.watchPosition(
      pos => {
        livePos.lat = pos.coords.latitude;
        livePos.lon = pos.coords.longitude;
        livePos.t = Date.now();
      },
      () => { /* keep the last fix; a failed watch just means no live update */ },
      { enableHighAccuracy: false, maximumAge: 30000, timeout: 20000 }
    );
  } catch { livePos.watching = false; }
}
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
function visibleTab() {
  const home = document.getElementById("panel-home");
  if (home && !home.classList.contains("hidden")) return "home";
  const ids = ["month", "qibla", "quran", "quiet", "mosques", "settings", "more", "live", "feedback", "learn", "hisnul", "qadha", "resources", "hadith"];
  for (const k of ids) {
    const p = document.getElementById("panel-" + k);
    if (p && !p.classList.contains("hidden")) return k;
  }
  return "home";
}
function showTab(id) {
  const homeIds = ["homeHero", "panel-home"];
  const isHome = (id === "home");
  homeIds.forEach(hid => {
    const el = document.getElementById(hid);
    if (el) el.classList.toggle("hidden", !isHome);
  });
  ["month", "qibla", "quran", "quiet", "mosques", "settings", "more", "live", "feedback", "learn", "hisnul", "qadha", "resources", "hadith", "library", "extra", "holydays", "cards", "khatm", "articles"].forEach(k => {
    const p = document.getElementById("panel-" + k);
    if (p) p.classList.toggle("hidden", k !== id);
  });
  document.querySelectorAll(".bnav button").forEach(b => b.classList.toggle("on",
    b.dataset.goto === id || (b.dataset.goto === "more" && (id === "month" || id === "live" || id === "feedback" || id === "learn" || id === "hisnul" || id === "qadha" || id === "resources" || id === "hadith" || id === "library" || id === "extra" || id === "holydays" || id === "cards" || id === "khatm" || id === "articles"))));
  if (id === "quiet") setTimeout(layoutBeadFrame, 60);
  if (id === "quran") {
    wireQuranPosTracking();
    if (!chapters.length) loadChapters().then(refreshQuranResume);
    else refreshQuranResume();
  }
  if (id === "library") renderLibrary(true);
  if (id === "hisnul" && typeof refreshHsnView === "function") refreshHsnView();
  if (id === "qadha" && typeof renderQadha === "function") renderQadha();
  if (id === "resources" && typeof renderResources === "function") renderResources();
  if (id === "hadith" && typeof renderHadith === "function") renderHadith();
  if (id === "live") loadLiveFrames();
  if (id === "holydays") renderHolyDays();
  if (id === "cards") renderCardsHome();
  if (id === "khatm") renderKhatm();
  if (id === "articles" && typeof renderArticles === "function") renderArticles();
  // New page must open at its top (iOS keeps the previous page's scroll otherwise)
  const toTop = () => {
    window.scrollTo(0, 0);
    document.querySelectorAll("main, main *").forEach(el => { if (el.scrollTop) el.scrollTop = 0; });
  };
  toTop();
  requestAnimationFrame(toTop);
}

/* Watch Live: set the YouTube live-stream iframes' src only when the page is
   first opened, so the app never loads YouTube on visits that don't watch.
   Haram uses the current broadcast's video id — Quran TV's live_stream channel
   shortcut refuses to embed ("video unavailable") although the broadcast itself
   is embeddable (playableInEmbed). If that stream ever restarts under a new id,
   update this one line. Nabawi's channel shortcut works, so it self-updates. */
const LIVE_STREAMS = {
  haram: "https://www.youtube-nocookie.com/embed/eC4LfEVxvKg?rel=0",
  nabawi: "https://www.youtube-nocookie.com/embed/live_stream?channel=UCROKYPep-UuODNwyipe6JMw"
};
function loadLiveFrames() {
  [["liveHaramFrame", "haram"], ["liveNabawiFrame", "nabawi"]].forEach(([fid, key]) => {
    const f = document.getElementById(fid);
    if (f && !f.src && LIVE_STREAMS[key]) f.src = LIVE_STREAMS[key];
  });
}
/* Feedback form: posts straight to the developer's inbox via FormSubmit
   (no account, no server of ours — the app keeps its no-data promise). */
(function () {
  var form = document.getElementById("fbForm");
  if (!form) return;
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var status = document.getElementById("fbStatus");
    if (document.getElementById("fbHoney").value) return; // spam trap filled
    var msg = document.getElementById("fbMsgTxt").value.trim();
    if (!msg) { status.textContent = t("fbEmpty"); return; }
    var btn = document.getElementById("fbSend");
    btn.disabled = true;
    status.textContent = t("fbSending");
    try {
      var res = await fetch("https://formsubmit.co/ajax/db1a521d2eb02414b39d37e9a482c8ef", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "DailyDeenHub — " + document.getElementById("fbTypeSel").value,
          type: document.getElementById("fbTypeSel").value,
          message: msg,
          name: document.getElementById("fbNameInp").value.trim(),
          email: document.getElementById("fbEmailInp").value.trim(),
          _template: "table",
          _captcha: "false"
        })
      });
      if (!res.ok) throw new Error("fb " + res.status);
      status.textContent = t("fbThanks");
      form.reset();
    } catch (err) {
      status.textContent = t("fbError");
    }
    btn.disabled = false;
  });
})();
async function loadChapters() {
  try {
    const res = await fetch(`https://api.quran.com/api/v4/chapters?language=${pickL("tr", "fr", "en")}`);
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
let surahDropOpen = false, chapterFilter = "", surahActive = -1;
/* Surah display name in the selected language: TR/FR use the API's translated
   name (Fâtiha, Bakara… / L'ouverture, La vache…); EN keeps name_simple. */
function surahName(c) {
  if (!c) return "";
  const lang = (typeof state !== "undefined" && state.lang) || "en";
  if (lang !== "en" && c.translated_name && c.translated_name.name) return c.translated_name.name;
  return c.name_simple;
}
function setSurahLabel(id) {
  const c = chapters.find(x => x.id === id);
  const inp = document.getElementById("surahSearch");
  if (c && inp) inp.value = `${c.id}. ${surahName(c)}`;
}
function renderChapters() {
  const q = chapterFilter.toLowerCase();
  const list = document.getElementById("chapterList");
  list.innerHTML = chapters.filter(c => `${c.id} ${c.name_simple} ${c.name_arabic} ${c.translated_name?.name || ""}`.toLowerCase().includes(q)).map(c =>
    `<button type="button" data-id="${c.id}"><b>${c.id}. ${escapeHtml(surahName(c))}</b><small>${escapeHtml(c.name_arabic)} · ${escapeHtml(c.name_simple)} · ${c.verses_count}</small></button>`
  ).join("") || `<p class="hint" style="padding:8px">—</p>`;
  list.classList.toggle("hidden", !surahDropOpen);
  surahActive = -1;
  document.querySelectorAll("#chapterList button").forEach(btn => btn.onclick = () => {
    surahDropOpen = false; chapterFilter = "";
    openChapter(+btn.dataset.id);
    setSurahLabel(+btn.dataset.id);
    list.classList.add("hidden");
    // Drop focus so Android doesn't select the label text in the input
    const inp = document.getElementById("surahSearch");
    if (inp) inp.blur();
  });
}
function surahDropShow(open) {
  surahDropOpen = open;
  document.getElementById("chapterList").classList.toggle("hidden", !open);
}
let chapterToken = 0;
async function openChapter(id, keepAudio = false) {
  setSurahLabel(id);
  currentChapter = id;
  const token = ++chapterToken;
  const chapter = chapters.find(c => c.id === id);
  document.getElementById("surahTitle").textContent = chapter ? surahName(chapter) : `Surah ${id}`;
  const verses = document.getElementById("verses");
  const previousHeight = verses.scrollTop;
  verses.innerHTML = `<p class="hint">${t("loading")}</p>`;
  const translation = pickL(77, 31, 20);
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
  followState.idx = 0; // new chapter starts from the first verse, not a stale position
  chapterData = { id, uthmani: uthmani.verses || [], meal: meal.translations || [], pron: null };
  renderVerses();
  verses.scrollTop = previousHeight;
  refreshQuranResume();
  if (!keepAudio) { const a = document.getElementById("audio"); const p = RECITER_PATHS[state.reciter]; if (p) { a.src = `https://download.quranicaudio.com/qdc/${p}/${id}.mp3`; a.load(); } else a.removeAttribute("src"); }
  if (state.quranView === "pron" || state.quranView === "both") ensurePron().then(() => { if (chapterData && chapterData.id === id) renderVerses(); });
  if (state.quranView === "mushaf") ensureMushaf().then(() => { if (chapterData && chapterData.id === id) renderVerses(); });
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
  if (mode === "mushaf") { renderMushaf(box); }
  else {
  box.innerHTML = chapterData.uthmani.map((v, i) => {
    const pron = chapterData.pron && chapterData.pron[i] ? `<div class="pron">${escapeHtml(chapterData.pron[i])}</div>` : "";
    const tr = `<div class="tr">${plainTranslation(chapterData.meal[i]?.text)}</div>`;
    const extra = mode === "none" ? "" : mode === "pron" ? pron : mode === "both" ? pron + tr : tr;
    return `<article class="verse" data-v="${i}"><div class="kicker">${escapeHtml(v.verse_key)}</div><div class="ar">${escapeHtml(v.text_uthmani)}</div>${extra}</article>`;
  }).join("");
  }
  document.querySelectorAll("#quranViewSeg button").forEach(b => b.classList.toggle("on", b.dataset.qv === mode));
  const fc = document.getElementById("followChk");
  if (fc) fc.checked = !!state.quranFollow;
}
/* ===== Quran reading position: pick up where you left off ===== */
const QPOS_KEY = "ddh-quran-pos";
function saveQuranPos(surah, verse) {
  try { localStorage.setItem(QPOS_KEY, JSON.stringify({ s: surah, v: verse, t: Date.now() })); } catch {}
}
function readQuranPos() {
  try {
    const p = JSON.parse(localStorage.getItem(QPOS_KEY));
    if (p && p.s >= 1 && p.s <= 114 && p.v >= 0) return p;
  } catch {}
  return null;
}
function refreshQuranResume() {
  const btn = document.getElementById("quranResume"), pos = document.getElementById("quranResumePos");
  if (!btn || !pos) return;
  const qp = readQuranPos();
  // Hide when there's nothing saved, or when already reading that chapter
  if (!qp || qp.s === currentChapter || !chapters.length) { btn.classList.add("hidden"); return; }
  const c = chapters.find(x => x.id === qp.s);
  if (!c) { btn.classList.add("hidden"); return; }
  pos.textContent = `${surahName(c)} · ${qp.s}:${qp.v + 1}`;
  btn.classList.remove("hidden");
}
let qposTimer = 0, qposWired = false;
function wireQuranPosTracking() {
  if (qposWired) return; qposWired = true;
  const box = document.getElementById("verses");
  if (!box) return;
  box.addEventListener("scroll", () => {
    clearTimeout(qposTimer);
    qposTimer = setTimeout(() => {
      if (!chapterData || !chapterData.id) return;
      const top = box.getBoundingClientRect().top;
      const arts = box.querySelectorAll("article.verse[data-v]");
      for (const a of arts) {
        if (a.getBoundingClientRect().bottom > top + 60) {
          saveQuranPos(chapterData.id, +a.dataset.v);
          break;
        }
      }
    }, 800);
  }, { passive: true });
  const rb = document.getElementById("quranResume");
  if (rb) rb.onclick = async () => {
    const qp = readQuranPos();
    if (!qp) return;
    await openChapter(qp.s);
    const el = document.querySelector(`#verses article.verse[data-v="${qp.v}"]`);
    if (el) el.scrollIntoView({ block: "start" });
    // Pre-seek the chapter audio so pressing Play resumes where reading stopped
    const aud = document.getElementById("audio");
    const targetChapter = qp.s, targetVerse = qp.v;
    const doSeek = () => {
      try {
        if (currentChapter !== targetChapter) return; // user moved to another surah
        const ws = verseWeights();
        if (!ws || !(aud.duration > 0)) return;
        const total = ws.reduce((a, b) => a + b, 0);
        let acc = 0;
        for (let k = 0; k < targetVerse && k < ws.length; k++) acc += ws[k];
        aud.currentTime = Math.max(0, (acc / total) * aud.duration - 0.5);
      } catch {}
    };
    if (aud.readyState >= 1) doSeek();
    else aud.addEventListener("loadedmetadata", doSeek, { once: true });
    refreshQuranResume();
  };
}
/* ===== Mushaf (book) view: continuous Madani-mushaf pages, word-level Uthmani ===== */
function arDigits(n) {
  return String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]);
}
async function ensureMushaf() {
  if (!chapterData || (chapterData.mushaf && chapterData.mushaf.id === chapterData.id)) return;
  const id = chapterData.id;
  try {
    const j = await (await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?words=true&word_fields=text_uthmani,v1_page&per_page=500`)).json();
    if (!j || !j.verses) return;
    const verses = j.verses.map(v => ({
      num: v.verse_number, juz: v.juz_number,
      words: (v.words || []).map(w => ({ t: w.text_uthmani, page: w.v1_page, line: w.line_number, end: w.char_type_name === "end" }))
    }));
    if (chapterData && chapterData.id === id) chapterData.mushaf = { id, verses };
  } catch { /* renderMushaf shows the loading state and retries */ }
}
function renderMushaf(box) {
  const m = chapterData.mushaf;
  if (!m || m.id !== chapterData.id) {
    box.innerHTML = `<p class="hint">${t("loading")}</p>`;
    ensureMushaf().then(() => {
      if (chapterData && chapterData.mushaf && chapterData.mushaf.id === chapterData.id && state.quranView === "mushaf") renderVerses();
    });
    return;
  }
  const ch = (typeof chapters !== "undefined" ? chapters : []).find(c => c.id === chapterData.id) || {};
  const surahAr = ch.name_arabic || "";
  const pages = [], pageMap = new Map();
  m.verses.forEach((v, vi) => v.words.forEach(w => {
    let pg = pageMap.get(w.page);
    if (!pg) { pg = { page: w.page, juz: v.juz, lines: new Map() }; pageMap.set(w.page, pg); pages.push(pg); }
    if (!pg.lines.has(w.line)) pg.lines.set(w.line, []);
    pg.lines.get(w.line).push({ t: w.t, end: w.end, vi });
  }));
  let h = "";
  pages.forEach((pg, pi) => {
    h += `<section class="mushaf-page">`;
    h += `<div class="mushaf-pagehead"><span>${escapeHtml(t("juzLbl"))} ${arDigits(pg.juz)}</span><span class="mph-surah">${escapeHtml(surahAr)}</span></div>`;
    if (pi === 0) {
      if (surahAr) h += `<div class="mushaf-surahhead"><span>${escapeHtml(surahAr)}</span></div>`;
      if (ch.bismillah_pre) h += `<div class="mushaf-basmala">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>`;
    }
    pg.lines.forEach(words => {
      let line = "", curVi = -1, buf = [];
      const flush = () => {
        if (!buf.length) return;
        line += `<span class="mverse" data-v="${curVi}">` + buf.map(w => w.end
          ? `<span class="ayah-end">${escapeHtml(w.t)}</span>`
          : `<span class="mw">${escapeHtml(w.t)}</span>`).join(" ") + `</span> `;
        buf = [];
      };
      words.forEach(w => { if (w.vi !== curVi) { flush(); curVi = w.vi; } buf.push(w); });
      flush();
      h += `<div class="mline">${line}</div>`;
    });
    h += `<div class="mushaf-pagefoot"><span class="mpg-num">${arDigits(pg.page)}</span></div>`;
    h += `</section>`;
  });
  box.innerHTML = h;
  document.querySelectorAll("#quranViewSeg button").forEach(b => b.classList.toggle("on", b.dataset.qv === "mushaf"));
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
  document.querySelectorAll("#verses .verse.on, #verses .mverse.on").forEach(el => el.classList.remove("on"));
  const els = document.querySelectorAll(`#verses .verse[data-v="${i}"], #verses .mverse[data-v="${i}"]`);
  els.forEach((el, k) => { if (state.quranFollow) el.classList.add("on"); if (k === 0) el.scrollIntoView({ block: "center", behavior: "smooth" }); });
}
function setPlayLabel(txt) { const b = document.getElementById("playBtn"); if (b) b.textContent = txt; }
function stopFollow() {
  if (!followState.playing && !followState.urls) return;
  followState.playing = false;
  followState.single = false;
  document.querySelectorAll("#verses .verse.on, #verses .mverse.on").forEach(el => el.classList.remove("on"));
}
function playVerseAt(i) {
  const audio = document.getElementById("audio");
  const btn = document.getElementById("playBtn");
  const urls = followState.urls || [];
  if (i >= urls.length) { stopFollow(); setPlayLabel(t("play")); return; }
  if (!urls[i]) { playVerseAt(i + 1); return; }
  followState.idx = i;
  followState.playing = true;
  markVerse(i);
  if (audio.getAttribute("src") !== urls[i]) audio.src = urls[i];
  setPlayLabel(t("pause"));
  const p = audio.play();
  if (p) p.catch(() => { followState.playing = false; setPlayLabel(t("play")); toast(t("audioFail")); });
}
async function toggleFollow() {
  if (typeof vmStop === "function") vmStop();
  const audio = document.getElementById("audio");
  const btn = document.getElementById("playBtn");
  if (followState.playing && !audio.paused) { audio.pause(); followState.playing = false; setPlayLabel(t("play")); return; }
  if (followState.playing && audio.paused && audio.getAttribute("src")) { followState.playing = true; setPlayLabel(t("pause")); audio.play().catch(() => {}); return; }
  document.getElementById("radioAudio").pause();
  const rb = document.getElementById("radioBtn"); if (rb) rb.textContent = t("radioPlay");
  setPlayLabel(t("loading"));
  try { await ensureVerseAudio(); } catch { setPlayLabel(t("play")); return toast(t("audioFail")); }
  playVerseAt(followState.idx || 0);
}
document.getElementById("audio").addEventListener("play", () => {
  const radio = document.getElementById("radioAudio"); if (radio) radio.pause();
});
document.getElementById("audio").addEventListener("ended", () => {
  if (!followState.playing) return;
  if (followState.single) { stopFollow(); setPlayLabel(t("play")); return; }
  playVerseAt(followState.idx + 1);
});
/* ===== Auto-scroll for full-chapter audio (no shading) =====
   When "Follow recitation" is OFF, the smooth chapter MP3 plays but nothing
   scrolls. Estimate the current verse from playback position, weighted by
   verse word count, and gently scroll to it — without the .on shading. */
let chapWeights = null, chapWeightsKey = "";
let lastScrollVerse = -1, lastManualScroll = 0, lastShadeVerse = -1;
// Verse-timing model: words + a pause allowance per verse. Reciters pause
// briefly between verses (waqf); ignoring it makes the estimate run ahead of
// the actual recitation. Expressed in word-equivalents (~0.5s per word).
const VERSE_PAUSE_WORDS = 3;
// Conservative lag so the shade trails a hair behind instead of jumping ahead —
// a shade that changes just as you hear the verse feels synced; one that jumps
// early feels broken.
const SHADE_LAG_SEC = 1.2;
function verseWeights() {
  if (!chapterData || !chapterData.uthmani || !chapterData.uthmani.length) return null;
  if (chapWeightsKey === chapterData.id && chapWeights) return chapWeights;
  chapWeights = chapterData.uthmani.map(v =>
    Math.max(String(v.text_uthmani || "").trim().split(/\s+/).length, 1) + VERSE_PAUSE_WORDS);
  chapWeightsKey = chapterData.id;
  lastScrollVerse = -1;
  return chapWeights;
}
function verseAtTime(cur, dur) {
  const ws = verseWeights();
  if (!ws || !(dur > 0)) return -1;
  const total = ws.reduce((a, b) => a + b, 0);
  let acc = 0;
  const target = (cur / dur) * total;
  for (let i = 0; i < ws.length; i++) { acc += ws[i]; if (target < acc) return i; }
  return ws.length - 1;
}
(function () {
  const box = document.getElementById("verses");
  const audio = document.getElementById("audio");
  if (!box || !audio) return;
  const markManual = () => { lastManualScroll = Date.now(); };
  box.addEventListener("wheel", markManual, { passive: true });
  box.addEventListener("touchmove", markManual, { passive: true });
  audio.addEventListener("play", () => { lastScrollVerse = -1; });
  audio.addEventListener("seeked", () => { lastScrollVerse = -1; });
  audio.addEventListener("timeupdate", () => {
    try {
      if (followState.playing) return; // per-verse mode shades/scrolls itself
      if (audio.paused || !(audio.duration > 0)) return;
      const i = verseAtTime(Math.max(0, audio.currentTime - SHADE_LAG_SEC), audio.duration);
      if (i < 0) return;
      // Visual shade follows the recitation when the toggle is on — audio untouched
      if (state.quranFollow && i !== lastShadeVerse) {
        lastShadeVerse = i;
        box.querySelectorAll(".verse.on, .mverse.on").forEach(el => el.classList.remove("on"));
        box.querySelectorAll(`.verse[data-v="${i}"], .mverse[data-v="${i}"]`).forEach(se => se.classList.add("on"));
      }
      if (Date.now() - lastManualScroll < 10000) return; // user is reading, don't yank
      if (i === lastScrollVerse) return;
      lastScrollVerse = i;
      const el = box.querySelector(`.verse[data-v="${i}"], .mverse[data-v="${i}"]`);
      if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
    } catch { /* never break playback */ }
  });
})();
/* Verse menu: long-press (touch) or right-click a verse -> "Play from here"
   (per-verse audio from that ayah onward, auto-advancing) or "Play this verse". */
let vmenuTarget = -1;
function verseMenuHide() { const m = document.getElementById("verseMenu"); if (m) m.classList.add("hidden"); }
function verseMenuShow(i, x, y) {
  vmenuTarget = i;
  const m = document.getElementById("verseMenu");
  m.style.left = "0px"; m.style.top = "0px";
  m.classList.remove("hidden");
  const w = m.offsetWidth, h = m.offsetHeight;
  m.style.left = Math.max(8, Math.min(x, window.innerWidth - w - 8)) + "px";
  m.style.top = Math.max(8, Math.min(y, window.innerHeight - h - 8)) + "px";
}
async function vmenuPlay(single) {
  verseMenuHide();
  const i = vmenuTarget;
  if (!(i >= 0)) return;
  if (typeof svStop === "function") svStop();
  setPlayLabel(t("loading"));
  try { await ensureVerseAudio(); } catch { setPlayLabel(t("play")); return toast(t("audioFail")); }
  followState.single = !!single;
  playVerseAt(i);
}
document.getElementById("vmenuFrom").onclick = () => vmenuPlay(false);
document.getElementById("vmenuOne").onclick = () => vmenuPlay(true);
(function () {
  const box = document.getElementById("verses");
  if (!box) return;
  let lpTimer = 0, lpFiredAt = 0;
  const verseOf = e => e.target.closest(".verse, .mverse");
  box.addEventListener("contextmenu", e => {
    const v = verseOf(e);
    if (!v) return;
    e.preventDefault();
    if (Date.now() - lpFiredAt < 900) return;
    verseMenuShow(+v.dataset.v, e.clientX, e.clientY);
  });
  box.addEventListener("touchstart", e => {
    if (e.touches.length !== 1) return;
    const v = verseOf(e);
    if (!v) return;
    const t = e.touches[0], vi = +v.dataset.v;
    clearTimeout(lpTimer);
    lpTimer = setTimeout(() => { lpFiredAt = Date.now(); verseMenuShow(vi, t.clientX, t.clientY); }, 550);
  }, { passive: true });
  ["touchend", "touchmove", "touchcancel"].forEach(ev => box.addEventListener(ev, () => clearTimeout(lpTimer), { passive: true }));
})();
document.addEventListener("pointerdown", e => {
  const m = document.getElementById("verseMenu");
  if (m && !m.classList.contains("hidden") && !e.target.closest("#verseMenu")) verseMenuHide();
}, true);
document.addEventListener("keydown", e => { if (e.key === "Escape") verseMenuHide(); });

/* ===== Extra reminders (More tile): same .rrow look as Settings > Reminders ===== */
const X_MIN_OPTS = [15, 30, 45, 60, 90, 120, 180];
function xRow(id, nameKey, anchorKey, hasEve) {
  const ex = normalizeExtra(state.extraRemind)[id];
  const opts = X_MIN_OPTS.map(n => `<option value="${n}"${ex.mins === n ? " selected" : ""}>${n} ${t("minBefore")}</option>`).join("");
  const eve = hasEve
    ? `<label class="xrow-eve"><input type="checkbox" data-xeve="${id}"${ex.eve ? " checked" : ""} /><span>${t("xFastEve")}</span></label>`
    : "";
  return `<div class="rrow"><span>${t(nameKey)} <small class="muted">${t(anchorKey)}</small></span><input type="checkbox" data-xon="${id}"${ex.on ? " checked" : ""} aria-label="${t(nameKey)}" /><select data-xmins="${id}" class="field"${ex.on ? "" : " disabled"}>${opts}</select></div>${eve}`;
}
function renderExtraRows() {
  const box = document.getElementById("extraRows");
  if (!box) return;
  box.innerHTML =
    xRow("sahur", "xSahur", "xBeforeFajr") +
    xRow("tahajjud", "xTahajjud", "xBeforeFajr") +
    xRow("fast", "xFast", "xBeforeFajr", true) +
    xRow("jumuah", "xJumuah", "xBeforeDhuhr");
  box.querySelectorAll("input[data-xon]").forEach(cb => {
    cb.onchange = () => {
      const id = cb.dataset.xon;
      state.extraRemind = normalizeExtra(state.extraRemind);
      state.extraRemind[id].on = cb.checked;
      const sel = box.querySelector(`select[data-xmins="${id}"]`);
      if (sel) sel.disabled = !cb.checked;
      save();
    };
  });
  box.querySelectorAll("select[data-xmins]").forEach(sel => {
    sel.onchange = () => {
      state.extraRemind = normalizeExtra(state.extraRemind);
      state.extraRemind[sel.dataset.xmins].mins = +sel.value;
      save();
    };
  });
  box.querySelectorAll("input[data-xeve]").forEach(cb => {
    cb.onchange = () => {
      state.extraRemind = normalizeExtra(state.extraRemind);
      state.extraRemind[cb.dataset.xeve].eve = cb.checked;
      save();
    };
  });
}
let extraFired = {};
function checkExtraReminders(slots, nowMin, now) {
  // Same dedup rule as the prayer reminder: only a visible tab fires locally,
  // otherwise the push notification handles it (never both).
  if (document.visibilityState !== "visible") return;
  const ex = normalizeExtra(state.extraRemind);
  if (!ex.sahur.on && !ex.tahajjud.on && !ex.fast.on && !ex.jumuah.on) return;
  const fajr = slots.find(s => s.key === "Fajr"), dhuhr = slots.find(s => s.key === "Dhuhr");
  if (!fajr || !dhuhr) return;
  const wd = new Date(now.y, now.m - 1, now.d).getDay(); // 0=Sun..6=Sat, place's date
  const dateStr = `${now.y}-${String(now.m).padStart(2, "0")}-${String(now.d).padStart(2, "0")}`;
  const fire = (id, atMin, title) => {
    const key = dateStr + "-" + id;
    if (atMin >= 0 && nowMin >= atMin && nowMin < atMin + 1 && !extraFired[key]) {
      extraFired[key] = 1;
      playAlert();
      showLocalNotification(title);
    }
  };
  const inMin = n => t("inMinutes").replace("{n}", n);
  if (ex.sahur.on) fire("sahur", fajr.min - ex.sahur.mins, `${t("xSahur")} — ${inMin(ex.sahur.mins)}`);
  if (ex.tahajjud.on) fire("tahajjud", fajr.min - ex.tahajjud.mins, `${t("xTahajjud")} — ${inMin(ex.tahajjud.mins)}`);
  if (ex.fast.on && (wd === 1 || wd === 4))
    fire("fast", fajr.min - ex.fast.mins, `${t("xFast")} — ${inMin(ex.fast.mins)}`);
  if (ex.fast.on && ex.fast.eve && (wd === 0 || wd === 3))
    fire("fastEve", 21 * 60, t("xFastEveTitle"));
  if (ex.jumuah.on && wd === 5) fire("jumuah", dhuhr.min - ex.jumuah.mins, `${t("xJumuah")} — ${inMin(ex.jumuah.mins)}`);
}

/* ===== Holy days (More tile): Diyanet-based 2026-2027 list, EN/TR ===== */
const HOLY_DAYS = [
  { d: "2026-12-10", en: "The three holy months begin", tr: "Üç ayların başlangıcı", fr: "Début des trois mois sacrés", h: "Receb 1, 1448", fr_h: "Rajab 1, 1448" },
  { d: "2026-12-10", en: "Raghaib Night", tr: "Regaib Kandili", fr: "Nuit de Raghaïb", h: "Receb 1, 1448", fr_h: "Rajab 1, 1448" },
  { d: "2027-01-04", en: "Mi'raj Night", tr: "Miraç Kandili", fr: "Nuit du Mi'raj", h: "Receb 27, 1448", fr_h: "Rajab 27, 1448" },
  { d: "2027-01-22", en: "Night of Bara'ah", tr: "Berat Kandili", fr: "Nuit de Bara'ah", h: "Şaban 14, 1448", fr_h: "Cha'ban 14, 1448" },
  { d: "2027-02-08", en: "Ramadan begins", tr: "Ramazan başlangıcı", fr: "Début du Ramadan", h: "Ramazan 1, 1448", fr_h: "Ramadan 1, 1448" },
  { d: "2027-03-05", en: "Night of Decree", tr: "Kadir Gecesi", fr: "Nuit du Destin", h: "Ramazan 27, 1448", fr_h: "Ramadan 27, 1448" },
  { d: "2027-03-08", en: "Eid al-Fitr Eve", tr: "Ramazan Bayramı arefesi", fr: "Veille de l'Aïd al-Fitr", h: "Ramazan 29, 1448", fr_h: "Ramadan 29, 1448" },
  { d: "2027-03-09", en: "Eid al-Fitr (Day 1)", tr: "Ramazan Bayramı 1. gün", fr: "Aïd al-Fitr (Jour 1)", h: "Şevval 1, 1448", fr_h: "Chawwal 1, 1448" },
  { d: "2027-03-10", en: "Eid al-Fitr (Day 2)", tr: "Ramazan Bayramı 2. gün", fr: "Aïd al-Fitr (Jour 2)", h: "Şevval 2, 1448", fr_h: "Chawwal 2, 1448" },
  { d: "2027-03-11", en: "Eid al-Fitr (Day 3)", tr: "Ramazan Bayramı 3. gün", fr: "Aïd al-Fitr (Jour 3)", h: "Şevval 3, 1448", fr_h: "Chawwal 3, 1448" },
  { d: "2027-05-15", en: "Eid al-Adha Eve", tr: "Kurban Bayramı arefesi", fr: "Veille de l'Aïd al-Adha", h: "Zilhicce 9, 1448", fr_h: "Dhou al-hijja 9, 1448" },
  { d: "2027-05-16", en: "Eid al-Adha (Day 1)", tr: "Kurban Bayramı 1. gün", fr: "Aïd al-Adha (Jour 1)", h: "Zilhicce 10, 1448", fr_h: "Dhou al-hijja 10, 1448" },
  { d: "2027-05-17", en: "Eid al-Adha (Day 2)", tr: "Kurban Bayramı 2. gün", fr: "Aïd al-Adha (Jour 2)", h: "Zilhicce 11, 1448", fr_h: "Dhou al-hijja 11, 1448" },
  { d: "2027-05-18", en: "Eid al-Adha (Day 3)", tr: "Kurban Bayramı 3. gün", fr: "Aïd al-Adha (Jour 3)", h: "Zilhicce 12, 1448", fr_h: "Dhou al-hijja 12, 1448" },
  { d: "2027-05-19", en: "Eid al-Adha (Day 4)", tr: "Kurban Bayramı 4. gün", fr: "Aïd al-Adha (Jour 4)", h: "Zilhicce 13, 1448", fr_h: "Dhou al-hijja 13, 1448" },
  { d: "2027-06-06", en: "Islamic New Year (1449)", tr: "Hicri yılbaşı (1449)", fr: "Nouvel An islamique (1449)", h: "Muharrem 1, 1449", fr_h: "Mouharram 1, 1449" },
  { d: "2027-06-15", en: "Day of Ashura", tr: "Aşure günü", fr: "Jour de l'Achoura", h: "Muharrem 10, 1449", fr_h: "Mouharram 10, 1449" },
  { d: "2027-08-13", en: "Mawlid — Prophet's birthday", tr: "Mevlid Kandili", fr: "Mawlid — Naissance du Prophète", h: "Rebiülevvel 12, 1449", fr_h: "Rabi' al-awwal 12, 1449" },
  { d: "2027-11-29", en: "The three holy months begin", tr: "Üç ayların başlangıcı", fr: "Début des trois mois sacrés", h: "Receb 1, 1449", fr_h: "Rajab 1, 1449" },
  { d: "2027-12-02", en: "Raghaib Night", tr: "Regaib Kandili", fr: "Nuit de Raghaïb", h: "Receb 4, 1449", fr_h: "Rajab 4, 1449" },
  { d: "2027-12-24", en: "Mi'raj Night", tr: "Miraç Kandili", fr: "Nuit du Mi'raj", h: "Receb 27, 1449", fr_h: "Rajab 27, 1449" },
];
function renderHolyDays() {
  const box = document.getElementById("holyDaysList");
  if (!box) return;
  const lang = (typeof state !== "undefined" && state.lang) || "en";
  const loc = pickL("tr-TR", "fr-FR", "en-US", lang);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const items = HOLY_DAYS.map(e => ({ ...e, date: new Date(e.d + "T12:00:00") }));
  const upcoming = items.filter(e => e.date >= today);
  let html = "";
  if (upcoming.length) {
    const nx = upcoming[0];
    const days = Math.floor((nx.date - today) / 86400000);
    const when = days === 0 ? t("holyDaysToday") : days === 1 ? t("holyDaysTomorrow") : days + " " + t("holyDaysInDays");
    html += `<div class="rrow hd-next"><span>🌙 <b>${esc(nx[lang] || nx.en)}</b><br><span class="dim">${esc(nx.date.toLocaleDateString(loc, { day: "numeric", month: "long", year: "numeric", weekday: "long" }))} · ${esc(lang === "fr" ? (nx.fr_h || nx.h) : nx.h)}</span></span><span class="hd-when">${esc(when)}</span></div>`;
  }
  let lastYear = "";
  items.forEach(e => {
    const y = e.d.slice(0, 4);
    if (y !== lastYear) { html += `<div class="hd-year">${y}</div>`; lastYear = y; }
    const past = e.date < today;
    const isNext = upcoming.length && e.d === upcoming[0].d && e[lang] === upcoming[0][lang];
    html += `<div class="rrow${past ? " hd-past" : ""}${isNext ? " hd-isnext" : ""}"><span><b>${esc(e[lang] || e.en)}</b><br><span class="dim">${esc(lang === "fr" ? (e.fr_h || e.h) : e.h)}</span></span><span class="hd-date">${esc(e.date.toLocaleDateString(loc, { day: "numeric", month: "short", weekday: "short" }))}</span></div>`;
  });
  box.innerHTML = html;
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

/* ===== Greeting cards v2: direct manipulation on the image ===== */
const CARD_BGS = ["mosque-sunset.jpg", "lanterns.jpg", "kaaba-night.jpg", "pattern-emerald.jpg", "crescent-lake.jpg", "quran-light.jpg", "dome-sky.jpg", "desert-dunes.jpg", "mosque-dawn.jpg", "pattern-navy.jpg", "dunes-night.jpg", "window-light.jpg", "arabesque-dark.jpg", "olive-morning.jpg", "lake-dusk.jpg", "tasbih-dark.jpg", "wall-carved.jpg", "garden-fountain.jpg", "lanterns-bokeh.jpg", "quran-window.jpg", "prayer-mat.jpg", "milky-way.jpg", "marble-hall.jpg", "rain-window.jpg", "red-roses-on-white-1.webp", "red-roses-1.webp", "end-of-ramadan-1.webp", "roses-dark-red.jpg", "roses-night.jpg", "roses-white-dark.jpg", "rose-petals.jpg", "roses-dusk.jpg", "rose-arch.jpg", "rose-single.jpg", "roses-rain.jpg", "ramadan-crescent.webp", "eid-moon-desert.webp", "rose-single-2.webp", "roses-bunch.webp", "birds-day.webp", "birds-colorful.webp", "bird-lilac.webp", "bird-roller.webp", "img-b6b15b4.webp", "img-20261015-a.webp", "img-20261015-b.webp", "img-20261015-c.webp", "img-20261015-d.webp", "img-20261015-e.webp"];
/* Ready-made shareable greetings: [file, category]. Categories: friday, eid. */
const GREETINGS = [
  ["greetings/hayirli-cumalar-1.webp", "friday"],
  ["greetings/hayirli-cumalar-2.webp", "friday"],
  ["greetings/hayirli-cumalar-3.webp", "friday"],
  ["greetings/hayirli-cumalar-4.webp", "friday"],
  ["greetings/hayirli-cumalar-5.webp", "friday"],
  ["greetings/hayirli-cumalar-6.webp", "friday"],
  ["greetings/happy-friday-in-islam-1.webp", "friday"],
  ["greetings/happy-friday-in-islam-2.webp", "friday"],
  ["greetings/happy-friday-in-islam-3.webp", "friday"],
  ["greetings/happy-friday-in-islam-4.webp", "friday"],
  ["greetings/png-transparent-friday-jumu-ah-islam-ar-friday-jumu-ah-islam.webp", "friday"],
  ["greetings/pngtree-eid-mubarak-and-ramadan-kareem.webp", "eid"],
  ["greetings/pngtree-nice-eid-mubarak.webp", "eid"],
];
function renderGreetings() {
  const wrap = document.getElementById("greetGallery");
  if (!wrap) return;
  const lang = state.lang || "en";
  const isFriday = new Date().getDay() === 5;
  // Friday images first on Fridays, Eid images surface near holy days
  const sorted = [...GREETINGS].sort((a, b) => {
    if (isFriday && a[1] === "friday" && b[1] !== "friday") return -1;
    if (isFriday && b[1] === "friday" && a[1] !== "friday") return 1;
    return 0;
  });
  const SHARE_ICON = `<svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>`;
  const BTN_COLORS = ["#3b82f6", "#22c55e", "#a855f7", "#f87171", "#f59e0b", "#06b6d4"];
  wrap.innerHTML = sorted.map(([f], i) =>
    `<div class="greet-item"><img src="/cards/${f}" alt="" loading="lazy"><button type="button" class="greet-share" data-greet="${f}" style="background:${BTN_COLORS[i % BTN_COLORS.length]}" aria-label="${esc(t("cardsShare"))}">${SHARE_ICON} ${esc(t("cardsShare"))}</button></div>`
  ).join("");
  wrap.querySelectorAll("[data-greet]").forEach(b => b.onclick = () => shareGreeting(b.dataset.greet));
}
async function shareGreeting(file) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "/cards/" + file;
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  const cv = document.createElement("canvas");
  cv.width = img.naturalWidth; cv.height = img.naturalHeight;
  const cx = cv.getContext("2d");
  cx.drawImage(img, 0, 0);
  // watermark: clearly visible "dailydeenhub" bottom-left
  const fs = Math.max(14, Math.round(cv.width / 36));
  cx.font = `400 ${fs}px sans-serif`;
  cx.textBaseline = "bottom";
  const pad = Math.round(fs * 0.7);
  cx.shadowColor = "rgba(0,0,0,0.85)"; cx.shadowBlur = Math.round(fs / 3);
  cx.fillStyle = "#ffffff";
  cx.fillText("dailydeenhub", pad, cv.height - pad);
  cx.shadowBlur = 0;
  const blob = await new Promise(res => cv.toBlob(res, "image/jpeg", 0.92));
  const dl = new File([blob], "dailydeenhub-greeting.jpg", { type: "image/jpeg" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [dl] })) {
      await navigator.share({ files: [dl], title: t("cardsTile") });
      cardToast(t("cardsShared"));
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "dailydeenhub-greeting.jpg";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      cardToast(t("cardsShareFail"));
    }
  } catch (e) {
    if (!e || e.name !== "AbortError") cardToast(t("cardsShareFail"));
  }
}
const CARD_FONTS = {
  fraunces:  { stack: "Fraunces, Georgia, serif", weight: 400, label: "Fraunces" },
  frauncesB: { stack: "Fraunces, Georgia, serif", weight: 700, label: "Fraunces Bold" },
  outfit:    { stack: "Outfit, system-ui, sans-serif", weight: 400, label: "Outfit" },
  outfitB:   { stack: "Outfit, system-ui, sans-serif", weight: 700, label: "Outfit Bold" },
  amiri:     { stack: "Amiri, serif", weight: 400, label: "Amiri" },
  amiriB:    { stack: "Amiri, serif", weight: 700, label: "Amiri Bold" },
  serif:     { stack: "Georgia, 'Times New Roman', serif", weight: 400, label: "Georgia" },
  explora:   { stack: "Explora, Georgia, serif", weight: 400, label: "Explora" },
  felipa:    { stack: "Felipa, cursive", weight: 400, label: "Felipa" },
  tangerine: { stack: "Tangerine, cursive", weight: 400, label: "Tangerine" },
  tangerineB:{ stack: "Tangerine, cursive", weight: 700, label: "Tangerine Bold" },
  reemkufi:  { stack: "'Reem Kufi', serif", weight: 400, label: "Reem Kufi" },
  reemkufiB: { stack: "'Reem Kufi', serif", weight: 700, label: "Reem Kufi Bold" },
  reemkufiink:{ stack: "'Reem Kufi Ink', serif", weight: 400, label: "Reem Kufi Ink" },
  qahiri:    { stack: "Qahiri, serif", weight: 400, label: "Qahiri" }
};
const CARD_FONT_OPTS = Object.keys(CARD_FONTS);
const cardState = { bg: null, font: "fraunces", sizeFrac: 0.085, color: "#ffffff", pos: { x: 0.5, y: 0.30 }, widthFrac: 0.96, bright: 1, blur: 0 };
function cardTextEl() { return document.getElementById("cardText"); }
function cardStageEl() { return document.getElementById("cardStage"); }
function cardApplyText() {
  const el = cardTextEl(), st = cardStageEl();
  if (!el || !st) return;
  el.style.left = (cardState.pos.x * 100) + "%";
  el.style.top = (cardState.pos.y * 100) + "%";
  el.style.fontSize = (st.clientWidth * cardState.sizeFrac) + "px";
  el.style.width = (cardState.widthFrac * 100) + "%";
  el.style.maxWidth = "none";
  el.style.fontFamily = (CARD_FONTS[cardState.font] || CARD_FONTS.fraunces).stack;
  el.style.fontWeight = (CARD_FONTS[cardState.font] || CARD_FONTS.fraunces).weight;
  el.style.color = cardState.color;
  cardPositionHandles();
}
function cardPositionHandles() {
  const el = cardTextEl(), st = cardStageEl();
  const hl = document.getElementById("cardWH"), hr = document.getElementById("cardWHr");
  if (!el || !st || !hl || !hr) return;
  const active = document.activeElement === el || el.dataset.touched === "1";
  hl.classList.toggle("hidden", !active);
  hr.classList.toggle("hidden", !active);
  if (!active) return;
  const leftPct = cardState.pos.x * 100 - cardState.widthFrac * 50;
  const rightPct = cardState.pos.x * 100 + cardState.widthFrac * 50;
  const topPct = cardState.pos.y * 100;
  hl.style.left = leftPct + "%"; hl.style.top = topPct + "%";
  hr.style.left = rightPct + "%"; hr.style.top = topPct + "%";
}
function cardBindWidthHandles() {
  const st = cardStageEl(), tel = cardTextEl();
  const hl = document.getElementById("cardWH"), hr = document.getElementById("cardWHr");
  if (!st || !tel || !hl || !hr || hl.dataset.bound) return;
  hl.dataset.bound = "1";
  let wdrag = null;
  const startW = (e, side) => {
    const t = e.touches ? e.touches[0] : e;
    const r = st.getBoundingClientRect();
    wdrag = { side, sx: (t.clientX - r.left) / r.width, w0: cardState.widthFrac };
    e.preventDefault(); e.stopPropagation();
  };
  const moveW = e => {
    if (!wdrag) return;
    const t = e.touches ? e.touches[0] : e;
    const r = st.getBoundingClientRect();
    const px = (t.clientX - r.left) / r.width;
    const dx = px - wdrag.sx;
    const delta = wdrag.side === "r" ? dx * 2 : -dx * 2;
    cardState.widthFrac = Math.min(0.98, Math.max(0.3, wdrag.w0 + delta));
    cardApplyText();
    e.preventDefault();
  };
  const endW = () => { wdrag = null; };
  [hl, hr].forEach((h, i) => {
    const side = i === 0 ? "l" : "r";
    h.addEventListener("touchstart", e => startW(e, side), { passive: false });
    h.addEventListener("mousedown", e => startW(e, side));
  });
  document.addEventListener("touchmove", moveW, { passive: false });
  document.addEventListener("mousemove", moveW);
  document.addEventListener("touchend", endW);
  document.addEventListener("mouseup", endW);
  tel.addEventListener("touchstart", () => { tel.dataset.touched = "1"; cardPositionHandles(); }, { passive: true });
  tel.addEventListener("blur", () => { setTimeout(cardPositionHandles, 200); });
}
function cardApplyBg() {
  const img = document.getElementById("cardBgImg");
  if (!img) return;
  img.style.filter = `brightness(${cardState.bright}) blur(${cardState.blur}px)`;
}
function cardMsgFor(hd, lang) {
  const nm = (hd[lang] || hd.en || "").toLowerCase();
  const isKandil = /kandil|mi'raj|bara'ah|raghaib|qadr|mawlid|decree|night|nuit|raghaïb|destin/i.test(nm);
  const isFitr = /fitr|ramazan bayram|aïd al-fitr/i.test(nm);
  const isAdha = /adha|kurban|aïd al-adha/i.test(nm);
  const isRamadan = /ramadan begins|ramazan ba|début du ramadan/i.test(nm);
  if (lang === "tr") {
    if (isFitr) return ["Ramazan Bayramınız mübarek olsun", "Hayırlı bayramlar"];
    if (isAdha) return ["Kurban Bayramınız mübarek olsun", "Hayırlı bayramlar"];
    if (isRamadan) return ["Hayırlı Ramazanlar", "Ramazanınız mübarek olsun"];
    if (isKandil) return ["Kandiliniz mübarek olsun", "Dualarınız kabul olsun"];
    return ["Mübarek olsun", "Hayırlı günler"];
  }
  if (lang === "fr") {
    if (isFitr) return ["Aïd Moubarak", "Joyeux Aïd al-Fitr"];
    if (isAdha) return ["Aïd Moubarak", "Joyeux Aïd al-Adha"];
    if (isRamadan) return ["Ramadan Moubarak", "Bon Ramadan"];
    if (isKandil) return ["Nuit bénie", "Qu'Allah accepte vos prières"];
    return ["Journée bénie", "Avec nos meilleurs vœux"];
  }
  if (isFitr || isAdha) return ["Eid Mubarak", "Blessed Eid"];
  if (isRamadan) return ["Blessed Ramadan", "Ramadan Kareem"];
  if (isKandil) return ["Blessed night", "May your prayers be accepted"];
  return ["Blessed day", "With warm wishes"];
}
function renderCardsHome() {
  const gal = document.getElementById("cardsGallery");
  if (!gal) return;
  renderGreetings();
  document.getElementById("cardsGalleryWrap").classList.remove("hidden");
  document.getElementById("cardsEditor").classList.add("hidden");
  gal.innerHTML = CARD_BGS.map(f => `<button type="button" class="card-thumb" data-bg="${f}"><img src="/cards/${f}" alt="" loading="lazy" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/cards/${f}?r='+Date.now();}"></button>`).join("");
  gal.querySelectorAll("[data-bg]").forEach(b => b.onclick = () => openCardEditor(b.dataset.bg));
  const holy = document.getElementById("cardsHoly");
  const lang = state.lang || "en";
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const up = HOLY_DAYS.map(e => ({ ...e, date: new Date(e.d + "T12:00:00") })).filter(e => e.date >= today && (e.date - today) / 86400000 <= 30)[0];
  holy.innerHTML = up ? `<div class="rrow hd-next"><span>💌 <b>${esc(t("cardsForDay"))} ${esc(up[lang] || up.en)}</b></span></div>` : "";
}
function openCardEditor(bg) {
  cardState.bg = bg;
  const lang = state.lang || "en";
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const up = HOLY_DAYS.map(e => ({ ...e, date: new Date(e.d + "T12:00:00") })).filter(e => e.date >= today)[0];
  const sugg = up ? cardMsgFor(up, lang) : pickL(["Kandiliniz mübarek olsun"], ["Journée bénie"], ["Blessed day"], lang);
  document.getElementById("cardsGalleryWrap").classList.add("hidden");
  document.getElementById("cardsEditor").classList.remove("hidden");
  const img = document.getElementById("cardBgImg");
  img.src = "/cards/" + bg;
  const tel = cardTextEl();
  tel.textContent = sugg[0];
  cardState.pos = { x: 0.5, y: 0.30 };
  cardApplyBg();
  // apply after layout so clientWidth is real
  requestAnimationFrame(cardApplyText);
  bindCardStage();
  cardBindWidthHandles();
  closeCardSheet();
  document.getElementById("cardPlusMenu").classList.add("hidden");
  window.scrollTo(0, 0);
}
function bindCardStage() {
  const st = cardStageEl(), tel = cardTextEl();
  if (st.dataset.bound) return;
  st.dataset.bound = "1";
  // --- drag + pinch on the text ---
  let drag = null, pinch = null;
  const posOf = t => {
    const r = st.getBoundingClientRect();
    return { x: (t.clientX - r.left) / r.width, y: (t.clientY - r.top) / r.height };
  };
  tel.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      const p = posOf(e.touches[0]);
      drag = { sx: p.x, sy: p.y, ox: cardState.pos.x, oy: cardState.pos.y, moved: false };
    } else if (e.touches.length === 2) {
      pinch = { d: Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY), s0: cardState.sizeFrac };
      drag = null;
      e.preventDefault();
    }
  }, { passive: true });
  tel.addEventListener("touchmove", e => {
    if (pinch && e.touches.length === 2) {
      e.preventDefault();
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      if (pinch.d > 0) {
        cardState.sizeFrac = Math.min(0.22, Math.max(0.04, pinch.s0 * d / pinch.d));
        cardApplyText();
      }
      return;
    }
    if (drag && e.touches.length === 1) {
      const p = posOf(e.touches[0]);
      if (Math.abs(p.x - drag.sx) + Math.abs(p.y - drag.sy) > 0.02) drag.moved = true;
      if (drag.moved) {
        e.preventDefault();
        cardState.pos.x = Math.min(0.95, Math.max(0.05, drag.ox + (p.x - drag.sx)));
        cardState.pos.y = Math.min(0.95, Math.max(0.05, drag.oy + (p.y - drag.sy)));
        cardApplyText();
      }
    }
  }, { passive: false });
  tel.addEventListener("touchend", e => {
    if (e.touches.length === 0) { drag = null; pinch = null; }
    else if (e.touches.length === 1) pinch = null;
  });
  // mouse drag for desktop
  tel.addEventListener("mousedown", e => {
    const p = posOf(e);
    drag = { sx: p.x, sy: p.y, ox: cardState.pos.x, oy: cardState.pos.y, moved: false };
    const mv = ev => {
      const q = posOf(ev);
      if (Math.abs(q.x - drag.sx) + Math.abs(q.y - drag.sy) > 0.02) drag.moved = true;
      if (drag.moved) {
        cardState.pos.x = Math.min(0.95, Math.max(0.05, drag.ox + (q.x - drag.sx)));
        cardState.pos.y = Math.min(0.95, Math.max(0.05, drag.oy + (q.y - drag.sy)));
        cardApplyText();
      }
    };
    const up = () => { document.removeEventListener("mousemove", mv); document.removeEventListener("mouseup", up); drag = null; };
    document.addEventListener("mousemove", mv);
    document.addEventListener("mouseup", up);
  });
  // --- FABs ---
  document.getElementById("cardBackBtn").onclick = renderCardsHome;
  document.getElementById("cardShareFab").onclick = shareCard;
  document.getElementById("cardBigShare").onclick = shareCard;
  const plus = document.getElementById("cardPlusFab");
  const menu = document.getElementById("cardPlusMenu");
  plus.onclick = e => { e.stopPropagation(); menu.classList.toggle("hidden"); closeCardSheet(); };
  st.addEventListener("click", e => {
    if (!menu.classList.contains("hidden") && !menu.contains(e.target) && e.target !== plus) menu.classList.add("hidden");
  });
  // tapping outside menu/sheet collapses them (capture phase, before text handlers)
  const dismissOnOutside = e => {
    const m = document.getElementById("cardPlusMenu");
    const sh = document.getElementById("cardSheet");
    const pb = document.getElementById("cardPlusFab");
    const t = e.target;
    const outside = t !== pb && !pb.contains(t) && !m.contains(t) && !sh.contains(t);
    if (outside && (!m.classList.contains("hidden") || !sh.classList.contains("hidden"))) {
      m.classList.add("hidden");
      closeCardSheet();
    }
  };
  st.addEventListener("touchstart", dismissOnOutside, { passive: true, capture: true });
  st.addEventListener("mousedown", dismissOnOutside);
  menu.querySelectorAll("[data-m]").forEach(b => b.onclick = e => {
    e.stopPropagation();
    menu.classList.add("hidden");
    openCardSheet(b.dataset.m);
  });
  // keep text style in sync on resize/orientation
  window.addEventListener("resize", cardApplyText);
}
function closeCardSheet() {
  const sh = document.getElementById("cardSheet");
  if (sh) { sh.classList.add("hidden"); sh.innerHTML = ""; }
}
function openCardSheet(kind) {
  const sh = document.getElementById("cardSheet");
  sh.classList.remove("hidden");
  if (kind === "bg") {
    sh.innerHTML = `<div class="sheet-title">${esc(t("cardsPickBg"))}</div><div class="sheet-grid">` +
      CARD_BGS.map(f => `<button type="button" class="card-thumb${f === cardState.bg ? " sel" : ""}" data-bg="${f}"><img src="/cards/${f}" alt="" loading="lazy" onerror="if(!this.dataset.retried){this.dataset.retried=1;this.src='/cards/${f}?r='+Date.now();}"></button>`).join("") + `</div>`;
    sh.querySelectorAll("[data-bg]").forEach(b => b.onclick = () => {
      cardState.bg = b.dataset.bg;
      document.getElementById("cardBgImg").src = "/cards/" + b.dataset.bg;
      sh.querySelectorAll("[data-bg]").forEach(x => x.classList.remove("sel"));
      b.classList.add("sel");
    });
  } else if (kind === "text") {
    const colors = ["#ffffff", "#ffe9a8", "#c9a227", "#0f2e23", "#7a1f1f"];
    sh.innerHTML = `<div class="sheet-title">${esc(t("cardsMnuText"))}</div>
      <label class="flabel">${esc(t("cardsFont"))}</label>
      <div class="fontrows">${CARD_FONT_OPTS.map(k => {
        const fi = CARD_FONTS[k];
        return `<button type="button" data-f="${k}" class="fontrow${cardState.font === k ? " on" : ""}"><span class="fontprev" style="font-family:${fi.stack};font-weight:${fi.weight}">${/amiri|reemkufi|qahiri/.test(k) ? "ع" : "Ag"}</span><span class="fontname">${fi.label}</span>${cardState.font === k ? '<span class="fontcheck">✓</span>' : ""}</button>`;
      }).join("")}</div>
      <div class="swatches" style="margin-top:10px">${colors.map(c => `<button type="button" data-c="${c}" style="background:${c}" class="${cardState.color === c ? "on" : ""}"></button>`).join("")}</div>
      <label class="flabel">${esc(t("cardsSize"))}</label>
      <input id="cardSheetSize" type="range" min="0.04" max="0.22" step="0.005" value="${cardState.sizeFrac}" style="width:100%">`;
    sh.querySelectorAll("[data-f]").forEach(b => b.onclick = () => {
      cardState.font = b.dataset.f;
      sh.querySelectorAll("[data-f]").forEach(x => { x.classList.remove("on"); const c = x.querySelector(".fontcheck"); if (c) c.remove(); });
      b.classList.add("on");
      b.insertAdjacentHTML("beforeend", '<span class="fontcheck">✓</span>');
      cardApplyText();
    });
    sh.querySelectorAll("[data-c]").forEach(b => b.onclick = () => {
      cardState.color = b.dataset.c;
      sh.querySelectorAll("[data-c]").forEach(x => x.classList.remove("on"));
      b.classList.add("on");
      cardApplyText();
    });
    sh.querySelector("#cardSheetSize").oninput = e => { cardState.sizeFrac = +e.target.value; cardApplyText(); };
  } else if (kind === "adj") {
    sh.innerHTML = `<div class="sheet-title">${esc(t("cardsMnuAdj"))}</div>
      <label class="flabel">${esc(t("cardsBright"))}</label>
      <input id="cardSheetBright" type="range" min="0.4" max="1.6" step="0.05" value="${cardState.bright}" style="width:100%">
      <label class="flabel">${esc(t("cardsBlur"))}</label>
      <input id="cardSheetBlur" type="range" min="0" max="12" step="0.5" value="${cardState.blur}" style="width:100%">`;
    sh.querySelector("#cardSheetBright").oninput = e => { cardState.bright = +e.target.value; cardApplyBg(); };
    sh.querySelector("#cardSheetBlur").oninput = e => { cardState.blur = +e.target.value; cardApplyBg(); };
  }
}
/* render the live stage to an export canvas (1080x1350) */
function renderCardToCanvas() {
  return new Promise(resolve => {
    const W = 1080, H = 1350;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const s = Math.max(W / img.width, H / img.height);
      const dw = img.width * s, dh = img.height * s;
      ctx.filter = `brightness(${cardState.bright}) blur(${cardState.blur * (W / cardStageEl().clientWidth)}px)`;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      ctx.filter = "none";
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(0,0,0,0.25)");
      g.addColorStop(0.5, "rgba(0,0,0,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      const msg = (cardTextEl().innerText || "").trim();
      if (msg) {
        const size = cardState.sizeFrac * W;
        ctx.font = `${(CARD_FONTS[cardState.font] || CARD_FONTS.fraunces).weight} ${size}px ${(CARD_FONTS[cardState.font] || CARD_FONTS.fraunces).stack}`;
        ctx.textAlign = "center";
        ctx.fillStyle = cardState.color;
        ctx.shadowColor = "rgba(0,0,0,0.7)";
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 4;
        const maxW = W * cardState.widthFrac * 0.96;
        const lines = [];
        msg.split("\n").forEach(para => {
          let line = "";
          para.split(/\s+/).forEach(w => {
            const test = line ? line + " " + w : w;
            if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
            else line = test;
          });
          lines.push(line);
        });
        const lh = size * 1.3;
        const cx = cardState.pos.x * W;
        const topY = cardState.pos.y * H;
        lines.forEach((ln, i) => ctx.fillText(ln, cx, topY + size * 0.85 + lh * i));
        ctx.shadowColor = "transparent";
      }
      const wfs = 30;
      ctx.font = `400 ${wfs}px sans-serif`;
      ctx.textAlign = "left"; ctx.textBaseline = "bottom";
      ctx.shadowColor = "rgba(0,0,0,0.85)"; ctx.shadowBlur = 10;
      ctx.fillStyle = "#ffffff";
      ctx.fillText("dailydeenhub", 24, H - 24);
      ctx.shadowBlur = 0;
      resolve(cv);
    };
    img.src = "/cards/" + cardState.bg;
  });
}
function cardToast(msg) {
  const el = document.getElementById("cardsToast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(cardToast._t);
  cardToast._t = setTimeout(() => el.classList.add("hidden"), 3500);
}
async function cardExportBlob() {
  const cv = await renderCardToCanvas();
  return new Promise(res => cv.toBlob(res, "image/jpeg", 0.92));
}
async function saveCard() {
  const blob = await cardExportBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dailydeenhub-card.jpg";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  cardToast(t("cardsSaved"));
}
async function shareCard() {
  const blob = await cardExportBlob();
  const file = new File([blob], "dailydeenhub-card.jpg", { type: "image/jpeg" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: t("cardsTile") });
      cardToast(t("cardsShared"));
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "dailydeenhub-card.jpg";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      cardToast(t("cardsShareFail"));
    }
  } catch (e) {
    if (!e || e.name !== "AbortError") cardToast(t("cardsShareFail"));
  }
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
async function ensureRamadan() {
  if (ramadan.length) return;
  const today = zoneParts(state.place.tz);
  const hijri = await (await fetch(`https://api.aladhan.com/v1/gToH/${pad(today.d)}-${pad(today.m)}-${today.y}`)).json();
  const year = +hijri.data.hijri.year;
  const month = +hijri.data.hijri.month.number;
  ramadanHijriYear = month > 9 ? year + 1 : year;
  const res = await fetch(`https://api.aladhan.com/v1/hijriCalendar/${ramadanHijriYear}/9?latitude=${state.place.lat}&longitude=${state.place.lon}&method=${state.method}&school=${state.school}`);
  ramadan = (await res.json()).data || [];
  const first = ramadan[0];
  ramadanStartParts = first ? { day: first.date.gregorian.day, monthEn: first.date.gregorian.month.en, year: first.date.gregorian.year } : null;
}
async function showRamadan() {
  monthView = "ramadan";
  // immediate feedback: highlight the button + show the sub-row before the network fetch
  document.getElementById("monthMode").classList.remove("on");
  document.getElementById("ramadanMode").classList.add("on");
  const _sr = document.getElementById("ramadanSubRow");
  if (_sr) _sr.style.display = "";
  if (!ramadan.length) {
    document.getElementById("monthBody").innerHTML = `<tr><td colspan="7">${t("loading")}</td></tr>`;
    try { await ensureRamadan(); }
    catch (e) { monthView = "month"; renderMonth(); throw e; } // don't leave the UI stuck on failure
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
  document.getElementById("locLabel").textContent = displayPlaceName();
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
  // "system" = the OS plays its default notification sound via the Web Notification; no in-page audio.
  if (state.sound === "system") {
    if ("Notification" in window && Notification.permission === "granted") return;
    try { const a = new Audio("/audio/bell.wav"); a.play().catch(() => {}); } catch {}
    return;
  }
  let src;
  if (state.sound === "custom" && state.customSound) src = state.customSound;
  else src = "/audio/" + (state.sound === "custom" ? "bell.wav" : state.sound);
  try { const a = new Audio(src); a.play().catch(() => {}); } catch {}
}
document.getElementById("soundSel").onchange = e => {
  state.sound = e.target.value; save();
  document.getElementById("soundUploadRow").style.display = state.sound === "custom" ? "" : "none";
  if (state.sound === "system" && (!("Notification" in window) || Notification.permission !== "granted")) {
    toast(t("soundSystemNeedNotif"));
  }
};
document.getElementById("soundPreview").onclick = () => {
  // Preview the real system sound by firing an actual OS notification.
  if (state.sound === "system") {
    if ("Notification" in window && Notification.permission === "granted") {
      showLocalNotification("\uD83D\uDD14 " + t("soundSystemPreview"));
    } else {
      toast(t("soundSystemNeedNotif"));
    }
    return;
  }
  playAlert();
};
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
// The Done button only appears once the user has changed something that isn't
// auto-saved (reminder minutes/toggles, notification checkboxes). Method,
// madhab, language, alert sound and push toggle all save the moment they change.
function setDoneVisible(v) {
  const foot = document.querySelector("#panel-settings .set-foot");
  if (foot) foot.classList.toggle("hidden", !v);
}
function setShow(name){
  document.getElementById("setMain").classList.toggle("hidden", !!name);
  ["loc","calc","remind","appear","notif"].forEach(k => {
    document.getElementById("setSub-"+k).classList.toggle("hidden", k !== name);
  });
}
// Show Done as soon as the user changes something that needs saving.
document.getElementById("remindRows").addEventListener("change", () => setDoneVisible(true));
["notifyChk", "adhanChk", "vibChk"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("change", () => setDoneVisible(true));
});
document.querySelectorAll("[data-setgo]").forEach(b => b.onclick = () => setShow(b.dataset.setgo));
document.querySelectorAll("[data-setback]").forEach(b => b.onclick = () => setShow(null));
document.querySelectorAll("[data-morego]").forEach(b => b.onclick = () => {
  const k = b.dataset.morego;
  showTab("month");
  const modeBtn = document.getElementById(k === "ramadan" ? "ramadanMode" : "monthMode");
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
// Keep Location + Language screen selects in sync
(function() {
  const a = document.getElementById("langSel"), b = document.getElementById("langSel2");
  if (a && b) {
    a.addEventListener("change", () => { b.value = a.value; });
    b.addEventListener("change", () => { a.value = b.value; });
  }
})();
// Selections save immediately (2026-10-12 fix): the sub-screen still collapses
// afterwards (the approved pattern), but the value is never lost if Done is skipped.
document.getElementById("methodSel").addEventListener("change", e => {
  state.method = +e.target.value; save(); refresh(); setShow(null);
});
document.getElementById("schoolSel").addEventListener("change", e => {
  state.school = +e.target.value; save(); refresh(); setShow(null);
});
(function () {
  const ss = document.getElementById("soundSel");
  if (ss) ss.addEventListener("change", () => setShow(null)); // the value itself is saved by its onchange above
})();
function applyLangImmediate(v) {
  state.langPref = v;
  state.lang = v === "system" ? sysLang() : v;
  save();
  const target = langPath(state.lang);
  const here = langPath(pathLang());
  if (target !== here) { try { history.replaceState(null, "", target); } catch {} }
  applyI18n();
  if (typeof renderDaily === "function") renderDaily();
  refreshQuranLanguage().catch(() => toast(t("loadFail")));
  setShow(null);
}
["langSel", "langSel2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("change", e => applyLangImmediate(e.target.value));
});
// Reset to main screen whenever the modal opens
["setBtn","mSet"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", () => { setShow(null); syncSetControls(); setDoneVisible(false); }, true);
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
  state.theme = "night"; // Dark is the only theme (2026-10-11 decision)
  var langVal = document.getElementById("langSel").value;
  state.langPref = langVal;
  state.lang = langVal === "system" ? sysLang() : langVal;
  const _lt2 = langPath(state.lang);
  const _lh2 = langPath(pathLang());
  if (_lt2 !== _lh2) { try { history.replaceState(null, "", _lt2); } catch {} }
  state.vibration = document.getElementById("vibChk").checked;
  save();
  // Close the sub-screen back to the settings list, but stay in Settings.
  setShow(null);
  setDoneVisible(false);
  toast(t("savedMsg"));
  if (state.notify && "Notification" in window) Notification.requestPermission();
  applyI18n();
  if (typeof renderDaily === "function") renderDaily();
  refresh();
};
// Location shortcut inside settings
document.getElementById("setLocBtn").onclick = () => {
  document.getElementById("locModal").classList.remove("hidden");
  document.getElementById("citySearch").focus();
};
// The GPS fallback name is saved in whatever language was active when the user
// tapped it — localize it on display so it always matches the current language.
function displayPlaceName() {
  const n = state.place.name;
  return (n === "Konumum" || n === "My location") ? pickL("Konumum", "Ma position", "My location") : n;
}
// A past GPS tap may have saved only the fallback name ("My location") because the
// reverse-geocode lookup was blocked. If so, try once per session to resolve the
// real city name from the saved coordinates and heal the saved place.
let _geoNameHealed = false;
async function healFallbackPlaceName() {
  if (_geoNameHealed) return;
  _geoNameHealed = true;
  const p = state.place;
  if (!p || (p.name !== "My location" && p.name !== "Konumum") || typeof p.lat !== "number" || typeof p.lon !== "number") return;
  try {
    const j = await (await fetch(`https://api-bdc.io/data/reverse-geocode-client?latitude=${p.lat}&longitude=${p.lon}&localityLanguage=${pickL("tr", "fr", "en")}`)).json();
    const label = j.city || j.locality || j.principalSubdivision;
    if (label && label !== p.name) {
      state.place.name = label;
      save();
      document.getElementById("locLabel").textContent = displayPlaceName();
    }
  } catch {}
}
// Sync new controls when the settings modal opens
function syncSetControls(){
  var ts = document.getElementById("themeSel");
  if (ts) ts.value = state.theme === "day" ? "light" : "dark";
  var ls = document.getElementById("langSel");
  if (ls) ls.value = state.langPref || state.lang;
  var ls2 = document.getElementById("langSel2");
  if (ls2) ls2.value = state.langPref || state.lang;
  var vc = document.getElementById("vibChk");
  if (vc) vc.checked = !!state.vibration;
}
document.getElementById("citySearch").addEventListener("input", e => { clearTimeout(searchTimer); searchTimer = setTimeout(() => searchCities(e.target.value.trim()), 250); });
document.getElementById("gpsBtn").onclick = () => {
  if (!navigator.geolocation) return toast(t("gpsFail"));
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude, lon = pos.coords.longitude;
    const fallback = pickL("Konumum", "Ma position", "My location");
    const tz = state.place.tz;
    let name = null;
    try {
      const j = await (await fetch(`https://api-bdc.io/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${pickL("tr", "fr", "en")}`)).json();
      name = j.city || j.locality || j.principalSubdivision || null;
    } catch {}
    if (!name) {
      // Lookup failed: keep the existing real name rather than clobbering it with the fallback.
      const cur = state.place.name;
      name = (cur && cur !== "Konumum" && cur !== "My location") ? cur : fallback;
    }
    choosePlace({ name, latitude: lat, longitude: lon, timezone: tz });
    try { startLiveTracking(); } catch {}
  }, () => toast(t("gpsFail")), { enableHighAccuracy: true, timeout: 8000 });
};
function setLanguage(lang) {
  if (state.lang === lang && state.langPref === lang) return;
  state.langPref = lang;
  state.lang = lang;
  save();
  // keep the URL in sync without reloading, so the user stays exactly where they are
  const target = langPath(lang);
  const here = langPath(pathLang());
  if (target !== here) { try { history.replaceState(null, "", target); } catch {} }
  applyI18n();
  if (typeof renderDaily === "function") renderDaily();
  refreshQuranLanguage().catch(() => toast(t("loadFail")));
}
const _le2 = document.getElementById("langEn"); if (_le2) _le2.onclick = () => setLanguage("en");
const _lt2 = document.getElementById("langTr"); if (_lt2) _lt2.onclick = () => setLanguage("tr");
const _tb2 = document.getElementById("themeBtn"); if (_tb2) _tb2.onclick = () => { state.theme = state.theme === "night" ? "day" : "night"; save(); applyI18n(); };
const surahInp = document.getElementById("surahSearch");
surahInp.addEventListener("focus", () => { surahInp.select(); chapterFilter = ""; renderChapters(); surahDropShow(true); });
surahInp.addEventListener("input", () => { chapterFilter = surahInp.value; renderChapters(); surahDropShow(true); });
surahInp.addEventListener("keydown", e => {
  const items = [...document.querySelectorAll("#chapterList button")];
  if (e.key === "Escape") { surahDropShow(false); return; }
  if (!items.length) return;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    surahActive = e.key === "ArrowDown" ? Math.min(surahActive + 1, items.length - 1) : Math.max(surahActive - 1, 0);
    items.forEach((b, i) => b.classList.toggle("active", i === surahActive));
    items[surahActive].scrollIntoView({ block: "nearest" });
  } else if (e.key === "Enter") {
    e.preventDefault();
    const ref = parseVerseRef(surahInp.value);
    if (ref) { jumpToVerse(ref.s, ref.v); surahInp.blur(); return; }
    (items[surahActive] || items[0]).click();
  }
});
document.addEventListener("click", e => { if (!e.target.closest(".surah-picker")) { surahDropShow(false); const vr = document.getElementById("verseResults"); if (vr) vr.classList.add("hidden"); } });
document.getElementById("radioBtn").onclick = playRadio;

/* ===== Quran verse keyword search (api.quran.com v4 search) ===== */
let verseSearchToken = 0;
/* Concept glossary: [proper Turkish, ...English equivalents]. Lets "namaz"
   find prayer verses, "fasting" work in the Turkish UI, etc. */
const QUR_CONCEPTS = [
  ["namaz", "prayer", "salat"], ["abdest", "ablution", "wudu"], ["oruç", "fasting", "fast"],
  ["zekât", "zakat", "charity"], ["hac", "hajj", "pilgrimage"], ["umre", "umrah"],
  ["cuma", "friday"], ["bayram", "eid", "festival"], ["ezan", "adhan", "call to prayer"],
  ["kıble", "qibla"], ["cami", "mosque"], ["Kur'an", "quran", "koran", "scripture"],
  ["dua", "supplication", "call upon"], ["tevbe", "repentance"], ["zikir", "remembrance", "dhikr"],
  ["sadaka", "charity", "sadaqah"], ["kurban", "sacrifice"], ["cenaze", "funeral"],
  ["nikâh", "marriage"], ["boşanma", "divorce"], ["miras", "inheritance"], ["yemin", "oath"],
  ["rüya", "dream", "vision"], ["cihad", "jihad", "striving", "struggle"],
  ["savaş", "war", "battle", "fighting"], ["cennet", "paradise", "garden"],
  ["cehennem", "hell", "hellfire"], ["kıyamet", "judgment", "resurrection", "hour"],
  ["iman", "faith", "belief"], ["ilim", "knowledge"],
  ["haram", "forbidden", "prohibited", "unlawful"], ["helâl", "lawful", "permissible", "halal"],
  ["içki", "wine", "intoxicant"], ["kumar", "gambling"], ["faiz", "usury", "interest"],
  ["yalan", "lie", "lying", "falsehood"], ["gıybet", "backbiting", "slander"],
  ["zina", "adultery", "fornication"], ["hırsızlık", "theft", "stealing"],
  ["anne", "mother", "mothers"], ["baba", "father"], ["akraba", "kinship", "relatives", "kindred"],
  ["komşu", "neighbor", "neighbour"], ["kadın", "woman", "women"], ["erkek", "man", "men"],
  ["çocuk", "child", "children", "offspring"], ["aile", "family", "household"],
  ["peygamber", "prophet", "messenger"], ["melek", "angel", "angels"], ["şeytan", "satan", "devil"],
  ["kader", "decree", "destiny"], ["rızık", "provision", "sustenance"],
  ["sabır", "patience", "patient"], ["şükür", "gratitude", "grateful", "thanks"],
  ["adalet", "justice"], ["zulüm", "injustice", "oppression", "wrongdoing"],
  ["merhamet", "mercy", "merciful", "compassion"], ["şifa", "healing", "cure"],
  ["ölüm", "death"], ["ahiret", "hereafter", "afterlife"], ["şehit", "martyr"],
  ["infak", "spending"], ["tavaf", "tawaf", "circumambulation"], ["kadir gecesi", "night of decree", "night of qadr"]
];
function qNorm(s) {
  return s.toLocaleLowerCase("tr").replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u").replace(/ı/g, "i");
}
/* Original query (UI language) + concept expansions across both languages. */
function verseSearchQueries(q) {
  const uiLang = pickL("tr", "fr", "en");
  const out = [], seen = {};
  const add = (term, lang) => { const k = lang + "|" + term.toLowerCase(); if (!seen[k]) { seen[k] = 1; out.push({ term, lang }); } };
  add(q, uiLang);
  const nq = qNorm(q);
  QUR_CONCEPTS.forEach(c => {
    if (c.some(t => nq.indexOf(qNorm(t)) !== -1)) {
      add(c[0], "tr");
      for (let i = 1; i < c.length; i++) add(c[i], "en");
    }
  });
  return out.slice(0, 5);
}
function decodeEnt(s) {
  const ta = document.createElement("textarea");
  ta.innerHTML = s;
  return ta.value;
}
function verseSearchHL(html) {
  // API marks matches with <em>; keep only those tags, escape everything else
  const marked = String(html == null ? "" : html).replace(/<em>/g, "\u0001").replace(/<\/em>/g, "\u0002");
  return escapeHtml(decodeEnt(marked)).replace(/\u0001/g, '<span class="hd-hl">').replace(/\u0002/g, "</span>");
}
function verseArHL(words) {
  return (words || []).map(w => {
    const inner = escapeHtml(w.text);
    if (w.char_type === "end") return `<span class="ayah-end">${inner}</span>`;
    return w.highlight ? `<span class="hd-hl">${inner}</span>` : inner;
  }).join(" ");
}
/* Direct verse jump: "2:255", "2.255", "bakara 255", "bakara:255" */
function parseVerseRef(q) {
  q = (q || "").trim().toLowerCase();
  if (!q || !chapters.length) return null;
  // "2:255" / "2.255" / "2 255"
  let m = q.match(/^(\d{1,3})\s*[:.]\s*(\d{1,3})$/);
  if (!m) m = q.match(/^(\d{1,3})\s+(\d{1,3})$/);
  if (m) {
    const s = +m[1], v = +m[2];
    const c = chapters.find(c => c.id === s);
    if (c && v >= 1 && v <= (c.verses_count || 286)) return { s, v };
    return null;
  }
  // "bakara 255" / "bakara:255" — surah name + verse number
  m = q.match(/^(.+?)\s*[:.]\s*(\d{1,3})$/) || q.match(/^(.+?)\s+(\d{1,3})$/);
  if (m) {
    const namePart = m[1].trim(), v = +m[2];
    if (v >= 1 && namePart.length >= 2) {
      const c = chapters.find(c =>
        c.name_simple.toLowerCase().startsWith(namePart) ||
        (c.translated_name && c.translated_name.name.toLowerCase().startsWith(namePart)) ||
        surahName(c).toLowerCase().startsWith(namePart));
      if (c && v <= (c.verses_count || 286)) return { s: c.id, v };
    }
  }
  return null;
}
async function jumpToVerse(s, v) {
  const idx = v - 1; // 0-based
  await openChapter(s);
  // Hide the search dropdowns
  surahDropShow(false);
  const vr = document.getElementById("verseResults");
  if (vr) vr.classList.add("hidden");
  const sel = `#verses .verse[data-v="${idx}"], #verses .mverse[data-v="${idx}"]`;
  const el = document.querySelector(sel);
  if (el) {
    el.scrollIntoView({ block: "center" });
    // Flash-highlight the jumped verse
    document.querySelectorAll(sel).forEach(e => e.classList.add("on"));
    setTimeout(() => {
      if (!state.quranFollow) document.querySelectorAll(sel).forEach(e => e.classList.remove("on"));
    }, 2500);
  }
  saveQuranPos(s, idx); // resume point follows the jump
  refreshQuranResume();
}
async function doVerseSearch(q) {
  const box = document.getElementById("verseResults");
  if (!box) return;
  q = (q || "").trim();
  if (q.length < 2) { box.classList.add("hidden"); box.innerHTML = ""; return; }
  const my = ++verseSearchToken;
  box.classList.remove("hidden");
  box.innerHTML = `<p class="hint">${t("loading")}</p>`;
  const queries = verseSearchQueries(q);
  try {
    const all = await Promise.all(queries.map(o =>
      fetch(`https://api.quran.com/api/v4/search?query=${encodeURIComponent(o.term)}&size=20&language=${o.lang}`)
        .then(r => r.json())
        .then(j => ({ results: (j.search && j.search.results) || [] }))
        .catch(() => ({ results: [] }))
    ));
    if (my !== verseSearchToken) return;
    const seen = {}, merged = [];
    all.forEach(g => g.results.forEach(r => {
      if (!seen[r.verse_key]) { seen[r.verse_key] = 1; merged.push(r); }
    }));
    const res = merged.slice(0, 25);
    if (!res.length) { box.innerHTML = `<p class="hint">${t("resNoRes")}</p>`; return; }
    box.innerHTML = res.map(r => {
      const tr = r.translations && r.translations[0];
      return `<button type="button" class="vres" data-vk="${r.verse_key}">` +
        `<span class="vres-key">${escapeHtml(r.verse_key)}</span>` +
        `<span class="vres-ar" dir="rtl" lang="ar">${verseArHL(r.words)}</span>` +
        (tr ? `<span class="vres-tr">${verseSearchHL(tr.text)}</span>` : "") +
        `</button>`;
    }).join("");
    box.querySelectorAll(".vres").forEach(b => b.onclick = () => {
      box.classList.add("hidden");
      const inp = document.getElementById("verseSearch");
      if (inp) inp.value = "";
      openVerseWindow(b.dataset.vk);
    });
  } catch {
    if (my !== verseSearchToken) return;
    box.innerHTML = `<p class="hint">${t("loadFail")}</p>`;
  }
}
function gotoVerse(vk) {
  const parts = String(vk).split(":");
  const s = +parts[0], a = +parts[1];
  if (!s || !a) return;
  const go = () => {
    const el = document.querySelector(`#verses .verse[data-v="${a - 1}"], #verses .mverse[data-v="${a - 1}"]`);
    if (el) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      el.classList.add("flash");
      setTimeout(() => el.classList.remove("flash"), 2300);
    }
  };
  if (currentChapter === s) { go(); return; }
  openChapter(s).then(go);
}
const _vs = document.getElementById("verseSearch");
if (_vs) {
  let deb = 0;
  _vs.addEventListener("input", () => {
    clearTimeout(deb);
    deb = setTimeout(() => doVerseSearch(_vs.value), 450);
  });
  _vs.addEventListener("keydown", e => {
    if (e.key === "Escape") { document.getElementById("verseResults").classList.add("hidden"); return; }
    if (e.key === "Enter") {
      const ref = parseVerseRef(_vs.value);
      if (ref) { e.preventDefault(); _vs.blur(); jumpToVerse(ref.s, ref.v); }
    }
  });
}
/* Voice verse search window: a Google-style dialog with a big tap-to-start mic.
   The user recites, Google's speech recognition (Arabic) transcribes, and the
   existing verse search finds the match. */
let voiceRec = null;
function setVoiceUI(st) {
  const mic = document.getElementById("voiceMicBig");
  const stEl = document.getElementById("voiceStatus");
  if (mic) mic.classList.toggle("listening", st === "listening");
  if (stEl) stEl.textContent = t(st === "listening" ? "voiceListening" : "voiceTapToStart");
}
function openVoiceWindow() {
  setVoiceUI("idle");
  document.getElementById("voiceModal").classList.remove("hidden");
}
function closeVoiceWindow() {
  document.getElementById("voiceModal").classList.add("hidden");
  try { if (voiceRec) voiceRec.abort(); } catch {}
  voiceRec = null;
  setVoiceUI("idle");
}
/* Voice surah matching: if the transcript looks like a surah name (Arabic,
   transliterated, or in the UI language), open that surah directly. */
function normArSr(s) {
  return (s || "").replace(/[ً-ٰٖ]/g, "").replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/^ال/, "").trim();
}
function normLatSr(s) {
  return (s || "").toLowerCase()
    .replace(/[âàáä]/g, "a").replace(/[îìíï]/g, "i").replace(/[ûùúü]/g, "u")
    .replace(/[ôòóö]/g, "o").replace(/[êèéë]/g, "e")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ş/g, "s").replace(/ı/g, "i")
    .replace(/^al-/, "").replace(/[^a-z]/g, "");
}
function findSurahByVoice(txt) {
  if (!chapters || !chapters.length) return 0;
  const t = (txt || "").trim();
  if (!t || t.split(/\s+/).length > 4) return 0; // too long to be a surah name
  const tAr = normArSr(t), tLat = normLatSr(t);
  for (const c of chapters) {
    const arNames = [normArSr(c.name_arabic)];
    if (arNames[0] === "يس") arNames.push("ياسين"); // Ya-Sin full form
    const arHit = arNames.some(ar => tAr && ar && (tAr.includes(ar) || ar.includes(tAr)));
    if (arHit) return c.id;
    const simple = normLatSr(c.name_simple);
    const trans = normLatSr(c.translated_name && c.translated_name.name);
    if (tLat && ((simple && (tLat.includes(simple) || simple.includes(tLat))) ||
                 (trans && (tLat.includes(trans) || trans.includes(tLat))))) return c.id;
  }
  return 0;
}
function startVoiceListening() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast(t("voiceUnsupported")); return; }
  try { if (voiceRec) voiceRec.abort(); } catch {}
  voiceRec = new SR();
  voiceRec.lang = "ar-SA";
  voiceRec.interimResults = false;
  voiceRec.maxAlternatives = 1;
  setVoiceUI("listening");
  voiceRec.onresult = e => {
    const txt = (e.results && e.results[0] && e.results[0][0] && e.results[0][0].transcript || "").trim();
    voiceRec = null;
    closeVoiceWindow();
    const surahId = findSurahByVoice(txt);
    if (surahId) {
      const c = chapters.find(x => x.id === surahId);
      openChapter(surahId);
      toast(c ? surahName(c) : "");
      return;
    }
    const inp = document.getElementById("verseSearch");
    if (inp) inp.value = txt;
    if (txt) doVerseSearch(txt); else toast(t("voiceNoSpeech"));
  };
  voiceRec.onerror = e => {
    voiceRec = null;
    setVoiceUI("idle");
    const err = e && e.error;
    toast(t(err === "not-allowed" || err === "service-not-allowed" ? "voiceMicDenied" : err === "no-speech" ? "voiceNoSpeech" : "voiceError"));
  };
  voiceRec.onend = () => { voiceRec = null; setVoiceUI("idle"); };
  try { voiceRec.start(); } catch { voiceRec = null; setVoiceUI("idle"); }
}
document.getElementById("voiceMicBig").onclick = () => {
  const mic = document.getElementById("voiceMicBig");
  if (mic.classList.contains("listening")) { try { voiceRec && voiceRec.stop(); } catch {} return; }
  startVoiceListening();
};
document.getElementById("voiceClose").onclick = closeVoiceWindow;
document.getElementById("voiceModal").addEventListener("click", e => { if (e.target.id === "voiceModal") closeVoiceWindow(); });
document.getElementById("voiceSearchBtn").onclick = openVoiceWindow;
/* Library shelf: in-app books + trusted free external libraries. */
const LIB_BOOKS = [
  { ic: "📖", t: { en: "Ya-Sin", tr: "Yasin" , fr: "Ya-Sin" }, s: { en: "Surah 36, in the reader", tr: "36. sure, okuyucuda" , fr: "Sourate 36, dans le lecteur" }, act: "yasin" },
  { ic: "\uD83D\uDD4C", t: { en: "Prayer Guide", tr: "Namaz Hocası" , fr: "Guide de prière" }, s: { en: "How to pray, step by step", tr: "Adım adım namaz" , fr: "Comment prier, étape par étape" }, act: "prayer" },
  { ic: "\uD83D\uDCFF", t: { en: "Tesbihat", tr: "Tesbihat" , fr: "Tesbihat" }, s: { en: "Dhikr counter", tr: "Zikir sayacı" , fr: "Compteur de dhikr" }, act: "tasbih" },
  { ic: "\uD83D\uDCDC", t: { en: "Select Passages", tr: "Aşr-ı Şerifler" , fr: "Passages choisis" }, s: { en: "Beloved verses to recite", tr: "Seçkin ayetler" , fr: "Versets à réciter" }, act: "asr" },
  { ic: "\uD83D\uDCDA", t: { en: "The Six Books", tr: "Kütüb-i Sitte" , fr: "Les Six Livres" }, s: { en: "Hadith collections", tr: "Hadis koleksiyonları" , fr: "Recueils de hadiths" }, act: "kutub" },
  { ic: "\uD83E\uDD32", t: { en: "Hisnul Muslim", tr: "Hisnul Muslim" , fr: "Hisnul Muslim" }, s: { en: "Authentic daily duas", tr: "Sahih günlük dualar" , fr: "Dou'as authentiques du quotidien" }, act: "hisnul" },
  { ic: "\uD83D\uDD4C", t: { en: "Diyanet Tafsir", tr: "Diyanet Meal-Tefsir" , fr: "Tafsir Diyanet" }, s: { en: "Official TR portal", tr: "Resmî TR portal" , fr: "Portail officiel TR" }, act: "url", url: "https://kuran.diyanet.gov.tr/" },
  { ic: "📖", t: { en: "Elmalılı Tafsir", tr: "Elmalılı Tefsiri" , fr: "Tafsir Elmalılı" }, s: { en: "10 vols, free", tr: "10 cilt, ücretsiz" , fr: "10 volumes, gratuit" }, act: "url", url: "https://archive.org/details/hak-dini-kuran-dili-cilt-1-elmalili-hamdi-yazir" },
  { ic: "\uD83C\uDF10", t: { en: "More Free Books", tr: "Ücretsiz Kitaplar" , fr: "Plus de livres gratuits" }, s: { en: "IslamHouse library", tr: "IslamHouse kütüphanesi" , fr: "Bibliothèque IslamHouse" }, act: "url", url: { en: "https://islamhouse.com/en", tr: "https://islamhouse.com/tr", fr: "https://islamhouse.com/fr" } }
];
const ASR_ITEMS = [
  { t: { en: "Al-Fatiha", tr: "Fatiha Suresi" , fr: "Al-Fatiha" }, vk: "1:1" },
  { t: { en: "Ayat al-Kursi", tr: "Ayet-el Kürsi" , fr: "Ayat al-Koursi" }, vk: "2:255" },
  { t: { en: "Amana ar-Rasul", tr: "Amenerresulü" , fr: "Amana ar-Rassoul" }, vk: "2:285" },
  { t: { en: "Ya-Sin 58", tr: "Yasin 58" , fr: "Ya-Sin 58" }, vk: "36:58" },
  { t: { en: "Al-Hashr 22–24", tr: "Haşr 22–24" , fr: "Al-Hachr 22–24" }, vk: "59:22" },
  { t: { en: "Al-Ikhlas", tr: "İhlas Suresi" , fr: "Al-Ikhlas" }, ch: 112 },
  { t: { en: "Al-Falaq", tr: "Felak Suresi" , fr: "Al-Falaq" }, ch: 113 },
  { t: { en: "An-Nas", tr: "Nas Suresi" , fr: "An-Nas" }, ch: 114 }
];
function libLang(o) { return (o && (o[state.lang] || o.en)) || ""; }
function renderLibrary(resetView) {
  const grid = document.getElementById("libraryGrid");
  if (!grid) return;
  if (resetView) {
    document.getElementById("libMain").classList.remove("hidden");
    document.getElementById("libAsr").classList.add("hidden");
  } else if (!document.getElementById("libAsr").classList.contains("hidden")) {
    renderAsrList();
  }
  grid.innerHTML = LIB_BOOKS.map((b, i) =>
    `<button type="button" class="book${b.act === "url" ? " ext" : ""}" data-lib="${i}">` +
    `<span class="book-cover">${b.ic}</span>` +
    `<span class="book-name">${escapeHtml(libLang(b.t))}</span>` +
    `<span class="book-sub">${escapeHtml(libLang(b.s))}</span></button>`
  ).join("");
  grid.querySelectorAll("[data-lib]").forEach(el => el.onclick = () => libAct(LIB_BOOKS[+el.dataset.lib]));
}
function libAct(b) {
  if (!b) return;
  if (b.act === "url") {
    const u = typeof b.url === "string" ? b.url : (b.url && (b.url[state.lang] || b.url.en));
    if (u) window.open(u, "_blank", "noopener");
    return;
  }
  if (b.act === "asr") {
    renderAsrList();
    document.getElementById("libMain").classList.add("hidden");
    document.getElementById("libAsr").classList.remove("hidden");
    window.scrollTo(0, 0);
    return;
  }
  if (b.act === "yasin") { showTab("quran"); openChapter(36); }
  else if (b.act === "prayer") { showTab("learn"); openLearnArticle("prayer"); }
  else if (b.act === "tasbih") showTab("quiet");
  else if (b.act === "kutub") showTab("resources");
  else if (b.act === "hisnul") showTab("hisnul");
  window.scrollTo(0, 0);
}
function renderAsrList() {
  const list = document.getElementById("asrList");
  if (!list) return;
  document.getElementById("asrTitle").textContent = libLang({ en: "Select Passages", tr: "Aşr-ı Şerifler" });
  list.innerHTML = ASR_ITEMS.map((a, i) =>
    `<button class="learn-card" data-asr="${i}" type="button"><span class="learn-ic">\uD83D\uDCDC</span>` +
    `<span class="learn-tx"><span class="learn-ti">${escapeHtml(libLang(a.t))}</span>` +
    `<span class="learn-de">${escapeHtml(a.vk || ("Surah " + a.ch))}</span></span>` +
    `<span class="learn-go">\u203A</span></button>`
  ).join("");
  list.querySelectorAll("[data-asr]").forEach(el => el.onclick = () => {
    const a = ASR_ITEMS[+el.dataset.asr];
    showTab("quran");
    if (a.ch) openChapter(a.ch); else openVerseWindow(a.vk);
    window.scrollTo(0, 0);
  });
}
document.getElementById("asrBack").onclick = () => {
  document.getElementById("libAsr").classList.add("hidden");
  document.getElementById("libMain").classList.remove("hidden");
};
document.getElementById("voiceTile").onclick = () => {
  showTab("quran");
  window.scrollTo(0, 0);
  openVoiceWindow();
};
/* Verse window: a focused single-ayah view (from verse search or the Asr list)
   with its own play button. Per-ayah audio comes from everyayah.com, mapped to
   the app's four reciters; it never touches the chapter player. */
const VERSE_AUDIO_ED = { 7: "Alafasy_128kbps", 3: "Abdurrahmaan_As-Sudais_192kbps", 9: "Minshawy_Murattal_128kbps", 2: "Abdul_Basit_Murattal_192kbps" };
let vmKey = null, vmAudio = null;
function vmSetPlayUI(playing) {
  const ic = document.getElementById("vmPlayIc"), tx = document.getElementById("vmPlayTx");
  if (ic) ic.textContent = playing ? "\u23F8" : "\u25B6";
  if (tx) tx.textContent = t(playing ? "vmPause" : "vmPlay");
}
function vmStop() {
  try { if (vmAudio) vmAudio.pause(); } catch {}
  vmSetPlayUI(false);
}
async function openVerseWindow(vk) {
  const parts = String(vk).split(":");
  if (!(+parts[0] >= 1) || !(+parts[1] >= 1)) return;
  vmKey = vk;
  vmStop();
  document.getElementById("vmKey").textContent = vk;
  document.getElementById("vmAr").textContent = t("loading");
  document.getElementById("vmTr").textContent = "";
  document.getElementById("verseModal").classList.remove("hidden");
  try {
    const trId = pickL(77, 31, 20);
    const j = await (await fetch(`https://api.quran.com/api/v4/verses/by_key/${vk}?words=false&translations=${trId}&language=${pickL("tr", "fr", "en")}&fields=text_uthmani`)).json();
    if (vmKey !== vk) return;
    const v = j.verse || {};
    document.getElementById("vmAr").textContent = v.text_uthmani || "";
    const tr = v.translations && v.translations[0];
    document.getElementById("vmTr").textContent = tr ? String(tr.text).replace(/<sup[^>]*>.*?<\/sup>/g, "").replace(/<[^>]+>/g, "") : "";
  } catch {
    if (vmKey !== vk) return;
    document.getElementById("vmAr").textContent = t("loadFail");
  }
}
document.getElementById("vmPlay").onclick = () => {
  if (!vmKey) return;
  const parts = vmKey.split(":"), s = +parts[0], a = +parts[1];
  const ed = VERSE_AUDIO_ED[state.reciter] || VERSE_AUDIO_ED[7];
  const url = `https://everyayah.com/data/${ed}/${String(s).padStart(3, "0")}${String(a).padStart(3, "0")}.mp3`;
  try { const main = document.getElementById("audio"); if (main && !main.paused) main.pause(); } catch {}
  try {
    if (!vmAudio) {
      vmAudio = new Audio();
      vmAudio.onended = () => vmSetPlayUI(false);
      vmAudio.onerror = () => { vmSetPlayUI(false); toast(t("loadFail")); };
    }
    if (!vmAudio.paused && vmAudio.getAttribute("src") === url) { vmAudio.pause(); vmSetPlayUI(false); return; }
    if (vmAudio.getAttribute("src") !== url) vmAudio.src = url;
    vmAudio.play().then(() => vmSetPlayUI(true)).catch(() => { vmSetPlayUI(false); toast(t("loadFail")); });
  } catch { vmSetPlayUI(false); }
};
document.getElementById("vmOpen").onclick = () => {
  if (!vmKey) return;
  document.getElementById("verseModal").classList.add("hidden");
  vmStop();
  gotoVerse(vmKey);
};
const vmCloseFn = () => { document.getElementById("verseModal").classList.add("hidden"); vmStop(); };
document.getElementById("vmClose").onclick = vmCloseFn;
document.getElementById("verseModal").addEventListener("click", e => { if (e.target.id === "verseModal") vmCloseFn(); });
document.getElementById("monthMode").onclick = () => { monthView = "month"; calSel = null; renderMonth(); };
document.getElementById("calPrev").onclick = () => { if (calY === null) { const n = zoneParts(state.place.tz); calY = n.y; calM = n.m; } calM--; if (calM < 1) { calM = 12; calY--; } calSel = null; monthView = "month"; renderMonth(); };
document.getElementById("calNext").onclick = () => { if (calY === null) { const n = zoneParts(state.place.tz); calY = n.y; calM = n.m; } calM++; if (calM > 12) { calM = 1; calY++; } calSel = null; monthView = "month"; renderMonth(); };
document.getElementById("monthBody").addEventListener("click", e => {
  const td = e.target.closest("td[data-calday]");
  if (!td || monthView !== "month") return;
  calSel = +td.dataset.calday;
  document.querySelectorAll('#monthBody td.sel').forEach(c => c.classList.remove("sel"));
  td.classList.add("sel");
  renderCalDetail();
});
document.getElementById("ramadanMode").onclick = () => showRamadan().catch(() => toast(t("loadFail")));
const _ramTimes = document.getElementById("ramTimes"), _ramFastsBtn = document.getElementById("ramFasts");
if (_ramTimes) _ramTimes.onclick = () => { ramadanSub = "times"; renderMonth(); };
if (_ramFastsBtn) _ramFastsBtn.onclick = () => { ramadanSub = "fasts"; renderMonth(); };
renderStations();
document.getElementById("audio").addEventListener("pause", () => { if (!startingAudio) setPlayLabel(t("play")); });
document.getElementById("audio").addEventListener("ended", () => { if (!followState.playing) setPlayLabel(t("play")); });
document.getElementById("reciterSel").onchange = e => { state.reciter = +e.target.value; save(); stopFollow(); followState.urls = null; followState.idx = 0; const p = RECITER_PATHS[state.reciter]; const a = document.getElementById("audio"); if (p) { a.src = `https://download.quranicaudio.com/qdc/${p}/${currentChapter}.mp3`; a.load(); } };
document.querySelectorAll("#quranViewSeg button").forEach(b => b.onclick = async () => {
  state.quranView = b.dataset.qv; save();
  if (state.quranView === "pron" || state.quranView === "both") { await ensurePron(); }
  if (state.quranView === "mushaf") { await ensureMushaf(); }
  renderVerses();
});
const _fc = document.getElementById("followChk");
if (_fc) _fc.onchange = () => {
  // Visual only: shade follows the recitation when on, nothing when off.
  // The audio (full-chapter or per-verse) keeps playing untouched.
  state.quranFollow = _fc.checked; save();
  if (!state.quranFollow) {
    document.querySelectorAll("#verses .verse.on, #verses .mverse.on").forEach(el => el.classList.remove("on"));
  }
  lastShadeVerse = -1; // re-shade on next tick
};
/* Big play button: large tap target with a pop animation. Toggles the same
   playback the audio bar controls (follow mode or full-chapter). */
(function () {
  const bpb = document.getElementById("bigPlayBtn");
  const aud = document.getElementById("audio");
  if (!bpb || !aud) return;
  const syncIcon = () => { bpb.textContent = aud.paused ? "\u25b6" : "\u23f8"; };
  bpb.addEventListener("click", () => {
    bpb.classList.remove("pop");
    void bpb.offsetWidth; // restart the animation
    bpb.classList.add("pop");
    if (followState.playing) { toggleFollow(); return; }
    if (aud.paused) aud.play().catch(() => {});
    else aud.pause();
  });
  aud.addEventListener("play", syncIcon);
  aud.addEventListener("pause", syncIcon);
  syncIcon();
})();
// (menu guard closed above)
const _tstage = document.getElementById("tasbihClassic");
if (_tstage) _tstage.addEventListener("click", e => {
  if (e.target.closest("#tasbihReset")) return; // reset must not count
  bumpTasbih(false);
});
document.getElementById("tasbihReset").onclick = () => { state.tasbih = 0; state.tasbihLoops = 0; save(); renderTasbih(); };
document.querySelectorAll("#tasbihModeSeg button").forEach(b => b.onclick = () => { state.tasbihMode = b.dataset.tm; save(); applyTasbihMode(); });
const _bbeads = document.getElementById("tasbihBeads");
if (_bbeads) _bbeads.addEventListener("click", e => {
  if (e.target.closest("#beadReset, #beadStyles")) return; // reset / style picker must not count
  bumpTasbih(true);
});
const _breset = document.getElementById("beadReset");
if (_breset) _breset.onclick = () => { state.tasbih = 0; state.tasbihLoops = 0; save(); renderTasbih(); renderBeads(false); };
applyTasbihMode();
document.getElementById("mosqueFind").onclick = () => findMosques();
document.getElementById("halalFind").onclick = () => findHalal();
document.getElementById("marketFind").onclick = () => findMarkets();
document.getElementById("mqSuggest").onclick = e => { e.preventDefault(); showTab("feedback"); const ts = document.getElementById("fbTypeSel"); if (ts) ts.value = "Suggestion"; };
function suggestPlace(kind) {
  showTab("feedback");
  const ts = document.getElementById("fbTypeSel"); if (ts) ts.value = "Suggestion";
  const ta = document.getElementById("fbMsgTxt");
  // prefill the guided template only if the user has not already written something
  if (ta && !ta.value.trim()) { ta.value = t(kind === "mosque" ? "mqMosqueTmpl" : "mqPrayerTmpl"); ta.focus(); }
}
document.getElementById("mqAddMosque").onclick = () => suggestPlace("mosque");
document.getElementById("mqAddPrayer").onclick = () => suggestPlace("prayer");

// Weather via Open-Meteo (free, no key) for header
const WX_CODE = {0:"Clear",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Fog",51:"Drizzle",53:"Drizzle",55:"Drizzle",61:"Rain",63:"Rain",65:"Rain",71:"Snow",73:"Snow",75:"Snow",77:"Snow",80:"Showers",81:"Showers",82:"Showers",95:"Thunderstorm",96:"Storm",99:"Storm"};
const WX_CODE_TR = {0:"Açık",1:"Çoğunlukla açık",2:"Parçalı bulutlu",3:"Kapalı",45:"Sis",48:"Sis",51:"Çisenti",53:"Çisenti",55:"Çisenti",61:"Yağmur",63:"Yağmur",65:"Yağmur",71:"Kar",73:"Kar",75:"Kar",77:"Kar",80:"Sağanak",81:"Sağanak",82:"Sağanak",95:"Gök gürültüsü",96:"Fırtına",99:"Fırtına"};
const WX_CODE_FR = {0:"Dégagé",1:"Plutôt dégagé",2:"Partiellement nuageux",3:"Couvert",45:"Brouillard",48:"Brouillard",51:"Bruine",53:"Bruine",55:"Bruine",61:"Pluie",63:"Pluie",65:"Pluie",71:"Neige",73:"Neige",75:"Neige",77:"Neige",80:"Averses",81:"Averses",82:"Averses",95:"Orage",96:"Tempête",99:"Tempête"};
const WX_ICON = {0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",48:"🌫️",51:"🌦️",53:"🌦️",55:"🌦️",61:"🌧️",63:"🌧️",65:"🌧️",71:"🌨️",73:"🌨️",75:"🌨️",77:"🌨️",80:"🌧️",81:"🌧️",82:"🌧️",95:"⛈️",96:"⛈️",99:"⛈️"};
let wxCache = { t: 0, html: "", lang: "" };
async function loadWeather() {
  const el = document.getElementById("hdrWx");
  if (!el || !state.place) return;
  // cache 30 min, per language
  if (Date.now() - wxCache.t < 18e5 && wxCache.html && wxCache.lang === state.lang) { el.innerHTML = wxCache.html; return; }
  try {
    const { lat, lon } = state.place;
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=3`);
    if (!r.ok) throw 0;
    const j = await r.json();
    const loc = pickL("tr-TR", "fr-FR", "en-US");
    // Day 0 = current conditions; days 1-2 = daily max
    const days = j.daily.time.map((ds, i) => {
      const [y, m, d] = ds.split("-").map(Number);
      const name = i === 0 ? pickL("Bugün", "Aujourd'hui", "Today")
        : new Date(y, m - 1, d).toLocaleDateString(loc, { weekday: "short" });
      const code = i === 0 ? j.current.weather_code : j.daily.weather_code[i];
      const temp = i === 0 ? Math.round(j.current.temperature_2m) : Math.round(j.daily.temperature_2m_max[i]);
      const icon = WX_ICON[code] || "";
      return `<div class="wx-day"><span class="wx-dn">${name}</span><span class="wx-di">${icon}</span><span class="wx-dt">${temp}°</span></div>`;
    }).join("");
    wxCache = { t: Date.now(), html: days, lang: state.lang };
    el.innerHTML = days;
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
const _hsnBack = document.getElementById("hsnBack");
if (_hsnBack) _hsnBack.onclick = () => { if (typeof hsnBackToCats === "function") hsnBackToCats(); };
document.querySelectorAll("[data-goto]").forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  showTab(a.dataset.goto);
  window.scrollTo(0, 0);
}));
document.querySelectorAll("[data-gotoradio]").forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  showTab("home");
  setTimeout(() => { const el = document.getElementById("radioCard"); if (el) el.scrollIntoView({ block: "center" }); }, 150);
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
        qiblaLoc = { name: pickL("GPS konumu", "Position GPS", "GPS location"), lat: glat, lon: glon };
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
// Heal a stuck GPS fallback place name ("My location") once the CSP allows the lookup.
try { healFallbackPlaceName(); } catch {}
maybeShowApkNotice();
// Warm the Find-near-me cache quietly in the background (mosques, halal, markets):
// pre-searches the saved place a few seconds after load so first taps are instant.
setTimeout(() => { try { warmFinderCache(); } catch {} }, 8000);
setTimeout(() => { try { startLiveTracking(); } catch {} }, 5000);
// Fetch magnetic declination for the saved location (cached in localStorage).
if (state.place && typeof state.place.lat === 'number') updateDeclination(state.place.lat, state.place.lon);
// prayer-card checkboxes use delegation (cards re-render every second)
const _gdp = document.getElementById("gridDayPrev");
if (_gdp) _gdp.onclick = () => stepDay(-1);
const _gdn = document.getElementById("gridDayNext");
if (_gdn) _gdn.onclick = () => stepDay(1);
const _gdl = document.getElementById("gridDayLabel");
if (_gdl) _gdl.onclick = () => stepDay(-dayOffset);
// Swipe the prayer grid: left -> next day, right -> previous day (standard page-turn direction)
(function () {
  const el = document.getElementById("vaktGrid");
  if (!el) return;
  let sx = 0, sy = 0;
  el.addEventListener("touchstart", e => { const tc = e.touches[0]; sx = tc.clientX; sy = tc.clientY; }, { passive: true });
  el.addEventListener("touchend", e => {
    const tc = e.changedTouches[0], dx = tc.clientX - sx, dy = tc.clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) stepDay(dx > 0 ? -1 : 1);
  }, { passive: true });
})();
const vg = document.getElementById("vaktGrid");
if (vg) vg.addEventListener("click", e => {
  const b = e.target.closest("[data-trk]");
  if (b) togglePrayer(b.dataset.trk);
});
/* Swipe between main tabs: left = next tab, right = previous (back).
   Follows the bottom-nav order: home, quran, qibla, tasbih, mosques, settings, more.
   Skips zones with their own gestures: the prayer grid (day swipe), the greeting
   card editor (drag/resize), form fields, and horizontally scrolling strips.
   On a Settings sub-screen, right swipe closes it (back). On a More sub-panel,
   right swipe returns to More. */
(function () {
  const ORDER = ["home", "quran", "qibla", "quiet", "mosques", "settings", "more"];
  const MIN = 80;
  let sx = 0, sy = 0, ok = false;
  const EXCL = "#vaktGrid, #cardStage, input, textarea, select";
  function hScrollable(el) {
    let n = el instanceof Element ? el : null;
    while (n && n !== document.body) {
      if (n.scrollWidth > n.clientWidth + 4) {
        const ov = getComputedStyle(n).overflowX;
        if (ov === "auto" || ov === "scroll") return true;
      }
      n = n.parentElement;
    }
    return false;
  }
  document.addEventListener("touchstart", e => {
    ok = false;
    if (e.touches.length !== 1) return;
    if (e.target.closest(EXCL) || hScrollable(e.target)) return;
    const t = e.touches[0];
    sx = t.clientX; sy = t.clientY; ok = true;
  }, { passive: true });
  document.addEventListener("touchend", e => {
    if (!ok) return;
    ok = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) < MIN || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const back = dx > 0;
    const subOpen = ["loc", "calc", "remind", "appear", "notif"].some(k => {
      const el = document.getElementById("setSub-" + k);
      return el && !el.classList.contains("hidden");
    });
    if (subOpen) { if (back && typeof setShow === "function") setShow(null); return; }
    const cur = typeof visibleTab === "function" ? visibleTab() : "home";
    const i = ORDER.indexOf(cur);
    if (i < 0) { if (back) showTab("more"); return; }
    const n = back ? i - 1 : i + 1;
    if (n < 0 || n >= ORDER.length) return;
    const id = ORDER[n];
    if (id === "settings") {
      showTab("settings");
      if (typeof syncSetControls === "function") syncSetControls();
      if (typeof setShow === "function") setShow(null);
    } else {
      showTab(id);
    }
    window.scrollTo(0, 0);
  }, { passive: true });
})();
setInterval(renderTimes, 1000);
