/* 프로젝트 상세 모달 콘텐츠 (CLAUDE.md 8장). design/project-details.json에서 옮김.
 * 이름·기간·스택·GitHub·대표 이미지는 projects.ts와 slug로 연결해 한 곳에서만 관리한다. */

export type DetailCase = {
  id: string;
  category: string;
  title: string;
  situation: string;
  actions: string[];
  result: string;
  /** 도식 이미지 — 파일이 없으면 점선 placeholder */
  diagram: string;
  /** 확정되지 않은 사례. 값이 있으면 화면에 노출하지 않는다 */
  todo?: string;
};

export type DetailOutro =
  | { type: "learnings"; items: string[] }
  | { type: "stats"; items: { value: string; label: string; sub: string }[] };

export type ProjectDetail = {
  slug: string;
  badge: string;
  role: string;
  /** 모달 메타용 축약 표기 (FE · BE) */
  team: string;
  contribution: string;
  /** 프로젝트 소개 한 문장 */
  tagline: string;
  /** 주요 기능 (비어 있으면 섹션을 숨긴다) */
  features: string[];
  contrib: string[];
  cases: DetailCase[];
  outroTitle: string;
  outro: DetailOutro;
};

/** 모달 순서이자 "다음 프로젝트" 순환 순서 */
export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "graverty",
    badge: "Verty 기업 연계 프로젝트",
    role: "프론트엔드 개발 및 리드",
    team: "기획 2 · 디자인 2 · FE 2 · BE 2",
    contribution: "50%",
    tagline:
      "UAM(도심항공교통) 기업 Verty의 브랜드·기술 역량을 소개하는 랜딩 페이지입니다. 잠재 고객·투자자·구직자가 Verty의 사업 영역과 기술을 한 번의 스크롤로 파악할 수 있게 하는 것이 목적입니다.",
    features: [
      "스크롤 위치에 연동되는 Hero 비디오 시퀀스, 이동 시간 비교, 운항 기록 등 인터랙티브 섹션으로 구성된 단일 스크롤 랜딩",
      "Technology 소개 페이지(자체 개발 시스템 / 통합 운영 시스템 / 운항 실증) 별도 라우트",
      "next-intl 기반 한국어/영어 다국어 지원",
      "뉴스 목록·상세, 문의 CTA 등 콘텐츠 섹션",
    ],
    contrib: [
      "프론트엔드 2인 체제에서 전체 변경의 기본 코드 리뷰어(CODEOWNERS)로 참여하며 구현을 주도",
      "프로젝트 초기 환경(ESLint · Prettier · Husky · lint-staged · commitlint, 폴더 구조)을 구축해 전체 작업이 일관된 컨벤션으로 진행되는 기반 마련",
      "Tailwind v4 @theme 기반 타이포그래피·컬러 디자인 토큰을 설계하고 결정 기록을 문서화해, 섹션마다 값이 흩어지지 않도록 공용 스케일 확립",
      "GSAP 기반 Hero 스크롤 비디오 시퀀스를 구현하고 reduced-motion·정적 fallback을 더해 모션 비활성 환경에서도 콘텐츠 접근 가능하게 처리",
      "Technology 소개 페이지의 3개 섹션과 공용 컴포넌트, 라우팅을 신규 구현",
      "next-intl 다국어 라우팅 구조를 전체 섹션(약 20개)에 적용해 한/영 전환이 가능한 랜딩으로 확장",
    ],
    cases: [
      {
        id: "1",
        category: "브라우저 호환",
        title: "Safari에서 영상 알파 채널이 검은 화면으로 깨지는 문제 해결",
        situation:
          "이동 시간 비교 섹션의 지도 애니메이션 영상이 Safari와 iOS 인앱 브라우저에서 검은 화면으로 표시됐습니다.",
        actions: [
          "webm(VP9), HEVC 알파 영상 모두 Safari에서 알파 채널 렌더링이 실패하는 것을 실기기로 확인",
          "Safari 판별 커스텀 훅을 구현하고 테스트 코드 작성",
          "Safari 전용으로 알파가 보장되는 정지 이미지(PNG) fallback 적용",
        ],
        result: "애니메이션 대신 안정적인 정지 이미지로 대체해 Safari에서도 콘텐츠가 정상 노출되도록 수정했습니다.",
        diagram: "/images/projects/graverty/1.webp",
      },
      {
        id: "2",
        category: "다국어 라우팅",
        title: "다국어 라우팅 도입 시 어드민 경로 충돌 수정",
        situation:
          "next-intl locale 미들웨어가 /admin 경로까지 locale 프리픽스 대상으로 가로채면서 어드민 라우팅이 깨졌습니다.",
        actions: ["미들웨어의 라우팅 매칭 조건에서 어드민 경로를 명시적으로 제외"],
        result: "랜딩은 다국어 라우팅, 어드민은 별도 경로로 정상 분리되도록 수정했습니다.",
        diagram: "/images/projects/graverty/2.webp",
      },
      {
        id: "3",
        category: "SEO",
        title: "구조화 데이터(JSON-LD) 스키마 오류 수정",
        situation:
          "검색·AI 크롤러용 구조화 데이터에서 Organization, WebSite 두 타입을 배열로 최상위에 두어, 파서가 @context를 찾지 못하는 스키마 오류가 발생했습니다.",
        actions: ["@graph로 감싸는 표준 JSON-LD 패턴으로 구조 변경", "원인을 코드 주석으로 남겨 재발 방지"],
        result: "유효한 구조화 데이터 형식으로 수정했습니다.",
        diagram: "/images/projects/graverty/3.webp",
      },
      {
        id: "4",
        category: "인터랙션",
        title: "운항 기록 카드 인터랙션 개선",
        situation:
          "마우스 휠로만 가로 스크롤이 가능해 조작성이 제한적이었고, 네이티브 스크롤바가 노출돼 시각적 완성도도 떨어졌습니다.",
        actions: ["마우스 드래그로 카드를 이동할 수 있는 이벤트 핸들러 구현", "네이티브 스크롤바 숨김 처리"],
        result: "데스크톱·모바일 공통으로 자연스러운 카드 탐색 UX를 확보했습니다.",
        diagram: "/images/projects/graverty/4.webp",
      },
    ],
    outroTitle: "배운 점",
    outro: {
      type: "learnings",
      items: [
        "브라우저별 렌더링 버그는 추측으로 고치면 재발하기 쉽고, 실기기로 원인을 좁힌 뒤 '애니메이션을 포기하고 안정적인 대안으로 교체'처럼 트레이드오프를 명시적으로 선택해야 재발하지 않는 수정이 된다는 것을 확인했습니다.",
        "디자인 토큰처럼 여러 섹션이 공유하는 결정은 선택 이유와 검토한 대안을 문서로 남겨두면, 같은 질문이 반복되지 않고 작업 기준이 흔들리지 않는다는 것을 경험했습니다.",
      ],
    },
  },
  {
    slug: "zzazo",
    badge: "Leets 팀 프로젝트",
    role: "프론트엔드 리드",
    team: "PM 1 · FE 3 · BE 3",
    contribution: "60%",
    tagline: "조건만 넣으면 시간표가 나오는 수강신청 웹 서비스",
    features: [], // TODO: 주요 기능 2~4줄
    contrib: [
      "레포 초기 설정과 features/shared 기반 폴더 구조를 설계해 3인 병렬 개발 기반 마련",
      "Figma 디자인 토큰을 Tailwind @theme에 매핑해 팀 전체 색상 하드코딩 제거",
      "persist hydration 이전 상태를 고려하지 않아 발생한 로그인 직후 오리다이렉트 문제 해결",
      "MSW mock 서버로 저장 시간표 목록 · 상세 · 삭제를 선개발, 환경변수 교체만으로 실서버 전환 가능하도록 API 계층 분리",
      "컨벤션을 명시한 CodeRabbit AI 리뷰를 도입해 사람 리뷰가 설계 · 로직에 집중하도록 개선",
      "팀원 시간표 그리드의 교시 기반 로직이 백엔드 시각 응답과 불일치함을 발견, 좌표 환산 방식을 제안해 컴포넌트 재사용",
    ],
    cases: [
      {
        id: "01-1",
        category: "협업 환경 세팅",
        title: "규칙을 사람의 기억이 아닌 도구에 맡긴 협업 환경",
        situation: "3인 팀이 하나의 레포에서 동시에 작업했습니다. 코드 스타일과 커밋 방식이 사람마다 다르면 리뷰에서 로직이 아니라 포맷과 컨벤션을 지적하는 데 시간을 쓰게 됩니다.",
        actions: [
          "ESLint · Prettier로 기준선을 맞추고, lint-staged를 Husky pre-commit 훅에 연결해 변경 파일만 자동 검사",
          "커밋 메시지 컨벤션을 commit-msg 훅으로 강제하고, 이슈 · PR 템플릿으로 모든 커밋을 이슈 번호에 연결",
          ".gitignore로 node_modules 같은 파일이 커밋에 섞이지 않게 차단",
        ],
        result: "모든 커밋이 같은 형식을 따르고 이슈로 연결되어 작업을 추적할 수 있었고, 리뷰는 포맷이 아닌 로직에 집중할 수 있었습니다.",
        diagram: "/images/projects/zzazo/01-1.webp",
      },
      {
        id: "01-2",
        category: "폴더 구조 설계",
        title: "역할과 도메인으로 나눈 폴더 구조",
        situation: "혼자 개발할 때는 (beforeLogin) · (afterLogin) 두 갈래로 충분했지만, 팀에서는 화면 조립 코드와 재사용 로직이 섞이면 화면 하나를 바꾸려다 다른 사람의 로직까지 건드리게 됩니다.",
        actions: [
          "app은 라우트 조립만, features/{도메인}은 api · hooks · store · components 재사용 로직, shared는 도메인 무관 공통 자산으로 3분할",
          "라우트 그룹으로 로그인 전 · 후 화면을 물리적으로 분리하고, 특정 화면 전용 컴포넌트는 _component에 배치",
        ],
        result: "추천 결과 화면을 전체 페이지 레이아웃으로 바꾸는 작업에서 실제로 바뀐 건 라우트 파일과 프레젠테이션 컴포넌트의 props뿐이었습니다.",
        diagram: "/images/projects/zzazo/01-2.webp",
      },
      {
        id: "01-3",
        category: "상태 관리 전략",
        title: "재조회 가능성으로 나눈 상태 관리",
        situation: "저장된 시간표(서버에 있어 언제든 재조회 가능), 로그인 세션(새로고침해도 유지), 추천 결과(재조회 API가 없는 1회성 데이터)처럼 성격이 다른 세 가지 상태가 있었습니다.",
        actions: [
          "\"재조회 API가 있는가\"를 기준으로 저장 위치를 결정",
          "재조회 가능한 서버 데이터 → TanStack Query, 1회성 데이터 → Zustand(비영속), 영속이 필요한 세션 → Zustand + persist",
        ],
        result: "추천 결과는 새로고침 시 조건 입력 화면으로 되돌아가도록 의도적으로 설계해, 캐시와 store의 이중 관리를 없앴습니다.",
        diagram: "/images/projects/zzazo/01-3.webp",
      },
      {
        id: "01-4",
        category: "MSW 목 서버",
        title: "백엔드 없이 개발을 멈추지 않는 목 서버",
        situation: "프론트엔드 리드로서, 백엔드 API가 완성되기 전에도 화면 개발이 멈추지 않아야 했습니다. API를 기다리면 팀의 작업 순서가 서로를 기다리는 병목이 됩니다.",
        actions: [
          "express + MSW 핸들러로 별도 목 서버(9090)를 띄우고 dev:mock 스크립트로 프론트 개발 서버와 함께 실행",
          "회원가입 → 이메일 인증 → 로그인, 시간표 저장 → 삭제까지 상태를 갖는 시나리오 기반 목으로 실제 응답 구조(isSuccess/code/message/data)를 재현",
        ],
        result: "백엔드 완성을 기다리지 않고 로그인부터 추천 · 저장 · 삭제까지 전체 플로우를 프론트만으로 개발하고 검증했습니다.",
        diagram: "/images/projects/zzazo/01-4.webp",
      },
    ],
    outroTitle: "배운 점",
    outro: {
      type: "learnings",
      items: [
        "규칙은 개인의 의지가 아니라 도구로 강제될 때 비로소 팀 전체에서 지켜진다는 것을 배웠습니다.",
        "데이터의 수명과 재조회 가능성에 따라 저장 위치를 정하는 것이, 도구를 먼저 고르는 것보다 중요하다는 것을 배웠습니다.",
      ],
    },
  },
  {
    slug: "skhu-box",
    badge: "팀 프로젝트",
    role: "프론트엔드 단독 개발",
    team: "FE 1 · BE 2",
    contribution: "100%",
    tagline: "선착순 신청 트래픽 폭주를 대기열 시스템으로 관리하는 사물함 예약 서비스",
    features: [], // TODO: 주요 기능 2~4줄
    contrib: [
      "Route Group으로 로그인 여부 · 역할별 레이아웃을 분리한 폴더 구조를 설계해 관리자 · 학생 20여 개 페이지를 독립적으로 개발",
      "accessToken · refreshToken 쿠키 기반 인증 체계 구축, 미들웨어에서 역할별 접근 제어와 토큰 자동 갱신을 처리하고 401 응답 시 재발급 후 원요청을 자동 재시도하도록 구현",
      "신청 트래픽 폭주에 대비한 실시간 대기열 구현, 관리자가 대기열 모드를 켜면 학생 화면이 폴링으로 순번을 갱신하고 진입 순서가 되면 자동으로 신청 화면으로 전환",
      "배포 환경에서만 재현되는 관리자 페이지 이동 실패의 원인이 쿠키 SameSite 속성 누락임을 파악해 해결, 인증 흐름 전반의 쿠키 설정을 함께 점검",
      "관리자 통계 대시보드에 Recharts 기반 시각화 6종(건물별 비교, 월별 추이, 시간대별 이용 패턴, 민원 유형 분포, 층별 히트맵, KPI)을 구현",
    ],
    cases: [
      {
        id: "03-1",
        category: "대표 기능",
        title: "선착순 신청을 공정하게 만든 대기열 시스템",
        situation: "매 학기 초 사물함 신청 오픈 시점에 동시 접속이 몰렸습니다. 선착순 구조에서 요청이 몰리면 서버 부하는 물론 처리 순서가 꼬여 불공정한 결과가 나올 수 있습니다.",
        actions: [
          "관리자가 상황에 따라 대기열 모드를 ON/OFF (평시에는 즉시 신청, 개강 초에는 대기열)",
          "ON 상태에서 학생 화면은 3초 간격 폴링으로 내 순번을 조회",
          "순번이 500번 이하로 들어오면 신청 화면으로 자동 전환하는 임계치 게이팅",
          "응답 없는 1번 사용자를 건너뛰는 관리자용 대기열 스킵 기능",
        ],
        result: "신청 오픈 시점의 요청을 순번대로 나눠 받아, 서버 부하와 처리 순서 문제를 사용자 화면 흐름 안에서 제어할 수 있게 했습니다.",
        diagram: "/images/projects/skhu-box/03-1.webp",
      },
      {
        id: "03-2",
        category: "인증 아키텍처",
        title: "이중 토큰 방어와 배포 환경 장애 해결",
        situation: "accessToken만 쓰면 만료 시 요청이 실패하고, 매번 재로그인은 UX 손해입니다. 실제로 배포 후 관리자가 로그인해 페이지를 이동하면 접근이 막히는 장애가 있었습니다.",
        actions: [
          "401 응답 시 refreshToken으로 accessToken을 재발급하고 원요청을 자동 재시도",
          "장애 원인이 세션 쿠키의 SameSite 속성 누락으로 관리자 페이지 이동 시 쿠키가 전송되지 않는 것임을 파악",
          "SameSite=Lax를 추가하고 인증 흐름 전반의 쿠키 설정을 함께 점검",
        ],
        result: "세션 쿠키가 정상 전송되어 모든 페이지에서 세션이 유지되었습니다.",
        diagram: "/images/projects/skhu-box/03-2.webp",
      },
      {
        id: "03-3",
        category: "번들 최적화",
        title: "무거운 의존성을 필요한 곳에만 배치한 실측 성능",
        situation: "관리자 통계 대시보드에는 372KB의 Recharts가 필요했지만, 로그인이나 신청처럼 대부분의 화면에는 필요 없는 의존성이었습니다.",
        actions: [
          "Recharts를 /analytics 라우트에만 연결 (client-reference-manifest 기준)",
          "다른 21개 라우트 번들에는 포함되지 않도록 구조 분리",
          "로컬 프로덕션 빌드에서 Lighthouse(Desktop)로 실측",
        ],
        result: "/, /login, /signup/step1 모두 Performance 100 (LCP 0.5~0.6s, TBT 0ms, CLS 0), SEO · Accessibility 100, Best Practices 96을 기록했습니다.",
        diagram: "/images/projects/skhu-box/03-3.webp",
      },
      {
        id: "03-4",
        category: "접근성 개선",
        title: "발견 → 분석 → 해결 → 실측으로 증명한 접근성",
        situation: "Lighthouse Accessibility 점수가 / 95, /login 93, /signup/step1 82로 페이지마다 부족했습니다.",
        actions: [
          "label과 input의 연결 누락을 htmlFor/id로 연결하고, 인증 코드 입력에 aria-label 추가",
          "보조 텍스트 대비 2.4:1을 text-gray-600 등으로 조정해 대비 기준 충족",
          "<main> 랜드마크를 추가해 스크린 리더 탐색 구조 보완",
        ],
        result: "세 페이지 모두 Accessibility 100으로 개선하고 재측정까지 완료했습니다.",
        diagram: "/images/projects/skhu-box/03-4.webp",
      },
    ],
    outroTitle: "숫자로 본 결과",
    outro: {
      type: "stats",
      items: [
        { value: "100", label: "Lighthouse Performance", sub: "주요 3개 페이지 · Desktop" },
        { value: "82 → 100", label: "Accessibility", sub: "/signup/step1 재측정" },
        { value: "1 / 22", label: "Recharts 포함 라우트", sub: "372KB를 /analytics에만" },
        { value: "6종", label: "관리자 통계 시각화", sub: "Recharts 기반 대시보드" },
      ],
    },
  },
  {
    slug: "teaming",
    badge: "성공회대학교 제16회 IT 경진대회 · 은상 · 인기상",
    role: "웹 프론트엔드 단독 개발",
    team: "FE 2 (Web 1 · App 1) · BE 2",
    contribution: "100%",
    tagline: "벌칙 기반 팀 협업 통합 플랫폼",
    features: [], // TODO: 주요 기능 2~4줄
    contrib: [
      "Next.js App Router 라우트 그룹과 라우트 종속 _component 컨벤션을 설계해 랜딩 · 인증 · 인앱 화면을 독립적으로 개발",
      "NextAuth 기반 인증 계층 구축, 자체 로그인과 카카오 · 네이버 소셜 로그인을 연동하고 OAuth 토큰을 백엔드 JWT로 교환 · 자동 갱신하는 세션 관리 구현",
      "프로덕션 빌드에 남아 있던 491건의 console 로그(특히 WebSocket 이벤트마다 실행되는 로그)를 빌드 타임에 제거해 로그인 이후 라우트의 번들 크기를 최대 5.8% 절감",
      "3벌로 중복돼 있던 컴포넌트(WebGL 배경, 타이핑 애니메이션)를 공용 컴포넌트로 통합해 약 470줄의 중복 · 죽은 코드를 제거하고, 그 과정에서 발견한 useEffect 의존성 누락 버그를 함께 수정",
    ],
    cases: [
      {
        id: "04-1",
        category: "렌더링 최적화",
        title: "채팅 메시지 리스트 리렌더링 52배 개선",
        situation: "채팅방에서 타이핑하거나 메시지 하나에 마우스만 올려도 화면의 메시지 전체(수십~수백 개)가 다시 렌더링됐습니다. ChatMessage에 memo가 없었고, 메시지 · 유저 배열을 렌더마다 새로 만들어 props 참조가 매번 달라지는 구조였습니다.",
        actions: [
          "ChatMessage를 React.memo로 래핑",
          "WeakMap + useMemo로 배열 참조를 안정화해 memo가 실제로 동작하도록 수정",
          "상위에서 관리하던 hover 상태를 내려 불필요한 렌더 제거",
          "읽음 경계 로직을 훅으로 통합해 리렌더 경로를 단일화",
          "메시지 300개 렌더 후 타이핑 30회를 React.Profiler로 측정",
        ],
        result: "커밋당 평균 렌더 시간이 18.803ms에서 0.363ms로, 52배(-98%) 줄었습니다.",
        diagram: "/images/projects/teaming/04-1.webp",
      },
      {
        id: "04-3",
        category: "버그 수정",
        title: "ActionBar 무한 렌더링의 원인 추적",
        situation: "채팅방 목록을 그리는 ActionBar가 세션 상태가 갱신될 때마다 끝없이 다시 렌더링됐습니다.",
        actions: [
          "원인 체인 추적: session.backendError가 매 렌더 새 객체로 생성 → useCallback 의존성 변경 → fetchRooms 재생성 → useEffect 재실행 → setState로 다시 리렌더",
          // TODO: 해결 방법 한 줄 (예: 매번 바뀌는 객체 대신 필요한 원시값만 의존성에 두도록 수정)
        ],
        result: "", // TODO: 결과 한 줄
        diagram: "/images/projects/teaming/04-3.webp",
        todo: "해결 방법·결과 문구 확정 전 — 확정되면 actions·result를 채우고 이 줄을 지운다",
      },
      {
        id: "04-4",
        category: "빌드 최적화",
        title: "프로덕션 빌드에서 console 로그 491건 제거",
        situation: "console.log/warn/error가 491건 있었고, 특히 STOMP 이벤트 핸들러에서 rooms 배열을 가공해 로그로 출력하면서 불필요한 직렬화 비용과 번들 증가가 생겼습니다.",
        actions: [
          "next.config.ts에 compiler.removeConsole 적용",
          "프로덕션에서만 활성화하고 console.error는 유지해 디버깅 수단은 남김",
        ],
        result: "/mainpage Route JS가 84.8kB에서 80.7kB로(-4.1%), First Load JS가 223kB에서 219kB로 줄었습니다.",
        diagram: "/images/projects/teaming/04-4.webp",
      },
    ],
    outroTitle: "숫자로 본 결과",
    outro: {
      type: "stats",
      items: [
        { value: "52×", label: "채팅 리스트 렌더 시간 감소", sub: "18.803ms → 0.363ms" },
        { value: "491건", label: "프로덕션 console 로그 제거", sub: "console.error는 유지" },
        { value: "-4.1%", label: "/mainpage Route JS", sub: "84.8kB → 80.7kB" },
        { value: "470줄", label: "중복 · 죽은 코드 제거", sub: "공용 컴포넌트로 통합" },
      ],
    },
  },
];

export function getProjectDetail(slug: string) {
  return PROJECT_DETAILS.find((detail) => detail.slug === slug);
}

/** 순환 순서에서 다음 프로젝트 slug */
export function getNextDetailSlug(slug: string) {
  const index = PROJECT_DETAILS.findIndex((detail) => detail.slug === slug);
  return PROJECT_DETAILS[(index + 1) % PROJECT_DETAILS.length].slug;
}

/** 서버에서 확인한 파일 존재 여부 — 클라이언트 모달은 파일 시스템을 볼 수 없어 전달받는다 */
export type DetailAssets = Record<string, { image: boolean; diagrams: Record<string, boolean> }>;
