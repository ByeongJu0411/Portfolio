"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FOLDERS, type FolderId } from "@/data/about";
import { DocSheet } from "./DocSheet";
import { Folder } from "./Folder";
import styles from "./Folder.module.css";

type CabinetState = {
  open: FolderId | null;
  /** 다른 폴더에서 바로 넘어온 경우 — 새 서류를 0.18초 늦게 꺼낸다 */
  switching: boolean;
};

type FolderCabinetProps = {
  /** 서류 내용. 서버 컴포넌트로 렌더링해 넘겨받는다. */
  docs: Record<FolderId, ReactNode>;
};

export function FolderCabinet({ docs }: FolderCabinetProps) {
  const [state, setState] = useState<CabinetState>({ open: null, switching: false });
  const buttonRefs = useRef(new Map<FolderId, HTMLButtonElement>());

  const toggle = (id: FolderId) =>
    setState((prev) =>
      prev.open === id ? { open: null, switching: false } : { open: id, switching: prev.open !== null },
    );

  /** 닫고 해당 폴더 버튼으로 포커스를 돌려준다 (X 버튼·Esc) */
  const closeAndRestoreFocus = (id: FolderId) => {
    setState({ open: null, switching: false });
    buttonRefs.current.get(id)?.focus();
  };

  useEffect(() => {
    const openId = state.open;
    if (!openId) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setState({ open: null, switching: false });
      buttonRefs.current.get(openId!)?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [state.open]);

  return (
    <div className={styles.cabinet}>
      {/* 서류는 각 폴더 바로 뒤 DOM에 둬서 Tab이 폴더 → 열린 서류 → 다음 폴더 순으로 흐르게 한다.
          absolute라 grid 칸을 차지하지 않고, 위치는 grid 기준으로 잡힌다. */}
      <div className={styles.grid}>
        {FOLDERS.map((folder, index) => {
          const open = state.open === folder.id;
          const docId = `doc-${folder.id}`;
          return (
            <Fragment key={folder.id}>
              <Folder
                folder={folder}
                open={open}
                controlsId={docId}
                onClick={() => toggle(folder.id)}
                buttonRef={(el) => {
                  if (el) buttonRefs.current.set(folder.id, el);
                  else buttonRefs.current.delete(folder.id);
                }}
              />
              <div
                id={docId}
                role="region"
                aria-label={folder.docTitle}
                aria-hidden={!open}
                data-open={open || undefined}
                data-switching={(open && state.switching) || undefined}
                className={styles.doc}
                // 닫힌 서류의 출발 위치(자기 폴더 뒤) — 모바일 2×2, 데스크톱 4열 기준 열·행
                style={
                  {
                    "--doc-col-mobile": index % 2,
                    "--doc-row-mobile": Math.floor(index / 2),
                    "--doc-col-desktop": index,
                  } as CSSProperties
                }
              >
                <DocSheet folder={folder} onClose={() => closeAndRestoreFocus(folder.id)}>
                  {docs[folder.id]}
                </DocSheet>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
