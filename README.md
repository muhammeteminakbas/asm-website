# Aile Sağlığı Merkezi Web Sitesi

Bu proje Cloudflare Pages üzerinden deploy edilmiştir.

## Deployment

1. Cloudflare Pages'e giriş yap
2. "Create a project" tıkla
3. GitHub repository'ni bağla veya direkt dosya yükle
4. Build settings:
   - Build command: (boş bırak)
   - Build output directory: `/` (root)
5. Domain'i bağla

## Notlar

- Site tamamen statik HTML/CSS/JS ile çalışır
- Admin paneli için localStorage kullanır
- HTTPS otomatik olarak Cloudflare tarafından sağlanır
