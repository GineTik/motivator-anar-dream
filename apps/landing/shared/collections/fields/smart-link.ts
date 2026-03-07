import type { Field } from "payload";

const SECTION_OPTIONS = [
	{ label: "Hero", value: "hero" },
	{ label: "Process", value: "process" },
	{ label: "Pricing", value: "pricing" },
	{ label: "Pricing Alt", value: "pricing-alt" },
	{ label: "Feature", value: "feature" },
	{ label: "Integration", value: "integration" },
	{ label: "Testimonial", value: "testimonial" },
	{ label: "FAQ", value: "faq" },
	{ label: "CTA", value: "cta" },
	{ label: "Blog", value: "blog" },
	{ label: "Footer", value: "footer" },
	{ label: "Partnership", value: "partnership" },
	{ label: "Gallery", value: "gallery" },
	{ label: "Contact Us", value: "contact-us" },
];

export function smartLinkFields(): Field[] {
	return [
		{
			type: "row",
			fields: [
				{
					name: "linkType",
					type: "select",
					defaultValue: "custom",
					options: [
						{ label: "Custom URL", value: "custom" },
						{ label: "Section", value: "section" },
					],
					admin: {
						width: "30%",
						description: "Link type",
					},
				},
				{
					name: "url",
					type: "text",
					admin: {
						width: "70%",
						condition: (_data, siblingData) =>
							!siblingData?.linkType || siblingData.linkType === "custom",
						placeholder: "https://example.com",
						description: "Any URL: absolute, relative, or anchor",
					},
				},
				{
					name: "section",
					type: "select",
					options: SECTION_OPTIONS,
					admin: {
						width: "70%",
						condition: (_data, siblingData) =>
							siblingData?.linkType === "section",
						description: "Select a section to scroll to",
					},
				},
			],
		},
	];
}
