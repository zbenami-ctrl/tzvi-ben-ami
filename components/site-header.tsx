import Link from "next/link";

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

function localizedPath(language: Language, path: string) {
  return language === "he" ? path : `/${language}${path === "/" ? "" : path}`;
}

export function SiteHeader({ language = "he" }: { language?: Language }) {
  return (
    <header className="site-header" dir={language === "he" ? "rtl" : "ltr"}>
      <Link href={localizedPath(language, "/")} className="brand" aria-label={language === "he" ? "דף הבית" : "Home"}>
        <span>{language === "he" ? "צבי בן־עמי" : "Zvi Ben-Ami"}</span>
        <small>{brandLine[language]}</small>
      </Link>
      <nav aria-label={language === "he" ? "ניווט ראשי" : "Main navigation"}>
        {navigation[language].map(([label, href]) => (
          <Link key={href} href={localizedPath(language, href)}>{label}</Link>
        ))}
      </nav>
      <div className="languages" aria-label={language === "he" ? "בחירת שפה" : "Language selection"}>
        <Link className={language === "he" ? "active" : ""} href="/">HE</Link>
        <span>·</span>
        <Link className={language === "de" ? "active" : ""} href="/de">DE</Link>
        <span>·</span>
        <Link className={language === "en" ? "active" : ""} href="/en">EN</Link>
      </div>
    </header>
  );
}
