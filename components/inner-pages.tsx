import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "./hero-video";
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
import { readPage, readPageIfExists, readVideos, section } from "@/lib/pages";
import { readBlogVideos } from "@/lib/blog-videos";
import { site } from "@/lib/site";
import { ContentBlocks, FoldedBlocks, keepLastWords } from "./content-blocks";
import { contactHref, SiteFooter, writeLabel } from "./site-footer";
import { SocialVideo } from "./social-video";
import { VideoTestimonial } from "./video-testimonial";

export const ui = {
  he: {
    about: "מי אני",
    aboutKicker: "הדרך שלי",
    meeting: "הפגישה עם צבי",
    meetingKicker: "קריאת נשמה דרך כף היד",
    faq: "שאלות נפוצות",
    faqKicker: "לפני הפגישה",
    recommendations: "המלצות",
    recommendationsKicker: "מילים מאנשים שפגשתי",
    videos: "המלצות בווידאו",
    readMore: "להמשך קריאה",
    allTestimonials: "לכל ההמלצות",
    blogVideos: "סרטונים",
    play: "הפעלת סרטון",
    channel: "לערוץ היוטיוב של צבי",
    blog: "לעשות את הדרך",
    blogKicker: "הבלוג של צבי",
    read: "לקריאה",
    contact: "לתיאום פגישה עם צבי",
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
    videos: "Video testimonials",
    readMore: "Continue reading",
    allTestimonials: "All testimonials",
    blogVideos: "Videos",
    play: "Play video",
    channel: "Zvi’s YouTube channel",
    blog: "Walking the path",
    blogKicker: "Zvi’s blog",
    read: "Read more",
    contact: "Schedule a meeting with Zvi",
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
    videos: "Video-Empfehlungen",
    readMore: "Weiterlesen",
    allTestimonials: "Alle Empfehlungen",
    blogVideos: "Videos",
    play: "Video abspielen",
    channel: "Zvis YouTube-Kanal",
    blog: "Den Weg gehen",
    blogKicker: "Zvis Blog",
    read: "Weiterlesen",
    contact: "Eine Session mit Zvi vereinbaren",
    back: "Zurück zum Blog",
  },
} satisfies Record<Language, Record<string, string>>;

function localized(language: Language, path: string) {
  return language === "he" ? path : `/${language}${path}`;
}

function PageTop({
  language,
  kicker,
  title,
}: {
  language: Language;
  kicker: string;
  title: string;
}) {
  return (
    <section className="inner-hero">
      <Image src="/media/hero-landscape.jpg" alt="" fill priority sizes="100vw" />
      <HeroVideo />
      <div className="inner-hero-shade" />
      <div className="inner-hero-copy" dir={language === "he" ? "rtl" : "ltr"}>
        <p className="eyebrow">{kicker}</p>
        <h1 className="handwriting">{title}</h1>
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
      <Link className="primary-button" href={contactHref(language)}>{writeLabel[language]}</Link>
    </section>
  );
}

export function AboutPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const page = readPage(language, "about");

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={page.meta.kicker} title={page.meta.title} />
      <div className="story-layout section-wide">
        <aside className="story-portrait">
          <Image src="/media/zvi-web.jpg" alt={language === "he" ? "צבי בן־עמי" : "Zvi Ben-Ami"} fill sizes="(max-width: 900px) 116px, 36vw" />
        </aside>
        <div className="story-sections">
          {page.sections.map((section, index) => (
            <details className="story-section prose-block" key={section.id} open={index === 0}>
              <summary><h2 className="display">{section.heading}</h2></summary>
              <ContentBlocks blocks={section.blocks} />
            </details>
          ))}
        </div>
      </div>
      <ContactBand language={language} />
      <SiteFooter language={language} />
    </main>
  );
}

export function MeetingPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  // The session is described by the "What I offer" section of the home content.
  const offer = section(readPage(language, "home"), "offer");

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={ui[language].meetingKicker} title={ui[language].meeting} />
      <article className="meeting-page section-shell prose-block">
        <h2 className="display">{offer.heading}</h2>
        <ContentBlocks blocks={offer.blocks} />
      </article>
      <ContactBand language={language} />
      <SiteFooter language={language} />
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
      <PageTop language={language} kicker={ui[language].faqKicker} title={ui[language].faq} />
      <section className="faq-list section-shell">
        {questions.map(({ question, answer }, index) => (
          <details key={question} open={index === 0}>
            <summary>{question}</summary>
            {answer && <p>{keepLastWords(answer)}</p>}
          </details>
        ))}
      </section>
      <ContactBand language={language} />
      <SiteFooter language={language} />
    </main>
  );
}

// Testimonials shown before the "all testimonials" button.
const firstTestimonials = 6;

export function RecommendationsPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const lines = pageLines(entry);
  // Written testimonials live in content/<language>/testimonials.md; the scraped Wix one is the fallback.
  const page = readPageIfExists(language, "testimonials");
  const testimonials = page?.sections ?? [
    { id: "wix", heading: lines[2] || "", blocks: [{ kind: "paragraph" as const, text: lines[1] || "" }] },
  ];

  const renderTestimonial = (testimonial: (typeof testimonials)[number], index: number) => (
    <figure className="testimonial-card" key={`${testimonial.heading}-${index}`}>
      <span className="quote-mark" aria-hidden="true">“</span>
      <blockquote>
        <FoldedBlocks blocks={testimonial.blocks} visible={1} label={ui[language].readMore} />
      </blockquote>
      {testimonial.heading && <figcaption>{testimonial.heading}</figcaption>}
    </figure>
  );

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={ui[language].recommendationsKicker} title={ui[language].recommendations} />
      <section className="testimonials section-wide">
        <p className="testimonials-intro">{page?.meta.intro ?? lines[0]}</p>
        <div className="testimonial-grid">
          {testimonials.slice(0, firstTestimonials).map(renderTestimonial)}
        </div>
        {testimonials.length > firstTestimonials && (
          <details className="more-testimonials">
            <summary className="secondary-button">{ui[language].allTestimonials} ({testimonials.length})</summary>
            <div className="testimonial-grid">
              {testimonials.slice(firstTestimonials).map(renderTestimonial)}
            </div>
          </details>
        )}
      </section>
      <section className="videos section-wide">
        <h2 className="display">{ui[language].videos}</h2>
        <div className="video-grid">
          {readVideos().map((video) => <VideoTestimonial key={video.id} {...video} playLabel={ui[language].play} />)}
        </div>
        <a className="secondary-button" href={site.social.youtube} target="_blank" rel="noopener noreferrer">{ui[language].channel}</a>
      </section>
      <ContactBand language={language} />
      <SiteFooter language={language} />
    </main>
  );
}

function excerptFor(entry: SiteEntry) {
  const lines = postLines(entry);
  const paragraph = lines.slice(1).find((line) => line.length > 90 && !line.startsWith("#"));
  if (!paragraph) return "";
  return paragraph.length > 190 ? `${paragraph.slice(0, 187).trim()}…` : paragraph;
}

export async function BlogPage({ entry }: { entry: SiteEntry }) {
  const language = entry.language;
  const posts = postEntries(language);
  const videos = await readBlogVideos();
  const embedded = pageLines(entry);
  const embeddedCards = language === "en"
    ? [{ title: embedded[0], excerpt: embedded[1], image: "/media/010-773a87_1b6e232b7cf0428dbbed634f363b2132-mv2.gif-a24aa259e85c.gif" },
       { title: embedded[2], excerpt: embedded[3], image: "/media/030-9e2941_d36dbea2a7494c1e8c1ca969cceb73ef-mv2.png-241908521935.png" }]
    : [];

  return (
    <main dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <SiteHeader language={language} />
      <PageTop language={language} kicker={ui[language].blogKicker} title={ui[language].blog} />
      {videos.length > 0 && (
        <section className="blog-videos section-wide">
          <h2 className="display">{ui[language].blogVideos}</h2>
          <div className="social-video-row">
            {videos.map((video) => <SocialVideo key={video.url} video={video} playLabel={ui[language].play} />)}
          </div>
        </section>
      )}
      <section className="blog-grid section-wide">
        {posts.map((post) => (
          <article className="post-card" key={post.url}>
            <Link className="post-card-image" href={entryPath(post)}>
              <Image src={localImageFor(post)} alt="" fill sizes="(max-width: 560px) 96px, (max-width: 900px) 50vw, 400px" />
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
            <div className="post-card-image"><Image src={post.image} alt="" fill sizes="(max-width: 560px) 96px, (max-width: 900px) 50vw, 400px" /></div>
            <div className="post-card-copy"><h2>{post.title}</h2><p>{post.excerpt}</p></div>
          </article>
        ))}
        {!posts.length && !embeddedCards.length && (
          <div className="blog-empty"><h2>{embedded[0]}</h2><p>{embedded[1]}</p></div>
        )}
      </section>
      <SiteFooter language={language} />
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
          {lines.slice(1).map((line, index) => isHeading(line) ? <h2 key={index}>{line}</h2> : <p key={index}>{keepLastWords(line)}</p>)}
        </div>
        <Link className="text-link" href={localized(language, "/blog")}>{ui[language].back}</Link>
      </article>
      <SiteFooter language={language} />
    </main>
  );
}
