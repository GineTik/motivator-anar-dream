import type { Block } from "payload";
import { smartLinkFields } from "../fields/smart-link";

export const HeroBlock: Block = {
    slug: "hero",
    interfaceName: "HeroBlock",
    labels: {
        singular: "Головний банер",
        plural: "Головні банери",
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
                    defaultValue: "Space for inner awakening",
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
            defaultValue: "Create your path",
            admin: {
                description: "Головний заголовок секції",
            },
        },
        {
            name: "subtitle",
            type: "textarea",
            label: "Підзаголовок",
            required: true,
            localized: true,
            defaultValue:
                "Connect with yourself, unlock your potential, and create your reality through love, clarity, and strength",
            admin: {
                description: "Короткий опис під заголовком",
            },
        },
        {
            name: "ctaButton",
            type: "group",
            label: "Кнопка дії",
            fields: [
                {
                    name: "text",
                    type: "text",
                    label: "Текст кнопки",
                    required: true,
                    localized: true,
                    defaultValue: "Start Your Journey",
                },
                ...smartLinkFields(),
                {
                    name: "openInNewTab",
                    type: "checkbox",
                    label: "Відкрити в новій вкладці",
                    defaultValue: false,
                    admin: {
                        description:
                            "Якщо увімкнено — посилання відкриється в новій вкладці браузера",
                    },
                },
            ],
        },
        {
            name: "personImage",
            type: "upload",
            label: "Зображення людини",
            relationTo: "media",
            required: false,
            admin: {
                description:
                    "Фото людини з прозорим фоном, обрізане вище пояса",
            },
        },
    ],
};
