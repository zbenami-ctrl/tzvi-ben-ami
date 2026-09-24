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

const mediaFiles = [
  "001-035244_bea0a5aa9c92439fb8c1c12caea2f5db.jpg-afcc8b48e3c0.jpg",
  "002-0e10167f10cd42799d53050414de2471.jpg-1c00828185dc.jpg",
  "004-16ef84420bc4c31455fc777861c36494.jpg-de198737a447.jpg",
  "005-44046b_68b4623c88674067a29fa5e4a3375ee4-mv2.jpg-8d9556de5b88.jpg",
  "006-44046b_8ac308450b9e44ab96bef136645d328d-mv2_d_2505_3758_s_4_2.jpg-db01b8e2c059.jpg",
  "007-5a37aeb948474bd888d20b2392be625f.jpg-f657c33cbb64.jpg",
  "008-66154d350a0b433da16d97d4ec3da8fb.jpg-8e4b58d09925.jpg",
  "010-773a87_1b6e232b7cf0428dbbed634f363b2132-mv2.gif-a24aa259e85c.gif",
  "013-7b7a06a1d075428bb73dddc3bb2beb56.jpg-29e0c87766e1.jpg",
  "014-86a28da632f8242452e4a8d4375c0480.jpg-cf6930e01bed.jpg",
  "021-900bd529c49a45419e89274cd6580b67.jpg-ec159fa42252.jpg",
  "022-94e72fdb39603f0890ef6a4539185eb9.jpg-7be478832b7c.jpg",
  "024-9e2941_2897b6e43f91453c83c943dfa1ac1e93-mv2.png-e8e1c02af816.png",
  "025-9e2941_41298aea30484025abe5333be3b1a315-mv2.jpg-e9ac55a2d081.jpg",
  "026-9e2941_64ff7d4003d04a339bb7d39871150a55-mv2_d_5182_2635_s_4_2.jpeg-437c69168085.jpg",
  "027-9e2941_8bb8eb035f7f4d3aa0664c95c1f8de7b-mv2_d_4228_2829_s_4_2.jpeg-293d5393f300.jpg",
  "028-9e2941_8f9b23b7ffda4f6c82be8856c6b6ea79-mv2.jpg-871f5de275d4.jpg",
  "029-9e2941_c18ba8fbf1974087a13e2933f20cb944-mv2.jpg-8907b3083a5c.jpg",
  "030-9e2941_d36dbea2a7494c1e8c1ca969cceb73ef-mv2.png-241908521935.png",
  "031-9e2941_ffc2952410514154bcba86a9cdafa1b6-mv2.jpg-fa75103e3a34.jpg",
  "033-b59d98a4ee0444ede2b7b39fec6879c4.jpg-afa1853d7edf.jpg",
  "034-b85e80c56121417d94f65a83f079e27f.jpg-660626c11792.jpg",
  "035-c88af5185780c45e004466a43e516687.jpg-9227d7795c07.jpg",
  "037-e5eb9a7c229bc6ffb680a349c5528bd5.jpg-985c4eb08eb7.jpg",
  "038-f69baa2e569449fe845a45992d9890db.jpg-7dbf1b6d306a.jpg",
];

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

export function localImageFor(entry: SiteEntry) {
  const ignored = /facebook|youtube|twitter|google|og:image/i;
  for (const image of entry.images) {
    if (ignored.test(image.alt)) continue;
    const decoded = decodeURIComponent(new URL(image.url).pathname.split("/").pop() || "");
    const id = decoded.split("~")[0].replace(/\.[^.]+$/, "");
    const file = mediaFiles.find((name) => name.includes(id));
    if (file) return `/media/${file}`;
  }
  for (const image of entry.images) {
    const decoded = decodeURIComponent(new URL(image.url).pathname.split("/").pop() || "");
    const id = decoded.split("~")[0].replace(/\.[^.]+$/, "");
    const file = mediaFiles.find((name) => name.includes(id));
    if (file) return `/media/${file}`;
  }
  return "/media/hero-landscape.jpg";
}
