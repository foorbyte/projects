self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
});
  self.addEventListener('active', function () {
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(r) {
        console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });
  
  var precacheUrls = [];
  
    precacheUrls.push('/');
  
    precacheUrls.push('/css/style.css');
  
    precacheUrls.push('/2019/06/03/Mettre-en-place-un-blog-Serverless-sur-AWS-avec-integration-continue/');
  
    precacheUrls.push('/2019/06/02/A-bit-of-music/');
  
    precacheUrls.push('/2019/06/01/First-Post/');
  
  toolbox.precache(precacheUrls);
  toolbox.options = {"networkTimeoutSeconds":5};
  
  
  toolbox.router.any(/.*\.(js|css|jpg|jpeg|png|gif)$/, toolbox.cacheFirst);
  
  toolbox.router.any(/\//, toolbox.networkFirst);