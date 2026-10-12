import type { Metadata } from "next";
import { Playpen_Sans_Hebrew, Varela_Round } from "next/font/google";
import "./globals.css";

// Rounded handwriting for the hero headings — Zvi's request.
const handwritingFont = Playpen_Sans_Hebrew({
  weight: "300",
  subsets: ["hebrew", "latin"],
  display: "swap",
  variable: "--font-handwriting",
});

// Rounded face for section headings.
const displayFont = Varela_Round({
  weight: "400",
  subsets: ["hebrew", "latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zbenami.com"),
  title: {
    default: "צבי בן-עמי | קריאת נשמה דרך כף היד",
    template: "%s | צבי בן-עמי",
  },
  description: "קריאת נשמה דרך כף היד · ידיעה פנימית · מסרים ממעמקים",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${displayFont.variable} ${handwritingFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
