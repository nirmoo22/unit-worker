self.addEventListener('install', (event) => {
  console.log('Installing Service Worker...')
  event.waitUntil(
    caches.open('cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/stylesheets/style.css',
        '/javascripts/main.js',
      ]);
    }).catch(error => {
      console.log('Failed to set cache on install ', error)
    })
  );
});