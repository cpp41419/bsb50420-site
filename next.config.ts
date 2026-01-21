import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cpp/config"],
  async headers() {
    // Safety rail: Force noindex on all non-production deployments
    if (process.env.VERCEL_ENV !== "production") {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "X-Robots-Tag",
              value: "noindex, nofollow, noarchive",
            },
          ],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
