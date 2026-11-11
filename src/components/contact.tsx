"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  Zap,
  ShieldCheck,
  Lock,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Navigation,
  Car,
  CheckCircle2,
} from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    wa: "",
    kategori: "",
    luas: "",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontak" className="w-full py-space-xl bg-surface-container-lowest border-b border-outline-variant/15">
      <div className="w-full px-margin md:px-margin-tablet xl:px-margin-desktop flex flex-col gap-space-xl">
        {/* Section Tag & Title */}
        <div className="flex flex-col gap-space-xs max-w-3xl">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline text-label-sm text-primary tracking-[0.2em] uppercase font-semibold">
              04 // HUBUNGI KAMI
            </span>
            <div className="h-[1px] w-12 bg-outline-variant" />
          </div>
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold tracking-tight">
            Konsultasikan Mahakarya Arsitektur Bersama Tim Kami
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Diskusikan visi spasial, kelayakan tapak, dan perencanaan biaya dengan para prinsipal arsitek kami secara terarah dan terjamin kerahasiaannya.
          </p>
        </div>

        {/* Studio Assurance Micro-Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md p-space-md bg-surface-container-low rounded-DEFAULT border border-white/5">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary border border-white/5">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-label-md text-on-surface font-semibold">
                Respon &lt; 2 Jam
              </span>
              <span className="font-body text-[11px] text-on-surface-variant">
                Layanan prinsipal siaga via WhatsApp
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary border border-white/5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-label-md text-on-surface font-semibold">
                Konsultasi Awal Bebas Biaya
              </span>
              <span className="font-body text-[11px] text-on-surface-variant">
                Analisis tapak & perkiraan volume awal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary border border-white/5">
              <Lock className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-label-md text-on-surface font-semibold">
                Perjanjian NDA Siap Pakai
              </span>
              <span className="font-body text-[11px] text-on-surface-variant">
                Privasi hunian & data komersial terlindungi
              </span>
            </div>
          </div>
        </div>

        {/* Dual Column Layout: Form & Map Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
          {/* Left Column: Form & Direct Contacts */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Contact Detail Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="p-space-md bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-xs hover:bg-surface-container border border-white/5 hover:border-primary-container/30 transition-all duration-300">
                <div className="flex items-center gap-space-xs text-primary">
                  <MapPin className="w-4 h-4" />
                  <span className="font-headline text-label-sm uppercase tracking-wider font-semibold">
                    Kantor Studio
                  </span>
                </div>
                <p className="font-body text-body-sm text-on-surface">
                  {siteConfig.contact.address}
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-xs hover:bg-surface-container border border-white/5 hover:border-primary-container/30 transition-all duration-300">
                <div className="flex items-center gap-space-xs text-primary">
                  <Phone className="w-4 h-4" />
                  <span className="font-headline text-label-sm uppercase tracking-wider font-semibold">
                    Komunikasi Langsung
                  </span>
                </div>
                <p className="font-body text-body-sm text-on-surface">
                  WA: {siteConfig.contact.whatsapp}
                  <br />
                  Telp: {siteConfig.contact.phone}
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-xs hover:bg-surface-container border border-white/5 hover:border-primary-container/30 transition-all duration-300">
                <div className="flex items-center gap-space-xs text-primary">
                  <Mail className="w-4 h-4" />
                  <span className="font-headline text-label-sm uppercase tracking-wider font-semibold">
                    Surel Resmi
                  </span>
                </div>
                <p className="font-body text-body-sm text-on-surface">
                  {siteConfig.contact.emailProject}
                  <br />
                  {siteConfig.contact.emailGeneral}
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-xs hover:bg-surface-container border border-white/5 hover:border-primary-container/30 transition-all duration-300">
                <div className="flex items-center gap-space-xs text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="font-headline text-label-sm uppercase tracking-wider font-semibold">
                    Jam Operasional
                  </span>
                </div>
                <p className="font-body text-body-sm text-on-surface">
                  {siteConfig.contact.hours}
                  <br />
                  {siteConfig.contact.hoursNote}
                </p>
              </div>
            </div>

            {/* Consultation Inquiry Form */}
            <div className="p-space-lg bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-md shadow-md border border-white/5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
                <span className="font-headline text-label-md uppercase tracking-wider text-on-surface font-semibold">
                  Formulir Pengajuan Jadwal Diskusi
                </span>
                <span className="text-[10px] font-mono text-primary flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SECURE TRANSMISSION
                </span>
              </div>

              {submitted ? (
                <div className="py-space-xl flex flex-col items-center justify-center text-center gap-space-sm animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                    Permohonan Konsultasi Diterima
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant max-w-md">
                    Terima kasih, Bapak/Ibu {formData.nama || "Klien"}. Tim prinsipal arsitek kami akan segera menghubungi Anda via WhatsApp dalam waktu maksimal 1x24 jam kerja.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ nama: "", wa: "", kategori: "", luas: "", pesan: "" });
                    }}
                    className="mt-space-sm px-space-md py-space-xs text-xs font-headline uppercase tracking-wider text-primary hover:underline"
                  >
                    Kirim Formulir Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="nama"
                        className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant"
                      >
                        Nama Lengkap *
                      </label>
                      <input
                        id="nama"
                        type="text"
                        required
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        placeholder="Contoh: Raden Wirasasmita"
                        className="w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="wa"
                        className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant"
                      >
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        id="wa"
                        type="tel"
                        required
                        value={formData.wa}
                        onChange={(e) => setFormData({ ...formData, wa: e.target.value })}
                        placeholder="+62 812-xxxx-xxxx"
                        className="w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="kategori"
                        className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant"
                      >
                        Kategori Proyek *
                      </label>
                      <select
                        id="kategori"
                        required
                        value={formData.kategori}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                        className="w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="residential">Hunian Privat & Villa Mewah</option>
                        <option value="commercial">Komersial, Kafe, & Perkantoran</option>
                        <option value="interior">Interior Bespoke & Fit-Out</option>
                        <option value="masterplan">Masterplan Kawasan & Lanskap</option>
                        <option value="build">Konstruksi Fisik (Design & Build)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="luas"
                        className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant"
                      >
                        Lokasi & Estimasi Luas (m²)
                      </label>
                      <input
                        id="luas"
                        type="text"
                        value={formData.luas}
                        onChange={(e) => setFormData({ ...formData, luas: e.target.value })}
                        placeholder="Contoh: Bali, Luas Lahan 600m²"
                        className="w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    <label
                      htmlFor="pesan"
                      className="font-headline text-label-sm uppercase tracking-wider text-on-surface-variant"
                    >
                      Catatan Kebutuhan & Preferensi Desain
                    </label>
                    <textarea
                      id="pesan"
                      rows={4}
                      value={formData.pesan}
                      onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                      placeholder="Ceritakan konsep ruang yang Anda impikan, preferensi material, estimasi timeline, atau tautan referensi..."
                      className="w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface rounded-DEFAULT border border-white/5 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-space-md bg-primary-container hover:bg-primary-container/90 text-on-primary font-headline text-label-md font-semibold tracking-[0.14em] uppercase rounded-DEFAULT transition-all duration-300 flex items-center justify-center gap-space-sm shadow-[0_4px_16px_rgba(217,119,54,0.3)] hover:shadow-[0_6px_24px_rgba(217,119,54,0.45)] group"
                  >
                    <span>Kirim Pengajuan Konsultasi</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps Location Card */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="p-space-lg bg-surface-container-low rounded-DEFAULT flex flex-col gap-space-md shadow-md h-full border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-headline text-label-sm uppercase tracking-wider text-primary font-semibold">
                    Koordinat GPS Studio
                  </span>
                  <span className="font-mono text-body-sm text-on-surface">
                    {siteConfig.contact.coordinates.display}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-surface-container text-[10px] font-mono text-outline rounded-DEFAULT">
                    JAKARTA ATELIER
                  </span>
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Map Canvas with Embed Iframe */}
              <div className="w-full flex-1 min-h-[360px] rounded-DEFAULT relative overflow-hidden border border-white/10 bg-surface-container">
                <iframe
                  title="Peta Lokasi Kantor Studio PT Cipta Ruang Nusantara"
                  src={siteConfig.contact.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[360px] border-0 filter grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Open in Google Maps button */}
              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-space-sm px-space-md bg-surface-container hover:bg-surface-variant text-on-surface font-headline text-label-md uppercase tracking-wider rounded-DEFAULT transition-all flex items-center justify-center gap-space-xs shadow-sm group border border-white/5"
              >
                <Navigation className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>Buka di Google Maps Navigasi</span>
              </a>

              {/* Quick Arrival Note */}
              <div className="pt-space-xs flex items-center justify-center gap-2 text-on-surface-variant">
                <Car className="w-4 h-4 text-primary shrink-0" />
                <p className="font-body text-body-sm text-center">
                  Tersedia parkir valet di area pelataran studio untuk kunjungan klien terjadwal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

