import { notFound } from "next/navigation";

export const runtime = "edge";


import { postBodyMarkdown, postBySlug } from "@/lib/site";

/** B-03 글 상세 — 본문은 `src/data/posts/{slug}.md` */
export default function PostPage({ params }: { params: { slug: string } }) {
  const post = postBySlug(params.slug);
  if (!post) notFound();
  const body = postBodyMarkdown(params.slug);
  if (body === undefined) notFound();

  return (
    <article>
      <span className="rounded-full bg-[var(--theme-chip-bg)] px-2 py-0.5 text-xs text-[var(--theme-chip-text)]">
        {post.categoryTitle}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-[var(--theme-text)]">{post.title}</h1>
      <p className="mt-2 text-sm text-[var(--theme-muted)]">
        {post.publishedAt} · 조회 {post.viewCount.toLocaleString()}
      </p>
      <div className="mt-8 max-w-3xl whitespace-pre-wrap leading-relaxed text-[var(--theme-prose)]">{body}</div>
    </article>
  );
}
