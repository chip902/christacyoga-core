// payload.config.ts
import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";

// Import your collections
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";
import { NavigationMenu } from "./collections/NavigationMenu";

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
	admin: {
		user: "users",
		bundler: webpackBundler(),
	},
	editor: slateEditor({}),
	collections: [
		// Collections are registered here
		Pages,
		Media,
		NavigationMenu,
	],
	db: mongooseAdapter({
		url: process.env.MONGODB_URI as string,
	}),
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
});
