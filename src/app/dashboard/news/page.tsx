"use client";

import { useState, useEffect, useRef } from "react";
import {
  Newspaper,
  Plus,
  Trash2,
  Edit,
  Eye,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  Image as ImageIcon,
} from "lucide-react";

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  status: string; // "published" | "draft"
  created_at: string;
  updated_at: string;
}

export default function NewsManagementPage() {
  const [articles, setArticles] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal State (Create / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    thumbnail_path: "",
    status: "published",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete Confirm Modal
  const [deleteTarget, setDeleteTarget] = useState<News | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch {
      setError("Gagal memuat artikel berita.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      thumbnail_path: "",
      status: "published",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: News) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      thumbnail_path: article.thumbnail_path,
      status: article.status,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError("");

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const resJson = await res.json();

      if (!resJson.success) {
        setError(resJson.error || "Gagal mengunggah gambar.");
        return;
      }

      setFormData((prev) => ({ ...prev, thumbnail_path: resJson.url }));
      setSuccess("Gambar berhasil diunggah ke folder lokal public/uploads/.");
    } catch {
      setError("Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      if (editingArticle) {
        // Update
        const res = await fetch(`/api/news/${editingArticle.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const resJson = await res.json();
        if (!resJson.success) {
          setError(resJson.error || "Gagal memperbarui artikel.");
          setSubmitting(false);
          return;
        }
        setSuccess("Artikel berhasil diperbarui.");
      } else {
        // Create
        const res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const resJson = await res.json();
        if (!resJson.success) {
          setError(resJson.error || "Gagal menambahkan artikel.");
          setSubmitting(false);
          return;
        }
        setSuccess("Artikel baru berhasil ditambahkan.");
      }

      setIsModalOpen(false);
      fetchArticles();
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/news/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Gagal menghapus berita.");
        setDeleteTarget(null);
        return;
      }

      setSuccess(`Artikel "${deleteTarget.title}" berhasil dihapus.`);
      setDeleteTarget(null);
      fetchArticles();
    } catch {
      setError("Gagal menghapus artikel.");
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline text-headline-sm font-semibold text-on-surface">
            CRUD Berita & Publikasi Studio
          </h2>
          <p className="font-body text-body-sm text-on-surface-variant">
            Publikasikan artikel, riset arsitektural, dan monograf proyek langsung ke landing page.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-space-md py-2 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Berita Baru</span>
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

      {/* Articles Table */}
      <div className="bg-surface-container-low rounded-DEFAULT border border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead className="bg-surface-container border-b border-white/5 font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="py-3 px-space-md">Thumbnail</th>
                <th className="py-3 px-space-md">Judul & Ringkasan</th>
                <th className="py-3 px-space-md">Status</th>
                <th className="py-3 px-space-md">Tanggal</th>
                <th className="py-3 px-space-md text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-body">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Memuat daftar berita...
                    </div>
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                    Belum ada artikel berita yang dipublikasikan.
                  </td>
                </tr>
              ) : (
                articles.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-3 px-space-md w-24">
                      <div
                        className="w-20 h-14 bg-cover bg-center rounded-DEFAULT border border-white/10"
                        style={{
                          backgroundImage: `url('${item.thumbnail_path || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"}')`,
                        }}
                      />
                    </td>
                    <td className="py-3 px-space-md max-w-md">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-on-surface line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-xs text-on-surface-variant line-clamp-2">
                          {item.excerpt}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-space-md">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-DEFAULT text-[10px] font-headline uppercase tracking-wider ${
                          item.status === "published"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {item.status === "published" ? "PUBLISHED" : "DRAFT"}
                      </span>
                    </td>
                    <td className="py-3 px-space-md text-on-surface-variant font-mono text-xs whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-space-md text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-DEFAULT transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 rounded-DEFAULT transition-colors"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-low border border-white/10 rounded-DEFAULT p-space-lg w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-space-sm border-b border-white/5 mb-space-md">
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                {editingArticle ? "Edit Artikel Berita" : "Tambah Artikel Berita Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Eksplorasi Materialitas Batu Basalt Lokal"
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Upload Media Section */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Thumbnail Media (Penyimpanan Lokal / URL)
                </label>
                <div className="flex items-center gap-space-md">
                  <div
                    className="w-24 h-16 bg-surface-container rounded-DEFAULT border border-white/10 flex items-center justify-center overflow-hidden shrink-0 bg-cover bg-center"
                    style={{
                      backgroundImage: formData.thumbnail_path
                        ? `url('${formData.thumbnail_path}')`
                        : undefined,
                    }}
                  >
                    {!formData.thumbnail_path && (
                      <ImageIcon className="w-6 h-6 text-on-surface-variant/40" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="px-3 py-1.5 bg-surface-container hover:bg-surface-variant text-on-surface rounded-DEFAULT text-xs font-headline uppercase tracking-wider border border-white/10 flex items-center gap-1.5 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-primary" />
                        <span>{uploadingImage ? "Mengunggah..." : "Unggah Gambar Lokal"}</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={formData.thumbnail_path}
                      onChange={(e) => setFormData({ ...formData, thumbnail_path: e.target.value })}
                      placeholder="Atau tempel URL gambar langsung..."
                      className="bg-surface-container px-3 py-1.5 rounded-DEFAULT text-xs text-on-surface border border-white/5 font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Ringkasan / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Ringkasan singkat artikel yang akan tampil di kartu berita..."
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Konten Lengkap Berita
                </label>
                <textarea
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Tuliskan isi artikel narasi arsitektur secara mendalam..."
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Status Publikasi
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="bg-surface-container px-3 py-2 rounded-DEFAULT text-body-sm text-on-surface border border-white/5 font-headline uppercase focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="published">PUBLISHED (Tampil di Website Utama)</option>
                  <option value="draft">DRAFT (Hanya Tersimpan di Panel Admin)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-space-md py-2 text-on-surface-variant hover:text-on-surface font-headline text-label-md uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-space-md py-2 bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT"
                >
                  {submitting ? "Menyimpan..." : editingArticle ? "Perbarui Artikel" : "Terbitkan Artikel"}
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
                Hapus Artikel Berita?
              </h3>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              Apakah Anda yakin ingin menghapus artikel <strong>{deleteTarget.title}</strong>? Artikel tidak akan lagi tampil di website utama.
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
                onClick={handleDelete}
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

