"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Plus,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

interface Order {
  id: string;
  user_id: string;
  service_id: string;
  service_name: string;
  customer_name: string;
  customer_phone: string;
  consultation_date: string;
  notes: string;
  amount: number | string;
  status: "menunggu_konfirmasi" | "dikonfirmasi" | "dibatalkan";
  admin_notes?: string;
  created_at: string;
}

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();
        if (!authData.success || !authData.user) {
          router.push("/login?callbackUrl=/my-orders");
          return;
        }

        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          setError(data.error || "Gagal memuat daftar pesanan.");
        }
      } catch {
        setError("Terjadi kesalahan jaringan.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [router]);

  return (
    <div className="min-h-screen bg-surface text-on-surface py-space-xl px-margin md:px-margin-tablet">
      <div className="max-w-4xl mx-auto flex flex-col gap-space-xl">
        {/* Navigation Bar */}
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
          <div className="flex items-center gap-space-sm">
            <Link
              href="/booking"
              className="px-space-md py-1.5 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-sm uppercase tracking-wider rounded-DEFAULT transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Reservasi Baru</span>
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-space-xs">
          <div className="inline-flex items-center gap-space-sm">
            <span className="w-8 h-[1px] bg-primary" />
            <span className="font-headline text-label-sm text-primary uppercase tracking-[0.2em] font-semibold">
              PORTAL KLIEN
            </span>
          </div>
          <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg font-semibold text-on-surface tracking-tight">
            Pesanan & Tiket Reservasi Anda
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Pantau status verifikasi pembayaran QRIS dan penjadwalan sesi asistensi arsitektur Anda.
          </p>
        </div>

        {/* Notifications / Errors */}
        {error && (
          <div className="p-space-md bg-red-500/10 border border-red-500/30 rounded-DEFAULT text-red-400 text-body-sm">
            {error}
          </div>
        )}

        {/* Orders List */}
        <div className="flex flex-col gap-space-md">
          {loading ? (
            <div className="py-16 flex items-center justify-center gap-2 text-on-surface-variant">
              <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="font-headline text-label-md uppercase tracking-wider">
                Memuat riwayat tiket Anda...
              </span>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-space-xl bg-surface-container-low rounded-DEFAULT border border-white/5 text-center flex flex-col items-center gap-space-md shadow-sm">
              <Clock className="w-10 h-10 text-on-surface-variant/40" />
              <div className="flex flex-col gap-1">
                <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                  Belum Ada Tiket Pesanan
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant max-w-sm">
                  Anda belum memiliki riwayat reservasi konsultasi arsitektur. Pilih paket layanan untuk memulai.
                </p>
              </div>
              <Link
                href="/booking"
                className="mt-space-xs px-space-lg py-space-sm bg-primary-container text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT"
              >
                Mulai Pemesanan Konsultasi
              </Link>
            </div>
          ) : (
            orders.map((item) => {
              const formattedPrice =
                typeof item.amount === "number"
                  ? `Rp ${item.amount.toLocaleString("id-ID")}`
                  : `Rp ${item.amount}`;

              return (
                <div
                  key={item.id}
                  className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col gap-space-md shadow-sm hover:border-white/10 transition-colors"
                >
                  {/* Top Bar of Ticket Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-b border-white/5 pb-space-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-on-surface">
                        {item.id}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {new Date(item.created_at || Date.now()).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-DEFAULT text-[11px] font-headline uppercase tracking-wider font-semibold ${
                          item.status === "dikonfirmasi"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : item.status === "dibatalkan"
                            ? "bg-red-500/15 text-red-400 border border-red-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {item.status === "dikonfirmasi" ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : item.status === "dibatalkan" ? (
                          <XCircle className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {item.status === "menunggu_konfirmasi"
                          ? "MENUNGGU KONFIRMASI"
                          : item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-headline tracking-wider text-primary">
                        Paket Layanan
                      </span>
                      <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                        {item.service_name}
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant">
                        Jadwal Diskusi: <strong className="text-on-surface">{item.consultation_date}</strong>
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center">
                      <span className="text-[10px] uppercase font-headline tracking-wider text-on-surface-variant">
                        Total Biaya
                      </span>
                      <span className="font-headline text-headline-md font-bold text-primary">
                        {formattedPrice}
                      </span>
                    </div>
                  </div>

                  {/* Status Banner Message */}
                  {item.status === "dikonfirmasi" && (
                    <div className="p-space-md bg-emerald-500/10 border border-emerald-500/30 rounded-DEFAULT flex items-center gap-3 text-emerald-300">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <p className="font-body text-body-sm leading-relaxed">
                        Selamat, pembayaran Anda telah dikonfirmasi! Silakan tunggu informasi selanjutnya dari admin melalui email/WhatsApp.
                      </p>
                    </div>
                  )}

                  {item.status === "menunggu_konfirmasi" && (
                    <div className="p-space-md bg-amber-500/10 border border-amber-500/30 rounded-DEFAULT flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm text-amber-300">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="font-body text-body-sm">
                          Pembayaran sedang menunggu peninjauan bukti transfer oleh admin studio.
                        </span>
                      </div>
                      <Link
                        href={`/booking/${item.id}`}
                        className="text-xs font-headline uppercase tracking-wider text-primary hover:underline whitespace-nowrap flex items-center gap-1"
                      >
                        Buka Halaman QRIS <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {item.status === "dibatalkan" && (
                    <div className="p-space-md bg-red-500/10 border border-red-500/30 rounded-DEFAULT flex items-center gap-3 text-red-300">
                      <XCircle className="w-5 h-5 shrink-0" />
                      <p className="font-body text-body-sm leading-relaxed">
                        Pesanan ini telah dibatalkan. {item.admin_notes && `Alasan: ${item.admin_notes}`}
                      </p>
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="flex items-center justify-between pt-space-xs border-t border-white/5">
                    <Link
                      href={`/booking/${item.id}`}
                      className="text-xs font-headline uppercase tracking-wider text-on-surface-variant hover:text-on-surface flex items-center gap-1"
                    >
                      <span>Lihat QRIS & Invoice</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <a
                      href={`https://wa.me/6281192348800?text=${encodeURIComponent(
                        `Halo Admin Cipta Ruang, saya ingin menanyakan status tiket reservasi saya dengan kode ${item.id}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-headline uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Tanya via WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

