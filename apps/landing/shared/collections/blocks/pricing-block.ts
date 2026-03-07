import type { Block } from "payload";

export const PricingBlock: Block = {
    slug: "pricing",
    interfaceName: "PricingBlock",
    labels: {
        singular: "Ціни",
        plural: "Ціни",
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
                    defaultValue: "Investment in yourself",
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
            defaultValue: "Your path to transformation",
        },
        {
            name: "subtitle",
            type: "textarea",
            label: "Підзаголовок",
            required: true,
            localized: true,
            defaultValue:
                "Choose an approach that resonates with your inner readiness. No obligations, just space for your personal journey.",
        },
        {
            name: "plan",
            type: "group",
            label: "Тарифний план",
            fields: [
                {
                    name: "icon",
                    type: "upload",
                    label: "Іконка плану",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Іконка для тарифного плану",
                    },
                },
                {
                    name: "name",
                    type: "text",
                    label: "Назва плану",
                    required: true,
                    localized: true,
                    defaultValue: "Personal Mentorship",
                },
                {
                    name: "description",
                    type: "textarea",
                    label: "Опис плану",
                    required: true,
                    localized: true,
                    defaultValue:
                        "Individual guidance on your path of conscious development, personal practices, and support on the journey to inner awakening",
                },
                {
                    name: "price",
                    type: "text",
                    label: "Ціна",
                    required: true,
                    localized: true,
                    defaultValue: "$380",
                },
                {
                    name: "period",
                    type: "text",
                    label: "Період",
                    required: true,
                    localized: true,
                    defaultValue: "/month",
                },
                {
                    name: "features",
                    type: "array",
                    label: "Переваги",
                    minRows: 1,
                    admin: {
                        initCollapsed: true,
                    },
                    fields: [
                        {
                            name: "text",
                            type: "text",
                            label: "Текст переваги",
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
                    label: "Текст кнопки",
                    required: true,
                    localized: true,
                    defaultValue: "Begin your journey",
                },
                {
                    name: "buttonLink",
                    type: "text",
                    label: "Посилання кнопки",
                    required: false,
                    defaultValue: "#",
                },
            ],
        },
        {
            name: "testimonials",
            type: "array",
            label: "Відгуки",
            minRows: 1,
            admin: {
                initCollapsed: true,
                description:
                    "Відгуки прокручуються автоматично (рекомендується мінімум 4 для плавної анімації)",
            },
            fields: [
                {
                    name: "quote",
                    type: "textarea",
                    label: "Цитата",
                    required: true,
                    localized: true,
                },
                {
                    name: "authorName",
                    type: "text",
                    label: "Імʼя автора",
                    required: true,
                    localized: true,
                },
                {
                    name: "authorRole",
                    type: "text",
                    label: "Роль автора",
                    required: true,
                    localized: true,
                },
                {
                    name: "authorImage",
                    type: "upload",
                    label: "Фото автора",
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
