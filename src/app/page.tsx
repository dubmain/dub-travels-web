import Link from "next/link";
import Image from "next/image";

import { normalizeSiteLang, siteByLang } from "@/lib/site";

export const runtime = "edge";

const categoryGradients = [
  "from-emerald-950 via-emerald-800 to-teal-900",
  "from-stone-800 via-stone-700 to-zinc-800",
  "from-green-950 via-emerald-900 to-lime-950",
  "from-neutral-900 via-stone-800 to-neutral-900",
  "from-teal-950 via-cyan-900 to-emerald-950",
];

/** B-01 홈 — 쇼핑 블로그와 동일 레이아웃(카피만 여행 톤) */
export default function HomePage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = normalizeSiteLang(searchParams?.lang);
  const s = siteByLang(lang);
  const withLang = (path: string) => `${path}?lang=${lang}`;
  const isEn = lang === "en";
  const thumbnailBySlug = new Map(s.posts.map((p) => [p.slug, p.thumbnailUrl]));
  const firstCategorySlug = s.categories[0]?.slug ?? "general";

  const t = isEn
    ? {
        heroLead: "Curated travel reads — destinations, itineraries, and smart-trip guides.",
        categoriesTitle: "Shop by topic",
        categoriesLead: "Jump into the section you care about.",
        bestTitle: "Editor’s picks",
        bestLead: "Most-read stories right now.",
        viewAll: "See all →",
        latestTitle: "Latest",
        latestLead: "Fresh posts from the magazine.",
        views: "views",
      }
    : {
        heroLead: "여행지·일정·가성비 팁을 한곳에 모은 큐레이션 매거진.",
        categoriesTitle: "카테고리",
        categoriesLead: "관심 주제별로 바로 들어가 보세요.",
        bestTitle: "에디터 픽",
        bestLead: "지금 많이 읽히는 글입니다.",
        viewAll: "전체 보기 →",
        latestTitle: "최신 글",
        latestLead: "방금 올라온 이야기를 만나보세요.",
        views: "조회",
      };

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="relative overflow-hidden rounded-3xl border border-[var(--theme-border)] shadow-sm">
        <Image
          src="/images/hero-train.png"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(9, 10, 12, 0.58), rgba(9, 10, 12, 0.28)), linear-gradient(to bottom, rgba(5, 8, 10, 0.28), rgba(5, 8, 10, 0.68))",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative px-6 py-24 text-center sm:px-10 sm:py-28">
          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[var(--theme-hero-title)] sm:text-5xl">{s.blogName}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--theme-hero-sub)] sm:text-base">{t.heroLead}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={withLang("/best")}
              className="inline-flex items-center justify-center rounded-full bg-[var(--theme-hero-title)] px-6 py-2.5 text-sm font-semibold text-[var(--theme-hero-from)] shadow transition hover:opacity-95"
            >
              {isEn ? "View best" : "베스트 보기"}
            </Link>
            <Link
              href={withLang(`/c/${firstCategorySlug}`)}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-[var(--theme-hero-title)] backdrop-blur transition hover:bg-white/15"
            >
              {isEn ? "Browse categories" : "카테고리 둘러보기"}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[var(--theme-text)]">{t.categoriesTitle}</h2>
            <p className="mt-1 text-sm text-[var(--theme-muted)]">{t.categoriesLead}</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.categories.map((c, i) => {
            const isDealCuration = c.slug === "deal-curation";
            return (
              <Link
                key={c.slug}
                href={withLang(`/c/${c.slug}`)}
                className="group relative flex min-h-[11rem] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition hover:ring-2 hover:ring-[var(--theme-accent)]/40"
              >
                {isDealCuration ? (
                  <>
                    <Image
                      src="/images/category-deal-curation.png"
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15"
                      aria-hidden
                    />
                  </>
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[i % categoryGradients.length]}`}
                    aria-hidden
                  />
                )}
                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                <span className="relative text-xs font-medium uppercase tracking-wider text-white/80">{isEn ? "Category" : "카테고리"}</span>
                <span className="relative mt-1 font-serif text-xl font-semibold">{c.title}</span>
                <span className="relative mt-2 inline-flex text-sm text-white/90 underline-offset-4 group-hover:underline">{isEn ? "Open" : "이동"} →</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[var(--theme-text)]">{t.bestTitle}</h2>
            <p className="mt-1 text-sm text-[var(--theme-muted)]">{t.bestLead}</p>
          </div>
          <Link className="text-sm font-medium text-[var(--theme-accent)] hover:text-[var(--theme-accent-strong)] hover:underline" href={withLang("/best")}>
            {t.viewAll}
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {s.best.map((b, i) => {
            const thumbnailUrl = b.thumbnailUrl ?? thumbnailBySlug.get(b.slug);
            return (
              <Link
                key={b.slug}
                href={withLang(`/blog/${b.slug}`)}
                className="group flex overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm transition hover:border-[var(--theme-card-border-hover)] hover:shadow-md"
              >
                {thumbnailUrl ? (
                  <div className="hidden w-36 shrink-0 sm:block">
                    <img src={thumbnailUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div
                    className={`hidden w-36 shrink-0 bg-gradient-to-br sm:block ${categoryGradients[(i + 2) % categoryGradients.length]}`}
                    aria-hidden
                  />
                )}
                <div className="flex min-w-0 flex-1 flex-col p-5">
                  <span className="w-fit rounded-full bg-[var(--theme-chip-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--theme-chip-text)]">{b.categoryTitle}</span>
                  <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-[var(--theme-text)] group-hover:text-[var(--theme-accent-strong)]">{b.title}</h3>
                  <p className="mt-auto pt-3 text-xs text-[var(--theme-muted)]">
                    {t.views} {b.viewCount.toLocaleString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-semibold text-[var(--theme-text)]">{t.latestTitle}</h2>
          <p className="mt-1 text-sm text-[var(--theme-muted)]">{t.latestLead}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {s.posts.map((p) => (
            <Link
              key={p.slug}
              href={withLang(`/blog/${p.slug}`)}
              className="flex flex-col rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm transition hover:border-[var(--theme-card-border-hover)] hover:shadow-md"
            >
              {p.thumbnailUrl ? (
                <div className="-m-5 mb-4 overflow-hidden rounded-t-2xl border-b border-[var(--theme-border)]">
                  <img src={p.thumbnailUrl} alt="" className="h-44 w-full object-cover" loading="lazy" />
                </div>
              ) : null}
              <span className="text-xs font-medium text-[var(--theme-muted)]">{p.categoryTitle}</span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-[var(--theme-text)]">{p.title}</h3>
              {p.summary ? <p className="mt-2 line-clamp-2 text-sm text-[var(--theme-muted)]">{p.summary}</p> : null}
              <span className="mt-4 text-xs text-[var(--theme-muted)]">{p.publishedAt}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
