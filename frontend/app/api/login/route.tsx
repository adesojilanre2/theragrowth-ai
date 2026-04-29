import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const password = body.password;

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password is not configured." },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("theragrowth_admin", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}