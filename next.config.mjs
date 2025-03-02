// import type { NextConfig } from 'next'

const nextConfig = {
  webpack: (config) => {
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".tsx"];
    return config;
  },
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_STRAPI_URL
          ? new URL(process.env.NEXT_PUBLIC_STRAPI_URL).hostname
          : "localhost",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
