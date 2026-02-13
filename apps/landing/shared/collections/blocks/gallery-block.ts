import type { Block } from "payload";

export const GalleryBlock: Block = {
	slug: "gallery",
	interfaceName: "GalleryBlock",
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
					defaultValue: "Real transformations",
				},
			],
		},
		{
			name: "heading",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Stories of inner awakening",
		},
		{
			name: "subtitle",
			type: "textarea",
			required: true,
			localized: true,
			defaultValue:
				"Authentic moments of transformation shared by our community members on their journey of conscious growth.",
		},
		{
			name: "images",
			type: "array",
			minRows: 1,
			maxRows: 20,
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
				{
					name: "alt",
					type: "text",
					required: false,
					localized: true,
					defaultValue: "Community transformation story",
				},
			],
		},
	],
};
