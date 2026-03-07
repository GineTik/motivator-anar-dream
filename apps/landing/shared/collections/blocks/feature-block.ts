import type { Block } from "payload";

export const FeatureBlock: Block = {
    slug: "feature",
    interfaceName: "FeatureBlock",
    labels: {
        singular: "Можливості",
        plural: "Можливості",
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
                    defaultValue: "Inner Tools",
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
            defaultValue: "Tools for Conscious Transformation",
        },
        {
            name: "subtitle",
            type: "textarea",
            label: "Підзаголовок",
            required: true,
            localized: true,
            defaultValue:
                "Connect all aspects of your spiritual practice into one harmonious journey. Discover tools that help you integrate consciousness work into everyday life.",
        },
        {
            name: "features",
            type: "array",
            label: "Можливості",
            minRows: 3,
            maxRows: 5,
            defaultValue: [
                {
                    heading: "Guided Meditations",
                    description:
                        "Immerse in carefully crafted meditative practices that guide you toward inner stillness and conscious awareness.",
                    layoutType: "large",
                },
                {
                    heading: "Personal Practices",
                    description:
                        "Receive individualized spiritual tools and exercises designed to deepen your connection with your true self.",
                    layoutType: "large",
                },
                {
                    heading: "Inner Clarity",
                    description:
                        "Develop clear vision and understanding of your life path through consciousness work.",
                    layoutType: "small",
                },
                {
                    heading: "Transformative Insights",
                    description:
                        "Gain profound understanding of yourself and reality through guided inner exploration.",
                    layoutType: "small",
                },
                {
                    heading: "Conscious Living",
                    description:
                        "Learn to integrate spiritual wisdom into every aspect of your daily life.",
                    layoutType: "small",
                },
            ],
            fields: [
                {
                    name: "icon",
                    type: "upload",
                    label: "Іконка",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Іконка для цієї можливості",
                    },
                },
                {
                    name: "heading",
                    type: "text",
                    label: "Заголовок",
                    required: true,
                    localized: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    label: "Опис",
                    required: true,
                    localized: true,
                },
                {
                    name: "image",
                    type: "upload",
                    label: "Зображення",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Ілюстрація для цієї можливості",
                    },
                },
                {
                    name: "layoutType",
                    type: "select",
                    label: "Розмір картки",
                    required: true,
                    defaultValue: "large",
                    options: [
                        {
                            label: "Велика (половина ширини)",
                            value: "large",
                        },
                        {
                            label: "Мала (третина ширини)",
                            value: "small",
                        },
                    ],
                    admin: {
                        description:
                            "Великі картки займають половину ширини, малі — третину",
                    },
                },
            ],
        },
    ],
};
