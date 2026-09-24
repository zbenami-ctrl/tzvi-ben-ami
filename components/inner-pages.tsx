import Image from "next/image";
import Link from "next/link";
import type { Language } from "./site-header";
import { SiteHeader } from "./site-header";
import {
  entryPath,
  localImageFor,
  pageLines,
  postEntries,
  postLines,
  type SiteEntry,
} from "@/lib/content";

const ui = {
  he: {
    about: "מי אני",
    aboutKicker: "הדרך שלי",
    meeting: "הפגישה עם צבי",
    meetingKicker: "קריאת נשמה דרך כף היד",
    faq: "שאלות נפוצות",
    faqKicker: "לפני הפגישה",
    recommendations: "המלצות",
    recommendationsKicker: "מילים מאנשים שפגשתי",
    blog: "לעשות את הדרך",
    blogKicker: "הבלוג של צבי",
    read: "לקריאה",
    contact: "לתיאום פגישה עם צבי",
    noPrediction: "בפגישה איתי אין ניבוי עתידות",
    back: "חזרה לבלוג",
  },
  en: {
    about: "About me",
    aboutKicker: "My path",
    meeting: "Meeting with Zvi",
    meetingKicker: "Soul & Palm Reading",
    faq: "Frequently asked questions",
    faqKicker: "Before the meeting",
    recommendations: "Recommendations",
    recommendationsKicker: "Words from people I have met",
    blog: "Walking the path",
    blogKicker: "Zvi’s blog",
    read: "Read more",
    contact: "Schedule a meeting with Zvi",
    noPrediction: "There is no fortune-telling in my sessions",
    back: "Back to the blog",
  },
  de: {
    about: "Über mich",
    aboutKicker: "Mein Weg",
    meeting: "Session mit Zvi",
    meetingKicker: "Seelenlesen durch die Handfläche",
    faq: "Häufige Fragen",
    faqKicker: "Vor der Session",
    recommendations: "Empfehlungen",
    recommendationsKicker: "Worte von Menschen, die ich getroffen habe",
    blog: "Den Weg gehen",
    blogKicker: "Zvis Blog",
    read: "Weiterlesen",
    contact: "Eine Session mit Zvi vereinbaren",
    noPrediction: "In meinen Sessions gibt es keine Zukunftsvoraussagen",
    back: "Zurück zum Blog",
  },
} satisfies Record<Language, Record<string, string>>;

function localized(language: Language, path: string) {
  return language === "he" ? path : `/${language}${path}`;
}

function Footer({ language }: { language: Language }) {
  return (
    <footer>
      © {new Date().getFullYear()} {language === "he" ? "צבי בן־עמי" : "Zvi Ben-Ami"} ·{" "}
      <Link href="/">עברית</Link> · <Link href="/en">English</Link> · <Link href="/de">Deutsch</Link>
    </footer>
  );
}

function PageTop({
  language,
  kicker,
  title,
  image,
  imageAlt,
}: {
  language: Language;
  kicker: string;
  title: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="inner-hero">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
      <div className="inner-hero-shade" />
      <div className="inner-hero-copy" dir={language === "he" ? "rtl" : "ltr"}>
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
      </div>
    </section>
  );
}

type TextSection = { heading?: string; paragraphs: string[] };

function isHeading(line: string) {
  return line.length < 68 && !/[.!?,:;…]$/.test(line);
}

function sectionsFrom(lines: string[]): TextSection[] {
  const sections: TextSection[] = [];
  for (const line of lines) {
    if (isHeading(line)) {
      sections.push({ heading: line, paragraphs: [] });
    } else {
      if (!sections.length) sections.push({ paragraphs: [] });
      sections[sections.length - 1].paragraphs.push(line);
    }
  }
  return sections.filter((section) => section.heading || section.paragraphs.length);
}

function ContactBand({ language }: { language: Language }) {
  return (
    <section className="inner-contact-band">
      <p>{ui[language].contact}</p>
      <a className="primary-button" href="https://wa.me/972544899258">WhatsApp</a>
    </section>
  );
}

export function AboutPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const lines = pageLines(entry);
  const sections = sectionsFrom(lines.slice(1)).filter((section) => !section.heading?.includes("ספר לי עוד"));

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={ui[language].aboutKicker} title={ui[language].about} image="/media/hero-landscape.jpg" imageAlt="" />
      <div className="story-layout section-wide">
        <aside className="story-portrait">
          <Image src="/media/zvi-web.jpg" alt={language === "he" ? "צבי בן־עמי" : "Zvi Ben-Ami"} fill sizes="(max-width: 850px) 100vw, 36vw" />
        </aside>
        <div className="story-sections">
          {sections.map((section, index) => (
            <section className="story-section" key={`${section.heading}-${index}`}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            </section>
          ))}
        </div>
      </div>
      <ContactBand language={language} />
      <Footer language={language} />
    </main>
  );
}

export function MeetingPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const lines = pageLines(entry);
  const sections = sectionsFrom(lines.slice(1));

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={ui[language].meetingKicker} title={ui[language].meeting} image="/media/008-66154d350a0b433da16d97d4ec3da8fb.jpg-8e4b58d09925.jpg" imageAlt="" />
      <article className="meeting-page section-wide">
        <div className="meeting-intro">
          <div>
            <p className="section-kicker">{ui[language].meetingKicker}</p>
            <h2>{lines[0] || ui[language].meeting}</h2>
          </div>
          <div className="meeting-intro-copy">
            {sections[0]?.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
        <div className="meeting-flow">
          {sections.slice(1).map((section, index) => (
            <section className="meeting-step" key={`${section.heading}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            </section>
          ))}
        </div>
        <blockquote className="no-prediction">{ui[language].noPrediction}</blockquote>
      </article>
      <ContactBand language={language} />
      <Footer language={language} />
    </main>
  );
}

export function FaqPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const lines = pageLines(entry).slice(1);
  const questions: Array<{ question: string; answer?: string }> = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!/[?؟]\"?$/.test(line)) continue;
    const next = lines[index + 1];
    questions.push({ question: line.replace(/\"$/, ""), answer: next && !/[?؟]\"?$/.test(next) ? next : undefined });
  }

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={ui[language].faqKicker} title={ui[language].faq} image="/media/010-773a87_1b6e232b7cf0428dbbed634f363b2132-mv2.gif-a24aa259e85c.gif" imageAlt="" />
      <section className="faq-list section-shell">
        {questions.map(({ question, answer }, index) => (
          <details key={question} open={index === 0}>
            <summary>{question}</summary>
            {answer && <p>{answer}</p>}
          </details>
        ))}
      </section>
      <ContactBand language={language} />
      <Footer language={language} />
    </main>
  );
}

export function RecommendationsPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const lines = pageLines(entry);
  const quote = lines[1] || "";
  const author = lines[2] || "";

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={ui[language].recommendationsKicker} title={ui[language].recommendations} image="/media/001-035244_bea0a5aa9c92439fb8c1c12caea2f5db.jpg-afcc8b48e3c0.jpg" imageAlt="" />
      <section className="testimonial section-shell">
        <span className="quote-mark">“</span>
        <p className="testimonial-heading">{lines[0]}</p>
        <blockquote>{quote}</blockquote>
        <p className="testimonial-author">{author}</p>
      </section>
      <ContactBand language={language} />
      <Footer language={language} />
    </main>
  );
}

function excerptFor(entry: SiteEntry) {
  const lines = postLines(entry);
  const paragraph = lines.slice(1).find((line) => line.length > 90 && !line.startsWith("#"));
  if (!paragraph) return "";
  return paragraph.length > 190 ? `${paragraph.slice(0, 187).trim()}…` : paragraph;
}

export function BlogPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const posts = postEntries(language);
  const embedded = pageLines(entry);
  const embeddedCards = language === "en"
    ? [{ title: embedded[0], excerpt: embedded[1], image: "/media/010-773a87_1b6e232b7cf0428dbbed634f363b2132-mv2.gif-a24aa259e85c.gif" },
       { title: embedded[2], excerpt: embedded[3], image: "/media/030-9e2941_d36dbea2a7494c1e8c1ca969cceb73ef-mv2.png-241908521935.png" }]
    : [];

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={ui[language].blogKicker} title={ui[language].blog} image="/media/024-9e2941_2897b6e43f91453c83c943dfa1ac1e93-mv2.png-e8e1c02af816.png" imageAlt="" />
      <section className="blog-grid section-wide">
        {posts.map((post) => (
          <article className="post-card" key={post.url}>
            <Link className="post-card-image" href={entryPath(post)}>
              <Image src={localImageFor(post)} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
            </Link>
            <div className="post-card-copy">
              <h2><Link href={entryPath(post)}>{post.title}</Link></h2>
              <p>{excerptFor(post)}</p>
              <Link className="text-link" href={entryPath(post)}>{ui[language].read}</Link>
            </div>
          </article>
        ))}
        {embeddedCards.map((post) => (
          <article className="post-card" key={post.title}>
            <div className="post-card-image"><Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
            <div className="post-card-copy"><h2>{post.title}</h2><p>{post.excerpt}</p></div>
          </article>
        ))}
        {!posts.length && !embeddedCards.length && (
          <div className="blog-empty"><h2>{embedded[0]}</h2><p>{embedded[1]}</p></div>
        )}
      </section>
      <Footer language={language} />
    </main>
  );
}

export function PostPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const lines = postLines(entry);
  const title = lines[0] || entry.title;

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <article className="post-page section-shell">
        <p className="section-kicker">{ui[language].blogKicker}</p>
        <h1>{title}</h1>
        <div className="post-page-image"><Image src={localImageFor(entry)} alt="" fill priority sizes="(max-width: 900px) 100vw, 850px" /></div>
        <div className="prose">
          {lines.slice(1).map((line, index) => isHeading(line) ? <h2 key={index}>{line}</h2> : <p key={index}>{line}</p>)}
        </div>
        <Link className="text-link" href={localized(language, "/blog")}>{ui[language].back}</Link>
      </article>
      <Footer language={language} />
    </main>
  );
}
