const CACHE_NAME = "dayfinder-v2-2026-09-12";
const APP_FILES = [
  "./", "./index.html", "./styles.css", "./app.js", "./date-core.js", "./icon.svg", "./manifest.webmanifest",
  "./weekday-finder.html", "./age-calculator.html", "./date-difference.html", "./working-days.html",
  "./date-add-subtract.html", "./weekday-in-month.html", "./countdown.html", "./week-number.html",
  "./leap-year.html", "./monthly-calendar.html", "./guides.html", "./faq.html", "./about.html", "./privacy.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    }
    return response;
  })));
});
