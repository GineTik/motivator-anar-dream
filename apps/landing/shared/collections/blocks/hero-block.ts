import type { Block } from "payload";

export const HeroBlock: Block = {
    slug: "hero",
    interfaceName: "HeroBlock",
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
                    defaultValue: "Trusted by spiritual seekers worldwide",
                },
            ],
        },
        {
            name: "heading",
            type: "text",
            required: true,
            localized: true,
            defaultValue: "Transform your workflow with spiritual awakening",
        },
        {
            name: "subtitle",
            type: "textarea",
            required: true,
            localized: true,
            defaultValue:
                "Track the growth and engagement of your consciousness through detailed practices. Understand what works and supercharge your inner journey.",
        },
        {
            name: "ctaForm",
            type: "group",
            fields: [
                {
                    name: "inputPlaceholder",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "Enter Email",
                },
                {
                    name: "buttonText",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "Join Waitlist",
                },
            ],
        },
        {
            name: "personImage",
            type: "upload",
            relationTo: "media",
            required: false,
            admin: {
                description:
                    "Image of a person with transparent background, cropped above waist",
            },
        },
    ],
};
