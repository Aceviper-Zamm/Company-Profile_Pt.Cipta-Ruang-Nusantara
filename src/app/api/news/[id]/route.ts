import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbUpdate, dbDelete, type NewsRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = await dbSelect<NewsRecord>("News", { id: params.id });
    if (news.length === 0) {
      return NextResponse.json({ success: false, error: "Berita tidak ditemukan." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: news[0] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal memuat berita." }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updated = await dbUpdate("News", params.id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Berita tidak ditemukan atau gagal diperbarui." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Berita berhasil diperbarui." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal memperbarui berita." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await dbDelete("News", params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Berita tidak ditemukan atau gagal dihapus." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Berita berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal menghapus berita." }, { status: 500 });
  }
}

