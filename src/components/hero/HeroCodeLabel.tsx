import { SITE } from "@/lib/site";

export function HeroCodeLabel() {
  return (
    <p className="font-mono text-code font-medium text-text-sub">
      &lt;Hero name=<span className="text-text">&quot;{SITE.name}&quot;</span>
      <span className="hidden md:inline">
        {" "}
        role=<span className="text-text">&quot;{SITE.role}&quot;</span>
      </span>{" "}
      /&gt;
    </p>
  );
}
