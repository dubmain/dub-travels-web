import { postBodyMarkdown, site, type SiteData } from "@/lib/site";

type SiteBundlePost = SiteData["posts"][number] & { content: string };
export type RuntimeSiteData = Omit<SiteData, "posts"> & { posts: SiteBundlePost[] };

export type SiteLang = "ko" | "en";

export function normalizeSiteLang(raw: string | undefined): SiteLang {
  return raw === "en" ? "en" : "ko";
}

function fallbackSiteData(): RuntimeSiteData {
  return {
    ...site,
    posts: site.posts.map((p) => ({
      ...p,
      content: postBodyMarkdown(p.slug) ?? "",
    })),
  };
}

export async function loadRuntimeSiteData(langRaw: string | undefined): Promise<{ lang: SiteLang; data: RuntimeSiteData }> {
  const lang = normalizeSiteLang(langRaw);
  const base = (process.env.INTERNAL_API_BASE_URL ?? "").trim().replace(/\/$/, "");
  const secret = (process.env.ADMIN_INTERNAL_SECRET ?? "").trim();
  const blogSlug = (process.env.BLOG_SLUG ?? "").trim().toLowerCase();

  if (!base || !secret || !blogSlug) {
    return { lang, data: fallbackSiteData() };
  }

  try {
    const res = await fetch(`${base}/v1/admin/blogs/${encodeURIComponent(blogSlug)}/site-bundle?locale=${lang}`, {
      method: "GET",
      headers: { "X-Admin-Internal-Secret": secret },
      cache: "no-store",
    });
    if (!res.ok) return { lang, data: fallbackSiteData() };
    const json = (await res.json()) as { success?: boolean; data?: RuntimeSiteData };
    if (!json?.success || !json.data) return { lang, data: fallbackSiteData() };
    return { lang, data: json.data };
  } catch {
    return { lang, data: fallbackSiteData() };
  }
}
