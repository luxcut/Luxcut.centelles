// BarberOS — Service Worker v1
// Sube este archivo junto a index.html en GitHub para activar el modo offline

const CACHE = 'barberos-v1';
const ASSETS = ['./', './index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const rc = r.clone(); caches.open(CACHE).then(c => c.put(e.request, rc)); return r; }).catch(() => caches.match(e.request)));
});
