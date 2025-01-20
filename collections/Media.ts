// collections/Media.ts
import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: () => true,
	},
	upload: {
		staticDir: "../public/media",
		staticURL: "/media",
		imageSizes: [
			{
				name: "thumbnail",
				width: 400,
				height: 300,
				position: "centre",
			},
			{
				name: "hero",
				width: 1920,
				height: 1080,
				position: "centre",
			},
		],
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
};
