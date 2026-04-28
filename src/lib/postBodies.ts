/**
 * 글 본문은 `src/data/posts/{slug}.md` — 빌드 시 webpack이 문자열로 인라인한다.
 * Cloudflare Edge 런타임에서도 fs 없이 동작하도록 require.context 사용.
 */

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

const ctx = (require as WebpackRequire).context("../data/posts", false, /\.md$/, "sync");

const bodies: Record<string, string> = {};
for (const key of ctx.keys()) {
  const slug = key.replace(/^\.\//, "").replace(/\.md$/i, "");
  const mod = ctx(key);
  bodies[slug] = typeof mod === "string" ? mod : (mod?.default ?? "");
}

export function postBodyMarkdown(slug: string): string | undefined {
  if (!Object.prototype.hasOwnProperty.call(bodies, slug)) return undefined;
  return bodies[slug];
}
