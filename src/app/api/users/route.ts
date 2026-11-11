import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbInsert, type UserRecord } from "@/lib/db";
import { getSession, hashPassword } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();

    let users = await dbSelect<UserRecord>("Users");

    if (search) {
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    }

    // Buang password_hash demi keamanan
    const safeUsers = users.map(({ password_hash, ...rest }) => rest);

    return NextResponse.json({ success: true, data: safeUsers });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal memuat pengguna." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, password, role_id } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    const existing = await dbSelect<UserRecord>("Users", { email: email.toLowerCase().trim() });
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Email sudah terdaftar." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newUser = await dbInsert<UserRecord>("Users", {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password_hash: passwordHash,
      role_id: role_id || "role-user",
      status: "active",
    });

    const { password_hash, ...safeUser } = newUser;
    return NextResponse.json({ success: true, data: safeUser });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Gagal membuat pengguna." }, { status: 500 });
  }
}

