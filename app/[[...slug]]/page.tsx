import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { SiteHeader } from "@/components/site-header";
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
  const lines = cleanText(entry);
  const title = lines[0] || entry.title;
  return (
    <main dir={entry.language === "he" ? "rtl" : "ltr"} lang={entry.language}>
      <SiteHeader />
      <article className="content-page section-shell">
        <p className="section-kicker">{entry.kind === "post" ? "בלוג" : "צבי בן־עמי"}</p>
        <h1>{title}</h1>
        <div className="prose">
          {lines.slice(1).map((line, index) => {
            const isHeading = line.length < 55 && !/[.!?,:]$/.test(line);
            return isHeading ? <h2 key={index}>{line}</h2> : <p key={index}>{line}</p>;
          })}
        </div>
        <Link className="text-link" href={entry.language === "he" ? "/" : `/${entry.language}`}>חזרה לדף הבית</Link>
      </article>
    </main>
  );
}
