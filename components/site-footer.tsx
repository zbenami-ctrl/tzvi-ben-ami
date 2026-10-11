import Link from "next/link";
import type { Language } from "./site-header";

export const whatsappLabel: Record<Language, string> = {
  he: "כתבו לי ב־WhatsApp",
  en: "Write to me on WhatsApp",
  de: "Schreiben Sie mir auf WhatsApp",
};

export function ContactLinks({ language }: { language: Language }) {
  return (
    <div className="contact-links">
      <a className="primary-button" href="https://wa.me/972544899258">{whatsappLabel[language]}</a>
      <a className="contact-phone" href="tel:+972544899258" dir="ltr">054-4899258</a>
    </div>
  );
}

export function SiteFooter({ language }: { language: Language }) {
  return (
    <footer>
      © {new Date().getFullYear()} {language === "he" ? "צבי בן־עמי" : "Zvi Ben-Ami"} ·{" "}
      <Link href="/">עברית</Link> · <Link href="/en">English</Link> · <Link href="/de">Deutsch</Link>
    </footer>
  );
}
