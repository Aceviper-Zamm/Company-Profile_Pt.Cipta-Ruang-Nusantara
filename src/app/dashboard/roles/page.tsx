"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Plus,
  Trash2,
  Lock,
  CheckCircle,
  AlertCircle,
  X,
  Edit,
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string;
  is_system: string | boolean;
  created_at: string;
}

export default function RolesManagementPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: "read",
  });
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal State
  const [editTarget, setEditTarget] = useState<Role | null>(null);

  // Delete Target
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/roles");
      const data = await res.json();
      if (data.success) {
        setRoles(data.data);
      }
    } catch {
      setError("Gagal mengambil data role.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRole),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal membuat role.");
        setSubmitting(false);
        return;
      }

      setSuccess("Role baru berhasil dibuat.");
      setIsAddOpen(false);
      setNewRole({ name: "", description: "", permissions: "read" });
      fetchRoles();
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/roles/${editTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: editTarget.description,
          permissions: editTarget.permissions,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal memperbarui role.");
        setSubmitting(false);
        return;
      }

      setSuccess("Role berhasil diperbarui.");
      setEditTarget(null);
      fetchRoles();
    } catch {
      setError("Gagal memperbarui role.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRole = async () => {
    if (!deleteTarget) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/roles/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal menghapus role.");
        setDeleteTarget(null);
        return;
      }

      setSuccess(`Role ${deleteTarget.name} berhasil dihapus.`);
      setDeleteTarget(null);
      fetchRoles();
    } catch {
      setError("Gagal menghapus role.");
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline text-headline-sm font-semibold text-on-surface">
            Manajemen Role & Hak Akses
          </h2>
          <p className="font-body text-body-sm text-on-surface-variant">
            Atur hierarki akses sistem. Role bawaan dilindungi untuk menjaga integritas keamanan.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-space-md py-2 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Role</span>
        </button>
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

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {loading ? (
          <div className="col-span-full py-12 text-center text-on-surface-variant flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Memuat daftar role...
          </div>
        ) : (
          roles.map((role) => {
            const isSystem = String(role.is_system) === "true";
            return (
              <div
                key={role.id}
                className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col justify-between gap-space-md shadow-sm"
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-headline text-headline-sm font-semibold text-primary uppercase">
                      {role.name}
                    </span>
                    {isSystem ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container text-[10px] font-mono text-on-surface-variant rounded-DEFAULT border border-white/5">
                        <Lock className="w-3 h-3 text-primary" /> SYSTEM
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-primary-container/20 text-[10px] font-mono text-primary rounded-DEFAULT border border-primary/20">
                        CUSTOM
                      </span>
                    )}
                  </div>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="pt-space-sm border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-headline tracking-wider text-on-surface-variant">
                      Permissions
                    </span>
                    <span className="text-xs font-mono text-on-surface">
                      {role.permissions}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditTarget(role)}
                      className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-DEFAULT transition-colors"
                      title="Ubah Deskripsi & Izin"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {!isSystem && (
                      <button
                        onClick={() => setDeleteTarget(role)}
                        className="p-1.5 text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 rounded-DEFAULT transition-colors"
                        title="Hapus Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Role Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-low border border-white/10 rounded-DEFAULT p-space-lg w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between pb-space-sm border-b border-white/5 mb-space-md">
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                Tambah Role Baru
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRole} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Nama Role * (huruf kecil tanpa spasi)
                </label>
                <input
                  type="text"
                  required
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="contoh: editor"
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Deskripsi
                </label>
                <textarea
                  rows={2}
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Keterangan peruntukan role..."
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Hak Akses / Permission
                </label>
                <select
                  value={newRole.permissions}
                  onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
                >
                  <option value="read">read (Hanya membaca konten)</option>
                  <option value="news_editor">news_editor (Dapat mengelola berita)</option>
                  <option value="client">client (Akses pesanan klien)</option>
                  <option value="*">* (Akses penuh)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-space-md py-2 text-on-surface-variant hover:text-on-surface font-headline text-label-md uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-space-md py-2 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT"
                >
                  {submitting ? "Menyimpan..." : "Buat Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-low border border-white/10 rounded-DEFAULT p-space-lg w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between pb-space-sm border-b border-white/5 mb-space-md">
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                Ubah Role: {editTarget.name.toUpperCase()}
              </h3>
              <button onClick={() => setEditTarget(null)} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditRole} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Deskripsi
                </label>
                <textarea
                  rows={2}
                  value={editTarget.description}
                  onChange={(e) => setEditTarget({ ...editTarget, description: e.target.value })}
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Hak Akses / Permission
                </label>
                <input
                  type="text"
                  value={editTarget.permissions}
                  onChange={(e) => setEditTarget({ ...editTarget, permissions: e.target.value })}
                  placeholder="read, news_editor, *"
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  className="px-space-md py-2 text-on-surface-variant hover:text-on-surface font-headline text-label-md uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-space-md py-2 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT"
                >
                  {submitting ? "Menyimpan..." : "Perbarui Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-low border border-white/10 rounded-DEFAULT p-space-lg w-full max-w-sm shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                Hapus Role?
              </h3>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              Apakah Anda yakin ingin menghapus role <strong>{deleteTarget.name}</strong>? Pengguna dengan role ini mungkin akan kehilangan hak akses tertentu.
            </p>
            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-space-md py-2 text-on-surface-variant hover:text-on-surface font-headline text-label-md uppercase tracking-wider"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteRole}
                className="px-space-md py-2 bg-red-600 hover:bg-red-500 text-white font-headline text-label-md uppercase tracking-wider rounded-DEFAULT"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

