type CodeAttr = {
  name: string;
  value: string;
  /** 모바일 시안에서 생략되는 속성 */
  desktopOnly?: boolean;
};

/** `<Hero name="전병주" />` 같은 코드 라벨 — 속성값만 진한 색 */
export function CodeLabel({ tag, attrs }: { tag: string; attrs: CodeAttr[] }) {
  return (
    <p className="font-mono text-code font-medium text-text-sub">
      &lt;{tag}
      {attrs.map((attr) => (
        <span key={attr.name} className={attr.desktopOnly ? "hidden md:inline" : undefined}>
          {" "}
          {attr.name}=<span className="text-text">&quot;{attr.value}&quot;</span>
        </span>
      ))}{" "}
      /&gt;
    </p>
  );
}
