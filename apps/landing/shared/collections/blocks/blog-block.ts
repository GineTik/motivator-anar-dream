import type { Block } from "payload";

export const BlogBlock: Block = {
	slug: "blog",
	interfaceName: "BlogBlock",
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
					defaultValue: "Insights",
				},
			],
		},
		{
			name: "heading",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Wisdom for your path",
		},
		{
			name: "subtitle",
			type: "textarea",
			required: true,
			localized: true,
			defaultValue:
				"Begin in moments, not hours. Our intuitive approach welcomes you wherever you are — no prior experience needed.",
		},
		{
			name: "posts",
			type: "array",
			minRows: 1,
			maxRows: 6,
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
					relationTo: "media",
					required: false,
					admin: {
						description: "Blog post thumbnail image",
					},
				},
				{
					name: "title",
					type: "text",
					required: true,
					localized: true,
				},
				{
					name: "description",
					type: "textarea",
					required: false,
					localized: true,
				},
				{
					name: "href",
					type: "text",
					required: false,
				},
			],
		},
		{
			name: "explore",
			type: "group",
			fields: [
				{
					name: "heading",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Explore more insights",
				},
				{
					name: "subtitle",
					type: "textarea",
					required: false,
					localized: true,
					defaultValue:
						"Deepen your understanding through our collection of guided articles and reflections.",
				},
				{
					name: "buttonText",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Read All Articles",
				},
				{
					name: "buttonLink",
					type: "text",
					required: false,
					defaultValue: "/blog",
				},
			],
		},
	],
};
