import { getPayloadClient } from "@/lib/payload";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const payload = await getPayloadClient();
		const { pathname } = new URL(req.url);

		// Handle admin requests differently - don't try to findGlobal
		if (pathname.startsWith("/admin")) {
			// For admin routes, we should let PayloadCMS handle it through its admin UI
			return NextResponse.json(
				{ message: "Admin UI Access" },
				{
					status: 200,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		// Handle other API requests
		const collection = pathname.split("/")[3]; // Get collection name from URL
		if (collection) {
			const response = await payload.find({
				collection,
			});

			return NextResponse.json(response, {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	} catch (error) {
		console.error("Payload request error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const payload = await getPayloadClient();
		const { pathname } = new URL(req.url);
		const collection = pathname.split("/")[3];
		const body = await req.json();

		if (collection) {
			const response = await payload.create({
				collection,
				data: body,
			});

			return NextResponse.json(response, {
				status: 201,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	} catch (error) {
		console.error("Payload request error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

// Similar pattern for PATCH and DELETE
export async function PATCH(req: NextRequest) {
	try {
		const payload = await getPayloadClient();
		const { pathname } = new URL(req.url);
		const pathParts = pathname.split("/");
		const collection = pathParts[3];
		const id = pathParts[4];
		const body = await req.json();

		if (collection && id) {
			const response = await payload.update({
				collection,
				id,
				data: body,
			});

			return NextResponse.json(response, {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	} catch (error) {
		console.error("Payload request error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const payload = await getPayloadClient();
		const { pathname } = new URL(req.url);
		const pathParts = pathname.split("/");
		const collection = pathParts[3];
		const id = pathParts[4];

		if (collection && id) {
			const response = await payload.delete({
				collection,
				id,
			});

			return NextResponse.json(response, {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	} catch (error) {
		console.error("Payload request error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
