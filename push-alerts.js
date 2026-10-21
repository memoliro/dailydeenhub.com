/* push-alerts.js — Web Push prayer alerts (works when tab is closed).
   One-time opt-in: user enables -> browser permission -> subscription stored
   in the Cloudflare Worker with their prayer settings. No account needed. */
(function () {
'use strict';

// Filled in after worker deploy:
var PUSH_API = 'https://dailydeenhub-push.memoliro.workers.dev';

function $(id) { return document.getElementById(id); }

function supported() {
  return ('serviceWorker' in navigator) && ('PushManager' in window) && ('Notification' in window);
}

function b64ToBytes(b64) {
  b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  var bin = atob(b64);
  var b = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
  return b;
}

async function getReg() {
  if (!supported()) return null;
  try { return await navigator.serviceWorker.ready; }
  catch (e) { return null; }
}

async function currentSub() {
  var reg = await getReg();
  if (!reg || !reg.pushManager) return null;
  try { return await reg.pushManager.getSubscription(); }
  catch (e) { return null; }
}

/* Refresh the toggle UI to match actual subscription state. */
async function refreshUI() {
  var chk = $('pushChk');
  var note = $('pushNote');
  if (!chk) return;
  if (!supported()) {
    chk.disabled = true;
    if (note) note.textContent = t('pushUnsupported');
    return;
  }
  var sub = await currentSub();
  chk.checked = !!sub;
  if (note) note.textContent = sub ? t('pushOn') : t('pushOff');
  refreshInstallHint();
}

/* ---- Install prompt: show only when the app is NOT installed ---- */
var deferredPrompt = null;

function isInstalled() {
  return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
         (window.navigator && window.navigator.standalone === true);
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent || '');
}

function refreshInstallHint() {
  var row = $('installRow'), hint = $('installHint'), btn = $('installBtn');
  // Settings menu row mirrors the block: visible only when this device has
  // not installed the app AND installing is possible (prompt or iOS steps).
  var mrow = $('installMenuRow');
  if (mrow) mrow.classList.toggle('hidden', isInstalled() || (!deferredPrompt && !isIOS()));
  if (!row) return;
  if (isInstalled()) { row.classList.add('hidden'); row.classList.remove('ios-install-box'); return; }
  if (deferredPrompt) {
    // Android/Chrome: show hint + Install button
    if (hint) hint.textContent = t('installHint');
    if (btn) { btn.textContent = t('installBtn'); btn.classList.remove('hidden'); }
    row.classList.remove('hidden');
    row.classList.remove('ios-install-box');
  } else if (isIOS()) {
    // iPhone/iPad: no install prompt API — show prominent manual steps
    // (iOS web push requires the PWA on the home screen)
    if (hint) { hint.innerHTML = t('installIOS'); }
    if (btn) btn.classList.add('hidden');
    row.classList.remove('hidden');
    row.classList.add('ios-install-box');
  } else {
    row.classList.add('hidden');
    row.classList.remove('ios-install-box');
  }
}

async function doInstall() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  try { await deferredPrompt.userChoice; } catch (e) {}
  deferredPrompt = null;
  refreshInstallHint();
}

window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  deferredPrompt = e;
  refreshInstallHint();
});
window.addEventListener('appinstalled', function () {
  deferredPrompt = null;
  refreshInstallHint();
  hideInstallPopup(true);
});


/* ---- Install popup on page load (not only in Settings) ---- */
function hideInstallPopup(remember) {
  var pop = $('installPopup');
  if (pop) pop.classList.add('hidden');
  if (remember) { try { localStorage.setItem('ddh_install_popup', String(Date.now())); } catch (e) {} }
}
function maybeShowInstallPopup() {
  if (isInstalled()) return;
  try {
    var last = localStorage.getItem('ddh_install_popup');
    if (last && Date.now() - (+last) < 7 * 24 * 3600 * 1000) return; // at most once a week
  } catch (e) {}
  // give beforeinstallprompt a moment to fire
  setTimeout(function () {
    if (isInstalled()) return;
    if (!deferredPrompt && !isIOS()) return; // nothing useful to offer
    var pop = $('installPopup');
    if (!pop || !pop.classList.contains('hidden')) return;
    var btn = $('installPopBtn'), ios = $('installPopIOS');
    if (isIOS() && !deferredPrompt) {
      if (btn) btn.classList.add('hidden');
      if (ios) { ios.innerHTML = t('installIOS'); ios.classList.remove('hidden'); }
    } else {
      if (btn) { btn.textContent = t('installBtn'); btn.classList.remove('hidden'); }
    }
    var later = $('installPopLater');
    if (later) later.textContent = t('installPopLater');
    var title = pop.querySelector('[data-i="installPopTitle"]');
    if (title) title.textContent = t('installPopTitle');
    var body = pop.querySelector('[data-i="installPopBody"]');
    if (body) body.textContent = t('installPopBody');
    pop.classList.remove('hidden');
  }, 2500);
}

/* Build the settings payload the worker needs. */
function settingsPayload() {
  // state is the app's global settings object (app.js)
  var st = (typeof state !== 'undefined') ? state : {};
  var place = st.place || {};
  return {
    lat: place.lat, lon: place.lon, tz: place.tz || 'America/Toronto',
    method: st.method != null ? st.method : 2,
    madhab: st.school != null ? st.school : 0,
    remind: (function() {
      var rm = st.remind || { Fajr: 15, Dhuhr: 15, Asr: 15, Maghrib: 15, Isha: 15 };
      var on = st.remindOn || {};
      var out = {};
      Object.keys(rm).forEach(function(k) { if (on[k] !== false) out[k] = rm[k]; });
      // Extra reminders ride the same payload as x:<key> so the worker needs no schema change.
      var nx = (typeof normalizeExtra === 'function') ? normalizeExtra(st.extraRemind) : (st.extraRemind || {});
      if (nx.sahur && nx.sahur.on) out['x:sahur'] = +nx.sahur.mins || 90;
      if (nx.tahajjud && nx.tahajjud.on) out['x:tahajjud'] = +nx.tahajjud.mins || 120;
      if (nx.fast && nx.fast.on) { out['x:fast'] = +nx.fast.mins || 60; if (nx.fast.eve) out['x:fastEve'] = 1; }
      if (nx.jumuah && nx.jumuah.on) out['x:jumuah'] = +nx.jumuah.mins || 60;
      return out;
    })(),
    lang: st.lang || 'en',
  };
}

async function enable() {
  var note = $('pushNote');
  var step = 'start';
  try {
    if (Notification.permission === 'denied') {
      if (note) note.textContent = t('pushBlocked');
      $('pushChk').checked = false;
      return;
    }
    step = 'permission';
    var perm = await Notification.requestPermission();
    if (perm !== 'granted') {
      if (note) note.textContent = t('pushOff');
      $('pushChk').checked = false;
      return;
    }
    step = 'sw-reg';
    var reg = await getReg();
    if (!reg) throw new Error('no sw');
    // Clear any stale subscription (e.g. from a previous VAPID key) before subscribing
    step = 'unsubscribe-old';
    try {
      var oldSub = await reg.pushManager.getSubscription();
      if (oldSub) await oldSub.unsubscribe();
    } catch (e) {}
    // VAPID public key from worker
    step = 'vapid-key';
    var kr = await fetch(PUSH_API + '/api/vapid-key');
    var kj = await kr.json();
    step = 'subscribe';
    var sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: b64ToBytes(kj.key),
    });
    var sj = sub.toJSON();
    step = 'server-subscribe';
    var res = await fetch(PUSH_API + '/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription: { endpoint: sj.endpoint, keys: sj.keys },
        settings: settingsPayload(),
      }),
    });
    if (!res.ok) throw new Error('subscribe ' + res.status);
    setLastSynced(JSON.stringify(settingsPayload()));
    try { localStorage.setItem('ddh-push', '1'); localStorage.removeItem('ddh-push-off'); } catch (e) {}
    if (note) note.textContent = t('pushOn');
    toast(t('pushEnabled'));
  } catch (e) {
    var msg = t('pushError') + ' (' + step + ': ' + (e && e.message ? e.message : e) + ')';
    if (note) note.textContent = msg;
    var c = $('pushChk'); if (c) c.checked = false;
  }
}

async function disable() {
  var note = $('pushNote');
  try {
    var sub = await currentSub();
    if (sub) {
      var endpoint = sub.endpoint;
      try { await sub.unsubscribe(); } catch (e) {}
      await fetch(PUSH_API + '/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: endpoint }),
      }).catch(function () {});
    }
    try { localStorage.removeItem('ddh-push'); localStorage.setItem('ddh-push-off', '1'); } catch (e) {}
    if (note) note.textContent = t('pushOff');
  } catch (e) {
    if (note) note.textContent = t('pushError');
  }
}

/* Re-sync settings when the user changes location/method/reminders while subscribed.
   save() fires on EVERY state change (even tasbih taps), so: debounce, and skip when the
   payload the server cares about hasn't actually changed. */
var lastSynced = '';
try { lastSynced = localStorage.getItem('ddh-push-synced') || ''; } catch (e) {}
function setLastSynced(p) {
  lastSynced = p;
  try {
    localStorage.setItem('ddh-push-synced', p);
    // If the write didn't stick (e.g. storage quota), don't trust it:
    // drop the stored value so the next app open re-syncs for real.
    if (localStorage.getItem('ddh-push-synced') !== p) throw new Error('verify failed');
  } catch (e) {
    try { localStorage.removeItem('ddh-push-synced'); } catch (e2) {}
  }
}
var syncTimer = 0;
function resync() {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(doResync, 1500);
}
async function doResync() {
  var sub = await currentSub();
  if (!sub) return;
  // VAPID key heal (2026-10-21): if the server rotated its VAPID key, an old
  // subscription can never receive again — Apple rejects every send with
  // VapidPkHashMismatch while the app still shows alerts "on". Detect the
  // mismatch here (every boot + settings change funnels through doResync)
  // and replace the subscription wholesale.
  try {
    var kr = await fetch(PUSH_API + '/api/vapid-key');
    var kj = await kr.json();
    if (kj && kj.key) {
      var want = b64ToBytes(kj.key);
      var have = sub.options && sub.options.applicationServerKey
        ? new Uint8Array(sub.options.applicationServerKey) : null;
      var match = have && have.length === want.length &&
        have.every(function (b, i) { return b === want[i]; });
      if (!match) {
        var oldEndpoint = sub.endpoint;
        try { await sub.unsubscribe(); } catch (e) {}
        try {
          await fetch(PUSH_API + '/api/unsubscribe', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: oldEndpoint }),
          });
        } catch (e) {}
        var reg2 = await getReg();
        sub = await reg2.pushManager.subscribe({
          userVisibleOnly: true, applicationServerKey: want,
        });
        try { localStorage.removeItem('ddh-push-synced'); } catch (e) {}
      }
    }
  } catch (e) { /* heal is best-effort; the normal sync below still runs */ }
  var payload = JSON.stringify(settingsPayload());
  if (payload === lastSynced) return;
  try {
    var sj = sub.toJSON();
    var res = await fetch(PUSH_API + '/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription: { endpoint: sj.endpoint, keys: sj.keys },
        settings: settingsPayload(),
      }),
    });
    if (res.ok) setLastSynced(payload);
  } catch (e) {}
}

function boot() {
  var chk = $('pushChk');
  if (!chk) return;
  chk.addEventListener('change', function () {
    if (chk.checked) enable(); else disable();
  });
  var ibtn = $('installBtn');
  if (ibtn) ibtn.addEventListener('click', doInstall);
  var mrow = $('installMenuRow');
  if (mrow) mrow.addEventListener('click', function () {
    if (deferredPrompt) { doInstall(); return; }
    // iOS: the steps live on the Reminders page — go there and show them.
    try { setShow('remind'); } catch (e) {}
    setTimeout(function () { var r = $('installRow'); if (r) r.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 90);
  });
  var popBtn = $('installPopBtn');
  if (popBtn) popBtn.addEventListener('click', function () { doInstall(); hideInstallPopup(true); });
  var popLater = $('installPopLater');
  if (popLater) popLater.addEventListener('click', function () { hideInstallPopup(true); });
  refreshUI();
  // Self-heal: if a settings sync was ever missed (failed POST, killed tab),
  // re-send the current payload once per app open. doResync skips when unchanged.
  resync();
  maybeShowInstallPopup();
  try {
    if (supported() && !localStorage.getItem('ddh-push') && !localStorage.getItem('ddh-push-off') && !localStorage.getItem('ddh-push-asked')) {
      var armDefault = function (e) {
        if (e.target && e.target.closest && e.target.closest('#pushChk')) return; // the toggle's own change handler runs enable/disable
        document.removeEventListener('pointerdown', armDefault, true);
        try { localStorage.setItem('ddh-push-asked', '1'); } catch (err) {}
        currentSub().then(function (sub) { if (!sub) enable(); });
      };
      document.addEventListener('pointerdown', armDefault, true);
    }
  } catch (e) {}
  // expose for app.js to call after settings change
  window.DDHPush = { refresh: refreshUI, resync: resync };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
})();
