import type { Block } from "payload";

export const IntegrationBlock: Block = {
	slug: "integration",
	interfaceName: "IntegrationBlock",
	fields: [
		{
			name: "badge",
			type: "group",
			fields: [
				{
					name: "icon",
					type: "upload",
					relationTo: "media",
					required: false,
				},
				{
					name: "text",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Connections",
				},
			],
		},
		{
			name: "heading",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Unite with aligned souls and practices",
		},
		{
			name: "mainImage",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description: "Main integration visualization image",
			},
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			localized: true,
			defaultValue:
				"Connect effortlessly with like-minded practitioners, spiritual communities, and transformative practices that resonate with your journey.",
		},
		{
			name: "linkText",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Explore all connections",
		},
		{
			name: "linkUrl",
			type: "text",
			required: false,
		},
	],
};
