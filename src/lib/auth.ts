/**
 * AUTHENTICATION & SESSION MANAGEMENT
 * 
 * - Password hashing menggunakan bcryptjs (Node server-side runtime).
 * - Sesi disimpan dalam cookie httpOnly menggunakan JWT bertanda tangan.
 */

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  createSessionToken,
  verifySessionToken,
  type SessionUser,
} from "./token";

export { createSessionToken, verifySessionToken, type SessionUser };

export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
}

export async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
