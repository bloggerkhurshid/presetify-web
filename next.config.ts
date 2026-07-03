import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.devkayy.in',
      },
    ],
  },
};

export default nextConfig;
