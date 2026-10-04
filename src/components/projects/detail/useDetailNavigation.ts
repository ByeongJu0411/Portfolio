"use client";

import { usePathname, useRouter } from "next/navigation";

/**
 * 사이트 안에서 연 모달인지 기억한다.
 * - 사이트 안에서 열었으면 닫을 때 뒤로가기 → 히스토리에 ?project가 남지 않음
 * - 공유 링크로 바로 들어왔으면 ?project만 지움 → 사이트 밖으로 나가지 않음
 */
let openedInApp = false;

export function resetOpenedInApp() {
  openedInApp = false;
}

export function useDetailNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return {
    open(slug: string) {
      openedInApp = true;
      router.push(`${pathname}?project=${slug}`, { scroll: false });
    },
    /** 모달을 닫지 않고 내용만 바꾼다 — 히스토리를 늘리지 않아 뒤로가기 한 번에 닫힌다 */
    show(slug: string) {
      router.replace(`${pathname}?project=${slug}`, { scroll: false });
    },
    close() {
      if (openedInApp) {
        openedInApp = false;
        router.back();
      } else {
        router.replace(pathname, { scroll: false });
      }
    },
  };
}
