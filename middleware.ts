import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = (req.auth?.user as any)?.role

  const isAdminRoute = nextUrl.pathname.startsWith("/admin")
  const isAccountRoute = nextUrl.pathname.startsWith("/account")

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`, nextUrl))
    }
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/?error=unauthorized", nextUrl))
    }
  }

  if (isAccountRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`, nextUrl))
  }

  return NextResponse.next()
})

export const config = { 
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
