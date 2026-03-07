import type { CollectionConfig } from "payload";
import { sanitizeFilename } from "../lib/sanitize-filename";

export const Media: CollectionConfig = {
    slug: "media",
    labels: {
        singular: "Медіа",
        plural: "Медіа",
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeOperation: [
            ({ operation, req }) => {
                if (operation === "create" || operation === "update") {
                    if (req.file) {
                        req.file.name = sanitizeFilename(req.file.name);
                    }
                }
            },
        ],
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
            label: "Альтернативний текст",
            required: true,
            localized: true,
            admin: {
                description:
                    "Короткий опис зображення для людей з вадами зору та пошукових систем",
            },
        },
        {
            name: "filesize",
            type: "number",
            admin: { hidden: true },
            validate: (value: number | null | undefined) => {
                const maxSize = 20 * 1024 * 1024;
                if (value && value > maxSize) {
                    return "File size exceeds the 20MB limit";
                }
                return true;
            },
        },
    ],
};
