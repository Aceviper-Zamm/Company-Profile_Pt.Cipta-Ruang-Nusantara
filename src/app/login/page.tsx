"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const registered = searchParams.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Login gagal.");
        setLoading(false);
        return;
      }

      // Redirect berdasarkan role
      if (data.user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push(callbackUrl);
      }
      router.refresh();
    } catch {
      setError("Terjadi kesalahan koneksi. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-space-lg">
      {/* Header */}
      <div className="flex flex-col gap-space-xs text-center">
        <Link
          href="/"
          className="flex items-center justify-center gap-space-sm text-on-surface-variant hover:text-on-surface transition-colors mb-space-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-headline text-label-md uppercase tracking-wider">
            Kembali ke Beranda
          </span>
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
          Masuk ke Akun
        </h1>
        <p className="font-body text-body-sm text-on-surface-variant">
          Masukkan email dan password yang terdaftar.
        </p>
      </div>

      {/* Success message setelah register */}
      {registered && (
        <div className="p-space-md bg-emerald-500/10 border border-emerald-500/30 rounded-DEFAULT text-center">
          <p className="font-body text-body-sm text-emerald-400">
            Registrasi berhasil! Silakan login dengan akun baru Anda.
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-space-md bg-red-500/10 border border-red-500/30 rounded-DEFAULT text-center">
          <p className="font-body text-body-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-space-md p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 shadow-md relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col gap-space-xs">
          <label
            htmlFor="email"
            className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant"
          >
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
          <label
            htmlFor="password"
            className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant"
          >
            Password *
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              autoComplete="current-password"
              className="w-full bg-surface-container px-space-md py-space-sm pr-12 text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-space-md bg-primary-container hover:bg-primary-container/90 disabled:bg-primary-container/50 text-on-primary font-headline text-label-md font-semibold tracking-[0.14em] uppercase rounded-DEFAULT transition-all duration-300 flex items-center justify-center gap-space-sm shadow-[0_4px_16px_rgba(217,119,54,0.3)]"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
              Memverifikasi...
            </span>
          ) : (
            <>
              <span>Masuk</span>
              <LogIn className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Register link */}
      <div className="text-center">
        <p className="font-body text-body-sm text-on-surface-variant">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl">
      <Suspense
        fallback={
          <div className="w-full max-w-md text-center text-on-surface-variant flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Memuat portal login...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
