// Service Worker para Limpieza OKEY PWA
const CACHE_NAME = 'okey-pwa-v1'

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/recibo-template.jpg',
  '/favicon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png'
]

// Instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Error precaching assets:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activación
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Estrategia Network-First con fallback a Caché
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  // Ignorar peticiones que no sean http/https (e.g. extensiones)
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Guardar copia en caché si es válida
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return networkResponse
      })
      .catch(async () => {
        // Si no hay red, servir desde caché
        const cachedResponse = await caches.match(event.request)
        if (cachedResponse) return cachedResponse
        // Si es navegación HTML, retornar index.html
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html')
        }
      })
  )
})
