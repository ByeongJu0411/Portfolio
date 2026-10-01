import type { ReactNode } from "react";

type ChipProps = {
  variant?: "solid" | "outline";
  /** 앞에 포인트 컬러 상태 점을 표시 */
  dot?: boolean;
  children: ReactNode;
};

export function Chip({ variant = "outline", dot = false, children }: ChipProps) {
  const variantClass =
    variant === "solid" ? "bg-text text-on-dark" : "border border-border text-text-muted";

  return (
    <span
      className={`inline-flex h-7 items-center gap-1.75 rounded-pill px-3 text-small font-medium md:h-8 md:gap-2 md:px-3.5 ${variantClass}`}
    >
      {dot && <span aria-hidden="true" className="size-1.75 rounded-full bg-accent md:size-2" />}
      {children}
    </span>
  );
}
