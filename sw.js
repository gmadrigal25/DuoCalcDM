// Offline cache. Network first: when there's a connection the app always loads the newest
// version (and refreshes the cache); with no signal it opens from the cache instead.
const CACHE = 'duocalc-v9';
const FILES = ['./', './index.html', './style.css', './engine.js', './app.js', './manifest.webmanifest', './icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      try {
        const res = await fetch(e.request, { cache: 'no-store' });
        if (res && res.ok) cache.put(e.request, res.clone());
        return res;
      } catch (err) {
        return (await cache.match(e.request, { ignoreSearch: true })) || Response.error();
      }
    }),
  );
});
