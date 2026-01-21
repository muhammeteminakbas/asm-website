# Değişiklikleri Yayınlama Rehberi

Admin panelinden yaptığınız değişiklikleri tüm ziyaretçiler için görünür yapmak için bu adımları izleyin.

## Yöntem 1: Otomatik Export ve GitHub Push (Önerilen)

### Adım 1: Değişiklikleri Export Edin
1. Admin paneline giriş yapın
2. **"Değişiklikleri Export Et"** (yeşil buton) veya **"Değişiklikleri Yayınla"** (mavi buton) butonuna tıklayın
3. JSON dosyası indirilecek (örn: `asm-website-data-2026-01-21.json`)

### Adım 2: JSON Dosyasını Koda Yansıtın

1. **index.html** dosyasını açın (Cursor veya herhangi bir metin editörü ile)

2. **`initializeDefaultData`** fonksiyonunu bulun (yaklaşık 1950. satır civarı)

3. **JSON dosyasındaki verileri** bu fonksiyonun içindeki `defaultData` dizisine yansıtın:

   - `general` verisi → `general-info` objesini güncelleyin
   - `hours` verisi → `working-hours` objesini güncelleyin
   - `doctor` verileri → `doctor-1`, `doctor-2` vb. objeleri güncelleyin
   - `service` verileri → `service-1`, `service-2` vb. objeleri güncelleyin
   - `gallery` verileri → `gallery-*` objelerini güncelleyin

4. **Örnek:**
   ```javascript
   // JSON'dan:
   {
     "site_title": "Taşkent Merkez Aile Sağlığı Merkezi",
     "phone_number": "(0332) 310 48 77",
     ...
   }
   
   // Koda yansıtın:
   {
     id: 'general-info',
     type: 'general',
     site_title: 'Taşkent Merkez Aile Sağlığı Merkezi',
     phone_number: '(0332) 310 48 77',
     ...
   }
   ```

### Adım 3: GitHub'a Push Edin

Terminal'de (PowerShell veya CMD) şu komutları çalıştırın:

```bash
cd D:\Cursor\asm_website
git add index.html
git commit -m "Admin panelinden yapılan değişiklikler güncellendi"
git push
```

### Adım 4: Bekleyin

- Cloudflare Pages otomatik olarak deploy edecek (1-2 dakika)
- Deploy tamamlandıktan sonra tüm ziyaretçiler için değişiklikler görünür olacak

---

## Yöntem 2: Hızlı Kopyala-Yapıştır (Basit Değişiklikler İçin)

Eğer sadece birkaç alan değiştirdiyseniz (örn: telefon, adres):

1. **index.html** dosyasını açın
2. **Ctrl+F** ile değiştirmek istediğiniz metni bulun (örn: `(0312) 123 45 67`)
3. Yeni değerle değiştirin (örn: `(0332) 310 48 77`)
4. **GitHub'a push edin** (Yöntem 1, Adım 3)

---

## Yöntem 3: Otomatik Script (İleri Seviye)

Daha otomatik bir çözüm için bir script oluşturabilirsiniz, ama bu daha karmaşık.

---

## Sorun Giderme

### "git: command not found" hatası
- Git kurulu değil. [Git'i indirin](https://git-scm.com/download/win) ve kurun.

### "fatal: not a git repository" hatası
- Yanlış klasördesiniz. `cd D:\Cursor\asm_website` komutuyla doğru klasöre gidin.

### Değişiklikler görünmüyor
- Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
- Cloudflare Pages deploy'unun tamamlanmasını bekleyin (1-2 dakika)
- Hard refresh yapın (Ctrl+F5)

---

## İpuçları

- Her değişiklikten sonra mutlaka GitHub'a push edin
- Export ettiğiniz JSON dosyalarını yedek olarak saklayın
- Büyük değişiklikler yapmadan önce mevcut kodu yedekleyin

---

## Hızlı Referans: initializeDefaultData Konumu

`index.html` dosyasında **1950. satır civarında** `async function initializeDefaultData()` fonksiyonunu bulun.

Bu fonksiyonun içindeki `defaultData` dizisini JSON dosyanızdaki verilerle güncelleyin.
