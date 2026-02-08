import type { Block } from "payload";

export const PricingAltBlock: Block = {
	slug: "pricingAlt",
	interfaceName: "PricingAltBlock",
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
					defaultValue: "Your Investment",
				},
			],
		},
		{
			name: "heading",
			type: "text",
			required: true,
			localized: true,
			defaultValue: "Simple, transparent pricing",
		},
		{
			name: "subtitle",
			type: "textarea",
			required: true,
			localized: true,
			defaultValue:
				"Choose the path that resonates with your journey. No hidden costs, no surprises — just honest pricing for genuine transformation.",
		},
		{
			name: "discountLabel",
			type: "text",
			required: false,
			localized: true,
			defaultValue: "Save 15%",
		},
		{
			name: "plans",
			type: "array",
			minRows: 1,
			maxRows: 4,
			defaultValue: [
				{
					name: "Seeker Path",
					badgeText: "Most Popular",
					monthlyPrice: "$33",
					yearlyPrice: "$28",
					period: "/monthly",
					yearlyPeriod: "/yearly",
					buttonText: "Begin Now",
					highlighted: false,
					features: [
						{ text: "Guided meditation library" },
						{ text: "Weekly group sessions" },
						{ text: "Personal practice tracker" },
						{ text: "Community access" },
					],
				},
				{
					name: "Deep Journey",
					badgeText: "For Committed Seekers",
					monthlyPrice: "$67",
					yearlyPrice: "$57",
					period: "/monthly",
					yearlyPeriod: "/yearly",
					buttonText: "Begin Now",
					highlighted: true,
					features: [
						{ text: "Everything in Seeker Path" },
						{ text: "1-on-1 mentorship sessions" },
						{ text: "Advanced breathwork practices" },
						{ text: "Personalized transformation plan" },
						{ text: "Priority support" },
						{ text: "Exclusive retreats access" },
					],
				},
			],
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					localized: true,
				},
				{
					name: "badgeIcon",
					type: "upload",
					relationTo: "media",
					required: false,
				},
				{
					name: "badgeText",
					type: "text",
					required: false,
					localized: true,
				},
				{
					name: "monthlyPrice",
					type: "text",
					required: true,
					localized: true,
				},
				{
					name: "yearlyPrice",
					type: "text",
					required: false,
					localized: true,
				},
				{
					name: "period",
					type: "text",
					required: false,
					localized: true,
					defaultValue: "/monthly",
				},
				{
					name: "yearlyPeriod",
					type: "text",
					required: false,
					localized: true,
					defaultValue: "/yearly",
				},
				{
					name: "buttonText",
					type: "text",
					required: true,
					localized: true,
					defaultValue: "Begin Now",
				},
				{
					name: "buttonLink",
					type: "text",
					required: false,
				},
				{
					name: "highlighted",
					type: "checkbox",
					defaultValue: false,
					admin: {
						description:
							"Highlight this plan with gradient background",
					},
				},
				{
					name: "features",
					type: "array",
					minRows: 1,
					maxRows: 10,
					fields: [
						{
							name: "text",
							type: "text",
							required: true,
							localized: true,
						},
					],
				},
			],
		},
	],
};
