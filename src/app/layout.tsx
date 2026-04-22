import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site, themeToCssVars } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.blogName} — ${site.tagline}`,
  description: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={themeToCssVars(site.theme) as CSSProperties}>
        <Header />
        <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
