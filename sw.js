"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var CACHE_NAME = "ases-v7";
var ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
    "./badge-192.png",
    "./signature-ataturk.png"
];
self.addEventListener("install", function (event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) { return cache.addAll(ASSETS); }).catch(function () { }));
    self.skipWaiting();
});
self.addEventListener("activate", function (event) {
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
    }));
    self.clients.claim();
});
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET")
        return;
    event.respondWith(caches.match(event.request).then(function (cached) {
        var network = fetch(event.request)
            .then(function (res) {
            if (res && res.status === 200) {
                var clone_1 = res.clone();
                caches.open(CACHE_NAME).then(function (cache) { return cache.put(event.request, clone_1); });
            }
            return res;
        })
            .catch(function () { return cached; });
        return cached || network;
    }));
});
self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
        var e_1, _a;
        try {
            for (var clientList_1 = __values(clientList), clientList_1_1 = clientList_1.next(); !clientList_1_1.done; clientList_1_1 = clientList_1.next()) {
                var client = clientList_1_1.value;
                if ("focus" in client)
                    return client.focus();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (clientList_1_1 && !clientList_1_1.done && (_a = clientList_1.return)) _a.call(clientList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (self.clients.openWindow)
            return self.clients.openWindow("./index.html");
    }));
});
