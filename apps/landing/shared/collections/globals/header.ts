import type { GlobalConfig } from "payload";
import { smartUrlField } from "../fields/smart-url-field";

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
				initCollapsed: true,
				description:
					"Пункти меню у верхній частині сайту (від 1 до 8)",
			},
			defaultValue: [
				{ label: "About", url: "/about" },
				{ label: "Practices", url: "/practices" },
				{ label: "Pricing", url: "/pricing" },
				{ label: "Blog", url: "/blog" },
				{ label: "Contact", url: "/contact" },
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
				smartUrlField(),
				{
					name: "children",
					type: "array",
					label: "Підпункти меню",
					required: false,
					admin: {
						initCollapsed: true,
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
						smartUrlField(),
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
		smartUrlField(),
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
