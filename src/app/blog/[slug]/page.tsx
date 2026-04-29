import { notFound } from "next/navigation";
import { marked } from "marked";

import { PostViewTracker } from "@/components/PostViewTracker";
import { loadRuntimeSiteData } from "@/lib/runtime-site";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/** B-03 글 상세 */
export default async function PostPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { lang?: string };
}) {
  const { lang, data } = await loadRuntimeSiteData(searchParams?.lang);
  const post = data.posts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const bodyHtml = marked.parse(post.content || "", { gfm: true });

  return (
    <article>
      <PostViewTracker slug={params.slug} locale={lang} />
      <span className="rounded-full bg-[var(--theme-chip-bg)] px-2 py-0.5 text-xs text-[var(--theme-chip-text)]">{post.categoryTitle}</span>
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
