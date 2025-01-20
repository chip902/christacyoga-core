// collections/Pages.ts
import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		useAsTitle: "title",
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
		},
		{
			name: "layout",
			type: "select",
			options: [
				{ label: "Default", value: "default" },
				{ label: "Landing", value: "landing" },
				{ label: "Blog", value: "blog" },
			],
			defaultValue: "default",
			required: true,
		},
		{
			name: "content",
			type: "richText",
			required: true,
		},
		{
			name: "seo",
			type: "group",
			fields: [
				{
					name: "title",
					type: "text",
				},
				{
					name: "description",
					type: "textarea",
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
				},
			],
		},
	],
};
