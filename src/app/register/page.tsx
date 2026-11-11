"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi client-side
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Registrasi gagal.");
        setLoading(false);
        return;
      }

      router.push("/login?registered=1");
    } catch (err) {
      setError("Terjadi kesalahan koneksi. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl">
      <div className="w-full max-w-md flex flex-col gap-space-lg">
        {/* Header */}
        <div className="flex flex-col gap-space-xs text-center">
          <Link href="/" className="flex items-center justify-center gap-space-sm text-on-surface-variant hover:text-on-surface transition-colors mb-space-md">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-headline text-label-md uppercase tracking-wider">Kembali ke Beranda</span>
          </Link>
          <div className="flex flex-col items-center">
            <span className="font-headline text-headline-sm font-medium tracking-widest text-on-surface uppercase">
              CIPTA RUANG
            </span>
            <span className="font-headline text-[10px] tracking-[0.22em] text-on-surface-variant uppercase">
              Portal Arsitektur & Konstruksi
            </span>
          </div>
          <h1 className="font-headline text-headline-md font-semibold text-on-surface mt-space-sm">
            Buat Akun Baru
          </h1>
          <p className="font-body text-body-sm text-on-surface-variant">
            Daftarkan diri untuk mengakses portal klien.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-space-md bg-red-500/10 border border-red-500/30 rounded-DEFAULT text-center">
            <p className="font-body text-body-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 shadow-md relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex flex-col gap-space-xs">
            <label htmlFor="name" className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
              Nama Lengkap *
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              autoComplete="name"
              className="w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-space-xs">
            <label htmlFor="email" className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
              autoComplete="email"
              className="w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-space-xs">
            <label htmlFor="password" className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
              Password * (min. 6 karakter)
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Buat password"
                autoComplete="new-password"
                className="w-full bg-surface-container px-space-md py-space-sm pr-12 text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <label htmlFor="confirmPassword" className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant">
              Konfirmasi Password *
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password"
              autoComplete="new-password"
              className="w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-space-md bg-primary-container hover:bg-primary-container/90 disabled:bg-primary-container/50 text-on-primary font-headline text-label-md font-semibold tracking-[0.14em] uppercase rounded-DEFAULT transition-all duration-300 flex items-center justify-center gap-space-sm shadow-[0_4px_16px_rgba(217,119,54,0.3)]"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                Mendaftarkan...
              </span>
            ) : (
              <>
                <span>Daftar Akun</span>
                <UserPlus className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <div className="text-center">
          <p className="font-body text-body-sm text-on-surface-variant">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

