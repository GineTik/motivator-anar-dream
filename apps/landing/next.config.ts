import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

const nextConfig: NextConfig = {
    turbopack: {
        root: path.join(__dirname, "../.."),
    },
};

export default withPayload(nextConfig);
