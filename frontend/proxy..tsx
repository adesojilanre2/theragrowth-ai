import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (!isDashboard) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("theragrowth_admin")?.value;

  if (authCookie !== "authenticated") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};