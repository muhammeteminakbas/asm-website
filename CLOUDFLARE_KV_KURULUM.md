# Cloudflare KV Kurulum Rehberi

Admin panelinden yapılan değişikliklerin anında tüm ziyaretçiler için görünür olması için Cloudflare KV kurulumu gereklidir.

## ⚠️ ÖNEMLİ: Bu Kurulum Neden Gerekli?

KV kurulumu yapılmadan, admin panelinden yapılan değişiklikler sadece o tarayıcının localStorage'ında kalır. KV kurulumu ile:
- ✅ Değişiklikler anında tüm ziyaretçiler için görünür olur
- ✅ GitHub'a push etmeye gerek kalmaz
- ✅ Admin panelinden yapılan her değişiklik canlı sitede hemen yansır

---

## 📋 Adım 1: Cloudflare KV Namespace Oluşturma

1. **Cloudflare Dashboard'a giriş yapın:**
   - https://dash.cloudflare.com adresine gidin
   - Hesabınıza giriş yapın

2. **KV Namespace oluşturun:**
   - Sol menüden **"Workers & Pages"** seçeneğine tıklayın
   - Üst menüden **"KV"** sekmesine gidin
   - **"Create a namespace"** butonuna tıklayın
   - **Namespace adı:** `ASM_WEBSITE_DATA` (tam olarak bu ismi kullanın, büyük/küçük harf önemli)
   - **"Add"** butonuna tıklayın
   - Namespace oluşturulduktan sonra **Namespace ID**'yi not edin (ileride gerekebilir)

---

## 📋 Adım 2: Pages Projesine KV Binding Ekleme

1. **Projenize gidin:**
   - Cloudflare Dashboard → **"Workers & Pages"** → **"Pages"** sekmesine gidin
   - **"asm-website"** (veya projenizin adı) projesine tıklayın

2. **Settings'e gidin:**
   - Proje sayfasında üst menüden **"Settings"** sekmesine tıklayın
   - Sol menüden **"Functions"** seçeneğine tıklayın

3. **KV Binding ekleyin:**
   - **"KV Namespace Bindings"** bölümünü bulun
   - **"Add binding"** butonuna tıklayın
   - Şu bilgileri girin:
     - **Variable name:** `ASM_WEBSITE_DATA` (tam olarak bu ismi kullanın, büyük/küçük harf önemli)
     - **KV namespace:** Açılır menüden az önce oluşturduğunuz namespace'i seçin
   - **"Save"** butonuna tıklayın

---

## 📋 Adım 3: İlk Verileri Yükleme

KV kurulumu tamamlandıktan sonra, mevcut verilerinizi KV'ye yüklemeniz gerekiyor:

### Yöntem 1: Admin Panelinden (Önerilen)

1. Sitenize gidin: https://taskentmerkezasm.com
2. Admin paneline giriş yapın
3. Herhangi bir küçük değişiklik yapın (örneğin bir metin düzenleyin)
4. **"Kaydet"** butonuna tıklayın
5. **"Değişiklikleri Yayınla"** butonuna tıklayın
6. Artık KV'ye kaydedilmiş olmalı!

### Yöntem 2: PowerShell ile (Alternatif)

Eğer admin panelinden çalışmazsa, PowerShell ile yükleyebilirsiniz:

```powershell
# JSON dosyanızın yolunu güncelleyin
$jsonPath = "c:\Users\e-akb\Downloads\asm-website-data-2026-01-22.json"
$jsonContent = Get-Content $jsonPath -Raw -Encoding UTF8
$jsonData = $jsonContent | ConvertFrom-Json
$body = $jsonData | ConvertTo-Json -Depth 100 -Compress

# API'ye gönder
$response = Invoke-WebRequest -Uri "https://taskentmerkezasm.com/api/data" -Method POST -Body $body -ContentType "application/json; charset=utf-8" -UseBasicParsing
Write-Host "Başarılı! Status: $($response.StatusCode)"
```

---

## 📋 Adım 4: Test Etme

1. **Admin panelinden bir değişiklik yapın:**
   - Örneğin, "Genel Bilgiler" bölümünden telefon numarasını değiştirin
   - **"Kaydet"** butonuna tıklayın
   - **"Değişiklikleri Yayınla"** butonuna tıklayın
   - "Değişiklikler anında yayınlandı!" mesajını görmelisiniz

2. **Farklı bir tarayıcı veya cihazdan kontrol edin:**
   - Gizli mod (Incognito) açın veya başka bir tarayıcı kullanın
   - Siteye gidin: https://taskentmerkezasm.com
   - Yaptığınız değişikliğin göründüğünü kontrol edin

---

## ✅ Kurulum Tamamlandı!

Artık admin panelinden yaptığınız tüm değişiklikler:
- ✅ Anında tüm ziyaretçiler için görünür olacak
- ✅ GitHub'a push etmeye gerek kalmayacak
- ✅ "Değişiklikleri Yayınla" butonuna tıklayınca hemen canlıya geçecek

---

## 📊 Limitler ve Fiyatlandırma

**Ücretsiz Plan:**
- ✅ **100.000 okuma/gün** (günlük ziyaretçi sayısına göre)
- ✅ **1.000 yazma/gün** (admin panelinden yapılan değişiklikler)
- ✅ Çoğu site için yeterlidir

**Not:** Eğer KV kurulumu yapılmazsa, sistem otomatik olarak localStorage'a geri döner (sadece o tarayıcıda görünür).

---

## 🔧 Sorun Giderme

### ❌ "API hatası" veya "Cannot read properties of undefined" hatası alıyorsanız:

1. **KV namespace'in doğru bağlandığından emin olun:**
   - Settings → Functions → KV Namespace Bindings bölümüne gidin
   - `ASM_WEBSITE_DATA` binding'inin olduğunu kontrol edin
   - Variable name'in tam olarak `ASM_WEBSITE_DATA` olduğundan emin olun (büyük/küçük harf önemli)

2. **Deploy'in tamamlandığından emin olun:**
   - Pages → Deployments sekmesine gidin
   - Son deployment'ın başarılı olduğunu kontrol edin
   - Eğer hata varsa, logları kontrol edin

### ❌ Değişiklikler görünmüyorsa:

1. **Tarayıcı cache'ini temizleyin:**
   - Ctrl+Shift+Delete (Windows) veya Cmd+Shift+Delete (Mac)
   - "Cached images and files" seçeneğini işaretleyin
   - "Clear data" butonuna tıklayın

2. **Hard refresh yapın:**
   - Ctrl+F5 (Windows) veya Cmd+Shift+R (Mac)

3. **Farklı bir tarayıcıdan test edin:**
   - Gizli mod (Incognito) kullanın

### ❌ Hala çalışmıyorsa:

1. **Cloudflare Pages Functions loglarını kontrol edin:**
   - Pages → Projeniz → Logs sekmesine gidin
   - Hata mesajlarını kontrol edin

2. **KV namespace'in doğru oluşturulduğunu kontrol edin:**
   - Workers & Pages → KV sekmesine gidin
   - `ASM_WEBSITE_DATA` namespace'inin listede olduğunu kontrol edin

3. **Binding'in doğru yapılandırıldığını kontrol edin:**
   - Settings → Functions → KV Namespace Bindings
   - Variable name: `ASM_WEBSITE_DATA` (tam olarak)
   - KV namespace: Doğru namespace seçilmiş olmalı

---

## 💡 İpuçları

- ✅ İlk kurulumdan sonra birkaç dakika bekleyin (deploy süresi)
- ✅ Her değişiklikten sonra "Değişiklikleri Yayınla" butonuna tıklamayı unutmayın
- ✅ KV kurulumu yapıldıktan sonra, localStorage'a geri dönmez (her zaman KV kullanılır)
- ✅ KV'deki veriler, kod içindeki `initializeDefaultData` fonksiyonundaki varsayılan verilerden önceliklidir

---

## 📞 Yardım

Eğer kurulum sırasında sorun yaşarsanız:
1. Yukarıdaki "Sorun Giderme" bölümünü kontrol edin
2. Cloudflare Pages Functions loglarını kontrol edin
3. Bana hata mesajını ve yaptığınız adımları bildirin
