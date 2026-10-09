const CACHE = "ezan-vakti-v23";
const SHELL = ["/", "/index.html", "/tr/", "/tr/index.html", "/styles.css", "/app.js", "/prayer-api.js", "/manifest.json", "/favicon.png", "/audio/adhan-prayer-call.mp3", "/audio/adhan-prayer-call-trimmed.mp3",
  "/audio/alarm.mp3", "/audio/alert-on-mobile.wav", "/audio/bell.wav",
  "/audio/double-car-honk.mp3", "/audio/nikin-short-chick-sound.mp3", "/audio/nostalgia.wav",
  "/about.html", "/terms.html", "/privacy.html", "/tr/about.html", "/tr/terms.html", "/tr/privacy.html"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return res;
  }).catch(() => caches.match(event.request)));
});
