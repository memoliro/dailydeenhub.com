// Daily rotating content: verse, hadith, Asmaa-ul Husna (2026-10-11)
const DAILY_VERSES = [
  { ref: "Ar-Ra'd 13:19", tr_ref: "Ra'd 13:19",
    en: "Then is he who knows that what has been revealed to you from your Lord is the truth like one who is blind? They will only be reminded who are people of understanding.",
    tr: "Rabbinden sana indirilenin gerçek olduğunu bilen kişi, kör olan gibi midir? Ancak akıl sahipleri öğüt alıp düşünür." },
  { ref: "Al-Baqarah 2:152", tr_ref: "Bakara 2:152",
    en: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    tr: "Öyleyse Beni anın, Ben de sizi anayım. Bana şükredin, nankörlük etmeyin." },
  { ref: "Ash-Sharh 94:6", tr_ref: "İnşirah 94:6",
    en: "Indeed, with hardship comes ease.",
    tr: "Gerçekten, güçlükle beraber kolaylık vardır." },
  { ref: "Al-Ankabut 29:69", tr_ref: "Ankebut 29:69",
    en: "And those who strive for Us – We will surely guide them to Our ways. And indeed, Allah is with the doers of good.",
    tr: "Bizim uğrumuzda çaba gösterenleri elbette yollarımıza iletiriz. Şüphesiz Allah iyilik edenlerle beraberdir." },
  { ref: "Al-Hadid 57:17", tr_ref: "Hadid 57:17",
    en: "Know that Allah gives life to the earth after its lifelessness. We have made clear to you the signs; perhaps you will understand.",
    tr: "Bilin ki Allah, yeryüzünü ölümünden sonra diriltir. Düşünesiniz diye size ayetleri açıkladık." },
  { ref: "Az-Zumar 39:53", tr_ref: "Zümer 39:53",
    en: "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.",
    tr: "Allah'ın rahmetinden ümit kesmeyin. Şüphesiz Allah bütün günahları bağışlar. Çünkü O, çok bağışlayandır, çok merhamet edendir." },
  { ref: "Al-Baqarah 2:286", tr_ref: "Bakara 2:286",
    en: "Allah does not burden a soul beyond that it can bear.",
    tr: "Allah hiçbir nefse gücünün üstünde bir şey yüklemez." }
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
    tr: "Hiçbiriniz, kendisi için istediğini kardeşi için de istemedikçe gerçekten iman etmiş olmaz." }
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
function renderDaily() {
  const day = Math.floor(Date.now() / 864e5);
  const lang = (window.DDHLang && window.DDHLang()) || document.documentElement.lang || 'en';
  const tr = lang === 'tr';
  const v = DAILY_VERSES[day % DAILY_VERSES.length];
  const h = DAILY_HADITH[day % DAILY_HADITH.length];
  const a = ASMA[day % ASMA.length];
  const set = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  set('verseRef', tr ? v.tr_ref : v.ref);
  set('verseText', tr ? v.tr : v.en);
  set('hadithRef', tr ? h.tr_ref : h.ref);
  set('hadithText', tr ? h.tr : h.en);
  set('asmaAr', a[0]);
  set('asmaTrans', a[1]);
  set('asmaMeaning', tr ? a[3] : a[2]);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderDaily);
else renderDaily();
