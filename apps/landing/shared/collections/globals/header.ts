import type { GlobalConfig } from "payload";
import { smartLinkFields } from "../fields/smart-link";

export const Header: GlobalConfig = {
	slug: "header",
	label: "Header",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "logo",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description: "Site logo for the navbar",
			},
		},
		{
			name: "navLinks",
			type: "array",
			minRows: 1,
			maxRows: 8,
			defaultValue: [
				{ label: "About", linkType: "custom", url: "/about" },
				{ label: "Practices", linkType: "custom", url: "/practices" },
				{ label: "Pricing", linkType: "custom", url: "/pricing" },
				{ label: "Blog", linkType: "custom", url: "/blog" },
				{ label: "Contact", linkType: "custom", url: "/contact" },
			],
			fields: [
				{
					name: "label",
					type: "text",
					required: true,
					localized: true,
				},
				...smartLinkFields(),
				{
					name: "children",
					type: "array",
					required: false,
					fields: [
						{
							name: "label",
							type: "text",
							required: true,
							localized: true,
						},
						...smartLinkFields(),
					],
				},
			],
		},
		{
			name: "ctaText",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Begin Your Journey",
		},
		...smartLinkFields(),
		{
			name: "ctaArrowIcon",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description: "Arrow icon for the CTA button",
			},
		},
	],
};
