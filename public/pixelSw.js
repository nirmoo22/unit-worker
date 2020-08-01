const urlParamsMapping = {
  interaction: 'event',
  client: 'customer',
  os_name: 'operating_system_name',
  x1: 'utm_source',
  x2: 'utm_medium',
  x3: 'utm_campaign',
  landing_url: 'campaign_url'
}

const handleInstallEvent = (event) => {
  console.log('Installing Service Worker...')
  event.waitUntil(
    caches.open('cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.ico',
        '/stylesheets/style.css',
        '/javascripts/main.js',
      ]);
    }).catch(error => {
      console.log('Failed to set cache on install ', error)
    })
  );
}

const handleActivateEvent = (event) => {
  event.waitUntil(clients.claim());
}

const fetchInterceptor = (event) => {
  if (event.request.url.indexOf('pixel.gif') !== -1) {
    handlePixelRequest(event)
  } else if (event.request.url.indexOf('/javascripts/') !== -1) {
    cacheJsFiles(event);
  }
  else {
    event.respondWith(
      fetch(event.request)
        .catch(() => handleNoNetwork(event))
    );
  }
}

/**
 * Handles all request for /pixel.gif
 * @param {Event} event 
 */
const handlePixelRequest = (event) => {
  event.respondWith(
    new Response(JSON.stringify({
      msg: 'Response from Service Worker :)'
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  );

  let requestUrl = new URL(event.request.url);
  const searchParamsFromPage = new URLSearchParams(requestUrl.search)
  let newSearchParams = {};
  for (const key of Object.keys(urlParamsMapping)) {
    if (urlParamsMapping.hasOwnProperty(key))
      newSearchParams[urlParamsMapping[key]] = searchParamsFromPage.get(key)
  }
  requestUrl.search = new URLSearchParams(newSearchParams).toString();
  fetch(requestUrl)
}

/**
 * Caches all the JS files which are requested by the module loader
 * @param {Event} event 
 */
const cacheJsFiles = (event) => {
  event.respondWith(
    caches.open('cache-v1')
      .then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => handleNoNetwork(event))
      })
      .catch(err => console.log('Could not open cache'))
  );
}

const handleNoNetwork = (event) => {
  return caches.match(event.request);
}


// add events:
self.addEventListener('install', handleInstallEvent);
self.addEventListener('activate', handleActivateEvent);
self.addEventListener('fetch', fetchInterceptor);
