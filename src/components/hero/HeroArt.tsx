import { HeroCharacter } from "./HeroCharacter";
import { HeroDecorations } from "./HeroDecorations";

/**
 * 캐릭터(레이어 3)와 장식(레이어 4)을 같은 좌표계로 묶는 무대.
 * 두 레이어는 형제 요소라 패럴랙스 때 각각 다른 transform을 줄 수 있다.
 * z-20: 진입 애니메이션 중 무대가 stacking context가 되어도 타이틀(z-10) 위에 있도록 명시.
 * 진입 시 무대 전체가 함께 올라오므로 스티커가 노트북 위에서 어긋나지 않는다.
 * Mobile: 텍스트 아래 흐름에 두고 섹션 바닥에 붙인다. Desktop: 섹션 우하단에 고정.
 */
export function HeroArt() {
  return (
    <div className="@container relative z-20 mt-auto w-[min(92.3vw,440px)] motion-safe:animate-hero-art md:absolute md:right-[4.72%] md:bottom-0 md:mt-0 md:w-[min(46.7vw,672px)]">
      <HeroCharacter />
      <HeroDecorations />
    </div>
  );
}
