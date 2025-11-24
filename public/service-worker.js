const CACHE_NAME = 'answerforme-cache-v1';
const OFFLINE_URL = 'offline.html';

// Core assets to precache (index.html will be updated post-install fetch)
const PRECACHE_ASSETS = [
  OFFLINE_URL,
  'manifest.webmanifest',
  'assets/a4m-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_ASSETS);
      try {
        const indexResponse = await fetch('index.html');
        if (indexResponse.ok) {
          await cache.put('index.html', indexResponse.clone());
        }
      } catch (e) {
        // ignore network errors during install
      }
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
      clients.claim();
    })()
  );
});

// Navigation requests: network-first; offline: serve cached index if available, else offline page
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    // Update cached index.html for root path navigations (scope trailing slash)
    if (request.mode === 'navigate') {
      // Normalize: store only one key for index
      const cache = await caches.open(CACHE_NAME);
      // If the URL points to the scope root or explicitly index.html, refresh cached index
      if (request.url.endsWith('/') || /index\.html$/.test(request.url)) {
        // Attempt to find real index resource; if server served a directory, we still cache response
        cache.put('index.html', networkResponse.clone());
      }
    }
    return networkResponse;
  } catch (err) {
    const cache = await caches.open(CACHE_NAME);
    // Prefer showing last cached app shell (index.html) when offline
    const cachedIndex = await cache.match('index.html');
    if (cachedIndex) return cachedIndex;
    const offline = await cache.match(OFFLINE_URL);
    return offline || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }
}

// Static asset requests: cache-first then network
async function handleAssetRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const network = await fetch(request);
    if (network.ok) {
      cache.put(request, network.clone());
    }
    return network;
  } catch (e) {
    return cached || Promise.reject(e);
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return; // only cache GET
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }
  // For other assets (js, css, images)
  event.respondWith(handleAssetRequest(request));
});
