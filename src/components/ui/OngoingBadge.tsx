/** 기간의 끝 자리에 쓰는 "● ing" 표시. 스크린리더에는 "진행 중"으로 읽힌다. */
export function OngoingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 font-bold text-text">
      <span aria-hidden="true" className="size-1.75 rounded-full bg-accent" />
      <span aria-hidden="true">ing</span>
      <span className="sr-only">진행 중</span>
    </span>
  );
}
