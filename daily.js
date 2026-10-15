// Daily rotating content: verse, hadith, Asmaa-ul Husna (2026-10-11)
const DAILY_VERSES = [
  { ref: "Ar-Ra'd 13:19", tr_ref: "Ra'd 13:19",
    ar: "أَفَمَن يَعْلَمُ أَنَّمَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ كَمَنْ هُوَ أَعْمَىٰ ۚ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
    trans: "Afa man ya'lamu annamā unzila ilayka min rabbikal-ḥaqqu kaman huwa a'mā, innamā yatadhakkaru ulul-albāb.",
    en: "Then is he who knows that what has been revealed to you from your Lord is the truth like one who is blind? They will only be reminded who are people of understanding.",
    tr: "Rabbinden sana indirilenin gerçek olduğunu bilen kişi, kör olan gibi midir? Ancak akıl sahipleri öğüt alıp düşünür." },
  { ref: "Al-Baqarah 2:152", tr_ref: "Bakara 2:152",
    ar: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    trans: "Fadhkurūnī adhkurkum washkurū lī wa lā takfurūn.",
    en: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    tr: "Öyleyse Beni anın, Ben de sizi anayım. Bana şükredin, nankörlük etmeyin." },
  { ref: "Ash-Sharh 94:6", tr_ref: "İnşirah 94:6",
    ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    trans: "Inna ma'a al-'usri yusrā.",
    en: "Indeed, with hardship comes ease.",
    tr: "Gerçekten, güçlükle beraber kolaylık vardır." },
  { ref: "Al-Ankabut 29:69", tr_ref: "Ankebut 29:69",
    ar: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ",
    trans: "Walladhīna jāhadū fīnā lanahdiyannahum subulanā, wa inna Allāha lama'a al-muḥsinīn.",
    en: "And those who strive for Us – We will surely guide them to Our ways. And indeed, Allah is with the doers of good.",
    tr: "Bizim uğrumuzda çaba gösterenleri elbette yollarımıza iletiriz. Şüphesiz Allah iyilik edenlerle beraberdir." },
  { ref: "Al-Hadid 57:17", tr_ref: "Hadid 57:17",
    ar: "اعْلَمُوا أَنَّ اللَّهَ يُحْيِي الْأَرْضَ بَعْدَ مَوْتِهَا ۚ قَدْ بَيَّنَّا لَكُمُ الْآيَاتِ لَعَلَّكُمْ تَعْقِلُونَ",
    trans: "I'lamū anna Allāha yuḥyī al-arḍa ba'da mawtihā, qad bayyannā lakumu al-āyāti la'allakum ta'qilūn.",
    en: "Know that Allah gives life to the earth after its lifelessness. We have made clear to you the signs; perhaps you will understand.",
    tr: "Bilin ki Allah, yeryüzünü ölümünden sonra diriltir. Düşünesiniz diye size ayetleri açıkladık." },
  { ref: "Az-Zumar 39:53", tr_ref: "Zümer 39:53",
    ar: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
    trans: "Lā taqnaṭū min raḥmatillāh, inna Allāha yaghfiru adh-dhunūba jamī'ā, innahu huwal-ghafūrur-raḥīm.",
    en: "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.",
    tr: "Allah'ın rahmetinden ümit kesmeyin. Şüphesiz Allah bütün günahları bağışlar. Çünkü O, çok bağışlayandır, çok merhamet edendir." },
  { ref: "Al-Baqarah 2:286", tr_ref: "Bakara 2:286",
    ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    trans: "Lā yukallifu Allāhu nafsan illā wus'ahā.",
    en: "Allah does not burden a soul beyond that it can bear.",
    tr: "Allah hiçbir nefse gücünün üstünde bir şey yüklemez." },
  { ref: "Al-Fatiha 1:2", tr_ref: "Fâtiha 1:2",
    ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    en: "All praise is due to Allah, Lord of the worlds.",
    tr: "Hamd, âlemlerin Rabbi Allah'adır." },
  { ref: "Al-Baqarah 2:153", tr_ref: "Bakara 2:153",
    ar: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    en: "O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient.",
    tr: "Ey iman edenler! Sabır ve namazla yardım dileyin. Şüphesiz Allah sabredenlerle beraberdir." },
  { ref: "Aal Imran 3:139", tr_ref: "Âl-i İmrân 3:139",
    ar: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
    en: "Do not lose heart and do not grieve, for you will be superior if you are believers.",
    tr: "Gevşemeyin, üzülmeyin; eğer iman etmişseniz üstün olan sizsiniz." },
  { ref: "An-Nisa 4:110", tr_ref: "Nisâ 4:110",
    ar: "وَمَنْ يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَحِيمًا",
    en: "Whoever does evil or wrongs himself then seeks Allah's forgiveness will find Allah Forgiving, Merciful.",
    tr: "Kim bir kötülük yapar veya kendine zulmeder de sonra Allah'tan bağışlanma dilerse, Allah'ı çok bağışlayıcı ve merhametli bulur." },
  { ref: "Al-Ma'idah 5:8", tr_ref: "Mâide 5:8",
    ar: "وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ",
    en: "Let not hatred of a people prevent you from being just. Be just; that is nearer to righteousness.",
    tr: "Bir topluluğa olan kininiz, sizi adaletsizliğe sevk etmesin. Adil olun; bu, takvaya daha yakındır." },
  { ref: "Al-An'am 6:160", tr_ref: "En'âm 6:160",
    ar: "مَنْ جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا",
    en: "Whoever comes with a good deed will have ten times the like thereof.",
    tr: "Kim bir iyilikle gelirse, ona on katı vardır." },
  { ref: "Al-A'raf 7:56", tr_ref: "A'râf 7:56",
    ar: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِنَ الْمُحْسِنِينَ",
    en: "Indeed, the mercy of Allah is near to the doers of good.",
    tr: "Şüphesiz Allah'ın rahmeti, iyilik edenlere yakındır." },
  { ref: "At-Tawbah 9:51", tr_ref: "Tevbe 9:51",
    ar: "قُلْ لَنْ يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ",
    en: "Say: Nothing will befall us except what Allah has decreed for us; He is our Protector. And in Allah let the believers put their trust.",
    tr: "De ki: Bize Allah'ın yazdığından başkası isabet etmez. O bizim Mevlamızdır. Müminler yalnız Allah'a tevekkül etsinler." },
  { ref: "Yunus 10:62", tr_ref: "Yûnus 10:62",
    ar: "أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    en: "Unquestionably, for the allies of Allah there is no fear, nor shall they grieve.",
    tr: "İyi bilin ki Allah'ın dostlarına korku yoktur ve onlar üzülmeyeceklerdir." },
  { ref: "Ar-Ra'd 13:28", tr_ref: "Ra'd 13:28",
    ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    en: "Unquestionably, by the remembrance of Allah hearts find rest.",
    tr: "İyi bilin ki kalpler ancak Allah'ı anmakla huzur bulur." },
  { ref: "Ibrahim 14:7", tr_ref: "İbrâhim 14:7",
    ar: "لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    en: "If you are grateful, I will surely increase you.",
    tr: "Eğer şükrederseniz, elbette size artırırım." },
  { ref: "Al-Isra 17:82", tr_ref: "İsrâ 17:82",
    ar: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ",
    en: "We send down of the Quran that which is healing and mercy for the believers.",
    tr: "Kur'an'dan, müminler için şifa ve rahmet olanı indiriyoruz." },
  { ref: "Taha 20:114", tr_ref: "Tâhâ 20:114",
    ar: "رَبِّ زِدْنِي عِلْمًا",
    en: "My Lord, increase me in knowledge.",
    tr: "Rabbim! İlmimi artır." },
  { ref: "Al-Furqan 25:74", tr_ref: "Furkân 25:74",
    ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    en: "Our Lord, grant us from our spouses and offspring comfort to our eyes, and make us leaders of the righteous.",
    tr: "Rabbimiz! Bize eşlerimizden ve soyumuzdan göz aydınlığı ver; bizi takva sahiplerine önder kıl." },
];
const DAILY_HADITH = [
  { ref: "Tabarani, el-Mujemul Kabir", tr_ref: "Taberânî, el-Mu'cemü'l-Kebîr",
    en: "O Abu Rafi, Allah guiding a person through your hands is better for you than everything over which the sun rises and sets.",
    tr: "Ey Ebu Rafi! Senin elinle bir kişinin hidayete ermesi, güneşin doğup battığı her şeyden senin için daha hayırlıdır." },
  { ref: "Bukhari & Muslim", tr_ref: "Buhârî ve Müslim",
    en: "The most beloved deeds to Allah are the most consistent, even if small.",
    tr: "Allah'a en sevimli amel, az da olsa devamlı olandır." },
  { ref: "Muslim", tr_ref: "Müslim",
    en: "Purity is half of faith, and Alhamdulillah fills the scale.",
    tr: "Temizlik imanın yarısıdır; Elhamdülillah mizanı doldurur." },
  { ref: "Tirmidhi", tr_ref: "Tirmizî",
    en: "The best among you are those who learn the Quran and teach it.",
    tr: "Sizin en hayırlınız, Kur'an'ı öğrenen ve öğretendir." },
  { ref: "Bukhari", tr_ref: "Buhârî",
    en: "None of you truly believes until he loves for his brother what he loves for himself.",
    tr: "Hiçbiriniz, kendisi için istediğini kardeşi için de istemedikçe gerçekten iman etmiş olmaz." },
  { ref: "Bukhari & Muslim", tr_ref: "Buhârî ve Müslim",
    en: "Actions are but by intentions, and every person shall have only what they intended.",
    tr: "Ameller ancak niyetlere göredir; herkese niyet ettiği şey vardır." },
  { ref: "Muslim", tr_ref: "Müslim",
    en: "The strong is not the one who overcomes people by wrestling; the strong is the one who controls himself in anger.",
    tr: "Güçlü, güreşte rakibini yenen değil; öfke anında kendine hâkim olandır." },
  { ref: "Bukhari", tr_ref: "Buhârî",
    en: "Make things easy and do not make them difficult; give glad tidings and do not repel people.",
    tr: "Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin." },
  { ref: "Tirmidhi", tr_ref: "Tirmizî",
    en: "The most beloved places to Allah are the mosques, and the most disliked places to Allah are the markets.",
    tr: "Allah'a en sevimli yerler mescitler, en sevimsiz yerler çarşılardır." },
  { ref: "Abu Dawud", tr_ref: "Ebû Dâvûd",
    en: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    tr: "Allah'a ve ahiret gününe iman eden, ya hayır söylesin ya sussun." },
  { ref: "Ibn Majah", tr_ref: "İbn Mâce",
    en: "The best of you are the best to their families, and I am the best of you to my family.",
    tr: "Sizin en hayırlınız, ailesine en hayırlı olandır; ben de aileme karşı en hayırlınızım." },
  { ref: "Muslim", tr_ref: "Müslim",
    en: "Do not envy one another, do not hate one another, and do not turn away from one another. Be, O servants of Allah, brothers.",
    tr: "Birbirinize haset etmeyin, kin beslemeyin, sırt çevirmeyin. Ey Allah'ın kulları, kardeş olun." },
  { ref: "Bukhari", tr_ref: "Buhârî",
    en: "The example of a good companion and a bad one is like that of a perfume seller and a blacksmith.",
    tr: "İyi arkadaşla kötü arkadaşın misali, misk satanla demirci gibidir." },
  { ref: "Tirmidhi", tr_ref: "Tirmizî",
    en: "Have taqwa of Allah wherever you are, follow a bad deed with a good one to erase it, and treat people with good character.",
    tr: "Nerede olursan ol Allah'tan kork; kötülüğün ardından iyilik yap ki onu silsin; insanlara güzel ahlakla davran." },
  { ref: "Muslim", tr_ref: "Müslim",
    en: "Allah is Gentle and loves gentleness in all things.",
    tr: "Allah latiftir ve her işte letafeti sever." },
  { ref: "Bukhari", tr_ref: "Buhârî",
    en: "Whoever fasts Ramadan out of faith and hope for reward, his previous sins are forgiven.",
    tr: "Kim inanarak ve sevabını umarak Ramazan orucunu tutarsa, geçmiş günahları bağışlanır." },
  { ref: "Muslim", tr_ref: "Müslim",
    en: "The five daily prayers, Friday to Friday, and Ramadan to Ramadan expiate sins between them, if major sins are avoided.",
    tr: "Beş vakit namaz, bir cumadan diğerine ve bir ramazandan diğerine, büyük günahlardan kaçınıldıkça aralarındaki günahlara kefarettir." }
];
const ASMA = [
  ["ٱلرَّحْمَـٰنُ","Ar-Rahman","The All-Merciful","Merhameti sonsuz olan"],
  ["ٱلرَّحِيمُ","Ar-Rahim","The Most Merciful","Merhamet eden"],
  ["ٱلْمَلِكُ","Al-Malik","The King","Hükümdar, mülkün sahibi"],
  ["ٱلْقُدُّوسُ","Al-Quddus","The Most Holy","Kutsal, eksiklikten uzak"],
  ["ٱلسَّلَـٰمُ","As-Salam","The Source of Peace","Barış ve esenlik veren"],
  ["ٱلْمُؤْمِنُ","Al-Mu'min","The Giver of Faith","Güven veren"],
  ["ٱلْمُهَيْمِنُ","Al-Muhaymin","The Guardian","Gözetip koruyan"],
  ["ٱلْعَزِيزُ","Al-Aziz","The Almighty","Üstün, güçlü"],
  ["ٱلْجَبَّارُ","Al-Jabbar","The Compeller","Dilediğini yaptıran"],
  ["ٱلْمُتَكَبِّرُ","Al-Mutakabbir","The Supreme","Büyüklükte eşsiz"],
  ["ٱلْخَـٰلِقُ","Al-Khaliq","The Creator","Yaratan"],
  ["ٱلْبَارِئُ","Al-Bari","The Originator","Kusursuz yaratan"],
  ["ٱلْمُصَوِّرُ","Al-Musawwir","The Fashioner","Şekil veren"],
  ["ٱلْغَفَّارُ","Al-Ghaffar","The Great Forgiver","Çok bağışlayan"],
  ["ٱلْقَهَّارُ","Al-Qahhar","The Irresistible","Her şeye galip"],
  ["ٱلْوَهَّابُ","Al-Wahhab","The Supreme Bestower","Karşılıksız veren"],
  ["ٱلرَّزَّاقُ","Ar-Razzaq","The Provider","Rızık veren"],
  ["ٱلْفَتَّاحُ","Al-Fattah","The Opener","Hayır kapılarını açan"],
  ["ٱلْعَلِيمُ","Al-Alim","The All-Knowing","Her şeyi bilen"],
  ["ٱلْقَابِضُ","Al-Qabid","The Withholder","Sıkıp daraltan"],
  ["ٱلْبَاسِطُ","Al-Basit","The Extender","Genişleten, bollaştıran"],
  ["ٱلْخَافِضُ","Al-Khafid","The Reducer","Alçaltan"],
  ["ٱلرَّافِعُ","Ar-Rafi","The Exalter","Yükselten"],
  ["ٱلْمُعِزُّ","Al-Mu'izz","The Honourer","İzzet veren"],
  ["ٱلْمُذِلُّ","Al-Mudhill","The Humiliator","Zillete düşüren"],
  ["ٱلسَّمِيعُ","As-Sami","The All-Hearing","Her şeyi işiten"],
  ["ٱلْبَصِيرُ","Al-Basir","The All-Seeing","Her şeyi gören"],
  ["ٱلْحَكَمُ","Al-Hakam","The Impartial Judge","Hükmeden"],
  ["ٱلْعَدْلُ","Al-Adl","The Utterly Just","Adil"],
  ["ٱللَّطِيفُ","Al-Latif","The Subtle One","Lütufkâr"],
  ["ٱلْخَبِيرُ","Al-Khabir","The All-Aware","Her şeyden haberdar"],
  ["ٱلْحَلِيمُ","Al-Halim","The Most Forbearing","Cezada acele etmeyen"],
  ["ٱلْعَظِيمُ","Al-Azim","The Magnificent","Büyük, yüce"],
  ["ٱلْغَفُورُ","Al-Ghafur","The All-Forgiving","Bağışlayan"],
  ["ٱلشَّكُورُ","Ash-Shakur","The Most Appreciative","Şükre karşılık veren"]
];

const DAILY_DUAS = [
  { ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", src: "Tirmidhi",
    en: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm — and He is the All-Hearing, the All-Knowing.",
    tr: "İsmiyle yerde ve gökte hiçbir şeyin zarar veremeyeceği Allah'ın adıyla. O, hakkıyla işiten, hakkıyla bilendir." },
  { ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", src: "Muslim",
    en: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    tr: "Yarattıklarının şerrinden Allah'ın eksiksiz kelimelerine sığınırım." },
  { ar: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ", src: "Abu Dawud",
    en: "O Allah, grant me health in my body; O Allah, grant me health in my hearing; O Allah, grant me health in my sight. There is no deity but You.",
    tr: "Allah'ım! Bedenime âfiyet ver; Allah'ım! Kulağıma âfiyet ver; Allah'ım! Gözüme âfiyet ver. Senden başka ilâh yoktur." },
  { ar: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", src: "Abu Dawud",
    en: "Allah is sufficient for me; there is no deity but Him. In Him I put my trust, and He is the Lord of the Mighty Throne.",
    tr: "Allah bana yeter; O'ndan başka ilâh yoktur. O'na tevekkül ettim; O, büyük Arş'ın Rabbidir." },
  { ar: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", src: "Abu Dawud",
    en: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
    tr: "Allah'ım! Kullarını dirilteceğin gün beni azabından koru." },
  { ar: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", src: "Abu Dawud",
    en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.",
    tr: "Rab olarak Allah'tan, din olarak İslâm'dan, peygamber olarak Muhammed'den (sallallahu aleyhi ve sellem) razı oldum." },
  { ar: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", src: "Muslim",
    en: "O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor.",
    tr: "Allah'ım! Sen Selâm'sın, selâmet Sendendir. Ey celâl ve ikram sahibi, Sen münezzehsin." },
];
const DAILY_NAMES = [
  ["Yusuf","The prophet famed for patience, beauty and forgiveness.","Sabır, güzellik ve affediciliğiyle tanınan peygamber.","Maryam","The only woman named in the Quran; a symbol of purity and devotion.","Kur'an'da adı geçen tek kadın; saflık ve adanmışlığın simgesi."],
  ["Ibrahim","Father of the prophets, known for unwavering faith.","Peygamberlerin atası; sarsılmaz imanıyla bilinir.","Fatimah","Beloved daughter of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ sevgili kızı."],
  ["Muhammad","'The praised one' — the name of the Prophet ﷺ.","'Övülen' — Peygamber Efendimiz'in ﷺ adı.","Khadijah","The Prophet's ﷺ first wife and the first believer in Islam.","Peygamber Efendimiz'in ﷺ ilk eşi ve ilk iman eden."],
  ["Musa","The prophet who spoke with Allah and freed his people.","Allah ile konuşan ve kavmini özgürlüğe kavuşturan peygamber.","Asiyah","The righteous wife of Pharaoh; among the greatest women ever.","Firavun'un salih eşi; en yüce kadınlardan biri."],
  ["Isa","The Messiah, a prophet of miracles and mercy.","Mesih; mucizeler ve merhamet peygamberi.","Hajar","Mother of Ismail, famed for her trust in Allah in the desert.","İsmail'in annesi; çölde Allah'a tevekkülüyle bilinir."],
  ["Ismail","The devoted son, known for patience and obedience.","Sabır ve itaatiyle bilinen adanmış evlat.","Aisha","Wife of the Prophet ﷺ and one of Islam's greatest scholars.","Peygamber Efendimiz'in ﷺ eşi; İslam'ın en büyük âlimlerindendir."],
  ["Ishaq","A prophet and son of Ibrahim, bearer of glad tidings.","İbrahim'in oğlu, müjdeyle anılan peygamber.","Sumayyah","The first martyr of Islam, steadfast under persecution.","İslam'ın ilk şehidi; zulüm karşısında sebat etti."],
  ["Yaqub","A prophet renowned for beautiful patience.","Güzel sabrıyla tanınan peygamber.","Ruqayyah","Daughter of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ kızı."],
  ["Yunus","The prophet who called his people back to Allah.","Kavmini Allah'a çağıran peygamber.","Zainab","Eldest daughter of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ en büyük kızı."],
  ["Sulaiman","The wise king-prophet, granted a kingdom like no other.","Bilge kral-peygamber; eşsiz bir mülk verildi.","Bilqis","The wise Queen of Sheba who embraced the truth.","Hakikati kabul eden bilge Sebe Melikesi."],
  ["Dawud","A prophet-king with a beautiful voice; the Psalms (Zabur) were revealed to him.","Güzel sesli peygamber-kral; Zebur ona indirildi.","Hannah","Mother of Maryam, who devoted her child to Allah's service.","Meryem'in annesi; çocuğunu Allah'a adadı."],
  ["Harun","Prophet and brother of Musa, his eloquent spokesman.","Musa'nın kardeşi ve güzel konuşan yardımcısı peygamber.","Safiyyah","A wife of the Prophet ﷺ, known for wisdom and courage.","Peygamber Efendimiz'in ﷺ eşi; bilgelik ve cesaretiyle bilinir."],
  ["Zakariya","The prophet who cared for Maryam and prayed for a righteous son.","Meryem'in bakımını üstlenen ve hayırlı evlat için dua eden peygamber.","Aminah","Mother of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ annesi."],
  ["Ali","The Prophet's ﷺ cousin and son-in-law; the name means 'elevated, noble'.","Peygamber Efendimiz'in ﷺ amcaoğlu ve damadı; anlamı 'yüce, asil'.","Hafsa","Wife of the Prophet ﷺ and keeper of the first written Quran.","Peygamber Efendimiz'in ﷺ eşi; ilk yazılı Kur'an'ın koruyucusu."],
  ["Umar","The second caliph; the name means 'flourishing, long-lived'.","İkinci halife; adı 'gelişen, ömürlü' anlamındadır.","Nusaybah","The brave companion who defended the Prophet ﷺ at Uhud.","Uhud'da Peygamber'i ﷺ koruyan cesur sahabi."],
  ["Uthman","The third caliph, famed for generosity and modesty.","Üçüncü halife; cömertlik ve hayâsıyla ünlü.","Khawlah","A fearless companion known for her bravery in battle.","Savaş meydanındaki cesaretiyle tanınan sahabi."],
  ["Bilal","The first muezzin of Islam, chosen for his beautiful voice.","Güzel sesi için seçilen İslam'ın ilk müezzini.","Barakah","Umm Ayman, the devoted caretaker of the Prophet ﷺ.","Ümmü Eymen; Peygamber Efendimiz'in ﷺ dadısı."],
  ["Salman","Salman the Persian, the famous seeker of truth.","Salman-ı Farisi; hakikati arayan ünlü sahabi.","Asma","Daughter of Abu Bakr, remembered as 'she of the two belts'.","Ebubekir'in kızı; 'iki kuşaklı' diye anılır."],
  ["Hamza","The Prophet's ﷺ uncle, called the Lion of Allah.","Peygamber Efendimiz'in ﷺ amcası; 'Allah'ın Aslanı' lakaplı.","Halimah","The kind foster mother who nursed the Prophet ﷺ.","Peygamber Efendimiz'i ﷺ emziren şefkatli sütanne."],
  ["Idris","A prophet praised for wisdom, truthfulness and patience.","Bilgelik, doğruluk ve sabrıyla övülen peygamber.","Hawwa","Eve, the mother of all mankind.","Havva; bütün insanlığın annesi."],
  ["Nuh","The prophet who preached patiently for 950 years.","950 yıl sabırla tebliğ eden peygamber.","Sarah","Wife of Ibrahim and mother of Ishaq, a woman of strong faith.","İbrahim'in eşi ve İshak'ın annesi; güçlü iman sahibi."],
  ["Adam","The first human and the first prophet.","İlk insan ve ilk peygamber.","Juwairiyah","A wife of the Prophet ﷺ whose marriage brought freedom to many.","Evliliği birçok kişinin özgürlüğüne vesile olan, Peygamber'in ﷺ eşi."],
  ["Ilyas","A prophet who called his people to worship Allah alone.","Kavmini yalnızca Allah'a ibadete çağıran peygamber.","Kulthum","Umm Kulthum, daughter of the Prophet Muhammad ﷺ.","Ümmü Gülsüm; Peygamber Efendimiz'in ﷺ kızı."],
  ["Hud","The prophet sent to the people of 'Ad.","Âd kavmine gönderilen peygamber.","Maymunah","The last wife of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ son eşi."],
  ["Salih","The prophet sent to the people of Thamud.","Semud kavmine gönderilen peygamber.","Ramla","Umm Habiba, wife of the Prophet ﷺ, steadfast in exile.","Ümmü Habibe; gurbette sebat eden, Peygamber'in ﷺ eşi."]
];
/* Moment card backgrounds: no-text images, rotated daily per card */
const MOMENT_BGS = ["mosque-sunset.jpg", "lanterns.jpg", "kaaba-night.jpg", "pattern-emerald.jpg", "crescent-lake.jpg", "quran-light.jpg", "dome-sky.jpg", "desert-dunes.jpg", "mosque-dawn.jpg", "pattern-navy.jpg", "dunes-night.jpg", "window-light.jpg", "arabesque-dark.jpg", "olive-morning.jpg", "lake-dusk.jpg", "tasbih-dark.jpg"];
function momentBg(cardIdx) {
  const day = Math.floor(Date.now() / 864e5);
  return "/cards/" + MOMENT_BGS[(day + cardIdx * 3) % MOMENT_BGS.length];
}

function renderDaily() {
  const day = Math.floor(Date.now() / 864e5);
  const lang = (window.DDHLang && window.DDHLang()) || document.documentElement.lang || 'en';
  const tr = lang === 'tr';
  const set = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  const setBg = (id, cardIdx) => { const el = document.getElementById(id); if (el) el.src = momentBg(cardIdx); };
  // backgrounds rotate daily, offset per card
  setBg('mDuaBg', 0); setBg('mHadithBg', 1); setBg('mAyahBg', 2); setBg('mAsmaBg', 3);
  const du = DAILY_DUAS[day % DAILY_DUAS.length];
  set('mDuaAr', du.ar);
  set('mDuaTx', '"' + (tr ? du.tr : du.en) + '"');
  set('mDuaRef', du.src);
  const h = DAILY_HADITH[day % DAILY_HADITH.length];
  set('mHadithTx', '"' + (tr ? h.tr : h.en) + '"');
  set('mHadithRef', tr ? h.tr_ref : h.ref);
  const v = DAILY_VERSES[day % DAILY_VERSES.length];
  set('mAyahAr', v.ar);
  set('mAyahTx', '"' + (tr ? v.tr : v.en) + '"');
  set('mAyahRef', tr ? v.tr_ref : v.ref);
  const a = ASMA[day % ASMA.length];
  set('mAsmaAr', a[0]);
  set('mAsmaTx', a[1]);
  set('mAsmaRef', tr ? a[3] : a[2]);
  const nm = DAILY_NAMES[day % DAILY_NAMES.length];
  const setHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  setHTML('mBoyName', `👦 <b>${nm[0]}</b> — ${tr ? nm[2] : nm[1]}`);
  setHTML('mGirlName', `👧 <b>${nm[3]}</b> — ${tr ? nm[5] : nm[4]}`);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderDaily);
else renderDaily();

/* Shareable daily card images (2026-10-15) */
const DCARD_COLORS = { verse: "#e8734a", hadith: "#22c55e", dua: "#3b82f6", asma: "#a855f7" };
const DCARD_LABELS = {
  verse: { en: "VERSE OF THE DAY", tr: "GÜNÜN AYETİ" },
  hadith: { en: "HADITH OF THE DAY", tr: "GÜNÜN HADİSİ" },
  dua: { en: "DUA OF THE DAY", tr: "GÜNÜN DUASI" },
  asma: { en: "ASMA-UL HUSNA", tr: "ESMA-ÜL HÜSNA" }
};
function dailyCardData(type) {
  const day = Math.floor(Date.now() / 864e5);
  const lang = (window.DDHLang && window.DDHLang()) || document.documentElement.lang || 'en';
  const tr = lang === 'tr';
  if (type === 'verse') {
    const v = DAILY_VERSES[day % DAILY_VERSES.length];
    return { ar: v.ar, text: tr ? v.tr : v.en, ref: tr ? v.tr_ref : v.ref, tr };
  }
  if (type === 'hadith') {
    const h = DAILY_HADITH[day % DAILY_HADITH.length];
    return { ar: null, text: tr ? h.tr : h.en, ref: tr ? h.tr_ref : h.ref, tr };
  }
  if (type === 'asma') {
    const a = ASMA[day % ASMA.length];
    return { ar: a[0], text: a[1], ref: tr ? a[3] : a[2], tr };
  }
  const d = DAILY_DUAS[day % DAILY_DUAS.length];
  return { ar: d.ar, text: tr ? d.tr : d.en, ref: d.src, tr };
}
const DCARD_BGIDX = { verse: 2, hadith: 1, dua: 0, asma: 3 };
async function shareDailyCard(type) {
  const d = dailyCardData(type);
  const color = DCARD_COLORS[type];
  const label = (d.tr ? DCARD_LABELS[type].tr : DCARD_LABELS[type].en);
  const W = 1080, H = 1350;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const cx = cv.getContext("2d");
  // background image with dark overlay
  const bgImg = await new Promise(res => {
    const im = new Image();
    im.onload = () => res(im); im.onerror = () => res(null);
    im.src = momentBg(DCARD_BGIDX[type] || 0);
  });
  if (bgImg) {
    const s = Math.max(W / bgImg.width, H / bgImg.height);
    const dw = bgImg.width * s, dh = bgImg.height * s;
    cx.drawImage(bgImg, (W - dw) / 2, (H - dh) / 2, dw, dh);
  } else {
    const bg = cx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#1a1a2e"); bg.addColorStop(1, "#0f0f1a");
    cx.fillStyle = bg; cx.fillRect(0, 0, W, H);
  }
  cx.fillStyle = "rgba(10,10,20,0.62)"; cx.fillRect(0, 0, W, H);
  let y = 120;
  // pill badge
  cx.font = "700 32px sans-serif";
  const tw = cx.measureText(label).width;
  const pw = tw + 80, ph = 72, px = (W - pw) / 2;
  cx.fillStyle = color + "22";
  cx.strokeStyle = color; cx.lineWidth = 3;
  cx.beginPath(); cx.roundRect(px, y, pw, ph, 36); cx.fill(); cx.stroke();
  cx.fillStyle = color; cx.textAlign = "center"; cx.textBaseline = "middle";
  cx.fillText(label, W / 2, y + ph / 2 + 2);
  y += ph + 70;
  // Arabic text
  if (d.ar) {
    cx.fillStyle = color;
    cx.font = "400 64px Amiri, serif";
    cx.direction = "rtl";
    const maxW = W * 0.84;
    const words = d.ar.split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach(w => {
      const t = line ? line + " " + w : w;
      if (cx.measureText(t).width > maxW && line) { lines.push(line); line = w; }
      else line = t;
    });
    if (line) lines.push(line);
    const lh = 96;
    lines.forEach((ln, i) => cx.fillText(ln, W / 2, y + lh * i));
    y += lh * lines.length + 50;
    cx.direction = "ltr";
    // divider
    cx.fillStyle = color + "66";
    cx.fillRect(W / 2 - 60, y, 120, 6);
    y += 60;
  }
  // translation
  cx.fillStyle = "#e8e8f0";
  cx.font = "italic 400 44px serif";
  const maxW2 = W * 0.84;
  const words2 = d.text.split(/\s+/);
  const lines2 = [];
  let line2 = "";
  words2.forEach(w => {
    const t = line2 ? line2 + " " + w : w;
    if (cx.measureText(t).width > maxW2 && line2) { lines2.push(line2); line2 = w; }
    else line2 = t;
  });
  if (line2) lines2.push(line2);
  const lh2 = 68;
  lines2.forEach((ln, i) => cx.fillText('"' + ln + (i === lines2.length - 1 ? '"' : ""), W / 2, y + lh2 * i));
  y += lh2 * lines2.length + 50;
  // reference
  cx.fillStyle = "#888899";
  cx.font = "400 36px sans-serif";
  cx.fillText("— " + d.ref, W / 2, y);
  // watermark bottom-left
  const wfs = 30;
  cx.font = `400 ${wfs}px sans-serif`;
  cx.textAlign = "left"; cx.textBaseline = "bottom";
  cx.shadowColor = "rgba(0,0,0,0.85)"; cx.shadowBlur = 10;
  cx.fillStyle = "#ffffff";
  cx.fillText("— dailydeenhub", 28, H - 28);
  cx.shadowBlur = 0;
  const blob = await new Promise(res => cv.toBlob(res, "image/jpeg", 0.92));
  const file = new File([blob], `dailydeenhub-${type}.jpg`, { type: "image/jpeg" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: label });
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `dailydeenhub-${type}.jpg`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }
  } catch (e) { /* user cancelled */ }
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-mshare]");
  if (b) shareDailyCard(b.dataset.mshare);
});

/* Daily content engine (2026-10-15): rotates sources each day —
   verse → hadith → dua → verse… Special days override the rotation:
   Friday gets a Jumu'ah hadith, Ramadan gets a fasting verse. */
const JUMUAH_HADITH_IDX = [16]; // "five daily prayers, Friday to Friday…"
const RAMADAN_VERSE_IDX = [13]; // At-Tawbah 9:51 (trust in Allah) — swap for fasting verse when curated
function dailySource() {
  const now = new Date();
  const day = Math.floor(Date.now() / 864e5);
  // Friday override
  if (now.getDay() === 5) return { kind: "hadith", idx: JUMUAH_HADITH_IDX[day % JUMUAH_HADITH_IDX.length] };
  // Ramadan override (approx via holy-days list if present)
  if (typeof HOLY_DAYS !== "undefined") {
    const iso = now.toISOString().slice(0, 10);
    const ramadan = HOLY_DAYS.find(e => /ramadan/i.test(e.en || "") && e.d <= iso && iso <= e.end);
    if (ramadan) return { kind: "verse", idx: RAMADAN_VERSE_IDX[day % RAMADAN_VERSE_IDX.length] };
  }
  const kinds = ["verse", "hadith", "dua"];
  const kind = kinds[day % 3];
  const pool = kind === "verse" ? DAILY_VERSES : kind === "hadith" ? DAILY_HADITH : DAILY_DUAS;
  // stagger the index so each source cycles independently
  const idx = Math.floor(day / 3) % pool.length;
  return { kind, idx };
}
