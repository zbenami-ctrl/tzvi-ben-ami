import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages read content/*.md at request time, so ship those files with the server bundle.
  outputFileTracingIncludes: {
    "/[[...slug]]": ["./content/**/*.md"],
  },
  // Old Wix-only addresses all converge on the new homepage.
  // Current pages keep their own URLs and continue to work normally.
  async redirects() {
    const site = "https://www.zbenami.com";
    const legacyHosts = (["en", "de"] as const).map((language) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: `${language}.zbenami.com` }],
      destination: site,
      permanent: true,
    }));
    const oldPages = [
      "/home",
      "/about111",
      "/new111",
      "/blog-feed.xml",
      "/thanks",
      "/thanks-en",
      "/phone-call",
      "/privacy-policy",
    ].flatMap((source) => [
      { source, destination: "/", permanent: true },
      { source: `/:language(en|de)${source}`, destination: "/", permanent: true },
    ]);
    return [...legacyHosts, ...oldPages];
  },
  images: {
    // WebP only: AVIF is noticeably slower to generate on the first request for each size.
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
