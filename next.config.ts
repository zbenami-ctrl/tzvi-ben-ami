import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages read content/*.md at request time, so ship those files with the server bundle.
  outputFileTracingIncludes: {
    "/[[...slug]]": ["./content/**/*.md"],
  },
  // Keep every address of the old Wix site working after zbenami.com moves here.
  async redirects() {
    const site = "https://www.zbenami.com";
    const languageHosts = (["en", "de"] as const).flatMap((language) => [
      { source: "/", has: [{ type: "host" as const, value: `${language}.zbenami.com` }], destination: `${site}/${language}`, permanent: true },
      { source: "/:path+", has: [{ type: "host" as const, value: `${language}.zbenami.com` }], destination: `${site}/${language}/:path+`, permanent: true },
      { source: "/", has: [{ type: "query" as const, key: "lang", value: language }], destination: `/${language}`, permanent: true },
      // Skip paths already under /en or /de, so the carried-over ?lang= query can't loop.
      { source: "/:path((?!(?:en|de)(?:/|$)).+)", has: [{ type: "query" as const, key: "lang", value: language }], destination: `/${language}/:path`, permanent: true },
    ]);
    const oldPages = [
      ["/home", "/"],
      ["/about111", "/about"],
      ["/new111", "/metting-with-tzvi"],
      ["/blog-feed.xml", "/blog"],
      ["/thanks", "/"],
      ["/thanks-en", "/en"],
      ["/phone-call", "/"],
      ["/privacy-policy", "/"],
    ].flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `/:language(en|de)${from}`, destination: to === "/" || to === "/en" ? "/:language" : `/:language${to}`, permanent: true },
    ]);
    return [...languageHosts, ...oldPages];
  },
  images: {
    // WebP only: AVIF is noticeably slower to generate on the first request for each size.
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
