"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { PROJECTS } from "@/data/projects";
import { getNextDetailSlug, getProjectDetail, type DetailAssets } from "@/data/projectDetails";
import { CloseIcon } from "@/components/icons";
import { DetailCases } from "./DetailCases";
import { DetailImage } from "./DetailImage";
import { DetailFooter } from "./DetailFooter";
import { DetailHeader } from "./DetailHeader";
import { BulletList, DetailSection } from "./DetailSection";
import { resetOpenedInApp, useDetailNavigation } from "./useDetailNavigation";
import styles from "./Detail.module.css";

const TITLE_ID = "project-detail-title";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * 프로젝트 상세 모달. 열림 상태는 URL(?project={slug})이 결정한다 —
 * 새로고침·공유 링크로도 열리고, 뒤로가기로 닫힌다.
 * <dialog>.showModal()이 바깥 화면을 비활성화(포커스 가둠)하고 Esc를 cancel 이벤트로 준다.
 */
export function ProjectDetailModal({ assets }: { assets: DetailAssets }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("project");
  const detail = slug ? getProjectDetail(slug) : undefined;
  const project = detail && PROJECTS.find((item) => item.slug === detail.slug);
  const isOpen = Boolean(detail && project);

  const { close, show } = useDetailNavigation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shownSlug = useRef<string | null>(null);

  // 열기 / 닫기 — URL이 바뀌면(열기·닫기·뒤로가기) dialog 상태를 맞춘다
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden"; // 배경 스크롤 잠금
      closeRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
      document.documentElement.style.overflow = "";
      resetOpenedInApp();
      // 연 버튼(마지막으로 보던 프로젝트 카드의 자세히 보기)으로 포커스 복귀
      document
        .querySelector<HTMLElement>(`[data-detail-trigger="${shownSlug.current}"]`)
        ?.focus({ preventScroll: true });
      // 다음에 열 때 "다음 프로젝트로 바뀜"으로 오인하지 않도록 비운다
      shownSlug.current = null;
    }
  }, [isOpen]);

  // "다음"으로 내용만 바뀐 경우: 맨 위로 올리고 새 제목으로 포커스
  useEffect(() => {
    if (!isOpen || !slug) return;
    if (shownSlug.current && shownSlug.current !== slug) {
      dialogRef.current?.scrollTo({ top: 0 });
      titleRef.current?.focus();
    }
    shownSlug.current = slug;
  }, [isOpen, slug]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  // 포커스 트랩 — showModal은 페이지 뒤쪽은 막지만 브라우저 주소창으로는 빠져나가므로 처음↔끝을 직접 잇는다
  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const focusables = [...event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.getClientRects().length > 0, // 화면에 보이지 않는 요소 제외
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (
      event.shiftKey &&
      (active === first || !event.currentTarget.contains(active) || active === event.currentTarget)
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // 딤(패널 바깥) 클릭으로 닫기
  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget || event.target === wrapperRef.current) close();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={TITLE_ID}
      onCancel={(event) => {
        event.preventDefault(); // Esc: dialog를 직접 닫지 않고 URL을 바꿔 닫는다
        close();
      }}
      onClick={onDialogClick}
      onKeyDown={onDialogKeyDown}
      className={styles.dialog}
    >
      {detail && project && (
        <div ref={wrapperRef} className={styles.wrapper}>
          <div className={styles.panel}>
            <button
              ref={closeRef}
              type="button"
              aria-label="상세 닫기"
              onClick={close}
              className="absolute top-4 right-4 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-paper text-text shadow-close hover:bg-text hover:text-on-dark sm:top-5 sm:right-5"
            >
              <CloseIcon size={18} />
            </button>

            <div className="flex flex-col gap-10 px-5 pt-18 sm:gap-12 sm:px-16 sm:pt-16">
              <DetailImage project={project} imageExists={assets[project.slug]?.image ?? false} />

              <DetailHeader project={project} detail={detail} titleId={TITLE_ID} titleRef={titleRef} />

              <DetailSection title="프로젝트 소개">
                <p className="text-detail-contrib text-text-muted">{detail.tagline}</p>
              </DetailSection>

              {detail.features.length > 0 && (
                <DetailSection title="주요 기능">
                  <BulletList items={detail.features} />
                </DetailSection>
              )}

              <DetailSection title={`나의 기여 (${detail.contribution})`}>
                <BulletList items={detail.contrib} />
              </DetailSection>

              <DetailSection title="트러블슈팅">
                <DetailCases
                  // 확정 전(todo) 사례는 노출하지 않는다
                  cases={detail.cases.filter((item) => !item.todo)}
                  diagrams={assets[detail.slug]?.diagrams ?? {}}
                />
              </DetailSection>

              <DetailSection title={detail.outro.type === "learnings" ? "마무리" : "결과"}>
                <BulletList
                  items={
                    detail.outro.type === "learnings"
                      ? detail.outro.items
                      : detail.outro.items.map((stat) => (
                          <>
                            {stat.label} <strong className="font-bold text-text">{stat.value}</strong>{" "}
                            <span className="text-text-sub">({stat.sub})</span>
                          </>
                        ))
                  }
                />
              </DetailSection>
            </div>

            <DetailFooter
              githubUrl={project.githubUrl}
              siteUrl={project.siteUrl}
              projectName={project.name}
              nextName={PROJECTS.find((item) => item.slug === getNextDetailSlug(detail.slug))?.name ?? ""}
              onNext={() => show(getNextDetailSlug(detail.slug))}
            />
          </div>
        </div>
      )}
    </dialog>
  );
}
