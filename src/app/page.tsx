import Link from "next/link";

import { normalizeSiteLang, siteByLang } from "@/lib/site";

/** B-01 홈 */
export default function HomePage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = normalizeSiteLang(searchParams?.lang);
  const s = siteByLang(lang);
  const withLang = (path: string) => `${path}?lang=${lang}`;

  return (
    <div className="space-y-10">
      <section className="rounded-2xl px-6 py-12" style={{ backgroundImage: `linear-gradient(to bottom right, var(--theme-hero-from), var(--theme-hero-to))` }}>
        <h1 className="text-2xl font-bold sm:text-3xl text-[var(--theme-hero-title)]">{s.tagline}</h1>
        <p className="mt-2 text-sm text-[var(--theme-hero-sub)]">샘플 정적 데이터 — 빌드 시 JSON으로 교체</p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-[var(--theme-text)]">베스트 글</h2>
        <ul className="space-y-2">
          {s.best.map((b) => (
            <li key={b.slug} className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-[var(--theme-chip-bg)] px-2 py-0.5 text-xs text-[var(--theme-chip-text)]">{b.categoryTitle}</span>
              <Link className="font-medium text-[var(--theme-accent)] hover:text-[var(--theme-accent-strong)] hover:underline" href={withLang(`/blog/${b.slug}`)}>{b.title}</Link>
              <span className="text-[var(--theme-muted)]">· {b.viewCount.toLocaleString()} views</span>
            </li>
          ))}
        </ul>
        <Link className="mt-3 inline-block text-sm text-[var(--theme-accent)] hover:text-[var(--theme-accent-strong)] hover:underline" href={withLang('/best')}>전체 보기 →</Link>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-[var(--theme-text)]">최신 글</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {s.posts.map((p) => (
            <Link key={p.slug} href={withLang(`/blog/${p.slug}`)} className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 shadow-sm hover:border-[var(--theme-card-border-hover)]">
              <span className="text-xs text-[var(--theme-muted)]">{p.categoryTitle}</span>
              <h3 className="mt-1 font-semibold text-[var(--theme-text)]">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-[var(--theme-muted)]">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
