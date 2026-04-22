import Link from "next/link";
import { notFound } from "next/navigation";


import { site, postsByCategory } from "@/lib/site";

/** B-02 카테고리별 글 목록 */
export default function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const cat = site.categories.find((c) => c.slug === params.categorySlug);
  if (!cat) notFound();
  const posts = postsByCategory(params.categorySlug);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-[var(--theme-text)]">{cat.title}</h1>
      <p className="mb-6 text-sm text-[var(--theme-muted)]">`/c/{params.categorySlug}` — 발행 글 목록</p>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              className="text-[var(--theme-accent)] hover:text-[var(--theme-accent-strong)] hover:underline"
              href={`/blog/${p.slug}`}
            >
              {p.title}
            </Link>
            <p className="text-sm text-[var(--theme-muted)]">{p.summary}</p>
          </li>
        ))}
      </ul>
      {posts.length === 0 && <p className="text-[var(--theme-muted)]">이 카테고리에 글이 없습니다.</p>}
    </div>
  );
}
