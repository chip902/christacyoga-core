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
			admin: {
				description: 'The URL path for this page (e.g., "about" or "contact")',
			},
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
		},
		{
			name: "meta",
			type: "group",
			fields: [
				{
					name: "description",
					type: "textarea",
				},
				{
					name: "keywords",
					type: "text",
				},
			],
		},
	],
};
