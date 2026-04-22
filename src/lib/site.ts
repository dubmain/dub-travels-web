/**
 * 빌드 시 정적 JSON(추후 스크립트 생성) — 런타임 FastAPI 미호출.
 */

import raw from "@/data/site.json";

export type SiteCategory = { slug: string; title: string };
export type SitePost = {
  slug: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  summary: string;
  content: string;
  publishedAt: string;
  viewCount: number;
};
export type SiteBest = { slug: string; title: string; categoryTitle: string; viewCount: number };

/** 블로그별 시각 테마 — `site.json`의 `theme`와 동일 키. */
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

export const site = raw as SiteData;

/** `<body style={...}>`용 CSS 변수 맵 */
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
    "--theme-prose": theme.prose,
  };
}

export function postsByCategory(slug: string): SitePost[] {
  return site.posts.filter((p) => p.categorySlug === slug);
}

export function postBySlug(slug: string): SitePost | undefined {
  return site.posts.find((p) => p.slug === slug);
}
