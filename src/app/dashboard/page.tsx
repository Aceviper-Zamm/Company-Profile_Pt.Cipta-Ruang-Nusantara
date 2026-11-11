import { dbSelect, isUsingLiveSheet, type UserRecord, type NewsRecord, type RoleRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import {
  Users,
  Shield,
  Newspaper,
  Database,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  HardDrive,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  const users = await dbSelect<UserRecord>("Users");
  const roles = await dbSelect<RoleRecord>("Roles");
  const news = await dbSelect<NewsRecord>("News");

  return (
    <div className="flex flex-col gap-space-lg">
      {/* Welcome Banner */}
      <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md relative overflow-hidden">
        <div className="flex flex-col gap-1">
          <span className="font-headline text-label-sm text-primary uppercase tracking-widest font-semibold">
            PANEL ADMINISTRATOR ATELIER
          </span>
          <h2 className="font-headline text-headline-md text-on-surface font-semibold">
            Selamat Datang, {session?.name || "Admin"}
          </h2>
          <p className="font-body text-body-sm text-on-surface-variant">
            Kelola pengguna, otorisasi hak akses, publikasi berita studio, dan sinkronisasi basis data.
          </p>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <div className="p-2 bg-surface-container rounded-DEFAULT flex items-center gap-2 border border-white/5">
            <span
              className={`w-2 h-2 rounded-full ${
                isUsingLiveSheet ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="text-[11px] font-mono text-on-surface">
              {isUsingLiveSheet ? "GOOGLE SPREADSHEET (LIVE)" : "LOCAL STORE ENGINE"}
            </span>
          </div>
        </div>
      </div>

      {/* Warning Default Credentials */}
      <div className="p-space-md bg-amber-500/10 border border-amber-500/30 rounded-DEFAULT flex items-start gap-space-sm text-amber-300">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="font-headline text-label-sm uppercase tracking-wider font-bold">
            Peringatan Keamanan Kredensial Awal
          </span>
          <p className="font-body text-body-sm text-amber-200/90 leading-relaxed">
            Akun admin bawaan saat ini menggunakan password publik standar (<code className="bg-amber-900/40 px-1.5 py-0.5 rounded text-xs font-mono">123456</code>). Sangat disarankan untuk mengubah password sebelum mempublikasikan website ke domain produksi.
          </p>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-headline text-label-sm text-on-surface-variant uppercase tracking-wider">
              Total Pengguna
            </span>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="font-headline text-headline-lg font-bold text-on-surface">
            {users.length}
          </span>
          <Link
            href="/dashboard/users"
            className="text-[11px] font-headline text-primary uppercase tracking-wider flex items-center gap-1 hover:underline mt-1"
          >
            Kelola Pengguna <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-headline text-label-sm text-on-surface-variant uppercase tracking-wider">
              Role & Akses
            </span>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <span className="font-headline text-headline-lg font-bold text-on-surface">
            {roles.length}
          </span>
          <Link
            href="/dashboard/roles"
            className="text-[11px] font-headline text-primary uppercase tracking-wider flex items-center gap-1 hover:underline mt-1"
          >
            Atur Izin Role <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-headline text-label-sm text-on-surface-variant uppercase tracking-wider">
              Artikel Berita
            </span>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <span className="font-headline text-headline-lg font-bold text-on-surface">
            {news.length}
          </span>
          <Link
            href="/dashboard/news"
            className="text-[11px] font-headline text-primary uppercase tracking-wider flex items-center gap-1 hover:underline mt-1"
          >
            Buka CRUD Berita <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-headline text-label-sm text-on-surface-variant uppercase tracking-wider">
              Basis Data
            </span>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-headline text-headline-md font-bold text-on-surface">
              {isUsingLiveSheet ? "Tersambung" : "Siap Terhubung"}
            </span>
          </div>
          <span className="text-[11px] text-on-surface-variant">
            Google Apps Script Web App
          </span>
        </div>
      </div>

      {/* Info Media Vercel */}
      <div className="p-space-lg bg-surface-container-low rounded-DEFAULT border border-white/5 flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-sm text-primary">
          <HardDrive className="w-5 h-5" />
          <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
            Penyimpanan Media & Thumbnail (public/uploads/)
          </h3>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
          File yang diunggah melalui formulir CRUD Berita disimpan sebagai file lokal di folder <code className="text-primary font-mono text-xs">public/uploads/</code> dan hanya path URL-nya yang tercatat ke dalam database spreadsheet.
        </p>
        <p className="font-body text-[12px] text-on-surface-variant/80 border-l-2 border-primary/40 pl-space-sm">
          *Catatan untuk Vercel: Di lingkungan lokal komputer sendiri, penyimpanan lokal berfungsi normal. Pada saat deploy ke Vercel production nanti (Step 4), sistem telah disiapkan dengan modul terisolasi (<code className="font-mono text-xs">src/lib/storage.ts</code>) sehingga dapat dialihkan ke cloud storage (seperti Vercel Blob atau Cloudinary) dengan satu langkah mudah.
        </p>
      </div>
    </div>
  );
}

