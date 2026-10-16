/* DailyDeenHub Hisnul Muslim — curated authentic duas (EN/TR).
   Structure: HSN_DUAS[catId] = [{ar, tn, rep, src, en, tr}].
   tn (transliteration) is optional; cards render without it when absent. */
const HSN_DUAS = {
morn: [
{ ar: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ، مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ، يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ، وَلَا يَئُودُهُ حِفْظُهُمَا، وَهُوَ الْعَلِيُّ الْعَظِيمُ",
  rep: "1x", src: "Quran 2:255",
  en: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and guarding them does not tire Him. He is the Most High, the Most Great.",
  tr: "Allah, O'ndan başka ilâh yoktur; diridir, her şey O'na bağlıdır. Ne uykusu gelir ne de uyur. Göklerde ve yerde ne varsa hepsi O'nundur. O'nun izni olmadan katında kim şefaat edebilir? Onların önlerinde ve arkalarında olanı O bilir. O'nun ilminden, dilediğinden başka hiçbir şeyi kavrayamazlar. Kürsüsü gökleri ve yeri kuşatmıştır; onları korumak O'na ağır gelmez. O, yücedir, büyüktür." },
{ ar: "قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ۞ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِنْ شَرِّ مَا خَلَقَ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ ۞ قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ",
  rep: "3x each", src: "Quran 112–114 · Abu Dawud",
  en: "Recite Surah Al-Ikhlas, Al-Falaq and An-Nas — they suffice against all evil.",
  tr: "İhlâs, Felak ve Nâs surelerini oku — her türlü şerre karşı yeterlidir." },
{ ar: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
  tn: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namut, wa ilaykan-nushur.",
  rep: "1x", src: "Tirmidhi",
  en: "O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the resurrection.",
  tr: "Allah'ım! Seninle sabahladık, Seninle akşamladık; Seninle yaşar, Seninle ölürüz ve dönüş Sanadır." },
{ ar: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
  tn: "Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namut, wa ilaykal-masir.",
  rep: "1x", src: "Tirmidhi",
  en: "O Allah, by You we enter the evening and by You we enter the morning; by You we live and by You we die, and to You is the final return.",
  tr: "Allah'ım! Seninle akşamladık, Seninle sabahladık; Seninle yaşar, Seninle ölürüz ve varış Sanadır." },
{ ar: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
  tn: "Raditu billahi Rabban, wa bil-Islami dinan, wa bi Muhammadin sallallahu 'alayhi wa sallam nabiyya.",
  rep: "3x", src: "Abu Dawud",
  en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.",
  tr: "Rab olarak Allah'tan, din olarak İslâm'dan, peygamber olarak Muhammed'den (sallallahu aleyhi ve sellem) razı oldum." },
{ ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
  tn: "Bismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
  rep: "3x", src: "Tirmidhi",
  en: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm — and He is the All-Hearing, the All-Knowing.",
  tr: "İsmiyle yerde ve gökte hiçbir şeyin zarar veremeyeceği Allah'ın adıyla. O, hakkıyla işiten, hakkıyla bilendir." },
{ ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
  tn: "A'udhu bikalimatillahit-tammati min sharri ma khalaq.",
  rep: "3x", src: "Muslim",
  en: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
  tr: "Yarattıklarının şerrinden Allah'ın eksiksiz kelimelerine sığınırım." },
{ ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
  tn: "Allahumma anta Rabbi, la ilaha illa ant, khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't, a'udhu bika min sharri ma sana't, abu'u laka bini'matika 'alayy, wa abu'u bidhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa ant.",
  rep: "1x", src: "Bukhari",
  en: "O Allah, You are my Lord, there is no deity but You. You created me and I am Your servant; I hold to Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I confess my sin — so forgive me, for none forgives sins but You.",
  tr: "Allah'ım! Sen benim Rabbimsin, Senden başka ilâh yoktur. Beni Sen yarattın, ben Senin kulunum; gücüm yettiğince ahdine ve vaadine bağlıyım. Yaptıklarımın şerrinden Sana sığınırım. Nimetini itiraf eder, günahımı itiraf ederim; beni bağışla, çünkü günahları Senden başkası bağışlayamaz." },
{ ar: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ",
  tn: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari, la ilaha illa ant.",
  rep: "3x", src: "Abu Dawud",
  en: "O Allah, grant me health in my body; O Allah, grant me health in my hearing; O Allah, grant me health in my sight. There is no deity but You.",
  tr: "Allah'ım! Bedenime âfiyet ver; Allah'ım! Kulağıma âfiyet ver; Allah'ım! Gözüme âfiyet ver. Senden başka ilâh yoktur." },
{ ar: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
  tn: "Hasbiyallahu la ilaha illa Huwa, 'alayhi tawakkaltu wa Huwa Rabbul-'arshil-'azim.",
  rep: "7x", src: "Abu Dawud",
  en: "Allah is sufficient for me; there is no deity but Him. In Him I put my trust, and He is the Lord of the Mighty Throne.",
  tr: "Allah bana yeter; O'ndan başka ilâh yoktur. O'na tevekkül ettim; O, büyük Arş'ın Rabbidir." },
{ ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
  tn: "Subhanallahi wa bihamdihi.",
  rep: "100x", src: "Bukhari, Muslim",
  en: "Glory be to Allah and praise Him — whoever says it 100 times a day, his sins are wiped away even if like the foam of the sea.",
  tr: "Allah'ı hamd ile tesbih ederim — günde 100 defa söyleyenin günahları deniz köpüğü kadar olsa silinir." }
],
sleep: [
{ ar: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
  tn: "Bismika Allahumma amutu wa ahya.",
  rep: "1x", src: "Bukhari",
  en: "In Your name, O Allah, I die and I live.",
  tr: "Allah'ım! Senin isminle ölür (uyur), Senin isminle dirilirim (uyanırım)." },
{ ar: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ، مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ، يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ، وَلَا يَئُودُهُ حِفْظُهُمَا، وَهُوَ الْعَلِيُّ الْعَظِيمُ",
  rep: "1x", src: "Bukhari",
  en: "Whoever recites Ayat al-Kursi before sleeping is protected by Allah through the night.",
  tr: "Yatmadan önce Âyetel-Kürsî'yi okuyanı Allah gece boyunca korur." },
{ ar: "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ، كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ، لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ، وَقَالُوا سَمِعْنَا وَأَطَعْنَا، غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ، لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا، لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ، رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا، رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا، رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ، وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا، أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
  rep: "1x", src: "Quran 2:285–286 · Bukhari, Muslim",
  en: "The last two verses of Al-Baqarah — whoever recites them at night, they suffice him.",
  tr: "Bakara suresinin son iki âyeti — geceleyin okuyana yeter." },
{ ar: "قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ۞ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِنْ شَرِّ مَا خَلَقَ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ ۞ قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ",
  rep: "3x each", src: "Bukhari, Muslim",
  en: "Recite Al-Ikhlas, Al-Falaq and An-Nas, then wipe your hands over whatever of your body you can reach.",
  tr: "İhlâs, Felak ve Nâs'ı oku, sonra ellerini vücudunun ulaşabildiğin yerlerine sür." },
{ ar: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
  tn: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak.",
  rep: "3x", src: "Abu Dawud",
  en: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
  tr: "Allah'ım! Kullarını dirilteceğin gün beni azabından koru." }
],
wake: [
{ ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
  tn: "Alhamdulillahilladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
  rep: "1x", src: "Bukhari",
  en: "Praise be to Allah who has given us life after taking it from us, and to Him is the resurrection.",
  tr: "Bizi öldürdükten (uyuttuktan) sonra dirilten Allah'a hamdolsun; dönüş O'nadır." }
],
prayer: [
{ ar: "أَسْتَغْفِرُ اللَّهَ",
  tn: "Astaghfirullah.",
  rep: "3x", src: "Muslim",
  en: "I seek Allah's forgiveness.",
  tr: "Allah'tan bağışlanma dilerim." },
{ ar: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
  tn: "Allahumma antas-salamu wa minkas-salam, tabarakta ya dhal-jalali wal-ikram.",
  rep: "1x", src: "Muslim",
  en: "O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor.",
  tr: "Allah'ım! Sen Selâm'sın, selâmet Sendendir. Ey celâl ve ikram sahibi, Sen münezzehsin." },
{ ar: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ، مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ، يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ، وَلَا يَئُودُهُ حِفْظُهُمَا، وَهُوَ الْعَلِيُّ الْعَظِيمُ",
  rep: "1x", src: "An-Nasa'i",
  en: "Whoever recites Ayat al-Kursi after each obligatory prayer, nothing stands between him and Paradise except death.",
  tr: "Her farz namazdan sonra Âyetel-Kürsî'yi okuyana, Cennet'e girmesine ölümden başka engel yoktur." },
{ ar: "سُبْحَانَ اللَّهِ (٣٣) ۞ الْحَمْدُ لِلَّهِ (٣٣) ۞ اللَّهُ أَكْبَرُ (٣٤)",
  tn: "SubhanAllah (33x) · Alhamdulillah (33x) · Allahu Akbar (34x).",
  rep: "—", src: "Muslim",
  en: "Glorify Allah 33 times, praise Allah 33 times, and magnify Allah 34 times after each prayer.",
  tr: "Her namazdan sonra 33 defa Sübhanallah, 33 defa Elhamdülillah, 34 defa Allahu Ekber de." },
{ ar: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
  tn: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa Huwa 'ala kulli shay'in qadir.",
  rep: "1x", src: "Bukhari, Muslim",
  en: "There is no deity but Allah alone, with no partner. His is the dominion and His is the praise, and He has power over all things.",
  tr: "Allah'tan başka ilâh yoktur; O tektir, ortağı yoktur. Mülk O'nundur, hamd O'nundur ve O her şeye kâdirdir." }
],
home: [
{ ar: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
  tn: "Bismillahi tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah.",
  rep: "1x", src: "Abu Dawud, Tirmidhi",
  en: "When leaving home: In the name of Allah, I place my trust in Allah; there is no power and no strength except with Allah.",
  tr: "Evden çıkarken: Allah'ın adıyla, Allah'a tevekkül ettim. Güç ve kuvvet ancak Allah'ladır." },
{ ar: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
  tn: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna.",
  rep: "1x", src: "Abu Dawud",
  en: "When entering home: In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.",
  tr: "Eve girerken: Allah'ın adıyla girdik, Allah'ın adıyla çıktık ve Rabbimize tevekkül ettik." }
],
mosque: [
{ ar: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا، وَمِنْ فَوْقِي نُورًا، وَمِنْ تَحْتِي نُورًا، وَعَنْ يَمِينِي نُورًا، وَعَنْ شِمَالِي نُورًا، وَمِنْ أَمَامِي نُورًا، وَمِنْ خَلْفِي نُورًا، وَاجْعَلْ فِي نَفْسِي نُورًا، وَأَعْظِمْ لِي نُورًا",
  tn: "Allahummaj'al fi qalbi nuran, wa fi lisani nuran, wa fi sam'i nuran, wa fi basari nuran, wa min fawqi nuran, wa min tahti nuran, wa 'an yamini nuran, wa 'an shimali nuran, wa min amami nuran, wa min khalfi nuran, waj'al fi nafsi nuran, wa a'zim li nuran.",
  rep: "1x", src: "Bukhari, Muslim",
  en: "On the way to the mosque: O Allah, place light in my heart, in my tongue, in my hearing, in my sight; light above me and below me, to my right and to my left, before me and behind me; place light in my soul and magnify light for me.",
  tr: "Camiye giderken: Allah'ım! Kalbime, dilime, kulağıma, gözüme nur ver; üstüme, altıma, sağıma, soluma, önüme, arkama nur ver; nefsime nur ver ve nurumu artır." },
{ ar: "أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ",
  tn: "A'udhu billahil-'azim, wa biwajhihil-karim, wa sultanihil-qadim, minash-shaytanir-rajim.",
  rep: "1x", src: "Abu Dawud",
  en: "When entering the mosque: I seek refuge with Allah the Almighty, with His noble Face and His eternal authority, from the accursed devil.",
  tr: "Camiye girerken: Kovulmuş şeytandan; yüce Allah'a, O'nun kerim yüzüne ve kadim saltanatına sığınırım." },
{ ar: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
  tn: "Allahummaftah li abwaba rahmatik.",
  rep: "1x", src: "Muslim",
  en: "When entering the mosque: O Allah, open for me the doors of Your mercy.",
  tr: "Camiye girerken: Allah'ım! Bana rahmetinin kapılarını aç." },
{ ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
  tn: "Allahumma inni as'aluka min fadlik.",
  rep: "1x", src: "Muslim",
  en: "When leaving the mosque: O Allah, I ask You of Your bounty.",
  tr: "Camiden çıkarken: Allah'ım! Senden lütfunu dilerim." }
],
food: [
{ ar: "بِسْمِ اللَّهِ",
  tn: "Bismillah.",
  rep: "1x", src: "Tirmidhi",
  en: "Before eating: In the name of Allah. If you forget at the beginning, say: Bismillahi fi awwalihi wa akhirih.",
  tr: "Yemekten önce: Allah'ın adıyla. Başta söylemeyi unutursan: 'Bismillâhi fî evvelihî ve âhirihî' de." },
{ ar: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
  tn: "Alhamdulillahilladhi at'amani hadha, wa razaqanihi min ghayri hawlin minni wa la quwwah.",
  rep: "1x", src: "Tirmidhi",
  en: "After eating: Praise be to Allah who has fed me this and provided it for me, with no power or might of my own.",
  tr: "Yemekten sonra: Bunu bana yediren, hiçbir güç ve kuvvetim olmadan rızık olarak veren Allah'a hamdolsun." }
],
distress: [
{ ar: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
  tn: "La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin.",
  rep: "—", src: "Tirmidhi",
  en: "The dua of Yunus (peace be upon him): There is no deity but You; glory be to You. Indeed, I have been of the wrongdoers.",
  tr: "Yunus (a.s.)'ın duası: Senden başka ilâh yoktur; Seni tenzih ederim. Gerçekten ben zalimlerden oldum." },
{ ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
  tn: "Allahumma inni a'udhu bika min al-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayn, wa ghalabatir-rijal.",
  rep: "—", src: "Bukhari",
  en: "O Allah, I seek refuge in You from anxiety and grief, from inability and laziness, from miserliness and cowardice, from the burden of debt and from being overpowered by men.",
  tr: "Allah'ım! Kederden ve üzüntüden, acizlikten ve tembellikten, cimrilikten ve korkaklıktan, borç yükünden ve insanların baskısından Sana sığınırım." },
{ ar: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
  tn: "Ya Hayyu ya Qayyum, birahmatika astaghith.",
  rep: "—", src: "Tirmidhi",
  en: "O Ever-Living, O Sustainer of existence — by Your mercy I seek relief.",
  tr: "Ey Hayy, ey Kayyûm! Rahmetinle yardımını dilerim." }
]
};
const HSN_CATS = {
en: [
  { id: "morn", icon: "🌅", title: "Morning & Evening", desc: "Begin and end your day with remembrance." },
  { id: "prayer", icon: "📿", title: "After Prayer", desc: "Remembrance after each obligatory prayer." },
  { id: "sleep", icon: "🌙", title: "Before Sleep", desc: "Duas for the night." },
  { id: "wake", icon: "☀️", title: "Waking Up", desc: "The first words of the day." },
  { id: "home", icon: "🏠", title: "Home", desc: "Leaving and entering your home." },
  { id: "mosque", icon: "🕌", title: "Mosque", desc: "On the way, entering and leaving." },
  { id: "food", icon: "🍽️", title: "Eating", desc: "Before and after meals." },
  { id: "distress", icon: "💙", title: "Distress & Anxiety", desc: "Comfort in difficult moments." }
],
tr: [
  { id: "morn", icon: "🌅", title: "Sabah & Akşam", desc: "Güne zikirle başla, zikirle bitir." },
  { id: "prayer", icon: "📿", title: "Namaz Sonrası", desc: "Her farz namazdan sonra zikir." },
  { id: "sleep", icon: "🌙", title: "Uyku Öncesi", desc: "Gece duaları." },
  { id: "wake", icon: "☀️", title: "Uyanınca", desc: "Günün ilk sözleri." },
  { id: "home", icon: "🏠", title: "Ev", desc: "Evden çıkarken ve eve girerken." },
  { id: "mosque", icon: "🕌", title: "Cami", desc: "Yolda, girerken ve çıkarken." },
  { id: "food", icon: "🍽️", title: "Yemek", desc: "Yemekten önce ve sonra." },
  { id: "distress", icon: "💙", title: "Sıkıntı & Kaygı", desc: "Zor anlarda teselli." }
],
fr: [
  { id: "morn", icon: "🌅", title: "Matin & Soir", desc: "Commencez et terminez votre journée par le dhikr." },
  { id: "prayer", icon: "📿", title: "Après la prière", desc: "Dhikr après chaque prière obligatoire." },
  { id: "sleep", icon: "🌙", title: "Avant de dormir", desc: "Dou'as pour la nuit." },
  { id: "wake", icon: "☀️", title: "Au réveil", desc: "Les premières paroles du jour." },
  { id: "home", icon: "🏠", title: "Maison", desc: "En sortant et en rentrant chez vous." },
  { id: "mosque", icon: "🕌", title: "Mosquée", desc: "Sur le chemin, en entrant et en sortant." },
  { id: "food", icon: "🍽️", title: "Repas", desc: "Avant et après les repas." },
  { id: "distress", icon: "💙", title: "Détresse & Anxiété", desc: "Réconfort dans les moments difficiles." }
]
};
let hsnCurrent = null;
function hsnCats() { return HSN_CATS[state.lang] || HSN_CATS.en; }
function renderHsnCats() {
  const el = document.getElementById("hsnulList");
  if (!el) return;
  el.innerHTML = hsnCats().map(function (c) {
    const n = (HSN_DUAS[c.id] || []).length;
    return "<button class=\"learn-card\" data-hsncat=\"" + c.id + "\" type=\"button\">" +
      "<span class=\"learn-ic\">" + c.icon + "</span>" +
      "<span class=\"learn-tx\"><span class=\"learn-ti\">" + escapeHtml(c.title) + "</span>" +
      "<span class=\"learn-de\">" + escapeHtml(c.desc) + " · " + n + "</span></span>" +
      "<span class=\"learn-go\">\u203A</span></button>";
  }).join("");
  el.querySelectorAll("[data-hsncat]").forEach(function (b) {
    b.onclick = function () { openHsnCat(b.dataset.hsncat); };
  });
}
function openHsnCat(id) {
  const c = hsnCats().find(function (x) { return x.id === id; });
  if (!c) return;
  hsnCurrent = id;
  const duas = HSN_DUAS[id] || [];
  document.getElementById("hsnulArticle").innerHTML =
    "<h3>" + c.icon + " " + escapeHtml(c.title) + "</h3>" +
    duas.map(function (d) {
      return "<div class=\"dua\"><p class=\"ar\" dir=\"rtl\" lang=\"ar\">" + escapeHtml(d.ar) + "</p>" +
        (d.tn ? "<p class=\"tn\">" + escapeHtml(d.tn) + "</p>" : "") +
        "<p class=\"dm\">" + escapeHtml(d[state.lang] || d.en) + "</p>" +
        "<p class=\"hsn-meta\"><span>🔁 " + escapeHtml(d.rep) + "</span><span>📖 " + escapeHtml(d.src) + "</span></p></div>";
    }).join("");
  document.getElementById("hsnulCatsView").classList.add("hidden");
  document.getElementById("hsnulDuaView").classList.remove("hidden");
  window.scrollTo(0, 0);
}
function hsnBackToCats() {
  hsnCurrent = null;
  document.getElementById("hsnulDuaView").classList.add("hidden");
  document.getElementById("hsnulCatsView").classList.remove("hidden");
  window.scrollTo(0, 0);
}
function refreshHsnView() {
  renderHsnCats();
  if (hsnCurrent) { const id = hsnCurrent; hsnCurrent = null; openHsnCat(id); }
}
