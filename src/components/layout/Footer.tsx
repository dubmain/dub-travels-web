import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--theme-border)] bg-[var(--theme-footer-bg)] py-8 text-center text-sm text-[var(--theme-muted)]">
      <Link className="hover:underline hover:text-[var(--theme-accent-strong)]" href="/terms">
        이용약관
      </Link>
      {" · "}
      <Link className="hover:underline hover:text-[var(--theme-accent-strong)]" href="/privacy">
        개인정보처리방침
      </Link>
    </footer>
  );
}
