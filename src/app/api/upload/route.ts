import { NextRequest, NextResponse } from "next/server";
import { saveFile } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File tidak ditemukan dalam form data." },
        { status: 400 }
      );
    }

    const result = await saveFile(file);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      filePath: result.filePath,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat mengunggah media." },
      { status: 500 }
    );
  }
}

