import type { Block } from "payload";

export const ContactUsBlock: Block = {
	slug: "contactUs",
	interfaceName: "ContactUsBlock",
	labels: {
		singular: "Контакти",
		plural: "Контакти",
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
					defaultValue: "Reach out to us",
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
			defaultValue: "Connect with our spiritual guides",
		},
		{
			name: "subtitle",
			type: "textarea",
			label: "Підзаголовок",
			required: true,
			localized: true,
			defaultValue:
				"Have questions, need support, or want to explore how we can guide your inner transformation? Reach out to our team anytime.",
		},
		{
			name: "cardHeading",
			type: "text",
			label: "Заголовок картки",
			required: true,
			localized: true,
			defaultValue: "Contact Us",
		},
		{
			name: "cardDescription",
			type: "textarea",
			label: "Опис картки",
			required: true,
			localized: true,
			defaultValue:
				"Have questions, need support, or want to explore how we can help your spiritual growth? Reach out to our team anytime.",
		},
		{
			name: "contactItems",
			type: "array",
			label: "Контактна інформація",
			minRows: 1,
			maxRows: 6,
			admin: {
				initCollapsed: true,
			},
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
					label: "Тип контакту",
					required: true,
					options: [
						{ label: "Електронна пошта", value: "email" },
						{ label: "Телеграм", value: "telegram" },
						{ label: "Телефон", value: "phone" },
					],
				},
				{
					name: "value",
					type: "text",
					label: "Значення",
					required: true,
					localized: true,
				},
			],
		},
		{
			name: "formFields",
			type: "group",
			label: "Поля форми",
			admin: {
				description: "Тексти для полів контактної форми",
			},
			fields: [
				{
					name: "nameLabel",
					type: "text",
					label: "Підпис поля «Імʼя»",
					required: true,
					localized: true,
					defaultValue: "Name",
				},
				{
					name: "namePlaceholder",
					type: "text",
					label: "Плейсхолдер поля «Імʼя»",
					required: true,
					localized: true,
					defaultValue: "Enter your Name",
				},
				{
					name: "emailLabel",
					type: "text",
					label: "Підпис поля «Email»",
					required: true,
					localized: true,
					defaultValue: "Email",
				},
				{
					name: "emailPlaceholder",
					type: "text",
					label: "Плейсхолдер поля «Email»",
					required: true,
					localized: true,
					defaultValue: "Enter your email",
				},
				{
					name: "phoneLabel",
					type: "text",
					label: "Підпис поля «Телефон»",
					required: true,
					localized: true,
					defaultValue: "Phone",
				},
				{
					name: "phonePlaceholder",
					type: "text",
					label: "Плейсхолдер поля «Телефон»",
					required: true,
					localized: true,
					defaultValue: "(+123)",
				},
				{
					name: "companyLabel",
					type: "text",
					label: "Підпис поля «Компанія»",
					required: true,
					localized: true,
					defaultValue: "Company Name",
				},
				{
					name: "companyPlaceholder",
					type: "text",
					label: "Плейсхолдер поля «Компанія»",
					required: true,
					localized: true,
					defaultValue: "Enter your company name",
				},
				{
					name: "messageLabel",
					type: "text",
					label: "Підпис поля «Повідомлення»",
					required: true,
					localized: true,
					defaultValue:
						"Is there any other information you'd like to share with us?",
				},
				{
					name: "messagePlaceholder",
					type: "text",
					label: "Плейсхолдер поля «Повідомлення»",
					required: true,
					localized: true,
					defaultValue: "Message here",
				},
			],
		},
		{
			name: "buttonText",
			type: "text",
			label: "Текст кнопки",
			required: true,
			localized: true,
			defaultValue: "Submit now",
		},
		{
			name: "backgroundImage",
			type: "upload",
			label: "Фонове зображення",
			relationTo: "media",
			required: false,
			admin: {
				description:
					"Фонове зображення для секції (рекомендовано: мʼякий градієнт або фото природи)",
			},
		},
	],
};
