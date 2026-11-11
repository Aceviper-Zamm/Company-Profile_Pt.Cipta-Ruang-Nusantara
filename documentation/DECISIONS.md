# Catatan Keputusan Teknis (Technical Decisions)

## 1. Pemilihan Stack Teknologi
- **Framework:** Next.js 14 (App Router) + TypeScript.
  - *Alasan:* Standar industri untuk performa web modern, Vercel-native, SEO-friendly (Server Side Rendering), dan sangat mudah dideploy tanpa konfigurasi server yang rumit.
- **Styling:** Tailwind CSS 3.4.
  - *Alasan:* Integrasi langsung dengan design system dan token dari `DESIGN.md` (warna `surface`, `primary-container`, tipografi `Space Grotesk` dan `Metrophobic`).
- **Icons:** Lucide React & Google Material Symbols.
  - *Alasan:* Ikon arsitektural yang bersih, tajam, dan ringan tanpa memperlambat waktu muat situs.

## 2. Struktur Konfigurasi Konten Terpusat (`src/config/site.ts`)
- Semua konten teks (nama perusahaan, nomor kontak, WhatsApp, surel, alamat, link Google Maps, daftar layanan, dan artikel awal) dipisahkan dari kode tampilan (komponen) ke dalam file `src/config/site.ts`.
- *Manfaat:* Pengguna desainer dapat mengganti konten, kontak, atau teks kapan saja tanpa harus mengedit file JSX/komponen satu per satu.

## 3. Integrasi Google Maps
- Menggunakan iframe embed resmi dengan atribut `loading="lazy"` dan `title` deskriptif untuk performa dan standar aksesibilitas web.
- Dilengkapi tombol navigasi langsung `https://maps.google.com/?q=-6.2792,106.8201` untuk kenyamanan pengguna seluler.

## 4. Antisipasi Step 2 (Google Spreadsheet Database & Media)
- Library `jose` (JWT) dan `bcryptjs` telah disiapkan sejak awal di `package.json`.
- Folder `public/uploads/` disiapkan dengan `.gitkeep` dan aturan `.gitignore` agar file media lokal tidak bercampur ke dalam repository.

