import { site } from "@/lib/site";
import type { Language } from "./site-header";

const icons = {
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.4v5.2l4.6-2.6z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.2 8.2h2.3V4.8h-2.6c-2.4 0-3.7 1.6-3.7 3.8v1.7H8v3.3h2.2V20h3.4v-6.4h2.4l.5-3.3h-2.9V8.9c0-.4.2-.7.6-.7z" fill="currentColor" stroke="none" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <>
      <path d="M13.5 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3" />
      <path d="M13.5 3.5c.4 2.5 2.1 4.1 4.8 4.3" />
    </>
  ),
} as const;

const names = { youtube: "YouTube", facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok" } as const;

// Round icon buttons for the home hero, on top of the photo.
export function SocialIcons({ language }: { language: Language }) {
  const links = (Object.keys(icons) as Array<keyof typeof icons>)
    .map((key) => {
      const link = site.social[key];
      return [key, typeof link === "string" ? link : link[language]] as const;
    })
    .filter(([, href]) => href);
  return (
    <div className="hero-social">
      {links.map(([key, href]) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={names[key]} title={names[key]}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {icons[key]}
          </svg>
        </a>
      ))}
    </div>
  );
}
