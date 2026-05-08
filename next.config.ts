import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
      },
      {
        pathname: "/images/**",
      },
    ],
  },
  reactCompiler: true,
  async headers() {
    return [
      {
        // Static build assets, fonts, and similar resources should never appear
        // in Google's index. They get crawled for rendering but we don't want
        // them listed under "Crawled – currently not indexed".
        source: "/_next/static/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      {
        source: "/apple-icon",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },
};

export default nextConfig;
