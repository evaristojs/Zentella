// Service Worker for Zentella PWA
// Advanced caching strategies for optimal performance

const CACHE_NAME = 'zentella-v1.2.0'
const RUNTIME_CACHE = 'zentella-runtime'
const IMAGE_CACHE = 'zentella-images'
const VIDEO_CACHE = 'zentella-videos'

// Cache duration configurations
const CACHE_DURATIONS = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 days
  images: 7 * 24 * 60 * 60 * 1000,   // 7 days
  videos: 3 * 24 * 60 * 60 * 1000,   // 3 days
  api: 5 * 60 * 1000,                // 5 minutes
  runtime: 24 * 60 * 60 * 1000       // 1 day
}

// Critical assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/isotipo-positivo.svg'
]

// Install event - precache critical assets
self.addEventListener('install', event => {
  console.log('🚀 Service Worker: Installing...')

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Service Worker: Precaching critical assets')
      return cache.addAll(PRECACHE_ASSETS)
    })
    .then(() => {
      console.log('✅ Service Worker: Installation complete')
      return self.skipWaiting()
    })
    .catch(error => {
      console.error('❌ Service Worker: Installation failed', error)
    })
  )
})

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker: Activating...')

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            // Keep current caches
            return ![CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, VIDEO_CACHE].includes(cacheName)
          })
          .map(cacheName => {
            console.log('🗑️ Service Worker: Deleting old cache', cacheName)
            return caches.delete(cacheName)
          })
      )
    })
    .then(() => {
      console.log('✅ Service Worker: Activation complete')
      return self.clients.claim()
    })
  )
})

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and external APIs
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }

  // Route-based caching strategies
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request))
  } else if (isVideoRequest(request)) {
    event.respondWith(handleVideoRequest(request))
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request))
  } else if (isHTMLRequest(request)) {
    event.respondWith(handleHTMLRequest(request))
  } else {
    event.respondWith(handleRuntimeRequest(request))
  }
})

// Image caching with intelligent compression detection
async function handleImageRequest(request) {
  const cacheName = IMAGE_CACHE
  const cache = await caches.open(cacheName)

  try {
    // Try cache first
    const cachedResponse = await cache.match(request)
    if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_DURATIONS.images)) {
      console.log('📸 Cache hit: Image', request.url)
      return cachedResponse
    }

    // Network fallback with optimization
    console.log('📸 Cache miss: Fetching image', request.url)
    const response = await fetch(request)

    if (response.ok) {
      // Clone and cache the response
      const responseClone = response.clone()

      // Add cache metadata
      const headers = new Headers(responseClone.headers)
      headers.set('sw-cached-at', Date.now().toString())

      const cachedResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      })

      cache.put(request, cachedResponse)
      return response
    }

    return response
  } catch (error) {
    console.error('📸 Image request failed', error)
    // Return offline fallback image if available
    return cache.match('/images/offline-placeholder.webp') ||
           new Response('Image unavailable', { status: 404 })
  }
}

// Video caching with range request support
async function handleVideoRequest(request) {
  const cacheName = VIDEO_CACHE
  const cache = await caches.open(cacheName)

  try {
    // For range requests, always go to network
    if (request.headers.get('range')) {
      return fetch(request)
    }

    const cachedResponse = await cache.match(request)
    if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_DURATIONS.videos)) {
      console.log('🎬 Cache hit: Video', request.url)
      return cachedResponse
    }

    console.log('🎬 Cache miss: Fetching video', request.url)
    const response = await fetch(request)

    if (response.ok && response.status === 200) {
      // Only cache complete video responses (not partial)
      const responseClone = response.clone()
      const headers = new Headers(responseClone.headers)
      headers.set('sw-cached-at', Date.now().toString())

      const cachedResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      })

      cache.put(request, cachedResponse)
    }

    return response
  } catch (error) {
    console.error('🎬 Video request failed', error)
    return new Response('Video unavailable', { status: 404 })
  }
}

// Static assets with long-term caching
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      console.log('📦 Cache hit: Static asset', request.url)
      // Update cache in background if expired
      if (isCacheExpired(cachedResponse, CACHE_DURATIONS.static)) {
        fetch(request).then(response => {
          if (response.ok) {
            cache.put(request, response.clone())
          }
        }).catch(() => {})
      }
      return cachedResponse
    }

    console.log('📦 Cache miss: Fetching static asset', request.url)
    const response = await fetch(request)

    if (response.ok) {
      const responseClone = response.clone()
      const headers = new Headers(responseClone.headers)
      headers.set('sw-cached-at', Date.now().toString())

      const cachedResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      })

      cache.put(request, cachedResponse)
    }

    return response
  } catch (error) {
    console.error('📦 Static asset request failed', error)
    return new Response('Asset unavailable', { status: 404 })
  }
}

// HTML requests with network-first strategy
async function handleHTMLRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE)

  try {
    // Always try network first for HTML
    console.log('📄 Fetching HTML from network', request.url)
    const response = await fetch(request)

    if (response.ok) {
      const responseClone = response.clone()
      const headers = new Headers(responseClone.headers)
      headers.set('sw-cached-at', Date.now().toString())

      const cachedResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      })

      cache.put(request, cachedResponse)
      return response
    }
  } catch (error) {
    console.error('📄 Network request failed, trying cache', error)
  }

  // Network failed, try cache
  const cachedResponse = await cache.match(request)
  if (cachedResponse) {
    console.log('📄 Cache hit: HTML fallback', request.url)
    return cachedResponse
  }

  // Both failed, return offline page
  return new Response('Offline - Please check your connection', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' }
  })
}

// Runtime requests with cache-first for performance
async function handleRuntimeRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE)

  try {
    const cachedResponse = await cache.match(request)
    if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_DURATIONS.runtime)) {
      console.log('⚡ Cache hit: Runtime', request.url)
      return cachedResponse
    }

    console.log('⚡ Cache miss: Fetching runtime', request.url)
    const response = await fetch(request)

    if (response.ok) {
      const responseClone = response.clone()
      const headers = new Headers(responseClone.headers)
      headers.set('sw-cached-at', Date.now().toString())

      const cachedResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      })

      cache.put(request, cachedResponse)
    }

    return response
  } catch (error) {
    console.error('⚡ Runtime request failed', error)
    const cachedResponse = await cache.match(request)
    return cachedResponse || new Response('Unavailable', { status: 404 })
  }
}

// Helper functions
function isImageRequest(request) {
  return /\.(jpg|jpeg|png|webp|avif|svg|gif|ico)(\?.*)?$/i.test(request.url)
}

function isVideoRequest(request) {
  return /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/i.test(request.url)
}

function isStaticAsset(request) {
  return /\.(css|js|woff2?|ttf|eot)(\?.*)?$/i.test(request.url)
}

function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html')
}

function isCacheExpired(response, maxAge) {
  const cachedAt = response.headers.get('sw-cached-at')
  if (!cachedAt) return true

  const age = Date.now() - parseInt(cachedAt)
  return age > maxAge
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('🔄 Background sync:', event.tag)

  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync())
  }
})

async function handleBackgroundSync() {
  // Handle queued form submissions, analytics, etc.
  console.log('⚙️ Processing background sync tasks')
}

// Push notifications support
self.addEventListener('push', event => {
  if (!event.data) return

  const data = event.data.json()
  console.log('📲 Push notification received:', data)

  const options = {
    body: data.body,
    icon: '/isotipo-positivo.svg',
    badge: '/isotipo-positivo.svg',
    tag: data.tag || 'default',
    renotify: true,
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || []
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('📲 Notification clicked:', event.notification.tag)

  event.notification.close()

  const urlToOpen = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(clientList => {
      // Try to focus existing window
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus()
        }
      }

      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

console.log('🎉 Zentella Service Worker loaded successfully')