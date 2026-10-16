/* DailyDeenHub Articles — About the app + FAQ (EN/TR). Accordion renderer. */
const ARTICLES = {
en: [
{ icon: "\u2139\uFE0F", title: "About DailyDeenHub",
  body: ["DailyDeenHub is a free Islamic companion app: accurate prayer times with reminders, Qibla compass, Quran reader with audio, tasbih counter, mosque and halal finder, Ramadan tools, Hijri calendar, holy-day countdowns, greeting cards, and more.",
  "No account, no sign-in, no ads. Your settings and progress stay on your device. The app works offline for all core features."] },
{ icon: "\uD83D\uDD4C", title: "How are prayer times calculated?",
  body: ["Prayer times are computed on your device from your location using well-known calculation methods (Diyanet, ISNA, Muslim World League, and others). You can change the method and Asr school any time in Settings \u203A Prayer Calculation.",
  "If the app cannot reach the network, it falls back to the built-in offline calculation, which closely matches the online sources."] },
{ icon: "\uD83D\uDD4C", title: "Why do times differ from my local mosque?",
  body: ["Mosques may follow a different calculation method or add local adjustments (e.g. a few minutes of caution). Check which method your mosque uses and select the same one in Settings \u203A Prayer Calculation. Small differences of a few minutes are normal."] },
{ icon: "\uD83D\uDCF6", title: "Do I need internet to use the app?",
  body: ["No. Prayer times, Qibla, Quran text, tasbih, khatm tracker, and your saved settings all work offline. The mosque/halal finder, Quran radio, and live streams need a connection."] },
{ icon: "\uD83D\uDD12", title: "Is my data private?",
  body: ["Yes. Everything \u2014 your location, settings, trackers, favorites \u2014 is stored only on your device. There is no account and nothing is uploaded. The only exception: if you enable prayer alerts for when the tab is closed, your browser's push subscription and prayer settings are stored on our server so the notification can reach you. See the Privacy page for details."] },
{ icon: "\uD83D\uDD14", title: "How do prayer alerts work?",
  body: ["Two kinds. Tab-open reminders play a sound and show a notification while the app is open. \"Prayer alerts (even when tab is closed)\" uses web push so the reminder arrives even if the app is closed \u2014 your browser must stay installed and notifications allowed.",
  "Note: reminders are a help, not an alarm clock. For Fajr, keep your regular alarm as well."] },
{ icon: "\uD83D\uDCF1", title: "How do I install it on my home screen?",
  body: ["Android (Chrome): open the browser menu (\u22EE) and tap \"Add to Home screen\" or \"Install app\". iPhone (Safari): tap Share, then \"Add to Home Screen\". The installed app opens full-screen and works offline."] },
{ icon: "\uD83E\uDDED", title: "How accurate is the Qibla compass?",
  body: ["The compass uses your phone's magnetometer and GPS. For best results, hold the phone upright and wave it in a figure-8 to calibrate the sensor, and stay away from metal objects and magnets. GPS is used once to find your position relative to the Kaaba."] },
{ icon: "\uD83C\uDF19", title: "Why do holy-day dates mention moon sighting?",
  body: ["Holy-day dates follow the Diyanet (T\u00FCrkiye) calculation. Your local mosque may observe Ramadan or Eid a day earlier or later based on the actual moon sighting \u2014 when in doubt, follow your local mosque."] },
{ icon: "\u2699\uFE0F", title: "Can I change the language?",
  body: ["Yes. Open Settings \u203A Language (Dil) and choose English or T\u00FCrk\u00E7e. The whole app \u2014 including this page \u2014 switches instantly without reloading."] },
{ icon: "\uD83D\uDCB0", title: "Is the app really free?",
  body: ["Yes, completely free, no ads, no premium tier. If DailyDeenHub helps you, there is an optional one-time donation link (Support us) to help cover server costs. It is never shown during worship moments."] }
],
tr: [
{ icon: "\u2139\uFE0F", title: "DailyDeenHub Hakk\u0131nda",
  body: ["DailyDeenHub \u00fccretsiz bir \u0130slami yard\u0131mc\u0131 uygulamad\u0131r: hat\u0131rlatmal\u0131 do\u011fru namaz vakitleri, k\u0131ble pusulas\u0131, sesli Kur'an okuyucu, tesbih sayac\u0131, cami ve helal mek\u00E2n bulucu, Ramazan ara\u00E7lar\u0131, Hicri takvim, dini g\u00FCn saya\u00E7lar\u0131, tebrik kartlar\u0131 ve daha fazlas\u0131.",
  "Hesap yok, giri\u015F yok, reklam yok. Ayarlar\u0131n\u0131z ve ilerlemeniz yaln\u0131zca cihaz\u0131n\u0131zda saklan\u0131r. Uygulama t\u00fcm temel \u00f6zelliklerde \u00e7evrimd\u0131\u015f\u0131 \u00e7al\u0131\u015f\u0131r."] },
{ icon: "\uD83D\uDD4C", title: "Namaz vakitleri nas\u0131l hesaplan\u0131yor?",
  body: ["Namaz vakitleri, konumunuzdan yararlanarak bilinen hesaplama y\u00f6ntemleriyle (Diyanet, ISNA, Muslim World League ve di\u011ferleri) cihaz\u0131n\u0131zda hesaplan\u0131r. Y\u00f6ntemi ve ikindi vaktini Ayarlar \u203A Namaz Hesaplama b\u00f6l\u00fcm\u00fcnden diledi\u011finiz zaman de\u011fi\u015ftirebilirsiniz.",
  "Uygulama internete ula\u015famazsa yerle\u015fik \u00e7evrimd\u0131\u015f\u0131 hesaplamaya ge\u00e7er; bu hesaplama \u00e7evrimi\u00e7i kaynaklarla b\u00fcy\u00fck \u00f6l\u00e7\u00fcde uyumludur."] },
{ icon: "\uD83D\uDD4C", title: "Vakitler camimden neden farkl\u0131?",
  body: ["Camiler farkl\u0131 bir hesaplama y\u00f6ntemi veya yerel d\u00fczeltmeler (mesela birka\u00e7 dakikal\u0131k ihtiyat) uygulayabilir. Caminizin hangi y\u00f6ntemi kulland\u0131\u011f\u0131n\u0131 \u00f6\u011frenip Ayarlar \u203A Namaz Hesaplama b\u00f6l\u00fcm\u00fcnden ayn\u0131s\u0131n\u0131 se\u00e7in. Birka\u00e7 dakikal\u0131k farklar normaldir."] },
{ icon: "\uD83D\uDCF6", title: "\u0130nternet gerekli mi?",
  body: ["Hay\u0131r. Namaz vakitleri, k\u0131ble, Kur'an metni, tesbih, hatim takibi ve kay\u0131tl\u0131 ayarlar\u0131n\u0131z \u00e7evrimd\u0131\u015f\u0131 \u00e7al\u0131\u015f\u0131r. Cami/helal mek\u00E2n bulucu, Kur'an radyosu ve canl\u0131 yay\u0131nlar i\u00e7in ba\u011flant\u0131 gerekir."] },
{ icon: "\uD83D\uDD12", title: "Verilerim gizli mi?",
  body: ["Evet. Konumunuz, ayarlar\u0131n\u0131z, takipleriniz, favorileriniz \u2014 her \u015fey yaln\u0131zca cihaz\u0131n\u0131zda saklan\u0131r. Hesap yoktur, hi\u00e7bir \u015fey y\u00fcklenmez. Tek istisna: sekme kapal\u0131yken namaz uyar\u0131lar\u0131n\u0131 a\u00e7arsan\u0131z, bildirimin size ula\u015fabilmesi i\u00e7in taray\u0131c\u0131n\u0131z\u0131n push aboneli\u011fi ve namaz ayarlar\u0131n\u0131z sunucumuzda saklan\u0131r. Ayr\u0131nt\u0131lar i\u00e7in Gizlilik sayfas\u0131na bak\u0131n."] },
{ icon: "\uD83D\uDD14", title: "Namaz uyar\u0131lar\u0131 nas\u0131l \u00e7al\u0131\u015f\u0131r?",
  body: ["\u0130ki t\u00fcr vard\u0131r. Sekme a\u00e7\u0131kken hat\u0131rlatmalar ses \u00e7alar ve bildirim g\u00f6sterir. \"Sekme kapal\u0131yken de namaz uyar\u0131lar\u0131\" web push kullan\u0131r; uygulama kapal\u0131 olsa bile uyar\u0131 gelir \u2014 taray\u0131c\u0131n\u0131z y\u00fckl\u00fc kalmal\u0131 ve bildirimlere izin verilmelidir.",
  "Not: hat\u0131rlatmalar yard\u0131mc\u0131d\u0131r, \u00e7alar saat yerine ge\u00e7mez. Sabah namaz\u0131 i\u00e7in normal alarm\u0131n\u0131z\u0131 da kurun."] },
{ icon: "\uD83D\uDCF1", title: "Ana ekrana nas\u0131l eklerim?",
  body: ["Android (Chrome): taray\u0131c\u0131 men\u00fcs\u00fcn\u00fc (\u22EE) a\u00e7\u0131p \"Ana ekrana ekle\"ye dokunun. iPhone (Safari): Payla\u015f'a dokunup \"Ana Ekrana Ekle\"yi se\u00e7in. Y\u00fcklenen uygulama tam ekran a\u00e7\u0131l\u0131r ve \u00e7evrimd\u0131\u015f\u0131 \u00e7al\u0131\u015f\u0131r."] },
{ icon: "\uD83E\uDDED", title: "K\u0131ble pusulas\u0131 ne kadar do\u011fru?",
  body: ["Pusula, telefonunuzun manyetometresini ve GPS'i kullan\u0131r. En iyi sonu\u00e7 i\u00e7in telefonu dik tutun, sens\u00f6r\u00fc kalibre etmek i\u00e7in 8 \u00e7izin ve metal e\u015fyalardan uzak durun. K\u00E2be'ye g\u00f6re konumunuzu bulmak i\u00e7in GPS bir kez kullan\u0131l\u0131r."] },
{ icon: "\uD83C\uDF19", title: "Dini g\u00fcnlerde neden hilal notu var?",
  body: ["Dini g\u00fcn tarihleri Diyanet (T\u00fcrkiye) hesaplamas\u0131na g\u00f6redir. Camii'niz hilalin g\u00f6r\u00fclmesine g\u00f6re Ramazan'\u0131 veya bayram\u0131 bir g\u00fcn \u00f6nce ya da sonra ba\u015flatabilir \u2014 \u015f\u00fcphede kal\u0131rsan\u0131z camii'nizi takip edin."] },
{ icon: "\u2699\uFE0F", title: "Dili de\u011fi\u015ftirebilir miyim?",
  body: ["Evet. Ayarlar \u203A Dil b\u00f6l\u00fcm\u00fcnden English veya T\u00fcrk\u00e7e se\u00e7in. Bu sayfa dahil t\u00fcm uygulama yeniden y\u00fcklenmeden an\u0131nda de\u011fi\u015fir."] },
{ icon: "\uD83D\uDCB0", title: "Uygulama ger\u00e7ekten \u00fccretsiz mi?",
  body: ["Evet, tamamen \u00fccretsiz; reklam yok, premium s\u00fcr\u00fcm yok. DailyDeenHub size faydal\u0131 oluyorsa, sunucu masraflar\u0131na destek i\u00e7in iste\u011fe ba\u011fl\u0131 tek seferlik ba\u011f\u0131\u015f ba\u011flant\u0131s\u0131 (Bize destek olun) vard\u0131r. \u0130badet anlar\u0131nda asla g\u00f6sterilmez."] }
],
fr: [
{ icon: "\u2139\uFE0F", title: "\u00c0 propos de DailyDeenHub",
  body: ["DailyDeenHub est une application islamique gratuite : horaires de pri\u00e8re pr\u00e9cis avec rappels, boussole Qibla, lecteur de Coran avec audio, compteur de tasbih, recherche de mosqu\u00e9es et de restaurants halal, outils pour le Ramadan, calendrier hijri, comptes \u00e0 rebours des jours saints, cartes de v\u0153ux, et bien plus.",
  "Aucun compte, aucune inscription, aucune publicit\u00e9. Vos r\u00e9glages et votre progression restent sur votre appareil. L'application fonctionne hors ligne pour toutes les fonctions essentielles."] },
{ icon: "\uD83D\uDD4C", title: "Comment les horaires de pri\u00e8re sont-ils calcul\u00e9s ?",
  body: ["Les horaires de pri\u00e8re sont calcul\u00e9s sur votre appareil \u00e0 partir de votre position, selon des m\u00e9thodes de calcul reconnues (Diyanet, ISNA, Muslim World League, et d'autres). Vous pouvez changer de m\u00e9thode et d'\u00e9cole pour l'Asr \u00e0 tout moment dans R\u00e9glages \u203a Calcul des pri\u00e8res.",
  "Si l'application ne peut pas acc\u00e9der au r\u00e9seau, elle bascule sur le calcul hors ligne int\u00e9gr\u00e9, qui correspond \u00e9troitement aux sources en ligne."] },
{ icon: "\uD83D\uDD4C", title: "Pourquoi les horaires diff\u00e8rent-ils de ceux de ma mosqu\u00e9e ?",
  body: ["Les mosqu\u00e9es peuvent suivre une m\u00e9thode de calcul diff\u00e9rente ou appliquer des ajustements locaux (par exemple quelques minutes de pr\u00e9caution). V\u00e9rifiez la m\u00e9thode utilis\u00e9e par votre mosqu\u00e9e et s\u00e9lectionnez la m\u00eame dans R\u00e9glages \u203a Calcul des pri\u00e8res. De petites diff\u00e9rences de quelques minutes sont normales."] },
{ icon: "\uD83D\uDCF6", title: "Ai-je besoin d'internet pour utiliser l'app ?",
  body: ["Non. Les horaires de pri\u00e8re, la Qibla, le texte du Coran, le tasbih, le suivi de khatm et vos r\u00e9glages enregistr\u00e9s fonctionnent tous hors ligne. La recherche de mosqu\u00e9es/halal, la radio Coran et les diffusions en direct n\u00e9cessitent une connexion."] },
{ icon: "\uD83D\uDD12", title: "Mes donn\u00e9es sont-elles priv\u00e9es ?",
  body: ["Oui. Tout \u2014 votre position, vos r\u00e9glages, vos suivis, vos favoris \u2014 est stock\u00e9 uniquement sur votre appareil. Il n'y a aucun compte et rien n'est t\u00e9l\u00e9vers\u00e9. Seule exception : si vous activez les alertes de pri\u00e8re pour quand l'onglet est ferm\u00e9, l'abonnement push de votre navigateur et vos r\u00e9glages de pri\u00e8re sont stock\u00e9s sur notre serveur pour que la notification puisse vous parvenir. Voir la page Confidentialit\u00e9 pour plus de d\u00e9tails."] },
{ icon: "\uD83D\uDD14", title: "Comment fonctionnent les alertes de pri\u00e8re ?",
  body: ["Deux sortes. Les rappels d'onglet ouvert jouent un son et affichent une notification pendant que l'application est ouverte. \u00ab Alertes de pri\u00e8re (m\u00eame quand l'onglet est ferm\u00e9) \u00bb utilise le push web, donc le rappel arrive m\u00eame si l'application est ferm\u00e9e \u2014 votre navigateur doit rester install\u00e9 et les notifications autoris\u00e9es.",
  "Remarque : les rappels sont une aide, pas un r\u00e9veil. Pour le Fajr, gardez aussi votre alarme habituelle."] },
{ icon: "\uD83D\uDCF1", title: "Comment l'installer sur mon \u00e9cran d'accueil ?",
  body: ["Android (Chrome) : ouvrez le menu du navigateur (\u22EE) et touchez \u00ab Ajouter \u00e0 l'\u00e9cran d'accueil \u00bb ou \u00ab Installer l'application \u00bb. iPhone (Safari) : touchez Partager, puis \u00ab Sur l'\u00e9cran d'accueil \u00bb. L'application install\u00e9e s'ouvre en plein \u00e9cran et fonctionne hors ligne."] },
{ icon: "\uD83E\uDDED", title: "La boussole Qibla est-elle pr\u00e9cise ?",
  body: ["La boussole utilise le magn\u00e9tom\u00e8tre et le GPS de votre t\u00e9l\u00e9phone. Pour de meilleurs r\u00e9sultats, tenez le t\u00e9l\u00e9phone \u00e0 la verticale et d\u00e9crivez un 8 pour calibrer le capteur, et restez \u00e0 l'\u00e9cart des objets m\u00e9talliques et des aimants. Le GPS est utilis\u00e9 une fois pour situer votre position par rapport \u00e0 la Kaaba."] },
{ icon: "\uD83C\uDF19", title: "Pourquoi les dates des jours saints mentionnent-elles l'observation lunaire ?",
  body: ["Les dates des jours saints suivent le calcul du Diyanet (Turquie). Votre mosqu\u00e9e locale peut observer le Ramadan ou l'A\u00efd un jour plus t\u00f4t ou plus tard selon l'observation r\u00e9elle de la lune \u2014 en cas de doute, suivez votre mosqu\u00e9e locale."] },
{ icon: "\u2699\uFE0F", title: "Puis-je changer de langue ?",
  body: ["Oui. Ouvrez R\u00e9glages \u203a Langue et choisissez English, T\u00fcrk\u00e7e ou Fran\u00e7ais. Toute l'application \u2014 y compris cette page \u2014 change instantan\u00e9ment sans rechargement."] },
{ icon: "\uD83D\uDCB0", title: "L'app est-elle vraiment gratuite ?",
  body: ["Oui, enti\u00e8rement gratuite, sans publicit\u00e9 ni offre premium. Si DailyDeenHub vous est utile, un lien de don unique optionnel (Soutenez-nous) aide \u00e0 couvrir les frais de serveur. Il n'est jamais affich\u00e9 pendant les moments de culte."] }
]
};

function renderArticles() {
  const el = document.getElementById("articlesList");
  if (!el) return;
  let items = ARTICLES[state.lang] || ARTICLES.en;
  if (state.lang === "fr" && ARTICLES.fr) {
    const frByIcon = {};
    ARTICLES.fr.forEach(function (f, i) { frByIcon[i] = f; });
    items = ARTICLES.en.map(function (a, i) {
      return frByIcon[i] ? Object.assign({}, a, { title: frByIcon[i].title, body: frByIcon[i].body || a.body }) : a;
    });
  }
  el.innerHTML = items.map((a, i) =>
    `<div class="art-item"><button type="button" class="art-q" data-ai="${i}"><span class="art-ic">${a.icon}</span><span class="art-ti">${esc(a.title)}</span><span class="art-ch">+</span></button>` +
    `<div class="art-a hidden">${a.body.map(p => `<p>${esc(p)}</p>`).join("")}</div></div>`
  ).join("");
  el.querySelectorAll("[data-ai]").forEach(b => b.onclick = () => {
    const ans = b.nextElementSibling;
    const open = ans.classList.toggle("hidden");
    b.querySelector(".art-ch").textContent = open ? "+" : "\u2212";
  });
}
