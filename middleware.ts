import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"],
  
  afterAuth(auth, req) {
    const url = new URL(req.nextUrl);
    const path = url.pathname;
    const isPublicRoute = path === "/" || path.startsWith("/sign-in") || path.startsWith("/sign-up");
    const isDashboardRoute = path.startsWith("/dashboard");
    
    // If user is signed in and on public route (including home page), redirect to dashboard
    if (auth.userId && isPublicRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    // If user is not signed in and trying to access dashboard, redirect to home page (/)
    if (!auth.userId && isDashboardRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};