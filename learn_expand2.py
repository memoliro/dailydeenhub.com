#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 2: insert 6 new Learn articles (EN/TR/FR) after ramadan + cross-links."""
import re, sys
sys.path.insert(0, "/home/hatch/workspace/dailydeenhub")
from learn_expand1 import insert_after_article, append_link_to_article

P = "/home/hatch/workspace/dailydeenhub/learn.js"
s = open(P, encoding="utf-8").read()

SHAHADA_AR = "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ"
TALBIYA_AR = "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ"

# ============================================================ ENGLISH
EN_ARTICLES = '''{ id: "shahada", icon: "\\u261D\\uFE0F", title: "The Shahada \\u2014 The Testimony of Faith", desc: "Its meaning, conditions and what it demands",
body: [
["h", "The words"],
["dua", { ar: "''' + SHAHADA_AR + '''", tn: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasoolullah", mean: "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah." }],
["h", "What it means"],
["p", "\\u201CLa ilaha illa Allah\\u201D is a denial and an affirmation: a denial that anything deserves worship \\u2014 no idol, no saint, no power of nature \\u2014 and an affirmation that worship belongs to Allah alone."],
["p", "\\u201CMuhammadan rasoolullah\\u201D means accepting him \\uFDFA as Allah's final Messenger: believing his message, obeying his commands, and following his example."],
["h", "Its conditions"],
["p", "Scholars mention seven conditions for the testimony to benefit the one who says it: (1) knowledge of its meaning, (2) certainty without doubt, (3) acceptance, (4) submission and compliance, (5) truthfulness, (6) sincerity \\u2014 said for Allah alone, and (7) love for it and its people."],
["h", "What contradicts it"],
["p", "The testimony is broken by its opposites \\u2014 above all shirk (associating partners with Allah), and by mocking anything of the religion. Allah says: \\u201CIndeed, Allah does not forgive association with Him...\\u201D (Quran 4:48)."],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "prayer-virtues", icon: "✨", title: "The Virtues of Prayer", desc: "Why the five daily prayers are a gift, not a burden",
body: [
["h", "An expiation between prayers"],
["p", "\\u201CThe five daily prayers and from one Jumu'ah to the next expiate the sins committed between them, as long as major sins are avoided.\\u201D \\u2014 Sahih Muslim"],
["h", "A river at your door"],
["p", "The Prophet \\uFDFA asked: if there were a river at one's door in which he bathed five times a day, would any dirt remain? \\u201CThat is the parable of the five prayers \\u2014 Allah wipes out sins with them.\\u201D \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Congregation: twenty-seven times more"],
["p", "\\u201CPrayer in congregation is twenty-seven times more meritorious than prayer performed alone.\\u201D \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Fajr and Isha in congregation"],
["p", "\\u201CWhoever prays Isha in congregation, it is as if he prayed half the night; and whoever prays Fajr in congregation, it is as if he prayed the whole night.\\u201D \\u2014 Sahih Muslim"],
["h", "Steps to the mosque"],
["p", "Every step taken toward the mosque raises a degree and erases a sin \\u2014 Sahih Muslim. And waiting for the next prayer after finishing one is \\u201Cribat\\u201D (like guarding the frontiers) \\u2014 Sahih Muslim."],
["h", "The first thing asked about"],
["p", "\\u201CThe first deed for which a person will be brought to account on the Day of Resurrection is the prayer.\\u201D \\u2014 Sunan al-Tirmidhi"],
["link", { to: "prayer", icon: "🕌", title: "How to Pray \\u2014 Step by Step", desc: "The practical guide to the prayer itself" }],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "zakat", icon: "🤲", title: "Zakat \\u2014 The Obligatory Charity", desc: "Nisab, rates, recipients and Zakat al-Fitr",
body: [
["h", "What it is"],
["p", "Zakat is the obligatory charity on qualifying wealth held for one lunar year \\u2014 2.5% of savings, gold, silver and trade goods. It is not a favour to the poor; it is their right in your wealth (Quran 51:19)."],
["h", "The nisab (threshold)"],
["p", "Zakat becomes due when your zakatable wealth reaches the nisab \\u2014 approximately 85 grams of gold or 595 grams of silver \\u2014 and a full lunar year has passed over it."],
["h", "Who receives it"],
["p", "Allah names eight categories in the Quran (9:60): the poor (fuqara), the needy (masakin), those employed to administer it, those whose hearts are to be reconciled, freeing captives, those in debt, in the cause of Allah, and the stranded traveller."],
["h", "Zakat al-Fitr"],
["p", "Before the Eid al-Fitr prayer, every Muslim \\u2014 for themselves and each dependent \\u2014 gives about 2.5 to 3 kg of staple food (or its value) to the poor, so that no one goes hungry on the day of Eid. It also purifies the fast from idle talk. \\u2014 Sunan Abi Dawud"],
["h", "A warning"],
["p", "\\u201CAnd those who hoard gold and silver and do not spend it in the way of Allah \\u2014 give them tidings of a painful punishment.\\u201D \\u2014 Quran 9:34"],
["link", { to: "sadaqah", icon: "💝", title: "Sadaqah \\u2014 Voluntary Charity", desc: "Beyond the obligation: the virtues of giving" }],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "sadaqah", icon: "💝", title: "Sadaqah \\u2014 Voluntary Charity", desc: "The virtues of giving beyond the obligation",
body: [
["h", "A shade on the Last Day"],
["p", "\\u201CSeven will be shaded by Allah on the Day when there is no shade but His...\\u201D \\u2014 among them, a person who gives charity so secretly that his left hand does not know what his right hand has given. \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "It extinguishes sin"],
["p", "\\u201CCharity extinguishes sin as water extinguishes fire.\\u201D \\u2014 Sunan al-Tirmidhi"],
["h", "Even half a date"],
["p", "\\u201CProtect yourselves from the Fire, even with half a date.\\u201D No gift is too small. \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "A smile is charity"],
["p", "Smiling at your brother, enjoining good, forbidding evil, guiding a lost person, removing harm from the road \\u2014 all are sadaqah. \\u2014 Sunan al-Tirmidhi"],
["h", "Sadaqah Jariyah \\u2014 charity that keeps giving"],
["p", "\\u201CWhen a person dies, his deeds come to an end except three: ongoing charity, knowledge that is benefited from, or a righteous child who prays for him.\\u201D \\u2014 Sahih Muslim"],
["h", "Give in secret, give often"],
["p", "Secret charity is more virtuous and more sincere; but giving openly is also good when it encourages others. The best charity is what the soul can truly spare, given consistently."],
["link", { to: "zakat", icon: "🤲", title: "Zakat \\u2014 The Obligatory Charity", desc: "The pillar of obligatory giving" }],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "fasting-virtues", icon: "🌙", title: "The Virtues of Fasting", desc: "Why fasting is among the most beloved deeds",
body: [
["h", "\\u201CFasting is for Me\\u201D"],
["p", "Allah says in a hadith qudsi: \\u201CEvery deed of the son of Adam is for him, except fasting \\u2014 it is for Me, and I shall reward for it.\\u201D \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "The gate of Ar-Rayyan"],
["p", "\\u201CIn Paradise there is a gate called Ar-Rayyan, through which those who fasted will enter on the Day of Resurrection, and no one else will enter through it.\\u201D \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Two joys"],
["p", "The fasting person has two joys: joy at breaking the fast, and joy at meeting Allah. And the breath of the fasting person is sweeter to Allah than the scent of musk. \\u2014 Sahih al-Bukhari"],
["h", "A shield"],
["p", "\\u201CFasting is a shield\\u201D \\u2014 it guards against sinful desires and, with patience, against the Fire. \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Laylat al-Qadr"],
["p", "\\u201CWhoever stands (in prayer) on Laylat al-Qadr out of faith and hope for reward, his previous sins are forgiven.\\u201D Seek it in the odd nights of the last ten days of Ramadan. \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Voluntary fasts through the year"],
["p", "Mondays and Thursdays (the Prophet's \\uFDFA habit \\u2014 Sunan al-Tirmidhi); six days of Shawwal (\\u201Cas if he fasted the whole year\\u201D \\u2014 Sahih Muslim); the day of Arafah (expiates the past and coming year \\u2014 Sahih Muslim); Ashura (the 10th of Muharram); and the \\u201Cwhite days\\u201D \\u2014 the 13th, 14th and 15th of each lunar month."],
["link", { to: "ramadan", icon: "🌙", title: "Ramadan Guide", desc: "Fasting, taraweeh, Laylat al-Qadr and Eid" }],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },
{ id: "hajj-umrah", icon: "🕋", title: "Hajj & Umrah \\u2014 A Practical Guide", desc: "The rites step by step, with duas and dhikr",
body: [
["h", "What they are"],
["p", "Hajj is the pilgrimage to the Kaaba in Makkah during Dhul-Hijjah \\u2014 obligatory once in a lifetime for every Muslim who is physically and financially able (Quran 3:97). Umrah is the lesser pilgrimage, which can be performed at any time of year."],
["h", "The Talbiyah"],
["p", "From the moment of ihram, the pilgrim repeatedly recites:"],
["dua", { ar: "''' + TALBIYA_AR + '''", tn: "Labbayka Allahumma labbayk, labbayka la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.", mean: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise and blessings are Yours, and all sovereignty \\u2014 You have no partner." }],
["h", "Umrah \\u2014 step by step"],
["p", "1. Enter ihram at the miqat: ghusl, the two white cloths (men), and the intention with the Talbiyah. 2. Tawaf: circle the Kaaba seven times counter-clockwise, starting at the Black Stone. 3. Pray two rak'ahs behind Maqam Ibrahim. 4. Sa'i: walk seven times between Safa and Marwa. 5. Halq or taqsir: shave or trim the hair \\u2014 Umrah is complete."],
["h", "Hajj \\u2014 step by step"],
["p", "1. Ihram on the 8th of Dhul-Hijjah (Yawm al-Tarwiyah) and go to Mina. 2. On the 9th, stand at Arafah from noon until sunset \\u2014 the heart of Hajj (\\u201CHajj is Arafah\\u201D \\u2014 Sunan al-Tirmidhi). 3. After sunset go to Muzdalifah, pray Maghrib and Isha together, and collect pebbles. 4. On the 10th (Eid day): stone the Jamarat al-Aqaba, offer the sacrifice, shave/trim, then Tawaf al-Ifadah. 5. The days of Tashriq (11th\\u201313th): stone all three jamarat each day, staying at Mina. 6. Farewell Tawaf before leaving Makkah."],
["h", "The best dua"],
["p", "\\u201CThe best supplication is the supplication of the day of Arafah.\\u201D Repeat often: La ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir. \\u2014 Sunan al-Tirmidhi"],
["h", "Dhikr of the ten days"],
["p", "The first ten days of Dhul-Hijjah are the most beloved days for good deeds \\u2014 fill them with tahlil (La ilaha illa Allah), takbir (Allahu Akbar) and tahmid (Alhamdulillah). \\u2014 Sahih al-Bukhari"],
["h", "Before you go"],
["p", "Learn the rites from a reliable scholar or guide before travelling, settle debts, seek forgiveness from people, and make sincere intention \\u2014 Hajj Mabroor (the accepted Hajj) has no reward but Paradise (Sahih al-Bukhari, Sahih Muslim)."],
["link", { to: "pillars", icon: "🕋", title: "The Five Pillars of Islam", desc: "Back to the pillars overview" }]
] },'''

s = insert_after_article(s, "ramadan", ",\n" + EN_ARTICLES, "en")
print("EN inserted OK")

# ============================================================ TURKISH
TR_ARTICLES = '''{ id: "shahada", icon: "\\u261D\\uFE0F", title: "Kelime-i Şehadet", desc: "Manası, şartları ve gerekleri",
body: [
["h", "Sözleri"],
["dua", { ar: "''' + SHAHADA_AR + '''", tn: "Eşhedü en la ilahe illallah ve eşhedü enne Muhammeden resulullah", mean: "Şahitlik ederim ki Allah'tan başka ilah yoktur ve yine şahitlik ederim ki Muhammed Allah'ın elçisidir." }],
["h", "Manası"],
["p", "\\u201CLa ilahe illallah\\u201D bir inkâr ve bir ikrardır: ibadete layık hiçbir varlığın olmadığı inkârı \\u2014 ne put, ne evliya, ne tabiat gücü \\u2014 ve ibadetin yalnızca Allah'a ait olduğunun ikrarı."],
["p", "\\u201CMuhammeden resulullah\\u201D ise O'nu \\uFDFA Allah'ın son elçisi olarak kabul etmek demektir: mesajına inanmak, emirlerine uymak ve örneğini takip etmek."],
["h", "Şartları"],
["p", "Âlimler, şehadetin söyleyene fayda vermesi için yedi şart sayar: (1) manasını bilmek, (2) şüphesiz kesin inanmak, (3) kabul etmek, (4) teslim olup gereğini yapmak, (5) doğru sözlü olmak, (6) ihlâs \\u2014 yalnızca Allah için söylemek ve (7) onu ve ehlini sevmek."],
["h", "Onu bozan şeyler"],
["p", "Şehadet, zıtlarıyla bozulur \\u2014 başta şirk (Allah'a ortak koşmak) ve dinle alay etmek gelir. Allah buyurur: \\u201CŞüphesiz Allah, kendisine ortak koşulmasını bağışlamaz...\\u201D (Nisâ 4:48)."],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "prayer-virtues", icon: "✨", title: "Namazın Faziletleri", desc: "Beş vakit namaz neden bir yük değil, bir nimettir",
body: [
["h", "Namazlar arası günahlara kefaret"],
["p", "\\u201CBeş vakit namaz ve bir cumadan diğerine, büyük günahlardan sakınıldıkça aralarındaki günahlara kefarettir.\\u201D \\u2014 Sahih-i Müslim"],
["h", "Kapının önündeki nehir"],
["p", "Peygamber Efendimiz \\uFDFA sordu: Birinizin kapısı önünde bir nehir olsa ve günde beş kez yıkansa kirden eser kalır mı? \\u201Cİşte beş vakit namaz da böyledir \\u2014 Allah onlarla günahları siler.\\u201D \\u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Cemaatle namaz: yirmi yedi kat"],
["p", "\\u201CCemaatle kılınan namaz, tek başına kılınan namazdan yirmi yedi kat daha faziletlidir.\\u201D \\u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Sabah ve yatsıyı cemaatle kılmak"],
["p", "\\u201CKim yatsıyı cemaatle kılarsa gece yarısını namazla geçirmiş gibi olur; kim sabahı cemaatle kılarsa bütün geceyi namazla geçirmiş gibi olur.\\u201D \\u2014 Sahih-i Müslim"],
["h", "Camiye atılan adımlar"],
["p", "Camiye doğru atılan her adım bir derece yükseltir, bir günahı siler \\u2014 Sahih-i Müslim. Bir namazı kılıp diğerini beklemek ise \\u201Cribât\\u201Dtır (nöbet tutmak gibidir) \\u2014 Sahih-i Müslim."],
["h", "İlk sorulacak amel"],
["p", "\\u201CKıyamet günü kulun ilk hesaba çekileceği amel namazdır.\\u201D \\u2014 Sünen-i Tirmizî"],
["link", { to: "prayer", icon: "🕌", title: "Namaz Nasıl Kılınır \\u2014 Adım Adım", desc: "Namazın kılınışının pratik rehberi" }],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "zakat", icon: "🤲", title: "Zekât", desc: "Nisap, oranlar, kimlere verilir ve fitre",
body: [
["h", "Nedir"],
["p", "Zekât, bir kamerî yıl elde tutulan malın farz olan sadakasıdır: birikim, altın, gümüş ve ticaret mallarının %2,5'i. Yoksula yapılan bir iyilik değil, malınızdaki onların hakkıdır (Zâriyât 51:19)."],
["h", "Nisap (ölçü)"],
["p", "Zekâta tabi mal nisaba \\u2014 yaklaşık 85 gram altın veya 595 gram gümüş değerine \\u2014 ulaşıp üzerinden bir kamerî yıl geçince zekât farz olur."],
["h", "Kimlere verilir"],
["p", "Allah Kur'an'da (Tevbe 9:60) sekiz sınıf sayar: fakirler, miskinler, zekât memurları, kalpleri ısındırılacaklar, esirler, borçlular, Allah yolundakiler ve yolda kalmışlar."],
["h", "Fitre (fıtır sadakası)"],
["p", "Ramazan Bayramı namazından önce her Müslüman \\u2014 kendisi ve bakmakla yükümlü olduğu her kişi için \\u2014 yaklaşık 2,5\\u20133 kg temel gıda (veya değeri) verir; ta ki bayram günü kimse aç kalmasın. Ayrıca orucun boş sözlerden arınmasına vesile olur. \\u2014 Sünen-i Ebû Dâvûd"],
["h", "Bir uyarı"],
["p", "\\u201CAltını ve gümüşü biriktirip Allah yolunda harcamayanlara acı bir azabı müjdele.\\u201D \\u2014 Tevbe 9:34"],
["link", { to: "sadaqah", icon: "💝", title: "Sadaka", desc: "Farzın ötesinde: vermenin faziletleri" }],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "sadaqah", icon: "💝", title: "Sadaka", desc: "Farzın ötesinde vermenin faziletleri",
body: [
["h", "Mahşerde bir gölge"],
["p", "\\u201CAllah, kendi gölgesinden başka gölge olmayan günde yedi sınıfı gölgelendirecektir...\\u201D \\u2014 bunlardan biri, sağ elinin verdiğini sol eli bilmeyecek kadar gizli sadaka verendir. \\u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Günahı söndürür"],
["p", "\\u201CSadaka, suyun ateşi söndürdüğü gibi günahı söndürür.\\u201D \\u2014 Sünen-i Tirmizî"],
["h", "Yarım hurma bile"],
["p", "\\u201CYarım hurmayla da olsa cehennemden korunun.\\u201D Hiçbir iyilik küçük değildir. \\u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Tebessüm de sadakadır"],
["p", "Kardeşine tebessüm, iyiliği emredip kötülükten sakındırmak, yolunu kaybedene yol göstermek, yoldaki eziyeti kaldırmak \\u2014 hepsi sadakadır. \\u2014 Sünen-i Tirmizî"],
["h", "Sadaka-i câriye \\u2014 devam eden sadaka"],
["p", "\\u201Cİnsan ölünce ameli kesilir; ancak üçü müstesna: devam eden sadaka, faydalanılan ilim ve kendisine dua eden salih evlat.\\u201D \\u2014 Sahih-i Müslim"],
["h", "Gizli ver, düzenli ver"],
["p", "Gizli sadaka daha faziletli ve daha ihlâslıdır; ancak başkalarını teşvik edecekse açıktan vermek de güzeldir. En hayırlı sadaka, gönlün gerçekten kıyabildiği ve düzenli olandır."],
["link", { to: "zakat", icon: "🤲", title: "Zekât", desc: "Farz olan vermenin şartı" }],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "fasting-virtues", icon: "🌙", title: "Orucun Faziletleri", desc: "Oruç neden en sevimli amellerdendir",
body: [
["h", "\\u201COruç benim içindir\\u201D"],
["p", "Allah kutsi hadiste buyurur: \\u201CÂdemoğlunun her ameli kendisi içindir; ancak oruç müstesna \\u2014 o benim içindir ve onun mükâfatını ben veririm.\\u201D \\u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Reyyân kapısı"],
["p", "\\u201CCennette Reyyân denilen bir kapı vardır; kıyamet günü oruçlular oradan girer, başkası giremez.\\u201D \\u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "İki sevinç"],
["p", "Oruçlunun iki sevinci vardır: iftar sevinci ve Rabbine kavuşma sevinci. Oruçlunun ağız kokusu Allah katında misk kokusundan daha güzeldir. \\u2014 Sahih-i Buhari"],
["h", "Bir kalkandır"],
["p", "\\u201COruç kalkandır\\u201D \\u2014 nefsin arzularına karşı korur, sabırla cehenneme karşı da siper olur. \\u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Kadir Gecesi"],
["p", "\\u201CKim Kadir Gecesi'ni imanla ve sevabını umarak ihya ederse geçmiş günahları bağışlanır.\\u201D Onu Ramazan'ın son on gününün tek gecelerinde arayın. \\u2014 Sahih-i Buhari, Sahih-i Müslim"],
["h", "Yıl içindeki nafile oruçlar"],
["p", "Pazartesi ve perşembe (Efendimiz'in \\uFDFA âdeti \\u2014 Sünen-i Tirmizî); Şevval'den altı gün (\\u201Cyılı oruçla geçirmiş gibi olur\\u201D \\u2014 Sahih-i Müslim); Arefe günü (geçmiş ve gelecek yılın günahlarına kefaret \\u2014 Sahih-i Müslim); Aşure (Muharrem'in 10'u); ve \\u201Cbeyaz günler\\u201D \\u2014 her kamerî ayın 13, 14 ve 15'i."],
["link", { to: "ramadan", icon: "🌙", title: "Ramazan Rehberi", desc: "Oruç, teravih, Kadir Gecesi ve bayram" }],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },
{ id: "hajj-umrah", icon: "🕋", title: "Hac ve Umre \\u2014 Pratik Rehber", desc: "Adım adım menasik, dualar ve zikirler",
body: [
["h", "Nedirler"],
["p", "Hac, Zilhicce ayında Mekke'de Kâbe'yi ziyarettir \\u2014 gücü yeten her Müslümana ömürde bir kez farzdır (Âl-i İmrân 3:97). Umre ise yılın her zamanı yapılabilen küçük hacdır."],
["h", "Telbiye"],
["p", "İhrama girildiği andan itibaren hacı şu sözleri tekrarlar:"],
["dua", { ar: "''' + TALBIYA_AR + '''", tn: "Lebbeyk Allahümme lebbeyk, lebbeyke lâ şerîke leke lebbeyk. İnnel-hamde ven-ni'mete leke vel-mülk, lâ şerîke lek.", mean: "Buyur Allah'ım buyur, emrindeyim. Buyur, senin ortağın yoktur, buyur. Hamd ve nimet sanadır, mülk de senindir \\u2014 ortağın yoktur." }],
["h", "Umre \\u2014 adım adım"],
["p", "1. Mîkatta ihrama girilir: gusül, iki parça beyaz ihram (erkekler), telbiye ile niyet. 2. Tavaf: Hacerülesved'den başlayarak Kâbe yedi kez tavaf edilir. 3. Makam-ı İbrahim arkasında iki rekât namaz. 4. Sa'y: Safa ile Merve arasında yedi kez yürünür. 5. Tıraş veya saç kısaltma \\u2014 umre tamamlanır."],
["h", "Hac \\u2014 adım adım"],
["p", "1. Zilhicce'nin 8'inde (terviye günü) ihrama girilip Mina'ya gidilir. 2. 9'unda Arafat'ta öğleden gün batımına vakfe \\u2014 haccın özüdür (\\u201CHac Arafat'tır\\u201D \\u2014 Sünen-i Tirmizî). 3. Gün batımından sonra Müzdelife'ye gidilir, akşamla yatsı birleştirilir, taşlar toplanır. 4. 10'unda (bayram günü): büyük şeytana taş atılır, kurban kesilir, tıraş olunur, ardından ziyaret tavafı yapılır. 5. Teşrik günleri (11\\u201313): Mina'da kalınıp her gün üç cemreye taş atılır. 6. Mekke'den ayrılmadan önce veda tavafı yapılır."],
["h", "En faziletli dua"],
["p", "\\u201CEn hayırlı dua, Arefe günü yapılan duadır.\\u201D Sıkça tekrarlayın: Lâ ilahe illallah vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr. \\u2014 Sünen-i Tirmizî"],
["h", "On günün zikri"],
["p", "Zilhicce'nin ilk on günü, salih amellerin en sevimli olduğu günlerdir \\u2014 tehlil (Lâ ilahe illallah), tekbir (Allahu Ekber) ve tahmid (Elhamdülillah) ile doldurun. \\u2014 Sahih-i Buhari"],
["h", "Yola çıkmadan önce"],
["p", "Güvenilir bir hocadan menasiki öğrenin, borçlarınızı kapatın, insanlardan helallik alın ve niyeti halis tutun \\u2014 makbul haccın karşılığı ancak cennettir (Sahih-i Buhari, Sahih-i Müslim)."],
["link", { to: "pillars", icon: "🕋", title: "İslam'ın Beş Şartı", desc: "Şartlara genel bakışa dön" }]
] },'''

s = insert_after_article(s, "ramadan", ",\n" + TR_ARTICLES, "tr")
print("TR inserted OK")

# ============================================================ FRENCH
FR_ARTICLES = '''{ id: "shahada", icon: "\\u261D\\uFE0F", title: "La Shahada \\u2014 Le t\\u00E9moignage de foi", desc: "Son sens, ses conditions et ses exigences",
body: [
["h", "Les paroles"],
["dua", { ar: "''' + SHAHADA_AR + '''", tn: "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasoolullah", mean: "J'atteste qu'il n'y a de dieu qu'Allah, et j'atteste que Muhammad est le Messager d'Allah." }],
["h", "Ce qu'elle signifie"],
["p", "\\u00AB La ilaha illa Allah \\u00BB est une n\\u00E9gation et une affirmation : la n\\u00E9gation que quoi que ce soit m\\u00E9rite l'adoration \\u2014 ni idole, ni saint, ni force de la nature \\u2014 et l'affirmation que l'adoration appartient \\u00E0 Allah seul."],
["p", "\\u00AB Muhammadan rasoolullah \\u00BB signifie accepter le Proph\\u00E8te \\uFDFA comme dernier Messager d'Allah : croire en son message, ob\\u00E9ir \\u00E0 ses ordres et suivre son exemple."],
["h", "Ses conditions"],
["p", "Les savants mentionnent sept conditions pour que le t\\u00E9moignage profite \\u00E0 celui qui le prononce : (1) conna\\u00EEtre son sens, (2) la certitude sans doute, (3) l'acceptation, (4) la soumission et la conformit\\u00E9, (5) la v\\u00E9racit\\u00E9, (6) la sinc\\u00E9rit\\u00E9 \\u2014 prononc\\u00E9e pour Allah seul, et (7) l'amour pour elle et ses gens."],
["h", "Ce qui l'annule"],
["p", "Le t\\u00E9moignage est annul\\u00E9 par ses contraires \\u2014 avant tout le shirk (associer des partenaires \\u00E0 Allah), et le fait de se moquer de quoi que ce soit de la religion. Allah dit : \\u00AB Certes, Allah ne pardonne pas qu'on Lui associe... \\u00BB (Coran 4:48)."],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \\u00E0 l'aper\\u00E7u des piliers" }]
] },
{ id: "prayer-virtues", icon: "✨", title: "Les m\\u00E9rites de la pri\\u00E8re", desc: "Pourquoi les cinq pri\\u00E8res sont un don, pas un fardeau",
body: [
["h", "Une expiation entre les pri\\u00E8res"],
["p", "\\u00AB Les cinq pri\\u00E8res quotidiennes et d'un Jumu'ah au suivant expient les p\\u00E9ch\\u00E9s commis entre eux, tant que les p\\u00E9ch\\u00E9s majeurs sont \\u00E9vit\\u00E9s. \\u00BB \\u2014 Sahih Muslim"],
["h", "Une rivi\\u00E8re \\u00E0 votre porte"],
["p", "Le Proph\\u00E8te \\uFDFA demanda : s'il y avait une rivi\\u00E8re \\u00E0 la porte de l'un de vous o\\u00F9 il se laverait cinq fois par jour, resterait-il une trace de salet\\u00E9 ? \\u00AB Tel est l'exemple des cinq pri\\u00E8res \\u2014 Allah efface par elles les p\\u00E9ch\\u00E9s. \\u00BB \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "En congr\\u00E9gation : vingt-sept fois plus"],
["p", "\\u00AB La pri\\u00E8re en congr\\u00E9gation est vingt-sept fois plus m\\u00E9ritoire que la pri\\u00E8re accomplie seul. \\u00BB \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Le Fajr et l'Isha en congr\\u00E9gation"],
["p", "\\u00AB Quiconque prie l'Isha en congr\\u00E9gation, c'est comme s'il avait pri\\u00E9 la moiti\\u00E9 de la nuit ; et quiconque prie le Fajr en congr\\u00E9gation, c'est comme s'il avait pri\\u00E9 toute la nuit. \\u00BB \\u2014 Sahih Muslim"],
["h", "Les pas vers la mosqu\\u00E9e"],
["p", "Chaque pas vers la mosqu\\u00E9e \\u00E9l\\u00E8ve d'un degr\\u00E9 et efface un p\\u00E9ch\\u00E9 \\u2014 Sahih Muslim. Et attendre la pri\\u00E8re suivante apr\\u00E8s avoir termin\\u00E9 l'une est un \\u00AB ribat \\u00BB \\u2014 Sahih Muslim."],
["h", "La premi\\u00E8re chose sur laquelle on sera interrog\\u00E9"],
["p", "\\u00AB La premi\\u00E8re \\u0153uvre sur laquelle une personne sera jug\\u00E9e le Jour de la R\\u00E9surrection est la pri\\u00E8re. \\u00BB \\u2014 Sunan al-Tirmidhi"],
["link", { to: "prayer", icon: "🕌", title: "Comment prier \\u2014 \\u00C9tape par \\u00E9tape", desc: "Le guide pratique de la pri\\u00E8re" }],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \\u00E0 l'aper\\u00E7u des piliers" }]
] },
{ id: "zakat", icon: "🤲", title: "La Zakat \\u2014 L'aum\\u00F4ne obligatoire", desc: "Nisab, taux, b\\u00E9n\\u00E9ficiaires et Zakat al-Fitr",
body: [
["h", "Ce qu'elle est"],
["p", "La zakat est l'aum\\u00F4ne obligatoire sur les biens \\u00E9ligibles d\\u00E9tenus pendant une ann\\u00E9e lunaire \\u2014 2,5 % des \\u00E9conomies, de l'or, de l'argent et des marchandises. Ce n'est pas une faveur aux pauvres ; c'est leur droit dans vos biens (Coran 51:19)."],
["h", "Le nisab (seuil)"],
["p", "La zakat devient due lorsque vos biens \\u00E9ligibles atteignent le nisab \\u2014 environ 85 grammes d'or ou 595 grammes d'argent \\u2014 et qu'une ann\\u00E9e lunaire compl\\u00E8te s'est \\u00E9coul\\u00E9e."],
["h", "Qui la re\\u00E7oit"],
["p", "Allah nomme huit cat\\u00E9gories dans le Coran (9:60) : les pauvres, les n\\u00E9cessiteux, ceux charg\\u00E9s de la collecter, ceux dont les c\\u0153urs sont \\u00E0 gagner, l'affranchissement des captifs, les endett\\u00E9s, dans le sentier d'Allah, et le voyageur en d\\u00E9tresse."],
["h", "Zakat al-Fitr"],
["p", "Avant la pri\\u00E8re de l'A\\u00EEd al-Fitr, chaque musulman \\u2014 pour lui-m\\u00EAme et chaque personne \\u00E0 charge \\u2014 donne environ 2,5 \\u00E0 3 kg de nourriture de base (ou sa valeur) aux pauvres, afin que personne n'ait faim le jour de l'A\\u00EEd. Elle purifie aussi le je\\u00FBne des paroles futiles. \\u2014 Sunan Abi Dawud"],
["h", "Un avertissement"],
["p", "\\u00AB Et ceux qui th\\u00E9saurisent l'or et l'argent et ne les d\\u00E9pensent pas dans le sentier d'Allah \\u2014 annonce-leur un ch\\u00E2timent douloureux. \\u00BB \\u2014 Coran 9:34"],
["link", { to: "sadaqah", icon: "💝", title: "Sadaqah \\u2014 L'aum\\u00F4ne volontaire", desc: "Au-del\\u00E0 de l'obligation : les m\\u00E9rites du don" }],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \\u00E0 l'aper\\u00E7u des piliers" }]
] },
{ id: "sadaqah", icon: "💝", title: "Sadaqah \\u2014 L'aum\\u00F4ne volontaire", desc: "Les m\\u00E9rites du don au-del\\u00E0 de l'obligation",
body: [
["h", "Une ombre au Jour Dernier"],
["p", "\\u00AB Sept seront ombrag\\u00E9s par Allah le Jour o\\u00F9 il n'y aura d'ombre que la Sienne... \\u00BB \\u2014 parmi eux, celui qui donne l'aum\\u00F4ne si secr\\u00E8tement que sa main gauche ne sait pas ce que sa main droite a donn\\u00E9. \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Elle \\u00E9teint le p\\u00E9ch\\u00E9"],
["p", "\\u00AB L'aum\\u00F4ne \\u00E9teint le p\\u00E9ch\\u00E9 comme l'eau \\u00E9teint le feu. \\u00BB \\u2014 Sunan al-Tirmidhi"],
["h", "M\\u00EAme la moiti\\u00E9 d'une datte"],
["p", "\\u00AB Prot\\u00E9gez-vous du Feu, m\\u00EAme avec la moiti\\u00E9 d'une datte. \\u00BB Aucun don n'est trop petit. \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Un sourire est une aum\\u00F4ne"],
["p", "Sourire \\u00E0 son fr\\u00E8re, ordonner le bien, interdire le mal, guider une personne \\u00E9gar\\u00E9e, \\u00E9carter un obstacle du chemin \\u2014 tout cela est sadaqah. \\u2014 Sunan al-Tirmidhi"],
["h", "Sadaqah Jariyah \\u2014 l'aum\\u00F4ne qui continue"],
["p", "\\u00AB Quand une personne meurt, ses \\u0153uvres s'arr\\u00EAtent sauf trois : une aum\\u00F4ne continue, une science dont on profite, ou un enfant pieux qui prie pour lui. \\u00BB \\u2014 Sahih Muslim"],
["h", "Donnez en secret, donnez souvent"],
["p", "L'aum\\u00F4ne secr\\u00E8te est plus m\\u00E9ritoire et plus sinc\\u00E8re ; mais donner ouvertement est aussi bien quand cela encourage les autres. La meilleure aum\\u00F4ne est celle que l'\\u00E2me peut vraiment offrir, donn\\u00E9e avec r\\u00E9gularit\\u00E9."],
["link", { to: "zakat", icon: "🤲", title: "La Zakat \\u2014 L'aum\\u00F4ne obligatoire", desc: "Le pilier du don obligatoire" }],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \\u00E0 l'aper\\u00E7u des piliers" }]
] },
{ id: "fasting-virtues", icon: "🌙", title: "Les m\\u00E9rites du je\\u00FBne", desc: "Pourquoi le je\\u00FBne compte parmi les \\u0153uvres les plus aim\\u00E9es",
body: [
["h", "\\u00AB Le je\\u00FBne est pour Moi \\u00BB"],
["p", "Allah dit dans un hadith qudsi : \\u00AB Toute \\u0153uvre du fils d'Adam est pour lui, sauf le je\\u00FBne \\u2014 il est pour Moi, et c'est Moi qui le r\\u00E9compenserai. \\u00BB \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "La porte d'Ar-Rayyan"],
["p", "\\u00AB Au Paradis, il y a une porte appel\\u00E9e Ar-Rayyan, par laquelle entreront ceux qui je\\u00FBnaient au Jour de la R\\u00E9surrection, et personne d'autre n'y entrera. \\u00BB \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Deux joies"],
["p", "Le je\\u00FBneur a deux joies : la joie de rompre le je\\u00FBne, et la joie de rencontrer Allah. Et l'haleine du je\\u00FBneur est plus douce pour Allah que le parfum du musc. \\u2014 Sahih al-Bukhari"],
["h", "Un bouclier"],
["p", "\\u00AB Le je\\u00FBne est un bouclier \\u00BB \\u2014 il prot\\u00E8ge contre les d\\u00E9sirs coupables et, avec la patience, contre le Feu. \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Laylat al-Qadr"],
["p", "\\u00AB Quiconque veille Laylat al-Qadr avec foi et espoir de r\\u00E9compense, ses p\\u00E9ch\\u00E9s pass\\u00E9s lui sont pardonn\\u00E9s. \\u00BB Cherchez-la dans les nuits impaires des dix derniers jours de Ramadan. \\u2014 Sahih al-Bukhari, Sahih Muslim"],
["h", "Les je\\u00FBnes volontaires de l'ann\\u00E9e"],
["p", "Les lundis et jeudis (l'habitude du Proph\\u00E8te \\uFDFA \\u2014 Sunan al-Tirmidhi) ; six jours de Shawwal (\\u00AB comme s'il avait je\\u00FBn\\u00E9 toute l'ann\\u00E9e \\u00BB \\u2014 Sahih Muslim) ; le jour d'Arafah (expie l'ann\\u00E9e pass\\u00E9e et \\u00E0 venir \\u2014 Sahih Muslim) ; Achoura (le 10 Muharram) ; et les \\u00AB jours blancs \\u00BB \\u2014 les 13, 14 et 15 de chaque mois lunaire."],
["link", { to: "ramadan", icon: "🌙", title: "Guide du Ramadan", desc: "Je\\u00FBne, tarawih, Laylat al-Qadr et l'A\\u00EEd" }],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \\u00E0 l'aper\\u00E7u des piliers" }]
] },
{ id: "hajj-umrah", icon: "🕋", title: "Hajj et Umra \\u2014 Guide pratique", desc: "Les rites \\u00E9tape par \\u00E9tape, avec duas et dhikr",
body: [
["h", "Ce qu'ils sont"],
["p", "Le Hajj est le p\\u00E8lerinage vers la Kaaba \\u00E0 La Mecque pendant Dhul-Hijjah \\u2014 obligatoire une fois dans la vie pour tout musulman physiquement et financi\\u00E8rement capable (Coran 3:97). La Umra est le petit p\\u00E8lerinage, accomplissable \\u00E0 tout moment de l'ann\\u00E9e."],
["h", "La Talbiyah"],
["p", "D\\u00E8s l'entr\\u00E9e en ihram, le p\\u00E8lerin r\\u00E9p\\u00E8te :"],
["dua", { ar: "''' + TALBIYA_AR + '''", tn: "Labbayka Allahumma labbayk, labbayka la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.", mean: "Me voici, \\u00F4 Allah, me voici. Me voici, Tu n'as pas d'associ\\u00E9, me voici. Certes, la louange et les bienfaits T'appartiennent, ainsi que la royaut\\u00E9 \\u2014 Tu n'as pas d'associ\\u00E9." }],
["h", "La Umra \\u2014 \\u00E9tape par \\u00E9tape"],
["p", "1. Entrer en ihram au miqat : ghusl, les deux pi\\u00E8ces de tissu blanc (hommes), et l'intention avec la Talbiyah. 2. Tawaf : tourner sept fois autour de la Kaaba dans le sens inverse des aiguilles d'une montre, en commen\\u00E7ant \\u00E0 la Pierre Noire. 3. Prier deux rak'ahs derri\\u00E8re le Maqam Ibrahim. 4. Sa'i : marcher sept fois entre Safa et Marwa. 5. Halq ou taqsir : se raser ou se couper les cheveux \\u2014 la Umra est termin\\u00E9e."],
["h", "Le Hajj \\u2014 \\u00E9tape par \\u00E9tape"],
["p", "1. Ihram le 8 Dhul-Hijjah (Yawm al-Tarwiyah) puis Mina. 2. Le 9, stationner \\u00E0 Arafah de midi au coucher du soleil \\u2014 le c\\u0153ur du Hajj (\\u00AB Le Hajj, c'est Arafah \\u00BB \\u2014 Sunan al-Tirmidhi). 3. Apr\\u00E8s le coucher du soleil, Muzdalifah : Maghrib et Isha regroup\\u00E9es, ramasser les cailloux. 4. Le 10 (jour de l'A\\u00EEd) : lapider la Jamarat al-Aqaba, sacrifier, se raser/couper, puis Tawaf al-Ifadah. 5. Jours de Tashriq (11\\u201313) : lapider les trois jamarat chaque jour, en restant \\u00E0 Mina. 6. Tawaf d'adieu avant de quitter La Mecque."],
["h", "La meilleure dua"],
["p", "\\u00AB La meilleure invocation est celle du jour d'Arafah. \\u00BB R\\u00E9p\\u00E9tez souvent : La ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir. \\u2014 Sunan al-Tirmidhi"],
["h", "Le dhikr des dix jours"],
["p", "Les dix premiers jours de Dhul-Hijjah sont les jours les plus aim\\u00E9s pour les bonnes \\u0153uvres \\u2014 remplissez-les de tahlil (La ilaha illa Allah), takbir (Allahu Akbar) et tahmid (Alhamdulillah). \\u2014 Sahih al-Bukhari"],
["h", "Avant de partir"],
["p", "Apprenez les rites aupr\\u00E8s d'un savant ou d'un guide fiable avant de voyager, r\\u00E9glez vos dettes, demandez pardon aux gens, et faites une intention sinc\\u00E8re \\u2014 le Hajj Mabroor (le Hajj accept\\u00E9) n'a d'autre r\\u00E9compense que le Paradis (Sahih al-Bukhari, Sahih Muslim)."],
["link", { to: "pillars", icon: "🕋", title: "Les cinq piliers de l'islam", desc: "Retour \\u00E0 l'aper\\u00E7u des piliers" }]
] },'''

s = insert_after_article(s, "ramadan", ",\n" + FR_ARTICLES, "fr")
print("FR inserted OK")

# ============================================================ cross-links
s = append_link_to_article(s, "prayer",
    '["link", { to: "prayer-virtues", icon: "✨", title: "The Virtues of Prayer", desc: "Why the five daily prayers are a gift, not a burden" }]', "en")
s = append_link_to_article(s, "prayer",
    '["link", { to: "prayer-virtues", icon: "✨", title: "Namazın Faziletleri", desc: "Beş vakit namaz neden bir yük değil, bir nimettir" }]', "tr")
s = append_link_to_article(s, "prayer",
    '["link", { to: "prayer-virtues", icon: "✨", title: "Les m\\u00E9rites de la pri\\u00E8re", desc: "Pourquoi les cinq pri\\u00E8res sont un don, pas un fardeau" }]', "fr")
s = append_link_to_article(s, "ramadan",
    '["link", { to: "fasting-virtues", icon: "🌙", title: "The Virtues of Fasting", desc: "Why fasting is among the most beloved deeds" }]', "en")
s = append_link_to_article(s, "ramadan",
    '["link", { to: "fasting-virtues", icon: "🌙", title: "Orucun Faziletleri", desc: "Oruç neden en sevimli amellerdendir" }]', "tr")
s = append_link_to_article(s, "ramadan",
    '["link", { to: "fasting-virtues", icon: "🌙", title: "Les m\\u00E9rites du je\\u00FBne", desc: "Pourquoi le je\\u00FBne compte parmi les \\u0153uvres les plus aim\\u00E9es" }]', "fr")
print("cross-links OK")

open(P, "w", encoding="utf-8").write(s)
print("written OK")
