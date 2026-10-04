import Image from "next/image";

type BrowserWindowProps = {
  src: string;
  alt: string;
  /** 이미지 파일 존재 여부 (서버에서 확인해 전달) — 없으면 placeholder */
  imageExists: boolean;
  placeholder: string;
  sizes: string;
  /** 위치·크기 (부모 기준 absolute) */
  className?: string;
  /** card: 카드 썸네일(lg에서 커짐) / band: 상세 모달 밴드 */
  variant: "card" | "band";
};

const BAR = {
  card: "gap-1 px-2.5 py-2.25 lg:gap-1.5 lg:px-4 lg:py-3.5",
  band: "gap-1.5 px-4 py-3.5",
};
const DOT = {
  card: "size-1.5 lg:size-2.25",
  band: "size-2.25",
};

/** 흰 브라우저 창 — 상단 점 3개 + 스크린샷(없으면 placeholder 문구) */
export function BrowserWindow({ src, alt, imageExists, placeholder, sizes, className = "", variant }: BrowserWindowProps) {
  return (
    <div className={`absolute bottom-0 flex flex-col rounded-t-window bg-paper shadow-window ${className}`}>
      <div aria-hidden="true" className={`flex border-b border-window-line ${BAR[variant]}`}>
        {[0, 1, 2].map((dot) => (
          <span key={dot} className={`rounded-full bg-line ${DOT[variant]}`} />
        ))}
      </div>
      <div className="relative flex-1 overflow-hidden">
        {imageExists ? (
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        ) : (
          <div aria-hidden="true" className="flex h-full items-center justify-center text-meta text-text-sub">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
