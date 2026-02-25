import type { CollectionConfig } from "payload";

const cyrillicToLatin: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    є: "ye",
    і: "i",
    ї: "yi",
    ґ: "g",
};

function transliterate(text: string): string {
    return text
        .split("")
        .map((char) => {
            const lower = char.toLowerCase();
            const latin = cyrillicToLatin[lower];
            if (latin !== undefined) {
                return char === lower
                    ? latin
                    : latin.charAt(0).toUpperCase() + latin.slice(1);
            }
            return char;
        })
        .join("");
}

function sanitizeFilename(filename: string): string {
    const dotIndex = filename.lastIndexOf(".");
    const name = dotIndex !== -1 ? filename.slice(0, dotIndex) : filename;
    const ext = dotIndex !== -1 ? filename.slice(dotIndex) : "";

    const sanitized = transliterate(name)
        .replace(/[^a-zA-Z0-9._-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return (sanitized || "file") + ext;
}

export const Media: CollectionConfig = {
    slug: "media",
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
            required: true,
            localized: true,
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
