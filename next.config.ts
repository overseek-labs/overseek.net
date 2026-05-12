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
};

export default nextConfig;
