"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, User, ShoppingBag, Calendar } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Cek status sesi login
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setCurrentUser(data.user);
        }
      } catch {
        // Guest
      }
    }
    checkUser();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["beranda", "tentang-kami", "layanan", "berita", "kontak"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.6)]"
          : "bg-surface/75 backdrop-blur-sm"
      }`}
    >
      <div className="h-20 w-full px-margin md:px-margin-tablet xl:px-margin-desktop flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/#beranda" className="flex flex-col group">
          <span className="font-headline text-headline-sm font-medium tracking-widest text-on-surface uppercase group-hover:text-primary transition-colors">
            {siteConfig.atelierName}
          </span>
          <span className="font-headline text-[10px] tracking-[0.22em] text-on-surface-variant uppercase">
            {siteConfig.subTitle}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-space-lg"
          aria-label="Navigasi Utama"
        >
          {siteConfig.navItems.map((item) => {
            const sectionId = item.href.replace("/#", "").replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`font-headline text-label-md uppercase tracking-[0.14em] transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}

          {/* Menu Pesanan Anda (Hanya muncul jika sudah login) */}
          {currentUser && (
            <Link
              href="/my-orders"
              className="font-headline text-label-md uppercase tracking-[0.14em] text-primary hover:text-primary-container transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pesanan Anda</span>
            </Link>
          )}
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          {/* CTA Booking Konsultasi */}
          <Link
            href="/booking"
            className="hidden md:inline-flex items-center gap-1.5 px-space-md py-space-xs font-headline text-label-md uppercase tracking-[0.12em] bg-primary-container hover:bg-primary-container/90 text-on-primary rounded-DEFAULT transition-all shadow-sm font-semibold"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reservasi</span>
          </Link>

          {currentUser ? (
            <Link
              href={currentUser.role === "admin" ? "/dashboard" : "/my-orders"}
              className="flex items-center gap-2 p-1 pl-2.5 bg-surface-container rounded-DEFAULT border border-white/5 hover:border-white/20 transition-colors"
            >
              <span className="text-xs font-headline uppercase tracking-wider text-on-surface hidden sm:inline">
                {currentUser.name?.split(" ")[0]}
              </span>
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-mono text-[11px] font-bold">
                {currentUser.name?.substring(0, 2).toUpperCase() || "CR"}
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-space-md py-space-xs font-headline text-label-md uppercase tracking-[0.12em] bg-transparent text-on-surface hover:bg-surface-variant rounded-DEFAULT transition-colors border border-white/10 hover:border-white/20"
            >
              Masuk
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-on-surface hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-DEFAULT"
            aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden w-full bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/30 px-margin py-space-lg flex flex-col gap-space-md shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-space-sm" aria-label="Navigasi Ponsel">
            {siteConfig.navItems.map((item) => {
              const sectionId = item.href.replace("/#", "").replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-3 font-headline text-body-md uppercase tracking-wider rounded-DEFAULT transition-colors ${
                    isActive
                      ? "text-primary bg-surface-container font-medium"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Mobile Pesanan Anda */}
            {currentUser && (
              <Link
                href="/my-orders"
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 font-headline text-body-md uppercase tracking-wider rounded-DEFAULT text-primary hover:bg-surface-container-low transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pesanan Anda</span>
              </Link>
            )}
          </nav>

          <div className="pt-space-sm border-t border-outline-variant/30 flex flex-col gap-space-sm">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 text-center font-headline text-label-md uppercase tracking-wider bg-primary-container text-on-primary font-semibold rounded-DEFAULT flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservasi Konsultasi Arsitektur</span>
            </Link>

            {currentUser ? (
              <Link
                href={currentUser.role === "admin" ? "/dashboard" : "/my-orders"}
                onClick={() => setIsOpen(false)}
                className="w-full py-2 text-center font-headline text-label-sm uppercase tracking-wider bg-surface-container text-on-surface rounded-DEFAULT border border-white/10"
              >
                {currentUser.role === "admin" ? "Buka Panel Dashboard Admin" : "Lihat Tiket Pesanan Saya"}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 text-center font-headline text-label-sm uppercase tracking-wider bg-surface-container text-on-surface rounded-DEFAULT border border-white/10"
              >
                Masuk ke Akun
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
