import { EDUCATION } from "@/data/about";

export function EducationDoc() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-meta text-text-sub">{EDUCATION.period}</span>
        <span className="text-doc-heading font-bold">{EDUCATION.school}</span>
        <span className="text-doc-body text-text-muted">{EDUCATION.major}</span>
      </div>
      <dl className="mt-auto flex gap-4 lg:gap-8">
        {EDUCATION.scores.map((score) => (
          <div key={score.label} className="flex flex-1 flex-col gap-1 border-t-2 border-text pt-3">
            <dt className="font-mono text-meta text-text-sub">{score.label}</dt>
            <dd className="flex items-baseline gap-1.5">
              <span className="font-display text-score font-extrabold">{score.value}</span>
              <span className="text-small text-text-sub">/ {score.max}</span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
