import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant pt-space-xl pb-space-xl border-t border-outline-variant/20">
      <div className="w-full px-margin md:px-margin-tablet xl:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-desktop pb-space-xl">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-space-sm">
            <div className="flex flex-col">
              <span className="font-headline text-headline-sm font-medium tracking-widest text-on-surface uppercase">
                {siteConfig.atelierName}
              </span>
              <span className="font-headline text-label-sm tracking-[0.2em] text-on-surface-variant uppercase">
                {siteConfig.subTitle}
              </span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant max-w-sm mt-space-xs leading-relaxed">
              Atelier arsitektur dan konstruksi presisi tinggi. Mengartikulasikan materialitas, bentang struktural, dan ketenangan spasial dalam lanskap kepulauan Nusantara.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-space-xs">
              {siteConfig.certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-DEFAULT border border-white/5 ${
                    index === 0 ? "bg-surface-container text-primary" : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Studios Column */}
          <div className="lg:col-span-4 flex flex-col gap-space-sm">
            <span className="font-headline text-label-sm tracking-[0.16em] uppercase text-on-surface font-semibold">
              Kantor & Studio Atelier
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mt-space-xs">
              {siteConfig.studios.map((studio) => (
                <div
                  key={studio.city}
                  className="flex flex-col p-space-xs bg-surface-container-low rounded-DEFAULT border border-white/5"
                >
                  <span className="font-headline text-label-md text-on-surface uppercase">
                    {studio.city}
                  </span>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    {studio.district}
                  </span>
                  <span className="text-[10px] text-primary mt-1 font-mono">
                    {studio.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explorations Nav */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <span className="font-headline text-label-sm tracking-[0.16em] uppercase text-on-surface font-semibold">
              Eksplorasi
            </span>
            <nav className="flex flex-col gap-space-xs" aria-label="Navigasi Footer">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/login"
                className="font-body text-body-sm text-primary hover:text-on-surface transition-colors pt-1"
              >
                Portal Klien & Admin →
              </Link>
            </nav>
          </div>

          {/* Social Network */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <span className="font-headline text-label-sm tracking-[0.16em] uppercase text-on-surface font-semibold">
              Jaringan
            </span>
            <nav className="flex flex-col gap-space-xs" aria-label="Jaringan Sosial">
              {[
                { name: "Instagram Atelier", href: "https://instagram.com" },
                { name: "LinkedIn Corp", href: "https://linkedin.com" },
                { name: "ArchDaily Archive", href: "https://archdaily.com" },
                { name: "Dokumentasi PDF", href: "#kontak" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-body-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-outline-variant/15">
          <span className="font-headline text-label-sm text-on-surface-variant">
            © {new Date().getFullYear()} {siteConfig.name}. Hak cipta dilindungi undang-undang.
          </span>
          <span className="font-mono text-label-sm text-on-surface-variant tracking-wider uppercase text-[11px]">
            Presisi • Materialitas • Integritas
          </span>
        </div>
      </div>
    </footer>
  );
}

