import type { Block } from "payload";
import { smartLinkFields } from "../fields/smart-link";

export const ProcessBlock: Block = {
    slug: "process",
    interfaceName: "ProcessBlock",
    labels: {
        singular: "Процес (кроки)",
        plural: "Процеси (кроки)",
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
                    defaultValue: "What you will find here",
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
                "Discover practical tools for consciousness and self-discovery that bring real transformation to your life",
        },
        {
            name: "tabs",
            type: "array",
            label: "Вкладки",
            minRows: 1,
            maxRows: 4,
            admin: {
                description:
                    "Кроки процесу які відвідувач може перемикати",
            },
            defaultValue: [
                {
                    title: "Awareness",
                    badge: "Step 1",
                    heading: "Awaken to your inner truth",
                    description:
                        "Begin by cultivating present-moment awareness. Learn to observe your thoughts and emotions without judgment, creating space for authentic self-discovery.",
                    buttonText: "Learn More",
                },
                {
                    title: "Connection",
                    badge: "Step 2",
                    heading: "Connect with your deeper self",
                    description:
                        "Develop a profound relationship with your inner world through guided meditation, breathwork, and consciousness practices tailored to your journey.",
                    buttonText: "Learn More",
                },
                {
                    title: "Transformation",
                    badge: "Step 3",
                    heading: "Transform from within",
                    description:
                        "Experience lasting change as you integrate spiritual insights into daily life. Watch as your outer reality begins to reflect your inner awakening.",
                    buttonText: "Learn More",
                },
            ],
            fields: [
                {
                    name: "icon",
                    type: "upload",
                    label: "Іконка вкладки",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Невелика іконка (рекомендовано 16×16)",
                    },
                },
                {
                    name: "iconActive",
                    type: "upload",
                    label: "Іконка активної вкладки",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description:
                            "Іконка для активного стану (рекомендовано 16×16)",
                    },
                },
                {
                    name: "title",
                    type: "text",
                    label: "Назва вкладки",
                    required: true,
                    localized: true,
                },
                {
                    name: "badge",
                    type: "text",
                    label: "Бейдж вкладки",
                    required: true,
                    localized: true,
                    admin: {
                        description: "Наприклад: Крок 1, Крок 2",
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
                    name: "buttonText",
                    type: "text",
                    label: "Текст кнопки",
                    required: true,
                    localized: true,
                    defaultValue: "Learn More",
                },
                ...smartLinkFields(),
                {
                    name: "image",
                    type: "upload",
                    label: "Зображення",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Ілюстрація для цієї вкладки",
                    },
                },
            ],
        },
    ],
};
