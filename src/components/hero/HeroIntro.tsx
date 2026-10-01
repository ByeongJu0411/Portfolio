import { ArrowRightIcon, CodeIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Chip } from "@/components/ui/Chip";
import { SITE } from "@/lib/site";

export function HeroIntro() {
  return (
    <div className="relative z-40 flex max-w-hero-text flex-col gap-3.5 motion-safe:animate-hero-intro md:gap-4.5">
      <div className="flex gap-2 md:gap-2.5">
        <Chip variant="solid" dot>
          구직 중
        </Chip>
        <Chip>인천 거주</Chip>
      </div>

      <p className="text-lead font-bold">
        사용자가 멈칫하는 순간을 찾아
        <br />
        원인부터 구조까지 다시 설계합니다.
      </p>

      <p className="hidden text-body text-text-sub md:block">
        혼자 짜던 코드에서, 팀이 함께 편하게 일하는 환경을 만드는 개발자로.
      </p>

      <div className="flex gap-2.5 md:mt-1.5 md:gap-3">
        <ButtonLink href="/#projects" className="flex-1 md:flex-none md:px-6.5">
          프로젝트 보기
          <ArrowRightIcon className="hidden md:block" />
        </ButtonLink>
        <ButtonLink href={SITE.githubUrl} variant="outline" showOn="desktop" className="px-5.5">
          <CodeIcon size={18} />
          GitHub
        </ButtonLink>
        <ButtonLink href={SITE.resumeUrl} variant="outline" showOn="mobile" className="px-4.5">
          이력서
        </ButtonLink>
      </div>
    </div>
  );
}
