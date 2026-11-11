import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbUpdate, dbDelete, type RoleRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const roles = await dbSelect<RoleRecord>("Roles", { id: params.id });
    const targetRole = roles[0];
    if (!targetRole) {
      return NextResponse.json({ success: false, error: "Role tidak ditemukan." }, { status: 404 });
    }

    const body = await request.json();
    const { description, permissions } = body;

    // Larang mengubah nama role sistem
    const isSys = String(targetRole.is_system) === "true";
    const updateData: Record<string, any> = {
      description: description !== undefined ? description : targetRole.description,
      permissions: permissions !== undefined ? permissions : targetRole.permissions,
    };

    if (!isSys && body.name) {
      updateData.name = body.name.toLowerCase().trim();
    }

    const updated = await dbUpdate("Roles", params.id, updateData);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Gagal memperbarui role." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Role berhasil diperbarui." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal memperbarui role." }, { status: 500 });
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

    const roles = await dbSelect<RoleRecord>("Roles", { id: params.id });
    const targetRole = roles[0];
    if (!targetRole) {
      return NextResponse.json({ success: false, error: "Role tidak ditemukan." }, { status: 404 });
    }

    if (String(targetRole.is_system) === "true") {
      return NextResponse.json(
        { success: false, error: "Role sistem bawaan tidak dapat dihapus." },
        { status: 400 }
      );
    }

    const deleted = await dbDelete("Roles", params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Gagal menghapus role." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Role berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal menghapus role." }, { status: 500 });
  }
}

