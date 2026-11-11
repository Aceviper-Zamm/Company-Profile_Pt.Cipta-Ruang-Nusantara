"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Calendar,
  Phone,
  User,
  FileText,
  ArrowLeft,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LogIn,
} from "lucide-react";

export default function BookingPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [selectedPackage, setSelectedPackage] = useState(
    siteConfig.bookingPackages[1]?.id || siteConfig.bookingPackages[0]?.id
  );
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [consultationDate, setConsultationDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setCurrentUser(data.user);
          setCustomerName(data.user.name || "");
        }
      } catch {
        // Unauthenticated
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!currentUser) {
      router.push(`/login?callbackUrl=/booking`);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: selectedPackage,
          customer_name: customerName,
          customer_phone: customerPhone,
          consultation_date: consultationDate,
          notes: notes,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal membuat pesanan.");
        setSubmitting(false);
        return;
      }

      // Berhasil, arahkan ke halaman pembayaran QRIS
      router.push(`/booking/${data.data.id}`);
    } catch {
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
      setSubmitting(false);
    }
  };

  const currentPkg = siteConfig.bookingPackages.find(
    (p) => p.id === selectedPackage
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface py-space-xl px-margin md:px-margin-tablet">
      <div className="max-w-5xl mx-auto flex flex-col gap-space-xl">
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-headline text-label-md uppercase tracking-wider">
              Kembali ke Beranda
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-headline text-headline-sm font-medium tracking-widest text-on-surface uppercase">
              CIPTA RUANG
            </span>
          </div>
        </div>

        {/* Page Title */}
        <div className="flex flex-col gap-space-xs max-w-2xl">
          <div className="inline-flex items-center gap-space-sm">
            <span className="w-8 h-[1px] bg-primary" />
            <span className="font-headline text-label-sm text-primary uppercase tracking-[0.2em] font-semibold">
              STEP 3 // RESERVASI KONSULTASI
            </span>
          </div>
          <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg font-semibold text-on-surface tracking-tight">
            Pemesanan Sesi Konsultasi Arsitektur & Perencanaan
          </h1>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Pilih paket asistensi desain yang sesuai dengan skala proyek Anda. Sistem akan menerbitkan tiket reservasi resmi dan instruksi pembayaran QRIS.
          </p>
        </div>

        {/* Authentication Notice Banner */}
        {!authLoading && !currentUser && (
          <div className="p-space-md bg-primary-container/10 border border-primary-container/30 rounded-DEFAULT flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-3">
              <LogIn className="w-5 h-5 text-primary shrink-0" />
              <p className="font-body text-body-sm text-on-surface">
                Anda belum masuk ke akun. Silakan login terlebih dahulu agar tiket tersimpan di menu <strong>Pesanan Anda</strong>.
              </p>
            </div>
            <Link
              href="/login?callbackUrl=/booking"
              className="px-space-md py-1.5 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-sm uppercase tracking-wider rounded-DEFAULT whitespace-nowrap"
            >
              Masuk Sekarang
            </Link>
          </div>
        )}

        {/* Step 1: Package Selection Cards */}
        <div className="flex flex-col gap-space-md">
          <span className="font-headline text-label-sm uppercase tracking-wider text-primary font-semibold">
            1. Pilih Paket Layanan Studio
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {siteConfig.bookingPackages.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`p-space-lg rounded-DEFAULT flex flex-col justify-between cursor-pointer transition-all duration-300 relative border ${
                    isSelected
                      ? "bg-surface-container border-primary shadow-[0_8px_30px_rgba(217,119,54,0.15)] ring-1 ring-primary"
                      : "bg-surface-container-low border-white/5 hover:border-white/20 hover:bg-surface-container/60"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-primary-container text-on-primary font-headline text-[10px] tracking-wider uppercase font-semibold rounded-DEFAULT flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" /> Paling Direkomendasikan
                    </div>
                  )}

                  <div className="flex flex-col gap-space-sm">
                    <span className="text-[11px] font-headline uppercase tracking-wider text-primary">
                      {pkg.category}
                    </span>
                    <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                      {pkg.name}
                    </h3>
                    <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="pt-space-xs pb-space-sm border-b border-white/5">
                      <span className="font-headline text-headline-md font-bold text-primary">
                        {pkg.priceDisplay}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 pt-space-xs">
                      <span className="text-[10px] uppercase font-headline tracking-wider text-on-surface-variant">
                        Cakupan Layanan:
                      </span>
                      {pkg.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-space-md mt-space-md border-t border-white/5 flex items-center justify-between">
                    <span className="font-headline text-label-sm uppercase tracking-wider text-on-surface">
                      {isSelected ? "Paket Terpilih" : "Pilih Paket"}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? "border-primary bg-primary text-on-primary"
                          : "border-white/20"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Form Detail Pemesan */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-md">
            <span className="font-headline text-label-sm uppercase tracking-wider text-primary font-semibold">
              2. Data Pemohon & Jadwal Diskusi
            </span>

            {error && (
              <div className="p-space-md bg-red-500/10 border border-red-500/30 rounded-DEFAULT text-red-400 text-body-sm">
                {error}
              </div>
            )}

            <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-space-md shadow-sm">
              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" /> Nama Lengkap Pemohon *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Raden Wirasasmita"
                  className="bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-primary" /> Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+62 812-xxxx-xxxx"
                  className="bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> Rencana Tanggal & Waktu Diskusi
                </label>
                <input
                  type="text"
                  value={consultationDate}
                  onChange={(e) => setConsultationDate(e.target.value)}
                  placeholder="Contoh: Senin, 25 Nov 2026 - Pukul 14.00 WIB"
                  className="bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-primary" /> Lokasi Lahan & Catatan Tambahan
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Tapak lereng di Ubud Bali, luas 800m²"
                  className="bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Checkout Action Summary */}
          <div className="p-space-lg bg-surface-container rounded-DEFAULT border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-space-md shadow-md">
            <div className="flex flex-col">
              <span className="text-xs uppercase font-headline tracking-wider text-on-surface-variant">
                Total Biaya Pemesanan:
              </span>
              <span className="font-headline text-headline-md font-bold text-primary">
                {currentPkg?.priceDisplay}
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Paket: {currentPkg?.name}
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-space-xl py-space-md bg-primary-container hover:bg-primary-container/90 disabled:bg-primary-container/50 text-on-primary font-headline text-label-md font-semibold tracking-[0.14em] uppercase rounded-DEFAULT transition-all duration-300 flex items-center justify-center gap-space-sm shadow-[0_4px_20px_rgba(217,119,54,0.3)] hover:shadow-[0_6px_28px_rgba(217,119,54,0.45)]"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                  Menerbitkan Tiket...
                </span>
              ) : (
                <>
                  <span>Lanjut ke Pembayaran QRIS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

