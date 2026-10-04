import type { ReactNode } from "react";

/** 소개 · 주요 기능 · 나의 기여 · 트러블슈팅 · 마무리 공통 틀 */
export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-detail-section font-bold">{title}</h3>
      {children}
    </section>
  );
}

/** 문서처럼 읽히는 점 목록 */
export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5 text-detail-contrib text-text-muted">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-text" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
