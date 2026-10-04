import { OngoingBadge } from "@/components/ui/OngoingBadge";
import type { Project } from "@/data/projects";
import type { ProjectDetail } from "@/data/projectDetails";

/** 같은 해면 끝 날짜의 연도를 생략한다 (2026.07.01 – 08.06) */
function shortEnd(start: string, end: string) {
  return start.slice(0, 4) === end.slice(0, 4) ? end.slice(5) : end;
}

type DetailHeaderProps = {
  project: Project;
  detail: ProjectDetail;
  titleId: string;
  titleRef: React.Ref<HTMLHeadingElement>;
};

/** 2. 제목 · 기본 정보 한 줄 · 기술 스택 */
export function DetailHeader({ project, detail, titleId, titleRef }: DetailHeaderProps) {
  const meta = [
    { label: "구분", value: detail.badge },
    { label: "역할", value: detail.role },
    { label: "팀", value: detail.team },
    {
      label: "기간",
      value: (
        <>
          {project.start} – {project.end ? shortEnd(project.start, project.end) : <OngoingBadge />}
        </>
      ),
    },
  ];

  return (
    <header className="flex flex-col gap-5">
      {/* 다음 프로젝트로 바뀔 때 포커스를 받아 새 제목을 읽히게 한다 */}
      <h2 id={titleId} ref={titleRef} tabIndex={-1} className="text-detail-name font-bold outline-none">
        {project.name}
      </h2>

      <dl className="flex flex-wrap gap-x-5 gap-y-1.5 text-detail-meta text-text-sub">
        {meta.map((item) => (
          <div key={item.label} className="flex gap-1.5">
            <dt>{item.label}</dt>
            <dd className="text-text">{item.value}</dd>
          </div>
        ))}
      </dl>

      <ul aria-label="사용 기술" className="flex flex-wrap gap-2">
        {project.stack.map((name) => (
          <li
            key={name}
            className="inline-flex h-7 items-center rounded-pill border border-chip-border bg-paper px-3 text-chip whitespace-nowrap text-text-muted sm:h-7.5"
          >
            {name}
          </li>
        ))}
      </ul>
    </header>
  );
}
