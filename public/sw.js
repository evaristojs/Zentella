const CACHE_NAME = 'zentella-v2';
const STATIC_CACHE_URLS = [
  '/',
  '/logo-modo-claro.svg',
  '/logo-modo-oscuro.svg',
  '/isotipo-modo-claro.svg',
  '/isotipo-modo-oscuro.svg',
  '/starfield.js',
  '/theme-init.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle same-origin requests and specific file types
  if (url.origin !== location.origin) {
    return;
  }
  
  // Cache strategy for static assets only
  if (url.pathname.endsWith('.svg') || 
      url.pathname.endsWith('.js') || 
      url.pathname === '/') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          });
        })
    );
  }
});