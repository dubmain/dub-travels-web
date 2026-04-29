"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { normalizeSiteLang, siteByLang } from "@/lib/site";

function HeaderInner() {
  const searchParams = useSearchParams();
  const lang = normalizeSiteLang(searchParams.get("lang") ?? undefined);
  const s = siteByLang(lang);
  const withLang = (path: string) => `${path}?lang=${lang}`;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--theme-border)] bg-[var(--theme-header-bg)] backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">
        <Link href={withLang("/")} className="font-semibold text-[var(--theme-text)]">
          {s.blogName}
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link className="text-[var(--theme-muted)] hover:text-[var(--theme-text)]" href={withLang("/")}>홈</Link>
          <Link className="text-[var(--theme-muted)] hover:text-[var(--theme-text)]" href={withLang("/best")}>베스트</Link>
          {s.categories.map((c) => (
            <Link key={c.slug} className="text-[var(--theme-muted)] hover:text-[var(--theme-text)]" href={withLang(`/c/${c.slug}`)}>
              {c.title}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export function Header() {
  return <Suspense fallback={<header className="sticky top-0 z-40 border-b border-[var(--theme-border)] bg-[var(--theme-header-bg)]"><div className="mx-auto max-w-5xl px-4 py-3 text-xs text-[var(--theme-muted)]">...</div></header>}><HeaderInner /></Suspense>;
}
