import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const linksHost = process.env.LINKS_HOSTNAME?.toLowerCase().trim()
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase()

  if (linksHost && host === linksHost) {
    const { pathname } = request.nextUrl
    if (pathname === "/" || pathname === "") {
      const url = request.nextUrl.clone()
      url.pathname = "/links"
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone()
    const stripped = pathname.replace(/^\/en/, "") || "/"
    url.pathname = stripped.startsWith("/") ? stripped : `/${stripped}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\..*).*)"],
}
