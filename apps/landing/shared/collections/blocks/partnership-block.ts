import type { Block } from "payload";

export const PartnershipBlock: Block = {
    slug: "partnership",
    interfaceName: "PartnershipBlock",
    labels: {
        singular: "Партнерство",
        plural: "Партнерства",
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
                    defaultValue: "Quietly. Consciously. Authentically",
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
            defaultValue: "What if you don't have to sell?",
        },
        {
            name: "subtitle",
            type: "textarea",
            label: "Підзаголовок",
            required: false,
            localized: true,
            defaultValue:
                "Share what resonates with you and let others decide for themselves.",
        },
        {
            name: "checklistItems",
            type: "array",
            label: "Пункти списку",
            required: true,
            minRows: 1,
            fields: [
                {
                    name: "text",
                    type: "text",
                    label: "Текст пункту",
                    required: true,
                    localized: true,
                },
                {
                    name: "highlighted",
                    type: "checkbox",
                    label: "Виділити",
                    defaultValue: false,
                    admin: {
                        description:
                            "Виділити цей пункт акцентним кольором",
                    },
                },
            ],
            defaultValue: [
                { text: "You don't sell", highlighted: false },
                {
                    text: "You share Anara Dreams videos",
                    highlighted: true,
                },
                {
                    text: "You speak only from personal resonance",
                    highlighted: false,
                },
                {
                    text: "The decision stays with the person",
                    highlighted: false,
                },
                {
                    text: "You don't need to be someone else",
                    highlighted: false,
                },
            ],
        },
        {
            name: "buttonText",
            type: "text",
            label: "Текст кнопки",
            required: true,
            localized: true,
            defaultValue: "Become a Partner",
        },
        {
            name: "buttonLink",
            type: "text",
            label: "Посилання кнопки",
            required: false,
            defaultValue: "#",
        },
    ],
};
