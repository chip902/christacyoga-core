import { Payload } from "payload";

declare global {
	interface GlobalThis {
		payloadClient: Payload | null;
	}
}

export {};
