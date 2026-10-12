import fs from "node:fs";
import path from "node:path";

export type BlogVideo = {
  platform: "tiktok" | "instagram" | "youtube";
  url: string;
  embed: string;
  vertical: boolean;
  title?: string;
  thumbnail?: string;
};

function parse(url: string): BlogVideo | undefined {
  const tiktok = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (tiktok) return { platform: "tiktok", url, embed: `https://www.tiktok.com/player/v1/${tiktok[1]}?autoplay=1&rel=0`, vertical: true };
  const instagram = url.match(/instagram\.com\/(p|reel|reels)\/([\w-]+)/);
  if (instagram) {
    const kind = instagram[1] === "p" ? "p" : "reel";
    return { platform: "instagram", url, embed: `https://www.instagram.com/${kind}/${instagram[2]}/embed`, vertical: true };
  }
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) {
    return {
      platform: "youtube",
      url,
      embed: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0`,
      vertical: url.includes("/shorts/"),
      thumbnail: `https://i.ytimg.com/vi/${youtube[1]}/hqdefault.jpg`,
    };
  }
  return undefined;
}

// Captions come straight from the social posts; long dashes and curly apostrophes are shown as plain punctuation.
function plainPunctuation(text?: string) {
  return text?.replace(/\s*[—–]\s*/g, ", ").replace(/[‘’]/g, "'");
}

// TikTok cover images are signed URLs that expire, so they are looked up again once a day.
async function withTikTokDetails(video: BlogVideo): Promise<BlogVideo> {
  try {
    const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(video.url)}`, { next: { revalidate: 86400 } });
    if (!response.ok) return video;
    const data = await response.json();
    return { ...video, title: plainPunctuation(data.title), thumbnail: data.thumbnail_url };
  } catch {
    return video;
  }
}

// Reads content/blog-videos.md: one video link per line, in display order.
export async function readBlogVideos(): Promise<BlogVideo[]> {
  const source = fs.readFileSync(path.join(process.cwd(), "content", "blog-videos.md"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const videos = source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("http"))
    .map(parse)
    .filter((video): video is BlogVideo => Boolean(video));
  return Promise.all(videos.map((video) => (video.platform === "tiktok" ? withTikTokDetails(video) : video)));
}
