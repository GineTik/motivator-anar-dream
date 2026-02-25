import type { Block } from "payload";

export const ContactUsBlock: Block = {
	slug: "contactUs",
	interfaceName: "ContactUsBlock",
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
					defaultValue: "Reach out to us",
				},
			],
		},
		{
			name: "heading",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Connect with our spiritual guides",
		},
		{
			name: "subtitle",
			type: "textarea",
			required: true,
			localized: true,
			defaultValue:
				"Have questions, need support, or want to explore how we can guide your inner transformation? Reach out to our team anytime.",
		},
		{
			name: "cardHeading",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Contact Us",
		},
		{
			name: "cardDescription",
			type: "textarea",
			required: true,
			localized: true,
			defaultValue:
				"Have questions, need support, or want to explore how we can help your spiritual growth? Reach out to our team anytime.",
		},
		{
			name: "contactItems",
			type: "array",
			minRows: 1,
			maxRows: 6,
			defaultValue: [
				{
					type: "email",
					value: "hello@anaradreams.com",
				},
				{
					type: "telegram",
					value: "anara_dreams",
				},
				{
					type: "phone",
					value: "(+380) 123 456 789",
				},
			],
			fields: [
				{
					name: "type",
					type: "select",
					required: true,
					options: [
						{ label: "Email", value: "email" },
						{ label: "Telegram", value: "telegram" },
						{ label: "Phone", value: "phone" },
					],
				},
				{
					name: "value",
					type: "text",
					required: true,
					localized: true,
				},
			],
		},
		{
			name: "formFields",
			type: "group",
			fields: [
				{
					name: "nameLabel",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Name",
				},
				{
					name: "namePlaceholder",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Enter your Name",
				},
				{
					name: "emailLabel",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Email",
				},
				{
					name: "emailPlaceholder",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Enter your email",
				},
				{
					name: "phoneLabel",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Phone",
				},
				{
					name: "phonePlaceholder",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "(+123)",
				},
				{
					name: "companyLabel",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Company Name",
				},
				{
					name: "companyPlaceholder",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Enter your company name",
				},
				{
					name: "messageLabel",
					type: "text",
					required: true,
					localized: true,
					defaultValue:
						"Is there any other information you'd like to share with us?",
				},
				{
					name: "messagePlaceholder",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Message here",
				},
			],
		},
		{
			name: "buttonText",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Submit now",
		},
		{
			name: "backgroundImage",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description: "Background image for the section (recommended: soft gradient or nature image)",
			},
		},
	],
};
