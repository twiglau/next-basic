import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      // 打印完整的url
      fullUrl: true,
    },
  },
};

export default nextConfig;
