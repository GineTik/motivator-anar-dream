import type { Block } from "payload";
import { smartUrlField } from "../fields/smart-url-field";

export const FooterBlock: Block = {
	slug: "footer",
	interfaceName: "FooterBlock",
	labels: {
		singular: "Футер (підвал сайту)",
		plural: "Футери",
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
					"Логотип у нижній частині сайту (рекомендується світла версія)",
			},
		},
		{
			name: "menuGroups",
			type: "array",
			label: "Групи меню",
			minRows: 1,
			maxRows: 4,
			admin: {
				initCollapsed: true,
				description:
					"Колонки з посиланнями в нижній частині сайту",
			},
			defaultValue: [
				{
					title: "Explore",
					links: [
						{ label: "Home", url: "/" },
						{ label: "About Us", url: "/about" },
						{ label: "Practices", url: "/practices" },
						{ label: "Pricing", url: "/pricing" },
						{ label: "Blog", url: "/blog" },
						{ label: "Contact", url: "/contact" },
					],
				},
				{
					title: "Resources",
					links: [
						{ label: "Guided Meditations", url: "/meditations" },
						{ label: "Breathwork Sessions", url: "/breathwork" },
						{ label: "Community", url: "/community" },
					],
				},
				{
					title: "Support",
					links: [
						{ label: "FAQ", url: "/faq" },
						{ label: "Privacy Policy", url: "/privacy" },
						{ label: "Terms of Service", url: "/terms" },
					],
				},
			],
			fields: [
				{
					name: "title",
					type: "text",
					label: "Назва групи",
					required: true,
					localized: true,
				},
				{
					name: "links",
					type: "array",
					label: "Посилання",
					minRows: 1,
					maxRows: 8,
					admin: {
						initCollapsed: true,
					},
					fields: [
						{
							name: "label",
							type: "text",
							label: "Назва посилання",
							required: true,
							localized: true,
						},
						smartUrlField(),
					],
				},
			],
		},
		{
			name: "newsletter",
			type: "group",
			label: "Розсилка",
			fields: [
				{
					name: "heading",
					type: "text",
					label: "Заголовок",
					required: true,
					localized: true,
					defaultValue: "Stay connected with your inner journey",
				},
				{
					name: "subtitle",
					type: "text",
					label: "Підзаголовок",
					required: false,
					localized: true,
					defaultValue:
						"Receive guidance, practices, and insights delivered to your inbox.",
				},
				{
					name: "buttonText",
					type: "text",
					label: "Текст кнопки",
					required: true,
					localized: true,
					defaultValue: "Subscribe",
				},
				smartUrlField(),
			],
		},
		{
			name: "copyright",
			type: "text",
			label: "Авторське право",
			required: false,
			localized: true,
			defaultValue: "All rights reserved, Anara Dreams",
		},
		{
			name: "socialLinks",
			type: "array",
			label: "Соціальні мережі",
			maxRows: 6,
			admin: {
				initCollapsed: true,
				description:
					"Посилання на соціальні мережі (іконки внизу сторінки)",
			},
			fields: [
				{
					name: "icon",
					type: "upload",
					label: "Іконка",
					relationTo: "media",
					required: false,
				},
				{
					name: "href",
					type: "text",
					label: "Посилання",
					required: true,
				},
				{
					name: "label",
					type: "text",
					label: "Назва мережі",
					required: false,
					admin: {
						description:
							"Наприклад: Instagram, Telegram, Facebook",
					},
				},
			],
		},
	],
};
