"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { normalizeSiteLang, siteByLang } from "@/lib/site";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function HeaderInner() {
  const searchParams = useSearchParams();
  const lang = normalizeSiteLang(searchParams.get("lang") ?? undefined);
  const s = siteByLang(lang);
  const withLang = (path: string) => `${path}?lang=${lang}`;
  const isEn = lang === "en";
  const [open, setOpen] = useState(false);

  const navPill =
    "inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.8125rem] font-medium leading-none text-[var(--theme-muted)] transition hover:text-[var(--theme-text)] sm:px-3 sm:text-sm";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--theme-border)] bg-[var(--theme-header-bg)] backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid h-[4.25rem] w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:gap-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4">
          <Link href={withLang("/")} className="min-w-0 justify-self-start" onClick={() => setOpen(false)}>
            <span className="block max-w-[11rem] truncate font-serif text-lg font-semibold leading-tight tracking-tight text-[var(--theme-text)] sm:max-w-[15rem] sm:text-xl lg:max-w-[min(17rem,100%)]">
              {s.blogName}
            </span>
          </Link>

          <nav
            className="hidden min-w-0 w-full justify-self-stretch lg:col-start-2 lg:block"
            aria-label="Main"
          >
            <div className="flex w-full min-w-0 flex-nowrap items-center justify-start gap-0.5 overflow-x-auto overflow-y-hidden py-0.5 sm:gap-1.5">
              <Link className={navPill} href={withLang("/")}>
                {isEn ? "Home" : "홈"}
              </Link>
              <Link className={navPill} href={withLang("/best")}>
                {isEn ? "Best" : "베스트"}
              </Link>
              {s.categories.map((c) => (
                <Link key={c.slug} className={navPill} href={withLang(`/c/${c.slug}`)}>
                  {c.title}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex min-w-0 items-center justify-end gap-2 justify-self-end lg:col-start-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] lg:hidden"
              aria-expanded={open}
              aria-label={open ? (isEn ? "Close menu" : "메뉴 닫기") : isEn ? "Open menu" : "메뉴 열기"}
              onClick={() => setOpen((v) => !v)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-[var(--theme-border)] pb-4 lg:hidden">
            <div className="flex justify-end py-3 sm:hidden">
              <LanguageSwitcher />
            </div>
            <nav className="flex max-w-full flex-col gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Mobile">
              <Link className="whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--theme-text)] hover:bg-[var(--theme-chip-bg)]" href={withLang("/")} onClick={() => setOpen(false)}>
                {isEn ? "Home" : "홈"}
              </Link>
              <Link className="whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--theme-text)] hover:bg-[var(--theme-chip-bg)]" href={withLang("/best")} onClick={() => setOpen(false)}>
                {isEn ? "Best" : "베스트"}
              </Link>
              {s.categories.map((c) => (
                <Link key={c.slug} className="whitespace-nowrap rounded-lg px-3 py-2.5 text-sm text-[var(--theme-muted)] hover:bg-[var(--theme-chip-bg)] hover:text-[var(--theme-text)]" href={withLang(`/c/${c.slug}`)} onClick={() => setOpen(false)}>
                  {c.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function Header() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-40 border-b border-[var(--theme-border)] bg-[var(--theme-header-bg)]">
          <div className="mx-auto h-[4.25rem] max-w-6xl px-4 py-3 text-xs text-[var(--theme-muted)]">…</div>
        </header>
      }
    >
      <HeaderInner />
    </Suspense>
  );
}
