import type { Block } from "payload";

export const HeaderBlock: Block = {
    slug: "header",
    interfaceName: "HeaderBlock",
    fields: [
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
            required: false,
            admin: {
                description: "Site logo for the navbar",
            },
        },
        {
            name: "navLinks",
            type: "array",
            minRows: 1,
            maxRows: 8,
            defaultValue: [
                { label: "About", href: "/about" },
                { label: "Practices", href: "/practices" },
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
            ],
            fields: [
                {
                    name: "label",
                    type: "text",
                    required: true,
                    localized: true,
                },
                {
                    name: "href",
                    type: "text",
                    required: true,
                },
                {
                    name: "children",
                    type: "array",
                    required: false,
                    fields: [
                        {
                            name: "label",
                            type: "text",
                            required: true,
                            localized: true,
                        },
                        {
                            name: "href",
                            type: "text",
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            name: "ctaText",
            type: "text",
            required: true,
            localized: true,
            defaultValue: "Begin Your Journey",
        },
        {
            name: "ctaLink",
            type: "text",
            required: false,
            defaultValue: "#",
        },
        {
            name: "ctaArrowIcon",
            type: "upload",
            relationTo: "media",
            required: false,
            admin: {
                description: "Arrow icon for the CTA button",
            },
        },
    ],
};
