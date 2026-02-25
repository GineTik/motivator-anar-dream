import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
    },
    upload: {
        staticDir: "media",
        mimeTypes: ["image/*"],
        adminThumbnail: "thumbnail",
        focalPoint: true,
        formatOptions: {
            format: "webp",
            options: {
                quality: 80,
            },
        },
        resizeOptions: {
            width: 2560,
            height: 2560,
            fit: "inside",
            withoutEnlargement: true,
        },
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
            },
            {
                name: "card",
                width: 768,
                height: 1024,
                position: "centre",
            },
            {
                name: "tablet",
                width: 1024,
                height: undefined,
                position: "centre",
            },
            {
                name: "desktop",
                width: 1920,
                height: undefined,
                position: "centre",
            },
        ],
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
            localized: true,
        },
        {
            name: "filesize",
            type: "number",
            admin: { hidden: true },
            validate: (value: number | null | undefined) => {
                console.log("Vl:", value);
                const maxSize = 20 * 1024 * 1024;
                if (value && value > maxSize) {
                    return "File size exceeds the 20MB limit";
                }
                return true;
            },
        },
    ],
};
