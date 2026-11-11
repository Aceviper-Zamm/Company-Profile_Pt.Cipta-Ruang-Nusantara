import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbInsert, type NewsRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const query: Record<string, string> = {};
    if (status) {
      query.status = status;
    }

    const news = await dbSelect<NewsRecord>("News", query);
    return NextResponse.json({ success: true, data: news });
  } catch (err: any) {
    console.error("GET news error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data berita." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, excerpt, content, thumbnail_path, status } = body;

    if (!title || !excerpt) {
      return NextResponse.json(
        { success: false, error: "Judul dan ringkasan wajib diisi." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newArticle = await dbInsert<NewsRecord>("News", {
      title,
      slug,
      excerpt,
      content: content || excerpt,
      thumbnail_path: thumbnail_path || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      status: status || "published",
      author_id: session.id,
    });

    return NextResponse.json({ success: true, data: newArticle });
  } catch (err: any) {
    console.error("POST news error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal menambahkan berita baru." },
      { status: 500 }
    );
  }
}

