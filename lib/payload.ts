// lib/payload.ts
import payload, { Payload } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import type { InitOptions } from "payload";
import config from "../payload.config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface PayloadCache {
	client: Payload | null;
	promise: Promise<Payload> | null;
}

let cached = ((global as any).payload as PayloadCache) || {
	client: null,
	promise: null,
};

if (!(global as any).payload) {
	(global as any).payload = cached;
}

export const getPayloadClient = async (): Promise<Payload> => {
	if (cached.client) {
		return cached.client;
	}

	if (!cached.promise) {
		cached.promise = payload.init({
			...config,
		} as unknown as InitOptions);

		//cached.promise = payload.init(options);
	}

	try {
		cached.client = await cached.promise;
	} catch (e: unknown) {
		cached.promise = null;
		throw e;
	}

	return cached.client;
};
