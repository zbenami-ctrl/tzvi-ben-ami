import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Language, SiteHeader } from "./site-header";

type HomeCopy = {
  eyebrow: ReactNode;
  name: ReactNode;
  role: ReactNode;
  messages: ReactNode;
  anchor: ReactNode;
  contact: ReactNode;
  hello: ReactNode;
  introTitle: ReactNode;
  intro: ReactNode;
  about: ReactNode;
  meetingKicker: ReactNode;
  meetingTitle: ReactNode;
  meeting: ReactNode;
  meetingLink: ReactNode;
  talk: ReactNode;
  contactTitle: ReactNode;
  contactText: ReactNode;
  whatsapp: ReactNode;
  location: ReactNode;
};

const homeCopy: Record<Language, HomeCopy> = {
  he: {
    eyebrow: "קריאת נשמה דרך כף היד",
    name: "צבי בן־עמי",
    role: "מטפל אל מרחבי העומק",
    messages: "ידיעה פנימית · מסרים ממעמקים",
    anchor: <>להקשיב לעומק <span>·</span> לאפשר תנועה וצמיחה</>,
    contact: "יצירת קשר עם צבי",
    hello: "נעים להכיר",
    introTitle: "אני כאן כדי לעזור לך להבין את המקום שבו את או אתה נמצאים",
    intro: "ולמצוא דרכי ריפוי ותנועה בתוך מבוכי החיים — דרך קריאת נשמה, ידיעה פנימית ומסרים ממעמקים.",
    about: "עוד על הדרך שלי",
    meetingKicker: "הפגישה איתי",
    meetingTitle: "הקשבה מעבר למילים",
    meeting: "כשאני אוחז או מתבונן בכף היד, אני מקשיב למה שנמצא מעבר לקווים ולמסגרות. הפגישה היא מרחב אישי של התבוננות, בהירות ותנועה — ללא ניבוי עתידות.",
    meetingLink: "לפרטים על הפגישה",
    talk: "בואו נדבר",
    contactTitle: "פגישה בתל אביב או בשיחת וידאו",
    contactText: "לתיאום פגישה ולשאלות אפשר לפנות אליי ישירות ב־WhatsApp.",
    whatsapp: "WhatsApp עם צבי",
    location: "תל אביב, ישראל",
  },
  en: {
    eyebrow: "Soul & Palm Reading",
    name: "Zvi Ben-Ami",
    role: "Soul & Inner Depth Therapist",
    messages: "Inner Knowing · Messages from Deeper Realms",
    anchor: <>Listen deeply <span>·</span> Allow movement and growth</>,
    contact: "Contact Zvi",
    hello: "Nice to meet you",
    introTitle: "I am here to help you understand where you are",
    intro: "and find paths toward healing and movement through life’s complexities — through Soul Reading, Inner Knowing and Messages from Deeper Realms.",
    about: "More about my path",
    meetingKicker: "Meeting with me",
    meetingTitle: "Listening beyond words",
    meeting: "When I hold or look at your palm, I listen to what lies beyond lines and familiar frameworks. The meeting is a personal space for reflection, clarity and movement — without fortune-telling.",
    meetingLink: "About the meeting",
    talk: "Let’s talk",
    contactTitle: "Meet in Tel Aviv or by video",
    contactText: "For appointments and questions, you are welcome to contact me directly on WhatsApp.",
    whatsapp: "WhatsApp with Zvi",
    location: "Tel Aviv, Israel",
  },
  de: {
    eyebrow: "Seelenlesen durch die Handfläche",
    name: "Zvi Ben-Ami",
    role: "Spirituelle Begleitung und Seelenlesen",
    messages: "Inneres Wissen · Botschaften aus der Tiefe",
    anchor: <>Tief zuhören <span>·</span> Bewegung und Wachstum ermöglichen</>,
    contact: "Kontakt mit Zvi",
    hello: "Herzlich willkommen",
    introTitle: "Ich bin hier, um Ihnen zu helfen, Ihren gegenwärtigen Ort zu verstehen",
    intro: "und Wege zu Heilung und Bewegung im Labyrinth des Lebens zu finden — durch Seelenlesen, inneres Wissen und Botschaften aus der Tiefe.",
    about: "Mehr über meinen Weg",
    meetingKicker: "Die Session mit mir",
    meetingTitle: "Zuhören jenseits der Worte",
    meeting: "Wenn ich Ihre Hand halte oder betrachte, höre ich auf das, was jenseits von Linien und vertrauten Strukturen liegt. Die Session ist ein persönlicher Raum für Klarheit und Bewegung — ohne Zukunftsvoraussagen.",
    meetingLink: "Mehr über die Session",
    talk: "Lassen Sie uns sprechen",
    contactTitle: "Session in Tel Aviv oder per Video",
    contactText: "Für Termine und Fragen können Sie mich direkt über WhatsApp kontaktieren.",
    whatsapp: "WhatsApp mit Zvi",
    location: "Tel Aviv, Israel",
  },
};

function hrefFor(language: Language, path: string) {
  return language === "he" ? path : `/${language}${path}`;
}

export function HomePage({ language = "he" }: { language?: Language }) {
  const copy = homeCopy[language];
  const direction = language === "he" ? "rtl" : "ltr";

  return (
    <main dir={direction} lang={language}>
      <SiteHeader language={language} />
      <section className="hero">
        <Image src="/media/hero-landscape.jpg" alt="" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.name}</h1>
          <p className="hero-subtitle">{copy.role}</p>
          <p className="hero-messages">{copy.messages}</p>
          <div className="hero-anchor">{copy.anchor}</div>
          <Link className="primary-button" href="#contact">{copy.contact}</Link>
        </div>
      </section>

      <section className="intro section-shell">
        <p className="section-kicker">{copy.hello}</p>
        <h2>{copy.introTitle}</h2>
        <p>{copy.intro}</p>
        <Link className="text-link" href={hrefFor(language, "/about")}>{copy.about}</Link>
      </section>

      <section className="meeting">
        <div className="meeting-copy">
          <p className="section-kicker">{copy.meetingKicker}</p>
          <h2>{copy.meetingTitle}</h2>
          <p>{copy.meeting}</p>
          <Link className="secondary-button" href={hrefFor(language, "/metting-with-tzvi")}>{copy.meetingLink}</Link>
        </div>
        <div className="meeting-image">
          <Image src="/media/zvi-web.jpg" alt={language === "he" ? "צבי בן־עמי" : "Zvi Ben-Ami"} fill sizes="(max-width: 900px) 100vw, 46vw" />
        </div>
      </section>

      <section id="contact" className="contact section-shell">
        <p className="section-kicker">{copy.talk}</p>
        <h2>{copy.contactTitle}</h2>
        <p>{copy.contactText}</p>
        <a className="primary-button dark" href="https://wa.me/972544899258">{copy.whatsapp}</a>
        <p className="contact-details"><a href="tel:+972544899258">054-4899258</a> · {copy.location}</p>
      </section>

      <footer>© {new Date().getFullYear()} {copy.name} · <Link href="/">עברית</Link> · <Link href="/en">English</Link> · <Link href="/de">Deutsch</Link></footer>
    </main>
  );
}
