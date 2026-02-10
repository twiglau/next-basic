import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/server/auth";

export async function proxy(request: NextRequest) {
  const session = await getServerSession();

  // If the user is not authenticated and trying to access a protected route
  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect these routes
};
