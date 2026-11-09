"use strict";
// Dosyalarda değişiklik yaptığında bu sürüm adını artır; eski önbellek otomatik temizlenir.
var CACHE_NAME = "ases-v10";
var ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon-32.png",
    "./icon-180.png",
    "./icon-192.png",
    "./icon-512.png",
    "./badge-192.png",
    "./signature-ataturk.png"
];
self.addEventListener("install", function (event) {
    // Tek bir dosya bile indirilemezse addAll tümünü iptal eder; her dosyayı ayrı ayrı önbelleğe alıyoruz.
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return Promise.all(ASSETS.map(function (url) { return cache.add(url).catch(function () { }); }));
    }));
    self.skipWaiting();
});
self.addEventListener("activate", function (event) {
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
    }));
    self.clients.claim();
});
self.addEventListener("fetch", function (event) {
    var req = event.request;
    if (req.method !== "GET")
        return;
    var url = new URL(req.url);
    // Yalnızca kendi dosyalarımızı ve jsQR kütüphanesini ele al; diğer her şey (Google Fonts vb.) tarayıcıya kalsın.
    var sameOrigin = url.origin === self.location.origin;
    var isJsQr = url.hostname === "cdnjs.cloudflare.com" && url.pathname.indexOf("jsQR") !== -1;
    if (!sameOrigin && !isJsQr)
        return;
    event.respondWith(caches.match(req, { ignoreSearch: true }).then(function (cached) {
        var network = fetch(req).then(function (res) {
            if (res && res.status === 200) {
                var clone = res.clone();
                caches.open(CACHE_NAME).then(function (cache) { return cache.put(req, clone); });
            }
            return res;
        }).catch(function () {
            // Çevrimdışıyken sayfa gezinmeleri için ana sayfayı döndür
            if (req.mode === "navigate")
                return caches.match("./index.html").then(function (r) { return r || caches.match("./"); });
            return cached;
        });
        return cached || network;
    }));
});
self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            if ("focus" in clientList[i])
                return clientList[i].focus();
        }
        if (self.clients.openWindow)
            return self.clients.openWindow("./index.html");
    }));
});
