import type { CollectionConfig } from "payload";
import { HeroBlock } from "./blocks/hero-block";

export const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "updatedAt"],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            localized: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            admin: {
                position: "sidebar",
            },
            hooks: {
                beforeValidate: [
                    ({ value }) => {
                        if (typeof value === "string") {
                            return value
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^a-z0-9-]/g, "");
                        }
                        return value;
                    },
                ],
            },
        },
        {
            name: "blocks",
            type: "blocks",
            blocks: [HeroBlock],
            required: true,
            minRows: 1,
        },
        {
            name: "seo",
            type: "group",
            fields: [
                {
                    name: "title",
                    type: "text",
                    localized: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    localized: true,
                },
                {
                    name: "keywords",
                    type: "text",
                    localized: true,
                },
                {
                    name: "ogImage",
                    type: "upload",
                    relationTo: "media",
                },
            ],
        },
        {
            name: "publishedAt",
            type: "date",
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: "dayAndTime",
                },
            },
        },
    ],
    versions: {
        drafts: true,
    },
};
