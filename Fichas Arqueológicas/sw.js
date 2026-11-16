// Service Worker — Registro de Excavación Arqueológica V2
// Cache-First strategy for 100% offline field usage

const CACHE_NAME = 'registro-arq-v2-cache-v1';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './Registro_de_Excavacion_V2.html',
  './guia.html',
  './Guia_de_Uso_Aplicacion_V2.html',
  './plates.js',
  './qrcode.min.js',
  './jszip.min.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalación: precachear recursos críticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precacheando recursos para funcionamiento offline...');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => {
        console.warn('[SW] Error en precacheo inicial:', err);
      })
  );
});

// Activación: limpiar cachés obsoletas y reclamar clientes inmediatamente
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => {
          console.log('[SW] Eliminando caché antigua:', name);
          return caches.delete(name);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepción de peticiones (Fetch)
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Ignorar métodos no GET o esquemas de extensiones
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http://') && !request.url.startsWith('https://')) return;

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // En segundo plano, si hay red, refrescar la caché (Stale-While-Revalidate)
        fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Si no está en caché, solicitar a la red
      return fetch(request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Guardar copia en caché para próximas consultas offline
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Fallback offline para navegaciones HTML
        if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html') || caches.match('./Registro_de_Excavacion_V2.html');
        }
      });
    })
  );
});
