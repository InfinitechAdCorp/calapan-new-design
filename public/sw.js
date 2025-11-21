const CACHE_NAME = "calapan-city-v1"
const RUNTIME_CACHE = "calapan-city-runtime"

// Assets to cache on install
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/icon-maskable-192x192.png",
  "/icon-maskable-512x512.png",
  "/logo.png"
]

// Install event - cache essential assets
self.addEventListener("install", (event) => {
  console.log("✅ Service Worker installing...")
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Opened cache")
        return cache.addAll(urlsToCache).catch(err => {
          console.error("❌ Failed to cache:", err)
          // Don't fail installation if some assets fail
          return Promise.resolve()
        })
      })
      .then(() => {
        console.log("⏭️ Skipping waiting...")
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("🔄 Service Worker activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log("🗑️ Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log("✅ Service Worker activated, claiming clients...")
      return self.clients.claim()
    })
  )
})

// Fetch event - Network First, fallback to Cache
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // Skip API calls and authentication
  if (url.pathname.startsWith('/api/') || url.pathname.includes('/login')) {
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Check if valid response
        if (!response || response.status !== 200) {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()

        // Cache the fetched response for runtime (only for GET requests)
        if (request.method === 'GET') {
          caches.open(RUNTIME_CACHE)
            .then((cache) => {
              cache.put(request, responseToCache)
            })
            .catch(err => console.warn("Cache put failed:", err))
        }

        return response
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request)
          .then(cachedResponse => {
            if (cachedResponse) {
              console.log("📦 Serving from cache:", request.url)
              return cachedResponse
            }
            
            // Return offline fallback for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/')
            }
            
            return new Response('Network error', {
              status: 408,
              statusText: 'Network timeout'
            })
          })
      })
  )
})

// Listen for messages from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("⏭️ Received SKIP_WAITING message")
    self.skipWaiting()
  }
})