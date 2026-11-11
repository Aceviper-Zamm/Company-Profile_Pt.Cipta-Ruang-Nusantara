# Progres Proyek - PT Cipta Ruang Nusantara

Terakhir diperbarui: 11 November 2026
Posisi saat ini: **Step 4 - Deploy ke Vercel & Penyiapan Production (Selesai)**

## Checklist Proyek
- [x] Inisiasi (data usaha & desain terkumpul)
- [x] STEP 1 - Landing page
  - [x] Hero (Headline, Monographic Overline, Dual CTA, Ticker Stats)
  - [x] About (Filosofi, Standar Mutu SNI/Eurocode, Visual Atelier Craft, 3 Pilar Arsitektur)
  - [x] Service (6 Kartu Spesialisasi Layanan Rancang Bangun dengan Material Pills & Badge)
  - [x] Berita/Post (3 Artikel Riset, BIM 5D, Regulasi PBG/SLF dengan Penulis & Read Time)
  - [x] Contact + Google Maps (Jaminan Respon, Detail Kontak Studio, Formulir Konsultasi Interaktif, Google Maps Embed)
  - [x] Responsif & aksesibilitas dicek (Semantik HTML, alt tags, kontras warna, navigasi keyboard)
  - [x] Dikonfirmasi pengguna
- [x] STEP 2 - User management & dashboard
  - [x] Apps Script (code.gs, setup.gs) + inisiasi tabel
  - [x] Login & register
  - [x] Role admin & user
  - [x] Dashboard: manajemen user, manajemen role, CRUD berita
  - [x] Upload media lokal (`public/uploads/`)
  - [x] Dikonfirmasi pengguna
- [x] STEP 3 - Pemesanan / Booking QRIS
  - [x] Form pemesanan paket konsultasi arsitektur (`/booking`)
  - [x] Halaman pembayaran dengan gambar QRIS asli (`public/images/qris.jpg`) & ringkasan tiket (`/booking/[orderId]`)
  - [x] Tiket berstatus `menunggu_konfirmasi` tersimpan ke database spreadsheet (tabel `Orders`)
  - [x] Menu "Pesanan Anda" di navbar untuk pengguna login (`/my-orders`)
  - [x] Dashboard admin menu "Pesanan & Booking" (`/dashboard/orders`) dengan tombol Konfirmasi Pembayaran dan Tolak
  - [x] Tombol pintas "Hubungi via WhatsApp" (`wa.me`) untuk follow-up manual admin
  - [x] Keamanan server-side: hanya pemilik tiket yang dapat melihat tiketnya, hanya admin yang dapat mengubah status
  - [x] Dikonfirmasi pengguna
- [x] STEP 4 - Deploy & maintenance
  - [x] Siap Deploy ke Vercel (Next.js App Router 100% Vercel-native)
  - [x] Keamanan Git terjaga (semua `.env*`, `code.gs`, `setup.gs`, `uploads` di `.gitignore`)
  - [x] Halaman 404 arsitektur kustom (`src/app/not-found.tsx`)
  - [x] Log pemeliharaan berkala disiapkan (`/documentation/MAINTENANCE.md`)
  - [x] Panduan deployment dan konfigurasi environment variables Vercel selesai

## Status QA Pra-Rilis
- **Build Status**: Lolos 100% (`npm run build` sukses tanpa error tipe atau kompilasi).
- **Aksesibilitas**: Semantik HTML5, alt text pada media visual, kontras warna standar editorial gelap dengan aksen Burnt Amber `#D97736`.
- **Keamanan**: Password ter-enkripsi Bcrypt, sesi HTTP-only cookie JWT, proteksi route admin di sisi server middleware, secret token basis data terisolasi.
- **Basis Data**: Terhubung dua arah dengan Google Spreadsheet via Google Apps Script Web App.
