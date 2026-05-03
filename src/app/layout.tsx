import type { Metadata } from "next";
import { Noto_Sans_KR, Playfair_Display } from "next/font/google";
import type { CSSProperties } from "react";

import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site, themeToCssVars } from "@/lib/site";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.blogName} — ${site.tagline}`,
  description: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${noto.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased" style={themeToCssVars(site.theme) as CSSProperties}>
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 pb-8 pt-0 sm:pb-10">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
