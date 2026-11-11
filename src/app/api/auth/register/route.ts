import { NextRequest, NextResponse } from "next/server";
import { dbSelect, dbInsert, type UserRecord } from "@/lib/db";
import { hashPassword, createSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password minimal 6 karakter." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existing = await dbSelect<UserRecord>("Users", { email: email.toLowerCase().trim() });
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Email sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Buat user baru (selalu role user)
    const newUser = await dbInsert<UserRecord>("Users", {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password_hash: passwordHash,
      role_id: "role-user",
      status: "active",
    });

    // Buat session token
    const token = await createSessionToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: "user",
    });

    // Set cookie
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
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: "user",
      },
    });
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

