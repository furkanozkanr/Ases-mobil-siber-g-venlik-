# ASES — Mobil Siber Güvenlik

Vatandaşlara yönelik, tamamen ücretsiz ve gizliliğe önem veren mobil siber güvenlik uygulaması. Bir PWA (Progressive Web App) olarak geliştirilmiştir; tarayıcı üzerinden çalışır ve telefona gerçek bir uygulama gibi yüklenebilir.

Adını, Osmanlı Devleti'nde geceleri şehirlerin güvenliğini sağlayan özel muhafızlardan alır.

> **ASES bir antivirüs değildir.** Telefonunuzdaki uygulamaları, dosyaları veya ağ trafiğini taramaz; arka planda çalışıp sizi korumaz. Bir **bilgilendirme ve farkındalık aracıdır**: size verdiğiniz içeriği (şifre, bağlantı, mesaj, karekod) inceler ve dolandırıcılığa karşı bilgi verir.

## Özellikler

- **🔒 Şifre Sağlığı** — Şifrenizi tamamen cihazda analiz eder (uzunluk, karmaşıklık, yaygın şifre listeleri, klavye sırası gibi zayıf kalıplar). Hiçbir şifre sunucuya gönderilmez.
- **💡 Farkındalık** — Dolandırıcılık, bankacılık, sosyal medya ve Wi-Fi güvenliği hakkında kategorilere ayrılmış ipuçları.
- **🚨 Acil Durum Rehberi** — Hesap çalınması, banka bilgisi sızıntısı, telefon kaybı gibi durumlarda adım adım yol gösterir, resmi başvuru kanallarına yönlendirir.
- **🛡️ Aile Güvenliği** — Ebeveynler için çocuğun cihazında ebeveyn kontrolü, izin denetimi ve gizlilik ayarları tavsiyeleri.
- **Karekod Tarama** — Kamerayla taranan karekodların risk seviyesini (düşük / dikkat / yüksek) gösterir. Bağlantı, Wi-Fi, telefon, SMS, e-posta, kripto adresi ve kartvizit içeriklerini tanır.
- **Tarama** — Şüpheli link veya SMS/mesaj metinlerini yapıştırıp risk analizi yaptırma; son taramalar cihazda listelenir.
- **🦠 Virüs Türleri** — Virüs, Trojan, casus yazılım, fidye yazılımı ve oltalama hakkında referans bilgisi.
- **ASES Asistan** — Cihazda çalışan, anahtar kelime eşleştirmeli yerel bir sohbet motoru. Hiçbir mesaj dışarıya gönderilmez.
- **Hızlı Güvenlik Kontrolü** — Ana sayfada, temel güvenlik alışkanlıklarınızı gösteren bir gösterge.
- **Bildirimler** — Uygulama açıkken tehlikeli görünen bir karekod veya zayıf şifre tespit edilirse yerel bildirim gösterir; günlük ipucu bildirimi de yine uygulama açılınca gösterilir.
- **Renk Teması** — Gümüş, kırmızı, mavi, yeşil ve mor temalar.

## Gizlilik — Neyi Topluyoruz, Neyi Toplamıyoruz?

**Toplamıyoruz:** Yazdığınız şifre, yapıştırdığınız bağlantı veya mesaj, taradığınız karekod, sohbet mesajlarınız ve kamera görüntüsü hiçbir sunucuya gönderilmez. Tüm analizler cihazınızda, JavaScript ile yapılır. Kayıt, giriş veya hesap yoktur; reklam ve takip aracı kullanılmaz.

**Cihazınızda saklananlar:** Tema tercihiniz, kapatılan banner bilgisi ve son 30 tarama kaydı (kısaltılmış metin ve puan) yalnızca tarayıcınızın yerel depolamasında (`localStorage`) tutulur. "Temizle" düğmesi veya tarayıcı verilerini silmek bunları kaldırır.

**Dışarıyla temas eden kısımlar (dürüst not):**
- **Google Fonts:** Yazı tipleri Google'ın sunucularından yüklenir; Google bu istekte IP adresinizi görebilir.
- **cdnjs (Cloudflare):** Yedek karekod çözücü (jsQR) buradan yüklenir; Cloudflare bu istekte IP adresinizi görebilir.
- **Barındırma (Vercel):** Siteyi sunan sağlayıcı, her web sitesinde olduğu gibi standart sunucu kayıtları (IP, tarayıcı, istek zamanı) tutabilir. Uygulama bu kayıtlara kişisel içerik göndermez.

Bu yüklemeler dışında uygulama internete veri göndermez; ilk açılıştan sonra büyük kısmı çevrimdışı çalışır.

**Kamera:** Yalnızca "Kamerayı aç" düğmesine bastığınızda ve tarayıcı izin verdiğinde açılır; karekod okunduğunda veya pencere kapatıldığında kapanır. Görüntü kaydedilmez.

## Sınırlar — ASES Ne Yapamaz?

- Telefonunuzdaki virüs, casus yazılım veya zararlı uygulamaları **tespit edemez ve temizleyemez**.
- Ağınızı, Wi-Fi bağlantınızı veya diğer uygulamaları **izlemez**.
- **Arka planda çalışmaz.** Bildirimler yalnızca uygulama/sayfa açıkken yerel olarak (sunucu olmadan) gösterilir; kapalıyken uyarı gelmez.
- Karekod, bağlantı ve mesaj analizleri **kural tabanlı tahmindir.** Bilinen dolandırıcılık kalıplarına göre puan verir; gerçek bir tehdit veritabanına bağlı değildir. "Düşük risk" sonucu "güvenli" demek değildir, "yüksek risk" sonucu da her zaman dolandırıcılık olduğu anlamına gelmez.
- Şifre analizi yalnızca uzunluk, çeşitlilik ve yaygın kalıplara bakar; şifrenizin bir veri sızıntısında bulunup bulunmadığını **kontrol etmez.**
- ASES Asistan bir yapay zekâ değildir; hazır cevaplar arasında anahtar kelimeyle seçim yapar. Hukuki, finansal veya teknik uzman tavsiyesinin yerini tutmaz.
- Acil Durum Rehberi genel yönlendirmedir. Para kaybı veya hesap ele geçirilmesi durumunda önce bankanızla / ilgili platformla ve yetkili kurumlarla iletişime geçin. Can güvenliği söz konusuysa 112'yi arayın.

## Teknik Yapı

- Salt HTML / CSS / JavaScript (framework yok), tek sayfa uygulaması
- Service Worker ile çevrimdışı çalışma desteği
- Web App Manifest ile "ana ekrana ekle" / PWA kurulumu
- Karekod okuma: tarayıcının yerleşik `BarcodeDetector` özelliği; desteklemeyen tarayıcılarda (ör. iOS Safari, Firefox) yedek olarak [jsQR](https://github.com/cozmo/jsQR) kütüphanesi (cdnjs üzerinden)
- Eski cihaz/tarayıcı uyumluluğu için ES5'e çevrilmiş JavaScript ve statik CSS renk yedekleri

## Dosyalar

| Dosya | Görevi |
| --- | --- |
| `index.html` | Sayfa yapısı ve güvenlik (CSP) ayarı |
| `app.js` | Tüm uygulama mantığı |
| `style.css` | Görünüm ve temalar |
| `sw.js` | Çevrimdışı çalışma / önbellek |
| `manifest.json` | PWA kurulum bilgileri |
| `vercel.json`, `_headers` | Güvenlik başlıkları (Vercel / Netlify) |

## Kurulum / Yayınlama

Proje statik dosyalardan oluşur, herhangi bir statik barındırma servisinde (Vercel, GitHub Pages, Netlify vb.) ücretsiz yayınlanabilir.

1. Bu repodaki tüm dosyaları (klasörün içindekileri) GitHub deposuna yükleyin.
2. Vercel'de depoyu içe aktarın; Framework Preset olarak **Other** seçin, build komutu gerekmez.
3. Siteyi mobil tarayıcıda açın (kamera ve PWA için HTTPS gerekir, Vercel bunu otomatik sağlar).
4. Tarayıcı menüsünden **"Ana ekrana ekle"** ile uygulamayı telefona yükleyin.

### Güncelleme yaparken

Dosyaları değiştirdikten sonra `sw.js` içindeki `CACHE_NAME` sürümünü artırın (ör. `ases-v10` → `ases-v11`). Aksi halde kullanıcılar eski önbelleği görmeye devam edebilir.

## Lisans

Bu proje özel mülkiyetlidir — tüm hakları saklıdır. Ayrıntılar için [`License.txt`](./License.txt) dosyasına bakınız.

## İletişim

Telif hakkı, iş birliği ve lisans sorguları için proje sahibiyle iletişime geçiniz.

---

**Furkan Özkan** — Proje Sahibi
