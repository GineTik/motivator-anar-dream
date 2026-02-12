import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

const nextConfig: NextConfig = {
    outputFileTracingRoot: path.resolve(__dirname, "../.."),
};

export default withPayload(nextConfig);
