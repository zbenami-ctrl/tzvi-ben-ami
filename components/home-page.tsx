import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./site-header";

export function HomePage() {
  return (
    <main>
      <SiteHeader />
      <section className="hero">
        <Image src="/media/hero-landscape.jpg" alt="אור מעל נוף פתוח" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">קריאת נשמה דרך כף היד</p>
          <h1>צבי בן־עמי</h1>
          <p className="hero-subtitle">מטפל אל מרחבי העומק</p>
          <p className="hero-messages">ידיעה פנימית · מסרים ממעמקים</p>
          <div className="hero-anchor">להקשיב לעומק <span>·</span> לאפשר תנועה וצמיחה</div>
          <Link className="primary-button" href="#contact">יצירת קשר עם צבי</Link>
        </div>
      </section>

      <section className="intro section-shell">
        <p className="section-kicker">נעים להכיר</p>
        <h2>אני כאן כדי לעזור לך להבין את המקום שבו את או אתה נמצאים</h2>
        <p>ולמצוא דרכי ריפוי ותנועה בתוך מבוכי החיים — דרך קריאת נשמה, ידיעה פנימית ומסרים ממעמקים.</p>
        <Link className="text-link" href="/about">עוד על הדרך שלי</Link>
      </section>

      <section className="meeting">
        <div className="meeting-copy">
          <p className="section-kicker">הפגישה איתי</p>
          <h2>הקשבה מעבר למילים</h2>
          <p>כשאני אוחז או מתבונן בכף היד, אני מקשיב למה שנמצא מעבר לקווים ולמסגרות. הפגישה היא מרחב אישי של התבוננות, בהירות ותנועה — ללא ניבוי עתידות.</p>
          <Link className="secondary-button" href="/metting-with-tzvi">לפרטים על הפגישה</Link>
        </div>
        <div className="meeting-image">
          <Image src="/media/zvi-web.jpg" alt="צבי בן־עמי" fill sizes="(max-width: 800px) 100vw, 45vw" />
        </div>
      </section>

      <section id="contact" className="contact section-shell">
        <p className="section-kicker">בואו נדבר</p>
        <h2>פגישה בתל אביב או בשיחת וידאו</h2>
        <p>לתיאום פגישה ולשאלות אפשר לפנות אליי ישירות ב־WhatsApp.</p>
        <a className="primary-button dark" href="https://wa.me/972544899258">WhatsApp עם צבי</a>
        <p className="contact-details"><a href="tel:+972544899258">054-4899258</a> · תל אביב, ישראל</p>
      </section>

      <footer>© {new Date().getFullYear()} צבי בן־עמי · <Link href="/en">English</Link> · <Link href="/de">Deutsch</Link></footer>
    </main>
  );
}
