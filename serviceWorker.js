//Caches the files in the install event of the service worker
let currentCacheName = 'restaurantCache1';
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('currentCacheName').then(function (cache) {
            console.log('Cashing files');
            return cache.addAll([
                '/',
                'restaurant.html',
                'css/styles.css',
                'data/restaurants.json',
                'js/main.js',
                'js/dbhelper.js',
                'js/restaurant_info.js',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg'
            ]);
        })
    );
});

// Deletes old cache files
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (oldCacheFiles) {
                    if(oldCacheFiles !== currentCacheName) return caches.delete(oldCacheFiles);
                })
            );
        })
    );   
});

// Checks if the there is a cached response for every request
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            //if we got a response from the cache return it
            if (response) return response;
            //otherwise return a fetch to the network for the original request
            else return fetch(event.request);
        })
    );
});
