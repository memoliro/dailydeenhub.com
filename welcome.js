(function(){
  function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function lsSet(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  function getSaved(){ try { return JSON.parse(localStorage.getItem('ezan-vakti') || '{}') || {}; } catch(e){ return {}; } }
  function putSaved(s){ try { localStorage.setItem('ezan-vakti', JSON.stringify(s)); } catch(e){} }

  var lang = lsGet('ddh-lang') || 'en';
  if (!['en','tr','fr'].includes(lang)) lang = 'en';

  var T = {
    en: {
      brand: 'Daily Deen Hub', greet: 'Assalamu Alaikum',
      tag: 'Your companion for everyday life',
      langQ: 'Choose your language', label: 'English',
      next: 'Continue', back: '‹', skip: 'Skip', enter: 'Enter the App',
      p2Title: 'Built to serve, not to sell',
      p2Body: 'Daily Deen Hub exists for one reason: to help you find the right resources and tools for your daily worship. Nothing more.',
      promises: [
        ['🚫', 'No ads — ever', 'No banners, no popups, no sponsored anything.'],
        ['🔓', 'No account, no sign-in', 'Open the app and it just works.'],
        ['🔒', 'Privacy first', 'Your settings and location stay on your device, where they belong.'],
        ['💚', 'Completely free', 'Every feature, for everyone, forever.']
      ],
      p3Title: 'Everything for your day',
      p3Body: 'A complete companion for your daily deen — all in one place.',
      feats: [
        ['🕌', 'Prayer times', 'Accurate times with gentle alerts, even when the app is closed.'],
        ['📖', 'Quran reader', 'Full Quran with recitation audio and verse-by-verse follow.'],
        ['🧭', 'Qibla compass', 'Find the prayer direction wherever you are.'],
        ['📿', 'Tasbih & dhikr', 'Counter, daily dhikrs and the 99 Names.'],
        ['📚', 'Learning Center', 'Step-by-step guides for everyday Muslim life.'],
        ['🌙', 'Ramadan hub', 'Fasting tracker, holy days and more.']
      ],
      p4Title: 'One last thing',
      p4Body: 'To calculate accurate prayer times, find the Qibla direction, and locate nearby mosques, the app needs your location.',
      locBtn: 'FIND MY LOCATION', locSkip: "I'll set it later", locDone: 'Location saved',
      terms: 'I agree to the <a href="/terms.html">Terms of Use</a> and the <a href="/privacy.html">Privacy Policy</a> of the Application.',
      lcTitle: 'For your information',
      lcBody: 'Daily Deen Hub uses your location to calculate accurate prayer times, find the Qibla direction, and locate nearby mosques.',
      lcNo: 'NOT NOW', lcYes: 'AGREE'
    },
    tr: {
      brand: 'Daily Deen Hub', greet: 'Esselamu Aleykum',
      tag: 'Günlük hayatınızda yol arkadaşınız',
      langQ: 'Dilinizi seçin', label: 'Türkçe',
      next: 'Devam Et', back: '‹', skip: 'Atla', enter: 'Uygulamaya Gir',
      p2Title: 'Hizmet için var, satış için değil',
      p2Body: 'Daily Deen Hub tek bir amaç için var: günlük ibadetiniz için doğru kaynakları ve araçları bulmanıza yardımcı olmak. Hepsi bu.',
      promises: [
        ['🚫', 'Reklam yok — asla', 'Banner yok, pencere yok, sponsorlu içerik yok.'],
        ['🔓', 'Hesap yok, giriş yok', 'Uygulamayı açın, hemen çalışır.'],
        ['🔒', 'Önce gizlilik', 'Ayarlarınız ve konumunuz cihazınızda kalır.'],
        ['💚', 'Tamamen ücretsiz', 'Tüm özellikler, herkese, sonsuza dek.']
      ],
      p3Title: 'Gününüz için her şey',
      p3Body: 'Günlük dininiz için eksiksiz bir yol arkadaşı — hepsi tek yerde.',
      feats: [
        ['🕌', 'Namaz vakitleri', 'Uygulama kapalıyken bile nazik uyarılarla doğru vakitler.'],
        ['📖', 'Kur\'an okuyucu', 'Tilavet sesiyle tam Kur\'an ve ayet ayet takip.'],
        ['🧭', 'Kıble pusulası', 'Nerede olursanız olun namaz yönünü bulun.'],
        ['📿', 'Tesbih ve zikir', 'Sayaç, günlük zikirler ve Esmaül Hüsna.'],
        ['📚', 'Öğrenme Merkezi', 'Günlük Müslüman hayatı için adım adım rehberler.'],
        ['🌙', 'Ramazan merkezi', 'Oruç takipçisi, kutsal günler ve daha fazlası.']
      ],
      p4Title: 'Son bir şey',
      p4Body: 'Doğru namaz vakitlerini hesaplamak, kıble yönünü bulmak ve yakındaki camileri göstermek için uygulamanın konumunuza ihtiyacı var.',
      locBtn: 'KONUMUMU BUL', locSkip: 'Daha sonra ayarlarım', locDone: 'Konum kaydedildi',
      terms: 'Uygulamanın <a href="/tr/terms.html">Kullanım Şartları</a> ve <a href="/tr/privacy.html">Gizlilik Politikası</a>\'nı kabul ediyorum.',
      lcTitle: 'Bilgilendirme',
      lcBody: 'Daily Deen Hub, doğru namaz vakitlerini hesaplamak, kıble yönünü bulmak ve yakındaki camileri göstermek için konumunuzu kullanır.',
      lcNo: 'ŞİMDİ DEĞİL', lcYes: 'KABUL ET'
    },
    fr: {
      brand: 'Daily Deen Hub', greet: 'Assalamou Alaikoum',
      tag: 'Votre compagnon au quotidien',
      langQ: 'Choisissez votre langue', label: 'Français',
      next: 'Continuer', back: '‹', skip: 'Passer', enter: "Entrer dans l'appli",
      p2Title: 'Conçu pour servir, pas pour vendre',
      p2Body: "Daily Deen Hub n'existe que pour une raison : vous aider à trouver les bonnes ressources et les bons outils pour votre adoration quotidienne. Rien de plus.",
      promises: [
        ['🚫', 'Zéro pub — jamais', 'Ni bannières, ni popups, ni contenu sponsorisé.'],
        ['🔓', 'Ni compte, ni connexion', 'Ouvrez l\'appli et ça marche.'],
        ['🔒', 'La vie privée d\'abord', 'Vos réglages et votre position restent sur votre appareil.'],
        ['💚', 'Entièrement gratuit', 'Toutes les fonctionnalités, pour tous, pour toujours.']
      ],
      p3Title: 'Tout pour votre journée',
      p3Body: 'Un compagnon complet pour votre deen quotidien — tout au même endroit.',
      feats: [
        ['🕌', 'Heures de prière', 'Des horaires précis avec de douces alertes, même appli fermée.'],
        ['📖', 'Lecteur de Coran', 'Le Coran complet avec récitation audio et suivi verset par verset.'],
        ['🧭', 'Boussole Qibla', 'Trouvez la direction de la prière où que vous soyez.'],
        ['📿', 'Tasbih et dhikr', 'Compteur, dhikrs quotidiens et les 99 Noms.'],
        ['📚', 'Centre d\'apprentissage', 'Des guides pas à pas pour la vie musulmane au quotidien.'],
        ['🌙', 'Espace Ramadan', 'Suivi du jeûne, jours saints et bien plus.']
      ],
      p4Title: 'Une dernière chose',
      p4Body: "Pour calculer des horaires de prière précis, trouver la direction de la Qibla et localiser les mosquées à proximité, l'appli a besoin de votre position.",
      locBtn: 'TROUVER MA POSITION', locSkip: 'Je réglerai plus tard', locDone: 'Position enregistrée',
      terms: 'J\'accepte les <a href="/fr/terms.html">Conditions d\'utilisation</a> et la <a href="/fr/privacy.html">Politique de confidentialité</a> de l\'application.',
      lcTitle: 'Pour votre information',
      lcBody: 'Daily Deen Hub utilise votre position pour calculer des horaires de prière précis, trouver la direction de la Qibla et localiser les mosquées à proximité.',
      lcNo: 'PAS MAINTENANT', lcYes: 'ACCEPTER'
    }
  };

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function apply(l){
    lang = l;
    lsSet('ddh-lang', l);
    // Write-through: the main app reads ezan-vakti.langPref FIRST, so the
    // welcome choice must land there too — otherwise the app would override
    // the visitor's pick with its own saved preference.
    var s = getSaved();
    s.langPref = l; s.lang = l;
    putSaved(s);
    document.documentElement.lang = l;
    var d = T[l];
    document.getElementById('wGreet').textContent = d.greet;
    document.querySelector('.appname').textContent = d.brand;
    document.getElementById('wTag').textContent = d.tag;
    document.getElementById('wLangQ').textContent = d.langQ;
    document.getElementById('wLangLabel').textContent = d.label;
    document.getElementById('wP2Title').textContent = d.p2Title;
    document.getElementById('wP2Body').textContent = d.p2Body;
    document.getElementById('wP3Title').textContent = d.p3Title;
    document.getElementById('wP3Body').textContent = d.p3Body;
    document.getElementById('wP4Title').textContent = d.p4Title;
    document.getElementById('wP4Body').textContent = d.p4Body;
    document.getElementById('wLocBtn').textContent = d.locBtn;
    document.getElementById('wLocSkip').textContent = d.locSkip;
    document.getElementById('wLocDoneTxt').textContent = d.locDone;
    document.getElementById('wTermsText').innerHTML = d.terms;
    document.getElementById('wLcTitle').textContent = d.lcTitle;
    document.getElementById('wLcBody').textContent = d.lcBody;
    document.getElementById('wLcNo').textContent = d.lcNo;
    document.getElementById('wLcYes').textContent = d.lcYes;
    document.getElementById('wSkip').textContent = d.skip;
    document.getElementById('wBack').textContent = d.back;
    document.getElementById('wPromises').innerHTML = d.promises.map(function(p){
      return '<div class="promise"><span class="em">' + p[0] + '</span><span><div class="pt">' +
        esc(p[1]) + '</div><div class="pd">' + esc(p[2]) + '</div></span></div>';
    }).join('');
    document.getElementById('wFeats').innerHTML = d.feats.map(function(f){
      return '<div class="feat"><span class="em">' + f[0] + '</span><span><div class="pt">' +
        esc(f[1]) + '</div><div class="pd">' + esc(f[2]) + '</div></span></div>';
    }).join('');
    syncNav();
  }

  // ---- screen navigation ----
  var screens = Array.prototype.slice.call(document.querySelectorAll('.screen'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('#wDots span'));
  var idx = 0;
  var nextBtn = document.getElementById('wNext');
  var backBtn = document.getElementById('wBack');
  var skipBtn = document.getElementById('wSkip');

  function show(i){
    idx = Math.max(0, Math.min(screens.length - 1, i));
    screens.forEach(function(s, k){ s.classList.toggle('active', k === idx); });
    dots.forEach(function(dt, k){ dt.classList.toggle('on', k === idx); });
    backBtn.style.visibility = idx === 0 ? 'hidden' : 'visible';
    syncNav();
  }
  function syncNav(){
    var last = idx === screens.length - 1;
    nextBtn.textContent = last ? T[lang].enter : T[lang].next;
    var terms = document.getElementById('wTerms');
    nextBtn.disabled = last && !(terms && terms.checked);
    skipBtn.style.visibility = last ? 'hidden' : 'visible';
  }
  nextBtn.onclick = function(){ if (idx < screens.length - 1) show(idx + 1); else finish(); };
  backBtn.onclick = function(){ show(idx - 1); };
  skipBtn.onclick = function(){ finish(); };
  document.getElementById('wTerms').onchange = syncNav;

  // ---- language menu ----
  var menu = document.getElementById('wLangMenu');
  document.getElementById('wLangBtn').onclick = function(){ menu.classList.add('open'); };
  menu.onclick = function(e){ if (e.target === menu) menu.classList.remove('open'); };
  menu.querySelectorAll('button.opt').forEach(function(b){
    if (b.disabled) return;
    b.onclick = function(){ apply(b.dataset.lang); menu.classList.remove('open'); };
  });

  // ---- location ----
  var locDone = false;
  document.getElementById('wLocBtn').onclick = function(){
    document.getElementById('wLocConsent').classList.add('open');
  };
  document.getElementById('wLocSkip').onclick = function(){
    document.getElementById('wLocBtn').style.display = 'none';
    document.getElementById('wLocSkip').style.display = 'none';
    document.getElementById('wLocDone').classList.add('show');
  };
  document.getElementById('wLcYes').onclick = function(){
    document.getElementById('wLocConsent').classList.remove('open');
    if (navigator.geolocation) {
      var done = false;
      var save = function(ok, lat, lon){
        if (done) return; done = true;
        if (ok) {
          var s = getSaved();
          s.place = {
            name: 'My location', country: '',
            lat: lat, lon: lon,
            tz: (Intl.DateTimeFormat().resolvedOptions().timeZone) || 'UTC'
          };
          putSaved(s);
        }
        markLocDone();
      };
      navigator.geolocation.getCurrentPosition(
        function(pos){ save(true, pos.coords.latitude, pos.coords.longitude); },
        function(){ save(false); },
        { timeout: 8000 });
      setTimeout(function(){ save(false); }, 9000); // don't strand the user
    } else {
      markLocDone();
    }
  };
  document.getElementById('wLcNo').onclick = function(){
    document.getElementById('wLocConsent').classList.remove('open');
  };
  function markLocDone(){
    locDone = true;
    document.getElementById('wLocBtn').style.display = 'none';
    document.getElementById('wLocSkip').style.display = 'none';
    document.getElementById('wLocDone').classList.add('show');
  }

  // ---- finish ----
  var went = false;
  function finish(){
    if (went) return; went = true;
    lsSet('ddh-onboarded', '1');
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        Notification.requestPermission().finally(function(){ location.href = '/'; });
      } catch(e){ location.href = '/'; }
    } else {
      location.href = '/';
    }
  }

  // touch swipe between screens
  var tx0 = null;
  var vp = document.getElementById('wViewport');
  vp.addEventListener('touchstart', function(e){ tx0 = e.touches[0].clientX; }, {passive: true});
  vp.addEventListener('touchend', function(e){
    if (tx0 === null) return;
    var dx = e.changedTouches[0].clientX - tx0; tx0 = null;
    if (Math.abs(dx) > 60) { if (dx < 0) nextBtn.click(); else backBtn.click(); }
  }, {passive: true});

  apply(lang);
  show(0);
})();
