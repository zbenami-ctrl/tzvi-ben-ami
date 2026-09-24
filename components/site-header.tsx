import Link from "next/link";

const nav = [
  ["מי אני", "/about"],
  ["הפגישה עם צבי", "/metting-with-tzvi"],
  ["שאלות נפוצות", "/שאלות-ותשובות"],
  ["המלצות", "/recomandations"],
  ["בלוג", "/blog"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="דף הבית">
        <span>צבי בן־עמי</span>
        <small>מטפל אל מרחבי העומק</small>
      </Link>
      <nav aria-label="ניווט ראשי">
        {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <div className="languages" aria-label="בחירת שפה">
        <Link href="/">HE</Link><span>·</span><Link href="/de">DE</Link><span>·</span><Link href="/en">EN</Link>
      </div>
    </header>
  );
}
