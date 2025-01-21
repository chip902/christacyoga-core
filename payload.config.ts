import { buildConfig } from "payload";
import type { Config } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import path from "path";
import sharp from "sharp";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import { fileURLToPath } from "url";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const collections = [Users, Media, Pages];

const config: Config = {
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001",
	admin: {
		user: "users",
		meta: {
			titleSuffix: "- Christa C Yoga",
		},
	},
	collections,
	editor: lexicalEditor({}),
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL || "",
			ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
			max: 10,
		},
		schemaName: "verceldb",
	}),
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
	},
	// Remove CORS settings as they're handled by Next.js
	// cors: ["http://localhost:3000", "http://localhost:3001"],
	// csrf: ["http://localhost:3000", "http://localhost:3001"],
	debug: process.env.NODE_ENV === "development",
	upload: {
		limits: {
			fileSize: 50000000, // 5MB, adjust as needed
		},
	},
	secret: process.env.PAYLOAD_SECRET || "ABCD1234efgh",
	sharp,
	email: nodemailerAdapter({
		defaultFromAddress: "info@christacyoga.com",
		defaultFromName: "Christa C Yoga",
		transportOptions: nodemailerSendgrid({
			apiKey: process.env.SENDGRID_API_KEY,
		}),
	}),
};

export default buildConfig(config);
