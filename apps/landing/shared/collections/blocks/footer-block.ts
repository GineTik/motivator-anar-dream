import type { Block } from "payload";

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
						{ label: "Home", href: "/" },
						{ label: "About Us", href: "/about" },
						{ label: "Practices", href: "/practices" },
						{ label: "Pricing", href: "/pricing" },
						{ label: "Blog", href: "/blog" },
						{ label: "Contact", href: "/contact" },
					],
				},
				{
					title: "Resources",
					links: [
						{ label: "Guided Meditations", href: "/meditations" },
						{ label: "Breathwork Sessions", href: "/breathwork" },
						{ label: "Community", href: "/community" },
					],
				},
				{
					title: "Support",
					links: [
						{ label: "FAQ", href: "/faq" },
						{ label: "Privacy Policy", href: "/privacy" },
						{ label: "Terms of Service", href: "/terms" },
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
						{
							name: "href",
							type: "text",
							required: true,
						},
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
					name: "placeholder",
					type: "text",
					required: false,
					localized: true,
					defaultValue: "Enter Email",
				},
				{
					name: "buttonText",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Subscribe",
				},
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
