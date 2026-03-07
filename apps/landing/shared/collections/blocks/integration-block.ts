import type { Block } from "payload";

export const IntegrationBlock: Block = {
	slug: "integration",
	interfaceName: "IntegrationBlock",
	labels: {
		singular: "Інтеграції",
		plural: "Інтеграції",
	},
	fields: [
		{
			name: "badge",
			type: "group",
			label: "Бейдж",
			fields: [
				{
					name: "icon",
					type: "upload",
					label: "Іконка бейджу",
					relationTo: "media",
					required: false,
				},
				{
					name: "text",
					type: "text",
					label: "Текст бейджу",
					required: true,
					localized: true,
					defaultValue: "Connections",
					admin: {
						description: "Короткий текст над заголовком секції",
					},
				},
			],
		},
		{
			name: "heading",
			type: "text",
			label: "Заголовок",
			required: true,
			localized: true,
			defaultValue: "Unite with aligned souls and practices",
		},
		{
			name: "mainImage",
			type: "upload",
			label: "Головне зображення",
			relationTo: "media",
			required: false,
			admin: {
				description: "Зображення для візуалізації інтеграцій",
			},
		},
		{
			name: "description",
			type: "textarea",
			label: "Опис",
			required: true,
			localized: true,
			defaultValue:
				"Connect effortlessly with like-minded practitioners, spiritual communities, and transformative practices that resonate with your journey.",
		},
		{
			name: "linkText",
			type: "text",
			label: "Текст посилання",
			required: true,
			localized: true,
			defaultValue: "Explore all connections",
		},
		{
			name: "linkUrl",
			type: "text",
			label: "Адреса посилання",
			required: false,
		},
	],
};
