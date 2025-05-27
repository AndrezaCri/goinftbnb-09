
const CACHE_NAME = 'goinft-desktop-v2';
const STATIC_CACHE_URLS = [
  '/',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/pages/Index.tsx',
  '/src/components/layout/Navbar.tsx',
  '/src/components/sections/Hero.tsx',
  '/lovable-uploads/48f299fc-e84b-45a2-94c9-a2654f4dffa6.png'
];

const DYNAMIC_CACHE_URLS = [
  /^https:\/\/images\.unsplash\.com\//,
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//,
  /^https:\/\/cdn\.gpteng\.co\//
];

// Enhanced install event with preloading critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_CACHE_URLS)),
      self.skipWaiting()
    ])
  );
});

// Enhanced activate event with aggressive cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      }),
      self.clients.claim()
    ])
  );
});

// Advanced fetch strategy with desktop-optimized caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Desktop-optimized cache strategies
  if (request.destination === 'image') {
    // Images - aggressive caching with stale-while-revalidate for desktop
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
          // Background update for desktop users
          fetch(request).then((response) => {
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
          }).catch(() => {});
          
          return cachedResponse;
        }
        
        try {
          const response = await fetch(request);
          if (response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          // Return offline placeholder for images
          return new Response(
            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#333"/><text x="50%" y="50%" text-anchor="middle" fill="#666">Offline</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      })
    );
    return;
  }

  // JavaScript/CSS - network first with extended cache for desktop
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          throw new Error('Resource not available offline');
        })
    );
    return;
  }

  // Documents - enhanced caching for desktop SPA
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match('/');
          return cachedResponse || new Response('Offline', { status: 503 });
        })
    );
    return;
  }

  // External resources with enhanced desktop caching
  const isDynamicResource = DYNAMIC_CACHE_URLS.some(pattern => 
    pattern.test ? pattern.test(url.href) : url.href.includes(pattern)
  );

  if (isDynamicResource) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            if (cachedResponse) {
              return cachedResponse;
            }
            throw new Error('Network error and no cache available');
          });

        // Return cached version immediately if available, then update in background
        if (cachedResponse) {
          fetchPromise.catch(() => {}); // Silent background update
          return cachedResponse;
        }
        
        return fetchPromise;
      })
    );
  }
});

// Enhanced message handling for desktop optimization
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Background sync for desktop users
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background operations like cache updates
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.all(
          STATIC_CACHE_URLS.map((url) => 
            fetch(url).then((response) => {
              if (response.status === 200) {
                return cache.put(url, response);
              }
            }).catch(() => {})
          )
        );
      })
    );
  }
});
