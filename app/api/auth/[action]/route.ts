// app/api/auth/[action]/route.ts
import { NextResponse } from "next/server";
import { initPayload } from "@/lib/payload";
import { cookies } from "next/headers";

export async function POST(request: Request, { params }: { params: { action: string } }) {
	const payload = await initPayload();
	const body = await request.json();

	try {
		switch (params.action) {
			case "login": {
				const { user, token } = await payload.login({
					collection: "users",
					data: {
						email: body.email,
						password: body.password,
					},
				});

				if (token) {
					// Create the response with the user data
					const response = NextResponse.json({ user });

					// Set the cookie on the response
					response.cookies.set("payload-token", token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "lax",
						path: "/",
					});

					return response;
				}

				return NextResponse.json({ user });
			}

			case "register": {
				const user = await payload.create({
					collection: "users",
					data: {
						email: body.email,
						password: body.password,
						firstName: body.firstName,
						lastName: body.lastName,
						phoneNumber: body.phoneNumber,
						acceptedTerms: body.acceptedTerms,
					},
				});

				return NextResponse.json({ user });
			}

			case "logout": {
				// Create response and clear the cookie
				const response = NextResponse.json({ success: true });
				response.cookies.delete("payload-token");
				return response;
			}

			case "forgot-password": {
				await payload.forgotPassword({
					collection: "users",
					data: {
						email: body.email,
					},
				});
				return NextResponse.json({ success: true });
			}

			case "reset-password": {
				await payload.resetPassword({
					collection: "users",
					data: {
						password: body.password,
						token: body.token,
					},
					overrideAccess: false,
				});
				return NextResponse.json({ success: true });
			}

			default:
				return NextResponse.json({ error: "Invalid action" }, { status: 400 });
		}
	} catch (error: any) {
		console.error(`Auth error (${params.action}):`, error);
		return NextResponse.json({ error: error.message || "Internal server error" }, { status: error.status || 500 });
	}
}
