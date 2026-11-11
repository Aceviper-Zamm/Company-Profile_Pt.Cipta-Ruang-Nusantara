import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbInsert, type RoleRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const roles = await dbSelect<RoleRecord>("Roles");
    return NextResponse.json({ success: true, data: roles });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal memuat daftar role." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, permissions } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "Nama role wajib diisi." }, { status: 400 });
    }

    const cleanName = name.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
    const existing = await dbSelect<RoleRecord>("Roles", { name: cleanName });
    if (existing.length > 0) {
      return NextResponse.json({ success: false, error: "Nama role sudah ada." }, { status: 409 });
    }

    const newRole = await dbInsert<RoleRecord>("Roles", {
      name: cleanName,
      description: description || "Custom role",
      permissions: permissions || "read",
      is_system: "false",
    });

    return NextResponse.json({ success: true, data: newRole });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal membuat role." }, { status: 500 });
  }
}

