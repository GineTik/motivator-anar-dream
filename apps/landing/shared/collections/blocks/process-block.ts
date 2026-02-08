import type { Block } from "payload";

export const ProcessBlock: Block = {
    slug: "process",
    interfaceName: "ProcessBlock",
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
                    defaultValue: "What you will find here",
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
                "Discover practical tools for consciousness and self-discovery that bring real transformation to your life",
        },
        {
            name: "tabs",
            type: "array",
            minRows: 1,
            maxRows: 4,
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
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Icon for the tab (16x16 recommended)",
                    },
                },
                {
                    name: "iconActive",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description:
                            "Icon for active state (16x16 recommended)",
                    },
                },
                {
                    name: "title",
                    type: "text",
                    required: true,
                    localized: true,
                },
                {
                    name: "badge",
                    type: "text",
                    required: true,
                    localized: true,
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
                    name: "buttonText",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "Learn More",
                },
                {
                    name: "buttonLink",
                    type: "text",
                    required: false,
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                    admin: {
                        description: "Visual representation for this tab",
                    },
                },
            ],
        },
    ],
};
