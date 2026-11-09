/* Günün ipuçları — hem sayfa (app.js) hem de service worker (sw.js) bu dosyayı kullanır.
   Yeni ipucu eklemek için listenin sonuna bir satır ekle. Her gün sırayla bir sonraki ipucu gösterilir. */
var ASES_TIPS = [
    "Bir bağlantıya tıklamadan önce üzerine uzun basarak gerçek adresini kontrol et. Kısaltılmış linkler çoğu zaman gizli bir tuzak taşır.",
    "Bankan asla SMS veya telefonla şifre, OTP kodu ya da kart bilgisi istemez. Böyle bir talep gelirse hemen kapat ve bankanı resmi hattından ara.",
    "Kargo takip linki gönderdiğini iddia eden mesajlarda dikkatli ol; gerçek takip bilgisini firmanın resmi uygulamasından kontrol et.",
    "'Hesabın askıya alındı' gibi aciliyet hissi yaratan mesajlar klasik dolandırıcılık taktiğidir. Panik yerine doğrulama yap.",
    "Wi-Fi şifreni paylaşırken misafir ağı (guest network) kullan, ana ağını yabancılara açma.",
    "İki adımlı doğrulamayı (2FA) e-posta ve bankacılık hesaplarında aç; şifren çalınsa bile hesabını korur.",
    "Sosyal medyada konum paylaşımını gerçek zamanlı değil, oradan ayrıldıktan sonra yap.",
    "Halka açık Wi-Fi'de bankacılık işlemi yapmaktan kaçın, mümkünse mobil veri kullan.",
    "Tanımadığın numaralardan gelen görüntülü aramalara temkinli yaklaş; bazı dolandırıcılık senaryoları orada başlar.",
    "Uygulamaları yalnızca resmi mağazalardan (Play Store, App Store) indir, dışarıdan APK kurmaktan kaçın.",
    "Telefon numaranı ve e-postanı hangi sitelerde kullandığını zaman zaman gözden geçir, kullanmadığın hesapları kapat.",
    "'Ödül kazandın' mesajlarına asla kişisel veya ödeme bilgisi girme.",
    "Her hesap için farklı bir şifre kullan. Biri sızarsa diğer hesapların da risk altına girmesin.",
    "Uzun bir cümle, kısa ve karmaşık bir şifreden çoğu zaman daha güçlüdür. En az 12 karakter hedefle.",
    "Doğum tarihi, isim veya 1234 gibi tahmin edilebilir şifrelerden kaçın.",
    "Telefonunda ekran kilidi (PIN, parmak izi veya yüz tanıma) kullan; kaybolursa verilerin korunur.",
    "Güncellemeleri erteleme. Çoğu güncelleme bilinen güvenlik açıklarını kapatır.",
    "Uygulama izinlerini gözden geçir: Bir fener uygulamasının konumuna veya rehberine ihtiyacı yoktur.",
    "Ev modeminin varsayılan yönetici şifresini değiştir; fabrika şifreleri internette herkese açık listelerde bulunur.",
    "Havaalanı gibi yerlerdeki herkese açık USB şarj istasyonları yerine kendi adaptörünü kullan.",
    "Restoran veya otoparktaki karekodların üzerine sonradan etiket yapıştırılmış olabilir. Ödeme öncesi adres çubuğunu kontrol et.",
    "Karekod seni bir uygulama (.apk) indirmeye yönlendiriyorsa asla kurma.",
    "E-postadaki gönderen adı sahte olabilir. Gerçek e-posta adresine bak, ekleri ve bağlantıları açmadan önce düşün.",
    "Bir kurum seni arayıp 'güvenlik için' para aktarmanı istiyorsa kapat. Hiçbir resmi kurum bunu telefonla istemez.",
    "Yakınının kaza geçirdiğini söyleyip acil para isteyen aramalarda önce kapat ve yakınını doğrudan ara.",
    "Kişisel bilgilerini (TC kimlik no, kart fotoğrafı) mesajla gönderme; ekran görüntüsü olarak da paylaşma.",
    "Önemli dosyalarını düzenli yedekle. Fidye yazılımına karşı en etkili önlem yedektir.",
    "Sosyal medya profilini gizli yap ve yalnızca tanıdıklarının takip etmesine izin ver.",
    "Şifreni tarayıcıya veya notlara düz yazı olarak kaydetmek yerine güvenilir bir şifre yöneticisi kullanmayı düşün.",
    "Bluetooth ve konumu kullanmadığın zamanlarda kapat; hem pil hem gizlilik için iyi olur.",
    "Çocuğunun kullandığı oyunlarda yabancılarla sohbet ve uygulama içi satın alma ayarlarını birlikte kontrol edin.",
    "Bir fırsat çok iyi görünüyorsa muhtemelen sahtedir. Fiyat veya vaat gerçek dışıysa durup araştır.",
    "Sahte mağaza sitelerini ayırt etmek için adresi, iletişim bilgilerini ve diğer kullanıcı yorumlarını kontrol et.",
    "Hesabında tanımadığın bir giriş bildirimi görürsen şifreni hemen değiştir ve tüm cihazlardan çıkış yap.",
    "Ücretsiz Wi-Fi'ye bağlanmadan önce ağın adını mekâna sor; benzer isimli sahte ağlar olabilir.",
    "Telefonunu kaybedersen uzaktan kilitlemek için Google 'Cihazımı Bul' veya Apple 'Bul' özelliğini önceden açık tut.",
    "Tek kullanımlık doğrulama kodunu (OTP) kimseyle paylaşma; kodu isteyen kişi seni dolandırıyor olabilir.",
    "Bilmediğin bir kişiden gelen dosya, PDF veya fatura ekini açmadan önce göndericiyi başka bir yoldan doğrula.",
    "Şüphelendiğin bir bağlantıyı ASES'in Tarama bölümüne yapıştırıp kontrol edebilirsin; ama sonuç kesin garanti değildir."
];

// Yerel saate göre gün numarası: gece yarısından sonra ipucu değişir.
function asesTipIndex() {
    var d = new Date();
    var localDay = Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
    return localDay % ASES_TIPS.length;
}
