import type { GlobalConfig } from "payload";
import { smartLinkFields } from "../fields/smart-link";

export const Header: GlobalConfig = {
	slug: "header",
	label: "Шапка сайту",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "logo",
			type: "upload",
			label: "Логотип",
			relationTo: "media",
			required: false,
			admin: {
				description:
					"Логотип який відображається у верхній частині сайту",
			},
		},
		{
			name: "navLinks",
			type: "array",
			label: "Посилання навігації",
			minRows: 1,
			maxRows: 8,
			admin: {
				description:
					"Пункти меню у верхній частині сайту (від 1 до 8)",
			},
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
					label: "Назва пункту",
					required: true,
					localized: true,
					admin: {
						description: "Текст який бачить відвідувач",
					},
				},
				...smartLinkFields(),
				{
					name: "children",
					type: "array",
					label: "Підпункти меню",
					required: false,
					admin: {
						description:
							"Випадаючий список під цим пунктом (необовʼязково)",
					},
					fields: [
						{
							name: "label",
							type: "text",
							label: "Назва пункту",
							required: true,
							localized: true,
							admin: {
								description: "Текст який бачить відвідувач",
							},
						},
						...smartLinkFields(),
					],
				},
			],
		},
		{
			name: "ctaText",
			type: "text",
			label: "Текст кнопки",
			required: true,
			localized: true,
			defaultValue: "Begin Your Journey",
			admin: {
				description: "Текст на головній кнопці у шапці",
			},
		},
		...smartLinkFields(),
		{
			name: "ctaArrowIcon",
			type: "upload",
			label: "Іконка стрілки",
			relationTo: "media",
			required: false,
			admin: {
				description:
					"Іконка стрілки біля тексту кнопки (необовʼязково)",
			},
		},
	],
};
