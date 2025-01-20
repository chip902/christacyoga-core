// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add paths that require authentication
const protectedPaths = ["/profile", "/bookings", "/workshops", "/classes"];

// Add paths that require admin access
const adminPaths = ["/admin"];

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("payload-token");
	const { pathname } = request.nextUrl;

	// Check if path requires authentication
	const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

	// Check if path requires admin access
	const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

	if (isProtectedPath && !token) {
		const url = new URL("/auth/login", request.url);
		url.searchParams.set("from", pathname);
		return NextResponse.redirect(url);
	}

	if (isAdminPath) {
		// Admin paths are handled by Payload's admin panel
		return NextResponse.next();
	}

	return NextResponse.next();
}
