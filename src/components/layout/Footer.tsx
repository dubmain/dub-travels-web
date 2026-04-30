"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { normalizeSiteLang, siteByLang } from "@/lib/site";

function FooterInner() {
  const searchParams = useSearchParams();
  const lang = normalizeSiteLang(searchParams.get("lang") ?? undefined);
  const s = siteByLang(lang);
  const withLang = (path: string) => `${path}?lang=${lang}`;
  const isEn = lang === "en";

  return (
    <footer className="mt-auto border-t border-white/10 bg-[var(--theme-footer-bg)] text-[var(--theme-footer-fg)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-semibold tracking-tight">{s.blogName}</p>
            <p className="mt-1 text-sm text-[var(--theme-footer-muted-fg)]">{s.tagline}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-footer-muted-fg)]">
              {isEn ? "Explore" : "둘러보기"}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-[var(--theme-footer-muted-fg)] transition hover:text-[var(--theme-accent)]" href={withLang("/")}>
                  {isEn ? "Home" : "홈"}
                </Link>
              </li>
              <li>
                <Link className="text-[var(--theme-footer-muted-fg)] transition hover:text-[var(--theme-accent)]" href={withLang("/best")}>
                  {isEn ? "Best" : "베스트"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-footer-muted-fg)]">
              {isEn ? "Categories" : "카테고리"}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {s.categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link className="text-[var(--theme-footer-muted-fg)] transition hover:text-[var(--theme-accent)]" href={withLang(`/c/${c.slug}`)}>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-footer-muted-fg)]">
              {isEn ? "Legal" : "약관"}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-[var(--theme-footer-muted-fg)] transition hover:text-[var(--theme-accent)]" href={withLang("/terms")}>
                  {isEn ? "Terms" : "이용약관"}
                </Link>
              </li>
              <li>
                <Link className="text-[var(--theme-footer-muted-fg)] transition hover:text-[var(--theme-accent)]" href={withLang("/privacy")}>
                  {isEn ? "Privacy" : "개인정보처리방침"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-[var(--theme-footer-muted-fg)]">
          © {new Date().getFullYear()} {s.blogName}. {isEn ? "All rights reserved." : "무단 전재·재배포를 금합니다."}
        </p>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <Suspense
      fallback={
        <footer className="mt-auto border-t border-white/10 bg-[var(--theme-footer-bg)] py-8 text-center text-xs text-[var(--theme-footer-muted-fg)]">
          …
        </footer>
      }
    >
      <FooterInner />
    </Suspense>
  );
}
