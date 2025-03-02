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
        hostname: "res.cloudinary.com",
        pathname: `/${process.env.CLOUDINARY_NAME}/**`,
      },
    ],
  },
};

export default nextConfig;
