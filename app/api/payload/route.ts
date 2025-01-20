// app/api/payload/route.ts
import { headers } from "next/headers";
import payload from "payload";
import { NextResponse } from "next/server";

// Initialize Payload
if (!process.env.PAYLOAD_INITIALIZED) {
	payload.init({
		secret: process.env.PAYLOAD_SECRET as string,
		express: undefined,
		onInit: () => {
			process.env.PAYLOAD_INITIALIZED = "true";
		},
	});
}

export async function POST(req: Request) {
	const headersList = headers();
	return NextResponse.json(await payload.client.handle(req));
}

export async function GET(req: Request) {
	const headersList = headers();
	return NextResponse.json(await payload.client.handle(req));
}
