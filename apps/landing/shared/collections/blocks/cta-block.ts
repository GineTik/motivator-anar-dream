import type { Block } from "payload";

export const CtaBlock: Block = {
	slug: "cta",
	interfaceName: "CtaBlock",
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
					defaultValue: "Trusted by seekers around the world",
				},
			],
		},
		{
			name: "heading",
			type: "text",
			required: true,
			localized: true,
			defaultValue:
				"Transform your inner world through conscious awakening",
		},
		{
			name: "subtitle",
			type: "textarea",
			required: true,
			localized: true,
			defaultValue:
				"Experience deep transformation with guided spiritual practices. Release what no longer serves you, reconnect with your authentic self, and begin creating your reality from a place of inner clarity.",
		},
		{
			name: "emailPlaceholder",
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
			defaultValue: "Begin Your Journey",
		},
	],
};
