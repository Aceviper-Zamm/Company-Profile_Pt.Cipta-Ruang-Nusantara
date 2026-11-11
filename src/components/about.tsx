import { siteConfig } from "@/config/site";
import { Leaf, Compass, HardHat } from "lucide-react";

export function About() {
  const pillarIcons = {
    eco: Leaf,
    architecture: Compass,
    engineering: HardHat,
  };

  return (
    <section id="tentang-kami" className="w-full py-space-xl bg-surface border-b border-outline-variant/15">
      <div className="w-full px-margin md:px-margin-tablet xl:px-margin-desktop flex flex-col gap-space-xl">
        {/* Section Tag & Editorial Title */}
        <div className="flex flex-col gap-space-xs max-w-3xl">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline text-label-sm text-primary tracking-[0.2em] uppercase font-semibold">
              01 // TENTANG CIPTA RUANG
            </span>
            <div className="h-[1px] w-12 bg-outline-variant" />
          </div>
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold tracking-tight">
            Rancangan Kontekstual, Presisi Struktur, & Sensibilitas Alam
          </h2>
        </div>

        {/* Narrative & Atelier Photo Mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          {/* Story Text */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
              {siteConfig.about.history}
            </p>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              {siteConfig.about.philosophy}
            </p>

            {/* Quality Standards & Certifications */}
            <div className="pt-space-sm flex flex-col gap-space-sm">
              {siteConfig.about.metrics.map((item) => (
                <div
                  key={item.label}
                  className="p-space-md bg-surface-container-low rounded-DEFAULT flex items-center justify-between border border-white/5"
                >
                  <span className="font-headline text-label-md text-on-surface tracking-wider uppercase">
                    {item.label}
                  </span>
                  <span className="font-headline text-label-md text-primary uppercase font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Atelier Craft Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-space-md">
              <div
                className="w-full h-64 bg-cover bg-center rounded-DEFAULT shadow-md border border-white/5"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80')`,
                }}
                role="img"
                aria-label="Studio rancang arsitek Cipta Ruang Jakarta"
              />
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-xs border border-white/5">
                <span className="font-headline text-label-sm text-primary uppercase tracking-widest font-semibold">
                  Studio Jakarta Atelier
                </span>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Laboratorium materialitas dan studio perancangan masterplan terpadu.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-space-md sm:pt-space-lg">
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-xs border border-white/5">
                <span className="font-headline text-label-sm text-primary uppercase tracking-widest font-semibold">
                  Pengawasan Lapangan
                </span>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Forensik teknis dan inspeksi struktur berkala setiap tahap konstruksi.
                </p>
              </div>
              <div
                className="w-full h-64 bg-cover bg-center rounded-DEFAULT shadow-md border border-white/5"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=800&q=80')`,
                }}
                role="img"
                aria-label="Detail konstruksi beton ekspos presisi tinggi"
              />
            </div>
          </div>
        </div>

        {/* 3 Key Architectural Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter pt-space-md">
          {siteConfig.about.pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons] || Leaf;
            return (
              <div
                key={pillar.title}
                className="p-space-lg bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-md hover:bg-surface-container transition-all duration-300 shadow-sm border border-white/5 hover:border-primary/30"
              >
                <div className="w-12 h-12 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary border border-white/5">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <span className="font-headline text-label-sm uppercase tracking-widest text-primary font-semibold">
                    {pillar.badge}
                  </span>
                  <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

