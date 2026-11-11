export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  materials: string[];
  image: string;
  stats: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  thumbnail: string;
}

export interface BookingPackage {
  id: string;
  name: string;
  category: string;
  price: number;
  priceDisplay: string;
  description: string;
  deliverables: string[];
  isPopular?: boolean;
}

export const siteConfig = {
  name: "PT Cipta Ruang Nusantara",
  atelierName: "CIPTA RUANG",
  subTitle: "ARSITEKTUR & KONSTRUKSI PRESISI",
  tagline: "Mewujudkan Ruang Hidup yang Fungsional, Estetis, & Bernilai Tinggi",
  description:
    "Studio arsitektur terpadu berstandar presisi tinggi di Indonesia. Memadukan kepekaan materialitas tropis, kalkulasi struktur komprehensif, dan kurasi spasial berkelanjutan.",
  qrisImage: "/images/qris.jpg",
  qrisMerchantName: "MOHAMMAD AMMAR AYYASY, DIGITAL & KREATIF",
  qrisNmid: "ID1026545853032",
  about: {
    history:
      "Didirikan pada 2012 di Jakarta, PT Cipta Ruang Nusantara berakar pada komitmen filosofis: arsitektur tropis bukan sekadar pelindung cuaca, melainkan dialog harmonis antara proporsi ruang, materialitas lokal, dan kejujuran konstruksi.",
    philosophy:
      "Kami menjembatani batas antara laboratorium eksperimen konseptual studio dan disiplin ketat pengawasan lapangan. Melalui integrasi pemodelan parametrik dan kalkulasi struktur mikro presisi, setiap bentang kolom, bukaan kisi kayu ulin, hingga bidang beton ekspos dieksekusi dengan standar toleransi milimeter.",
    metrics: [
      { label: "Standar Mutu Struktur", value: "SNI 2847 & Eurocode" },
      { label: "Sertifikasi Praktisi", value: "IAI Utama & LPJK Kelas 1" },
    ],
    pillars: [
      {
        icon: "eco",
        badge: "Keberlanjutan Tropis",
        title: "Desain Berkelanjutan",
        description:
          "Optimasi sirkulasi udara silang alami, kanopi peneduh surya terukur, pencahayaan pasif, dan kurasi material rendah karbon lokal ramah ekosistem kepulauan.",
      },
      {
        icon: "architecture",
        badge: "Komputasi Presisi",
        title: "Presisi Teknis BIM 5D & RAB",
        description:
          "Kalkulasi struktur mikro, simulasi detail toleransi hingga 2mm, dan transparansi volume anggaran konstruksi (Bill of Quantities) tanpa deviasi tak terduga.",
      },
      {
        icon: "engineering",
        badge: "End-to-End Build",
        title: "Manajemen Konstruksi Terpadu",
        description:
          "Pengawasan ketat dan manajemen kontraktor berlisensi dari perataan tapak, pengecoran struktur, hingga penataan detail interior serah terima kunci.",
      },
    ],
  },
  stats: [
    { value: "120+", label: "Proyek Selesai", detail: "Residensial, komersial, & masterplan" },
    { value: "12", label: "Tahun Dedikasi", detail: "Integritas spasial kepulauan Nusantara" },
    { value: "98%", label: "Kepuasan Klien", detail: "Akurasi anggaran tanpa deviasi" },
  ],
  navItems: [
    { label: "Beranda", href: "/#beranda" },
    { label: "Tentang Kami", href: "/#tentang-kami" },
    { label: "Layanan", href: "/#layanan" },
    { label: "Berita", href: "/#berita" },
    { label: "Kontak", href: "/#kontak" },
  ] as NavItem[],
  bookingPackages: [
    {
      id: "pkg-konsultasi-konseptual",
      name: "Konsultasi Awal & Sketsa Konsep",
      category: "Sesi Diskusi 1-on-1",
      price: 1500000,
      priceDisplay: "Rp 1.500.000",
      description: "Diskusi mendalam bersama arsitek prinsipal, analisis tapak via citra satelit, dan penyusunan sketsa tata ruang awal.",
      deliverables: [
        "Sesi tatap muka 120 menit di Studio Jakarta / Online Video",
        "Moodboard materialitas dan diagram zonasi ruang",
        "Estimasi kasar anggaran biaya (Rough Order of Magnitude)",
      ],
    },
    {
      id: "pkg-studi-kelayakan-bim",
      name: "Studi Kelayakan Tapak & Analisis BIM",
      category: "Kajian Komprehensif",
      price: 3500000,
      priceDisplay: "Rp 3.500.000",
      isPopular: true,
      description: "Survei langsung tapak, uji kontur mikro, simulasi lintasan matahari/angin, dan perhitungan struktur dasar BIM 5D.",
      deliverables: [
        "Laporan survei geospasial & orientasi iklim mikro tapak",
        "Pemodelan 3D massa volumetrik bangunan awal",
        "Draft rencana anggaran biaya (RAB skematik)",
        "Review perizinan & kepatuhan tata ruang kota (PBG)",
      ],
    },
    {
      id: "pkg-retainer-desain-penuh",
      name: "Komitmen Retainer Desain Arsitektur",
      category: "Full Architectural Atelier",
      price: 7500000,
      priceDisplay: "Rp 7.500.000",
      description: "Pengikatan komitmen awal proyek rancang bangun eksklusif untuk penyusunan gambar kerja DED dan spesifikasi material teknis.",
      deliverables: [
        "Alokasi tim prinsipal arsitek dan tenaga ahli struktur",
        "Pengembangan gambar DED (Detail Engineering Design)",
        "Katalog sampel material fisik (stone, wood, terrazzo)",
        "Pengurangan biaya retainer dari total nilai kontrak desain",
      ],
    },
  ] as BookingPackage[],
  services: [
    {
      id: "hunian-villa",
      code: "SEC-01 // ARC",
      title: "Desain Arsitektur Hunian & Villa",
      category: "Private Residential",
      description:
        "Hunian privat berkarakter kuat dengan gubahan massa presisi, privasi maksimal, dan ventilasi mikro alami.",
      badge: "34+ Hunian Terbangun",
      materials: ["Batu Basalt", "Kayu Ulin", "Cantilever 4.5m"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      stats: "REV.2025",
    },
    {
      id: "komersial-kantor",
      code: "HQ-CORP // 18 FL",
      title: "Arsitektur Komersial & Kantor",
      category: "Commercial & Hub",
      description:
        "Gedung bertingkat tinggi dan hub gaya hidup urban yang efisien dalam operasional serta berdaya saing komersial tinggi.",
      badge: "BIM 5D Ready",
      materials: ["Low-E Facade", "Granit Hitam", "Efisiensi Energi 38%"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      stats: "REV.2025",
    },
    {
      id: "desain-interior",
      code: "BESPOKE // 2700K",
      title: "Desain Interior & Tata Ruang",
      category: "Interior Architecture",
      description:
        "Kurasi material taktil, tata cahaya 2700K berlapisan emosional, dan furnitur kustom berpresisi kabinet tinggi.",
      badge: "Akustik & Pencahayaan",
      materials: ["Travertine Roma", "Walnut Veneer", "Smart CCT Control"],
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      stats: "REV.2025",
    },
    {
      id: "masterplan-lanskap",
      code: "BIO // 12.4 HA",
      title: "Masterplan & Tata Lanskap",
      category: "Landscape Masterplan",
      description:
        "Perencanaan kawasan biofilik terintegrasi dengan konservasi topografi kontur alami dan resapan mandiri.",
      badge: "Sertifikasi Green Ship",
      materials: ["Zero Runoff", "Flora Endemik", "Kontur Terawat"],
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      stats: "REV.2025",
    },
    {
      id: "manajemen-konstruksi",
      code: "K3 // ISO 45001",
      title: "Manajemen Konstruksi & Renovasi",
      category: "General Contractor",
      description:
        "Eksekusi fisik berdisiplin tinggi, kepatuhan K3 tanpa kompromi, dan jaminan deviasi anggaran 0%.",
      badge: "Zero Accident",
      materials: ["Toleransi 2mm", "CCTV 24/7 Site", "Garansi Retensi 1 Thn"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      stats: "REV.2025",
    },
    {
      id: "audit-struktur",
      code: "LEGAL // SIMBG",
      title: "Audit Struktur & Perizinan (PBG / SLF)",
      category: "Legal Compliance",
      description:
        "Forensik ketahanan gempa eksisting, uji non-destruktif, dan asistensi sertifikasi laik fungsi resmi.",
      badge: "SLF 100% Lolos",
      materials: ["NDT Hammer Test", "SNI Gempa 1726", "Legalitas PBG/SLF"],
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      stats: "REV.2025",
    },
  ] as ServiceItem[],
  news: [
    {
      id: "1",
      slug: "strategi-ventilasi-silang-alami-tropis",
      title: "Strategi Ventilasi Silang Alami pada Hunian Lahan Sempit Tropis",
      category: "Riset Termal",
      excerpt:
        "Eksplorasi cerobong termal dan inner courtyard vertikal sebagai jawaban atas kenyamanan iklim mikro urban Jakarta.",
      date: "18 FEBRUARI 2025",
      readTime: "5 MIN BACA",
      author: {
        name: "Ar. Arya Nugraha",
        role: "Prinsipal Desain",
        initials: "AN",
      },
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "2",
      slug: "transparansi-anggaran-konstruksi-bim-5d",
      title: "Transparansi Anggaran Konstruksi: Keunggulan Model BIM 5D Terintegrasi",
      category: "Teknologi BIM",
      excerpt:
        "Menghilangkan risiko variasi biaya tak terduga dengan sinkronisasi langsung antara volume CAD dan jadwal RAB lapangan.",
      date: "27 JANUARI 2025",
      readTime: "8 MIN BACA",
      author: {
        name: "Ir. Irwan Santoso",
        role: "Lead QS & Struktur",
        initials: "IS",
      },
      thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "3",
      slug: "panduan-praktis-pengurusan-pbg-slf-2025",
      title: "Panduan Praktis Pengurusan PBG & SLF 2025 untuk Gedung Komersial",
      category: "Regulasi & PBG",
      excerpt:
        "Langkah strategis memenuhi kriteria ketahanan seismik terbaru dalam sistem SIMBG tanpa hambatan birokrasi.",
      date: "12 DESEMBER 2024",
      readTime: "6 MIN BACA",
      author: {
        name: "Dian Widyawati",
        role: "Direktur Legal",
        initials: "DW",
      },
      thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
    },
  ] as NewsItem[],
  contact: {
    address: "Jl. Kemang Timur No. 42B, Bangka, Mampang Prapatan, Jakarta Selatan 12730",
    phone: "+62 21 7890 4321",
    whatsapp: "+62 811-9234-8800",
    whatsappLink: "https://wa.me/6281192348800",
    emailProject: "proyek@ciptaruang.id",
    emailGeneral: "halo@ciptaruang.id",
    hours: "Senin – Sabtu: 08.30 – 17.30 WIB",
    hoursNote: "Konsultasi Akhir Pekan (Perjanjian)",
    coordinates: {
      lat: -6.2792,
      long: 106.8201,
      display: "Lat: -6.2792 | Long: 106.8201",
    },
    mapsUrl: "https://maps.google.com/?q=-6.2792,106.8201",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15863.63937107873!2d106.8114675!3d-6.2792019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f187a5555555%3A0x7d288d6b1d5bf064!2sJl.%20Kemang%20Timur%2C%20Bangka%2C%20Mampang%20Prapatan%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  },
  studios: [
    { city: "Jakarta", district: "Senopati, Kemang", role: "HQ Studio" },
    { city: "Bandung", district: "Dago Pakar Utara", role: "Material Lab" },
    { city: "Bali", district: "Pererenan, Canggu", role: "Resort Unit" },
  ],
  certifications: ["IAI UTAMA", "LPJK KELAS 1", "ISO 9001:2015"],
};
