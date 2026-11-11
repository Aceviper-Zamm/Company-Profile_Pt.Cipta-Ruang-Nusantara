import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function Services() {
  return (
    <section id="layanan" className="w-full py-space-xl bg-surface-container-lowest border-b border-outline-variant/15">
      <div className="w-full px-margin md:px-margin-tablet xl:px-margin-desktop flex flex-col gap-space-xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline text-label-sm text-primary tracking-[0.2em] uppercase font-semibold">
                02 // LAYANAN UTAMA
              </span>
              <div className="h-[1px] w-12 bg-outline-variant" />
            </div>
            <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold tracking-tight">
              Solusi Rancang Bangun Terpadu untuk Segala Skala Kebutuhan
            </h2>
          </div>
          <p className="font-body text-body-sm text-on-surface-variant max-w-sm">
            Dari hunian privat eksklusif hingga lanskap komersial berskala makro dengan sertifikasi keahlian legal penuh.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {siteConfig.services.map((service) => (
            <div
              key={service.id}
              className="bg-surface-container-low rounded-DEFAULT overflow-hidden flex flex-col group hover:bg-surface-container hover:-translate-y-1 transition-all duration-500 shadow-md border border-white/5 hover:border-primary-container/40 hover:shadow-[0_12px_32px_rgba(217,119,54,0.12)]"
            >
              {/* Image Container with Badges */}
              <div className="relative w-full h-56 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${service.image}')` }}
                  role="img"
                  aria-label={service.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded-DEFAULT border border-white/10 text-primary font-headline text-[10px] tracking-wider uppercase font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                    {service.badge}
                  </span>
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-DEFAULT text-on-surface-variant font-mono text-[9px] tracking-widest border border-white/5 uppercase">
                    {service.code}
                  </span>
                </div>
              </div>

              {/* Architectural Material Pills */}
              <div className="px-space-lg pt-space-md flex flex-wrap gap-1.5">
                {service.materials.map((mat, i) => (
                  <span
                    key={mat}
                    className={`px-2 py-0.5 text-[10px] font-headline uppercase tracking-wider rounded-DEFAULT ${
                      i === service.materials.length - 1
                        ? "bg-primary-container/15 text-primary border border-primary/20"
                        : "bg-surface-container text-on-surface-variant border border-white/5"
                    }`}
                  >
                    {mat}
                  </span>
                ))}
              </div>

              {/* Content Body */}
              <div className="p-space-lg pt-space-sm flex flex-col gap-space-sm flex-1 justify-between">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-headline text-label-sm uppercase tracking-wider text-primary">
                      {service.category}
                    </span>
                    <span className="text-[11px] font-mono text-outline">{service.stats}</span>
                  </div>
                  <h3 className="font-headline text-headline-sm font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-space-sm flex items-center justify-between border-t border-outline-variant/30">
                  <a
                    href="#kontak"
                    className="font-headline text-label-sm text-on-surface-variant group-hover:text-primary transition-colors"
                  >
                    Pelajari Detail & Diskusi
                  </a>
                  <ArrowUpRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

