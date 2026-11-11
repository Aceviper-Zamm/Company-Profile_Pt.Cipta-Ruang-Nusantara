import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.subTitle}`,
  description: siteConfig.description,
  keywords: [
    "Arsitektur",
    "Konstruksi",
    "Desain Interior",
    "Villa Mewah",
    "Jakarta",
    "BIM 5D",
    "Atelier",
    "Cipta Ruang Nusantara",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.subTitle}`,
    description: siteConfig.description,
    url: "https://ciptaruang.id",
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.subTitle}`,
    description: siteConfig.description,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className="bg-surface font-body text-body-md text-on-surface min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}

