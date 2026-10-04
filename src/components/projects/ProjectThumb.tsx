import type { Project } from "@/data/projects";
import { BrowserWindow } from "./BrowserWindow";
import styles from "./Projects.module.css";

type ProjectThumbProps = {
  project: Project;
  /** 대표 이미지 파일 존재 여부 (서버에서 확인해 전달) */
  imageExists: boolean;
};

/**
 * tint 배경 위에 흰 브라우저 창이 하단에 붙은 대표 이미지.
 * 이미지 파일을 넣으면 창 안에 스크린샷이 들어가고, 없으면 placeholder를 보여준다.
 */
export function ProjectThumb({ project, imageExists }: ProjectThumbProps) {
  return (
    <div
      className={`${styles.thumb} relative aspect-[16/10] overflow-hidden rounded-thumb`}
      style={{ backgroundColor: project.tint }}
    >
      <BrowserWindow
        variant="card"
        src={project.image}
        alt={project.imageAlt}
        imageExists={imageExists}
        placeholder="대표 이미지 · 16:10"
        sizes="(width >= 64rem) min(40vw, 528px), 90vw"
        className={`${styles.window} inset-x-[7.4%] top-[12.8%] lg:inset-x-[8.75%] lg:top-[14%]`}
      />
    </div>
  );
}
