import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbUpdate, dbDelete, type UserRecord } from "@/lib/db";
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

    const body = await request.json();
    const { role_id, status } = body;

    // Larang menonaktifkan diri sendiri
    if (params.id === session.id && status === "inactive") {
      return NextResponse.json(
        { success: false, error: "Anda tidak dapat menonaktifkan akun Anda sendiri." },
        { status: 400 }
      );
    }

    // Cek jika mencoba mengubah admin terakhir menjadi role non-admin
    if (params.id === session.id && role_id && role_id !== "role-admin") {
      return NextResponse.json(
        { success: false, error: "Anda tidak dapat mengubah role akun admin Anda sendiri." },
        { status: 400 }
      );
    }

    const updated = await dbUpdate("Users", params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "User tidak ditemukan atau gagal diubah." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User berhasil diperbarui." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal memperbarui user." }, { status: 500 });
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

    // Larang menghapus diri sendiri
    if (params.id === session.id) {
      return NextResponse.json(
        { success: false, error: "Anda tidak dapat menghapus akun Anda sendiri." },
        { status: 400 }
      );
    }

    // Cek apakah target adalah admin terakhir
    const allUsers = await dbSelect<UserRecord>("Users");
    const targetUser = allUsers.find((u) => u.id === params.id);
    if (targetUser?.role_id === "role-admin") {
      const adminCount = allUsers.filter((u) => u.role_id === "role-admin" && u.status === "active").length;
      if (adminCount <= 1) {
        return NextResponse.json(
          { success: false, error: "Tidak dapat menghapus satu-satunya admin aktif dalam sistem." },
          { status: 400 }
        );
      }
    }

    const deleted = await dbDelete("Users", params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "User tidak ditemukan atau gagal dihapus." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal menghapus user." }, { status: 500 });
  }
}

