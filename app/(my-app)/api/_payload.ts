// app/api/_payload.ts
import payload from "payload";
import config from "@/payload.config";

// Initialize Payload once
if (!process.env.PAYLOAD_SECRET) {
	throw new Error("PAYLOAD_SECRET environment variable is required");
}

// Initialize Payload if it hasn't been initialized already
if (!global.payload) {
	payload.init({
		config,
	});
}

export default payload;
