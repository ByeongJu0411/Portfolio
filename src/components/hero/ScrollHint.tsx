export function ScrollHint() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-10 bottom-10 z-40 hidden flex-col items-center gap-3 font-mono text-caption font-medium text-text-sub motion-safe:animate-hero-hint md:flex"
    >
      <span className="[writing-mode:vertical-rl]">SCROLL</span>
      <span className="h-12 w-(--border-width) bg-text" />
    </div>
  );
}
