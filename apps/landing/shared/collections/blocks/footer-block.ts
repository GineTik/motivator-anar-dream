import type { Block } from "payload";
import { smartLinkFields } from "../fields/smart-link";

export const FooterBlock: Block = {
	slug: "footer",
	interfaceName: "FooterBlock",
	fields: [
		{
			name: "logo",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description: "Footer logo (light version recommended)",
			},
		},
		{
			name: "menuGroups",
			type: "array",
			minRows: 1,
			maxRows: 4,
			defaultValue: [
				{
					title: "Explore",
					links: [
						{ label: "Home", linkType: "custom", url: "/" },
						{ label: "About Us", linkType: "custom", url: "/about" },
						{ label: "Practices", linkType: "custom", url: "/practices" },
						{ label: "Pricing", linkType: "custom", url: "/pricing" },
						{ label: "Blog", linkType: "custom", url: "/blog" },
						{ label: "Contact", linkType: "custom", url: "/contact" },
					],
				},
				{
					title: "Resources",
					links: [
						{ label: "Guided Meditations", linkType: "custom", url: "/meditations" },
						{ label: "Breathwork Sessions", linkType: "custom", url: "/breathwork" },
						{ label: "Community", linkType: "custom", url: "/community" },
					],
				},
				{
					title: "Support",
					links: [
						{ label: "FAQ", linkType: "custom", url: "/faq" },
						{ label: "Privacy Policy", linkType: "custom", url: "/privacy" },
						{ label: "Terms of Service", linkType: "custom", url: "/terms" },
					],
				},
			],
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					localized: true,
				},
				{
					name: "links",
					type: "array",
					minRows: 1,
					maxRows: 8,
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
			name: "newsletter",
			type: "group",
			fields: [
				{
					name: "heading",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Stay connected with your inner journey",
				},
				{
					name: "subtitle",
					type: "text",
					required: false,
					localized: true,
					defaultValue:
						"Receive guidance, practices, and insights delivered to your inbox.",
				},
				{
					name: "buttonText",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Subscribe",
				},
				...smartLinkFields(),
			],
		},
		{
			name: "copyright",
			type: "text",
			required: false,
			localized: true,
			defaultValue: "All rights reserved, Anara Dreams",
		},
		{
			name: "socialLinks",
			type: "array",
			maxRows: 6,
			fields: [
				{
					name: "icon",
					type: "upload",
					relationTo: "media",
					required: false,
				},
				{
					name: "href",
					type: "text",
					required: true,
				},
				{
					name: "label",
					type: "text",
					required: false,
					admin: {
						description: "Accessible label (e.g. 'Twitter', 'Instagram')",
					},
				},
			],
		},
	],
};
