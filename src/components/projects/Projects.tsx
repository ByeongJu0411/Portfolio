import { Suspense } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROJECT_DETAILS, getProjectDetail, type DetailAssets } from "@/data/projectDetails";
import { PROJECTS } from "@/data/projects";
import { hasPublicFile } from "@/lib/assets";
import { ProjectDetailModal } from "./detail/ProjectDetailModal";
import { ProjectCard } from "./ProjectCard";

/** 대표 이미지·도식 파일이 실제로 있는지 (빌드 시점) — 없으면 placeholder */
function collectDetailAssets(): DetailAssets {
  return Object.fromEntries(
    PROJECT_DETAILS.map((detail) => {
      const project = PROJECTS.find((item) => item.slug === detail.slug);
      return [
        detail.slug,
        {
          image: project ? hasPublicFile(project.image) : false,
          diagrams: Object.fromEntries(detail.cases.map((item) => [item.id, hasPublicFile(item.diagram)])),
        },
      ];
    }),
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-page px-(--page-gutter) py-18 lg:py-30"
    >
      <SectionLabel>&lt;Projects /&gt;</SectionLabel>

      <div className="mt-5 flex flex-col gap-2 lg:mt-7 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <h2 id="projects-title" className="text-title font-bold">
          주요 프로젝트
        </h2>
        <p className="text-detail text-text-sub">자세한 과정과 트러블슈팅은 각 프로젝트 상세에서 볼 수 있어요.</p>
      </div>

      <div className="mt-12 flex flex-col gap-16 lg:mt-22 lg:gap-28">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            total={PROJECTS.length}
            imageExists={hasPublicFile(project.image)}
            hasDetail={Boolean(getProjectDetail(project.slug))}
          />
        ))}
      </div>

      {/* useSearchParams(?project=)를 쓰므로 정적 페이지의 나머지는 미리 렌더링되도록 Suspense로 감싼다 */}
      <Suspense fallback={null}>
        <ProjectDetailModal assets={collectDetailAssets()} />
      </Suspense>
    </section>
  );
}
