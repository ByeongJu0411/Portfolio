import { AWARDS } from "@/data/about";

export function AwardsDoc() {
  return (
    <ul>
      {AWARDS.map((award) => (
        <li
          key={award.title}
          className="flex flex-col gap-1 border-t border-paper-line py-3 lg:grid lg:grid-cols-[5rem_minmax(0,1fr)_auto] lg:items-baseline lg:gap-4 lg:py-4.5"
        >
          <span className="font-mono text-meta text-text-sub">{award.year}</span>
          <span className="text-doc-item font-bold">{award.title}</span>
          <span className="text-detail text-text-muted">{award.organizer}</span>
        </li>
      ))}
    </ul>
  );
}
