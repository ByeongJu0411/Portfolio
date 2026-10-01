import type { ReactNode } from "react";
import { CloseIcon, FileIcon } from "@/components/icons";
import type { FolderMeta } from "@/data/about";

type DocSheetProps = {
  folder: FolderMeta;
  onClose: () => void;
  children: ReactNode;
};

/** 폴더에서 꺼낸 서류 한 장의 공통 틀 — 파일명, 닫기 버튼, 제목 */
export function DocSheet({ folder, onClose, children }: DocSheetProps) {
  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto rounded-paper border border-paper-line bg-paper px-5 py-5.5 shadow-paper lg:gap-7 lg:px-12 lg:py-9">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-meta text-text-sub">
          <FileIcon />
          {folder.fileName}
        </span>
        <button
          type="button"
          aria-label="서류 닫기"
          onClick={onClose}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border-(length:--border-width) border-text hover:bg-text hover:text-on-dark lg:size-10"
        >
          <CloseIcon />
        </button>
      </div>
      <h3 className="text-doc-title font-bold">{folder.docTitle}</h3>
      {children}
    </div>
  );
}
