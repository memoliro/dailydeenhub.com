// Daily rotating content: verse, hadith, Asmaa-ul Husna (2026-10-11)
const DAILY_VERSES = [
  { ref: "Ar-Ra'd 13:19", tr_ref: "Ra'd 13:19",
    ar: "أَفَمَن يَعْلَمُ أَنَّمَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ كَمَنْ هُوَ أَعْمَىٰ ۚ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
    trans: "Afa man ya'lamu annamā unzila ilayka min rabbikal-ḥaqqu kaman huwa a'mā, innamā yatadhakkaru ulul-albāb.",
    en: "Then is he who knows that what has been revealed to you from your Lord is the truth like one who is blind? They will only be reminded who are people of understanding.",
    tr: "Rabbinden sana indirilenin gerçek olduğunu bilen kişi, kör olan gibi midir? Ancak akıl sahipleri öğüt alıp düşünür.",
    fr_ref: "Ar-Ra'd 13:19",
    fr: "Celui qui sait que ce qui t'a été révélé de la part de ton Seigneur est la vérité, est-il semblable à l'aveugle ? Seuls les doués d'intelligence s'en souviennent." },
  { ref: "Al-Baqarah 2:152", tr_ref: "Bakara 2:152",
    ar: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    trans: "Fadhkurūnī adhkurkum washkurū lī wa lā takfurūn.",
    en: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    tr: "Öyleyse Beni anın, Ben de sizi anayım. Bana şükredin, nankörlük etmeyin.",
    fr_ref: "Al-Baqara 2:152",
    fr: "Souvenez-vous de Moi, Je Me souviendrai de vous. Remerciez-Moi et ne soyez pas ingrats envers Moi." },
  { ref: "Ash-Sharh 94:6", tr_ref: "İnşirah 94:6",
    ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    trans: "Inna ma'a al-'usri yusrā.",
    en: "Indeed, with hardship comes ease.",
    tr: "Gerçekten, güçlükle beraber kolaylık vardır.",
    fr_ref: "Ash-Sharh 94:6",
    fr: "En vérité, avec la difficulté vient la facilité." },
  { ref: "Al-Ankabut 29:69", tr_ref: "Ankebut 29:69",
    ar: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ",
    trans: "Walladhīna jāhadū fīnā lanahdiyannahum subulanā, wa inna Allāha lama'a al-muḥsinīn.",
    en: "And those who strive for Us – We will surely guide them to Our ways. And indeed, Allah is with the doers of good.",
    tr: "Bizim uğrumuzda çaba gösterenleri elbette yollarımıza iletiriz. Şüphesiz Allah iyilik edenlerle beraberdir.",
    fr_ref: "Al-Ankabout 29:69",
    fr: "Et ceux qui luttent pour Notre cause, Nous les guiderons sur Nos chemins. Allah est en vérité avec les bienfaisants." },
  { ref: "Al-Hadid 57:17", tr_ref: "Hadid 57:17",
    ar: "اعْلَمُوا أَنَّ اللَّهَ يُحْيِي الْأَرْضَ بَعْدَ مَوْتِهَا ۚ قَدْ بَيَّنَّا لَكُمُ الْآيَاتِ لَعَلَّكُمْ تَعْقِلُونَ",
    trans: "I'lamū anna Allāha yuḥyī al-arḍa ba'da mawtihā, qad bayyannā lakumu al-āyāti la'allakum ta'qilūn.",
    en: "Know that Allah gives life to the earth after its lifelessness. We have made clear to you the signs; perhaps you will understand.",
    tr: "Bilin ki Allah, yeryüzünü ölümünden sonra diriltir. Düşünesiniz diye size ayetleri açıkladık.",
    fr_ref: "Al-Hadid 57:17",
    fr: "Sachez qu'Allah redonne vie à la terre après sa mort. Nous vous avons exposé clairement les signes, afin que vous raisonniez." },
  { ref: "Az-Zumar 39:53", tr_ref: "Zümer 39:53",
    ar: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
    trans: "Lā taqnaṭū min raḥmatillāh, inna Allāha yaghfiru adh-dhunūba jamī'ā, innahu huwal-ghafūrur-raḥīm.",
    en: "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.",
    tr: "Allah'ın rahmetinden ümit kesmeyin. Şüphesiz Allah bütün günahları bağışlar. Çünkü O, çok bağışlayandır, çok merhamet edendir.",
    fr_ref: "Az-Zoumar 39:53",
    fr: "Ne désespérez pas de la miséricorde d'Allah. Allah pardonne tous les péchés. C'est Lui le Pardonneur, le Très Miséricordieux." },
  { ref: "Al-Baqarah 2:286", tr_ref: "Bakara 2:286",
    ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    trans: "Lā yukallifu Allāhu nafsan illā wus'ahā.",
    en: "Allah does not burden a soul beyond that it can bear.",
    tr: "Allah hiçbir nefse gücünün üstünde bir şey yüklemez.",
    fr_ref: "Al-Baqara 2:286",
    fr: "Allah n'impose à aucune âme une charge supérieure à sa capacité." },
  { ref: "Al-Fatiha 1:2", tr_ref: "Fâtiha 1:2",
    ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    en: "All praise is due to Allah, Lord of the worlds.",
    tr: "Hamd, âlemlerin Rabbi Allah'adır.",
    fr_ref: "Al-Fatiha 1:2",
    fr: "Louange à Allah, Seigneur des mondes." },
  { ref: "Al-Baqarah 2:153", tr_ref: "Bakara 2:153",
    ar: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    en: "O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient.",
    tr: "Ey iman edenler! Sabır ve namazla yardım dileyin. Şüphesiz Allah sabredenlerle beraberdir.",
    fr_ref: "Al-Baqara 2:153",
    fr: "Ô vous qui croyez ! Cherchez secours dans la patience et la prière. Allah est avec les patients." },
  { ref: "Aal Imran 3:139", tr_ref: "Âl-i İmrân 3:139",
    ar: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
    en: "Do not lose heart and do not grieve, for you will be superior if you are believers.",
    tr: "Gevşemeyin, üzülmeyin; eğer iman etmişseniz üstün olan sizsiniz.",
    fr_ref: "Al-Imran 3:139",
    fr: "Ne perdez pas courage et ne vous affligez pas : vous aurez le dessus, si vous êtes croyants." },
  { ref: "An-Nisa 4:110", tr_ref: "Nisâ 4:110",
    ar: "وَمَنْ يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَحِيمًا",
    en: "Whoever does evil or wrongs himself then seeks Allah's forgiveness will find Allah Forgiving, Merciful.",
    tr: "Kim bir kötülük yapar veya kendine zulmeder de sonra Allah'tan bağışlanma dilerse, Allah'ı çok bağışlayıcı ve merhametli bulur.",
    fr_ref: "An-Nissa 4:110",
    fr: "Quiconque fait le mal ou se fait du tort à lui-même, puis implore le pardon d'Allah, trouvera Allah Pardonneur et Miséricordieux." },
  { ref: "Al-Ma'idah 5:8", tr_ref: "Mâide 5:8",
    ar: "وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ",
    en: "Let not hatred of a people prevent you from being just. Be just; that is nearer to righteousness.",
    tr: "Bir topluluğa olan kininiz, sizi adaletsizliğe sevk etmesin. Adil olun; bu, takvaya daha yakındır.",
    fr_ref: "Al-Ma'ida 5:8",
    fr: "Que la haine envers un peuple ne vous incite pas à être injustes. Soyez équitables : c'est plus proche de la piété." },
  { ref: "Al-An'am 6:160", tr_ref: "En'âm 6:160",
    ar: "مَنْ جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا",
    en: "Whoever comes with a good deed will have ten times the like thereof.",
    tr: "Kim bir iyilikle gelirse, ona on katı vardır.",
    fr_ref: "Al-An'am 6:160",
    fr: "Quiconque viendra avec une bonne action en aura dix fois autant." },
  { ref: "Al-A'raf 7:56", tr_ref: "A'râf 7:56",
    ar: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِنَ الْمُحْسِنِينَ",
    en: "Indeed, the mercy of Allah is near to the doers of good.",
    tr: "Şüphesiz Allah'ın rahmeti, iyilik edenlere yakındır.",
    fr_ref: "Al-A'raf 7:56",
    fr: "La miséricorde d'Allah est proche des bienfaisants." },
  { ref: "At-Tawbah 9:51", tr_ref: "Tevbe 9:51",
    ar: "قُلْ لَنْ يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ",
    en: "Say: Nothing will befall us except what Allah has decreed for us; He is our Protector. And in Allah let the believers put their trust.",
    tr: "De ki: Bize Allah'ın yazdığından başkası isabet etmez. O bizim Mevlamızdır. Müminler yalnız Allah'a tevekkül etsinler.",
    fr_ref: "At-Tawba 9:51",
    fr: "Dis : « Rien ne nous atteindra, en dehors de ce qu'Allah a prescrit pour nous. Il est notre Protecteur. » C'est en Allah que les croyants doivent placer leur confiance." },
  { ref: "Yunus 10:62", tr_ref: "Yûnus 10:62",
    ar: "أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    en: "Unquestionably, for the allies of Allah there is no fear, nor shall they grieve.",
    tr: "İyi bilin ki Allah'ın dostlarına korku yoktur ve onlar üzülmeyeceklerdir.",
    fr_ref: "Younous 10:62",
    fr: "En vérité, les alliés d'Allah ne connaîtront ni crainte ni tristesse." },
  { ref: "Ar-Ra'd 13:28", tr_ref: "Ra'd 13:28",
    ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    en: "Unquestionably, by the remembrance of Allah hearts find rest.",
    tr: "İyi bilin ki kalpler ancak Allah'ı anmakla huzur bulur.",
    fr_ref: "Ar-Ra'd 13:28",
    fr: "En vérité, c'est par le rappel d'Allah que les cœurs s'apaisent." },
  { ref: "Ibrahim 14:7", tr_ref: "İbrâhim 14:7",
    ar: "لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    en: "If you are grateful, I will surely increase you.",
    tr: "Eğer şükrederseniz, elbette size artırırım.",
    fr_ref: "Ibrahim 14:7",
    fr: "Si vous êtes reconnaissants, Je vous comblerai davantage." },
  { ref: "Al-Isra 17:82", tr_ref: "İsrâ 17:82",
    ar: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ",
    en: "We send down of the Quran that which is healing and mercy for the believers.",
    tr: "Kur'an'dan, müminler için şifa ve rahmet olanı indiriyoruz.",
    fr_ref: "Al-Isra 17:82",
    fr: "Nous révélons du Coran ce qui est guérison et miséricorde pour les croyants." },
  { ref: "Taha 20:114", tr_ref: "Tâhâ 20:114",
    ar: "رَبِّ زِدْنِي عِلْمًا",
    en: "My Lord, increase me in knowledge.",
    tr: "Rabbim! İlmimi artır.",
    fr_ref: "Ta-Ha 20:114",
    fr: "Seigneur, accrois mes connaissances." },
  { ref: "Al-Furqan 25:74", tr_ref: "Furkân 25:74",
    ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    en: "Our Lord, grant us from our spouses and offspring comfort to our eyes, and make us leaders of the righteous.",
    tr: "Rabbimiz! Bize eşlerimizden ve soyumuzdan göz aydınlığı ver; bizi takva sahiplerine önder kıl.",
    fr_ref: "Al-Fourqane 25:74",
    fr: "Seigneur, accorde-nous de nos épouses et de notre descendance la joie de nos yeux, et fais de nous des guides pour les pieux." },
];
const DAILY_HADITH = [{ ref: "Tabarani, el-Mujemul Kabir", tr_ref: "Taberânî, el-Mu'cemü'l-Kebîr",
    en: "O Abu Rafi, Allah guiding a person through your hands is better for you than everything over which the sun rises and sets.",
    tr: "Ey Ebu Rafi! Senin elinle bir kişinin hidayete ermesi, güneşin doğup battığı her şeyden senin için daha hayırlıdır." ,
    fr_ref: "Tabarani, al-Mou'jam al-Kabir",
    fr: "Ô Abou Rafi, qu'Allah guide une personne par ton intermédiaire est meilleur pour toi que tout ce sur quoi le soleil se lève et se couche." },
{ ref: "Bukhari & Muslim", tr_ref: "Buhârî ve Müslim",
    en: "The most beloved deeds to Allah are the most consistent, even if small.",
    tr: "Allah'a en sevimli amel, az da olsa devamlı olandır." ,
    fr_ref: "Boukhari et Mouslim",
    fr: "Les œuvres les plus aimées d'Allah sont les plus constantes, même si elles sont petites." },
{ ref: "Muslim", tr_ref: "Müslim",
    en: "Purity is half of faith, and Alhamdulillah fills the scale.",
    tr: "Temizlik imanın yarısıdır; Elhamdülillah mizanı doldurur." ,
    fr_ref: "Mouslim",
    fr: "La pureté est la moitié de la foi, et « Alhamdoulillah » remplit la balance." },
{ ref: "Tirmidhi", tr_ref: "Tirmizî",
    en: "The best among you are those who learn the Quran and teach it.",
    tr: "Sizin en hayırlınız, Kur'an'ı öğrenen ve öğretendir." ,
    fr_ref: "Tirmidhi",
    fr: "Les meilleurs d'entre vous sont ceux qui apprennent le Coran et l'enseignent." },
{ ref: "Bukhari", tr_ref: "Buhârî",
    en: "None of you truly believes until he loves for his brother what he loves for himself.",
    tr: "Hiçbiriniz, kendisi için istediğini kardeşi için de istemedikçe gerçekten iman etmiş olmaz." ,
    fr_ref: "Boukhari",
    fr: "Aucun de vous ne croit véritablement tant qu'il n'aime pas pour son frère ce qu'il aime pour lui-même." },
{ ref: "Bukhari & Muslim", tr_ref: "Buhârî ve Müslim",
    en: "Actions are but by intentions, and every person shall have only what they intended.",
    tr: "Ameller ancak niyetlere göredir; herkese niyet ettiği şey vardır." ,
    fr_ref: "Boukhari et Mouslim",
    fr: "Les actes ne valent que par les intentions, et chacun n'aura que ce qu'il a eu l'intention de faire." },
{ ref: "Muslim", tr_ref: "Müslim",
    en: "The strong is not the one who overcomes people by wrestling; the strong is the one who controls himself in anger.",
    tr: "Güçlü, güreşte rakibini yenen değil; öfke anında kendine hâkim olandır." ,
    fr_ref: "Mouslim",
    fr: "Le fort n'est pas celui qui terrasse les gens à la lutte ; le fort est celui qui se maîtrise dans la colère." },
{ ref: "Bukhari", tr_ref: "Buhârî",
    en: "Make things easy and do not make them difficult; give glad tidings and do not repel people.",
    tr: "Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin." ,
    fr_ref: "Boukhari",
    fr: "Facilitez les choses et ne les rendez pas difficiles ; annoncez de bonnes nouvelles et ne repoussez pas les gens." },
{ ref: "Tirmidhi", tr_ref: "Tirmizî",
    en: "The most beloved places to Allah are the mosques, and the most disliked places to Allah are the markets.",
    tr: "Allah'a en sevimli yerler mescitler, en sevimsiz yerler çarşılardır." ,
    fr_ref: "Tirmidhi",
    fr: "Les lieux les plus aimés d'Allah sont les mosquées, et les lieux les plus détestés d'Allah sont les marchés." },
{ ref: "Abu Dawud", tr_ref: "Ebû Dâvûd",
    en: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    tr: "Allah'a ve ahiret gününe iman eden, ya hayır söylesin ya sussun." ,
    fr_ref: "Abou Dawoud",
    fr: "Que celui qui croit en Allah et au Jour dernier dise du bien ou qu'il se taise." },
{ ref: "Ibn Majah", tr_ref: "İbn Mâce",
    en: "The best of you are the best to their families, and I am the best of you to my family.",
    tr: "Sizin en hayırlınız, ailesine en hayırlı olandır; ben de aileme karşı en hayırlınızım." ,
    fr_ref: "Ibn Majah",
    fr: "Les meilleurs d'entre vous sont les meilleurs envers leurs familles, et je suis le meilleur d'entre vous envers ma famille." },
{ ref: "Muslim", tr_ref: "Müslim",
    en: "Do not envy one another, do not hate one another, and do not turn away from one another. Be, O servants of Allah, brothers.",
    tr: "Birbirinize haset etmeyin, kin beslemeyin, sırt çevirmeyin. Ey Allah'ın kulları, kardeş olun." ,
    fr_ref: "Mouslim",
    fr: "Ne vous enviez pas les uns les autres, ne vous haïssez pas les uns les autres, et ne vous détournez pas les uns des autres. Soyez, ô serviteurs d'Allah, des frères." },
{ ref: "Bukhari", tr_ref: "Buhârî",
    en: "The example of a good companion and a bad one is like that of a perfume seller and a blacksmith.",
    tr: "İyi arkadaşla kötü arkadaşın misali, misk satanla demirci gibidir." ,
    fr_ref: "Boukhari",
    fr: "L'exemple du bon compagnon et du mauvais est comme celui du vendeur de parfum et du forgeron." },
{ ref: "Tirmidhi", tr_ref: "Tirmizî",
    en: "Have taqwa of Allah wherever you are, follow a bad deed with a good one to erase it, and treat people with good character.",
    tr: "Nerede olursan ol Allah'tan kork; kötülüğün ardından iyilik yap ki onu silsin; insanlara güzel ahlakla davran." ,
    fr_ref: "Tirmidhi",
    fr: "Craignez Allah où que vous soyez, faites suivre une mauvaise action d'une bonne qui l'effacera, et comportez-vous envers les gens avec un bon caractère." },
{ ref: "Muslim", tr_ref: "Müslim",
    en: "Allah is Gentle and loves gentleness in all things.",
    tr: "Allah latiftir ve her işte letafeti sever." ,
    fr_ref: "Mouslim",
    fr: "Allah est Doux et Il aime la douceur en toute chose." },
{ ref: "Bukhari", tr_ref: "Buhârî",
    en: "Whoever fasts Ramadan out of faith and hope for reward, his previous sins are forgiven.",
    tr: "Kim inanarak ve sevabını umarak Ramazan orucunu tutarsa, geçmiş günahları bağışlanır." ,
    fr_ref: "Boukhari",
    fr: "Quiconque jeûne le Ramadan par foi et en espérant la récompense, ses péchés passés lui seront pardonnés." },
{ ref: "Muslim", tr_ref: "Müslim",
    en: "The five daily prayers, Friday to Friday, and Ramadan to Ramadan expiate sins between them, if major sins are avoided.",
    tr: "Beş vakit namaz, bir cumadan diğerine ve bir ramazandan diğerine, büyük günahlardan kaçınıldıkça aralarındaki günahlara kefarettir." ,
    fr_ref: "Mouslim",
    fr: "Les cinq prières quotidiennes, d'un vendredi à l'autre, et d'un Ramadan à l'autre, expient les péchés commis entre eux, tant que les péchés majeurs sont évités." }
];
const ASMA = [
  ["ٱلرَّحْمَـٰنُ","Ar-Rahman","The All-Merciful","Merhameti sonsuz olan","Le Tout-Miséricordieux"],
  ["ٱلرَّحِيمُ","Ar-Rahim","The Most Merciful","Merhamet eden","Le Très-Miséricordieux"],
  ["ٱلْمَلِكُ","Al-Malik","The King","Hükümdar, mülkün sahibi","Le Roi"],
  ["ٱلْقُدُّوسُ","Al-Quddus","The Most Holy","Kutsal, eksiklikten uzak","Le Très-Saint"],
  ["ٱلسَّلَـٰمُ","As-Salam","The Source of Peace","Barış ve esenlik veren","La Source de la Paix"],
  ["ٱلْمُؤْمِنُ","Al-Mu'min","The Giver of Faith","Güven veren","Celui qui donne la foi"],
  ["ٱلْمُهَيْمِنُ","Al-Muhaymin","The Guardian","Gözetip koruyan","Le Gardien"],
  ["ٱلْعَزِيزُ","Al-Aziz","The Almighty","Üstün, güçlü","Le Tout-Puissant"],
  ["ٱلْجَبَّارُ","Al-Jabbar","The Compeller","Dilediğini yaptıran","Le Contraignant"],
  ["ٱلْمُتَكَبِّرُ","Al-Mutakabbir","The Supreme","Büyüklükte eşsiz","Le Suprême"],
  ["ٱلْخَـٰلِقُ","Al-Khaliq","The Creator","Yaratan","Le Créateur"],
  ["ٱلْبَارِئُ","Al-Bari","The Originator","Kusursuz yaratan","L'Originateur"],
  ["ٱلْمُصَوِّرُ","Al-Musawwir","The Fashioner","Şekil veren","Le Façonneur"],
  ["ٱلْغَفَّارُ","Al-Ghaffar","The Great Forgiver","Çok bağışlayan","Le Grand Pardonneur"],
  ["ٱلْقَهَّارُ","Al-Qahhar","The Irresistible","Her şeye galip","L'Irrésistible"],
  ["ٱلْوَهَّابُ","Al-Wahhab","The Supreme Bestower","Karşılıksız veren","Le Donateur Suprême"],
  ["ٱلرَّزَّاقُ","Ar-Razzaq","The Provider","Rızık veren","Le Pourvoyeur"],
  ["ٱلْفَتَّاحُ","Al-Fattah","The Opener","Hayır kapılarını açan","L'Ouvreur"],
  ["ٱلْعَلِيمُ","Al-Alim","The All-Knowing","Her şeyi bilen","L'Omniscient"],
  ["ٱلْقَابِضُ","Al-Qabid","The Withholder","Sıkıp daraltan","Celui qui retient"],
  ["ٱلْبَاسِطُ","Al-Basit","The Extender","Genişleten, bollaştıran","Celui qui déploie"],
  ["ٱلْخَافِضُ","Al-Khafid","The Reducer","Alçaltan","Celui qui abaisse"],
  ["ٱلرَّافِعُ","Ar-Rafi","The Exalter","Yükselten","Celui qui élève"],
  ["ٱلْمُعِزُّ","Al-Mu'izz","The Honourer","İzzet veren","Celui qui honore"],
  ["ٱلْمُذِلُّ","Al-Mudhill","The Humiliator","Zillete düşüren","Celui qui humilie"],
  ["ٱلسَّمِيعُ","As-Sami","The All-Hearing","Her şeyi işiten","L'Audient"],
  ["ٱلْبَصِيرُ","Al-Basir","The All-Seeing","Her şeyi gören","Le Clairvoyant"],
  ["ٱلْحَكَمُ","Al-Hakam","The Impartial Judge","Hükmeden","Le Juge impartial"],
  ["ٱلْعَدْلُ","Al-Adl","The Utterly Just","Adil","Le Juste absolu"],
  ["ٱللَّطِيفُ","Al-Latif","The Subtle One","Lütufkâr","Le Subtil"],
  ["ٱلْخَبِيرُ","Al-Khabir","The All-Aware","Her şeyden haberdar","Le Parfaitement Informé"],
  ["ٱلْحَلِيمُ","Al-Halim","The Most Forbearing","Cezada acele etmeyen","Le Très-Clément"],
  ["ٱلْعَظِيمُ","Al-Azim","The Magnificent","Büyük, yüce","Le Magnifique"],
  ["ٱلْغَفُورُ","Al-Ghafur","The All-Forgiving","Bağışlayan","Le Pardonneur"],
  ["ٱلشَّكُورُ","Ash-Shakur","The Most Appreciative","Şükre karşılık veren","Le Très-Reconnaissant"]
];

const DAILY_DUAS = [
  { ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", src: "Tirmidhi",
    en: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm — and He is the All-Hearing, the All-Knowing.",
    tr: "İsmiyle yerde ve gökte hiçbir şeyin zarar veremeyeceği Allah'ın adıyla. O, hakkıyla işiten, hakkıyla bilendir.",
    fr_ref: "Tirmidhi",
    fr: "Au nom d'Allah, avec le nom Duquel rien sur terre ni dans le ciel ne peut nuire — et Il est l'Audient, l'Omniscient." },
  { ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", src: "Muslim",
    en: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    tr: "Yarattıklarının şerrinden Allah'ın eksiksiz kelimelerine sığınırım.",
    fr_ref: "Muslim",
    fr: "Je cherche refuge dans les paroles parfaites d'Allah contre le mal de ce qu'Il a créé." },
  { ar: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ", src: "Abu Dawud",
    en: "O Allah, grant me health in my body; O Allah, grant me health in my hearing; O Allah, grant me health in my sight. There is no deity but You.",
    tr: "Allah'ım! Bedenime âfiyet ver; Allah'ım! Kulağıma âfiyet ver; Allah'ım! Gözüme âfiyet ver. Senden başka ilâh yoktur.",
    fr_ref: "Abou Dawoud",
    fr: "Ô Allah, accorde-moi la santé dans mon corps ; ô Allah, accorde-moi la santé dans mon ouïe ; ô Allah, accorde-moi la santé dans ma vue. Il n'y a de divinité que Toi." },
  { ar: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", src: "Abu Dawud",
    en: "Allah is sufficient for me; there is no deity but Him. In Him I put my trust, and He is the Lord of the Mighty Throne.",
    tr: "Allah bana yeter; O'ndan başka ilâh yoktur. O'na tevekkül ettim; O, büyük Arş'ın Rabbidir.",
    fr_ref: "Abou Dawoud",
    fr: "Allah me suffit ; il n'y a de divinité que Lui. En Lui je place ma confiance, et Il est le Seigneur du Trône immense." },
  { ar: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", src: "Abu Dawud",
    en: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
    tr: "Allah'ım! Kullarını dirilteceğin gün beni azabından koru.",
    fr_ref: "Abou Dawoud",
    fr: "Ô Allah, protège-moi de Ton châtiment le Jour où Tu ressusciteras Tes serviteurs." },
  { ar: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", src: "Abu Dawud",
    en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.",
    tr: "Rab olarak Allah'tan, din olarak İslâm'dan, peygamber olarak Muhammed'den (sallallahu aleyhi ve sellem) razı oldum.",
    fr_ref: "Abou Dawoud",
    fr: "Je suis satisfait d'Allah comme Seigneur, de l'Islam comme religion, et de Muhammad (que la paix soit sur lui) comme Prophète." },
  { ar: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", src: "Muslim",
    en: "O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor.",
    tr: "Allah'ım! Sen Selâm'sın, selâmet Sendendir. Ey celâl ve ikram sahibi, Sen münezzehsin.",
    fr_ref: "Muslim",
    fr: "Ô Allah, Tu es la Paix et de Toi vient la paix. Béni sois-Tu, ô Détenteur de la majesté et de la gloire." },
];
const DAILY_NAMES = [
  ["Yusuf","The prophet famed for patience, beauty and forgiveness.","Sabır, güzellik ve affediciliğiyle tanınan peygamber.","Maryam","The only woman named in the Quran; a symbol of purity and devotion.","Kur'an'da adı geçen tek kadın; saflık ve adanmışlığın simgesi.","Le prophète célèbre pour sa patience, sa beauté et son pardon.","La seule femme nommée dans le Coran ; symbole de pureté et de dévotion.","Yusuf","Meryem"],
  ["Ibrahim","Father of the prophets, known for unwavering faith.","Peygamberlerin atası; sarsılmaz imanıyla bilinir.","Fatimah","Beloved daughter of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ sevgili kızı.","Le père des prophètes, connu pour sa foi inébranlable.","La fille bien-aimée du Prophète Muhammad ﷺ.","İbrahim","Fatma"],
  ["Muhammad","'The praised one' — the name of the Prophet ﷺ.","'Övülen' — Peygamber Efendimiz'in ﷺ adı.","Khadijah","The Prophet's ﷺ first wife and the first believer in Islam.","Peygamber Efendimiz'in ﷺ ilk eşi ve ilk iman eden.","« Le loué » — le nom du Prophète ﷺ.","La première épouse du Prophète ﷺ et la première croyante de l'Islam.","Muhammed","Hatice"],
  ["Musa","The prophet who spoke with Allah and freed his people.","Allah ile konuşan ve kavmini özgürlüğe kavuşturan peygamber.","Asiyah","The righteous wife of Pharaoh; among the greatest women ever.","Firavun'un salih eşi; en yüce kadınlardan biri.","Le prophète qui parla avec Allah et libéra son peuple.","L'épouse vertueuse de Pharaon ; parmi les plus grandes femmes de tous les temps.","Musa","Asiye"],
  ["Isa","The Messiah, a prophet of miracles and mercy.","Mesih; mucizeler ve merhamet peygamberi.","Hajar","Mother of Ismail, famed for her trust in Allah in the desert.","İsmail'in annesi; çölde Allah'a tevekkülüyle bilinir.","Le Messie, prophète des miracles et de la miséricorde.","La mère d'Ismaïl, célèbre pour sa confiance en Allah dans le désert.","İsa","Hacer"],
  ["Ismail","The devoted son, known for patience and obedience.","Sabır ve itaatiyle bilinen adanmış evlat.","Aisha","Wife of the Prophet ﷺ and one of Islam's greatest scholars.","Peygamber Efendimiz'in ﷺ eşi; İslam'ın en büyük âlimlerindendir.","Le fils dévoué, connu pour sa patience et son obéissance.","L'épouse du Prophète ﷺ et l'une des plus grandes savantes de l'Islam.","İsmail","Ayşe"],
  ["Ishaq","A prophet and son of Ibrahim, bearer of glad tidings.","İbrahim'in oğlu, müjdeyle anılan peygamber.","Sumayyah","The first martyr of Islam, steadfast under persecution.","İslam'ın ilk şehidi; zulüm karşısında sebat etti.","Un prophète et fils d'Ibrahim, porteur de bonnes nouvelles.","La première martyre de l'Islam, ferme face à la persécution.","İshak","Sümeyye"],
  ["Yaqub","A prophet renowned for beautiful patience.","Güzel sabrıyla tanınan peygamber.","Ruqayyah","Daughter of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ kızı.","Un prophète renommé pour sa belle patience.","La fille du Prophète Muhammad ﷺ.","Yakup","Rukiye"],
  ["Yunus","The prophet who called his people back to Allah.","Kavmini Allah'a çağıran peygamber.","Zainab","Eldest daughter of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ en büyük kızı.","Le prophète qui rappela son peuple vers Allah.","La fille aînée du Prophète Muhammad ﷺ.","Yunus","Zeynep"],
  ["Sulaiman","The wise king-prophet, granted a kingdom like no other.","Bilge kral-peygamber; eşsiz bir mülk verildi.","Bilqis","The wise Queen of Sheba who embraced the truth.","Hakikati kabul eden bilge Sebe Melikesi.","Le sage roi-prophète, à qui fut accordé un royaume sans pareil.","La sage reine de Saba qui embrassa la vérité.","Süleyman","Belkıs"],
  ["Dawud","A prophet-king with a beautiful voice; the Psalms (Zabur) were revealed to him.","Güzel sesli peygamber-kral; Zebur ona indirildi.","Hannah","Mother of Maryam, who devoted her child to Allah's service.","Meryem'in annesi; çocuğunu Allah'a adadı.","Un prophète-roi à la belle voix ; les Psaumes (Zabour) lui furent révélés.","La mère de Maryam, qui voua son enfant au service d'Allah.","Davud","Hanne"],
  ["Harun","Prophet and brother of Musa, his eloquent spokesman.","Musa'nın kardeşi ve güzel konuşan yardımcısı peygamber.","Safiyyah","A wife of the Prophet ﷺ, known for wisdom and courage.","Peygamber Efendimiz'in ﷺ eşi; bilgelik ve cesaretiyle bilinir.","Prophète et frère de Moussa, son éloquent porte-parole.","Une épouse du Prophète ﷺ, connue pour sa sagesse et son courage.","Harun","Safiye"],
  ["Zakariya","The prophet who cared for Maryam and prayed for a righteous son.","Meryem'in bakımını üstlenen ve hayırlı evlat için dua eden peygamber.","Aminah","Mother of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ annesi.","Le prophète qui prit soin de Maryam et pria pour un fils vertueux.","La mère du Prophète Muhammad ﷺ.","Zekeriya","Emine"],
  ["Ali","The Prophet's ﷺ cousin and son-in-law; the name means 'elevated, noble'.","Peygamber Efendimiz'in ﷺ amcaoğlu ve damadı; anlamı 'yüce, asil'.","Hafsa","Wife of the Prophet ﷺ and keeper of the first written Quran.","Peygamber Efendimiz'in ﷺ eşi; ilk yazılı Kur'an'ın koruyucusu.","Le cousin et gendre du Prophète ﷺ ; ce nom signifie « élevé, noble ».","L'épouse du Prophète ﷺ et gardienne du premier Coran écrit.","Ali","Hafsa"],
  ["Umar","The second caliph; the name means 'flourishing, long-lived'.","İkinci halife; adı 'gelişen, ömürlü' anlamındadır.","Nusaybah","The brave companion who defended the Prophet ﷺ at Uhud.","Uhud'da Peygamber'i ﷺ koruyan cesur sahabi.","Le deuxième calife ; ce nom signifie « florissant, qui vit longtemps ».","La courageuse compagne qui défendit le Prophète ﷺ à Ouhoud.","Ömer","Nusaybe"],
  ["Uthman","The third caliph, famed for generosity and modesty.","Üçüncü halife; cömertlik ve hayâsıyla ünlü.","Khawlah","A fearless companion known for her bravery in battle.","Savaş meydanındaki cesaretiyle tanınan sahabi.","Le troisième calife, célèbre pour sa générosité et sa pudeur.","Une compagne intrépide, connue pour sa bravoure au combat.","Osman","Havle"],
  ["Bilal","The first muezzin of Islam, chosen for his beautiful voice.","Güzel sesi için seçilen İslam'ın ilk müezzini.","Barakah","Umm Ayman, the devoted caretaker of the Prophet ﷺ.","Ümmü Eymen; Peygamber Efendimiz'in ﷺ dadısı.","Le premier muezzin de l'Islam, choisi pour sa belle voix.","Oumm Ayman, la dévouée nourrice du Prophète ﷺ.","Bilal","Bereke"],
  ["Salman","Salman the Persian, the famous seeker of truth.","Salman-ı Farisi; hakikati arayan ünlü sahabi.","Asma","Daughter of Abu Bakr, remembered as 'she of the two belts'.","Ebubekir'in kızı; 'iki kuşaklı' diye anılır.","Salman le Perse, le célèbre chercheur de vérité.","La fille d'Abou Bakr, surnommée « celle aux deux ceintures ».","Selman","Esma"],
  ["Hamza","The Prophet's ﷺ uncle, called the Lion of Allah.","Peygamber Efendimiz'in ﷺ amcası; 'Allah'ın Aslanı' lakaplı.","Halimah","The kind foster mother who nursed the Prophet ﷺ.","Peygamber Efendimiz'i ﷺ emziren şefkatli sütanne.","L'oncle du Prophète ﷺ, surnommé le Lion d'Allah.","La bienveillante nourrice qui allaita le Prophète ﷺ.","Hamza","Halime"],
  ["Idris","A prophet praised for wisdom, truthfulness and patience.","Bilgelik, doğruluk ve sabrıyla övülen peygamber.","Hawwa","Eve, the mother of all mankind.","Havva; bütün insanlığın annesi.","Un prophète loué pour sa sagesse, sa véracité et sa patience.","Ève, la mère de toute l'humanité.","İdris","Havva"],
  ["Nuh","The prophet who preached patiently for 950 years.","950 yıl sabırla tebliğ eden peygamber.","Sarah","Wife of Ibrahim and mother of Ishaq, a woman of strong faith.","İbrahim'in eşi ve İshak'ın annesi; güçlü iman sahibi.","Le prophète qui prêcha avec patience pendant 950 ans.","L'épouse d'Ibrahim et la mère d'Ishaq, une femme d'une foi forte.","Nuh","Sare"],
  ["Adam","The first human and the first prophet.","İlk insan ve ilk peygamber.","Juwairiyah","A wife of the Prophet ﷺ whose marriage brought freedom to many.","Evliliği birçok kişinin özgürlüğüne vesile olan, Peygamber'in ﷺ eşi.","Le premier être humain et le premier prophète.","Une épouse du Prophète ﷺ dont le mariage apporta la liberté à beaucoup.","Adem","Cüveyriye"],
  ["Ilyas","A prophet who called his people to worship Allah alone.","Kavmini yalnızca Allah'a ibadete çağıran peygamber.","Kulthum","Umm Kulthum, daughter of the Prophet Muhammad ﷺ.","Ümmü Gülsüm; Peygamber Efendimiz'in ﷺ kızı.","Un prophète qui appela son peuple à n'adorer qu'Allah.","Oumm Koulthoum, fille du Prophète Muhammad ﷺ.","İlyas","Gülsüm"],
  ["Hud","The prophet sent to the people of 'Ad.","Âd kavmine gönderilen peygamber.","Maymunah","The last wife of the Prophet Muhammad ﷺ.","Peygamber Efendimiz'in ﷺ son eşi.","Le prophète envoyé au peuple de 'Ad.","La dernière épouse du Prophète Muhammad ﷺ.","Hud","Meymune"],
  ["Salih","The prophet sent to the people of Thamud.","Semud kavmine gönderilen peygamber.","Ramla","Umm Habiba, wife of the Prophet ﷺ, steadfast in exile.","Ümmü Habibe; gurbette sebat eden, Peygamber'in ﷺ eşi.","Le prophète envoyé au peuple de Thamoud.","Oumm Habiba, épouse du Prophète ﷺ, ferme dans l'exil.","Salih","Remle"],
];
/* Moment card backgrounds: no-text images, rotated daily per card */
const MOMENT_BGS = ["mosque-sunset.jpg", "lanterns.jpg", "kaaba-night.jpg", "pattern-emerald.jpg", "crescent-lake.jpg", "quran-light.jpg", "dome-sky.jpg", "desert-dunes.jpg", "mosque-dawn.jpg", "pattern-navy.jpg", "dunes-night.jpg", "window-light.jpg", "arabesque-dark.jpg", "olive-morning.jpg", "lake-dusk.jpg", "tasbih-dark.jpg", "wall-carved.jpg", "garden-fountain.jpg", "lanterns-bokeh.jpg", "quran-window.jpg", "prayer-mat.jpg", "milky-way.jpg", "marble-hall.jpg", "rain-window.jpg", "roses-dark-red.jpg", "roses-night.jpg", "roses-white-dark.jpg", "rose-petals.jpg", "roses-dusk.jpg", "rose-arch.jpg", "rose-single.jpg", "roses-rain.jpg", "ramadan-crescent.webp", "eid-moon-desert.webp", "rose-single-2.webp", "roses-bunch.webp", "birds-day.webp", "birds-colorful.webp", "bird-lilac.webp", "bird-roller.webp", "img-b6b15b4.webp", "img-20261015-a.webp", "img-20261015-b.webp", "img-20261015-c.webp", "img-20261015-d.webp", "img-20261015-e.webp"];
function momentBg(cardIdx) {
  const day = Math.floor(Date.now() / 864e5);
  return "/cards/" + MOMENT_BGS[(day + cardIdx * 3) % MOMENT_BGS.length];
}

function renderDaily() {
  const day = Math.floor(Date.now() / 864e5);
  const lang = (window.DDHLang && window.DDHLang()) || document.documentElement.lang || 'en';
  const tr = lang === 'tr';
  const fr = lang === 'fr';
  const pick = (o) => fr ? (o.fr || o.en) : tr ? o.tr : o.en;
  const pickRef = (o) => fr ? (o.fr_ref || o.ref) : tr ? (o.tr_ref || o.ref) : o.ref;
  const set = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  const setBg = (id, cardIdx) => { const el = document.getElementById(id); if (el) el.src = momentBg(cardIdx); };
  // backgrounds rotate daily, offset per card
  setBg('mDuaBg', 0); setBg('mHadithBg', 1); setBg('mAyahBg', 2); setBg('mAsmaBg', 3);
  const du = DAILY_DUAS[day % DAILY_DUAS.length];
  set('mDuaAr', du.ar);
  set('mDuaTx', '"' + pick(du) + '"');
  set('mDuaRef', du.src);
  const h = DAILY_HADITH[day % DAILY_HADITH.length];
  set('mHadithTx', '"' + pick(h) + '"');
  set('mHadithRef', pickRef(h));
  const v = DAILY_VERSES[day % DAILY_VERSES.length];
  set('mAyahAr', v.ar);
  set('mAyahTx', '"' + pick(v) + '"');
  set('mAyahRef', pickRef(v));
  const a = ASMA[day % ASMA.length];
  set('mAsmaAr', a[0]);
  set('mAsmaTx', a[1]);
  set('mAsmaRef', fr ? (a[4] || a[2]) : tr ? a[3] : a[2]);
  const nm = DAILY_NAMES[day % DAILY_NAMES.length];
  const setHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  setHTML('mBoyName', `👦 <b>${tr ? (nm[8] || nm[0]) : nm[0]}</b> — ${fr ? (nm[6] || nm[1]) : tr ? nm[2] : nm[1]}`);
  setHTML('mGirlName', `👧 <b>${tr ? (nm[9] || nm[3]) : nm[3]}</b> — ${fr ? (nm[7] || nm[4]) : tr ? nm[5] : nm[4]}`);
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
  const fr = lang === 'fr';
  const pk = (o) => fr ? (o.fr || o.en) : tr ? o.tr : o.en;
  const pkR = (o) => fr ? (o.fr_ref || o.ref) : tr ? (o.tr_ref || o.ref) : o.ref;
  if (type === 'verse') {
    const v = DAILY_VERSES[day % DAILY_VERSES.length];
    return { ar: v.ar, text: pk(v), ref: pkR(v), tr };
  }
  if (type === 'hadith') {
    const h = DAILY_HADITH[day % DAILY_HADITH.length];
    return { ar: null, text: pk(h), ref: pkR(h), tr };
  }
  if (type === 'asma') {
    const a = ASMA[day % ASMA.length];
    return { ar: a[0], text: a[1], ref: fr ? (a[4] || a[2]) : tr ? a[3] : a[2], tr };
  }
  const d = DAILY_DUAS[day % DAILY_DUAS.length];
  return { ar: d.ar, text: pk(d), ref: d.src, tr };
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
