import { NextRequest, NextResponse } from "next/server";
import { dbSelect, type UserRecord, type RoleRecord } from "@/lib/db";
import { verifyPassword, createSessionToken, setSessionCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const users = await dbSelect<UserRecord>("Users", { email: email.toLowerCase().trim() });
    const user = users[0];

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Email tidak terdaftar. Silakan register terlebih dahulu." },
        { status: 401 }
      );
    }

    // Cek status akun
    if (user.status !== "active") {
      return NextResponse.json(
        { success: false, error: "Akun Anda sedang dinonaktifkan. Hubungi admin." },
        { status: 403 }
      );
    }

    // Verifikasi password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Password salah. Silakan coba lagi." },
        { status: 401 }
      );
    }

    // Dapatkan nama role
    const roles = await dbSelect<RoleRecord>("Roles", { id: user.role_id });
    const roleName = roles[0]?.name || "user";

    // Buat session token JWT
    const token = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: roleName,
    });

    // Set cookie httpOnly
    const cookieStore = cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleName,
      },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

