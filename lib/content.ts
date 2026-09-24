import content from "@/data/content.json";

export type SiteEntry = {
  language: "he" | "en" | "de";
  kind: "page" | "post";
  url: string;
  title: string;
  description: string;
  text: string;
  images: Array<{ url: string; alt: string }>;
};

export const entries = content as SiteEntry[];

export function entryPath(entry: SiteEntry) {
  const url = new URL(entry.url);
  const prefix = entry.language === "he" ? "" : `/${entry.language}`;
  return `${prefix}${url.pathname === "/" ? "" : url.pathname}` || "/";
}

export function findEntry(pathname: string) {
  const decoded = decodeURI(pathname).replace(/\/$/, "") || "/";
  return entries.find((entry) => decodeURI(entryPath(entry)).replace(/\/$/, "") === decoded);
}

export function cleanText(entry: SiteEntry) {
  const lines = entry.text.split("\n").map((line) => line.trim()).filter(Boolean);
  const start = lines.findIndex((line) => ["קריאת נשמה דרך כף היד", "Soul Reading through the palm", "Seelenlesen durch die Handfläche"].includes(line));
  return lines.slice(start >= 0 ? start : 0).filter((line) => !["top of page", "bottom of page", "More", "Use tab to navigate through the menu items."].includes(line));
}
