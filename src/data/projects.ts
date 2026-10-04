export type Project = {
  slug: string;
  name: string;
  tagline: string;
  team: string;
  /** 기간 "YYYY.MM.DD" */
  start: string;
  /** null이면 진행 중 */
  end: string | null;
  stack: string[];
  /** 대표 이미지 (16:10). 파일이 없으면 placeholder가 보인다 — public/images/projects/{slug}.webp */
  image: string;
  imageAlt: string;
  /** 없으면(비공개 저장소 등) GitHub 버튼을 숨긴다 */
  githubUrl: string | null;
  /** 배포된 서비스 주소. 없으면 상세의 '사이트 보기'가 준비 중 안내를 띄운다 */
  siteUrl: string | null;
  /** 대표 이미지 배경색 토큰 */
  tint: string;
};

/** 카드에 바로 보이는 스택 개수. 나머지는 +N 칩으로 묶는다. */
export const VISIBLE_STACK_COUNT = 6;

export const PROJECTS: Project[] = [
  {
    slug: "graverty",
    name: "GraVerty",
    tagline: "UAM 기업 Verty의 브랜드·기술 소개 랜딩 페이지",
    team: "기획 2 · 디자인 2 · Frontend 2 · Backend 2",
    start: "2026.09.02",
    end: "2026.09.18",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "GSAP",
      "next-intl",
      "Lenis",
      "Vitest",
      "React Testing Library",
      "pnpm",
    ],
    image: "/images/projects/graverty.webp",
    imageAlt: "Verty 랜딩 페이지 메인 화면 — 하늘을 나는 UAM 기체와 'FLY THE FUTURE, READY TO OPERATE' 문구",
    // 기업 프로젝트 규정상 저장소 비공개 — GitHub 버튼을 숨긴다
    githubUrl: null,
    siteUrl: "https://gra-verty-fe.vercel.app",
    tint: "var(--tint-graverty)",
  },
  {
    slug: "zzazo",
    name: "ZZAZO",
    tagline: "조건에 맞는 시간표를 자동으로 추천하는 가천대학교 수강신청 보조 서비스",
    team: "PM 1 · Frontend 3 · Backend 3",
    start: "2026.07.01",
    end: "2026.08.06",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "MSW",
      "Storybook",
      "pnpm",
      "Husky",
      "CodeRabbit",
    ],
    image: "/images/projects/zzazo.webp",
    imageAlt: "ZZAZO 소개 이미지 — '조건에 맞는 시간표를, 더 쉽게.' 문구와 시간표 추천 조건 입력·대시보드·시간표 화면",
    githubUrl: "https://github.com/Leets-Official/ZZAZO-FE",
    siteUrl: "https://zzazo-fe.vercel.app",
    tint: "var(--tint-zzazo)",
  },
  {
    slug: "skhu-box",
    name: "SKHU BOX",
    tagline: "성공회대학교 스마트 사물함 예약 시스템",
    team: "Frontend 1 · Backend 2",
    start: "2026.03.25",
    end: "2026.06.16",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Recharts", "react-hot-toast", "ESLint"],
    image: "/images/projects/skhu-box.webp",
    imageAlt: "SKHU BOX 소개 이미지 — '선착순 예약의 트래픽 폭주를 대기열 시스템으로 안정적으로 관리' 문구와 대기열·사물함 예약·관리자 화면",
    githubUrl: "https://github.com/SKHU-BOX/SKHU_BOX-FrontEnd",
    siteUrl: "https://skhubox.vercel.app",
    tint: "var(--tint-skhu-box)",
  },
  {
    slug: "teaming",
    name: "티밍",
    tagline: "결제 기반 팀플 매칭방부터 실시간 채팅, 과제 제출, 벌칙까지 지원하는 팀 프로젝트 협업 서비스",
    team: "Frontend 2 (Web 1 · App 1) · Backend 2",
    start: "2025.09.14",
    end: "2025.10.24",
    stack: ["Next.js", "React", "TypeScript", "Toss Payments", "NextAuth.js", "CSS Modules", "STOMP/SockJS"],
    image: "/images/projects/teaming.webp",
    imageAlt: "티밍 소개 이미지 — 보라색 빛 위의 'Teaming For Your Team' 로고와 상태 카드·채팅·할 일 목록 UI",
    githubUrl: "https://github.com/GoodSpace-Kr/Teaming-FrontEnd",
    siteUrl: "https://teaming-three.vercel.app",
    tint: "var(--tint-teaming)",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    tagline: "완성도·성능·접근성을 기준으로 직접 설계하고 구현하고 있는 개인 포트폴리오 사이트",
    team: "개인 프로젝트",
    start: "2026.10.01",
    end: null,
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "CSS Modules", "ESLint"],
    image: "/images/projects/portfolio.webp",
    imageAlt: "전병주 포트폴리오 메인 화면 — FRONT END. 타이틀과 노트북을 든 캐릭터 일러스트",
    githubUrl: "https://github.com/ByeongJu0411/Portfolio",
    siteUrl: null, // TODO: 배포 주소
    tint: "var(--tint-portfolio)",
  },
];
