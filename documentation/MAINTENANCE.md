# Log Pemeliharaan & Pengembangan (Maintenance Log)

Proyek: **PT Cipta Ruang Nusantara Atelier Website**

---

## 1. Backlog Fitur & Rencana Lanjutan
- [ ] Integrasi Cloud Storage (Vercel Blob / Cloudinary) untuk persistensi media upload di production Vercel
- [ ] Payment Gateway otomatis (Midtrans / Xendit) untuk pembayaran QRIS instan
- [ ] Notifikasi otomatis email (Resend) atau WhatsApp API (Fonnte / WhatsApp Cloud API) saat tiket dibuat dan dikonfirmasi
- [ ] Sambungkan Custom Domain (misal `ciptaruang.id` atau `ciptaruang.com`) di dashboard Vercel
- [ ] Fitur unduh struk/invoice PDF untuk tiket pemesanan klien

---

## 2. Bug Diketahui (Known Issues)
*Belum ada bug aktif yang dilaporkan saat ini. Seluruh alur (Landing Page, Otentikasi, CRUD Berita, Sistem Booking QRIS, dan Integrasi Google Spreadsheet) telah lulus uji build lokal.*

---

## 3. Riwayat Perubahan (Changelog)
- **10 November 2026**: Inisiasi proyek Next.js App Router + Tailwind CSS. Pembuatan Landing page lengkap (Hero, About, Layanan, Berita, Kontak, Google Maps embed).
- **11 November 2026**: Implementasi Step 2: Integrasi basis data Google Spreadsheet via Google Apps Script (`code.gs`, `setup.gs`), Otentikasi JWT + Bcrypt, Panel Admin Dashboard (Manajemen User, Manajemen Role, CRUD Berita).
- **11 November 2026**: Implementasi Step 3: Sistem Reservasi Konsultasi Arsitektur & Pembayaran QRIS merchant resmi, halaman tiket reservasi klien (`/my-orders`), verifikasi pembayaran di dashboard admin (`/dashboard/orders`), tombol kontak otomatis via WhatsApp.
- **11 November 2026**: Implementasi Step 4: Penyiapan aset produksi, halaman 404 arsitektural kustom, panduan deployment ke Vercel, dan template pemeliharaan sistem.

---

## 4. Alur Pemeliharaan Rutin
1. **Untuk Perbaikan Bug:** Catat langkah reproduksi masalah, perbaiki di lingkungan lokal, uji build `npm run build`, lalu deploy perbaikan.
2. **Jika Mengubah File Apps Script (`code.gs` / `setup.gs`):**
   - Salin ulang kode yang diperbarui ke editor Google Apps Script.
   - Buka menu **Deploy > Manage deployments**.
   - Klik ikon **Edit (Pensil)** pada Web app deployment.
   - Ubah versi menjadi **New version** (Versi Baru).
   - Klik **Deploy** agar perubahan di Google Apps Script aktif.

