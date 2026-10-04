import Image from "next/image";
import type { DetailCase } from "@/data/projectDetails";
import { BulletList } from "./DetailSection";

type DetailCasesProps = {
  cases: DetailCase[];
  /** caseId → 도식 이미지 파일 존재 여부 */
  diagrams: Record<string, boolean>;
};

/** 4. 트러블슈팅 — 사례마다 제목 · 상황 · 한 일 · 결과를 글로만 정리 */
export function DetailCases({ cases, diagrams }: DetailCasesProps) {
  return (
    <div className="flex flex-col">
      {cases.map((item) => (
        <article
          key={item.id}
          className="flex flex-col gap-3 border-t border-paper-line py-6 first:border-t-0 first:pt-0"
        >
          <h4 className="text-case-title font-bold">{item.title}</h4>
          {diagrams[item.id] && (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-bg">
              <Image
                src={item.diagram}
                alt={`${item.title} 도식`}
                fill
                sizes="(width >= 40rem) 792px, 100vw"
                className="object-contain"
              />
            </div>
          )}
          <p className="text-detail-contrib text-text-muted">{item.situation}</p>
          <BulletList items={item.actions} />
          <p className="text-detail-contrib font-medium text-text">{item.result}</p>
        </article>
      ))}
    </div>
  );
}
