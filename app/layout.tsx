import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zbenami.com"),
  title: {
    default: "צבי בן־עמי | קריאת נשמה דרך כף היד",
    template: "%s | צבי בן־עמי",
  },
  description: "קריאת נשמה דרך כף היד · ידיעה פנימית · מסרים ממעמקים",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
