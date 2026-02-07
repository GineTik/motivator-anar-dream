import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Hero Block definition
const HeroBlock = {
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
            name: "dashboardImage",
            type: "upload",
            relationTo: "media",
            required: false,
        },
    ],
};

// Media Collection
const Media = {
    slug: "media",
    access: {
        read: () => true,
    },
    upload: {
        staticDir: "media",
        mimeTypes: ["image/*"],
        adminThumbnail: "thumbnail",
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
    ],
};

// Pages Collection
const Pages = {
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

export default buildConfig({
    admin: {
        user: "users",
    },
    collections: [
        {
            slug: "users",
            auth: true,
            access: {
                delete: () => false,
                update: () => false,
            },
            fields: [],
        },
        Media,
        Pages,
    ],
    editor: lexicalEditor({}),
    secret:
        process.env.PAYLOAD_SECRET || "your-secret-key-change-in-production",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || "",
        },
        push: false,
    }),
    plugins: [
        s3Storage({
            collections: {
                media: true,
            },
            bucket: process.env.S3_BUCKET || "",
            config: {
                endpoint: process.env.S3_ENDPOINT || "",
                region: process.env.S3_REGION || "us-east-1",
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
                },
            },
        }),
    ],
    localization: {
        locales: ["en", "uk", "ru"],
        defaultLocale: "en",
        fallback: true,
    },
});
