import { NextResponse } from "next/server";

function internalBase(): string {
  const base = process.env.INTERNAL_API_BASE_URL;
  if (!base?.trim()) return "";
  return base.replace(/\/$/, "");
}

function slugOk(s: string): boolean {
  if (s.length < 1 || s.length > 300) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(s);
}

/** 블로그 Pages 프로젝트별: `blogs.slug`와 덤프 `locale`과 일치해야 한다. */
export async function POST(request: Request) {
  const base = internalBase();
  const secret = (process.env.ADMIN_INTERNAL_SECRET ?? "").trim();
  const blogSlug = (process.env.BLOG_SLUG ?? "").trim().toLowerCase();
  const localeRaw = (process.env.BLOG_SITE_LOCALE ?? "ko").trim().toLowerCase();
  const locale = localeRaw === "en" ? "en" : "ko";

  if (!base || !secret || !blogSlug) {
    return NextResponse.json(
      { success: false, error: { code: "VIEWS_NOT_CONFIGURED", message: "조회수 연동 환경변수가 설정되지 않았습니다." } },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: { code: "VIEWS_BAD_JSON", message: "JSON 본문이 필요합니다." } }, { status: 400 });
  }
  const slug = typeof (body as { slug?: unknown }).slug === "string" ? (body as { slug: string }).slug.trim() : "";
  if (!slugOk(slug)) {
    return NextResponse.json({ success: false, error: { code: "VIEWS_INVALID_SLUG", message: "유효하지 않은 slug입니다." } }, { status: 400 });
  }

  const url = `${base}/v1/portal/posts/view`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Admin-Internal-Secret": secret,
      },
      body: JSON.stringify({ blog_slug: blogSlug, post_slug: slug, locale }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ success: false, error: { code: "VIEWS_UPSTREAM_ERROR", message: "API 호출에 실패했습니다." } }, { status: 502 });
  }

  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    return NextResponse.json({ success: false, error: { code: "VIEWS_UPSTREAM_PARSE", message: "API 응답을 해석하지 못했습니다." } }, { status: 502 });
  }

  return NextResponse.json(json, { status: res.status });
}
