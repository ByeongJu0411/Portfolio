import Image from "next/image";
import characterImage from "../../../public/images/character-transparent.png";

/** 레이어 3 — 캐릭터. LCP 요소이므로 preload. */
export function HeroCharacter() {
  return (
    <Image
      src={characterImage}
      alt="노트북을 들고 웃고 있는 전병주 캐릭터 일러스트"
      preload
      sizes="(width >= 48rem) min(46.7vw, 672px), min(92.3vw, 440px)"
      className="relative z-20 block h-auto w-full"
    />
  );
}
