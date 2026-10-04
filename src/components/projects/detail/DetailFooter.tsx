"use client";

import { ArrowRightIcon, CodeIcon, GlobeIcon } from "@/components/icons";
import { showToast } from "@/components/ui/Toast";
import styles from "./Detail.module.css";

type DetailFooterProps = {
  githubUrl: string | null;
  siteUrl: string | null;
  projectName: string;
  nextName: string;
  onNext: () => void;
};

const BUTTON =
  "inline-flex h-(--project-button-height) items-center justify-center gap-2 rounded-button text-button-sm font-medium";
const OUTLINE = `${BUTTON} min-w-(--project-button-height) border-(length:--border-width) border-text px-3.5 sm:px-5`;

/** 6. 하단 고정 바 — GitHub · 사이트 보기 · 다음 프로젝트 (모바일은 앞의 둘을 아이콘만) */
export function DetailFooter({ githubUrl, siteUrl, projectName, nextName, onNext }: DetailFooterProps) {
  return (
    <footer
      className={`${styles.footer} mt-10 flex items-center justify-between gap-2 px-5 py-4 sm:mt-14 sm:px-16 sm:py-5`}
    >
      <div className="flex gap-2">
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.outline} ${OUTLINE}`}>
            <CodeIcon size={18} />
            <span className="sr-only">{projectName} </span>
            <span className="sr-only sm:not-sr-only">GitHub</span>
            <span className="sr-only">(새 창)</span>
          </a>
        )}
        {siteUrl ? (
          <a href={siteUrl} target="_blank" rel="noopener noreferrer" className={`${styles.outline} ${OUTLINE}`}>
            <GlobeIcon size={18} />
            <span className="sr-only">{projectName} </span>
            <span className="sr-only sm:not-sr-only">사이트 보기</span>
            <span className="sr-only">(새 창)</span>
          </a>
        ) : (
          // TODO: projects.ts의 siteUrl을 채우면 링크로 바뀐다
          <button
            type="button"
            onClick={() => showToast("사이트 주소를 준비 중입니다. 조금만 기다려주세요.")}
            className={`${styles.outline} ${OUTLINE} cursor-pointer`}
          >
            <GlobeIcon size={18} />
            <span className="sr-only">{projectName} </span>
            <span className="sr-only sm:not-sr-only">사이트 보기</span>
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onNext}
        className={`${styles.next} ${BUTTON} cursor-pointer bg-text px-4.5 text-on-dark sm:px-5.5`}
      >
        다음
        <span className="sm:hidden"> 프로젝트</span>
        <span className="hidden sm:inline"> · </span>
        {/* 모바일은 "다음 프로젝트"만 보이지만 스크린리더에는 이름까지 읽힌다 */}
        <span className="sr-only sm:not-sr-only">{nextName}</span>
        <ArrowRightIcon />
      </button>
    </footer>
  );
}
