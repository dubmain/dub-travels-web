/**
 * 글 본문은 `src/data/posts/{lang}/{slug}.md` — 빌드 시 webpack이 문자열로 인라인한다.
 */

import type { SiteLang } from "@/lib/site";

type WebpackRequire = typeof require & {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
    mode: "sync" | "eager" | "lazy" | "lazy-once" | "weak",
  ) => {
    keys(): string[];
    (id: string): string | { default?: string };
  };
};

const ctx = (require as WebpackRequire).context("../data/posts", true, /\.md$/, "sync");
const bodies: Record<string, string> = {};

for (const key of ctx.keys()) {
  const mod = ctx(key);
  const text = typeof mod === "string" ? mod : (mod?.default ?? "");
  const normalized = key.replace(/^\.\//, ""); // ko/slug.md
  const [langRaw, file] = normalized.split("/");
  const slug = (file || "").replace(/\.md$/i, "");
  const lang = langRaw === "en" ? "en" : "ko";
  if (!slug) continue;
  bodies[`${lang}:${slug}`] = text;
}

export function postBodyMarkdown(lang: SiteLang, slug: string): string | undefined {
  return bodies[`${lang}:${slug}`] ?? bodies[`ko:${slug}`];
}
