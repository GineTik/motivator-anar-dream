import type { Field } from "payload";

const SECTION_OPTIONS = [
	{ label: "Головна секція", value: "hero" },
	{ label: "Процес", value: "process" },
	{ label: "Ціни", value: "pricing" },
	{ label: "Ціни (альт.)", value: "pricing-alt" },
	{ label: "Можливості", value: "feature" },
	{ label: "Інтеграції", value: "integration" },
	{ label: "Відгуки", value: "testimonial" },
	{ label: "Питання та відповіді", value: "faq" },
	{ label: "Заклик до дії", value: "cta" },
	{ label: "Блог", value: "blog" },
	{ label: "Футер", value: "footer" },
	{ label: "Партнерство", value: "partnership" },
	{ label: "Галерея", value: "gallery" },
	{ label: "Контакти", value: "contact-us" },
];

export function smartLinkFields(): Field[] {
	return [
		{
			type: "row",
			fields: [
				{
					name: "linkType",
					type: "select",
					label: "Тип посилання",
					defaultValue: "custom",
					options: [
						{ label: "Власне посилання", value: "custom" },
						{ label: "Секція на сторінці", value: "section" },
					],
					admin: {
						width: "30%",
						description:
							"Оберіть тип: власне посилання або перехід до секції на сторінці",
					},
				},
				{
					name: "url",
					type: "text",
					label: "Посилання",
					admin: {
						width: "70%",
						condition: (_data, siblingData) =>
							!siblingData?.linkType || siblingData.linkType === "custom",
						placeholder: "https://example.com",
						description:
							"Введіть адресу сторінки, наприклад: https://example.com або /contact",
					},
				},
				{
					name: "section",
					type: "select",
					label: "Секція",
					options: SECTION_OPTIONS,
					admin: {
						width: "70%",
						condition: (_data, siblingData) =>
							siblingData?.linkType === "section",
						description:
							"Оберіть секцію, до якої буде прокручуватися сторінка",
					},
				},
			],
		},
	];
}
