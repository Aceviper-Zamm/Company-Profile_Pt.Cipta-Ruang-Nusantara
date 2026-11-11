import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbInsert, type OrderRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { siteConfig } from "@/config/site";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    let orders: OrderRecord[];

    // Admin dapat melihat seluruh pesanan, user hanya dapat melihat miliknya
    if (session.role === "admin") {
      orders = await dbSelect<OrderRecord>("Orders");
    } else {
      orders = await dbSelect<OrderRecord>("Orders", { user_id: session.id });
    }

    // Urutkan dari yang terbaru
    orders.sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );

    return NextResponse.json({ success: true, data: orders });
  } catch (err: any) {
    console.error("GET orders error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data pesanan." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Silakan masuk (login) terlebih dahulu untuk memesan sesi konsultasi." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      service_id,
      customer_name,
      customer_phone,
      consultation_date,
      notes,
    } = body;

    // Validasi input di server
    if (!service_id || !customer_name || !customer_phone) {
      return NextResponse.json(
        { success: false, error: "Layanan, nama lengkap, dan nomor WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    // Validasi paket
    const pkg = siteConfig.bookingPackages.find((p) => p.id === service_id);
    if (!pkg) {
      return NextResponse.json(
        { success: false, error: "Paket layanan yang dipilih tidak valid." },
        { status: 400 }
      );
    }

    // Generate kode tiket unik
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const datePrefix = new Date().toISOString().slice(2, 7).replace("-", "");
    const ticketId = `TKT-${datePrefix}-${randomSuffix}`;

    const newOrder = await dbInsert<OrderRecord>("Orders", {
      id: ticketId,
      user_id: session.id,
      service_id: pkg.id,
      service_name: pkg.name,
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim(),
      consultation_date: consultation_date || "Fleksibel / Sesuai Perjanjian",
      notes: notes || "-",
      amount: pkg.price,
      status: "menunggu_konfirmasi",
    });

    return NextResponse.json({ success: true, data: newOrder });
  } catch (err: any) {
    console.error("POST orders error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal membuat pesanan." },
      { status: 500 }
    );
  }
}

