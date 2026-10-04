import { SectionLabel } from "@/components/ui/SectionLabel";
import { SKILL_CATEGORIES } from "@/data/skills";

const pad = (n: number) => String(n).padStart(2, "0");

/** 글자와 선만 쓰는 단순한 기술 목록. 카드·아이콘·호버 효과 없음 */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto max-w-page px-(--page-gutter) py-18 lg:py-30"
    >
      <SectionLabel>&lt;Skills /&gt;</SectionLabel>
      <h2 id="skills-title" className="mt-5 text-title font-bold lg:mt-7">
        기술 스택
      </h2>

      {/* 모바일 2단 → md 3단 → lg 5단. auto-fit은 1024에서 4+1처럼 한 단만 남는 배치가 생겨 breakpoint로 고정 */}
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:mt-18 lg:grid-cols-5 lg:gap-10">
        {SKILL_CATEGORIES.map((category, index) => (
          <div key={category.name} className="flex flex-col gap-4.5">
            <div className="flex flex-col gap-1.5 border-b-(length:--border-width) border-text pb-4">
              <span aria-hidden="true" className="font-mono text-project-index text-text-sub">
                {pad(index + 1)}
              </span>
              <h3 className="text-skill-category font-bold">{category.name}</h3>
            </div>
            <ul className="flex flex-col gap-2.5 lg:gap-3">
              {category.items.map((item) => (
                <li key={item} className="text-skill-item text-text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
