"use strict";
// Dosyalarda değişiklik yaptığında bu sürüm adını artır; eski önbellek otomatik temizlenir.
importScripts("tips.js");
var CACHE_NAME = "ases-v12";
var ASSETS = [
    "./",
    "./style.css",
    "./app.js",
    "./tips.js",
    "./manifest.json",
    "./icon-32.png",
    "./icon-180.png",
    "./icon-192.png",
    "./icon-512.png",
    "./badge-192.png",
    "./signature-ataturk.png"
];
// Yönlendirilmiş (redirected) bir yanıt sayfa gezinmesine verilirse Chrome ERR_FAILED hatası verir.
// Bu yüzden böyle yanıtları "temiz" bir kopyaya çeviriyoruz.
function clean(res) {
    if (!res || !res.redirected)
        return Promise.resolve(res);
    return res.blob().then(function (b) {
        return new Response(b, { status: res.status, statusText: res.statusText, headers: res.headers });
    });
}
self.addEventListener("install", function (event) {
    // Tek bir dosya bile indirilemezse addAll tümünü iptal eder; her dosyayı ayrı ayrı önbelleğe alıyoruz.
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return Promise.all(ASSETS.map(function (url) {
            return fetch(url).then(clean).then(function (res) { if (res && res.ok) return cache.put(url, res); }).catch(function () { });
        }));
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
    // Sayfa gezinmeleri (/ veya /index.html) her zaman önbellekteki ana sayfaya eşlenir
    var key = req.mode === "navigate" ? "./" : req;
    event.respondWith(caches.match(key, { ignoreSearch: true }).then(function (cached) {
        var network = fetch(req).then(function (res) {
            if (res && res.type === "opaqueredirect")
                return res;
            if (res && res.status === 200) {
                var clone = res.clone();
                clean(clone).then(function (c) { return caches.open(CACHE_NAME).then(function (cache) { return cache.put(key, c); }); });
            }
            return clean(res);
        }).catch(function () { return cached; });
        return cached ? clean(cached) : network;
    }));
});
// Günlük ipucu bildirimi (Chrome Android, yüklü PWA, Periodic Background Sync)
self.addEventListener("periodicsync", function (event) {
    if (event.tag !== "ases-daily-tip")
        return;
    event.waitUntil((function () {
        if (!self.Notification || self.Notification.permission !== "granted")
            return Promise.resolve();
        var tip = ASES_TIPS[asesTipIndex()];
        return self.registration.showNotification("Günün İpucu — ASES", {
            body: tip,
            icon: "icon-192.png",
            badge: "badge-192.png",
            tag: "daily-tip"
        });
    })());
});
self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            if ("focus" in clientList[i])
                return clientList[i].focus();
        }
        if (self.clients.openWindow)
            return self.clients.openWindow("./");
    }));
});
