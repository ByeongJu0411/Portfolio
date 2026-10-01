import type { StaticImageData } from "next/image";
import profilePhoto from "../../public/images/profile.jpg";

/* ─── 증명사진 ─────────────────────────────────────────────
 * 사진을 바꾸려면 import 경로만 교체한다. null이면 placeholder가 렌더링된다.
 * 틀의 비율은 이미지 원본 비율을 그대로 따르므로 잘리지 않는다. */
export const PROFILE_PHOTO: { src: StaticImageData; alt: string } | null = {
  src: profilePhoto,
  alt: "정장을 입은 전병주의 증명사진",
};

/* ─── 연락처 ───────────────────────────────────────────── */
export type ContactKind = "phone" | "email" | "address";

export type Contact = {
  kind: ContactKind;
  label: string;
  href?: string;
};

export const CONTACTS: Contact[] = [
  { kind: "phone", label: "010-9165-7205", href: "tel:010-9165-7205" },
  { kind: "email", label: "wjsqudwn981789@gmail.com", href: "mailto:wjsqudwn981789@gmail.com" },
  { kind: "address", label: "인천광역시 남동구 담방로 21번길 24" },
];

/* ─── 학력 ─────────────────────────────────────────────── */
export const EDUCATION = {
  school: "성공회대학교",
  major: "IT융합자율학부 · SW / 컴퓨터공학 전공",
  period: "2021 – 2027.02 졸업 예정",
  scores: [
    { label: "SW 전공 학점", value: "4.30", max: "4.5" },
    { label: "컴퓨터공학 전공 학점", value: "4.25", max: "4.5" },
  ],
};

/* ─── 활동 (최신순) ───────────────────────────────── */
export type Activity = {
  title: string;
  start: string;
  /** null이면 진행 중 */
  end: string | null;
};

export const ACTIVITIES: Activity[] = [
  { title: "KUSITMS(큐시즘) 34기", start: "2026.08.15", end: null },
  { title: "Leets · IT 창업 동아리 (가천대학교)", start: "2026.07.01", end: "2026.08.06" },
  { title: "성공회대학교 제16회 IT 경진대회", start: "2025.09.14", end: "2025.10.24" },
  { title: "GDG on Campus SKHU 3기", start: "2024.09.12", end: "2025.06.19" },
];

/* ─── 수상 ─────────────────────────────────────────────── */
export type Award = {
  year: string;
  title: string;
  organizer: string;
};

export const AWARDS: Award[] = [
  { year: "2025", title: "은상 · 인기상", organizer: "성공회대학교 제16회 IT 경진대회" },
  { year: "2025", title: "장려상", organizer: "성공회대학교 창업 아이디어 경진대회" },
  { year: "2025", title: "최우수 창업동아리 선정", organizer: "GoodWin Incubating" },
];

/* ─── 폴더 ─────────────────────────────────────────────── */
export type FolderId = "education" | "activities" | "awards";

export type FolderMeta = {
  id: FolderId;
  number: string;
  name: string;
  subtitle: string;
  /** 서류 상단에 표시되는 파일명 */
  fileName: string;
  /** 서류 region의 aria-label, 서류 제목 */
  docTitle: string;
};

export const FOLDERS: FolderMeta[] = [
  {
    id: "education",
    number: "01",
    name: "EDUCATION",
    subtitle: "학력 · 전공 학점",
    fileName: "education.md",
    docTitle: "학력",
  },
  {
    id: "activities",
    number: "02",
    name: "ACTIVITIES",
    subtitle: `활동 ${ACTIVITIES.length}건`,
    fileName: "activities.md",
    docTitle: "활동",
  },
  {
    id: "awards",
    number: "03",
    name: "AWARDS",
    subtitle: `수상 ${AWARDS.length}건`,
    fileName: "awards.md",
    docTitle: "수상",
  },
];
