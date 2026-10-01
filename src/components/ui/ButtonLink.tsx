import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline";

const BASE =
  "h-(--button-height) items-center justify-center gap-2.5 rounded-button text-body font-medium whitespace-nowrap";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-text text-on-dark",
  outline: "border-(length:--border-width) border-text text-text hover:text-link-hover hover:border-link-hover",
};

const DISPLAY = {
  always: "inline-flex",
  mobile: "inline-flex md:hidden",
  desktop: "hidden md:inline-flex",
} as const;

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  /** 특정 브레이크포인트에서만 보이게 할 때 */
  showOn?: keyof typeof DISPLAY;
  className?: string;
  children: ReactNode;
};

/** 버튼 모양의 링크. http로 시작하면 새 창으로 여는 외부 링크로 렌더링한다. */
export function ButtonLink({
  href,
  variant = "solid",
  showOn = "always",
  className = "",
  children,
}: ButtonLinkProps) {
  const classes = `${BASE} ${DISPLAY[showOn]} ${VARIANTS[variant]} ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="sr-only">(새 창)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
