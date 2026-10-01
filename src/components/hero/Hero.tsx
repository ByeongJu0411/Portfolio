import { HeroArt } from "./HeroArt";
import { HeroCodeLabel } from "./HeroCodeLabel";
import { HeroIntro } from "./HeroIntro";
import { HeroTitle } from "./HeroTitle";
import { ScrollHint } from "./ScrollHint";

/**
 * 레이어 순서 (아래 → 위): 도트 배경(body) → 타이틀 z-10 → 캐릭터 z-20 → 장식 z-30 → 텍스트·버튼 z-40
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-height))] max-w-page flex-col px-(--page-gutter) pt-4 md:pt-16 md:pb-6.5">
        <div className="relative z-40 pl-0.5 motion-safe:animate-hero-label md:pl-1.5">
          <HeroCodeLabel />
        </div>
        <div className="mt-2.5 md:mt-3.25">
          <HeroTitle />
        </div>
        <div className="mt-4.25 pl-0.5 md:mt-6 md:pl-1.5">
          <HeroIntro />
        </div>
        <HeroArt />
        <ScrollHint />
      </div>
    </section>
  );
}
