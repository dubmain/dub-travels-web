import Link from "next/link";
import { Suspense } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { site } from "@/lib/site";

/** B-LAYOUT 헤더 — 홈 → 베스트 → 카테고리 5개(독립 링크). */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--theme-border)] bg-[var(--theme-header-bg)] backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">
        <Link href="/" className="font-semibold text-[var(--theme-text)]">
          {site.blogName}
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link className="text-[var(--theme-muted)] hover:text-[var(--theme-text)]" href="/">
            홈
          </Link>
          <Link className="text-[var(--theme-muted)] hover:text-[var(--theme-text)]" href="/best">
            베스트
          </Link>
          {site.categories.map((c) => (
            <Link
              key={c.slug}
              className="text-[var(--theme-muted)] hover:text-[var(--theme-text)]"
              href={`/c/${c.slug}`}
            >
              {c.title}
            </Link>
          ))}
        </nav>
        <Suspense fallback={<div className="ml-auto text-xs text-[var(--theme-muted)]">EN · 한국어</div>}><LanguageSwitcher /></Suspense>
      </div>
    </header>
  );
}
