/* ======================= ESKİ CİHAZ POLYFILL'LERİ (2015+ Android/WebView desteği) ======================= */
(function(){
  "use strict";
  // iOS Safari, sayfada hiç touchstart dinleyicisi yoksa :active (basınç) durumunu hiç tetiklemez.
  // Bu satır, tuşlara basınca CSS'teki ışıklandırma efektinin iPhone'da da çalışmasını sağlar.
  document.addEventListener("touchstart", function(){}, { passive: true });
  // NodeList.forEach (Chrome 51 öncesi WebView'lerde yok)
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  // Array.prototype.includes (Chrome 47 öncesi)
  if (!Array.prototype.includes) {
    Array.prototype.includes = function(search, start){
      start = start || 0;
      for(var i = start; i < this.length; i++){ if(this[i] === search) return true; }
      return false;
    };
  }
  // String.prototype.includes (Chrome 41 öncesi)
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start){
      return this.indexOf(search, start || 0) !== -1;
    };
  }
  // Object.entries (Chrome 54 öncesi)
  if (!Object.entries) {
    Object.entries = function(obj){
      var out = [];
      for(var key in obj){ if(Object.prototype.hasOwnProperty.call(obj, key)) out.push([key, obj[key]]); }
      return out;
    };
  }
  // Array.from (Chrome 45 öncesi)
  if (!Array.from) {
    Array.from = function(arrLike, mapFn){
      var arr = [];
      if(arrLike && typeof arrLike.length === "number"){
        for(var i = 0; i < arrLike.length; i++){ arr.push(mapFn ? mapFn(arrLike[i], i) : arrLike[i]); }
      } else if(arrLike && typeof arrLike.forEach === "function"){
        arrLike.forEach(function(v, i){ arr.push(mapFn ? mapFn(v, i) : v); });
      } else if(arrLike && arrLike[Symbol && Symbol.iterator]){
        var it = arrLike[Symbol.iterator](), step, idx = 0;
        while(!(step = it.next()).done){ arr.push(mapFn ? mapFn(step.value, idx++) : step.value); }
      }
      return arr;
    };
  }
  // Element.prototype.closest (Chrome 41 öncesi)
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(selector){
      var el = this;
      while(el && el.nodeType === 1){
        if(el.matches ? el.matches(selector) :
           (el.msMatchesSelector ? el.msMatchesSelector(selector) : el.webkitMatchesSelector(selector))){
          return el;
        }
        el = el.parentElement || el.parentNode;
      }
      return null;
    };
  }
  // window.matchMedia güvenli hale getirme (bazı çok eski WebView'lerde yok)
  if (!window.matchMedia) {
    window.matchMedia = function(){ return { matches: false, addListener: function(){}, removeListener: function(){} }; };
  }
})();

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    "use strict";
    /* ======================= SPLASH INTRO ======================= */
    var splash = document.getElementById("splash");
    if (splash) {
        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setTimeout(function () { return splash.remove(); }, reduceMotion ? 50 : 1900);
    }
    /* ======================= NAVIGATION ======================= */
    var views = document.querySelectorAll("[data-view]");
    var navButtons = document.querySelectorAll("[data-goto]");
    function goto(name) {
        views.forEach(function (v) { return v.hidden = v.id !== "view-".concat(name); });
        document.querySelectorAll(".nav-btn").forEach(function (b) {
            var active = b.dataset.goto === name;
            b.toggleAttribute("aria-current", active);
            if (active)
                b.setAttribute("aria-current", "page");
            else
                b.removeAttribute("aria-current");
        });
        var viewsEl = document.querySelector(".views");
        if (viewsEl && typeof viewsEl.scrollTo === "function") {
            viewsEl.scrollTo(0, 0);
        }
        window.scrollTo(0, 0);
    }
    navButtons.forEach(function (b) { return b.addEventListener("click", function () { return goto(b.dataset.goto); }); });
    /* ======================= GÜNÜN İPUCU ======================= */
    var dailyTips = [
        "Bir bağlantıya tıklamadan önce fare imlecini (veya uzun basarak) üzerine getir, gerçek adresi kontrol et. Kısaltılmış linkler çoğu zaman gizli bir tuzak taşır.",
        "Bankanız asla SMS veya telefonla şifre, OTP kodu ya da kart bilgisi istemez. Böyle bir talep geldiğinde hemen kapat ve bankanı resmi hattından ara.",
        "Kargo takip linki gönderdiğini iddia eden mesajlarda dikkatli ol; gerçek kargo firmaları takip numarasını genelde uygulama üzerinden gösterir.",
        "'Hesabın askıya alındı' gibi aciliyet hissi yaratan mesajlar en klasik dolandırıcılık taktiğidir. Panik yerine doğrulama yap.",
        "Wi-Fi şifreni paylaşırken misafir ağı (guest network) kullan, ana ağını yabancılara açma.",
        "İki adımlı doğrulamayı (2FA) e-posta ve bankacılık hesaplarında mutlaka aç; şifren çalınsa bile hesabını korur.",
        "Sosyal medyada konum paylaşımını gerçek zamanlı değil, oradan ayrıldıktan sonra yap.",
        "Halka açık Wi-Fi'de bankacılık işlemi yapmaktan kaçın, mümkünse mobil veri kullan.",
        "Tanımadığın numaralardan gelen WhatsApp görüntülü aramalara temkinli yaklaş, bazı dolandırıcılık senaryoları burada başlar.",
        "Uygulama indirirken yalnızca resmi mağazaları (Play Store, App Store) kullan, APK dosyalarını dışarıdan indirmekten kaçın.",
        "Telefon numaranı ve e-postanı hangi sitelerde kullandığını zaman zaman gözden geçir, kullanmadığın hesapları kapat.",
        "Sahte 'ödül kazandın' mesajlarına asla kişisel bilgi veya ödeme bilgisi girme."
    ];
    var dayIndex = Math.floor(Date.now() / 86400000) % dailyTips.length;
    document.getElementById("dailyTipText").textContent = dailyTips[dayIndex];
    /* ======================= HIZLI GÜVENLİK KONTROLÜ ======================= */
    var checks = [
        { id: "c1", label: "En az bir hesabımda iki adımlı doğrulama (2FA) açık" },
        { id: "c2", label: "Farklı hesaplarda farklı şifreler kullanıyorum" },
        { id: "c3", label: "Telefonumda ekran kilidi (PIN/parmak izi) var" },
        { id: "c4", label: "Uygulama ve işletim sistemi güncellemelerini yapıyorum" },
        { id: "c5", label: "Bilinmeyen linklere tıklamadan önce kontrol ediyorum" }
    ];
    var checkState = {};
    var checkListEl = document.getElementById("checkList");
    checks.forEach(function (c) {
        var li = document.createElement("li");
        li.innerHTML = "<button type=\"button\" data-id=\"".concat(c.id, "\" aria-label=\"").concat(c.label, "\"></button><span>").concat(c.label, "</span>");
        checkListEl.appendChild(li);
    });
    function updateShield() {
        var total = Object.values(checkState).filter(Boolean).length;
        document.getElementById("shieldScore").textContent = "".concat(total, "/5");
        var fill = document.getElementById("shieldFill");
        var pct = total / checks.length;
        fill.setAttribute("transform", "translate(0, ".concat(-(116 * pct), ")"));
        fill.style.fill = pct >= 0.8 ? "var(--green)" : pct >= 0.4 ? "var(--amber)" : "var(--red)";
    }
    checkListEl.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-id]");
        if (!btn)
            return;
        var id = btn.dataset.id;
        checkState[id] = !checkState[id];
        btn.classList.toggle("checked", checkState[id]);
        btn.textContent = checkState[id] ? "✓" : "";
        btn.closest("li").classList.toggle("checked-text", checkState[id]);
        updateShield();
    });
    updateShield();
    /* ======================= UYGULAMAYI YÜKLE (A2HS) ======================= */
    (function initInstallPrompt() {
        var banner = document.getElementById("installBanner");
        var installBtn = document.getElementById("installBtn");
        var closeBtn = document.getElementById("installClose");
        if (!banner) return;

        var DISMISS_KEY = "ases_install_dismissed";
        var deferredPrompt = null;

        function isStandalone() {
            var mq = window.matchMedia && window.matchMedia("(display-mode: standalone)");
            return (mq && mq.matches) || window.navigator.standalone === true;
        }

        function wasDismissedRecently() {
            try {
                var ts = localStorage.getItem(DISMISS_KEY);
                if (!ts) return false;
                var days = (Date.now() - parseInt(ts, 10)) / 86400000;
                return days < 14;
            } catch (e) { return false; }
        }

        if (isStandalone() || wasDismissedRecently()) return;

        var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
        if (isIOS) {
            installBtn.style.display = "none";
            document.getElementById("installBanner").querySelector(".install-desc").textContent =
                "Paylaş düğmesine dokunup \"Ana Ekrana Ekle\"yi seçerek yükleyebilirsin.";
            banner.classList.remove("hidden");
        }

        window.addEventListener("beforeinstallprompt", function (e) {
            e.preventDefault();
            deferredPrompt = e;
            banner.classList.remove("hidden");
        });

        window.addEventListener("appinstalled", function () {
            banner.classList.add("hidden");
            deferredPrompt = null;
        });

        installBtn.addEventListener("click", function () {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function () {
                deferredPrompt = null;
                banner.classList.add("hidden");
            });
        });

        closeBtn.addEventListener("click", function () {
            banner.classList.add("hidden");
            try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) {}
        });
    })();
    /* ======================= RENK TEMASI ======================= */
    (function initTheme() {
        var THEME_KEY = "ases_theme";
        var swatchButtons = document.querySelectorAll(".theme-swatch");
        if (!swatchButtons.length) return;
        function applyTheme(theme) {
            if (theme === "silver") {
                document.documentElement.removeAttribute("data-theme");
            } else {
                document.documentElement.setAttribute("data-theme", theme);
            }
            swatchButtons.forEach(function (btn) {
                btn.classList.toggle("active", btn.dataset.theme === theme);
            });
        }
        var saved = "silver";
        try { saved = localStorage.getItem(THEME_KEY) || "silver"; } catch (e) {}
        applyTheme(saved);
        swatchButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var theme = btn.dataset.theme;
                applyTheme(theme);
                try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
            });
        });
    })();
    /* ======================= BİLDİRİMLER (YEREL PUSH) ======================= */
    var notifBtn = document.getElementById("notifBtn");
    var notifDesc = document.getElementById("notifDesc");
    function showAppNotification(title, body, tag) {
        if (!("Notification" in window) || Notification.permission !== "granted")
            return;
        var opts = {
            body: body,
            icon: "icon-192.png",
            badge: "badge-192.png",
            tag: tag || "ases",
            renotify: true
        };
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
            navigator.serviceWorker.ready.then(function (reg) { return reg.showNotification(title, opts); }).catch(function () {
                try {
                    new Notification(title, opts);
                }
                catch (e) { }
            });
        }
        else {
            try {
                new Notification(title, opts);
            }
            catch (e) { }
        }
    }
    function refreshNotifButton() {
        if (!("Notification" in window)) {
            notifBtn.textContent = "Desteklenmiyor";
            notifBtn.disabled = true;
            notifBtn.className = "notif-btn off";
            notifDesc.textContent = "Bu tarayıcı bildirimleri desteklemiyor.";
            return;
        }
        if (Notification.permission === "granted") {
            notifBtn.textContent = "Açık";
            notifBtn.className = "notif-btn on";
            notifDesc.textContent = "Bildirimler açık — tehlikeli karekod veya zayıf şifre tespit edilince haber vereceğim.";
        }
        else if (Notification.permission === "denied") {
            notifBtn.textContent = "Engellendi";
            notifBtn.className = "notif-btn off";
            notifDesc.textContent = "Bildirimlere tarayıcı ayarlarından izin vermen gerekiyor.";
        }
        else {
            notifBtn.textContent = "Aç";
            notifBtn.className = "notif-btn";
            notifDesc.textContent = "Tehlikeli bir karekod ya da zayıf şifre tespit edildiğinde, logolu bir bildirimle anında uyar.";
        }
    }
    if (notifBtn) {
        refreshNotifButton();
        notifBtn.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
            var perm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("Notification" in window) || Notification.permission === "denied")
                            return [2 /*return*/];
                        if (Notification.permission === "granted") {
                            showAppNotification("ASES", "Bildirimler zaten açık. Seni güvende tutmaya devam ediyorum.", "info");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Notification.requestPermission()];
                    case 1:
                        perm = _a.sent();
                        refreshNotifButton();
                        if (perm === "granted") {
                            showAppNotification("ASES", "Bildirimler açıldı. Tehlikeli bir durum tespit edersem sana haber vereceğim.", "welcome");
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    }
    // Günde bir kez, bildirim izni açıksa günün ipucunu bildirim olarak da gönder
    (function dailyTipNotification() {
        if (!("Notification" in window))
            return;
        var todayKey = new Date().toISOString().slice(0, 10);
        var lastShown = localStorage.getItem("ases_daily_notif");
        if (Notification.permission === "granted" && lastShown !== todayKey) {
            setTimeout(function () {
                showAppNotification("Günün İpucu — ASES", dailyTips[dayIndex], "daily-tip");
                localStorage.setItem("ases_daily_notif", todayKey);
            }, 4000);
        }
    })();
    /* ======================= ŞİFRE SAĞLIĞI (tamamen yerel) ======================= */
    var commonPasswords = new Set([
        "123456", "123456789", "12345678", "password", "111111", "123123", "qwerty", "abc123",
        "1q2w3e4r", "000000", "1234567", "1234567890", "iloveyou", "admin", "letmein", "welcome",
        "monkey", "dragon", "football", "şifre123", "sifre123", "istanbul", "türkiye", "turkiye1",
        "galatasaray", "fenerbahce", "besiktas", "password1", "qwertyuiop", "asdfgh", "987654321",
        "aaaaaa", "1111111", "12341234", "qazwsx"
    ]);
    var pwInput = document.getElementById("pwInput");
    var pwToggle = document.getElementById("pwToggle");
    var pwEyeOpen = document.getElementById("pwEyeOpen");
    var pwEyeClosed = document.getElementById("pwEyeClosed");
    var pwFindings = document.getElementById("pwFindings");
    var meterFill = document.getElementById("pwMeterFill");
    var meterLabel = document.getElementById("pwMeterLabel");
    pwToggle.addEventListener("click", function () {
        var isPw = pwInput.type === "password";
        pwInput.type = isPw ? "text" : "password";
        pwEyeOpen.classList.toggle("hidden", isPw);
        pwEyeClosed.classList.toggle("hidden", !isPw);
        pwToggle.setAttribute("aria-label", isPw ? "Şifreyi gizle" : "Şifreyi göster");
    });
    function hasSequential(pw) {
        var e_1, _a;
        var seqs = ["0123456789", "abcdefghijklmnopqrstuvwxyz", "qwertyuiop", "asdfghjkl", "zxcvbnm"];
        var lower = pw.toLowerCase();
        try {
            for (var seqs_1 = __values(seqs), seqs_1_1 = seqs_1.next(); !seqs_1_1.done; seqs_1_1 = seqs_1.next()) {
                var seq = seqs_1_1.value;
                for (var i = 0; i <= seq.length - 4; i++) {
                    var chunk = seq.slice(i, i + 4);
                    if (lower.includes(chunk) || lower.includes(chunk.split("").reverse().join("")))
                        return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (seqs_1_1 && !seqs_1_1.done && (_a = seqs_1.return)) _a.call(seqs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    }
    function hasRepeats(pw) { return /(.)\1\1/.test(pw); }
    function analyze(pw) {
        var findings = [];
        var score = 0;
        if (pw.length === 0) {
            return { score: 0, findings: [], label: "Bir şifre yaz ve anında sonucu gör" };
        }
        if (pw.length >= 12) {
            score += 30;
        }
        else if (pw.length >= 8) {
            score += 15;
            findings.push({ t: "warn", m: "12 karakter ve üzeri şifreler çok daha güvenlidir." });
        }
        else {
            findings.push({ t: "bad", m: "Sadece ".concat(pw.length, " karakter \u2014 en az 8, tercihen 12+ karakter kullan.") });
        }
        var hasLower = /[a-zçğıöşü]/i.test(pw) && /[a-z]/.test(pw);
        var hasUpper = /[A-ZÇĞİÖŞÜ]/.test(pw);
        var hasDigit = /[0-9]/.test(pw);
        var hasSymbol = /[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/.test(pw);
        var variety = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
        score += variety * 12;
        if (variety <= 2)
            findings.push({ t: "bad", m: "Sadece harf veya sadece rakam kullanılmış. Büyük/küçük harf, rakam ve sembol karıştır." });
        else if (variety === 3)
            findings.push({ t: "warn", m: "İyi gidiyor — bir sembol daha eklemek şifreni güçlendirir." });
        else
            findings.push({ t: "ok", m: "Harf, rakam ve sembol karışımı iyi kullanılmış." });
        if (commonPasswords.has(pw.toLowerCase())) {
            score = Math.min(score, 8);
            findings.unshift({ t: "bad", m: "Bu şifre en sık kullanılan / en çok çalınan şifreler listesinde. Kesinlikle değiştir." });
        }
        if (hasSequential(pw)) {
            score -= 15;
            findings.push({ t: "bad", m: "Klavye sırası veya alfabetik sıra (ör. 'qwerty', 'abcd') kullanılmış — kolay tahmin edilir." });
        }
        if (hasRepeats(pw)) {
            score -= 10;
            findings.push({ t: "warn", m: "Aynı karakterin art arda tekrarı (ör. 'aaa') şifreyi zayıflatır." });
        }
        if (/^(19|20)\d{2}$/.test(pw) || /(19|20)\d{2}/.test(pw)) {
            findings.push({ t: "warn", m: "Bir yıl/tarih içeriyor gibi görünüyor — doğum tarihi gibi tahmin edilebilir bilgilerden kaçın." });
        }
        score = Math.max(0, Math.min(100, score));
        var label;
        if (score < 30)
            label = "Zayıf — kolayca kırılabilir";
        else if (score < 55)
            label = "Orta — geliştirilmeli";
        else if (score < 80)
            label = "İyi — birkaç ince ayarla mükemmel olur";
        else
            label = "Güçlü — bu şifre işini görür";
        if (findings.length === 0)
            findings.push({ t: "ok", m: "Belirgin bir zayıflık bulunamadı." });
        return { score: score, findings: findings, label: label };
    }
    pwInput.addEventListener("input", function () {
        var _a = analyze(pwInput.value), score = _a.score, findings = _a.findings, label = _a.label;
        meterFill.style.width = "".concat(score, "%");
        meterFill.style.background = score < 30 ? "var(--danger)" : score < 55 ? "var(--amber)" : score < 80 ? "#c7d94a" : "var(--green)";
        meterLabel.textContent = label;
        pwFindings.innerHTML = "";
        if (pwInput.value.length === 0)
            return;
        findings.forEach(function (f) {
            var div = document.createElement("div");
            div.className = "finding ".concat(f.t);
            div.innerHTML = "<span>".concat(f.t === "ok" ? "✓" : f.t === "warn" ? "!" : "✕", "</span><span>").concat(f.m, "</span>");
            pwFindings.appendChild(div);
        });
    });
    pwInput.addEventListener("blur", function () {
        if (pwInput.value.length === 0)
            return;
        var score = analyze(pwInput.value).score;
        if (score < 30) {
            showAppNotification("Zayıf Şifre Tespit Edildi", "Test ettiğin şifre kolay kırılabilir görünüyor. Şifre Sağlığı sekmesindeki önerilere göz at.", "weak-password");
        }
    });
    /* ======================= FARKINDALIK İPUÇLARI ======================= */
    var tipData = [
        { cat: "Dolandırıcılık", title: "Sahte 'kargo takip' mesajları",
            body: "Bilmediğin bir kargo mesajı, ödeme veya kişisel bilgi istiyorsa gerçek değildir. Kargo firmasının resmi uygulamasından takip numaranı kontrol et, mesajdaki linke tıklama." },
        { cat: "Dolandırıcılık", title: "'Yakının kaza geçirdi' aramaları",
            body: "Panik yaratıp hızlı para transferi istettirmek klasik bir yöntemdir. Kapat, ailenle doğrudan iletişime geç, doğrulamadan asla para gönderme." },
        { cat: "Dolandırıcılık", title: "Sahte banka/e-Devlet siteleri",
            body: "Adres çubuğunu her zaman kontrol et. Gerçek kurum siteleri SMS ile şifre veya kart bilgisi istemez. Şüphelendiğinde siteyi linkten değil, tarayıcıya adresi kendin yazarak aç." },
        { cat: "Bankacılık", title: "OTP / doğrulama kodu paylaşma",
            body: "Telefonuna gelen tek kullanımlık kod (OTP) sadece senin işlemin için üretilir. Hiçbir banka çalışanı bu kodu senden telefonla istemez." },
        { cat: "Bankacılık", title: "Bilinmeyen QR kod ile ödeme",
            body: "Restoran veya otoparklarda üzerine yapıştırılmış sahte QR kodlar gerçek ödeme sayfasına benzeyen sahte sitelere yönlendirebilir. Ödeme öncesi adres çubuğunu kontrol et." },
        { cat: "Sosyal Medya", title: "Hesap doğrulama/ödül dolandırıcılığı",
            body: "'Hesabın onaylandı, tıkla' ya da 'ödül kazandın' mesajları genelde şifreni çalmayı hedefler. Sosyal medya şifreni asla üçüncü parti bir sayfaya girme." },
        { cat: "Sosyal Medya", title: "Profil bilgisi paylaşım ayarları",
            body: "Doğum tarihi, telefon numarası ve konum gibi bilgileri herkese açık paylaşmak, seni hedef alan dolandırıcılık senaryolarını kolaylaştırır. Gizlilik ayarlarını düzenli gözden geçir." },
        { cat: "Wi-Fi", title: "Halka açık ağlarda dikkat",
            body: "Kafe, havaalanı gibi ücretsiz ağlarda bankacılık ya da hassas işlem yapma. Mümkünse mobil verini kullan ya da güvenilir bir VPN tercih et." },
        { cat: "Wi-Fi", title: "Ev router şifreni değiştir",
            body: "Modeminin varsayılan yönetici şifresini mutlaka değiştir; fabrika şifreleri internet üzerinde herkese açık listelerde bulunur." },
        { cat: "Genel", title: "Uygulama izinlerini gözden geçir",
            body: "Bir fener uygulamasının konumuna veya rehberine ihtiyacı yoktur. Telefon ayarlarından uygulama izinlerini düzenli kontrol et, gereksiz olanları kapat." },
        { cat: "Genel", title: "Yazılım güncellemelerini atlama",
            body: "Güncellemelerin çoğu bilinen güvenlik açıklarını kapatır. 'Sonra hatırlat' yerine mümkün olan en kısa sürede güncelle." },
        { cat: "Genel", title: "Herkese açık şarj istasyonları",
            body: "Havaalanı gibi yerlerdeki USB şarj istasyonları veri çalma riski taşıyabilir ('juice jacking'). Kendi adaptörünü kullan ya da sadece şarj eden bir kablo tercih et." }
    ];
    var tipFiltersEl = document.getElementById("tipFilters");
    var tipAccordionEl = document.getElementById("tipAccordion");
    var categories = __spreadArray(["Tümü"], __read(new Set(tipData.map(function (t) { return t.cat; }))), false);
    var activeCat = "Tümü";
    categories.forEach(function (cat) {
        var chip = document.createElement("button");
        chip.className = "chip" + (cat === activeCat ? " active" : "");
        chip.textContent = cat;
        chip.addEventListener("click", function () {
            activeCat = cat;
            tipFiltersEl.querySelectorAll(".chip").forEach(function (c) { return c.classList.toggle("active", c.textContent === cat); });
            renderTips();
        });
        tipFiltersEl.appendChild(chip);
    });
    function makeAccordionItem(_a) {
        var cat = _a.cat, title = _a.title, bodyHtml = _a.bodyHtml;
        var item = document.createElement("div");
        item.className = "acc-item";
        item.innerHTML = "\n      <button class=\"acc-head\" type=\"button\">\n        <span>".concat(cat ? "<span class=\"acc-cat\">".concat(cat, "</span>") : "", "<span class=\"acc-title\">").concat(title, "</span></span>\n        <span class=\"acc-chevron\">\u25BE</span>\n      </button>\n      <div class=\"acc-body\"><div class=\"acc-body-inner\">").concat(bodyHtml, "</div></div>");
        var head = item.querySelector(".acc-head");
        var body = item.querySelector(".acc-body");
        head.addEventListener("click", function () {
            var isOpen = item.classList.contains("open");
            item.parentElement.querySelectorAll(".acc-item.open").forEach(function (o) {
                if (o !== item) {
                    o.classList.remove("open");
                    o.querySelector(".acc-body").style.maxHeight = null;
                }
            });
            item.classList.toggle("open", !isOpen);
            body.style.maxHeight = !isOpen ? body.scrollHeight + "px" : null;
        });
        return item;
    }
    function renderTips() {
        tipAccordionEl.innerHTML = "";
        tipData
            .filter(function (t) { return activeCat === "Tümü" || t.cat === activeCat; })
            .forEach(function (t) { return tipAccordionEl.appendChild(makeAccordionItem({ cat: t.cat, title: t.title, bodyHtml: "<p>".concat(t.body, "</p>") })); });
    }
    renderTips();
    /* ======================= ACİL DURUM REHBERİ ======================= */
    var scenarios = [
        { title: "Sosyal medya / e-posta hesabım çalındı", body: "\n      <ol>\n        <li>H\u00E2l\u00E2 girebiliyorsan \u015Fifreni hemen de\u011Fi\u015Ftir ve t\u00FCm cihazlardan oturumu kapat.</li>\n        <li>\u0130ki ad\u0131ml\u0131 do\u011Frulamay\u0131 (2FA) hemen a\u00E7.</li>\n        <li>Giremiyorsan platformun \"hesab\u0131m \u00E7al\u0131nd\u0131\" / hesap kurtarma formunu kullan.</li>\n        <li>Arkada\u015Flar\u0131n\u0131 ve takip\u00E7ilerini, hesaptan gelebilecek \u015F\u00FCpheli mesajlara kar\u015F\u0131 uyar.</li>\n        <li>Ayn\u0131 \u015Fifreyi ba\u015Fka hesaplarda da kulland\u0131ysan hepsini de\u011Fi\u015Ftir.</li>\n      </ol>" },
        { title: "Kart / banka bilgim sızdı ya da yetkisiz işlem gördüm", body: "\n      <ol>\n        <li>Bankan\u0131n 7/24 \u00E7a\u011Fr\u0131 merkezini ara ve kart\u0131n\u0131/hesab\u0131n\u0131 hemen bloke ettir.</li>\n        <li>Mobil bankac\u0131l\u0131k uygulamas\u0131ndan \u015Fifreni de\u011Fi\u015Ftir.</li>\n        <li>Yetkisiz i\u015Flem varsa itiraz dilek\u00E7esi vermek i\u00E7in bankana ba\u015Fvur.</li>\n        <li>Gerekirse en yak\u0131n karakola veya savc\u0131l\u0131\u011Fa su\u00E7 duyurusunda bulun.</li>\n      </ol>" },
        { title: "Dolandırıcılığa uğradım (para transferi yaptım)", body: "\n      <ol>\n        <li>Vakit kaybetmeden bankan\u0131 aray\u0131p transferi durdurmay\u0131 / geri almay\u0131 talep et.</li>\n        <li><strong>ihbarweb.org.tr</strong> \u00FCzerinden Emniyet Genel M\u00FCd\u00FCrl\u00FC\u011F\u00FC'ne siber su\u00E7 bildirimi yap.</li>\n        <li>En yak\u0131n karakola giderek su\u00E7 duyurusunda bulun, elindeki t\u00FCm ekran g\u00F6r\u00FCnt\u00FClerini ve mesaj kay\u0131tlar\u0131n\u0131 sakla.</li>\n        <li>Kendini su\u00E7lama \u2014 bu taktikler profesyonel doland\u0131r\u0131c\u0131l\u0131k senaryolar\u0131d\u0131r.</li>\n      </ol>" },
        { title: "Telefonum çalındı veya kayboldu", body: "\n      <ol>\n        <li>Ba\u015Fka bir cihazdan Google (Find My Device) veya Apple (Find My iPhone) \u00FCzerinden telefonu kilitle ya da konumunu g\u00F6r.</li>\n        <li>Operat\u00F6r\u00FCne hatt\u0131n\u0131 kay\u0131p/\u00E7al\u0131nt\u0131 olarak bildirip dondur.</li>\n        <li>Telefonundaki e-posta, sosyal medya ve bankac\u0131l\u0131k hesaplar\u0131n\u0131n \u015Fifrelerini ba\u015Fka bir cihazdan de\u011Fi\u015Ftir.</li>\n        <li>En yak\u0131n karakola IMEI numaranla birlikte kay\u0131p/\u00E7al\u0131nt\u0131 bildiriminde bulun.</li>\n      </ol>" },
        { title: "Biri kimliğimi kullanıyor / adıma sahte hesap açtı", body: "\n      <ol>\n        <li>Sahte hesab\u0131 ilgili platforma \"kimlik taklidi\" (impersonation) olarak bildir.</li>\n        <li>e-Devlet \u00FCzerinden ad\u0131na kay\u0131tl\u0131 hat, hesap gibi bilgileri kontrol et.</li>\n        <li>\u015E\u00FCpheli bir finansal i\u015Flem varsa ilgili bankaya ve <strong>ihbarweb.org.tr</strong>'a bildirimde bulun.</li>\n        <li>Gerekirse savc\u0131l\u0131\u011Fa su\u00E7 duyurusunda bulunarak resmi kay\u0131t olu\u015Ftur.</li>\n      </ol>" }
    ];
    var scenarioListEl = document.getElementById("scenarioList");
    scenarios.forEach(function (s) { return scenarioListEl.appendChild(makeAccordionItem({ title: s.title, bodyHtml: s.body })); });
    /* ======================= AİLE GÜVENLİĞİ ======================= */
    var familyItems = [
        { title: "Yaşına uygun ayarları kur", body: "\n      <p>Google Family Link (Android) veya Apple Ekran S\u00FCresi (iOS) ile i\u00E7erik filtreleme, uygulama izinleri ve ekran s\u00FCresi s\u0131n\u0131rlar\u0131 belirleyebilirsin. Ayarlar\u0131 \u00E7ocu\u011Funla birlikte kurmak, kurallar\u0131 anlamas\u0131n\u0131 kolayla\u015Ft\u0131r\u0131r.</p>" },
        { title: "Uygulama izinlerini birlikte kontrol edin", body: "\n      <p>\u00C7ocu\u011Funun telefonundaki uygulamalar\u0131n konum, kamera ve mikrofon izinlerini d\u00FCzenli kontrol et. Oyun uygulamalar\u0131n\u0131n \u00E7o\u011Fu bu izinlere ihtiya\u00E7 duymaz.</p>" },
        { title: "Açık iletişimi tercih et, yasaklamayı değil", body: "\n      <p>\u00C7ocu\u011Fun internette rahats\u0131z edici bir \u015Feyle kar\u015F\u0131la\u015Ft\u0131\u011F\u0131nda seninle konu\u015Fabilece\u011Fini bilmesi, gizli gizli davranmas\u0131ndan \u00E7ok daha koruyucudur. Cezaland\u0131rmayaca\u011F\u0131n\u0131 hissettirmek, sorun ya\u015Fad\u0131\u011F\u0131nda sana gelmesini sa\u011Flar.</p>" },
        { title: "Sosyal medya gizlilik ayarları", body: "\n      <p>Hesaplar\u0131 gizli/\u00F6zel profil olarak ayarlay\u0131n, takip\u00E7i ve arkada\u015F isteklerini yaln\u0131zca tan\u0131d\u0131klar\u0131ndan kabul etmesini te\u015Fvik edin. Konum etiketlemeyi kapat\u0131n.</p>" },
        { title: "Çevrimiçi tanışılan kişilere karşı temkin", body: "\n      <p>\u00C7ocu\u011Funa, sadece internetten tan\u0131d\u0131\u011F\u0131 biriyle y\u00FCz y\u00FCze bulu\u015Fmadan \u00F6nce mutlaka bir yeti\u015Fkinle konu\u015Fmas\u0131 gerekti\u011Fini anlat. Israrla gizlilik isteyen ya da \u00F6zel g\u00F6r\u00FC\u015Fme talep eden yeti\u015Fkin davran\u0131\u015Flar\u0131na kar\u015F\u0131 dikkatli olmas\u0131n\u0131 \u00F6\u011Fret.</p>" },
        { title: "Düzenli, yargılamayan sohbetler yapın", body: "\n      <p>Haftada bir kez \"bu hafta internette ilgin\u00E7 ya da tuhaf bir \u015Fey oldu mu?\" gibi sorular sormak, ciddi bir sorun b\u00FCy\u00FCmeden fark etmeni sa\u011Flar.</p>" }
    ];
    var familyAccordionEl = document.getElementById("familyAccordion");
    familyItems.forEach(function (f) { return familyAccordionEl.appendChild(makeAccordionItem({ title: f.title, bodyHtml: f.body })); });
    /* ======================= KAREKOD (QR) GÜVENLİK ANALİZ MOTORU =======================
       Yalnızca ürün karekodları değil, kamerayla okunan HER TÜR karekod içeriği için
       (bağlantı, Wi-Fi, telefon, SMS, e-posta, kripto adresi, kartvizit, düz metin)
       kural tabanlı bir sezgisel tehdit taraması yapar. Gerçek bir tehdit veritabanı
       DEĞİLDİR — bilinen dolandırıcılık/kandırmaca kalıplarını puanlayan bir ön uyarı katmanıdır. */
    var SUSPICIOUS_TLDS = [
        "zip", "mov", "xyz", "tk", "top", "gq", "ml", "cf", "click", "fit", "loan", "work",
        "support", "link", "biz", "cc", "site", "online", "info", "club", "live", "icu",
        "pw", "rest", "cfd", "sbs", "cyou", "buzz", "monster", "quest", "bond"
    ];
    var SHORTENERS = [
        "bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "shorte.st", "ow.ly", "buff.ly",
        "goo.gl", "rebrand.ly", "tiny.cc", "shorturl.at", "rb.gy", "t.ly", "v.gd", "clck.ru",
        "s.id", "b.link", "lnkd.in", "amzn.to"
    ];
    var BRANDS = {
        "garanti": ["garanti.com.tr", "garantibbva.com.tr"], "isbank": ["isbank.com.tr"],
        "ziraat": ["ziraatbank.com.tr", "ziraat.com.tr"], "akbank": ["akbank.com", "akbank.com.tr"],
        "yapikredi": ["yapikredi.com.tr", "ykb.com"], "halkbank": ["halkbank.com.tr"],
        "vakifbank": ["vakifbank.com.tr"], "denizbank": ["denizbank.com"],
        "qnb": ["qnb.com.tr", "qnbfinansbank.com"], "ptt": ["ptt.gov.tr", "pttavm.com"],
        "turkcell": ["turkcell.com.tr"], "vodafone": ["vodafone.com.tr"],
        "turktelekom": ["turktelekom.com.tr", "tt.com.tr"], "trendyol": ["trendyol.com"],
        "hepsiburada": ["hepsiburada.com"], "amazon": ["amazon.com.tr", "amazon.com"],
        "araskargo": ["araskargo.com.tr"], "yurtici": ["yurticikargo.com"],
        "mng": ["mngkargo.com.tr"], "ups": ["ups.com", "ups.com.tr"], "dhl": ["dhl.com", "dhl.com.tr"],
        "paypal": ["paypal.com"], "apple": ["apple.com", "icloud.com"],
        "google": ["google.com", "google.com.tr"], "microsoft": ["microsoft.com", "live.com", "office.com"],
        "instagram": ["instagram.com"], "facebook": ["facebook.com", "fb.com", "meta.com"],
        "whatsapp": ["whatsapp.com", "wa.me"], "telegram": ["telegram.org", "t.me"],
        "edevlet": ["turkiye.gov.tr", "edevlet.gov.tr"], "sgk": ["sgk.gov.tr"], "gib": ["gib.gov.tr"]
    };
    var SCAM_PHRASES = [
        "hesabınız donduruldu", "hesabınız kilitlendi", "kartınız bloke", "kazandınız",
        "tebrikler kazandınız", "ödül kazandınız", "kargonuz elimizde", "kargo teslim edilemedi",
        "gümrük ücreti", "otp kodunu paylaş", "doğrulama kodunu gönder", "şifrenizi girin",
        "sms kodunu gönder", "hemen tıklayın", "acil işlem", "son gün", "yasal takip", "icra",
        "sınırlı süre", "24 saat içinde", "bilgilerinizi güncelleyin", "hesabınızı doğrulayın",
        "iban bilgisi gönderin", "kredi kartı bilgisi", "cvv", "para transferi", "havale yapın"
    ];
    var SUSPICIOUS_PATHS = [
        "login", "signin", "verify", "verification", "update", "secure", "security", "account",
        "confirm", "confirmation", "validate", "authenticate", "password", "reset", "recover",
        "unlock", "activate", "billing", "payment", "wallet", "webscr", "wp-login", "admin"
    ];
    var MALICIOUS_EXTENSIONS = ["apk", "exe", "scr", "bat", "cmd", "msi", "jar", "vbs", "ps1"];
    function levenshtein(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        var m = a.length, n = b.length;
        if (Math.abs(m - n) > 3)
            return 99;
        var dp = Array.from({ length: m + 1 }, function () { return new Array(n + 1).fill(0); });
        for (var i = 0; i <= m; i++)
            dp[i][0] = i;
        for (var j = 0; j <= n; j++)
            dp[0][j] = j;
        for (var i = 1; i <= m; i++)
            for (var j = 1; j <= n; j++)
                dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
        return dp[m][n];
    }
    function normalizeHost(host) { return host.replace(/^www\./, "").toLowerCase(); }
    function isOfficialDomain(host, list) { var h = normalizeHost(host); return list.some(function (o) { return h === o || h.endsWith("." + o); }); }
    function getMainLabel(host) {
        var labels = normalizeHost(host).split(".");
        return labels.length >= 2 ? labels[labels.length - 2] : (labels[0] || "");
    }
    var CONFUSABLE = /[\u0400-\u04FF\u0370-\u03FF]/;
    function hasMixedScript(text) { return /[a-z]/i.test(text) && CONFUSABLE.test(text); }
    function detectHiddenChars(raw) { return /[\u200B-\u200F\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/.test(raw); }
    function isObfuscatedIp(host) {
        if (/^\d{6,10}$/.test(host))
            return true;
        if (/^0x[0-9a-f]+(\.0x[0-9a-f]+){0,3}$/i.test(host))
            return true;
        return false;
    }
    function analyzeUrlContent(raw) {
        var e_2, _a, e_3, _b;
        var score = 0, reasons = [];
        var text = raw.trim();
        if (/^(javascript|data|vbscript):/i.test(text)) {
            return { score: 95, reasons: ["Tehlikeli bir betik protokolü (javascript:/data:) tespit edildi — bu kod doğrudan çalıştırılabilir."] };
        }
        var hasScheme = /^https?:\/\//i.test(text);
        var url;
        try {
            url = new URL(hasScheme ? text : "http://" + text);
        }
        catch (e) {
            return { score: 35, reasons: ["Bu içerik geçerli bir bağlantı biçiminde değil, dikkatli olun."] };
        }
        var host = url.hostname.toLowerCase();
        var path = (url.pathname || "").toLowerCase();
        if (detectHiddenChars(raw)) {
            score += 40;
            reasons.push("Görünmez/gizli karakterler tespit edildi — gerçek hedef gizleniyor olabilir.");
        }
        if (!hasScheme) {
            score += 15;
            reasons.push("Güvenli protokol (https://) belirtilmemiş.");
        }
        else if (url.protocol !== "https:") {
            score += 32;
            reasons.push("Güvensiz (HTTP) protokol kullanılıyor — veriler şifrelenmeden gidebilir.");
        }
        if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) {
            score += 38;
            reasons.push("Alan adı yerine doğrudan IP adresi kullanılıyor.");
        }
        else if (isObfuscatedIp(host)) {
            score += 38;
            reasons.push("Gizlenmiş (ondalık/onaltılık) bir IP adresi biçimi tespit edildi.");
        }
        if (hasMixedScript(text)) {
            score += 45;
            reasons.push("Latin harfleriyle karışık Kiril/Yunan karakterleri var — görsel taklit (homoglyph) riski.");
        }
        if (url.username || url.password) {
            score += 25;
            reasons.push("Bağlantıda '@' işareti var — gerçek adresi gizlemek için kullanılmış olabilir.");
        }
        if (host.startsWith("xn--") || host.includes(".xn--")) {
            score += 30;
            reasons.push("Punycode (uluslararası karakter) alan adı — marka taklidi riski yüksek.");
        }
        var subCount = host.split(".").length - 2;
        if (subCount >= 4) {
            score += 25;
            reasons.push("Aşırı sayıda alt alan adı (subdomain) içeriyor.");
        }
        var dashCount = (host.match(/-/g) || []).length;
        if (dashCount >= 4) {
            score += 16;
            reasons.push("Alan adında çok sayıda tire (-) var.");
        }
        var tld = host.split(".").pop();
        if (SUSPICIOUS_TLDS.includes(tld)) {
            score += 24;
            reasons.push("'." + tld + "' uzantısı dolandırıcılar tarafından sık tercih edilen ucuz bir uzantı.");
        }
        var isShortener = SHORTENERS.some(function (s) { return host === s || host.endsWith("." + s); });
        if (isShortener) {
            score += 22;
            reasons.push("Kısaltılmış bağlantı — sizi gerçekte hangi siteye götüreceği gizlenmiş.");
        }
        var knownOfficial = Object.values(BRANDS).some(function (list) { return isOfficialDomain(host, list); });
        try {
            for (var _c = __values(Object.entries(BRANDS)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), brand = _e[0], official = _e[1];
                if (host.includes(brand)) {
                    if (!isOfficialDomain(host, official) && !isShortener) {
                        score += 40;
                        reasons.push("G\u00FCvenilir kurum ad\u0131 (\"".concat(brand, "\") resmi olmayan bir adreste ge\u00E7iyor \u2014 sahte site riski y\u00FCksek."));
                    }
                }
                else if (!knownOfficial) {
                    var main = getMainLabel(host);
                    if (main.length >= 4 && brand.length >= 4) {
                        var dist = levenshtein(main, brand);
                        if (dist > 0 && dist <= (brand.length <= 5 ? 1 : 2)) {
                            score += 34;
                            reasons.push("Alan ad\u0131 \"".concat(main, "\", bilinen marka \"").concat(brand, "\" ile \u00E7ok benziyor (typosquatting)."));
                        }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var _loop_1 = function (part) {
            if (SUSPICIOUS_PATHS.some(function (sp) { return part === sp || part.startsWith(sp + "-"); })) {
                score += 15;
                reasons.push("Ba\u011Flant\u0131 yolunda \u015F\u00FCpheli kelime var: \"/".concat(part, "\""));
                return "break";
            }
        };
        try {
            for (var _f = __values(path.split("/").filter(Boolean)), _g = _f.next(); !_g.done; _g = _f.next()) {
                var part = _g.value;
                var state_1 = _loop_1(part);
                if (state_1 === "break")
                    break;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var extMatch = path.match(/\.([a-z0-9]{2,5})(?:$|[?#])/i);
        if (extMatch && MALICIOUS_EXTENSIONS.includes(extMatch[1].toLowerCase())) {
            score += 40;
            reasons.push("Ba\u011Flant\u0131 do\u011Frudan bir \".".concat(extMatch[1], "\" kurulum/\u00E7al\u0131\u015Ft\u0131rma dosyas\u0131 indiriyor."));
        }
        if (text.length > 120) {
            score += 8;
            reasons.push("Bağlantı alışılmadık derecede uzun.");
        }
        score = Math.min(score, 100);
        return { score: score, reasons: __spreadArray([], __read(new Set(reasons)), false) };
    }
    function analyzeTextContent(raw) {
        var score = 0, reasons = [];
        var clean = raw.replace(/[\u200B-\u200F\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/g, "");
        var lower = clean.toLowerCase();
        var hits = 0;
        SCAM_PHRASES.forEach(function (p) {
            if (lower.includes(p)) {
                hits++;
                score += hits === 1 ? 22 : hits === 2 ? 16 : 10;
                reasons.push("Doland\u0131r\u0131c\u0131l\u0131k kal\u0131b\u0131: \"".concat(p, "\""));
            }
        });
        var urlMatch = clean.match(/https?:\/\/[^\s<>"']+/i) || clean.match(/[a-z0-9.-]+\.(com|net|org|tr|xyz|online|site|click|tk|top)\b/i);
        if (urlMatch) {
            var inner = analyzeUrlContent(urlMatch[0]);
            score += Math.round(inner.score * 0.5);
            inner.reasons.slice(0, 2).forEach(function (r) { return reasons.push("(Bağlantı) " + r); });
        }
        if (/(şifre|parola|otp|doğrulama kodu|cvv|cvc|kart no|iban|tc kimlik)/i.test(clean)) {
            score += 18;
            reasons.push("Mesaj doğrudan şifre, OTP, kart veya kimlik bilgisi talep ediyor gibi görünüyor.");
        }
        score = Math.min(score, 100);
        return { score: score, reasons: __spreadArray([], __read(new Set(reasons)), false) };
    }
    // GÜVENLİK: Karekod/link/SMS içeriğinden çıkarılan metinler (SSID, telefon numarası,
    // e-posta adresi vb.) tamamen kullanıcı/saldırgan kontrolündedir. Bunlar daha sonra
    // innerHTML ile ekrana yazılırken HTML olarak yorumlanmasını önlemek için kaçışlanır.
    function escapeHtmlShared(str) {
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    // Karekod içeriğinin türünü tanır (yalnızca link değil — Wi-Fi, telefon, SMS,
    // e-posta, kripto adresi, kartvizit ve düz metin dahil HER TÜR kamera taraması).
    function analyzeQrPayload(raw) {
        var e_4, _a;
        var text = String(raw).trim();
        if (/^WIFI:/i.test(text)) {
            var ssid = (text.match(/S:([^;]*)/i) || [])[1] || "(bilinmiyor)";
            var enc = (text.match(/T:([^;]*)/i) || [])[1] || "";
            var score = 0, reasons = [];
            if (!enc || /^nopass$/i.test(enc)) {
                score += 30;
                reasons.push("Bu Wi-Fi ağı şifresiz (açık) görünüyor — açık ağlarda trafiğin izlenebilir.");
            }
            reasons.push("Karekod, telefonunu \"".concat(ssid, "\" adl\u0131 Wi-Fi a\u011F\u0131na otomatik ba\u011Flamak istiyor."));
            reasons.push("Tanımadığın bir yerde (kafe, otopark, havalimanı) karşına çıkan Wi-Fi karekodlarını bağlanmadan önce işletmeye sor.");
            return { type: "Wi-Fi Ağı", score: Math.min(score, 100), reasons: reasons, meta: "SSID: ".concat(ssid) };
        }
        if (/^(tel:|SMSTO:|SMS:)/i.test(text)) {
            var isSms = /^(SMSTO:|SMS:)/i.test(text);
            var number = text.replace(/^(tel:|SMSTO:|SMS:)/i, "").split(":")[0];
            var score = 0, reasons = [];
            if (/^0?9\d{2}/.test(number.replace(/\D/g, ""))) {
                score += 35;
                reasons.push("Numara, Türkiye'de yüksek ücretli olabilen bir premium hat (9xx) formatında görünüyor.");
            }
            reasons.push(isSms ? "Karekod, \"".concat(number, "\" numaras\u0131na \u00F6nceden haz\u0131rlanm\u0131\u015F bir SMS g\u00F6ndermeni istiyor.") : "Karekod, do\u011Frudan \"".concat(number, "\" numaras\u0131n\u0131 araman\u0131 istiyor."));
            reasons.push("Tanımadığın numaraları aramadan/mesaj atmadan önce ait olduğu kurumu resmi kanaldan doğrula.");
            return { type: isSms ? "SMS Gönderimi" : "Telefon Araması", score: Math.min(score, 100), reasons: reasons, meta: number };
        }
        if (/^mailto:/i.test(text)) {
            var email = text.replace(/^mailto:/i, "").split("?")[0];
            var domain_1 = (email.split("@")[1] || "").toLowerCase();
            var score = 0, reasons = ["Karekod \"".concat(email, "\" adresine e-posta g\u00F6ndermeni istiyor.")];
            var known = Object.values(BRANDS).some(function (list) { return isOfficialDomain(domain_1, list); });
            try {
                for (var _b = __values(Object.entries(BRANDS)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), brand = _d[0], official = _d[1];
                    if (domain_1.includes(brand) && !isOfficialDomain(domain_1, official)) {
                        score += 35;
                        reasons.push("E-posta alan ad\u0131 \"".concat(domain_1, "\", \"").concat(brand, "\" markas\u0131n\u0131 taklit ediyor olabilir."));
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return { type: "E-posta", score: Math.min(score, 100), reasons: reasons, meta: email };
        }
        if (/^(bitcoin:|ethereum:|litecoin:|BC1|bc1)/i.test(text)) {
            var addr = text.replace(/^(bitcoin:|ethereum:|litecoin:)/i, "").split("?")[0];
            return { type: "Kripto Para Adresi", score: 55,
                reasons: [
                    "Karekod bir kripto para adresine (\"".concat(addr.slice(0, 18), "\u2026\") \u00F6deme yapman\u0131 istiyor."),
                    "Kripto ödemeleri geri alınamaz — göndermeden önce alıcının kimliğini mutlaka doğrula.",
                    "'Yatırım fırsatı', 'iki katına çıkar' gibi vaatlerle gelen kripto karekodları neredeyse her zaman dolandırıcılıktır."
                ], meta: addr };
        }
        if (/^BEGIN:VCARD/i.test(text)) {
            var name_1 = (text.match(/FN:(.*)/i) || [])[1] || "(isimsiz)";
            return { type: "Kartvizit (vCard)", score: 5,
                reasons: ["Karekod bir kişi rehberine kişi eklemek istiyor: " + name_1 + ".", "Tanımadığın biri veriyorsa, rehberine eklemeden önce kimliğini teyit et."],
                meta: name_1 };
        }
        if (/^https?:\/\//i.test(text) || /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(\/|$|\?)/i.test(text)) {
            var r_1 = analyzeUrlContent(text);
            return { type: "Bağlantı / Link", score: r_1.score, reasons: r_1.reasons.length ? r_1.reasons : ["Belirgin bir tehdit kalıbına rastlanmadı, yine de temkinli ol."], meta: text };
        }
        var r = analyzeTextContent(text);
        return { type: "Düz Metin", score: r.score, reasons: r.reasons.length ? r.reasons : ["Belirgin bir dolandırıcılık kalıbına rastlanmadı."], meta: text.slice(0, 80) };
    }
    function qrVerdict(score) {
        if (score < 25)
            return { label: "DÜŞÜK RİSK", cls: "safe" };
        if (score < 55)
            return { label: "DİKKAT", cls: "warn" };
        return { label: "YÜKSEK RİSK", cls: "danger" };
    }
    /* ======================= KAREKOD UI + KAMERA ======================= */
    (function initQr() {
        var qrOpenBtn = document.getElementById("qrOpenBtn");
        var qrModal = document.getElementById("qrModal");
        if (!qrOpenBtn || !qrModal)
            return;
        var qrVideo = document.getElementById("qrVideo");
        var qrStatus = document.getElementById("qrStatus");
        var qrCloseBtn = document.getElementById("qrCloseBtn");
        var qrResult = document.getElementById("qrResult");
        var qrBadge = document.getElementById("qrBadge");
        var qrScore = document.getElementById("qrScore");
        var qrRaw = document.getElementById("qrRaw");
        var qrFindings = document.getElementById("qrFindings");
        var qrManualInput = document.getElementById("qrManualInput");
        var qrManualBtn = document.getElementById("qrManualBtn");
        var stream = null, rafId = null, stopped = true;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d", { willReadFrequently: true });
        var detector = null;
        if ("BarcodeDetector" in window) {
            try {
                detector = new BarcodeDetector({ formats: ["qr_code"] });
            }
            catch (e) {
                detector = null;
            }
        }
        function renderResult(raw) {
            var r = analyzeQrPayload(raw);
            var v = qrVerdict(r.score);
            qrResult.classList.remove("hidden");
            qrBadge.textContent = "".concat(v.label, " \u00B7 ").concat(r.type);
            qrBadge.className = "qr-badge " + v.cls;
            qrScore.textContent = "Risk Puan\u0131: ".concat(r.score, "/100");
            qrRaw.textContent = raw.length > 220 ? raw.slice(0, 220) + "…" : raw;
            qrFindings.innerHTML = "";
            r.reasons.forEach(function (reason) {
                var div = document.createElement("div");
                var t = r.score >= 55 ? "bad" : r.score >= 25 ? "warn" : "ok";
                div.className = "finding ".concat(t);
                div.innerHTML = "<span>".concat(t === "ok" ? "✓" : t === "warn" ? "!" : "✕", "</span><span>").concat(escapeHtmlShared(reason), "</span>");
                qrFindings.appendChild(div);
            });
            qrResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
            if (v.cls === "danger") {
                showAppNotification("Tehlikeli Karekod!", "Az önce taradığın karekod yüksek riskli görünüyor. Detaylar için uygulamayı aç.", "qr-danger");
            }
        }
        function openModal() { qrModal.classList.remove("hidden"); qrStatus.textContent = "Kamera başlatılıyor…"; }
        function stopCamera() {
            stopped = true;
            if (rafId)
                cancelAnimationFrame(rafId);
            rafId = null;
            if (stream) {
                stream.getTracks().forEach(function (t) { return t.stop(); });
                stream = null;
            }
            if (qrVideo)
                qrVideo.srcObject = null;
        }
        function closeModal() { qrModal.classList.add("hidden"); stopCamera(); }
        function startCamera() {
            return __awaiter(this, void 0, void 0, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                                qrStatus.textContent = "Bu tarayıcı kamera erişimini desteklemiyor.";
                                return [2 /*return*/];
                            }
                            if (window.isSecureContext === false) {
                                qrStatus.textContent = "Kamera için güvenli bağlantı (HTTPS) gerekli.";
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false })];
                        case 2:
                            stream = _a.sent();
                            qrVideo.srcObject = stream;
                            return [4 /*yield*/, qrVideo.play()];
                        case 3:
                            _a.sent();
                            stopped = false;
                            qrStatus.textContent = "Karekodu çerçeve içine hizala…";
                            tick();
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _a.sent();
                            if (err_1 && err_1.name === "NotAllowedError")
                                qrStatus.textContent = "Kamera izni reddedildi. Site ayarlarından izin ver.";
                            else if (err_1 && err_1.name === "NotFoundError")
                                qrStatus.textContent = "Kullanılabilir bir kamera bulunamadı.";
                            else
                                qrStatus.textContent = "Kamera başlatılamadı.";
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        function tick() {
            return __awaiter(this, void 0, void 0, function () {
                var code, results, frame, res, e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (stopped || !qrVideo)
                                return [2 /*return*/];
                            if (!(qrVideo.readyState === qrVideo.HAVE_ENOUGH_DATA && qrVideo.videoWidth > 0)) return [3 /*break*/, 6];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            code = null;
                            if (!detector) return [3 /*break*/, 3];
                            return [4 /*yield*/, detector.detect(qrVideo)];
                        case 2:
                            results = _a.sent();
                            if (results && results.length)
                                code = results[0].rawValue;
                            return [3 /*break*/, 4];
                        case 3:
                            if (typeof jsQR === "function") {
                                canvas.width = qrVideo.videoWidth;
                                canvas.height = qrVideo.videoHeight;
                                ctx.drawImage(qrVideo, 0, 0, canvas.width, canvas.height);
                                frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
                                res = jsQR(frame.data, frame.width, frame.height, { inversionAttempts: "dontInvert" });
                                if (res && res.data)
                                    code = res.data;
                            }
                            else {
                                qrStatus.textContent = "Karekod çözücü yükleniyor, birkaç saniye bekle…";
                            }
                            _a.label = 4;
                        case 4:
                            if (code) {
                                closeModal();
                                renderResult(code);
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            e_5 = _a.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            if (!stopped)
                                rafId = requestAnimationFrame(tick);
                            return [2 /*return*/];
                    }
                });
            });
        }
        qrOpenBtn.addEventListener("click", function () { openModal(); startCamera(); });
        qrCloseBtn.addEventListener("click", closeModal);
        qrModal.addEventListener("click", function (e) { if (e.target === qrModal)
            closeModal(); });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !qrModal.classList.contains("hidden"))
            closeModal(); });
        if (qrManualBtn) {
            qrManualBtn.addEventListener("click", function () {
                var val = qrManualInput.value.trim();
                if (!val)
                    return;
                renderResult(val);
            });
        }
    })();
    /* ======================= TARAMA (BAĞLANTI / SMS) + GEÇMİŞ ======================= */
    (function initScan() {
        var scanTabs = document.getElementById("scanTabs");
        var scanInput = document.getElementById("scanInput");
        var scanBtn = document.getElementById("scanBtn");
        if (!scanTabs || !scanInput || !scanBtn)
            return;
        var scanResult = document.getElementById("scanResult");
        var scanBadge = document.getElementById("scanBadge");
        var scanScore = document.getElementById("scanScore");
        var scanFindings = document.getElementById("scanFindings");
        var historyListEl = document.getElementById("scanHistoryList");
        var clearHistoryBtn = document.getElementById("clearHistoryBtn");
        var scanMode = "link";
        scanTabs.querySelectorAll("[data-scanmode]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                scanMode = btn.dataset.scanmode;
                scanTabs.querySelectorAll("[data-scanmode]").forEach(function (b) { return b.classList.toggle("active", b === btn); });
                scanInput.placeholder = scanMode === "link"
                    ? "https:// ile başlayan bağlantıyı buraya yapıştır…"
                    : "Gelen SMS veya e-posta metnini buraya yapıştır…";
            });
        });
        function escapeHtml(str) {
            return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        }
        function renderHistory() {
            if (!historyListEl)
                return;
            var history = [];
            try {
                history = JSON.parse(localStorage.getItem("ases_history") || "[]");
            }
            catch (e) {
                history = [];
            }
            if (history.length === 0) {
                historyListEl.innerHTML = '<p class="empty">Henüz tarama yapılmadı.</p>';
                return;
            }
            historyListEl.innerHTML = history.map(function (item) {
                var v = qrVerdict(item.score);
                var typeLabel = item.type === "link" ? "Bağlantı" : "Mesaj";
                return "<div class=\"history-item\">\n          <div>\n            <div class=\"h-text\" title=\"".concat(escapeHtml(item.input), "\">").concat(escapeHtml(item.input), "</div>\n            <div class=\"h-meta\">").concat(item.date, " \u00B7 ").concat(typeLabel, "</div>\n          </div>\n          <span class=\"h-badge ").concat(v.cls, "\">").concat(v.label, " (").concat(item.score, ")</span>\n        </div>");
            }).join("");
        }
        function saveHistory(type, rawInput, score) {
            try {
                var history_1 = JSON.parse(localStorage.getItem("ases_history") || "[]");
                history_1.unshift({
                    date: new Date().toLocaleString("tr-TR"),
                    type: type,
                    input: rawInput.substring(0, 80) + (rawInput.length > 80 ? "…" : ""),
                    score: score
                });
                localStorage.setItem("ases_history", JSON.stringify(history_1.slice(0, 30)));
                renderHistory();
            }
            catch (e) { /* localStorage kullanılamıyor olabilir */ }
        }
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener("click", function () {
                if (confirm("Tüm tarama geçmişi silinecek. Emin misin?")) {
                    localStorage.removeItem("ases_history");
                    renderHistory();
                }
            });
        }
        scanBtn.addEventListener("click", function () {
            var raw = scanInput.value.trim();
            if (!raw) {
                alert("Lütfen taranacak bir bağlantı veya mesaj gir.");
                return;
            }
            scanBtn.disabled = true;
            scanBtn.textContent = "TARANIYOR…";
            setTimeout(function () {
                scanBtn.disabled = false;
                scanBtn.textContent = "TARA";
                var r = scanMode === "link" ? analyzeUrlContent(raw) : analyzeTextContent(raw);
                var v = qrVerdict(r.score);
                scanResult.classList.remove("hidden");
                scanBadge.textContent = v.label;
                scanBadge.className = "qr-badge " + v.cls;
                scanScore.textContent = "Risk Puan\u0131: ".concat(r.score, "/100");
                scanFindings.innerHTML = "";
                var reasons = r.reasons.length ? r.reasons : ["Belirgin bir dolandırıcılık veya şüpheli yapı kalıbına rastlanmadı. Yine de temkinli ol."];
                reasons.forEach(function (reason) {
                    var div = document.createElement("div");
                    var t = r.score >= 55 ? "bad" : r.score >= 25 ? "warn" : "ok";
                    div.className = "finding ".concat(t);
                    div.innerHTML = "<span>".concat(t === "ok" ? "✓" : t === "warn" ? "!" : "✕", "</span><span>").concat(escapeHtmlShared(reason), "</span>");
                    scanFindings.appendChild(div);
                });
                saveHistory(scanMode, raw, r.score);
                if (v.cls === "danger") {
                    showAppNotification("Şüpheli İçerik Tespit Edildi", "Az önce taradığın link/mesaj yüksek riskli görünüyor. Detaylar için uygulamayı aç.", "scan-danger");
                }
            }, 700);
        });
        renderHistory();
    })();
    /* ======================= ASES ASİSTAN (YEREL SOHBET MOTORU) =======================
       Not: Bu bir yapay zeka API'sine bağlanmaz. Tamamen cihazda çalışan, anahtar kelime
       eşleştirmeli yerel bir bilgi motorudur — hiçbir mesaj internete gönderilmez. Her konu
       için birden fazla cevap kalıbı tutulur ve sırayla döndürülür, böylece aynı soruya hep
       aynı cevap verilmez. */
    var assistantTopics = [
        { id: "sifre", keywords: ["şifre", "sifre", "parola", "şifremi", "şifre gücü", "güçlü şifre", "zayıf şifre", "şifre oluştur", "şifre değiştir", "kaç karakter", "parolamı"],
            responses: [
                "Güçlü bir şifre en az 12 karakter olmalı; büyük-küçük harf, rakam ve sembol içermeli. Şifre Sağlığı sekmesinden kendi şifreni test edebilirsin, hiçbir şey sunucuya gönderilmez.",
                "Şifreni farklı hesaplarda tekrar kullanma. 'Şifre Sağlığı' modülüne gidip anında güçlü mü zayıf mı görebilirsin.",
                "En sık çalınan şifreler arasında '123456' ve 'qwerty' gibi basit kalıplar var. Bunun yerine akılda kalıcı bir cümle kullan, örneğin 'Kahvemi7SütsüzSeverim!'."
            ] },
        { id: "2fa", keywords: ["2fa", "iki adımlı", "iki adimli", "iki faktörlü", "doğrulama kodu", "otp kodu", "dogrulama"],
            responses: [
                "İki adımlı doğrulama (2FA), şifren çalınsa bile hesabına girişi zorlaştırır. E-posta ve bankacılık hesaplarında mutlaka açmanı öneririm.",
                "2FA açıkken giriş için şifrenin yanında telefonuna gelen bir kod da gerekir. Genelde Ayarlar > Güvenlik bölümünden açabilirsin."
            ] },
        { id: "phishing", keywords: ["phishing", "oltalama", "dolandırıcılık", "dolandirici", "sahte link", "sahte site", "sahte mesaj", "tuzak", "kandırıl"],
            responses: [
                "Bilmediğin bir linke tıklamadan önce adres çubuğunu kontrol et. Şüpheliysen 'Tarama' modülüne yapıştırıp test edebilirsin.",
                "Bankalar SMS ile şifre veya kart bilgisi istemez. Bir mesaj aciliyet hissi yaratıyorsa büyük ihtimalle dolandırıcılıktır.",
                "'Hesabın askıya alındı' gibi panik yaratan mesajlara hemen tıklama, önce Farkındalık İpuçları'ndaki benzer örneklere göz at."
            ] },
        { id: "banka", keywords: ["banka", "kart bilgisi", "hesabım çalındı", "otp", "iban", "yetkisiz işlem", "kartım çalındı"],
            responses: [
                "Bankan seni asla telefonla arayıp OTP kodu istemez. Böyle bir talep gelirse kapat, bankanı resmi hattından ara.",
                "Kartın veya hesabınla ilgili şüpheli bir işlem gördüysen bankanın 7/24 çağrı merkezini arayıp hemen bloke ettir. Acil Durum Rehberi'nde adım adım anlatıyorum."
            ] },
        { id: "wifi", keywords: ["wifi", "wi-fi", "kablosuz ağ", "halka açık ağ", "hotspot"],
            responses: [
                "Kafe, havaalanı gibi halka açık Wi-Fi'lerde bankacılık işlemi yapma, mümkünse mobil verini kullan.",
                "Ev modeminin varsayılan şifresini değiştirmeyi unutma, fabrika şifreleri internette herkese açık listelerde bulunuyor."
            ] },
        { id: "qr", keywords: ["karekod", "qr kod", "qr", "kare kod", "kamera tarama"],
            responses: [
                "Karekod Tarama modülünden karşına çıkan her QR kodu kamerayla test edebilirsin, gerçek adresi görmeden ödeme yapma.",
                "Restoran veya otoparkta üzerine yapıştırılmış sahte QR kodlar seni sahte bir ödeme sayfasına yönlendirebilir, dikkatli ol."
            ] },
        { id: "virus", keywords: ["virüs", "virus", "trojan", "casus yazılım", "malware", "zararlı yazılım"],
            responses: [
                "Virüs Türleri modülünde trojan, casus yazılım gibi tehditleri ve nasıl bulaştıklarını anlatıyorum.",
                "Bilinmeyen kaynaklardan APK indirmek en yaygın virüs bulaşma yollarından biri, sadece resmi mağazaları kullan."
            ] },
        { id: "telefon", keywords: ["telefonum çalındı", "telefonum kayboldu", "telefon kayıp", "çalıntı telefon", "kayıp telefon"],
            responses: [
                "Önce Google (Find My Device) veya Apple (Find My iPhone) üzerinden telefonu kilitle, sonra operatörüne hattını dondurmasını söyle. Acil Durum Rehberi'nde tüm adımlar var.",
                "Telefon kaybolduğunda önce başka bir cihazdan hesaplarının şifrelerini değiştir, sonra en yakın karakola IMEI ile bildirimde bulun."
            ] },
        { id: "sosyal", keywords: ["sosyal medya", "instagram", "facebook", "whatsapp", "hesabım çalındı", "hesabim calindi"],
            responses: [
                "Hesabın çalındıysa hemen şifreni değiştir, tüm cihazlardan oturumu kapat ve 2FA aç. Acil Durum Rehberi'nde detaylı adımlar var.",
                "Doğum tarihi, telefon numarası gibi bilgileri herkese açık paylaşma, gizlilik ayarlarını gözden geçir."
            ] },
        { id: "aile", keywords: ["çocuğum", "cocugum", "aile güvenliği", "ebeveyn kontrolü", "çocuk telefon", "çocuğuma"],
            responses: [
                "Google Family Link veya Apple Ekran Süresi ile çocuğunun ekran süresini ve uygulama izinlerini yönetebilirsin. Aile Güvenliği modülünde detaylar var.",
                "Çocuğunla açık iletişim kurmak yasaklamaktan daha koruyucudur; internette rahatsız olduğunda sana gelebileceğini bilmesi önemli."
            ] },
        { id: "izinler", keywords: ["uygulama izni", "konum izni", "kamera izni", "mikrofon izni", "izinlerini"],
            responses: [
                "Bir fener uygulamasının konumuna ihtiyacı yoktur. Telefon ayarlarından uygulama izinlerini düzenli kontrol et ve gereksiz olanları kapat."
            ] },
        { id: "guncelleme", keywords: ["güncelleme", "guncelleme", "güncel değil", "update"],
            responses: [
                "Güncellemelerin çoğu bilinen güvenlik açıklarını kapatır, 'sonra hatırlat' yerine en kısa sürede güncelle."
            ] },
        { id: "vpn", keywords: ["vpn"],
            responses: [
                "VPN, özellikle halka açık Wi-Fi'lerde trafiğini şifreler ama şifre yönetimi ve 2FA kadar kritik değildir; güvenilir bir sağlayıcı seçmek önemli."
            ] },
        { id: "selam", keywords: ["merhaba", "selam", "iyi günler", "naber", "selamlar"],
            responses: [
                "Merhaba! Siber güvenlikle ilgili aklına takılan bir şey var mı?",
                "Selam, sana nasıl yardımcı olabilirim?"
            ] },
        { id: "tesekkur", keywords: ["teşekkür", "tesekkur", "sağol", "sagol", "eyvallah"],
            responses: [
                "Rica ederim, güvende kal!",
                "Ne demek, başka sorun olursa buradayım."
            ] },
        { id: "kimlik", keywords: ["sen kimsin", "nesin", "yapay zeka mısın", "kimsin"],
            responses: [
                "Ben ASES'in yerel asistanıyım. Cihazında çalışırım ve hiçbir mesajını dışarıya göndermem."
            ] }
    ];
    var fallbackResponses = [
        "Bunu tam olarak anlayamadım. Şifre, dolandırıcılık, Wi-Fi, karekod, virüs ya da aile güvenliği gibi konularda soru sorabilirsin.",
        "Bu konuda net bir bilgim yok, ama uygulamadaki modüllerden birine bakmak isteyebilirsin: Şifre Sağlığı, Farkındalık İpuçları, Acil Durum ya da Aile Güvenliği.",
        "Sanırım bunu farklı bir şekilde sormalısın. Örneğin 'şifrem güvenli mi' ya da 'wifi güvenliği' gibi dene."
    ];
    var assistantState = { topicIndex: {}, fallbackIndex: 0 };
    function normalizeTr(str) {
        return str
            .toLocaleLowerCase("tr")
            .replace(/[.,!?;:'"()]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }
    function assistantReply(userText) {
        var input = normalizeTr(userText);
        var bestTopic = null, bestScore = 0;
        assistantTopics.forEach(function (topic) {
            var score = 0;
            topic.keywords.forEach(function (k) { if (input.includes(normalizeTr(k)))
                score++; });
            if (score > bestScore) {
                bestScore = score;
                bestTopic = topic;
            }
        });
        if (bestTopic) {
            var i = assistantState.topicIndex[bestTopic.id] || 0;
            var reply_1 = bestTopic.responses[i % bestTopic.responses.length];
            assistantState.topicIndex[bestTopic.id] = i + 1;
            return reply_1;
        }
        var reply = fallbackResponses[assistantState.fallbackIndex % fallbackResponses.length];
        assistantState.fallbackIndex++;
        return reply;
    }
    var chatWindow = document.getElementById("chatWindow");
    var chatInput = document.getElementById("chatInput");
    var chatSend = document.getElementById("chatSend");
    var chatSuggestions = document.getElementById("chatSuggestions");
    function addChatMsg(text, who) {
        var div = document.createElement("div");
        div.className = "chat-msg ".concat(who);
        div.textContent = text;
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return div;
    }
    function sendChat(text) {
        var trimmed = text.trim();
        if (!trimmed)
            return;
        addChatMsg(trimmed, "user");
        chatInput.value = "";
        var typing = document.createElement("div");
        typing.className = "chat-msg bot typing";
        typing.innerHTML = "<span></span><span></span><span></span>";
        chatWindow.appendChild(typing);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        setTimeout(function () {
            typing.remove();
            addChatMsg(assistantReply(trimmed), "bot");
        }, 500 + Math.random() * 400);
    }
    if (chatWindow) {
        addChatMsg("Merhaba! Ben ASES Asistan. Şifreler, dolandırıcılık, Wi-Fi, karekod, virüsler veya aile güvenliği hakkında bana soru sorabilirsin.", "bot");
        ["Şifrem güvenli mi?", "Wifi güvenliği nedir?", "Telefonum çalındı", "Karekod güvenli mi?"].forEach(function (q) {
            var chip = document.createElement("button");
            chip.className = "chip";
            chip.textContent = q;
            chip.addEventListener("click", function () { return sendChat(q); });
            chatSuggestions.appendChild(chip);
        });
        chatSend.addEventListener("click", function () { return sendChat(chatInput.value); });
        chatInput.addEventListener("keydown", function (e) { if (e.key === "Enter")
            sendChat(chatInput.value); });
    }
    /* ======================= SERVICE WORKER ======================= */
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("sw.js").catch(function () { });
        });
    }
})();


