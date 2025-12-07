import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Your Cloudinary folder
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dmhocuxlk/**",
      },

      // Apple Music / iTunes images
      {
        protocol: "https",
        hostname: "*.mzstatic.com",
      },

      // (Optional but recommended)
      // Some images also come from apple.com domains
      {
        protocol: "https",
        hostname: "*.apple.com",
      },
    ],
  },
};

export default nextConfig;
