import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    "/library",
    "/playlists",
    "/liked-songs",
    "/profile",
    "/settings",
    "/search"
  ];

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/library/:path*",
    "/playlists/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/search/:path*",
  ],
};
