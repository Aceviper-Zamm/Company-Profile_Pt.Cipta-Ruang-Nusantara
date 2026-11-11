import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbUpdate, type OrderRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const orders = await dbSelect<OrderRecord>("Orders", { id: params.id });
    const order = orders[0];

    if (!order) {
      return NextResponse.json({ success: false, error: "Pesanan tidak ditemukan." }, { status: 404 });
    }

    // Hanya pemilik pesanan atau admin yang dapat melihat
    if (session.role !== "admin" && order.user_id !== session.id) {
      return NextResponse.json({ success: false, error: "Akses ditolak." }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal memuat detail pesanan." }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    // Hanya admin yang boleh mengubah status pesanan
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Hanya admin yang dapat mengubah status pesanan." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { status, admin_notes } = body;

    if (!["menunggu_konfirmasi", "dikonfirmasi", "dibatalkan"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Status pesanan tidak valid." },
        { status: 400 }
      );
    }

    const updated = await dbUpdate("Orders", params.id, {
      status,
      admin_notes: admin_notes || "",
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Pesanan tidak ditemukan atau gagal diperbarui." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status pesanan berhasil diubah menjadi ${status}.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal memperbarui pesanan." }, { status: 500 });
  }
}

