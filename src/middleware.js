import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/admin")) {

    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
    }

    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );

      if (payload.role !== "admin") {
        return NextResponse.redirect(
          new URL("/", request.url)
        );
      }

    } catch (err) {
      return NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
