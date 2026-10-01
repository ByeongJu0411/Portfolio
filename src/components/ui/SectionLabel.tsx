import type { ReactNode } from "react";

/** 섹션 상단의 `<Name />` 코드 라벨 + 가로선 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-code font-medium text-text-sub md:gap-4">
      <span>{children}</span>
      <span aria-hidden="true" className="h-(--border-width) w-10 bg-text md:w-16" />
    </p>
  );
}
