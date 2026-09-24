import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { Language, SiteHeader } from "@/components/site-header";
import { cleanText, findEntry } from "@/lib/content";

type Props = { params: Promise<{ slug?: string[] }> };

function pathnameFrom(slug?: string[]) {
  return slug?.length ? `/${slug.map(decodeURIComponent).join("/")}` : "/";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(pathnameFrom(slug));
  if (!entry) return {};
  return { title: entry.title, description: entry.description };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const pathname = pathnameFrom(slug);
  if (pathname === "/") return <HomePage />;
  const entry = findEntry(pathname);
  if (!entry) notFound();
  if ((pathname === "/en" || pathname === "/de") && entry.kind === "page") {
    return <HomePage language={entry.language} />;
  }
  const lines = cleanText(entry);
  const title = lines[0] || entry.title;
  const language = entry.language as Language;
  const labels = {
    he: { page: "צבי בן־עמי", blog: "בלוג", back: "חזרה לדף הבית" },
    en: { page: "Zvi Ben-Ami", blog: "Blog", back: "Back to the home page" },
    de: { page: "Zvi Ben-Ami", blog: "Blog", back: "Zurück zur Startseite" },
  }[language];
  return (
    <main dir={entry.language === "he" ? "rtl" : "ltr"} lang={entry.language}>
      <SiteHeader language={language} />
      <div className="content-hero" aria-hidden="true">
        <Image src="/media/hero-landscape.jpg" alt="" fill sizes="100vw" />
        <div className="content-hero-shade" />
      </div>
      <article className="content-page section-shell">
        <p className="section-kicker">{entry.kind === "post" ? labels.blog : labels.page}</p>
        <h1>{title}</h1>
        <div className="prose">
          {lines.slice(1).map((line, index) => {
            const isHeading = line.length < 55 && !/[.!?,:]$/.test(line);
            return isHeading ? <h2 key={index}>{line}</h2> : <p key={index}>{line}</p>;
          })}
        </div>
        <Link className="text-link" href={entry.language === "he" ? "/" : `/${entry.language}`}>{labels.back}</Link>
      </article>
    </main>
  );
}
