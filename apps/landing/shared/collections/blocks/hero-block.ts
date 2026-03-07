import type { Block } from "payload";
import { smartLinkFields } from "../fields/smart-link";

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
                    defaultValue: "Space for inner awakening",
                },
            ],
        },
        {
            name: "heading",
            type: "text",
            required: true,
            localized: true,
            defaultValue: "Create your path",
        },
        {
            name: "subtitle",
            type: "textarea",
            required: true,
            localized: true,
            defaultValue:
                "Connect with yourself, unlock your potential, and create your reality through love, clarity, and strength",
        },
        {
            name: "ctaButton",
            type: "group",
            fields: [
                {
                    name: "text",
                    type: "text",
                    required: true,
                    localized: true,
                    defaultValue: "Start Your Journey",
                },
                ...smartLinkFields(),
                {
                    name: "openInNewTab",
                    type: "checkbox",
                    defaultValue: false,
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
