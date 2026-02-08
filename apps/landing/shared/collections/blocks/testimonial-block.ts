import type { Block } from "payload";

export const TestimonialBlock: Block = {
    slug: "testimonial",
    interfaceName: "TestimonialBlock",
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
                    defaultValue: "Stories of Transformation",
                },
            ],
        },
        {
            name: "heading",
            type: "text",
            required: true,
            localized: true,
            defaultValue: "Journeys that inspire awakening",
        },
        {
            name: "subtitle",
            type: "textarea",
            required: true,
            localized: true,
            defaultValue:
                "Begin your path in moments, not hours. Our intuitive approach requires no prior experience—just an open heart and willingness to explore.",
        },
        {
            name: "testimonials",
            type: "array",
            minRows: 3,
            maxRows: 7,
            defaultValue: [
                {
                    quote: "This path of inner awakening changed everything for me. I found peace I had been searching for my entire life.",
                    authorName: "Elena Petrova",
                    authorRole: "Spiritual seeker",
                    cardStyle: "normal",
                    gridSpan: "double",
                },
                {
                    quote: "The practices opened a door to a completely new understanding of myself.",
                    authorName: "Anna Koval",
                    authorRole: "Journey participant",
                    cardStyle: "normal",
                    gridSpan: "single",
                },
                {
                    quote: "Working with consciousness became the foundation of how I now live and create my reality.",
                    authorName: "Sophia M.",
                    authorRole: "Transformation participant",
                    cardStyle: "normal",
                    gridSpan: "single",
                },
                {
                    quote: "I discovered inner clarity and strength I never knew existed within me. This journey is truly life-changing.",
                    authorName: "Maria S.",
                    authorRole: "Mentorship participant",
                    cardStyle: "highlighted",
                    gridSpan: "double",
                },
                {
                    quote: "Support on the path of transformation is invaluable. Every session brought new insights.",
                    authorName: "Irina L.",
                    authorRole: "Consciousness explorer",
                    cardStyle: "normal",
                    gridSpan: "single",
                },
            ],
            fields: [
                {
                    name: "logo",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Optional logo for this testimonial",
                    },
                },
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
                    admin: {
                        description: "Author avatar image (48x48 recommended)",
                    },
                },
                {
                    name: "cardStyle",
                    type: "select",
                    required: true,
                    defaultValue: "normal",
                    options: [
                        {
                            label: "Normal (white background)",
                            value: "normal",
                        },
                        {
                            label: "Highlighted (purple background)",
                            value: "highlighted",
                        },
                    ],
                    admin: {
                        description:
                            "Card style - highlighted cards use purple background with white text",
                    },
                },
                {
                    name: "gridSpan",
                    type: "select",
                    required: true,
                    defaultValue: "single",
                    options: [
                        {
                            label: "Single (1 column)",
                            value: "single",
                        },
                        {
                            label: "Double (2 rows tall)",
                            value: "double",
                        },
                    ],
                    admin: {
                        description:
                            "Grid span - double height cards span 2 rows (desktop only)",
                    },
                },
            ],
        },
    ],
};
