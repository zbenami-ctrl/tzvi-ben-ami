import content from "@/data/content.json";
import { typeset } from "./typography";

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
  const lines = entry.text.split("\n").map((line) => typeset(line.trim())).filter(Boolean);
  const menuEnd = lines.indexOf("Use tab to navigate through the menu items.");
  const markerStart = lines.findIndex((line) => ["קריאת נשמה דרך כף היד", "Soul Reading through the palm", "Seelenlesen durch die Handfläche"].includes(line));
  const start = menuEnd >= 0 ? menuEnd + 1 : markerStart >= 0 ? markerStart : 0;
  const end = lines.indexOf("bottom of page");
  return lines
    .slice(start, end >= 0 ? end : undefined)
    .filter((line) => !["top of page", "More", "Use tab to navigate through the menu items."].includes(line));
}

export function pageLines(entry: SiteEntry) {
  let lines = cleanText(entry).filter((line) => line !== "​");

  if (entry.language === "de" && entryPath(entry).endsWith("/metting-with-tzvi")) {
    const germanStart = lines.findIndex((line) => line.startsWith("Bevor Sie mich"));
    if (germanStart >= 0) lines = ["Session mit Zvi", ...lines.slice(germanStart)];
  }

  const stopPrefixes = entry.language === "he"
    ? ["Healing and communicating abilities", "Before you reach me", "צבי בן-עמי מטפל ומדריך"]
    : entry.language === "en"
      ? ["Bevor Sie mich", "Zvi Ben Ami", "Zvi Ben-ami -Spirituelle"]
      : ["Zvi Ben-ami -Spirituelle"];

  const stop = lines.findIndex((line, index) => index > 0 && stopPrefixes.some((prefix) => line.startsWith(prefix)));
  return stop >= 0 ? lines.slice(0, stop) : lines;
}

export function postLines(entry: SiteEntry) {
  const lines = cleanText(entry).filter((line) => line !== "​");
  const stop = lines.findIndex((line) => ["פוסטים נבחרים", "Selected posts", "Recent Posts"].includes(line));
  return stop >= 0 ? lines.slice(0, stop) : lines;
}

export function postEntries(language: SiteEntry["language"]) {
  return entries.filter((entry) => entry.kind === "post" && entry.language === language);
}

// Covers made for the new site, matched to each post by a distinctive part of its title.
const postCovers: Array<[string, string]> = [
  ["טיפ טיפה אחרת", "drop"],
  ["מסרים ישירים", "mist"],
  ["התמודדות עם חרדה ומשברי חיים", "path"],
  ["הנשמה שאנחנו באה", "hand"],
  ["שיחות עם מלאכים", "feathers"],
  ["אתם נושאים כל כך הרבה פחד", "gate"],
  ["חיכוך תוך כדי", "stones"],
  ["חלל פנימי וחיצוני", "desert"],
  ["סט מדבר", "moon-lake"],
  ["קרישנמורטי", "songbird"],
];

export function localImageFor(entry: SiteEntry) {
  const cover = postCovers.find(([title]) => entry.title.includes(title));
  if (cover) return `/media/blog/${cover[1]}.jpg`;

  // Posts still waiting for a cover of their own share the hero image.
  return "/media/hero-landscape.jpg";
}
