/**
 * TOKEN ENGINE (EDGE COMPATIBLE)
 * 
 * Menggunakan jose yang 100% kompatibel dengan Web Crypto API / Edge Runtime.
 * Tidak mengimpor modul Node.js murni sehingga aman digunakan di middleware.ts.
 */

import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "ciptaruang_jwt_super_secret_key_minimum_32_characters_long_2026";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

