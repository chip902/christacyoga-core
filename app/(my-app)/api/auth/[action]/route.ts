// app/api/auth/[action]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import payload from "payload";
import { Config } from "@/payload-types";

// Define the type for user creation that matches PayloadCMS's expectations
type CreateUserData = Omit<Config["collections"]["users"], "id" | "createdAt" | "updatedAt"> & {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	acceptedTerms: boolean;
	role: "admin" | "member";
};

export async function POST(req: NextRequest, { params }: { params: { action: string } }) {
	const body = await req.json();

	try {
		switch (params.action) {
			case "register": {
				// Validate required fields
				if (!body.email || !body.password || !body.firstName || !body.lastName) {
					return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
				}

				// Construct the user data with all required fields
				const userData = {
					email: body.email,
					password: body.password,
					firstName: body.firstName,
					lastName: body.lastName,
					phoneNumber: body.phoneNumber || "",
					acceptedTerms: body.acceptedTerms || false,
					role: "member" as const, // Use const assertion to narrow the type
				} satisfies Omit<CreateUserData, "id" | "createdAt" | "updatedAt">;

				const user = await payload.create({
					collection: "users",
					data: userData,
				});

				return NextResponse.json({ user });
			}

			case "login": {
				if (!body.email || !body.password) {
					return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
				}

				const { user, token } = await payload.login({
					collection: "users",
					data: {
						email: body.email,
						password: body.password,
					},
				});

				const response = NextResponse.json({ user });

				if (token) {
					response.cookies.set("payload-token", token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "lax",
						path: "/",
					});
				}

				return response;
			}

			case "logout": {
				const response = NextResponse.json({ success: true });
				response.cookies.delete("payload-token");
				return response;
			}

			default:
				return NextResponse.json({ error: "Invalid action" }, { status: 400 });
		}
	} catch (error: any) {
		console.error(`Auth error (${params.action}):`, error);
		return NextResponse.json({ error: error.message || "Internal server error" }, { status: error.status || 500 });
	}
}
