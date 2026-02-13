import type { Block } from "payload";

export const PartnershipBlock: Block = {
    slug: "partnership",
    interfaceName: "PartnershipBlock",
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
                    defaultValue: "Quietly. Consciously. Authentically",
                },
            ],
        },
        {
            name: "heading",
            type: "text",
            required: true,
            localized: true,
            defaultValue: "What if you don't have to sell?",
        },
        {
            name: "subtitle",
            type: "textarea",
            required: false,
            localized: true,
            defaultValue:
                "Share what resonates with you and let others decide for themselves.",
        },
        {
            name: "checklistItems",
            type: "array",
            required: true,
            minRows: 1,
            fields: [
                {
                    name: "text",
                    type: "text",
                    required: true,
                    localized: true,
                },
                {
                    name: "highlighted",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description:
                            "Highlight this item with brand accent color",
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
            required: true,
            localized: true,
            defaultValue: "Become a Partner",
        },
        {
            name: "buttonLink",
            type: "text",
            required: false,
            defaultValue: "#",
        },
    ],
};
