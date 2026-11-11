"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  UserPlus,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role_id: string;
  status: string;
  created_at: string;
}

interface Role {
  id: string;
  name: string;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "role-user",
  });
  const [submitting, setSubmitting] = useState(false);

  // Delete Confirm Modal
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, rolesRes] = await Promise.all([
        fetch(`/api/users?search=${encodeURIComponent(search)}`),
        fetch("/api/roles"),
      ]);

      const usersData = await usersRes.json();
      const rolesData = await rolesRes.json();

      if (usersData.success) setUsers(usersData.data);
      if (rolesData.success) setRoles(rolesData.data);
    } catch (err) {
      setError("Gagal mengambil data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal menambah pengguna.");
        setSubmitting(false);
        return;
      }

      setSuccess("Pengguna berhasil ditambahkan.");
      setIsAddModalOpen(false);
      setNewUser({ name: "", email: "", password: "", role_id: "role-user" });
      fetchData();
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal mengubah status.");
        return;
      }

      setSuccess(`Status user ${user.name} berhasil diubah.`);
      fetchData();
    } catch (err) {
      setError("Gagal mengubah status user.");
    }
  };

  const handleChangeRole = async (userId: string, newRoleId: string) => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_id: newRoleId }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal mengubah role.");
        return;
      }

      setSuccess("Role berhasil diperbarui.");
      fetchData();
    } catch (err) {
      setError("Gagal memperbarui role.");
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/users/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal menghapus pengguna.");
        setDeleteTarget(null);
        return;
      }

      setSuccess(`Pengguna ${deleteTarget.name} berhasil dihapus.`);
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      setError("Gagal menghapus pengguna.");
    }
  };

  const getRoleName = (roleId: string) => {
    const found = roles.find((r) => r.id === roleId);
    return found ? found.name : roleId;
  };

  return (
    <div className="flex flex-col gap-space-lg">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline text-headline-sm font-semibold text-on-surface">
            Manajemen Pengguna
          </h2>
          <p className="font-body text-body-sm text-on-surface-variant">
            Daftar akun terdaftar, status aktivasi, dan penetapan role pengguna.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-space-md py-2 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Pengguna</span>
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

      {/* Search Bar */}
      <div className="p-space-md bg-surface-container-low rounded-DEFAULT border border-white/5 flex items-center gap-space-sm">
        <Search className="w-4 h-4 text-on-surface-variant" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari pengguna berdasarkan nama atau email..."
          className="bg-transparent flex-1 text-body-sm text-on-surface focus:outline-none placeholder:text-on-surface-variant/60"
        />
      </div>

      {/* Users Table */}
      <div className="bg-surface-container-low rounded-DEFAULT border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead className="bg-surface-container border-b border-white/5 font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="py-3 px-space-md">Pengguna</th>
                <th className="py-3 px-space-md">Email</th>
                <th className="py-3 px-space-md">Role</th>
                <th className="py-3 px-space-md">Status</th>
                <th className="py-3 px-space-md">Terdaftar</th>
                <th className="py-3 px-space-md text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-body">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-on-surface-variant">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Memuat daftar pengguna...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-on-surface-variant">
                    Tidak ada pengguna yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-3 px-space-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-mono text-xs font-bold border border-primary/20">
                          {u.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-on-surface">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-space-md text-on-surface-variant font-mono text-xs">
                      {u.email}
                    </td>
                    <td className="py-3 px-space-md">
                      <select
                        value={u.role_id}
                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                        className="bg-surface-container text-xs px-2 py-1 rounded-DEFAULT border border-white/5 text-primary uppercase font-headline tracking-wider focus:outline-none"
                      >
                        {roles.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-space-md">
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-DEFAULT text-[10px] font-headline uppercase tracking-wider transition-colors ${
                          u.status === "active"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                            : "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25"
                        }`}
                        title="Klik untuk mengubah status aktif/nonaktif"
                      >
                        {u.status === "active" ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Aktif
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Nonaktif
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-space-md text-on-surface-variant font-mono text-xs">
                      {new Date(u.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-space-md text-right">
                      <button
                        onClick={() => setDeleteTarget(u)}
                        className="p-1.5 text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 rounded-DEFAULT transition-colors"
                        title="Hapus Pengguna"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-low border border-white/10 rounded-DEFAULT p-space-lg w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between pb-space-sm border-b border-white/5 mb-space-md">
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                Tambah Akun Pengguna
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Contoh: Ar. Budi Santoso"
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="budi@ciptaruang.id"
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Minimal 6 karakter"
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Role
                </label>
                <select
                  value={newUser.role_id}
                  onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })}
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary uppercase font-headline"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-space-md py-2 text-on-surface-variant hover:text-on-surface font-headline text-label-md uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-space-md py-2 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT"
                >
                  {submitting ? "Menyimpan..." : "Simpan Pengguna"}
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
                Hapus Pengguna?
              </h3>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              Apakah Anda yakin ingin menghapus akun <strong>{deleteTarget.name}</strong> ({deleteTarget.email})? Tindakan ini tidak dapat dibatalkan.
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
                onClick={handleDeleteUser}
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

