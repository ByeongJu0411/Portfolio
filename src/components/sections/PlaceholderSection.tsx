import { SectionLabel } from "@/components/ui/SectionLabel";

type PlaceholderSectionProps = {
  id: string;
  label: string;
};

/** TODO: 실제 섹션 구현 전까지 메뉴 스크롤 목적지 역할만 하는 자리표시 섹션 */
export function PlaceholderSection({ id, label }: PlaceholderSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto min-h-[70svh] max-w-page px-(--page-gutter) py-18 lg:py-30"
    >
      <SectionLabel>&lt;{label} /&gt;</SectionLabel>
      <h2 id={`${id}-title`} className="mt-5 text-title font-bold lg:mt-7">
        {label}
      </h2>
      <p className="mt-4 text-intro text-text-sub">준비 중인 섹션입니다.</p>
    </section>
  );
}
