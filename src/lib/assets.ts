import { existsSync } from "node:fs";
import path from "node:path";

/** public/ 아래에 정적 파일이 있는지 (빌드·서버 렌더 시점에 확인). 서버 컴포넌트에서만 사용. */
export function hasPublicFile(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}
