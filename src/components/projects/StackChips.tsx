import { VISIBLE_STACK_COUNT } from "@/data/projects";

const CHIP =
  "inline-flex h-7 items-center rounded-pill border px-2.5 text-chip whitespace-nowrap lg:h-7.5 lg:px-3";

type StackChipsProps = {
  stack: string[];
  /** STACK 라벨 id (목록 이름으로 연결) */
  labelId: string;
};

/** 앞 VISIBLE_STACK_COUNT개만 칩으로, 나머지는 +N 칩 하나로 묶는다 */
export function StackChips({ stack, labelId }: StackChipsProps) {
  const visible = stack.slice(0, VISIBLE_STACK_COUNT);
  const hidden = stack.slice(VISIBLE_STACK_COUNT);

  return (
    <div className="flex flex-col gap-2.5">
      {/* 목록 이름(aria-labelledby)으로만 읽히게 — 문단으로 한 번 더 읽히지 않도록 숨김 */}
      <p id={labelId} aria-hidden="true" className="font-mono text-label text-text-sub">
        STACK
      </p>
      <ul aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {visible.map((name) => (
          <li key={name} className={`${CHIP} border-chip-border bg-paper text-text-muted`}>
            {name}
          </li>
        ))}
        {hidden.length > 0 && (
          // title은 마우스 툴팁용(aria-hidden 쪽에 둬서 두 번 읽히지 않게), sr-only는 스크린리더용
          <li className={`${CHIP} border-text bg-text font-medium text-on-dark`}>
            <span aria-hidden="true" title={hidden.join(", ")}>
              +{hidden.length}
            </span>
            <span className="sr-only">
              외 {hidden.length}개: {hidden.join(", ")}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
