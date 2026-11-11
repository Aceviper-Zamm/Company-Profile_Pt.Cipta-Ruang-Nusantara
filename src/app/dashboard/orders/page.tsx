"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  X,
  Filter,
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Reject / Cancel Modal
  const [cancelTarget, setCancelTarget] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
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
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirmOrder = async (order: Order) => {
    setActionLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "dikonfirmasi",
          admin_notes: "Pembayaran QRIS telah diverifikasi oleh admin.",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal mengonfirmasi pesanan.");
        setActionLoading(false);
        return;
      }

      setSuccess(`Tiket ${order.id} berhasil dikonfirmasi!`);
      fetchOrders();
    } catch {
      setError("Gagal memproses konfirmasi.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelTarget) return;

    setActionLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/orders/${cancelTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "dibatalkan",
          admin_notes: cancelReason || "Dibatalkan oleh admin studio.",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal membatalkan pesanan.");
        setActionLoading(false);
        return;
      }

      setSuccess(`Tiket ${cancelTarget.id} berhasil dibatalkan.`);
      setCancelTarget(null);
      setCancelReason("");
      fetchOrders();
    } catch {
      setError("Gagal membatalkan tiket.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_phone.toLowerCase().includes(search.toLowerCase()) ||
      order.service_name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const cleanPhone = (phone: string) => {
    let p = phone.replace(/[^0-9]/g, "");
    if (p.startsWith("0")) {
      p = "62" + p.slice(1);
    }
    return p;
  };

  return (
    <div className="flex flex-col gap-space-lg">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline text-headline-sm font-semibold text-on-surface">
            Manajemen Tiket Pesanan & Booking QRIS
          </h2>
          <p className="font-body text-body-sm text-on-surface-variant">
            Verifikasi bukti bayar QRIS, konfirmasi tiket, dan hubungi klien langsung melalui WhatsApp.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-surface-container rounded-DEFAULT text-xs font-mono text-primary border border-white/5">
            Total Masuk: {orders.length}
          </span>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-space-md bg-red-500/10 border border-red-500/30 rounded-DEFAULT flex items-center gap-space-sm text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-body text-body-sm">{error}</span>
          <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="p-space-md bg-emerald-500/10 border border-emerald-500/30 rounded-DEFAULT flex items-center gap-space-sm text-emerald-400">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="font-body text-body-sm">{success}</span>
          <button onClick={() => setSuccess("")} className="ml-auto text-emerald-400 hover:text-emerald-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
        <div className="md:col-span-8 p-space-md bg-surface-container-low rounded-DEFAULT border border-white/5 flex items-center gap-space-sm">
          <Search className="w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan No Tiket, Nama Klien, atau WhatsApp..."
            className="bg-transparent flex-1 text-body-sm text-on-surface focus:outline-none placeholder:text-on-surface-variant/60"
          />
        </div>

        <div className="md:col-span-4 p-space-md bg-surface-container-low rounded-DEFAULT border border-white/5 flex items-center gap-space-sm">
          <Filter className="w-4 h-4 text-primary shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent flex-1 text-body-sm text-on-surface font-headline uppercase focus:outline-none"
          >
            <option value="all" className="bg-surface-container">SEMUA STATUS</option>
            <option value="menunggu_konfirmasi" className="bg-surface-container">MENUNGGU KONFIRMASI</option>
            <option value="dikonfirmasi" className="bg-surface-container">DIKONFIRMASI</option>
            <option value="dibatalkan" className="bg-surface-container">DIBATALKAN</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-surface-container-low rounded-DEFAULT border border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead className="bg-surface-container border-b border-white/5 font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="py-3 px-space-md">ID Tiket</th>
                <th className="py-3 px-space-md">Klien & Kontak</th>
                <th className="py-3 px-space-md">Paket & Jadwal</th>
                <th className="py-3 px-space-md">Nominal</th>
                <th className="py-3 px-space-md">Status</th>
                <th className="py-3 px-space-md text-right">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-body">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Memuat data tiket pesanan...
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    Tidak ada pesanan yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((item) => {
                  const formattedNominal =
                    typeof item.amount === "number"
                      ? `Rp ${item.amount.toLocaleString("id-ID")}`
                      : `Rp ${item.amount}`;

                  const phoneClean = cleanPhone(item.customer_phone);
                  const waUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(
                    `Halo Bapak/Ibu ${item.customer_name}, kami dari Tim Administrasi PT Cipta Ruang Nusantara terkait reservasi tiket ${item.id} untuk ${item.service_name}.`
                  )}`;

                  return (
                    <tr key={item.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="py-3 px-space-md font-mono text-xs font-semibold text-primary">
                        {item.id}
                      </td>

                      <td className="py-3 px-space-md">
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">
                            {item.customer_name}
                          </span>
                          <span className="font-mono text-xs text-on-surface-variant">
                            {item.customer_phone}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-space-md max-w-xs">
                        <div className="flex flex-col">
                          <span className="font-medium text-on-surface line-clamp-1">
                            {item.service_name}
                          </span>
                          <span className="text-xs text-on-surface-variant line-clamp-1">
                            {item.consultation_date}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-space-md font-headline font-semibold text-primary whitespace-nowrap">
                        {formattedNominal}
                      </td>

                      <td className="py-3 px-space-md">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-DEFAULT text-[10px] font-headline uppercase tracking-wider font-semibold ${
                            item.status === "dikonfirmasi"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : item.status === "dibatalkan"
                              ? "bg-red-500/15 text-red-400 border border-red-500/30"
                              : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {item.status === "menunggu_konfirmasi"
                            ? "MENUNGGU"
                            : item.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3 px-space-md text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Hubungi via WhatsApp shortcut */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-DEFAULT border border-emerald-500/20 transition-colors"
                            title="Hubungi Klien via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Action Button: Konfirmasi */}
                          {item.status !== "dikonfirmasi" && (
                            <button
                              onClick={() => handleConfirmOrder(item)}
                              disabled={actionLoading}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-DEFAULT text-xs font-headline uppercase tracking-wider transition-colors shadow-sm"
                              title="Konfirmasi Pembayaran QRIS"
                            >
                              Konfirmasi
                            </button>
                          )}

                          {/* Action Button: Batalkan */}
                          {item.status !== "dibatalkan" && (
                            <button
                              onClick={() => setCancelTarget(item)}
                              className="px-2 py-1 bg-surface-container hover:bg-red-500/20 text-on-surface-variant hover:text-red-400 rounded-DEFAULT text-xs font-headline uppercase tracking-wider border border-white/5 transition-colors"
                              title="Tolak atau Batalkan Tiket"
                            >
                              Tolak
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject / Cancel Confirmation Modal */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-low border border-white/10 rounded-DEFAULT p-space-lg w-full max-w-md shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                Tolak / Batalkan Tiket?
              </h3>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              Tiket <strong>{cancelTarget.id}</strong> atas nama <strong>{cancelTarget.customer_name}</strong> akan ditandai sebagai dibatalkan.
            </p>
            <div className="flex flex-col gap-space-xs">
              <label className="text-xs uppercase font-headline tracking-wider text-on-surface-variant">
                Alasan Pembatalan (Opsional)
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Contoh: Bukti transfer QRIS tidak sesuai / nominal kurang"
                className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                className="px-space-md py-2 text-on-surface-variant hover:text-on-surface font-headline text-label-md uppercase tracking-wider"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={actionLoading}
                className="px-space-md py-2 bg-red-600 hover:bg-red-500 text-white font-headline text-label-md uppercase tracking-wider rounded-DEFAULT"
              >
                {actionLoading ? "Memproses..." : "Ya, Batalkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

