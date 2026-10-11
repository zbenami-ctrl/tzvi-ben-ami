import Link from "next/link";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";
import type { Language } from "./site-header";

// Label for buttons that lead to the contact form (Zvi prefers people write after reading the site).
export const writeLabel: Record<Language, string> = {
  he: "כתבו לי",
  en: "Write to me",
  de: "Schreiben Sie mir",
};

export function contactHref(language: Language) {
  return `${language === "he" ? "/" : `/${language}`}#contact`;
}

const socialNames = { youtube: "YouTube", facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok" } as const;

export function SocialLinks() {
  const links = (Object.keys(socialNames) as Array<keyof typeof socialNames>).filter((key) => site.social[key]);
  return (
    <div className="social-links">
      {links.map((key) => (
        <a key={key} href={site.social[key]} target="_blank" rel="noopener noreferrer">{socialNames[key]}</a>
      ))}
    </div>
  );
}

export function ContactLinks({ language }: { language: Language }) {
  return (
    <div className="contact-links">
      <ContactForm language={language} />
      <a className="contact-phone" href={site.phone.href} dir="ltr">{site.phone.display}</a>
    </div>
  );
}

export function SiteFooter({ language }: { language: Language }) {
  return (
    <footer>
      <SocialLinks />
      <p>
        © {new Date().getFullYear()} {language === "he" ? "צבי בן־עמי" : "Zvi Ben-Ami"} ·{" "}
        <Link href="/">עברית</Link> · <Link href="/en">English</Link> · <Link href="/de">Deutsch</Link>
      </p>
    </footer>
  );
}
