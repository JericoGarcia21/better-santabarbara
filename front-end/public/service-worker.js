const CACHE_VERSION = 'better-santa-barbara-v1';
const APP_SHELL = [
  '/',
  '/manifest.webmanifest',
  '/pwa-icon-192.png',
  '/pwa-icon-512.png',
  '/Logo/sta-barbara-seal.png',
  '/locales/en/common.json',
  '/locales/fil/common.json',
  '/locales/pag/common.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_VERSION)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches
            .open(CACHE_VERSION)
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() =>
          caches
            .match(event.request)
            .then(cached => cached || caches.match('/'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;

        const responseClone = response.clone();
        caches
          .open(CACHE_VERSION)
          .then(cache => cache.put(event.request, responseClone));
        return response;
      });
    })
  );
});
