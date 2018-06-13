//Caching  the files in the  in the install event of the service worker
let cacheName = 'restaurantCache1';
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('cacheName').then(function (cache) {
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

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (oldCacheFiles) {
                    if(oldCacheFiles !== cacheName) return caches.delete(oldCacheFiles);
                })
            );
        })
    );   
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            //if the response is truthy
            if (response) return response;
            //otherwise i'll return a fetch to the network for the original request
            else return fetch(event.request);
        })
    );
});
