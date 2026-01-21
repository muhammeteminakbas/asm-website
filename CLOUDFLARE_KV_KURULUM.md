# Cloudflare KV Kurulum Rehberi

Admin panelinden yapılan değişikliklerin anında tüm ziyaretçiler için görünür olması için Cloudflare KV kurulumu gereklidir.

## Adım 1: Cloudflare KV Namespace Oluşturma

1. Cloudflare Dashboard'a giriş yapın: https://dash.cloudflare.com
2. Sol menüden **"Workers & Pages"** → **"KV"** seçeneğine gidin
3. **"Create a namespace"** butonuna tıklayın
4. Namespace adı: `ASM_WEBSITE_DATA` (veya istediğiniz bir isim)
5. **"Add"** butonuna tıklayın

## Adım 2: Pages Projesine KV Binding Ekleme

1. Cloudflare Dashboard → **"Workers & Pages"** → **"Pages"** → **"asm-website"** projesine gidin
2. **"Settings"** sekmesine gidin
3. **"Functions"** bölümünü bulun
4. **"KV Namespace Bindings"** altında **"Add binding"** butonuna tıklayın
5. Şu bilgileri girin:
   - **Variable name:** `ASM_WEBSITE_DATA`
   - **KV namespace:** Oluşturduğunuz namespace'i seçin (örn: `ASM_WEBSITE_DATA`)
6. **"Save"** butonuna tıklayın

## Adım 3: Deploy Kontrolü

1. Değişiklikler otomatik olarak deploy edilecek
2. Birkaç dakika bekleyin
3. Admin panelinden bir değişiklik yapın
4. Değişikliğin anında tüm ziyaretçiler için görünür olduğunu kontrol edin

## Notlar

- KV namespace ücretsiz planında **100.000 okuma/gün** ve **1.000 yazma/gün** limiti vardır
- Bu limitler çoğu site için yeterlidir
- Eğer KV kurulumu yapılmazsa, sistem otomatik olarak localStorage'a geri döner (sadece o tarayıcıda görünür)

## Sorun Giderme

- **API hatası alıyorsanız:** KV namespace'in doğru bağlandığından emin olun
- **Değişiklikler görünmüyorsa:** Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
- **Hala çalışmıyorsa:** Cloudflare Pages Functions loglarını kontrol edin
