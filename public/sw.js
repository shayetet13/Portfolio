const CACHE_NAME = "portfolio-v1";
const STATIC_CACHE_URLS = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/css/main.css",
];

// Install event - cache essential files only
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        // Only cache the main page for now
        return cache.add("/").catch(() => {
          // Fail silently if can't cache
          console.log("Could not cache main page");
        });
      })
      .catch((error) => {
        console.log("Cache install failed:", error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  if (event.request.destination === "document") {
    event.respondWith(
      caches
        .match("/")
        .then((response) => {
          return response || fetch(event.request);
        })
        .catch(() => {
          return fetch(event.request);
        })
    );
  }
});
