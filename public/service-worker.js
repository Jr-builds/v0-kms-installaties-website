/* Legacy Vue/PWA service worker kill-switch for kmsinstallaties.nl */
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(Promise.resolve())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => caches.delete(key)))
      } catch (_) {
        // ignore
      }
      await self.registration.unregister()
    })(),
  )
})
