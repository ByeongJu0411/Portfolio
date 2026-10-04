import Image from "next/image";
import type { Project } from "@/data/projects";

/** 1. 대표 이미지 — 창 틀 없이 큰 둥근 상자에 그대로 보여준다 */
export function DetailImage({ project, imageExists }: { project: Project; imageExists: boolean }) {
  return (
    <div
      className="relative aspect-video overflow-hidden rounded-2xl border border-paper-line"
      style={{ backgroundColor: project.tint }}
    >
      {imageExists ? (
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(width >= 40rem) 792px, 100vw"
          className="object-cover"
        />
      ) : (
        <div aria-hidden="true" className="flex h-full items-center justify-center text-meta text-text-sub">
          대표 이미지
        </div>
      )}
    </div>
  );
}
