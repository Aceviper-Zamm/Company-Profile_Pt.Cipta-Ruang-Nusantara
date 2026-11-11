import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-margin text-on-surface">
      <div className="max-w-md w-full p-space-xl bg-surface-container-low border border-white/5 rounded-DEFAULT text-center flex flex-col items-center gap-space-md shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-primary-container/20 text-primary flex items-center justify-center border border-primary/30">
          <Compass className="w-7 h-7" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            ERROR 404 // RUANG TIDAK DITEMUKAN
          </span>
          <h1 className="font-headline text-headline-md font-semibold text-on-surface">
            Halaman Di Luar Denah
          </h1>
          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mt-1">
            Halaman atau dokumen arsitektur yang Anda tuju tidak berada dalam struktur blueprint situs ini.
          </p>
        </div>

        <Link
          href="/"
          className="mt-space-sm inline-flex items-center gap-2 px-space-lg py-space-sm bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md uppercase tracking-wider rounded-DEFAULT transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}

