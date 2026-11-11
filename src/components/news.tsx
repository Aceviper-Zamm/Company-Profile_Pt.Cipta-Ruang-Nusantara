"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Clock, ArrowRight } from "lucide-react";

interface DisplayArticle {
  id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt: string;
  date: string;
  readTime?: string;
  author?: {
    name: string;
    role: string;
    initials: string;
  };
  thumbnail: string;
}

export function News() {
  const [articles, setArticles] = useState<DisplayArticle[]>([]);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/news?status=published");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: DisplayArticle[] = json.data.slice(0, 3).map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            category: "Wawasan Studio",
            excerpt: item.excerpt,
            date: new Date(item.created_at || Date.now()).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            readTime: "5 MIN BACA",
            author: {
              name: "Prinsipal Studio",
              role: "Kurator Desain",
              initials: "CR",
            },
            thumbnail: item.thumbnail_path || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
          }));
          setArticles(mapped);
          return;
        }
      } catch (err) {
        console.warn("Gagal fetch berita dari database, gunakan fallback:", err);
      }

      // Fallback data default
      setArticles(siteConfig.news);
    }

    loadNews();
  }, []);

  return (
    <section id="berita" className="w-full py-space-xl bg-surface border-b border-outline-variant/15">
      <div className="w-full px-margin md:px-margin-tablet xl:px-margin-desktop flex flex-col gap-space-xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline text-label-sm text-primary tracking-[0.2em] uppercase font-semibold">
                03 // KABAR & WAWASAN
              </span>
              <div className="h-[1px] w-12 bg-outline-variant" />
            </div>
            <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold tracking-tight">
              Diskursus Desain & Berita Proyek Terkini
            </h2>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="hidden sm:inline-block px-3 py-1 bg-surface-container rounded-DEFAULT font-headline text-[11px] text-on-surface-variant uppercase tracking-wider border border-white/5">
              Volume IX — 2025
            </span>
            <a
              href="#kontak"
              className="inline-flex items-center gap-space-xs font-headline text-label-md uppercase tracking-wider text-primary hover:text-on-surface transition-colors"
            >
              <span>Arsip Publikasi Studio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Articles 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {(articles.length > 0 ? articles : siteConfig.news).map((item) => (
            <article
              key={item.id}
              className="bg-surface-container-low rounded-DEFAULT overflow-hidden flex flex-col group hover:bg-surface-container hover:-translate-y-1 transition-all duration-500 shadow-sm border border-white/5 hover:border-primary-container/30"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full h-60 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.thumbnail}')` }}
                  role="img"
                  aria-label={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />

                {/* Category Tag Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded-DEFAULT text-primary font-headline text-[10px] tracking-wider uppercase font-semibold border border-white/10">
                    {item.category || "Arsitektur"}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-space-lg flex flex-col gap-space-sm flex-1 justify-between">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between text-on-surface-variant font-headline text-label-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-outline">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readTime || "5 MIN"}
                    </span>
                  </div>

                  <h3 className="font-headline text-headline-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                {/* Author Atelier Badge & Action */}
                <div className="pt-space-md flex items-center justify-between border-t border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-surface-container-highest border border-primary/40 flex items-center justify-center text-[10px] font-mono text-primary font-bold">
                      {item.author?.initials || "CR"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium text-on-surface">
                        {item.author?.name || "Prinsipal Studio"}
                      </span>
                      <span className="text-[9px] text-on-surface-variant uppercase tracking-wider">
                        {item.author?.role || "Kurator"}
                      </span>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-primary font-headline text-label-md font-semibold tracking-wider group-hover:translate-x-1 transition-transform">
                    BACA
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Action Button */}
        <div className="w-full flex justify-center pt-space-sm">
          <a
            href="#kontak"
            className="inline-flex items-center gap-space-sm px-space-lg py-space-md bg-transparent hover:bg-surface-variant text-on-surface font-headline text-label-md uppercase tracking-[0.14em] rounded-DEFAULT transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.15)] group"
          >
            <span>Lihat Semua Berita & Wawasan Arsitektur</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
