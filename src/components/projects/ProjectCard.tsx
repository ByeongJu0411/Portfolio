import { ArrowRightIcon, CodeIcon } from "@/components/icons";
import { OngoingBadge } from "@/components/ui/OngoingBadge";
import type { Project } from "@/data/projects";
import { DetailTrigger } from "./detail/DetailTrigger";
import { ProjectThumb } from "./ProjectThumb";
import styles from "./Projects.module.css";
import { StackChips } from "./StackChips";

const pad = (n: number) => String(n).padStart(2, "0");

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  imageExists: boolean;
  /** 상세 모달 콘텐츠가 있는지 — 없으면 자세히 보기를 숨긴다 */
  hasDetail: boolean;
};

export function ProjectCard({ project, index, total, imageExists, hasDetail }: ProjectCardProps) {
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={`${styles.card} flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,640fr)_minmax(0,568fr)] lg:items-center lg:gap-(--project-grid-gap)`}
    >
      {hasDetail ? (
        // 대표 이미지도 상세를 연다 — 마우스 전용 (키보드는 자세히 보기로)
        <DetailTrigger slug={project.slug} mouseOnly className="block w-full cursor-pointer text-left">
          <ProjectThumb project={project} imageExists={imageExists} />
        </DetailTrigger>
      ) : (
        <ProjectThumb project={project} imageExists={imageExists} />
      )}

      <div className="@container flex min-w-0 flex-col gap-4 lg:gap-5.5">
        <span className="font-mono text-project-index text-text-sub">
          {pad(index + 1)} / {pad(total)}
        </span>

        <div className="flex flex-col gap-2 lg:gap-2.5">
          <h3 id={titleId} className="text-project-name font-bold">
            {project.name}
          </h3>
          <p className="text-project-tagline text-text-muted">{project.tagline}</p>
        </div>

        {/* 정보 칸이 TEAM·PERIOD 두 열을 담을 만큼(@md = 28rem) 넓을 때만 2열 — 기간이 중간에서 끊기지 않게 */}
        <dl className="grid gap-3 border-t border-line pt-3.5 lg:pt-4.5 @md:grid-cols-2 @md:gap-6">
          <div className="flex flex-col gap-1.5">
            <dt className="font-mono text-label text-text-sub">TEAM</dt>
            <dd className="text-project-meta">
              {/* "Backend 2"처럼 항목 중간에서 줄이 바뀌지 않게, 항목 사이(·)에서만 줄바꿈 */}
              {project.team.split(" · ").map((part, i) => (
                <span key={part}>
                  {i > 0 && " · "}
                  <span className="whitespace-nowrap">{part}</span>
                </span>
              ))}
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="font-mono text-label text-text-sub">PERIOD</dt>
            <dd className="font-mono text-project-period whitespace-nowrap">
              {project.start} – {project.end ?? <OngoingBadge />}
            </dd>
          </div>
        </dl>

        <StackChips stack={project.stack} labelId={`project-${project.slug}-stack`} />

        <div className="mt-1 flex gap-2.5 lg:mt-1.5">
          {hasDetail && (
            <DetailTrigger
              slug={project.slug}
              className={`${styles.detail} inline-flex h-(--project-button-height) flex-1 items-center justify-center gap-2 rounded-button bg-text px-4.5 text-button-sm font-medium text-on-dark lg:flex-none lg:px-5.5`}
            >
              <span className="sr-only">{project.name} </span>
              자세히 보기
              <ArrowRightIcon />
            </DetailTrigger>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.github} inline-flex h-(--project-button-height) items-center gap-2 rounded-button border-(length:--border-width) border-text px-4 text-button-sm font-medium lg:px-5`}
            >
              <CodeIcon size={18} />
              <span className="sr-only">{project.name} </span>
              GitHub
              <span className="sr-only">(새 창)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
