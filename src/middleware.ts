import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lindungi rute dashboard dan API admin
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/admin");

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return redirectToLogin(request);
  }

  const user = await verifySessionToken(token);

  if (!user) {
    // Token kadaluarsa atau tidak valid
    const response = redirectToLogin(request);
    response.cookies.set("auth_token", "", { maxAge: 0, path: "/" });
    return response;
  }

  // Cek role admin untuk rute dashboard
  if (pathname.startsWith("/dashboard") && user.role !== "admin") {
    // User biasa tidak boleh mengakses dashboard admin
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Tambahkan header user info untuk digunakan server-side
  const response = NextResponse.next();
  response.headers.set("x-user-id", user.id);
  response.headers.set("x-user-role", user.role);
  return response;
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/admin/:path*",
  ],
};
