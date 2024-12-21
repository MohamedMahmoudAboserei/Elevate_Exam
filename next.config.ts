import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exam.elevateegy.com',
        pathname: '/uploads/categories/**',
      },
    ],
  },
};

export default nextConfig;
