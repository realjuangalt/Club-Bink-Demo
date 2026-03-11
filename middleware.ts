import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Clear route cache headers
  const response = NextResponse.next()
  response.headers.set("Cache-Control", "no-store, must-revalidate")
  response.headers.set("Pragma", "no-cache")
  response.headers.set("Expires", "0")

  // Debug logging
  console.log("Middleware:", {
    url: request.url,
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
    headers: Object.fromEntries(request.headers.entries()),
  })

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

