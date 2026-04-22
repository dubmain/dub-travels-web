import { notFound } from "next/navigation";

import { postBySlug } from "@/lib/site";

/** B-03 글 상세 (마크다운은 추후 MDX) */
export default function PostPage({ params }: { params: { slug: string } }) {
  const post = postBySlug(params.slug);
  if (!post) notFound();

  return (
    <article>
      <span className="rounded-full bg-[var(--theme-chip-bg)] px-2 py-0.5 text-xs text-[var(--theme-chip-text)]">
        {post.categoryTitle}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-[var(--theme-text)]">{post.title}</h1>
      <p className="mt-2 text-sm text-[var(--theme-muted)]">
        {post.publishedAt} · 조회 {post.viewCount.toLocaleString()}
      </p>
      <div className="mt-8 max-w-3xl whitespace-pre-wrap leading-relaxed text-[var(--theme-prose)]">{post.content}</div>
    </article>
  );
}
