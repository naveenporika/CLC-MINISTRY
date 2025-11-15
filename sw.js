const CACHE_NAME = 'clc-ministry-cache-v1';
// This list includes essential files for the app shell to load quickly.
const URLS_TO_CACHE = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;700&family=Poppins:wght@400;600;700&display=swap',
  'https://res.cloudinary.com/akinaveen/image/upload/v1740417783/church_logo_ezcira.jpg',
  'https://res.cloudinary.com/akinaveen/image/upload/v1718153469/clc_gfqsdg.jpg'
];

// Install event: open cache and add app shell files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch event: serve from cache first (for offline), then network.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response. We don't cache non-GET requests.
            if (!response || response.status !== 200 || event.request.method !== 'GET') {
              return response;
            }
            
            // Check if the response is from a CDN we trust to cache
            const isCorsResponse = response.type === 'cors';
            const isOpaqueResponse = response.type === 'opaque'; // e.g. from Google Fonts, no-cors request

            // Only cache basic, cors, and opaque responses
            if(response.type === 'basic' || isCorsResponse || isOpaqueResponse) {
                // IMPORTANT: Clone the response. A response is a stream
                // and can only be consumed once. We need to clone it
                // so both the browser and the cache can consume it.
                const responseToCache = response.clone();

                caches.open(CACHE_NAME)
                .then((cache) => {
                    cache.put(event.request, responseToCache);
                });
            }

            return response;
          }
        );
      })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});