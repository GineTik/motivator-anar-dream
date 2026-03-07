import type { Block } from "payload";

export const TestimonialBlock: Block = {
    slug: "testimonial",
    interfaceName: "TestimonialBlock",
    labels: {
        singular: "Відгуки",
        plural: "Відгуки",
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
                    defaultValue: "Stories of Transformation",
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
            defaultValue: "Journeys that inspire awakening",
        },
        {
            name: "subtitle",
            type: "textarea",
            label: "Підзаголовок",
            required: true,
            localized: true,
            defaultValue:
                "Begin your path in moments, not hours. Our intuitive approach requires no prior experience—just an open heart and willingness to explore.",
        },
        {
            name: "testimonials",
            type: "array",
            label: "Відгуки",
            minRows: 3,
            maxRows: 7,
            admin: {
                initCollapsed: true,
            },
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
                    label: "Логотип",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description:
                            "Логотип для цього відгуку (необовʼязково)",
                    },
                },
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
                    label: "Роль/посада автора",
                    required: true,
                    localized: true,
                },
                {
                    name: "authorImage",
                    type: "upload",
                    label: "Фото автора",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description:
                            "Аватар автора (рекомендовано 48×48)",
                    },
                },
                {
                    name: "cardStyle",
                    type: "select",
                    label: "Стиль картки",
                    required: true,
                    defaultValue: "normal",
                    options: [
                        {
                            label: "Звичайний (білий фон)",
                            value: "normal",
                        },
                        {
                            label: "Виділений (фіолетовий фон)",
                            value: "highlighted",
                        },
                    ],
                    admin: {
                        description:
                            "Виділені картки мають фіолетовий фон та білий текст",
                    },
                },
                {
                    name: "gridSpan",
                    type: "select",
                    label: "Розмір у сітці",
                    required: true,
                    defaultValue: "single",
                    options: [
                        {
                            label: "Звичайний (1 колонка)",
                            value: "single",
                        },
                        {
                            label: "Подвійний (2 рядки)",
                            value: "double",
                        },
                    ],
                    admin: {
                        description:
                            "Подвійні картки займають 2 рядки (тільки на десктопі)",
                    },
                },
            ],
        },
    ],
};
