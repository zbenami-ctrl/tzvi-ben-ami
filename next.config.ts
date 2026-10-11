import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages read content/*.md at request time, so ship those files with the server bundle.
  outputFileTracingIncludes: {
    "/[[...slug]]": ["./content/**/*.md"],
  },
  images: {
    // WebP only: AVIF is noticeably slower to generate on the first request for each size.
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
