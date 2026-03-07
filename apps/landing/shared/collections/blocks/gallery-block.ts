import type { Block } from "payload";

export const GalleryBlock: Block = {
	slug: "gallery",
	interfaceName: "GalleryBlock",
	labels: {
		singular: "Галерея",
		plural: "Галереї",
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
					defaultValue: "Real transformations",
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
			defaultValue: "Stories of inner awakening",
		},
		{
			name: "subtitle",
			type: "textarea",
			label: "Підзаголовок",
			required: true,
			localized: true,
			defaultValue:
				"Authentic moments of transformation shared by our community members on their journey of conscious growth.",
		},
		{
			name: "images",
			type: "array",
			label: "Зображення",
			minRows: 1,
			maxRows: 20,
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "image",
					type: "upload",
					label: "Зображення",
					relationTo: "media",
					required: true,
				},
				{
					name: "alt",
					type: "text",
					label: "Опис зображення",
					required: false,
					localized: true,
					defaultValue: "Community transformation story",
					admin: {
						description:
							"Короткий опис для людей з вадами зору",
					},
				},
			],
		},
	],
};
