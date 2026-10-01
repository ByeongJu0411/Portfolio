import type { Ref } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import type { FolderMeta } from "@/data/about";
import styles from "./Folder.module.css";

const MINI_LINE_WIDTHS = ["60%", "85%", "72%", "40%"];

type FolderProps = {
  folder: FolderMeta;
  open: boolean;
  controlsId: string;
  onClick?: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
};

export function Folder({ folder, open, controlsId, onClick, buttonRef }: FolderProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.folder}
      aria-expanded={open}
      aria-controls={controlsId}
      onClick={onClick}
    >
      <span aria-hidden="true" className={styles.back} />
      {/* 번호는 실제 서류철처럼 탭 라벨에 둔다 */}
      <span aria-hidden="true" className={`${styles.tab} font-mono text-folder-num font-bold`}>
        {folder.number}
      </span>
      {/* 안쪽 서류 두 장 — 뒷장은 살짝 기울어 있고 hover 때 더 펼쳐진다 */}
      <span aria-hidden="true" className={styles.miniDocBack} />
      <span aria-hidden="true" className={styles.miniDoc}>
        {MINI_LINE_WIDTHS.map((width) => (
          <span key={width} className={styles.miniLine} style={{ width }} />
        ))}
      </span>
      <span className={styles.front}>
        <span aria-hidden="true" className={styles.arrow}>
          <ArrowUpRightIcon />
        </span>
        <span>
          <span className="block font-mono text-folder-name font-bold">{folder.name}</span>
          {/* 모바일 시안에서는 부제가 안 보이지만 버튼 이름에는 포함되도록 sr-only로 둔다 */}
          <span className="sr-only lg:not-sr-only lg:block">
            <span className="mt-1.5 block text-small leading-normal opacity-75">{folder.subtitle}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
