import { CodeLabel } from "@/components/ui/CodeLabel";
import { SITE } from "@/lib/site";

export function HeroCodeLabel() {
  return (
    <CodeLabel
      tag="Hero"
      attrs={[
        { name: "name", value: SITE.name },
        { name: "role", value: SITE.role, desktopOnly: true },
      ]}
    />
  );
}
