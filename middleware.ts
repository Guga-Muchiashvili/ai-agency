import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicRoutes = ["/", "/registration", "/login"];
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const authToken = request.cookies.get("authToken");

  if (authToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
