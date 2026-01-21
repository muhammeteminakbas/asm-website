# GitHub ve Cloudflare Pages Deployment Rehberi

## ADIM 1: GitHub Hesabı Oluşturma

1. https://github.com adresine git
2. "Sign up" butonuna tıkla
3. Email, şifre ve kullanıcı adı gir
4. Email doğrulaması yap

## ADIM 2: Git Kullanıcı Bilgilerini Ayarlama

Terminal'de şu komutları çalıştır (kendi bilgilerinle değiştir):
```bash
git config --global user.name "GitHub Kullanıcı Adın"
git config --global user.email "email@example.com"
```

## ADIM 3: GitHub'da Yeni Repository Oluşturma

1. GitHub'a giriş yap
2. Sağ üstteki "+" ikonuna tıkla → "New repository"
3. Repository adı: `asm-website` (veya istediğin bir isim)
4. Description: "Aile Sağlığı Merkezi Web Sitesi" (isteğe bağlı)
5. Public veya Private seç (Public önerilir - ücretsiz)
6. "Initialize this repository with a README" seçeneğini İŞARETLEME
7. "Create repository" butonuna tıkla

## ADIM 4: Projeyi GitHub'a Yükleme

Terminal'de proje klasöründe şu komutları sırayla çalıştır:

```bash
# 1. Git repository başlat
git init

# 2. Tüm dosyaları ekle
git add .

# 3. İlk commit yap
git commit -m "İlk commit - Aile Sağlığı Merkezi web sitesi"

# 4. Ana branch'i main olarak ayarla
git branch -M main

# 5. GitHub repository'ni bağla (URL'i kendi repository'nden kopyala)
git remote add origin https://github.com/KULLANICI_ADIN/asm-website.git

# 6. Dosyaları GitHub'a yükle
git push -u origin main
```

**ÖNEMLİ:** 5. adımda GitHub'dan aldığın URL'i kullan!

## ADIM 5: Cloudflare Pages'e Bağlama

1. https://dash.cloudflare.com adresine git ve giriş yap
2. Sol menüden "Pages" seçeneğine tıkla
3. "Create a project" butonuna tıkla
4. "Connect to Git" butonuna tıkla
5. GitHub'ı seç ve izin ver
6. Oluşturduğun repository'yi seç
7. "Begin setup" butonuna tıkla
8. Build settings:
   - **Framework preset:** None
   - **Build command:** (boş bırak)
   - **Build output directory:** `/` (sadece slash işareti)
9. "Save and Deploy" butonuna tıkla

## ADIM 6: Domain Bağlama

1. Deploy tamamlandıktan sonra projeye tıkla
2. "Custom domains" sekmesine git
3. "Add a custom domain" butonuna tıkla
4. Domain adını gir (örn: `asmmerkezi.com`)
5. Cloudflare otomatik DNS ayarlarını yapacak
6. Domain sağlayıcında (domain aldığın yer) nameserver'ları Cloudflare'e yönlendir

---

**Sorun yaşarsan haber ver, birlikte çözelim!**
