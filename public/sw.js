
const CACHE_NAME = 'goinft-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/pages/Index.tsx',
  '/lovable-uploads/48f299fc-e84b-45a2-94c9-a2654f4dffa6.png'
];

const DYNAMIC_CACHE_URLS = [
  /^https:\/\/images\.unsplash\.com\//,
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache strategy for different resource types
  if (request.method === 'GET') {
    // Images - cache first, then network
    if (request.destination === 'image') {
      event.respondWith(
        caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            
            return fetch(request)
              .then((response) => {
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(request, responseClone));
                }
                return response;
              });
          })
      );
      return;
    }

    // JavaScript/CSS - network first, cache fallback
    if (request.destination === 'script' || request.destination === 'style') {
      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, responseClone));
            }
            return response;
          })
          .catch(() => caches.match(request))
      );
      return;
    }

    // Documents - network first
    if (request.destination === 'document') {
      event.respondWith(
        fetch(request)
          .catch(() => caches.match('/'))
      );
      return;
    }

    // External resources (fonts, APIs)
    const isDynamicResource = DYNAMIC_CACHE_URLS.some(pattern => 
      pattern.test ? pattern.test(url.href) : url.href.includes(pattern)
    );

    if (isDynamicResource) {
      event.respondWith(
        caches.match(request)
          .then((cachedResponse) => {
            const fetchPromise = fetch(request)
              .then((response) => {
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(request, responseClone));
                }
                return response;
              });

            return cachedResponse || fetchPromise;
          })
      );
    }
  }
});
