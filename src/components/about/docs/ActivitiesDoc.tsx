import { ACTIVITIES } from "@/data/about";

export function ActivitiesDoc() {
  return (
    <ul>
      {ACTIVITIES.map((activity) => (
        <li
          key={activity.title}
          className="flex flex-col gap-1 border-t border-paper-line py-3 lg:flex-row lg:items-baseline lg:justify-between lg:gap-4 lg:py-4.5"
        >
          <span className="text-doc-item font-bold">{activity.title}</span>
          <span className="flex items-center gap-1 font-mono text-meta whitespace-nowrap text-text-sub">
            {activity.start} –{" "}
            {activity.end ?? (
              <span className="inline-flex items-center gap-1.5 font-bold text-text">
                <span aria-hidden="true" className="size-1.75 rounded-full bg-accent" />
                <span aria-hidden="true">ing</span>
                <span className="sr-only">진행 중</span>
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
