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

  /* ======================= SERVICE WORKER ======================= */
  if("serviceWorker" in navigator){
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

})();
