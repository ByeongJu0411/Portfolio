export type SkillCategory = {
  name: string;
  items: string[];
};

/** Skills 섹션 (CLAUDE.md 9장) — 이 순서대로 01~05 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  { name: "언어", items: ["HTML", "JavaScript", "TypeScript"] },
  {
    name: "프론트엔드",
    items: ["React", "Next.js", "Zustand", "TanStack Query", "Zod", "pnpm"],
  },
  { name: "스타일링", items: ["CSS", "CSS Modules", "Tailwind CSS"] },
  { name: "개발 · 테스트", items: ["MSW", "Storybook"] },
  { name: "워크 툴", items: ["Notion", "Figma"] },
];
