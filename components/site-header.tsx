import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { contactHref, writeLabel } from "./site-footer";

export type Language = "he" | "en" | "de";

const navigation: Record<Language, Array<[string, string]>> = {
  he: [
    ["מי אני", "/about"],
    ["הפגישה עם צבי", "/metting-with-tzvi"],
    ["שאלות נפוצות", "/שאלות-ותשובות"],
    ["המלצות", "/recomandations"],
    ["בלוג", "/blog"],
  ],
  en: [
    ["About me", "/about"],
    ["Meeting with Zvi", "/metting-with-tzvi"],
    ["Frequently asked questions", "/שאלות-ותשובות"],
    ["Recommendations", "/recomandations"],
    ["Blog", "/blog"],
  ],
  de: [
    ["Über mich", "/about"],
    ["Session mit Zvi", "/metting-with-tzvi"],
    ["Häufige Fragen", "/שאלות-ותשובות"],
    ["Empfehlungen", "/recomandations"],
    ["Blog", "/blog"],
  ],
};

const brandLine: Record<Language, string> = {
  he: "מטפל אל מרחבי העומק",
  en: "Soul & Inner Depth Therapist",
  de: "Spirituelle Begleitung und Seelenlesen",
};

const menuLabels: Record<Language, { open: string; close: string; languages: string }> = {
  he: { open: "תפריט", close: "סגירה", languages: "בחירת שפה" },
  en: { open: "Menu", close: "Close", languages: "Language selection" },
  de: { open: "Menü", close: "Schließen", languages: "Sprachauswahl" },
};

const languageLinks: Array<{ code: Language; name: string; href: string }> = [
  { code: "he", name: "עברית", href: "/" },
  { code: "en", name: "English", href: "/en" },
  { code: "de", name: "Deutsch", href: "/de" },
];

function localizedPath(language: Language, path: string) {
  return language === "he" ? path : `/${language}${path === "/" ? "" : path}`;
}

export function SiteHeader({ language = "he" }: { language?: Language }) {
  return (
    <header className="site-header" dir={language === "he" ? "rtl" : "ltr"}>
      <Link href={localizedPath(language, "/")} className="brand" aria-label={language === "he" ? "דף הבית" : "Home"}>
        <span className="handwriting">{language === "he" ? "צבי בן־עמי" : "Zvi Ben-Ami"}</span>
        <small>{brandLine[language]}</small>
      </Link>
      <nav aria-label={language === "he" ? "ניווט ראשי" : "Main navigation"}>
        {navigation[language].map(([label, href]) => (
          <Link key={href} href={localizedPath(language, href)}>{label}</Link>
        ))}
      </nav>
      <div className="languages" aria-label={menuLabels[language].languages}>
        <Link className={language === "he" ? "active" : ""} href="/">HE</Link>
        <span>·</span>
        <Link className={language === "en" ? "active" : ""} href="/en">EN</Link>
        <span>·</span>
        <Link className={language === "de" ? "active" : ""} href="/de">DE</Link>
      </div>
      <MobileMenu
        items={navigation[language].map(([label, href]) => ({ label, href: localizedPath(language, href) }))}
        languages={languageLinks.map(({ code, name, href }) => ({ name, href, active: code === language }))}
        contact={{ label: writeLabel[language], href: contactHref(language) }}
        labels={menuLabels[language]}
      />
    </header>
  );
}
