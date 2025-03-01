// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/profile", "/bookings", "/classes"];

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|admin|_payload).*)"],
};

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("payload-token");
	const { pathname } = request.nextUrl;

	// Check if path requires authentication
	const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

	if (isProtectedPath && !token) {
		const url = new URL("/auth/login", request.url);
		url.searchParams.set("from", pathname);
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}
