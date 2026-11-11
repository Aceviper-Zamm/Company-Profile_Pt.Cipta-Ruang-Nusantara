"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  Shield,
  Newspaper,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pesanan & Booking", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Manajemen User", href: "/dashboard/users", icon: Users },
  { label: "Manajemen Role", href: "/dashboard/roles", icon: Shield },
  { label: "CRUD Berita", href: "/dashboard/news", icon: Newspaper },
];

export function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const currentPage = sidebarItems.find((item) => pathname === item.href);
  const pageTitle = currentPage?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant/15 z-50 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Brand */}
        <div className="h-16 px-space-lg flex items-center justify-between border-b border-outline-variant/15">
          <Link href="/dashboard" className="flex flex-col">
            <span className="font-headline text-label-md font-medium tracking-widest text-on-surface uppercase">
              CIPTA RUANG
            </span>
            <span className="font-headline text-[9px] tracking-[0.18em] text-primary uppercase">
              PANEL ADMIN
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-on-surface-variant hover:text-on-surface p-1"
            aria-label="Tutup Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-space-md px-space-sm flex flex-col gap-1" aria-label="Menu Dashboard">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-DEFAULT text-body-sm font-headline tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-primary-container/15 text-primary font-semibold border border-primary/20"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="uppercase text-label-sm tracking-wider">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-space-md border-t border-outline-variant/15 flex flex-col gap-space-sm">
          <Link
            href="/"
            className="flex items-center gap-space-sm px-space-sm py-1.5 text-on-surface-variant hover:text-on-surface transition-colors text-body-sm"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="font-headline text-label-sm uppercase tracking-wider">Lihat Website</span>
          </Link>
          <div className="flex items-center gap-space-sm px-space-sm">
            <div className="w-8 h-8 rounded-full bg-primary-container/30 text-primary flex items-center justify-center font-mono text-[11px] font-bold border border-primary/30">
              {user.name?.substring(0, 2).toUpperCase() || "AD"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-on-surface truncate">{user.name}</p>
              <p className="text-[9px] text-primary uppercase tracking-wider">{user.role}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-DEFAULT text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 transition-colors"
              aria-label="Logout"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/15 px-space-md lg:px-space-lg flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-space-md">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-DEFAULT"
              aria-label="Buka Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-headline text-headline-sm font-semibold text-on-surface">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="hidden sm:inline-block px-2.5 py-1 bg-surface-container rounded-DEFAULT text-[10px] font-mono text-primary border border-primary/20">
              {user.role.toUpperCase()}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-space-md lg:p-space-lg">
          {children}
        </main>
      </div>
    </div>
  );
}
