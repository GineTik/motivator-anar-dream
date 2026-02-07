import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

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
        push: false, // Disable auto-push, use migrations instead
    }),
});
