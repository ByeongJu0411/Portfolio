import { SparkleIcon } from "@/components/icons";

/**
 * 레이어 4 — 스티커·반짝이. 위치와 크기는 HeroArt 무대 기준 %·cqw라서
 * 화면 폭이 바뀌어도 노트북 덮개 위의 스티커가 캐릭터와 함께 움직인다.
 */
export function HeroDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
      <span
        className="absolute top-[69%] left-[10.6%] flex aspect-[44/28] w-[12.2%] -rotate-9 items-center justify-center rounded-[1.95cqw] bg-accent font-mono text-[3.33cqw] font-bold text-text shadow-sticker motion-safe:animate-hero-sticker md:top-[71.4%] md:left-[10.7%] md:aspect-[72/44] md:w-[10.7%] md:rounded-sticker md:text-[2.68cqw]"
      >
        &lt;/&gt;
      </span>
      <SparkleIcon className="absolute top-[8.3%] left-[87.8%] w-[7.8%] text-accent motion-safe:animate-hero-sparkle md:top-[5.6%] md:left-[93.75%] md:w-[6.55%]" />
      <SparkleIcon className="absolute top-[14.2%] left-[87.8%] hidden w-[2.98%] text-text motion-safe:animate-hero-sparkle-late md:block" />
    </div>
  );
}
