// collections/Users.ts
import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		// Add custom fields to the JWT
		tokenExpiration: 7200, // 2 hours
		verify: true, // Enable email verification
		maxLoginAttempts: 5, // Limit login attempts
		lockTime: 600000, // Lock for 10 minutes after max attempts
		cookies: {
			secure: process.env.NODE_ENV === "production",
			sameSite: "Lax",
		},
	},
	admin: {
		useAsTitle: "email",
	},
	access: {
		// Only admins can create admin users
		create: () => true,
		// Users can read their own document
		read: ({ req: { user } }) => {
			if (user?.role === "admin") return true;
			return {
				id: {
					equals: user?.id,
				},
			};
		},
		// Users can update their own document
		update: ({ req: { user } }) => {
			if (user?.role === "admin") return true;
			return {
				id: {
					equals: user?.id,
				},
			};
		},
		// Only admins can delete users
		delete: ({ req: { user } }) => user?.role === "admin",
	},
	fields: [
		{
			name: "role",
			type: "select",
			options: [
				{ label: "Admin", value: "admin" },
				{ label: "Member", value: "member" },
			],
			required: true,
			defaultValue: "member",
		},
		{
			name: "firstName",
			type: "text",
			required: true,
		},
		{
			name: "lastName",
			type: "text",
			required: true,
		},
		{
			name: "phoneNumber",
			type: "text",
			required: false,
		},
		{
			name: "acceptedTerms",
			type: "checkbox",
			required: true,
			defaultValue: false,
		},
		{
			name: "stripeCustomerId",
			type: "text",
			admin: {
				readOnly: true,
			},
		},
	],
	timestamps: true,
};
