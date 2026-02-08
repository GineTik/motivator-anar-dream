import type { Block } from "payload";

export const FeatureBlock: Block = {
    slug: "feature",
    interfaceName: "FeatureBlock",
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
                    defaultValue: "Inner Tools",
                },
            ],
        },
        {
            name: "heading",
            type: "text",
            required: true,
            localized: true,
            defaultValue: "Tools for Conscious Transformation",
        },
        {
            name: "subtitle",
            type: "textarea",
            required: true,
            localized: true,
            defaultValue:
                "Connect all aspects of your spiritual practice into one harmonious journey. Discover tools that help you integrate consciousness work into everyday life.",
        },
        {
            name: "features",
            type: "array",
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
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Feature icon",
                    },
                },
                {
                    name: "heading",
                    type: "text",
                    required: true,
                    localized: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    required: true,
                    localized: true,
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Visual illustration for this feature",
                    },
                },
                {
                    name: "layoutType",
                    type: "select",
                    required: true,
                    defaultValue: "large",
                    options: [
                        {
                            label: "Large (spans 6 columns)",
                            value: "large",
                        },
                        {
                            label: "Small (spans 4 columns)",
                            value: "small",
                        },
                    ],
                    admin: {
                        description:
                            "Large cards span 6 columns (half width), small cards span 4 columns (third width) on desktop",
                    },
                },
            ],
        },
    ],
};
