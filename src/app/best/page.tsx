import Link from "next/link";

import { site } from "@/lib/site";

/** B-10 베스트 */
export default function BestPage() {
  return (
    <div>
      <p className="mb-4 text-sm text-[var(--theme-muted)]">전일 기준 인기 글 (샘플 정적 데이터)</p>
      <ul className="space-y-3">
        {site.best.map((b) => (
          <li
            key={b.slug}
            className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4"
          >
            <span className="rounded-full bg-[var(--theme-chip-bg)] px-2 py-0.5 text-xs text-[var(--theme-chip-text)]">
              {b.categoryTitle}
            </span>
            <Link
              className="mt-2 block text-lg font-medium text-[var(--theme-accent)] hover:text-[var(--theme-accent-strong)] hover:underline"
              href={`/blog/${b.slug}`}
            >
              {b.title}
            </Link>
            <p className="mt-1 text-sm text-[var(--theme-muted)]">조회 {b.viewCount.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
