import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages read content/*.md at request time, so ship those files with the server bundle.
  outputFileTracingIncludes: {
    "/[[...slug]]": ["./content/**/*.md"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
