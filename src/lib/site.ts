/**
 * 빌드 시 정적 JSON — 런타임 FastAPI 미호출.
 * 언어별 번들(`site.ko.json`, `site.en.json`)을 미리 포함한다.
 */

import rawKo from "@/data/site.ko.json";
import rawEn from "@/data/site.en.json";

export type SiteLang = "ko" | "en";
export type SiteCategory = { slug: string; title: string };
export type SitePost = {
  slug: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  summary: string;
  /** 선택 입력: 목록/베스트 카드에 쓸 썸네일 URL */
  thumbnailUrl?: string;
  publishedAt: string;
  viewCount: number;
};
export type SiteBest = { slug: string; title: string; categoryTitle: string; thumbnailUrl?: string; viewCount: number };

export type SiteTheme = {
  bg: string;
  text: string;
  muted: string;
  border: string;
  surface: string;
  chipBg: string;
  chipText: string;
  accent: string;
  accentStrong: string;
  cardBorderHover: string;
  heroFrom: string;
  heroTo: string;
  heroTitle: string;
  heroSub: string;
  headerBg: string;
  footerBg: string;
  /** 다크 푸터 등에서 본문/보조 텍스트 색 (미지정 시 `text` / `muted`로 폴백) */
  footerFg?: string;
  footerMutedFg?: string;
  prose: string;
};

export type SiteData = {
  blogId: number;
  blogName: string;
  tagline: string;
  theme: SiteTheme;
  categories: SiteCategory[];
  posts: SitePost[];
  best: SiteBest[];
};

const sites: Record<SiteLang, SiteData> = {
  ko: rawKo as SiteData,
  en: rawEn as SiteData,
};

export const site = sites.ko;

export function normalizeSiteLang(raw: string | undefined): SiteLang {
  return raw === "en" ? "en" : "ko";
}

export function siteByLang(lang: SiteLang): SiteData {
  return sites[lang] ?? sites.ko;
}

export function themeToCssVars(theme: SiteTheme): Record<string, string> {
  return {
    "--theme-bg": theme.bg,
    "--theme-text": theme.text,
    "--theme-muted": theme.muted,
    "--theme-border": theme.border,
    "--theme-surface": theme.surface,
    "--theme-chip-bg": theme.chipBg,
    "--theme-chip-text": theme.chipText,
    "--theme-accent": theme.accent,
    "--theme-accent-strong": theme.accentStrong,
    "--theme-card-border-hover": theme.cardBorderHover,
    "--theme-hero-from": theme.heroFrom,
    "--theme-hero-to": theme.heroTo,
    "--theme-hero-title": theme.heroTitle,
    "--theme-hero-sub": theme.heroSub,
    "--theme-header-bg": theme.headerBg,
    "--theme-footer-bg": theme.footerBg,
    "--theme-footer-fg": theme.footerFg ?? theme.text,
    "--theme-footer-muted-fg": theme.footerMutedFg ?? theme.muted,
    "--theme-prose": theme.prose,
  };
}

export function postsByCategory(lang: SiteLang, slug: string): SitePost[] {
  return siteByLang(lang).posts.filter((p) => p.categorySlug === slug);
}

export function postBySlug(lang: SiteLang, slug: string): SitePost | undefined {
  return siteByLang(lang).posts.find((p) => p.slug === slug);
}

export { postBodyMarkdown } from "@/lib/postBodies";
