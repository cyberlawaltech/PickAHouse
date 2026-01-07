import { type NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // For now, just allow - we'll add role checking in the admin layout
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
