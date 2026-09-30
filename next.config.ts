import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a separate build/test run use its own folder without touching a running dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  // Biography, Political Journey and Milestones now live on one About & Journey page.
  async redirects() {
    return [
      { source: "/:lang(en|hi)/about/biography", destination: "/:lang/about", permanent: true },
      { source: "/:lang(en|hi)/journey", destination: "/:lang/about#journey", permanent: true },
      { source: "/:lang(en|hi)/journey/political-journey", destination: "/:lang/about#journey", permanent: true },
      { source: "/:lang(en|hi)/journey/milestones", destination: "/:lang/about#milestones", permanent: true },
    ];
  },
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
