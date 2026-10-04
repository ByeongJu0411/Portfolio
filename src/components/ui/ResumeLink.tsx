"use client";

import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { showToast } from "./Toast";

export const RESUME_PENDING_MESSAGE = "수정 중입니다. 조금만 기다려주세요.";

/**
 * 이력서 링크. 이력서가 준비되기 전(SITE.resumeReady: false)에는
 * 페이지 이동 대신 안내 토스트를 띄우는 버튼으로 렌더링한다.
 */
export function ResumeLink({ className, children }: { className?: string; children: ReactNode }) {
  if (SITE.resumeReady) {
    return (
      <a href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only">(새 창)</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => showToast(RESUME_PENDING_MESSAGE)}
      className={`cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
