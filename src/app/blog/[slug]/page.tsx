import { notFound } from "next/navigation";
import { marked } from "marked";

import { PostViewTracker } from "@/components/PostViewTracker";
import { postBodyMarkdown, postBySlug } from "@/lib/site";

export const runtime = "edge";

/** B-03 글 상세 — 본문은 `src/data/posts/{slug}.md` */
export default function PostPage({ params }: { params: { slug: string } }) {
  const post = postBySlug(params.slug);
  if (!post) notFound();
  const body = postBodyMarkdown(params.slug);
  if (body === undefined) notFound();
  const bodyHtml = marked.parse(body, { gfm: true });

  return (
    <article>
      <PostViewTracker slug={params.slug} />
      <span className="rounded-full bg-[var(--theme-chip-bg)] px-2 py-0.5 text-xs text-[var(--theme-chip-text)]">
        {post.categoryTitle}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-[var(--theme-text)]">{post.title}</h1>
      <p className="mt-2 text-sm text-[var(--theme-muted)]">
        {post.publishedAt} · 조회 {post.viewCount.toLocaleString()}
      </p>
      <div
        className="prose prose-slate mt-8 max-w-3xl leading-relaxed text-[var(--theme-prose)] prose-headings:text-[var(--theme-text)] prose-strong:text-[var(--theme-text)] prose-a:text-[var(--theme-accent-strong)]"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </article>
  );
}
