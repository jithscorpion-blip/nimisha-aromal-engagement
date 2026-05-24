const CACHE = "engagement-v1";
const FILES = ["index.html","admin.html","styles.css","app.js","manifest.json","assets/venue1.jpg","assets/venue2.jpg","assets/couple.jpg","assets/bride.jpg","assets/groom.jpg","assets/family.jpg"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
