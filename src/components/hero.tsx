import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="beranda" className="relative w-full overflow-hidden bg-surface-container-lowest pt-20">
      {/* Visual Backdrop */}
      <div className="relative w-full min-h-[640px] md:h-[880px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85')`,
          }}
          role="img"
          aria-label="Monolithic luxury tropical villa architecture at deep twilight"
        />

        {/* Subtle layered gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-surface/40" />

        {/* Hero Content Framing */}
        <div className="relative z-10 w-full px-margin md:px-margin-tablet xl:px-margin-desktop pb-space-xl flex flex-col justify-end">
          <div className="max-w-4xl flex flex-col gap-space-md">
            {/* Monographic Overline */}
            <div className="inline-flex items-center gap-space-sm">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="font-headline text-label-md uppercase tracking-[0.22em] text-primary font-semibold">
                Atelier Rancang & Konstruksi Presisi
              </span>
            </div>

            {/* Master Headline */}
            <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg lg:text-display text-on-surface font-semibold tracking-tight leading-[1.12]">
              {siteConfig.tagline}
            </h1>

            {/* Architectural Narrative Subhead */}
            <p className="font-body text-body-md md:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Dual CTA Action Pair */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                href="#kontak"
                className="inline-flex items-center gap-space-sm px-space-lg py-space-md bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md font-semibold tracking-[0.12em] uppercase rounded-DEFAULT transition-all shadow-[0_4px_20px_rgba(217,119,54,0.3)] hover:shadow-[0_6px_28px_rgba(217,119,54,0.45)]"
              >
                <span>Konsultasi Proyek</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#layanan"
                className="inline-flex items-center gap-space-sm px-space-lg py-space-md bg-transparent hover:bg-surface-variant text-on-surface font-headline text-label-md uppercase tracking-[0.12em] rounded-DEFAULT transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.18)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.35)]"
              >
                <span>Lihat Layanan & Portofolio</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Credential Ticker Bar */}
      <div className="w-full bg-surface-container-low border-y border-outline-variant/20">
        <div className="px-margin md:px-margin-tablet xl:px-margin-desktop py-space-lg grid grid-cols-1 sm:grid-cols-3 gap-space-lg">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-space-md">
              <span className="font-headline text-headline-md font-semibold text-primary">
                {stat.value}
              </span>
              <div className="flex flex-col">
                <span className="font-headline text-label-md uppercase tracking-wider text-on-surface">
                  {stat.label}
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  {stat.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

