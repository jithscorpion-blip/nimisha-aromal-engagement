/* Self-destructing service worker: unregisters itself and clears old caches
   so all guests always receive the latest version of the invitation. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then(clients => clients.forEach(c => c.navigate(c.url)))
  );
});
