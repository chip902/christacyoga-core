/* eslint-disable @typescript-eslint/no-explicit-any */
// types/payload-next.d.ts
declare module "@payloadcms/next" {
	import { NextRequest } from "next/server";
	import { Payload } from "payload";

	export function nextHandler(payload: Payload): (request: NextRequest) => Promise<Response>;

	export function adminHandler(payload: Payload): (request: NextRequest) => Promise<Response>;
}
