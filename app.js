(() => {
  "use strict";

  /* ======================= SPLASH INTRO ======================= */
  const splash = document.getElementById("splash");
  if(splash){
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => splash.remove(), reduceMotion ? 50 : 1900);
  }

  /* ======================= NAVIGATION ======================= */
  const views = document.querySelectorAll("[data-view]");
  const navButtons = document.querySelectorAll("[data-goto]");

  function goto(name){
    views.forEach(v => v.hidden = v.id !== `view-${name}`);
    document.querySelectorAll(".nav-btn").forEach(b => {
      const active = b.dataset.goto === name;
      b.toggleAttribute("aria-current", active);
      if(active) b.setAttribute("aria-current","page"); else b.removeAttribute("aria-current");
    });
    document.querySelector(".views").scrollTo?.(0,0);
    window.scrollTo(0,0);
  }
  navButtons.forEach(b => b.addEventListener("click", () => goto(b.dataset.goto)));

  /* ======================= GÜNÜN İPUCU ======================= */
  const dailyTips = [
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
  const dayIndex = Math.floor(Date.now() / 86400000) % dailyTips.length;
  document.getElementById("dailyTipText").textContent = dailyTips[dayIndex];

  /* ======================= HIZLI GÜVENLİK KONTROLÜ ======================= */
  const checks = [
    { id:"c1", label:"En az bir hesabımda iki adımlı doğrulama (2FA) açık" },
    { id:"c2", label:"Farklı hesaplarda farklı şifreler kullanıyorum" },
    { id:"c3", label:"Telefonumda ekran kilidi (PIN/parmak izi) var" },
    { id:"c4", label:"Uygulama ve işletim sistemi güncellemelerini yapıyorum" },
    { id:"c5", label:"Bilinmeyen linklere tıklamadan önce kontrol ediyorum" }
  ];
  const checkState = {};
  const checkListEl = document.getElementById("checkList");
  checks.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" data-id="${c.id}" aria-label="${c.label}"></button><span>${c.label}</span>`;
    checkListEl.appendChild(li);
  });

  function updateShield(){
    const total = Object.values(checkState).filter(Boolean).length;
    document.getElementById("shieldScore").textContent = `${total}/5`;
    const fill = document.getElementById("shieldFill");
    const pct = total / checks.length;
    fill.setAttribute("transform", `translate(0, ${-(116 * pct)})`);
    fill.style.fill = pct >= 0.8 ? "var(--green)" : pct >= 0.4 ? "var(--amber)" : "var(--red)";
  }
  checkListEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if(!btn) return;
    const id = btn.dataset.id;
    checkState[id] = !checkState[id];
    btn.classList.toggle("checked", checkState[id]);
    btn.textContent = checkState[id] ? "✓" : "";
    btn.closest("li").classList.toggle("checked-text", checkState[id]);
    updateShield();
  });
  updateShield();

  /* ======================= ŞİFRE SAĞLIĞI (tamamen yerel) ======================= */
  const commonPasswords = new Set([
    "123456","123456789","12345678","password","111111","123123","qwerty","abc123",
    "1q2w3e4r","000000","1234567","1234567890","iloveyou","admin","letmein","welcome",
    "monkey","dragon","football","şifre123","sifre123","istanbul","türkiye","turkiye1",
    "galatasaray","fenerbahce","besiktas","password1","qwertyuiop","asdfgh","987654321",
    "aaaaaa","1111111","12341234","qazwsx"
  ]);

  const pwInput = document.getElementById("pwInput");
  const pwToggle = document.getElementById("pwToggle");
  const pwFindings = document.getElementById("pwFindings");
  const meterFill = document.getElementById("pwMeterFill");
  const meterLabel = document.getElementById("pwMeterLabel");

  pwToggle.addEventListener("click", () => {
    const isPw = pwInput.type === "password";
    pwInput.type = isPw ? "text" : "password";
    pwToggle.textContent = isPw ? "🙈" : "👁";
  });

  function hasSequential(pw){
    const seqs = ["0123456789","abcdefghijklmnopqrstuvwxyz","qwertyuiop","asdfghjkl","zxcvbnm"];
    const lower = pw.toLowerCase();
    for(const seq of seqs){
      for(let i=0;i<=seq.length-4;i++){
        const chunk = seq.slice(i,i+4);
        if(lower.includes(chunk) || lower.includes(chunk.split("").reverse().join(""))) return true;
      }
    }
    return false;
  }
  function hasRepeats(pw){ return /(.)\1\1/.test(pw); }

  function analyze(pw){
    const findings = [];
    let score = 0;

    if(pw.length === 0){
      return { score:0, findings:[], label:"Bir şifre yaz ve anında sonucu gör" };
    }
    if(pw.length >= 12){ score += 30; }
    else if(pw.length >= 8){ score += 15; findings.push({t:"warn", m:"12 karakter ve üzeri şifreler çok daha güvenlidir."}); }
    else { findings.push({t:"bad", m:`Sadece ${pw.length} karakter — en az 8, tercihen 12+ karakter kullan.`}); }

    const hasLower = /[a-zçğıöşü]/i.test(pw) && /[a-z]/.test(pw);
    const hasUpper = /[A-ZÇĞİÖŞÜ]/.test(pw);
    const hasDigit = /[0-9]/.test(pw);
    const hasSymbol = /[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/.test(pw);
    const variety = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
    score += variety * 12;
    if(variety <= 2) findings.push({t:"bad", m:"Sadece harf veya sadece rakam kullanılmış. Büyük/küçük harf, rakam ve sembol karıştır."});
    else if(variety === 3) findings.push({t:"warn", m:"İyi gidiyor — bir sembol daha eklemek şifreni güçlendirir."});
    else findings.push({t:"ok", m:"Harf, rakam ve sembol karışımı iyi kullanılmış."});

    if(commonPasswords.has(pw.toLowerCase())){
      score = Math.min(score, 8);
      findings.unshift({t:"bad", m:"Bu şifre en sık kullanılan / en çok çalınan şifreler listesinde. Kesinlikle değiştir."});
    }
    if(hasSequential(pw)){
      score -= 15;
      findings.push({t:"bad", m:"Klavye sırası veya alfabetik sıra (ör. 'qwerty', 'abcd') kullanılmış — kolay tahmin edilir."});
    }
    if(hasRepeats(pw)){
      score -= 10;
      findings.push({t:"warn", m:"Aynı karakterin art arda tekrarı (ör. 'aaa') şifreyi zayıflatır."});
    }
    if(/^(19|20)\d{2}$/.test(pw) || /(19|20)\d{2}/.test(pw)){
      findings.push({t:"warn", m:"Bir yıl/tarih içeriyor gibi görünüyor — doğum tarihi gibi tahmin edilebilir bilgilerden kaçın."});
    }

    score = Math.max(0, Math.min(100, score));
    let label;
    if(score < 30) label = "Zayıf — kolayca kırılabilir";
    else if(score < 55) label = "Orta — geliştirilmeli";
    else if(score < 80) label = "İyi — birkaç ince ayarla mükemmel olur";
    else label = "Güçlü — bu şifre işini görür";

    if(findings.length === 0) findings.push({t:"ok", m:"Belirgin bir zayıflık bulunamadı."});

    return { score, findings, label };
  }

  pwInput.addEventListener("input", () => {
    const { score, findings, label } = analyze(pwInput.value);
    meterFill.style.width = `${score}%`;
    meterFill.style.background = score < 30 ? "var(--danger)" : score < 55 ? "var(--amber)" : score < 80 ? "#c7d94a" : "var(--green)";
    meterLabel.textContent = label;
    pwFindings.innerHTML = "";
    if(pwInput.value.length === 0) return;
    findings.forEach(f => {
      const div = document.createElement("div");
      div.className = `finding ${f.t}`;
      div.innerHTML = `<span>${f.t === "ok" ? "✓" : f.t === "warn" ? "!" : "✕"}</span><span>${f.m}</span>`;
      pwFindings.appendChild(div);
    });
  });

  /* ======================= FARKINDALIK İPUÇLARI ======================= */
  const tipData = [
    { cat:"Dolandırıcılık", title:"Sahte 'kargo takip' mesajları",
      body:"Bilmediğin bir kargo mesajı, ödeme veya kişisel bilgi istiyorsa gerçek değildir. Kargo firmasının resmi uygulamasından takip numaranı kontrol et, mesajdaki linke tıklama." },
    { cat:"Dolandırıcılık", title:"'Yakının kaza geçirdi' aramaları",
      body:"Panik yaratıp hızlı para transferi istettirmek klasik bir yöntemdir. Kapat, ailenle doğrudan iletişime geç, doğrulamadan asla para gönderme." },
    { cat:"Dolandırıcılık", title:"Sahte banka/e-Devlet siteleri",
      body:"Adres çubuğunu her zaman kontrol et. Gerçek kurum siteleri SMS ile şifre veya kart bilgisi istemez. Şüphelendiğinde siteyi linkten değil, tarayıcıya adresi kendin yazarak aç." },
    { cat:"Bankacılık", title:"OTP / doğrulama kodu paylaşma", 
      body:"Telefonuna gelen tek kullanımlık kod (OTP) sadece senin işlemin için üretilir. Hiçbir banka çalışanı bu kodu senden telefonla istemez." },
    { cat:"Bankacılık", title:"Bilinmeyen QR kod ile ödeme",
      body:"Restoran veya otoparklarda üzerine yapıştırılmış sahte QR kodlar gerçek ödeme sayfasına benzeyen sahte sitelere yönlendirebilir. Ödeme öncesi adres çubuğunu kontrol et." },
    { cat:"Sosyal Medya", title:"Hesap doğrulama/ödül dolandırıcılığı",
      body:"'Hesabın onaylandı, tıkla' ya da 'ödül kazandın' mesajları genelde şifreni çalmayı hedefler. Sosyal medya şifreni asla üçüncü parti bir sayfaya girme." },
    { cat:"Sosyal Medya", title:"Profil bilgisi paylaşım ayarları",
      body:"Doğum tarihi, telefon numarası ve konum gibi bilgileri herkese açık paylaşmak, seni hedef alan dolandırıcılık senaryolarını kolaylaştırır. Gizlilik ayarlarını düzenli gözden geçir." },
    { cat:"Wi-Fi", title:"Halka açık ağlarda dikkat",
      body:"Kafe, havaalanı gibi ücretsiz ağlarda bankacılık ya da hassas işlem yapma. Mümkünse mobil verini kullan ya da güvenilir bir VPN tercih et." },
    { cat:"Wi-Fi", title:"Ev router şifreni değiştir",
      body:"Modeminin varsayılan yönetici şifresini mutlaka değiştir; fabrika şifreleri internet üzerinde herkese açık listelerde bulunur." },
    { cat:"Genel", title:"Uygulama izinlerini gözden geçir",
      body:"Bir fener uygulamasının konumuna veya rehberine ihtiyacı yoktur. Telefon ayarlarından uygulama izinlerini düzenli kontrol et, gereksiz olanları kapat." },
    { cat:"Genel", title:"Yazılım güncellemelerini atlama",
      body:"Güncellemelerin çoğu bilinen güvenlik açıklarını kapatır. 'Sonra hatırlat' yerine mümkün olan en kısa sürede güncelle." },
    { cat:"Genel", title:"Herkese açık şarj istasyonları",
      body:"Havaalanı gibi yerlerdeki USB şarj istasyonları veri çalma riski taşıyabilir ('juice jacking'). Kendi adaptörünü kullan ya da sadece şarj eden bir kablo tercih et." }
  ];

  const tipFiltersEl = document.getElementById("tipFilters");
  const tipAccordionEl = document.getElementById("tipAccordion");
  const categories = ["Tümü", ...new Set(tipData.map(t => t.cat))];
  let activeCat = "Tümü";

  categories.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = "chip" + (cat === activeCat ? " active" : "");
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      activeCat = cat;
      tipFiltersEl.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.textContent === cat));
      renderTips();
    });
    tipFiltersEl.appendChild(chip);
  });

  function makeAccordionItem({ cat, title, bodyHtml }){
    const item = document.createElement("div");
    item.className = "acc-item";
    item.innerHTML = `
      <button class="acc-head" type="button">
        <span>${cat ? `<span class="acc-cat">${cat}</span>`:""}<span class="acc-title">${title}</span></span>
        <span class="acc-chevron">▾</span>
      </button>
      <div class="acc-body"><div class="acc-body-inner">${bodyHtml}</div></div>`;
    const head = item.querySelector(".acc-head");
    const body = item.querySelector(".acc-body");
    head.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".acc-item.open").forEach(o => {
        if(o !== item){ o.classList.remove("open"); o.querySelector(".acc-body").style.maxHeight = null; }
      });
      item.classList.toggle("open", !isOpen);
      body.style.maxHeight = !isOpen ? body.scrollHeight + "px" : null;
    });
    return item;
  }

  function renderTips(){
    tipAccordionEl.innerHTML = "";
    tipData
      .filter(t => activeCat === "Tümü" || t.cat === activeCat)
      .forEach(t => tipAccordionEl.appendChild(makeAccordionItem({ cat:t.cat, title:t.title, bodyHtml:`<p>${t.body}</p>` })));
  }
  renderTips();

  /* ======================= ACİL DURUM REHBERİ ======================= */
  const scenarios = [
    { title:"Sosyal medya / e-posta hesabım çalındı", body:`
      <ol>
        <li>Hâlâ girebiliyorsan şifreni hemen değiştir ve tüm cihazlardan oturumu kapat.</li>
        <li>İki adımlı doğrulamayı (2FA) hemen aç.</li>
        <li>Giremiyorsan platformun "hesabım çalındı" / hesap kurtarma formunu kullan.</li>
        <li>Arkadaşlarını ve takipçilerini, hesaptan gelebilecek şüpheli mesajlara karşı uyar.</li>
        <li>Aynı şifreyi başka hesaplarda da kullandıysan hepsini değiştir.</li>
      </ol>` },
    { title:"Kart / banka bilgim sızdı ya da yetkisiz işlem gördüm", body:`
      <ol>
        <li>Bankanın 7/24 çağrı merkezini ara ve kartını/hesabını hemen bloke ettir.</li>
        <li>Mobil bankacılık uygulamasından şifreni değiştir.</li>
        <li>Yetkisiz işlem varsa itiraz dilekçesi vermek için bankana başvur.</li>
        <li>Gerekirse en yakın karakola veya savcılığa suç duyurusunda bulun.</li>
      </ol>` },
    { title:"Dolandırıcılığa uğradım (para transferi yaptım)", body:`
      <ol>
        <li>Vakit kaybetmeden bankanı arayıp transferi durdurmayı / geri almayı talep et.</li>
        <li><strong>ihbarweb.org.tr</strong> üzerinden Emniyet Genel Müdürlüğü'ne siber suç bildirimi yap.</li>
        <li>En yakın karakola giderek suç duyurusunda bulun, elindeki tüm ekran görüntülerini ve mesaj kayıtlarını sakla.</li>
        <li>Kendini suçlama — bu taktikler profesyonel dolandırıcılık senaryolarıdır.</li>
      </ol>` },
    { title:"Telefonum çalındı veya kayboldu", body:`
      <ol>
        <li>Başka bir cihazdan Google (Find My Device) veya Apple (Find My iPhone) üzerinden telefonu kilitle ya da konumunu gör.</li>
        <li>Operatörüne hattını kayıp/çalıntı olarak bildirip dondur.</li>
        <li>Telefonundaki e-posta, sosyal medya ve bankacılık hesaplarının şifrelerini başka bir cihazdan değiştir.</li>
        <li>En yakın karakola IMEI numaranla birlikte kayıp/çalıntı bildiriminde bulun.</li>
      </ol>` },
    { title:"Biri kimliğimi kullanıyor / adıma sahte hesap açtı", body:`
      <ol>
        <li>Sahte hesabı ilgili platforma "kimlik taklidi" (impersonation) olarak bildir.</li>
        <li>e-Devlet üzerinden adına kayıtlı hat, hesap gibi bilgileri kontrol et.</li>
        <li>Şüpheli bir finansal işlem varsa ilgili bankaya ve <strong>ihbarweb.org.tr</strong>'a bildirimde bulun.</li>
        <li>Gerekirse savcılığa suç duyurusunda bulunarak resmi kayıt oluştur.</li>
      </ol>` }
  ];
  const scenarioListEl = document.getElementById("scenarioList");
  scenarios.forEach(s => scenarioListEl.appendChild(makeAccordionItem({ title:s.title, bodyHtml:s.body })));

  /* ======================= AİLE GÜVENLİĞİ ======================= */
  const familyItems = [
    { title:"Yaşına uygun ayarları kur", body:`
      <p>Google Family Link (Android) veya Apple Ekran Süresi (iOS) ile içerik filtreleme, uygulama izinleri ve ekran süresi sınırları belirleyebilirsin. Ayarları çocuğunla birlikte kurmak, kuralları anlamasını kolaylaştırır.</p>` },
    { title:"Uygulama izinlerini birlikte kontrol edin", body:`
      <p>Çocuğunun telefonundaki uygulamaların konum, kamera ve mikrofon izinlerini düzenli kontrol et. Oyun uygulamalarının çoğu bu izinlere ihtiyaç duymaz.</p>` },
    { title:"Açık iletişimi tercih et, yasaklamayı değil", body:`
      <p>Çocuğun internette rahatsız edici bir şeyle karşılaştığında seninle konuşabileceğini bilmesi, gizli gizli davranmasından çok daha koruyucudur. Cezalandırmayacağını hissettirmek, sorun yaşadığında sana gelmesini sağlar.</p>` },
    { title:"Sosyal medya gizlilik ayarları", body:`
      <p>Hesapları gizli/özel profil olarak ayarlayın, takipçi ve arkadaş isteklerini yalnızca tanıdıklarından kabul etmesini teşvik edin. Konum etiketlemeyi kapatın.</p>` },
    { title:"Çevrimiçi tanışılan kişilere karşı temkin", body:`
      <p>Çocuğuna, sadece internetten tanıdığı biriyle yüz yüze buluşmadan önce mutlaka bir yetişkinle konuşması gerektiğini anlat. Israrla gizlilik isteyen ya da özel görüşme talep eden yetişkin davranışlarına karşı dikkatli olmasını öğret.</p>` },
    { title:"Düzenli, yargılamayan sohbetler yapın", body:`
      <p>Haftada bir kez "bu hafta internette ilginç ya da tuhaf bir şey oldu mu?" gibi sorular sormak, ciddi bir sorun büyümeden fark etmeni sağlar.</p>` }
  ];
  const familyAccordionEl = document.getElementById("familyAccordion");
  familyItems.forEach(f => familyAccordionEl.appendChild(makeAccordionItem({ title:f.title, bodyHtml:f.body })));

  /* ======================= KAREKOD (QR) GÜVENLİK ANALİZ MOTORU =======================
     Yalnızca ürün karekodları değil, kamerayla okunan HER TÜR karekod içeriği için
     (bağlantı, Wi-Fi, telefon, SMS, e-posta, kripto adresi, kartvizit, düz metin)
     kural tabanlı bir sezgisel tehdit taraması yapar. Gerçek bir tehdit veritabanı
     DEĞİLDİR — bilinen dolandırıcılık/kandırmaca kalıplarını puanlayan bir ön uyarı katmanıdır. */

  const SUSPICIOUS_TLDS = [
    "zip","mov","xyz","tk","top","gq","ml","cf","click","fit","loan","work",
    "support","link","biz","cc","site","online","info","club","live","icu",
    "pw","rest","cfd","sbs","cyou","buzz","monster","quest","bond"
  ];
  const SHORTENERS = [
    "bit.ly","tinyurl.com","t.co","is.gd","cutt.ly","shorte.st","ow.ly","buff.ly",
    "goo.gl","rebrand.ly","tiny.cc","shorturl.at","rb.gy","t.ly","v.gd","clck.ru",
    "s.id","b.link","lnkd.in","amzn.to"
  ];
  const BRANDS = {
    "garanti":["garanti.com.tr","garantibbva.com.tr"], "isbank":["isbank.com.tr"],
    "ziraat":["ziraatbank.com.tr","ziraat.com.tr"], "akbank":["akbank.com","akbank.com.tr"],
    "yapikredi":["yapikredi.com.tr","ykb.com"], "halkbank":["halkbank.com.tr"],
    "vakifbank":["vakifbank.com.tr"], "denizbank":["denizbank.com"],
    "qnb":["qnb.com.tr","qnbfinansbank.com"], "ptt":["ptt.gov.tr","pttavm.com"],
    "turkcell":["turkcell.com.tr"], "vodafone":["vodafone.com.tr"],
    "turktelekom":["turktelekom.com.tr","tt.com.tr"], "trendyol":["trendyol.com"],
    "hepsiburada":["hepsiburada.com"], "amazon":["amazon.com.tr","amazon.com"],
    "araskargo":["araskargo.com.tr"], "yurtici":["yurticikargo.com"],
    "mng":["mngkargo.com.tr"], "ups":["ups.com","ups.com.tr"], "dhl":["dhl.com","dhl.com.tr"],
    "paypal":["paypal.com"], "apple":["apple.com","icloud.com"],
    "google":["google.com","google.com.tr"], "microsoft":["microsoft.com","live.com","office.com"],
    "instagram":["instagram.com"], "facebook":["facebook.com","fb.com","meta.com"],
    "whatsapp":["whatsapp.com","wa.me"], "telegram":["telegram.org","t.me"],
    "edevlet":["turkiye.gov.tr","edevlet.gov.tr"], "sgk":["sgk.gov.tr"], "gib":["gib.gov.tr"]
  };
  const SCAM_PHRASES = [
    "hesabınız donduruldu","hesabınız kilitlendi","kartınız bloke","kazandınız",
    "tebrikler kazandınız","ödül kazandınız","kargonuz elimizde","kargo teslim edilemedi",
    "gümrük ücreti","otp kodunu paylaş","doğrulama kodunu gönder","şifrenizi girin",
    "sms kodunu gönder","hemen tıklayın","acil işlem","son gün","yasal takip","icra",
    "sınırlı süre","24 saat içinde","bilgilerinizi güncelleyin","hesabınızı doğrulayın",
    "iban bilgisi gönderin","kredi kartı bilgisi","cvv","para transferi","havale yapın"
  ];
  const SUSPICIOUS_PATHS = [
    "login","signin","verify","verification","update","secure","security","account",
    "confirm","confirmation","validate","authenticate","password","reset","recover",
    "unlock","activate","billing","payment","wallet","webscr","wp-login","admin"
  ];
  const MALICIOUS_EXTENSIONS = ["apk","exe","scr","bat","cmd","msi","jar","vbs","ps1"];

  function levenshtein(a, b){
    a = a.toLowerCase(); b = b.toLowerCase();
    const m = a.length, n = b.length;
    if(Math.abs(m - n) > 3) return 99;
    const dp = Array.from({length:m+1}, () => new Array(n+1).fill(0));
    for(let i=0;i<=m;i++) dp[i][0]=i;
    for(let j=0;j<=n;j++) dp[0][j]=j;
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
      dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : 1+Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]);
    return dp[m][n];
  }
  function normalizeHost(host){ return host.replace(/^www\./,"").toLowerCase(); }
  function isOfficialDomain(host, list){ const h=normalizeHost(host); return list.some(o => h===o || h.endsWith("."+o)); }
  function getMainLabel(host){
    const labels = normalizeHost(host).split(".");
    return labels.length >= 2 ? labels[labels.length-2] : (labels[0]||"");
  }
  const CONFUSABLE = /[\u0400-\u04FF\u0370-\u03FF]/;
  function hasMixedScript(text){ return /[a-z]/i.test(text) && CONFUSABLE.test(text); }
  function detectHiddenChars(raw){ return /[\u200B-\u200F\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/.test(raw); }
  function isObfuscatedIp(host){
    if(/^\d{6,10}$/.test(host)) return true;
    if(/^0x[0-9a-f]+(\.0x[0-9a-f]+){0,3}$/i.test(host)) return true;
    return false;
  }

  function analyzeUrlContent(raw){
    let score = 0, reasons = [];
    const text = raw.trim();
    if(/^(javascript|data|vbscript):/i.test(text)){
      return { score:95, reasons:["Tehlikeli bir betik protokolü (javascript:/data:) tespit edildi — bu kod doğrudan çalıştırılabilir."] };
    }
    const hasScheme = /^https?:\/\//i.test(text);
    let url;
    try{ url = new URL(hasScheme ? text : "http://"+text); }
    catch(e){ return { score:35, reasons:["Bu içerik geçerli bir bağlantı biçiminde değil, dikkatli olun."] }; }

    const host = url.hostname.toLowerCase();
    const path = (url.pathname||"").toLowerCase();

    if(detectHiddenChars(raw)){ score+=40; reasons.push("Görünmez/gizli karakterler tespit edildi — gerçek hedef gizleniyor olabilir."); }
    if(!hasScheme){ score+=15; reasons.push("Güvenli protokol (https://) belirtilmemiş."); }
    else if(url.protocol !== "https:"){ score+=32; reasons.push("Güvensiz (HTTP) protokol kullanılıyor — veriler şifrelenmeden gidebilir."); }

    if(/^(\d{1,3}\.){3}\d{1,3}$/.test(host)){ score+=38; reasons.push("Alan adı yerine doğrudan IP adresi kullanılıyor."); }
    else if(isObfuscatedIp(host)){ score+=38; reasons.push("Gizlenmiş (ondalık/onaltılık) bir IP adresi biçimi tespit edildi."); }

    if(hasMixedScript(text)){ score+=45; reasons.push("Latin harfleriyle karışık Kiril/Yunan karakterleri var — görsel taklit (homoglyph) riski."); }
    if(text.includes("@") && !host.includes("@")){ score+=25; reasons.push("Bağlantıda '@' işareti var — gerçek adresi gizlemek için kullanılmış olabilir."); }
    if(host.startsWith("xn--") || host.includes(".xn--")){ score+=30; reasons.push("Punycode (uluslararası karakter) alan adı — marka taklidi riski yüksek."); }

    const subCount = host.split(".").length - 2;
    if(subCount >= 4){ score+=25; reasons.push("Aşırı sayıda alt alan adı (subdomain) içeriyor."); }

    const dashCount = (host.match(/-/g)||[]).length;
    if(dashCount >= 4){ score+=16; reasons.push("Alan adında çok sayıda tire (-) var."); }

    const tld = host.split(".").pop();
    if(SUSPICIOUS_TLDS.includes(tld)){ score+=24; reasons.push("'."+tld+"' uzantısı dolandırıcılar tarafından sık tercih edilen ucuz bir uzantı."); }

    const isShortener = SHORTENERS.some(s => host===s || host.endsWith("."+s));
    if(isShortener){ score+=22; reasons.push("Kısaltılmış bağlantı — sizi gerçekte hangi siteye götüreceği gizlenmiş."); }

    const knownOfficial = Object.values(BRANDS).some(list => isOfficialDomain(host, list));
    for(const [brand, official] of Object.entries(BRANDS)){
      if(host.includes(brand)){
        if(!isOfficialDomain(host, official) && !isShortener){
          score += 40; reasons.push(`Güvenilir kurum adı ("${brand}") resmi olmayan bir adreste geçiyor — sahte site riski yüksek.`);
        }
      } else if(!knownOfficial){
        const main = getMainLabel(host);
        if(main.length>=4 && brand.length>=4){
          const dist = levenshtein(main, brand);
          if(dist>0 && dist<=(brand.length<=5?1:2)){
            score += 34; reasons.push(`Alan adı "${main}", bilinen marka "${brand}" ile çok benziyor (typosquatting).`);
          }
        }
      }
    }

    for(const part of path.split("/").filter(Boolean)){
      if(SUSPICIOUS_PATHS.some(sp => part===sp || part.startsWith(sp+"-"))){
        score += 15; reasons.push(`Bağlantı yolunda şüpheli kelime var: "/${part}"`); break;
      }
    }
    const extMatch = path.match(/\.([a-z0-9]{2,5})(?:$|[?#])/i);
    if(extMatch && MALICIOUS_EXTENSIONS.includes(extMatch[1].toLowerCase())){
      score += 40; reasons.push(`Bağlantı doğrudan bir ".${extMatch[1]}" kurulum/çalıştırma dosyası indiriyor.`);
    }
    if(text.length > 120){ score+=8; reasons.push("Bağlantı alışılmadık derecede uzun."); }

    score = Math.min(score, 100);
    return { score, reasons: [...new Set(reasons)] };
  }

  function analyzeTextContent(raw){
    let score = 0, reasons = [];
    const clean = raw.replace(/[\u200B-\u200F\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/g, "");
    const lower = clean.toLowerCase();
    let hits = 0;
    SCAM_PHRASES.forEach(p => {
      if(lower.includes(p)){ hits++; score += hits===1?22:hits===2?16:10; reasons.push(`Dolandırıcılık kalıbı: "${p}"`); }
    });
    const urlMatch = clean.match(/https?:\/\/[^\s<>"']+/i) || clean.match(/[a-z0-9.-]+\.(com|net|org|tr|xyz|online|site|click|tk|top)\b/i);
    if(urlMatch){
      const inner = analyzeUrlContent(urlMatch[0]);
      score += Math.round(inner.score * 0.5);
      inner.reasons.slice(0,2).forEach(r => reasons.push("(Bağlantı) " + r));
    }
    if(/(şifre|parola|otp|doğrulama kodu|cvv|cvc|kart no|iban|tc kimlik)/i.test(clean)){
      score += 18; reasons.push("Mesaj doğrudan şifre, OTP, kart veya kimlik bilgisi talep ediyor gibi görünüyor.");
    }
    score = Math.min(score, 100);
    return { score, reasons: [...new Set(reasons)] };
  }

  // Karekod içeriğinin türünü tanır (yalnızca link değil — Wi-Fi, telefon, SMS,
  // e-posta, kripto adresi, kartvizit ve düz metin dahil HER TÜR kamera taraması).
  function analyzeQrPayload(raw){
    const text = String(raw).trim();

    if(/^WIFI:/i.test(text)){
      const ssid = (text.match(/S:([^;]*)/i)||[])[1] || "(bilinmiyor)";
      const enc = (text.match(/T:([^;]*)/i)||[])[1] || "";
      let score = 0, reasons = [];
      if(!enc || /^nopass$/i.test(enc)){
        score += 30; reasons.push("Bu Wi-Fi ağı şifresiz (açık) görünüyor — açık ağlarda trafiğin izlenebilir.");
      }
      reasons.push(`Karekod, telefonunu "${ssid}" adlı Wi-Fi ağına otomatik bağlamak istiyor.`);
      reasons.push("Tanımadığın bir yerde (kafe, otopark, havalimanı) karşına çıkan Wi-Fi karekodlarını bağlanmadan önce işletmeye sor.");
      return { type:"Wi-Fi Ağı", score:Math.min(score,100), reasons, meta:`SSID: ${ssid}` };
    }
    if(/^(tel:|SMSTO:|SMS:)/i.test(text)){
      const isSms = /^(SMSTO:|SMS:)/i.test(text);
      const number = text.replace(/^(tel:|SMSTO:|SMS:)/i, "").split(":")[0];
      let score = 0, reasons = [];
      if(/^0?9\d{2}/.test(number.replace(/\D/g,""))){
        score += 35; reasons.push("Numara, Türkiye'de yüksek ücretli olabilen bir premium hat (9xx) formatında görünüyor.");
      }
      reasons.push(isSms ? `Karekod, "${number}" numarasına önceden hazırlanmış bir SMS göndermeni istiyor.` : `Karekod, doğrudan "${number}" numarasını aramanı istiyor.`);
      reasons.push("Tanımadığın numaraları aramadan/mesaj atmadan önce ait olduğu kurumu resmi kanaldan doğrula.");
      return { type: isSms?"SMS Gönderimi":"Telefon Araması", score:Math.min(score,100), reasons, meta:number };
    }
    if(/^mailto:/i.test(text)){
      const email = text.replace(/^mailto:/i, "").split("?")[0];
      const domain = (email.split("@")[1]||"").toLowerCase();
      let score = 0, reasons = [`Karekod "${email}" adresine e-posta göndermeni istiyor.`];
      const known = Object.values(BRANDS).some(list => isOfficialDomain(domain, list));
      for(const [brand, official] of Object.entries(BRANDS)){
        if(domain.includes(brand) && !isOfficialDomain(domain, official)){
          score += 35; reasons.push(`E-posta alan adı "${domain}", "${brand}" markasını taklit ediyor olabilir.`);
        }
      }
      return { type:"E-posta", score:Math.min(score,100), reasons, meta:email };
    }
    if(/^(bitcoin:|ethereum:|litecoin:|BC1|bc1)/i.test(text)){
      const addr = text.replace(/^(bitcoin:|ethereum:|litecoin:)/i, "").split("?")[0];
      return { type:"Kripto Para Adresi", score:55,
        reasons:[
          `Karekod bir kripto para adresine ("${addr.slice(0,18)}…") ödeme yapmanı istiyor.`,
          "Kripto ödemeleri geri alınamaz — göndermeden önce alıcının kimliğini mutlaka doğrula.",
          "'Yatırım fırsatı', 'iki katına çıkar' gibi vaatlerle gelen kripto karekodları neredeyse her zaman dolandırıcılıktır."
        ], meta: addr };
    }
    if(/^BEGIN:VCARD/i.test(text)){
      const name = (text.match(/FN:(.*)/i)||[])[1] || "(isimsiz)";
      return { type:"Kartvizit (vCard)", score:5,
        reasons:["Karekod bir kişi rehberine kişi eklemek istiyor: " + name + ".", "Tanımadığın biri veriyorsa, rehberine eklemeden önce kimliğini teyit et."],
        meta:name };
    }
    if(/^https?:\/\//i.test(text) || /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(\/|$|\?)/i.test(text)){
      const r = analyzeUrlContent(text);
      return { type:"Bağlantı / Link", score:r.score, reasons: r.reasons.length?r.reasons:["Belirgin bir tehdit kalıbına rastlanmadı, yine de temkinli ol."], meta:text };
    }
    const r = analyzeTextContent(text);
    return { type:"Düz Metin", score:r.score, reasons: r.reasons.length?r.reasons:["Belirgin bir dolandırıcılık kalıbına rastlanmadı."], meta:text.slice(0,80) };
  }

  function qrVerdict(score){
    if(score < 25) return { label:"DÜŞÜK RİSK", cls:"safe" };
    if(score < 55) return { label:"DİKKAT", cls:"warn" };
    return { label:"YÜKSEK RİSK", cls:"danger" };
  }

  /* ======================= KAREKOD UI + KAMERA ======================= */
  (function initQr(){
    const qrOpenBtn = document.getElementById("qrOpenBtn");
    const qrModal = document.getElementById("qrModal");
    if(!qrOpenBtn || !qrModal) return;

    const qrVideo = document.getElementById("qrVideo");
    const qrStatus = document.getElementById("qrStatus");
    const qrCloseBtn = document.getElementById("qrCloseBtn");
    const qrResult = document.getElementById("qrResult");
    const qrBadge = document.getElementById("qrBadge");
    const qrScore = document.getElementById("qrScore");
    const qrRaw = document.getElementById("qrRaw");
    const qrFindings = document.getElementById("qrFindings");
    const qrManualInput = document.getElementById("qrManualInput");
    const qrManualBtn = document.getElementById("qrManualBtn");

    let stream = null, rafId = null, stopped = true;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently:true });
    let detector = null;
    if("BarcodeDetector" in window){
      try{ detector = new BarcodeDetector({ formats:["qr_code"] }); } catch(e){ detector = null; }
    }

    function renderResult(raw){
      const r = analyzeQrPayload(raw);
      const v = qrVerdict(r.score);
      qrResult.classList.remove("hidden");
      qrBadge.textContent = `${v.label} · ${r.type}`;
      qrBadge.className = "qr-badge " + v.cls;
      qrScore.textContent = `Risk Puanı: ${r.score}/100`;
      qrRaw.textContent = raw.length > 220 ? raw.slice(0,220) + "…" : raw;
      qrFindings.innerHTML = "";
      r.reasons.forEach(reason => {
        const div = document.createElement("div");
        const t = r.score>=55 ? "bad" : r.score>=25 ? "warn" : "ok";
        div.className = `finding ${t}`;
        div.innerHTML = `<span>${t==="ok"?"✓":t==="warn"?"!":"✕"}</span><span>${reason}</span>`;
        qrFindings.appendChild(div);
      });
      qrResult.scrollIntoView({ behavior:"smooth", block:"nearest" });
    }

    function openModal(){ qrModal.classList.remove("hidden"); qrStatus.textContent = "Kamera başlatılıyor…"; }
    function stopCamera(){
      stopped = true;
      if(rafId) cancelAnimationFrame(rafId);
      rafId = null;
      if(stream){ stream.getTracks().forEach(t=>t.stop()); stream = null; }
      if(qrVideo) qrVideo.srcObject = null;
    }
    function closeModal(){ qrModal.classList.add("hidden"); stopCamera(); }

    async function startCamera(){
      if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        qrStatus.textContent = "Bu tarayıcı kamera erişimini desteklemiyor."; return;
      }
      if(window.isSecureContext === false){
        qrStatus.textContent = "Kamera için güvenli bağlantı (HTTPS) gerekli."; return;
      }
      try{
        stream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:{ ideal:"environment" } }, audio:false });
        qrVideo.srcObject = stream;
        await qrVideo.play();
        stopped = false;
        qrStatus.textContent = "Karekodu çerçeve içine hizala…";
        tick();
      } catch(err){
        if(err && err.name === "NotAllowedError") qrStatus.textContent = "Kamera izni reddedildi. Site ayarlarından izin ver.";
        else if(err && err.name === "NotFoundError") qrStatus.textContent = "Kullanılabilir bir kamera bulunamadı.";
        else qrStatus.textContent = "Kamera başlatılamadı.";
      }
    }

    async function tick(){
      if(stopped || !qrVideo) return;
      if(qrVideo.readyState === qrVideo.HAVE_ENOUGH_DATA && qrVideo.videoWidth > 0){
        try{
          let code = null;
          if(detector){
            const results = await detector.detect(qrVideo);
            if(results && results.length) code = results[0].rawValue;
          } else if(typeof jsQR === "function"){
            canvas.width = qrVideo.videoWidth; canvas.height = qrVideo.videoHeight;
            ctx.drawImage(qrVideo, 0, 0, canvas.width, canvas.height);
            const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const res = jsQR(frame.data, frame.width, frame.height, { inversionAttempts:"dontInvert" });
            if(res && res.data) code = res.data;
          } else {
            qrStatus.textContent = "Karekod çözücü yükleniyor, birkaç saniye bekle…";
          }
          if(code){ closeModal(); renderResult(code); return; }
        } catch(e){ /* kare okunamadı, devam */ }
      }
      if(!stopped) rafId = requestAnimationFrame(tick);
    }

    qrOpenBtn.addEventListener("click", () => { openModal(); startCamera(); });
    qrCloseBtn.addEventListener("click", closeModal);
    qrModal.addEventListener("click", (e) => { if(e.target === qrModal) closeModal(); });
    document.addEventListener("keydown", (e) => { if(e.key==="Escape" && !qrModal.classList.contains("hidden")) closeModal(); });

    if(qrManualBtn){
      qrManualBtn.addEventListener("click", () => {
        const val = qrManualInput.value.trim();
        if(!val) return;
        renderResult(val);
      });
    }
  })();

  /* ======================= TARAMA (BAĞLANTI / SMS) + GEÇMİŞ ======================= */
  (function initScan(){
    const scanTabs = document.getElementById("scanTabs");
    const scanInput = document.getElementById("scanInput");
    const scanBtn = document.getElementById("scanBtn");
    if(!scanTabs || !scanInput || !scanBtn) return;

    const scanResult = document.getElementById("scanResult");
    const scanBadge = document.getElementById("scanBadge");
    const scanScore = document.getElementById("scanScore");
    const scanFindings = document.getElementById("scanFindings");
    const historyListEl = document.getElementById("scanHistoryList");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    let scanMode = "link";
    scanTabs.querySelectorAll("[data-scanmode]").forEach(btn => {
      btn.addEventListener("click", () => {
        scanMode = btn.dataset.scanmode;
        scanTabs.querySelectorAll("[data-scanmode]").forEach(b => b.classList.toggle("active", b === btn));
        scanInput.placeholder = scanMode === "link"
          ? "https:// ile başlayan bağlantıyı buraya yapıştır…"
          : "Gelen SMS veya e-posta metnini buraya yapıştır…";
      });
    });

    function escapeHtml(str){
      return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    }

    function renderHistory(){
      if(!historyListEl) return;
      let history = [];
      try{ history = JSON.parse(localStorage.getItem("kizilkaya_history") || "[]"); } catch(e){ history = []; }
      if(history.length === 0){
        historyListEl.innerHTML = '<p class="empty">Henüz tarama yapılmadı.</p>';
        return;
      }
      historyListEl.innerHTML = history.map(item => {
        const v = qrVerdict(item.score);
        const typeLabel = item.type === "link" ? "Bağlantı" : "Mesaj";
        return `<div class="history-item">
          <div>
            <div class="h-text" title="${escapeHtml(item.input)}">${escapeHtml(item.input)}</div>
            <div class="h-meta">${item.date} · ${typeLabel}</div>
          </div>
          <span class="h-badge ${v.cls}">${v.label} (${item.score})</span>
        </div>`;
      }).join("");
    }

    function saveHistory(type, rawInput, score){
      try{
        let history = JSON.parse(localStorage.getItem("kizilkaya_history") || "[]");
        history.unshift({
          date: new Date().toLocaleString("tr-TR"),
          type,
          input: rawInput.substring(0,80) + (rawInput.length > 80 ? "…" : ""),
          score
        });
        localStorage.setItem("kizilkaya_history", JSON.stringify(history.slice(0,30)));
        renderHistory();
      } catch(e){ /* localStorage kullanılamıyor olabilir */ }
    }

    if(clearHistoryBtn){
      clearHistoryBtn.addEventListener("click", () => {
        if(confirm("Tüm tarama geçmişi silinecek. Emin misin?")){
          localStorage.removeItem("kizilkaya_history");
          renderHistory();
        }
      });
    }

    scanBtn.addEventListener("click", () => {
      const raw = scanInput.value.trim();
      if(!raw){ alert("Lütfen taranacak bir bağlantı veya mesaj gir."); return; }

      scanBtn.disabled = true;
      scanBtn.textContent = "TARANIYOR…";

      setTimeout(() => {
        scanBtn.disabled = false;
        scanBtn.textContent = "TARA";

        const r = scanMode === "link" ? analyzeUrlContent(raw) : analyzeTextContent(raw);
        const v = qrVerdict(r.score);

        scanResult.classList.remove("hidden");
        scanBadge.textContent = v.label;
        scanBadge.className = "qr-badge " + v.cls;
        scanScore.textContent = `Risk Puanı: ${r.score}/100`;

        scanFindings.innerHTML = "";
        const reasons = r.reasons.length ? r.reasons : ["Belirgin bir dolandırıcılık veya şüpheli yapı kalıbına rastlanmadı. Yine de temkinli ol."];
        reasons.forEach(reason => {
          const div = document.createElement("div");
          const t = r.score>=55 ? "bad" : r.score>=25 ? "warn" : "ok";
          div.className = `finding ${t}`;
          div.innerHTML = `<span>${t==="ok"?"✓":t==="warn"?"!":"✕"}</span><span>${reason}</span>`;
          scanFindings.appendChild(div);
        });

        saveHistory(scanMode, raw, r.score);
      }, 700);
    });

    renderHistory();
  })();

  /* ======================= SERVICE WORKER ======================= */
  if("serviceWorker" in navigator){
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

})();

