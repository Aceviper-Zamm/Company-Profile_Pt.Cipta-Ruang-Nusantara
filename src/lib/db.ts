/**
 * DATABASE CONNECTOR - GOOGLE SPREADSHEET VIA APPS SCRIPT
 * 
 * Arsitektur:
 * Browser -> Next.js Server (API / Server Action) -> Apps Script Web App -> Google Spreadsheet
 * 
 * Rahasia (URL dan Secret) disimpan di environment variable di server,
 * sehingga tidak pernah terekspos ke sisi klien/browser.
 */

import { siteConfig } from "@/config/site";

export interface RoleRecord {
  id: string;
  name: string;
  description: string;
  permissions: string;
  is_system: string | boolean;
  created_at: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role_id: string;
  status: string; // "active" | "inactive"
  created_at: string;
  updated_at: string;
}

export interface NewsRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  status: string; // "published" | "draft"
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface OrderRecord {
  id: string;
  user_id: string;
  service_id: string;
  service_name: string;
  customer_name: string;
  customer_phone: string;
  consultation_date: string;
  notes: string;
  amount: number | string;
  status: "menunggu_konfirmasi" | "dikonfirmasi" | "dibatalkan";
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

// In-Memory store untuk fallback lokal ketika APPS_SCRIPT_URL belum diatur
const localStore: {
  Roles: RoleRecord[];
  Users: UserRecord[];
  News: NewsRecord[];
  Orders: OrderRecord[];
} = {
  Roles: [
    {
      id: "role-admin",
      name: "admin",
      description: "Akses penuh manajemen sistem dan konten",
      permissions: "*",
      is_system: "true",
      created_at: new Date().toISOString(),
    },
    {
      id: "role-user",
      name: "user",
      description: "Akses pengguna umum dan pelacakan pesanan",
      permissions: "read",
      is_system: "true",
      created_at: new Date().toISOString(),
    },
  ],
  Users: [
    {
      id: "user-admin-01",
      name: "Prinsipal Studio Admin",
      email: "admin@gmail.com",
      // Bcrypt hash for 123456
      password_hash: "$2a$10$oh9YPGcGUGLp5EpwXTZiheeuAguWs2SWVsL6MFa3tx6IVVs4shl6y",
      role_id: "role-admin",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  News: siteConfig.news.map((item) => ({
    id: `news-${item.id}`,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: `${item.excerpt} Artikel ini mendiskusikan implementasi teknis dan kurasi arsitektural di ranah tropis nusantara secara mendalam.`,
    thumbnail_path: item.thumbnail,
    status: "published",
    author_id: "user-admin-01",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })),
  Orders: [
    {
      id: "TKT-CR-2025-01",
      user_id: "user-admin-01",
      service_id: "pkg-studi-kelayakan-bim",
      service_name: "Studi Kelayakan Tapak & Analisis BIM",
      customer_name: "Bpk. Rahmat Suryanegara",
      customer_phone: "+6281298765432",
      consultation_date: "2025-03-20 10:00 WIB",
      notes: "Proyek villa di bukit Uluwatu, membutuhkan kajian kontur dan orientasi angin laut.",
      amount: 3500000,
      status: "dikonfirmasi",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const APPS_SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET || "ciptaruang_secret_token_2026_xyz";

export const isUsingLiveSheet = Boolean(
  APPS_SCRIPT_URL &&
    !APPS_SCRIPT_URL.includes("your-deployment-id") &&
    !APPS_SCRIPT_URL.includes("script.googleusercontent.com")
);

export async function dbSelect<T = any>(
  table: "Roles" | "Users" | "News" | "Orders",
  query?: Record<string, any>
): Promise<T[]> {
  if (isUsingLiveSheet) {
    try {
      const res = await fetch(APPS_SCRIPT_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "select",
          secret: APPS_SCRIPT_SECRET,
          table,
          query: query || {},
        }),
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
      console.warn("Apps Script query error, fallback to local:", data.error);
    } catch (err) {
      console.warn("Gagal terhubung ke Apps Script, menggunakan fallback lokal:", err);
    }
  }

  // Fallback lokal
  const records = (localStore[table as keyof typeof localStore] || []) as any[];
  if (!query || Object.keys(query).length === 0) {
    return [...records] as T[];
  }
  return records.filter((r) => {
    for (const k in query) {
      if (String(r[k]) !== String(query[k])) return false;
    }
    return true;
  }) as T[];
}

export async function dbInsert<T = any>(
  table: "Roles" | "Users" | "News" | "Orders",
  data: Partial<T>
): Promise<T> {
  const newId =
    (data as any).id ||
    `${table.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();
  const record = {
    ...data,
    id: newId,
    created_at: (data as any).created_at || now,
    updated_at: now,
  } as any;

  if (isUsingLiveSheet) {
    try {
      const res = await fetch(APPS_SCRIPT_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "insert",
          secret: APPS_SCRIPT_SECRET,
          table,
          data: record,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        return resJson.data || record;
      }
      console.warn("Apps Script insert error, fallback to local:", resJson.error);
    } catch (err) {
      console.warn("Gagal insert ke Apps Script, simpan lokal:", err);
    }
  }

  // Simpan ke local store
  if (localStore[table as keyof typeof localStore]) {
    localStore[table as keyof typeof localStore].push(record);
  }
  return record as T;
}

export async function dbUpdate(
  table: "Roles" | "Users" | "News" | "Orders",
  id: string,
  data: Record<string, any>
): Promise<boolean> {
  if (isUsingLiveSheet) {
    try {
      const res = await fetch(APPS_SCRIPT_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          secret: APPS_SCRIPT_SECRET,
          table,
          id,
          data,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) return true;
      console.warn("Apps Script update error, fallback to local:", resJson.error);
    } catch (err) {
      console.warn("Gagal update ke Apps Script, update lokal:", err);
    }
  }

  // Update di local store
  const records = localStore[table as keyof typeof localStore] as any[];
  if (records) {
    const idx = records.findIndex((r) => String(r.id) === String(id));
    if (idx !== -1) {
      records[idx] = { ...records[idx], ...data, updated_at: new Date().toISOString() };
      return true;
    }
  }
  return false;
}

export async function dbDelete(
  table: "Roles" | "Users" | "News" | "Orders",
  id: string
): Promise<boolean> {
  if (isUsingLiveSheet) {
    try {
      const res = await fetch(APPS_SCRIPT_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          secret: APPS_SCRIPT_SECRET,
          table,
          id,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) return true;
      console.warn("Apps Script delete error, fallback to local:", resJson.error);
    } catch (err) {
      console.warn("Gagal delete ke Apps Script, delete lokal:", err);
    }
  }

  // Delete di local store
  const records = localStore[table as keyof typeof localStore] as any[];
  if (records) {
    const idx = records.findIndex((r) => String(r.id) === String(id));
    if (idx !== -1) {
      records.splice(idx, 1);
      return true;
    }
  }
  return false;
}
