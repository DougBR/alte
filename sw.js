const CACHE_NAME = "velha-v10";
const urlsToCache = [
  "/alte/",
  "/alte/index.html",
  "/alte/manifest.json",
  "/alte/asset-manifest.json",
  "/alte/favicon.ico",
  "/alte/favicon.png",
  "/alte/favicon-96x96.png",
  "/alte/web-app-manifest-192x192.png",
  "/alte/web-app-manifest-512x512.png",
  "/alte/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        return caches.match("/alte/index.html");
      });
    })
  );
});
