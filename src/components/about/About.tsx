import { SectionLabel } from "@/components/ui/SectionLabel";
import { AboutIntro } from "./AboutIntro";
import { ActivitiesDoc } from "./docs/ActivitiesDoc";
import { AwardsDoc } from "./docs/AwardsDoc";
import { EducationDoc } from "./docs/EducationDoc";
import { FolderCabinet } from "./FolderCabinet";
import { ProfilePhoto } from "./ProfilePhoto";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-page px-(--page-gutter) py-18 lg:py-30"
    >
      <SectionLabel>&lt;About /&gt;</SectionLabel>

      {/* 시안처럼 형광펜 구절이 한 줄에 남도록 제목만 일반 줄바꿈 (body는 keep-all) */}
      <h2 id="about-title" className="mt-5 text-title font-bold break-normal lg:mt-7">
        사용자가{" "}
        <span className="box-decoration-clone bg-[linear-gradient(transparent_60%,var(--color-accent)_60%)]">
          멈칫하지 않는 화면
        </span>
        을 만드는 <br className="hidden lg:block" />
        프론트엔드 개발자 전병주입니다
      </h2>

      <div className="mt-9 flex flex-col gap-8 lg:mt-18 lg:grid lg:grid-cols-[var(--about-photo-width)_minmax(0,1fr)] lg:items-center lg:gap-(--about-grid-gap)">
        <ProfilePhoto />
        <AboutIntro />
      </div>

      <div className="mt-16 flex flex-col gap-5 lg:mt-28 lg:gap-7">
        <p className="font-mono text-meta text-text-sub">{"// 폴더를 눌러 서류를 꺼내보세요"}</p>
        <FolderCabinet
          docs={{
            education: <EducationDoc />,
            activities: <ActivitiesDoc />,
            awards: <AwardsDoc />,
          }}
        />
      </div>
    </section>
  );
}
