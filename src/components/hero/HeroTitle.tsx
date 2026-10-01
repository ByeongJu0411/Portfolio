/** 레이어 2 — 캐릭터 뒤에 깔리는 타이틀. 패럴랙스 대상이므로 단독 요소로 둔다. */
export function HeroTitle() {
  return (
    <h1
      id="hero-title"
      // 글자 자체의 좌측 여백(side bearing)만큼 당겨 시안의 x 위치(72 / 16)에 맞춘다.
      // flex-col: 줄 래퍼의 음수 margin이 서로 상쇄(margin collapse)되지 않게 한다.
      className="relative z-10 -ml-[0.032em] flex flex-col font-display text-hero font-extrabold"
    >
      <TitleLine animation="motion-safe:animate-hero-line-1">FRONT</TitleLine>
      <TitleLine animation="motion-safe:animate-hero-line-2">
        END
        {/* scale을 위해 inline-block이 되면 D–. 커닝이 사라지므로 그만큼(0.024em) 되돌린다 */}
        <span className="-ml-[0.024em] inline-block origin-bottom text-accent motion-safe:animate-hero-pop">.</span>
      </TitleLine>
    </h1>
  );
}

/**
 * 줄 단위 마스크 리빌용 래퍼. 행간(0.84)이 좁아 글리프가 줄 박스를 넘으므로
 * 위아래로 0.1em씩 잘림 영역을 넓히고, 같은 양의 음수 margin으로 레이아웃은 그대로 둔다.
 */
function TitleLine({ animation, children }: { animation: string; children: React.ReactNode }) {
  return (
    <span className="-my-[0.1em] block overflow-hidden py-[0.1em]">
      <span className={`block ${animation}`}>{children}</span>
    </span>
  );
}
