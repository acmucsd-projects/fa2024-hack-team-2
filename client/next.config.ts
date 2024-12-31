import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // TODO: Change below (will be unneeded)
        hostname: '*'
        // hostname: 'upload.wikimedia.org',
        // pathname: '/**/*.{png,svg}'
      },
    ]
  }
};

export default nextConfig;
