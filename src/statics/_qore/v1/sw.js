const DQ_CACHE_ID = '1702710675342',
  DQ_CACHE_CONTENT = [ // TODO: git pre-commit hook to flag this if not all pages accounted for?
    
  ]

self.addEventListener('activate', async function (event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  const expectedCacheNamesSet = new Set([DQ_CACHE_ID])

  let cacheExists = false
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      cacheExists = cacheNames.length
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (!expectedCacheNamesSet.has(cacheName)) {
            cacheExists = false
            // If this cache name isn't present in the set of "expected" cache names, then delete it.
            // console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
      .then(async o => {
        if (!cacheExists) {
          const cache = await caches.open(DQ_CACHE_ID)
          return await cache.addAll(DQ_CACHE_CONTENT)
        } else return Promise.resolve()
      })
  )

  if (self.registration.navigationPreload)// Enable navigation preloads!
    await self.registration.navigationPreload.enable()
})

self.addEventListener('fetch', function (event) {
  // console.log('Handling fetch event for', event.request.url);
  event.respondWith(
    caches.open(DQ_CACHE_ID).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        // console.log('event.request: ', event.request)
        if (response) return response
        // If there is an entry in the cache for event.request, then response will be defined
        // and we can just return it. Note that in this example, only font resources are cached.
        // console.log(' Found response in cache:', response);

        // Otherwise, if there is no entry in the cache for event.request, response will be
        // undefined, and we need to fetch() the resource.
        /* console.log(' No response for %s found in cache. About to fetch ' +
          'from network...', event.request.url) */

        // We call .clone() on the request since we might use it in a call to cache.put() later on.
        // Both fetch() and cache.put() "consume" the request, so we need to make a copy.
        // (see https://fetch.spec.whatwg.org/#dom-request-clone)
        return fetch(event.request.clone()).then(function (response) {
          // console.log('  Response for %s from network is: %O',
          //   event.request.url, response);
          if (response.status < 400 &&
            (
              event.request.url.match(/assets\/_content\/_downquark\//i) // we have pre-defined the file
              || (response.headers.has('content-type') && response.headers.get('content-type').match(/^font\//i)) // or it is a font file
            )) {
            // This avoids caching responses that we know are errors (i.e. HTTP status code of 4xx or 5xx).
            // We also only want to cache responses that correspond to fetched data that will most likely remain static,
            // Note that for opaque filtered responses (https://fetch.spec.whatwg.org/#concept-filtered-response-opaque)
            // we can't access to the response headers so we would have to define loaded font flies manually.
            // All of the Google Web Fonts are served off of a domain that supports CORS, so that isn't an issue here.
            // It is something to keep in mind if you're attempting to cache other resources from a cross-origin
            // domain that doesn't support CORS, though!
            // We call .clone() on the response to save a copy of it to the cache. By doing so, we get to keep
            // the original response object which we will return back to the controlled page.
            // (see https://fetch.spec.whatwg.org/#dom-response-clone)
            /* console.log('  Caching the response to', event.request.url); */
            cache.put(event.request, response.clone());
          }
          /** else {
            console.log('  Not caching the response to', event.request.url);
          } **/
          // Return the original response object, which will be used to fulfill the resource request.
          return response;
        })
      }).catch(function (error) {
        // This catch() will handle exceptions that arise from the match() or fetch() operations.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error('  Error in fetch handler:', error);
        throw error;
      })
    })
  )
})
