"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./AutoHideHeader.module.css";

type HeaderState = "top" | "shown" | "hidden";

/** 방향이 바뀌었다고 보기 위한 최소 스크롤 양 — 미세한 흔들림에 반응하지 않게 */
const DIRECTION_THRESHOLD = 8;

/**
 * 스크롤 방향에 따라 헤더를 숨기고 보여주는 sticky 래퍼.
 * - top: 페이지 맨 위 — 시안 그대로 투명 배경
 * - shown: 스크롤 중 위로 올림 — 반투명 배경의 컴팩트 바
 * - hidden: 아래로 내림 — 화면 위로 숨김 (메뉴가 열려 있거나 키보드 포커스가 안에 있으면 CSS에서 유지)
 */
export function AutoHideHeader({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HeaderState>("top");

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    function update() {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;

      if (y <= 0) {
        setState("top");
      } else if (delta > DIRECTION_THRESHOLD) {
        setState("hidden");
      } else if (delta < -DIRECTION_THRESHOLD) {
        setState("shown");
      } else {
        return; // 임계값 이하의 움직임은 기준점(lastY)을 유지해 누적
      }
      lastY = y;
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header data-state={state} className={styles.header}>
      {children}
    </header>
  );
}
