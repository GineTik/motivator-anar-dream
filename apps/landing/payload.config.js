import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { fileURLToPath } from "url";
import { Media, Pages } from "./shared/collections/index.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
