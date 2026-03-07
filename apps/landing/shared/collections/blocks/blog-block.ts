import type { Block } from "payload";

export const BlogBlock: Block = {
	slug: "blog",
	interfaceName: "BlogBlock",
	labels: {
		singular: "Блог",
		plural: "Блоги",
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
					defaultValue: "Insights",
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
			defaultValue: "Wisdom for your path",
		},
		{
			name: "subtitle",
			type: "textarea",
			label: "Підзаголовок",
			required: true,
			localized: true,
			defaultValue:
				"Begin in moments, not hours. Our intuitive approach welcomes you wherever you are — no prior experience needed.",
		},
		{
			name: "posts",
			type: "array",
			label: "Статті",
			minRows: 1,
			maxRows: 6,
			admin: {
				initCollapsed: true,
			},
			defaultValue: [
				{
					title: "The Power of Daily Meditation Practice",
					description:
						"Explore how just 10 minutes of stillness each day can transform your awareness, emotional balance, and connection to self.",
				},
				{
					title: "Understanding Energy and Consciousness",
					description:
						"Dive into the science and wisdom behind conscious living — how your inner state shapes your outer reality.",
				},
			],
			fields: [
				{
					name: "image",
					type: "upload",
					label: "Зображення",
					relationTo: "media",
					required: false,
					admin: {
						description: "Мініатюра статті",
					},
				},
				{
					name: "title",
					type: "text",
					label: "Заголовок",
					required: true,
					localized: true,
				},
				{
					name: "description",
					type: "textarea",
					label: "Опис",
					required: false,
					localized: true,
				},
				{
					name: "href",
					type: "text",
					label: "Посилання на статтю",
					required: false,
				},
			],
		},
		{
			name: "explore",
			type: "group",
			label: "Блок «Дивитися більше»",
			fields: [
				{
					name: "heading",
					type: "text",
					label: "Заголовок",
					required: true,
					localized: true,
					defaultValue: "Explore more insights",
				},
				{
					name: "subtitle",
					type: "textarea",
					label: "Підзаголовок",
					required: false,
					localized: true,
					defaultValue:
						"Deepen your understanding through our collection of guided articles and reflections.",
				},
				{
					name: "buttonText",
					type: "text",
					label: "Текст кнопки",
					required: true,
					localized: true,
					defaultValue: "Read All Articles",
				},
				{
					name: "buttonLink",
					type: "text",
					label: "Посилання кнопки",
					required: false,
					defaultValue: "/blog",
				},
			],
		},
	],
};
