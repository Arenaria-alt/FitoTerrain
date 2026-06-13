/* FitoTerrain — service worker: offline app shell + map tile cache */
const APP_CACHE = 'ft-app-v1';
const TILE_CACHE = 'ft-tiles';
const APP_ASSETS = [
  './',
  './index.html',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(APP_CACHE).then(c => Promise.all(APP_ASSETS.map(u => c.add(u).catch(() => {})))));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== APP_CACHE && k !== TILE_CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

function isTile(u) {
  return u.indexOf('tile.openstreetmap.org') >= 0 ||
         u.indexOf('server.arcgisonline.com') >= 0 ||
         u.indexOf('api.mapbox.com') >= 0;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;

  // Map tiles: cache-first. Only tiles saved by the in-app downloader live here;
  // online panning is NOT auto-cached (keeps storage under user control).
  if (isTile(url)) {
    e.respondWith((async () => {
      const c = await caches.open(TILE_CACHE);
      const hit = await c.match(req);
      if (hit) return hit;
      try { return await fetch(req); }
      catch (err) { return hit || new Response('', { status: 504 }); }
    })());
    return;
  }

  // App shell: network-first (so updates propagate online), fall back to cache offline.
  e.respondWith((async () => {
    try {
      const resp = await fetch(req);
      if (resp && resp.ok && (url.startsWith(self.location.origin) || url.indexOf('unpkg.com/leaflet') >= 0)) {
        const c = await caches.open(APP_CACHE);
        c.put(req, resp.clone());
      }
      return resp;
    } catch (err) {
      const hit = await caches.match(req);
      if (hit) return hit;
      if (req.mode === 'navigate') {
        const idx = await caches.match('./index.html') || await caches.match('./');
        if (idx) return idx;
      }
      return new Response('Offline', { status: 503 });
    }
  })());
});
