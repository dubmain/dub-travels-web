"use client";

import { useEffect } from "react";

/**
 * 글 상세 진입 시 동일 오리진 `POST /api/views`로 조회수를 1 올린다.
 * FastAPI는 Route Handler가 `INTERNAL_API_BASE_URL`로만 호출한다.
 */
export function PostViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const s = (slug || "").trim();
    if (!s || s.includes("/") || s.includes("..")) return;
    const payload = JSON.stringify({ slug: s });
    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon("/api/views", new Blob([payload], { type: "application/json" }));
      } else {
        void fetch("/api/views", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: payload,
          keepalive: true,
        });
      }
    } catch {
      /* ignore */
    }
  }, [slug]);

  return null;
}
