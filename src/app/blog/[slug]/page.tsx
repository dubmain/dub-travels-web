import { notFound } from "next/navigation";
import { marked } from "marked";

import { PostViewTracker } from "@/components/PostViewTracker";
import { normalizeSiteLang, postBodyMarkdown, postBySlug } from "@/lib/site";

export const runtime = "edge";

/** B-03 글 상세 */
export default function PostPage({ params, searchParams }: { params: { slug: string }; searchParams?: { lang?: string } }) {
  const lang = normalizeSiteLang(searchParams?.lang);
  const post = postBySlug(lang, params.slug);
  if (!post) notFound();
  const body = postBodyMarkdown(lang, params.slug);
  if (body === undefined) notFound();
  const bodyHtml = marked.parse(body, { gfm: true });

  return (
    <article>
      <PostViewTracker slug={params.slug} locale={lang} />
      <span className="rounded-full bg-[var(--theme-chip-bg)] px-2 py-0.5 text-xs text-[var(--theme-chip-text)]">{post.categoryTitle}</span>
      <h1 className="mt-3 text-3xl font-bold text-[var(--theme-text)]">{post.title}</h1>
      <p className="mt-2 text-sm text-[var(--theme-muted)]">{post.publishedAt} · 조회 {post.viewCount.toLocaleString()}</p>
      <div className="prose prose-slate mt-8 max-w-3xl leading-relaxed text-[var(--theme-prose)] prose-headings:text-[var(--theme-text)] prose-strong:text-[var(--theme-text)] prose-a:text-[var(--theme-accent-strong)]" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </article>
  );
}
