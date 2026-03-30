import type { Block } from "payload";
import { smartUrlField } from "../fields/smart-url-field";

export const CtaBlock: Block = {
	slug: "cta",
	interfaceName: "CtaBlock",
	labels: {
		singular: "Заклик до дії",
		plural: "Заклики до дії",
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
					defaultValue: "Trusted by seekers around the world",
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
			defaultValue:
				"Transform your inner world through conscious awakening",
		},
		{
			name: "subtitle",
			type: "textarea",
			label: "Підзаголовок",
			required: true,
			localized: true,
			defaultValue:
				"Experience deep transformation with guided spiritual practices. Release what no longer serves you, reconnect with your authentic self, and begin creating your reality from a place of inner clarity.",
		},
		{
			name: "ctaButton",
			type: "group",
			label: "Кнопка дії",
			fields: [
				{
					name: "text",
					type: "text",
					label: "Текст кнопки",
					required: true,
					localized: true,
					defaultValue: "Begin Your Journey",
				},
				smartUrlField(),
				{
					name: "openInNewTab",
					type: "checkbox",
					label: "Відкрити в новій вкладці",
					defaultValue: false,
					admin: {
						description:
							"Якщо увімкнено — посилання відкриється в новій вкладці браузера",
					},
				},
			],
		},
	],
};
