import type { Block } from "payload";

export const PricingBlock: Block = {
    slug: "pricing",
    interfaceName: "PricingBlock",
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
                    defaultValue: "Investment in yourself",
                },
            ],
        },
        {
            name: "heading",
            type: "text",
            required: true,
            localized: true,
            defaultValue: "Your path to transformation",
        },
        {
            name: "subtitle",
            type: "textarea",
            required: true,
            localized: true,
            defaultValue:
                "Choose an approach that resonates with your inner readiness. No obligations, just space for your personal journey.",
        },
        {
            name: "plan",
            type: "group",
            fields: [
                {
                    name: "icon",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Plan icon image",
                    },
                },
                {
                    name: "name",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "Personal Mentorship",
                },
                {
                    name: "description",
                    type: "textarea",
                    required: true,
                    localized: true,
                    defaultValue:
                        "Individual guidance on your path of conscious development, personal practices, and support on the journey to inner awakening",
                },
                {
                    name: "price",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "$380",
                },
                {
                    name: "period",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "/month",
                },
                {
                    name: "features",
                    type: "array",
                    minRows: 1,
                    fields: [
                        {
                            name: "text",
                            type: "text",
                            required: true,
                            localized: true,
                        },
                    ],
                    defaultValue: [
                        { text: "Personal practices for transformation" },
                        { text: "Individual mentorship sessions" },
                        { text: "Guided meditations and techniques" },
                        { text: "Support in moments of inner shifts" },
                        { text: "Access to consciousness community" },
                    ],
                },
                {
                    name: "buttonText",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "Begin your journey",
                },
                {
                    name: "buttonLink",
                    type: "text",
                    required: false,
                    defaultValue: "#",
                },
            ],
        },
        {
            name: "testimonials",
            type: "array",
            minRows: 1,
            admin: {
                description:
                    "Testimonials will auto-scroll in columns (minimum 4 recommended for smooth animation)",
            },
            fields: [
                {
                    name: "quote",
                    type: "textarea",
                    required: true,
                    localized: true,
                },
                {
                    name: "authorName",
                    type: "text",
                    required: true,
                    localized: true,
                },
                {
                    name: "authorRole",
                    type: "text",
                    required: true,
                    localized: true,
                },
                {
                    name: "authorImage",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                },
            ],
            defaultValue: [
                {
                    quote: "This practice helped me find inner peace I had been seeking for years. Everything changed when I stopped looking outside.",
                    authorName: "Elena Petrova",
                    authorRole: "Spiritual seeker",
                },
                {
                    quote: "I was skeptical at first, but working with consciousness became the foundation of how I now live.",
                    authorName: "Sophia M.",
                    authorRole: "Transformation participant",
                },
                {
                    quote: "The practices gave me clarity and understanding of my true path. This is what I had been missing.",
                    authorName: "Anna K.",
                    authorRole: "Journey participant",
                },
                {
                    quote: "Support on the path of inner transformation is invaluable. I discovered so much about myself.",
                    authorName: "Maria S.",
                    authorRole: "Mentorship participant",
                },
            ],
        },
    ],
};
