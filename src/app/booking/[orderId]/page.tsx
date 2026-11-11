"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Clock,
  CheckCircle,
  Copy,
  ArrowLeft,
  QrCode,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
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
  status: string;
  created_at: string;
}

export default function BookingPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setOrder(data.data);
        } else {
          setError(data.error || "Pesanan tidak ditemukan.");
        }
      } catch {
        setError("Gagal memuat detail pesanan.");
      } finally {
        setLoading(false);
      }
    }

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const handleCopyTicket = () => {
    if (order) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant gap-2">
        <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="font-headline text-label-md uppercase tracking-wider">
          Memuat Tiket Reservasi...
        </span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-margin">
        <div className="p-space-lg bg-surface-container-low border border-white/5 rounded-DEFAULT max-w-md text-center flex flex-col gap-space-md">
          <p className="font-body text-body-sm text-red-400">{error || "Tiket tidak ditemukan."}</p>
          <Link
            href="/booking"
            className="px-space-md py-2 bg-primary-container text-on-primary font-headline text-label-sm uppercase tracking-wider rounded-DEFAULT"
          >
            Buat Reservasi Baru
          </Link>
        </div>
      </div>
    );
  }

  const formattedAmount =
    typeof order.amount === "number"
      ? `Rp ${order.amount.toLocaleString("id-ID")}`
      : `Rp ${order.amount}`;

  const waMessage = encodeURIComponent(
    `Halo Admin Cipta Ruang, saya telah melakukan transfer pembayaran QRIS untuk tiket pemesanan ${order.id} sebesar ${formattedAmount} atas nama ${order.customer_name}. Mohon verifikasi dan konfirmasinya.`
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface py-space-xl px-margin md:px-margin-tablet">
      <div className="max-w-4xl mx-auto flex flex-col gap-space-xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/my-orders"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-headline text-label-md uppercase tracking-wider">
              Lihat Pesanan Anda
            </span>
          </Link>
          <span className="font-headline text-headline-sm font-medium tracking-widest text-on-surface uppercase">
            CIPTA RUANG
          </span>
        </div>

        {/* Status Top Banner */}
        <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono text-primary uppercase tracking-widest">
              TIKET RESERVASI RESMI DITERBITKAN
            </span>
            <div className="flex items-center gap-3">
              <h1 className="font-headline text-headline-md font-semibold text-on-surface">
                {order.id}
              </h1>
              <button
                type="button"
                onClick={handleCopyTicket}
                className="p-1.5 text-on-surface-variant hover:text-primary rounded-DEFAULT hover:bg-surface-container transition-colors"
                title="Salin Kode Tiket"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-DEFAULT text-xs font-headline uppercase tracking-wider ${
                order.status === "dikonfirmasi"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : order.status === "dibatalkan"
                  ? "bg-red-500/15 text-red-400 border border-red-500/30"
                  : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {order.status === "menunggu_konfirmasi"
                ? "MENUNGGU KONFIRMASI"
                : order.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Dual Grid: QRIS Scanner Card & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* Left Column: QRIS Card */}
          <div className="lg:col-span-6 bg-surface-container-low rounded-DEFAULT border border-white/5 p-space-lg flex flex-col items-center gap-space-md shadow-md">
            <div className="flex items-center gap-2 text-primary">
              <QrCode className="w-5 h-5" />
              <span className="font-headline text-label-sm uppercase tracking-wider font-semibold">
                Scan QRIS Pembayaran Resmi
              </span>
            </div>

            {/* QRIS Image Container */}
            <div className="w-full max-w-[320px] bg-white p-3 rounded-DEFAULT shadow-lg flex flex-col items-center">
              <div className="relative w-full aspect-[3/4.2] overflow-hidden rounded-DEFAULT">
                <Image
                  src={siteConfig.qrisImage}
                  alt="QRIS Pembayaran PT Cipta Ruang Nusantara"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="text-center flex flex-col gap-1 max-w-sm">
              <span className="text-xs font-headline font-semibold text-on-surface uppercase tracking-wider">
                {siteConfig.qrisMerchantName}
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant">
                NMID: {siteConfig.qrisNmid}
              </span>
              <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                Mendukung pembayaran dari semua bank (BCA, Mandiri, BNI, BRI) dan seluruh dompet digital (GoPay, OVO, Dana, ShopeePay, LinkAja).
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary & Steps */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            {/* Summary Details */}
            <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col gap-space-md shadow-sm">
              <span className="font-headline text-label-sm uppercase tracking-wider text-primary font-semibold border-b border-white/5 pb-2">
                Rincian Pemesanan Tiket
              </span>

              <div className="flex flex-col gap-space-sm text-body-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-on-surface-variant">Layanan:</span>
                  <span className="font-medium text-on-surface text-right">{order.service_name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-on-surface-variant">Pemohon:</span>
                  <span className="font-medium text-on-surface">{order.customer_name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-on-surface-variant">WhatsApp:</span>
                  <span className="font-mono text-xs text-on-surface">{order.customer_phone}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-on-surface-variant">Rencana Diskusi:</span>
                  <span className="font-medium text-on-surface text-right">{order.consultation_date}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-headline text-label-md uppercase tracking-wider text-on-surface font-semibold">
                    Total Pembayaran:
                  </span>
                  <span className="font-headline text-headline-sm font-bold text-primary">
                    {formattedAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col gap-space-sm shadow-sm text-body-sm">
              <span className="font-headline text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                Langkah Pembayaran & Konfirmasi:
              </span>
              <ol className="list-decimal list-inside flex flex-col gap-2 text-on-surface-variant text-xs leading-relaxed">
                <li>Buka aplikasi m-Banking atau dompet digital Anda.</li>
                <li>Pilih menu <strong>Bayar / Scan QR</strong> dan arahkan kamera ke gambar QRIS di samping.</li>
                <li>Ketikkan nominal transfer tepat sebesar <strong className="text-primary">{formattedAmount}</strong>.</li>
                <li>Selesaikan transaksi dan simpan tangkapan layar (screenshot) bukti transfer Anda.</li>
                <li>Klik tombol di bawah untuk mengirim bukti transfer langsung ke WhatsApp admin studio.</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
              <a
                href={`https://wa.me/6281192348800?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-space-md px-space-md bg-emerald-600 hover:bg-emerald-500 text-white font-headline text-label-md font-semibold tracking-wider uppercase rounded-DEFAULT transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Konfirmasi via WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                href="/my-orders"
                className="py-space-md px-space-md bg-surface-container hover:bg-surface-variant text-on-surface font-headline text-label-md uppercase tracking-wider rounded-DEFAULT transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <span>Pesanan Anda</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

