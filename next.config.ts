import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "top-right",
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Corrected: Removed protocol
        pathname: "/**", // Match all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Corrected: Removed protocol
        pathname: "/**", // Match all paths under this hostname
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Suppresses ESLint errors during the build
  },
};

export default nextConfig;
