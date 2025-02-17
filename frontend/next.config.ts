import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    webpack: (config) => {
        config.externals.push(
            "pino-pretty" /* add any other modules that might be causing the error */
        );
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com",
                port: "",
                pathname: "/*",
                search: "",
            },
        ],
    },
};

export default nextConfig;
