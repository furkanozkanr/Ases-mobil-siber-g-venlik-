# ASES — Mobil Siber Güvenlik

Vatandaşlara yönelik, tamamen ücretsiz ve gizliliğe önem veren mobil siber güvenlik uygulaması. Bir PWA (Progressive Web App) olarak geliştirilmiştir; tarayıcı üzerinden çalışır ve telefona gerçek bir uygulama gibi yüklenebilir.

Adını, Osmanlı Devleti'nde geceleri şehirlerin güvenliğini sağlayan özel muhafızlardan alır. Tıpkı o tarihsel bekçiler gibi, ASES da cihazınızda arka planda sessizce nöbet tutar.

## Özellikler

- **🔒 Şifre Sağlığı** — Şifrenizi tamamen cihazda analiz eder (uzunluk, karmaşıklık, yaygın şifre listeleri, klavye sırası gibi zayıf kalıplar). Hiçbir şifre sunucuya gönderilmez.
- **💡 Farkındalık** — Dolandırıcılık, bankacılık, sosyal medya ve Wi-Fi güvenliği hakkında kategorilere ayrılmış ipuçları.
- **🚨 Acil Durum Rehberi** — Hesap çalınması, banka bilgisi sızıntısı, telefon kaybı gibi durumlarda adım adım yol gösterir, resmi başvuru kanallarına yönlendirir.
- **🛡️ Aile Güvenliği** — Ebeveynler için çocuğun cihazında ebeveyn kontrolü, izin denetimi ve gizlilik ayarları tavsiyeleri.
- **Karekod Tarama** — Kamerayla taranan QR kodlarının risk seviyesini (düşük / dikkat / yüksek) anında gösterir.
- **Tarama** — Şüpheli link veya SMS/mesaj metinlerini yapıştırıp risk analizi yaptırma.
- **🦠 Virüs Türleri** — Trojan, casus yazılım gibi tehditlere dair referans bilgisi.
- **ASES Asistan** — Cihazda çalışan, anahtar kelime eşleştirmeli yerel bir sohbet motoru. Hiçbir mesaj dışarıya gönderilmez.
- **Hızlı Güvenlik Kontrolü** — Ana sayfada, temel güvenlik alışkanlıklarınızı gösteren bir gösterge.
- **Bildirimler** — Tehlikeli bir karekod veya zayıf şifre tespit edildiğinde, uygulama logolu yerel bildirim gösterir.

## Gizlilik İlkesi

ASES, tasarım gereği hiçbir kişisel veriyi (şifre, taranan link, sohbet mesajı) herhangi bir sunucuya göndermez. Tüm analizler ve öneriler tamamen cihaz üzerinde, JavaScript ile çalışır.

## Teknik Yapı

- Salt HTML / CSS / JavaScript (framework yok), tek sayfa uygulaması
- Service Worker ile çevrimdışı çalışma desteği
- Web App Manifest ile "ana ekrana ekle" / PWA kurulumu
- Karekod okuma için [jsQR](https://github.com/cozmo/jsQR) kütüphanesi (CDN üzerinden)
- Eski cihaz/tarayıcı uyumluluğu için ES5'e çevrilmiş JavaScript ve statik CSS renk yedekleri

## Kurulum / Yayınlama

Bu proje statik dosyalardan oluşur, herhangi bir statik barındırma servisinde (GitHub Pages, Netlify, Vercel vb.) ücretsiz olarak yayınlanabilir.

1. Bu repodaki tüm dosyaları barındırma servisine yükleyin.
2. Siteyi mobil tarayıcıda açın.
3. Tarayıcı menüsünden "Ana ekrana ekle" seçeneğini kullanarak uygulamayı telefona yükleyin.

## Lisans

Bu proje özel mülkiyetlidir — tüm hakları saklıdır. Ayrıntılar için [`LICENSE.txt`](./LICENSE.txt) dosyasına bakınız.

## İletişim

Telif hakkı, iş birliği ve lisans sorguları için proje sahibiyle iletişime geçiniz.

---

**Furkan Özkan** — Proje Sahibi

