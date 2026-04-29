"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("lang") === "en" ? "en" : "ko";

  function switchLang(lang: "ko" | "en") {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="ml-auto flex items-center gap-1 text-xs">
      <button type="button" onClick={() => switchLang("en")} className={`rounded px-2 py-1 ${current === "en" ? "bg-[var(--theme-chip-bg)] text-[var(--theme-chip-text)]" : "text-[var(--theme-muted)]"}`}>EN</button>
      <button type="button" onClick={() => switchLang("ko")} className={`rounded px-2 py-1 ${current === "ko" ? "bg-[var(--theme-chip-bg)] text-[var(--theme-chip-text)]" : "text-[var(--theme-muted)]"}`}>한국어</button>
    </div>
  );
}
