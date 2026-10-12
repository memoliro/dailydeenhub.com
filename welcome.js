(function(){
  function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function lsSet(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  var lang = lsGet('ddh-lang') || 'en';
  var T = {
    en: {
      brand: 'Daily Deen Hub', greet: 'Assalamu Alaikum',
      tag: 'Your companion for everyday life',
      cta: 'FIND MY LOCATION',
      terms: 'I agree to the <a href="/terms.html">Terms of Use</a> and the <a href="/privacy.html">Privacy Policy</a> of the Application.',
      label: 'English',
      lcTitle: 'For your information',
      lcBody: 'Daily Deen Hub uses your location to calculate accurate prayer times, find the Qibla direction, and locate nearby mosques.',
      lcNo: 'NOT NOW',
      lcYes: 'AGREE',
      privTitle: '🔒 Your privacy comes first',
      privBody: 'We do not collect your personal information. Daily Deen Hub is completely free — no sign-in, no account, nothing to pay. Your settings and location stay on your device, where they belong.'
    },
    tr: {
      brand: 'Günlük Din Merkezi', greet: 'Esselamu Aleykum',
      tag: 'Günlük hayatınızda yol arkadaşınız',
      cta: 'KONUMUMU BUL',
      terms: 'Uygulamanın <a href="/tr/terms.html">Kullanım Şartları</a> ve <a href="/tr/privacy.html">Gizlilik Politikası</a>\'nı kabul ediyorum.',
      label: 'Türkçe',
      lcTitle: 'Bilgilendirme',
      lcBody: 'Günlük Din Merkezi, doğru namaz vakitlerini hesaplamak, kıble yönünü bulmak ve yakındaki camileri göstermek için konumunuzu kullanır.',
      lcNo: 'ŞİMDİ DEĞİL',
      lcYes: 'KABUL ET',
      privTitle: '🔒 Gizliliğiniz önceliğimizdir',
      privBody: 'Kişisel bilgilerinizi toplamıyoruz. Günlük Din Merkezi tamamen ücretsizdir — giriş yok, hesap yok, ödeme yok. Ayarlarınız ve konumunuz cihazınızda kalır.'
    }
  };
  function apply(l){
    lang = l;
    lsSet('ddh-lang', l);
    document.documentElement.lang = l;
    var appNameEl = document.querySelector('.appname'); if (appNameEl) appNameEl.textContent = T[l].brand;
    document.getElementById('wGreet').textContent = T[l].greet;
    document.getElementById('wTag').textContent = T[l].tag;
    document.getElementById('wCta').textContent = T[l].cta;
    document.getElementById('wTermsText').innerHTML = T[l].terms;
    document.getElementById('wLangLabel').textContent = T[l].label;
    document.getElementById('wLcTitle').textContent = T[l].lcTitle;
    document.getElementById('wLcBody').textContent = T[l].lcBody;
    document.getElementById('wLcNo').textContent = T[l].lcNo;
    document.getElementById('wLcYes').textContent = T[l].lcYes;
    document.getElementById('wPrivTitle').textContent = T[l].privTitle;
    document.getElementById('wPrivBody').textContent = T[l].privBody;
  }
  apply(lang);

  var menu = document.getElementById('wLangMenu');
  document.getElementById('wLangBtn').onclick = function(){ menu.classList.add('open'); };
  menu.onclick = function(e){ if (e.target === menu) menu.classList.remove('open'); };
  menu.querySelectorAll('button').forEach(function(b){
    b.onclick = function(){ apply(b.dataset.lang); menu.classList.remove('open'); };
  });

  var terms = document.getElementById('wTerms');
  var cta = document.getElementById('wCta');
  terms.onchange = function(){ cta.disabled = !terms.checked; };

  cta.onclick = function(){
    // Save onboarding completion first
    lsSet('ddh-onboarded', '1');
    // Show the location consent dialog (short version)
    document.getElementById('wLocConsent').classList.add('open');
  };
  document.getElementById('wLcYes').onclick = function(){
    document.getElementById('wLocConsent').classList.remove('open');
    // Ask for geolocation (non-blocking — main app handles fallback)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(){ goNext(); }, function(){ goNext(); }, { timeout: 8000 });
      setTimeout(goNext, 9000); // don't strand the user
    } else {
      goNext();
    }
  };
  document.getElementById('wLcNo').onclick = function(){
    document.getElementById('wLocConsent').classList.remove('open');
    goNext(); // skip location — user can set it manually later
  };
  var went = false;
  function goNext(){
    if (went) return; went = true;
    // Notification permission comes next (page 2 of onboarding)
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().finally(function(){
        location.href = '/';
      });
    } else {
      location.href = '/';
    }
  }
})();