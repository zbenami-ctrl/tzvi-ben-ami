import Image from "next/image";
import Link from "next/link";
import { readPage, section } from "@/lib/pages";
import { ContentBlocks, FoldedBlocks } from "./content-blocks";
import { ContactLinks, SiteFooter } from "./site-footer";
import { Language, SiteHeader } from "./site-header";

function hrefFor(language: Language, path: string) {
  return language === "he" ? path : `/${language}${path}`;
}

export function HomePage({ language = "he" }: { language?: Language }) {
  const page = readPage(language, "home");
  const { meta } = page;
  const opening = section(page, "opening");
  const who = section(page, "who");
  const offer = section(page, "offer");
  const contact = section(page, "contact");
  const [services, modes, ...invitation] = contact.blocks.map((block) => block.text);
  const direction = language === "he" ? "rtl" : "ltr";

  return (
    <main dir={direction} lang={language}>
      <SiteHeader language={language} />
      <section className="hero">
        <Image src="/media/hero-landscape.jpg" alt="" fill priority sizes="100vw" />
        <video className="hero-video" src="/media/hero-loop.mp4" poster="/media/hero-landscape.jpg" autoPlay muted loop playsInline aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">{meta.kicker}</p>
          <h1 className="handwriting">{meta.name}</h1>
          <p className="hero-role">{meta.role}</p>
          <div className="hero-lead">
            {opening.blocks.map((block, index) => <p key={index}>{block.text}</p>)}
          </div>
          <Link className="primary-button" href="#contact">{meta.cta}</Link>
        </div>
      </section>

      <section className="who section-wide">
        <div className="who-portrait">
          <Image src="/media/zvi-web.jpg" alt={meta.name} fill sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
        <div className="who-copy prose-block">
          <h2 className="display">{who.heading}</h2>
          <FoldedBlocks blocks={who.blocks} label={meta.readMore} />
          <Link className="text-link" href={hrefFor(language, "/about")}>{meta.more}</Link>
        </div>
      </section>

      <section className="offer">
        <div className="offer-inner prose-block">
          <h2 className="display">{offer.heading}</h2>
          {/* Opening paragraph and the highlighted line; the full text is on the session page. */}
          <ContentBlocks blocks={[offer.blocks[0], ...offer.blocks.filter((block) => block.kind === "quote")]} />
          <Link className="secondary-button" href={hrefFor(language, "/metting-with-tzvi")}>{meta.meeting}</Link>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-inner">
          <h2 className="display">{contact.heading}</h2>
          {services && <p className="contact-services">{services}</p>}
          {modes && <p className="contact-modes">{modes}</p>}
          {invitation.map((text, index) => <p className="contact-invitation" key={index}>{text}</p>)}
          <ContactLinks language={language} />
        </div>
      </section>

      <SiteFooter language={language} />
    </main>
  );
}
