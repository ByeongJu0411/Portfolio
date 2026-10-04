"use client";

import type { ReactNode } from "react";
import { useDetailNavigation } from "./useDetailNavigation";

type DetailTriggerProps = {
  slug: string;
  className?: string;
  /**
   * 대표 이미지처럼 같은 모달을 여는 두 번째 진입점.
   * 마우스 전용으로 두어 키보드·스크린리더에서 같은 목적지가 두 번 나오지 않게 한다.
   */
  mouseOnly?: boolean;
  children: ReactNode;
};

export function DetailTrigger({ slug, className, mouseOnly = false, children }: DetailTriggerProps) {
  const { open } = useDetailNavigation();

  return (
    <button
      type="button"
      onClick={() => open(slug)}
      // 모달이 닫히면 이 버튼으로 포커스를 돌려준다
      data-detail-trigger={mouseOnly ? undefined : slug}
      tabIndex={mouseOnly ? -1 : undefined}
      aria-hidden={mouseOnly || undefined}
      className={className}
    >
      {children}
    </button>
  );
}
