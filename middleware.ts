import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicRoutes = ["/", "/registration"];
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken");
  if (authToken) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    }
    return NextResponse.next();
  }
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
