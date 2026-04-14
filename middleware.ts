import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const linksHost = process.env.LINKS_HOSTNAME?.toLowerCase().trim()
  if (!linksHost) {
    return NextResponse.next()
  }

  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase()
  if (!host || host !== linksHost) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl
  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone()
    url.pathname = "/links"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\..*).*)"],
}
