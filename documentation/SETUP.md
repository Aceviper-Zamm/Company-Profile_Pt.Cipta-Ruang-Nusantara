# Panduan Menjalankan Proyek (Setup Guide)

Website Company Profile — **PT Cipta Ruang Nusantara**

---

## 1. Menjalankan di Komputer Lokal

### Prasyarat
- Node.js versi 18 ke atas (disarankan Node.js 20 atau 22).
- npm / pnpm / yarn.

### Langkah Instalasi
1. Buka folder proyek di terminal:
   ```bash
   cd "Company Profile"
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Salin file contoh environment variable:
   ```bash
   cp .env.example .env.local
   ```
4. Jalankan server lokal:
   ```bash
   npm run dev
   ```
5. Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 2. Struktur Folder Proyek

```
├── documentation/          # Dokumentasi progres, setup, dan keputusan teknis
│   ├── PROGRESS.md         # Checklist & status pengerjaan bertahap
│   ├── SETUP.md            # Panduan instalasi dan deployment
│   └── DECISIONS.md        # Catatan keputusan teknis penting
├── public/                 # File publik statis (favicon, logo, uploads)
│   ├── images/             # Gambar dummy / aset statis landing page
│   └── uploads/            # Folder penyimpanan file upload lokal (Step 2)
├── src/
│   ├── app/                # Next.js App Router (halaman & layout)
│   │   ├── globals.css     # Design tokens & styling Tailwind
│   │   ├── layout.tsx      # Root layout, SEO metadata, fonts
│   │   └── page.tsx        # Halaman utama landing page
│   ├── components/         # Komponen UI modular
│   │   ├── navbar.tsx      # Header & navigasi responsif
│   │   ├── hero.tsx        # Section Hero & key metrics
│   │   ├── about.tsx       # Section Tentang Kami & pilar arsitektur
│   │   ├── services.tsx    # Section 6 Layanan & spesialisasi
│   │   ├── news.tsx        # Section Berita & wawasan
│   │   ├── contact.tsx     # Section Kontak, Form & Google Maps embed
│   │   └── footer.tsx      # Footer studio & tautan jaringan
│   ├── config/             # Data terpusat (site.ts)
│   └── lib/                # Helper utilities (cn, storage, auth)
├── tailwind.config.ts      # Konfigurasi Tailwind & warna tema
└── package.json            # Daftar dependensi proyek
```

---

## 3. Daftar Gambar & Rekomendasi Dimensi

| Lokasi | Rekomendasi Ukuran | Format | Deskripsi |
|---|---|---|---|
| Hero Backdrop | 1920 × 1080 px | JPG / WebP | Foto arsitektur tropis megah / twilight |
| Studio Jakarta | 800 × 600 px | JPG / WebP | Ruang atelier arsitek & meja maket |
| Pengawasan Lapangan | 800 × 600 px | JPG / WebP | Detail konstruksi beton ekspos presisi |
| Kartu Layanan (6 unit) | 800 × 500 px | JPG / WebP | Foto proyek villa, kantor, interior, lanskap, dsb. |
| Thumbnail Berita (3 unit) | 800 × 480 px | JPG / WebP | Foto ilustrasi riset, BIM 3D, dokumen teknis |

