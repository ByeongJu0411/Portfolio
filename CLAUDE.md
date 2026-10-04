@AGENTS.md

# 전병주 포트폴리오 — 프로젝트 규칙

프론트엔드 개발자 포트폴리오 사이트. 이 사이트 자체가 실력 증명이므로 **완성도, 성능, 접근성**을 화려함보다 우선한다.

- 기술 스택: Next.js 16 (App Router, `src/app`) / React 19 / TypeScript / Tailwind CSS v4 (`@tailwindcss/postcss`)
- 페이지: 원페이지 구성. Home(`/`)에 히어로 → About(`#about`) → Projects(`#projects`) → Skills(`#skills`) → Contact(`#contact`) 섹션을 쌓는다. 메뉴·링크 정의는 `src/lib/site.ts`.
- 푸터: `SiteFooter`(`layout.tsx`의 `<main>` 바깥 → contentinfo 랜드마크). 위 1.5px 검정선 → 왼쪽 로고 `전병주.` + 히어로 소개 문장 / 오른쪽 `SECTIONS`(메뉴) · `LINKS`(GitHub · LinkedIn · 이력서 ↗ 새 탭, Email) 2열 → 연한 구분선 아래 `© 2026 전병주. All rights reserved.` · `맨 위로 ↑` (mono). 배경은 도트 그대로, 글자와 선만.
- 헤더: sticky. 맨 위에서는 시안 그대로(투명), 스크롤 후에는 반투명 컴팩트 바. 아래로 스크롤하면 숨고 위로 올리면 나타난다(`AutoHideHeader`). 모바일 메뉴가 열려 있거나 키보드 포커스가 헤더 안에 있으면 숨기지 않는다.
- 메뉴의 `#섹션` 링크는 CSS `scroll-behavior: smooth`로 이동(reduced-motion이면 즉시).
- 디자인 원본: Figma [TODO: 링크 기입]
- 기준 해상도: Desktop 1440×900, Mobile 390×844
- 브레이크포인트: Mobile `< 768px`, Desktop `≥ 768px` (Tailwind `md:`). 모바일 우선으로 작성하고 `md:`로 데스크톱을 덮어쓴다.
  - 예외: About·Projects 섹션은 2열(사진·소개 / 이미지·정보)이 들어갈 폭이 필요해 `lg:`(1024px)에서 데스크톱 배치로 전환한다.
  - 칸 안의 가로 배치(연락처 한 줄, TEAM·PERIOD 2열)는 화면 폭이 아니라 그 칸의 폭 기준 container query(`@container`)로 전환한다.

## 명령어

```bash
npm run dev     # 개발 서버
npm run build   # 프로덕션 빌드 (작업 완료 전 통과 확인)
npm run lint    # ESLint
```

## Next.js 16 주의사항

학습 데이터와 API가 다르다. 코드 작성 전 `node_modules/next/dist/docs/`의 해당 문서를 확인한다.

- `next/image`의 `priority`는 **deprecated** → LCP 이미지는 `preload` 또는 `fetchPriority="high"` 사용.
- 폰트는 `next/font/google`로만 로드한다 (`<link>`로 Google Fonts 직접 로드 금지). 셀프 호스팅·`display: swap`이 자동 적용된다.

---

## 1. 작업 원칙

- 색상, 폰트, 간격은 **반드시 아래 토큰으로만** 사용한다. 하드코딩된 hex·px 값 금지 (Tailwind arbitrary value `bg-[#...]`, `text-[26px]` 포함).
  - 간격은 Tailwind 기본 spacing 스케일(0.25rem 단위, 예: `gap-4.5` = 18px)을 토큰으로 간주한다.
  - 브레이크포인트별로 바뀌는 값은 `globals.css`의 `:root` 변수(`--fs-*`, `--page-gutter` 등)로 두고 `@theme inline`에서 연결한다.
- 디자인의 px 값은 1440 기준 시안 값이다. 구현은 좌표 복사가 아니라 **flex/grid + clamp() 기반 반응형**으로 한다. 겹침이 필요한 장식 레이어(캐릭터·스티커·반짝이)만 섹션 기준 `absolute`를 쓰되, 위치는 %·clamp()로 잡는다.
- 한글 본문은 `word-break: keep-all`(body 전역). 시안과 줄바꿈을 맞춰야 하는 제목만 예외로 `break-normal`.
- 시맨틱 마크업: 링크는 `<a href>`(내부 이동은 `next/link`), 동작은 `<button>`. div에 onClick 금지. 아이콘 전용 버튼은 `aria-label` 필수.
- 모든 애니메이션은 `prefers-reduced-motion: reduce`에서 꺼지거나 즉시 완료되어야 한다 (Tailwind `motion-safe:` / `motion-reduce:` 활용).
- 이미지는 `alt` 필수(장식 이미지는 `alt=""`). LCP 이미지(히어로 캐릭터)는 우선 로드하고 크기를 명시해 레이아웃 이동(CLS)을 막는다.
- 목표: Lighthouse Performance / Accessibility 90 이상.
- 텍스트 대비 4.5:1 이상 (24px 이상 큰 글자는 3:1). 포인트 컬러(노랑)는 **밝은 배경 위 텍스트 색으로 쓰지 않는다** — 장식, 배경, 큰 글자 포인트에만.
- 라이트 테마 단일. create-next-app 기본 다크모드 미디어쿼리와 Geist·Arial 설정은 제거한다.
- 클라이언트 컴포넌트(`"use client"`)는 인터랙션이 필요한 최소 단위로만 분리한다. 정적 마크업은 서버 컴포넌트로 유지.

---

## 2. 색상 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-bg` | `#F7F6F2` | 페이지 배경 (오프화이트) |
| `--color-text` | `#141414` | 기본 텍스트, 검정 버튼, 큰 타이틀 |
| `--color-text-sub` | `#5F5E59` | 보조 텍스트, 코드 라벨, 스크롤 힌트 |
| `--color-text-muted` | `#3D3C38` | 아웃라인 칩 텍스트 |
| `--color-border` | `#C9C7BF` | 칩 테두리, 구분선 |
| `--color-accent` | `#F2B33D` | 포인트 컬러 (마침표, 스티커, 반짝이, 상태 점) |
| `--color-on-dark` | `#F7F6F2` | 검정 배경 위 텍스트 |
| `--color-dot` | `rgba(20, 20, 20, 0.09)` | 배경 도트 그리드 |
| `--color-link-hover` | `#5C4410` | 링크 hover |

토큰은 `src/app/globals.css`의 `@theme`에 정의해 Tailwind 유틸리티로 쓴다 (예: `bg-bg`, `text-text-sub`, `border-border`, `fill-accent`).

```css
@theme {
  --color-bg: #F7F6F2;
  --color-text: #141414;
  --color-text-sub: #5F5E59;
  --color-text-muted: #3D3C38;
  --color-border: #C9C7BF;
  --color-accent: #F2B33D;
  --color-on-dark: #F7F6F2;
  --color-dot: rgba(20, 20, 20, 0.09);
  --color-link-hover: #5C4410;
}
```

### 배경 도트 그리드
이미지 사용 금지. CSS로만 구현한다.
```css
.bg-dots {
  background-color: var(--color-bg);
  background-image: radial-gradient(var(--color-dot) 1px, transparent 1.3px);
  background-size: 20px 20px;
}
@media (width >= 768px) {
  .bg-dots { background-size: 24px 24px; }
}
```

---

## 3. 타이포그래피

### 폰트 (`next/font/google`)
| 역할 | 폰트 | 굵기 | 토큰 |
|---|---|---|---|
| 디스플레이 (FRONT/END, 로고) | Bricolage Grotesque | 800 | `--font-display` |
| 본문 (한글·영문) | IBM Plex Sans KR | 400 / 500 / 700 | `--font-body` |
| 코드 라벨, 스티커, 스크롤 힌트 | JetBrains Mono | 500 / 700 | `--font-mono` |

- `layout.tsx`에서 각 폰트를 `variable` 옵션으로 CSS 변수에 연결하고, `globals.css`의 `@theme inline`에서 토큰으로 매핑한다 → `font-display`, `font-body`, `font-mono` 유틸리티.
  ```css
  @theme inline {
    --font-display: var(--font-bricolage), sans-serif;
    --font-body: var(--font-plex-kr), sans-serif;
    --font-mono: var(--font-jetbrains), monospace;
  }
  ```
- 필요한 굵기만 `weight`로 지정해 로드한다.
- IBM Plex Sans KR은 `next/font`에서 `subsets: ["latin"]`만 지원한다. 한글 글리프 로딩/폴백을 실제 화면에서 확인한다.
- Inter, Roboto, Arial은 사용하지 않는다.
- `<html lang="ko">`.

### 타입 스케일
| 토큰 | Desktop | Mobile | 굵기 | 행간 | 자간 | 용도 |
|---|---|---|---|---|---|---|
| `--text-hero` | 250px | 108px | 800 | 0.84 | -0.045em | FRONT / END. |
| `--text-logo` | 28px | 24px | 800 | 1 | -0.03em | 로고 "전병주." |
| `--text-lead` | 26px | 19px | 700 | 1.4 | -0.02em | 히어로 소개 문장 |
| `--text-body` | 16px | 15px | 400~500 | 1.6 | 0 | 본문, 메뉴, 버튼 |
| `--text-small` | 14px | 13px | 500 | 1 | 0 | 칩 |
| `--text-code` | 15px | 12px | 500 | 1 | 0 | 코드 라벨 |
| `--text-caption` | 12px | — | 500 | 1 | 0.2em | SCROLL 힌트 |

`@theme`에 정의해 `text-hero`, `text-lead` 등으로 사용한다. Tailwind v4의 `--text-*--line-height`, `--text-*--letter-spacing`으로 행간·자간도 함께 묶는다. 큰 값은 fluid로:
```css
--text-hero: clamp(108px, 17.4vw, 250px);
--text-lead: clamp(19px, 1.8vw, 26px);
```

---

## 4. 간격·모양 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `--page-gutter` | Desktop 80px / Mobile 20px | 좌우 여백 |
| `--radius-button` | 14px (Mobile 12px) | 사각 버튼 |
| `--radius-pill` | 999px | 칩, 이력서 버튼 |
| `--radius-sticker` | 10px | `</>` 스티커 |
| `--border-width` | 1.5px | 아웃라인 버튼 |
| 버튼 높이 | Desktop 52px / Mobile 48px | 터치 타깃 44px 이상 유지 |

`--radius-*`는 `@theme`에 넣어 `rounded-button`, `rounded-pill`, `rounded-sticker`로 사용한다.

---

## 5. 히어로 섹션 명세 (Home)

### 텍스트 콘텐츠
| 요소 | 내용 |
|---|---|
| 로고 | `전병주` + 포인트 컬러 `.` (Desktop·Mobile 공통) |
| 메뉴 | About · Projects · Skills · Contact (4개 유지) |
| 헤더 우측 버튼 | 이력서 ↗ (외부 링크 — `target="_blank" rel="noopener noreferrer"`, 새 창 안내 텍스트 포함). 이력서 수정 전에는 `SITE.resumeReady: false` → 헤더·히어로·푸터의 이력서가 `<button>`이 되어 토스트 "수정 중입니다. 조금만 기다려주세요."를 띄운다 (`ResumeLink`, `Toaster`). 준비되면 `true`로만 바꾼다 |
| 코드 라벨 | `<Hero name="전병주" role="Frontend" />` — 속성값만 `--color-text`, 나머지 `--color-text-sub` |
| 타이틀 | `FRONT` / `END.` 두 줄, 마침표만 포인트 컬러, `<h1>` 사용 |
| 상태 칩 | `● 구직 중` (검정 채움, 점은 포인트 컬러), `인천 거주` (아웃라인) |
| 소개 문장 | 사용자가 멈칫하는 순간을 찾아 / 원인부터 구조까지 다시 설계합니다. |
| 성과 한 줄 | 혼자 짜던 코드에서, 팀이 함께 편하게 일하는 환경을 만드는 개발자로. (Desktop만 표시, 모바일 시안에는 없음) |
| 버튼 | `프로젝트 보기 →` (검정 채움), `GitHub` (아웃라인, 코드 아이콘) |
| 스크롤 힌트 | 세로쓰기 `SCROLL` + 세로선 48px (장식이므로 `aria-hidden`) |

### 레이어 순서 (z-index, 아래 → 위)
1. 배경 도트 그리드
2. 타이틀 FRONT / END.
3. 캐릭터 이미지
4. `</>` 스티커, 반짝이 장식
5. 헤더, 텍스트 블록, 버튼

캐릭터가 타이틀 **앞**에 겹쳐야 한다. 패럴랙스를 위해 2·3·4는 각각 별도 요소로 분리한다. 장식(스티커·반짝이)은 `aria-hidden="true"`.

### Desktop 배치 (1440×900 기준, 좌상단 원점 — 시안 참고값)
| 요소 | x | y | 크기 / 비고 |
|---|---|---|---|
| 헤더 | 80 ~ 1360 | 32 | 높이 52, 메뉴 간격 44px |
| 이력서 버튼 | 헤더 우측 | — | 높이 44, 좌우 padding 20, pill |
| 코드 라벨 | 86 | 160 | — |
| 타이틀 | 72 | 188 | 2줄, 약 420px 높이 |
| 캐릭터 | 700 | 200 | 672×700, **섹션 하단에 붙임** (bottom: 0) |
| `</>` 스티커 | 772 | 700 | 72×44, rotate(-9deg), 노트북 덮개 위 |
| 반짝이 (큰, 노랑) | 1330 | 240 | 44×44 |
| 반짝이 (작은, 검정) | 1290 | 300 | 20×20 |
| 텍스트 블록 | 86 | 632 | 폭 560, 세로 stack gap 18px |
| └ 칩 행 | — | — | 높이 32, gap 10px |
| └ 버튼 행 | — | — | gap 12px, 위 여백 +6px |
| 스크롤 힌트 | right 40 | bottom 40 | — |

### Mobile 배치 (390×844 기준 — 시안 참고값)
| 요소 | x | y | 크기 / 비고 |
|---|---|---|---|
| 헤더 | 20 ~ 370 | 20 | 로고 + 햄버거 버튼 44×44 (메뉴 링크 숨김) |
| 코드 라벨 | 22 | 92 | `<Hero name="전병주" />` 로 축약 |
| 타이틀 | 16 | 114 | 108px |
| 텍스트 블록 | 22 ~ 368 | 312 | 칩 → 소개 문장 → 버튼 (gap 14px) |
| 버튼 | — | — | `프로젝트 보기`(flex-grow) + `이력서`, 높이 48 |
| 캐릭터 | 20 | 하단 | 360×375, bottom: 0 |
| `</>` 스티커 | 58 | 728 | 44×28 |
| 반짝이 | 336 | 500 | 28×28 |
| 스크롤 힌트 | — | — | 모바일에서는 숨김 |

- 햄버거 메뉴: `<button aria-expanded aria-controls>`, Esc로 닫기, 열린 동안 포커스 관리.

### 에셋
- `public/images/character-transparent.png` — 배경 제거된 캐릭터 (1105×1150).
  - `next/image`로 렌더링: `width`/`height` 명시, `sizes` 지정(반응형 srcset 자동 생성), `preload` 또는 `fetchPriority="high"`.
  - AVIF/WebP는 `next.config.ts`의 `images.formats: ["image/avif", "image/webp"]`로 자동 변환한다.
- 아이콘은 인라인 stroke SVG (stroke-width 2~2.2, round cap, `currentColor`). 이모지 사용 금지.
- 파비콘: `src/app/icon.png`(512, 브라우저 탭) · `src/app/apple-icon.png`(180, 투명 모서리를 바탕색으로 채운 정사각형) · `src/app/favicon.ico`(16/32/48). 원본은 `design/icon-512.png`. Next가 `<link>`를 자동 생성한다.

---

## 6. About 섹션 명세 (Home, 히어로 바로 아래)

참고 시안(로컬 전용, 커밋하지 않음): `design/about-desktop.reference.html`, `design/about-mobile.reference.html` — 폴더 동작이 vanilla JS로 들어 있음. 동작 확인용이며 구현은 React 상태로 한다.

### 콘텐츠
| 요소 | 내용 |
|---|---|
| 섹션 라벨 | `<About />` (mono) + 가로선 64px |
| 대표 문장 `<h2>` | 사용자가 **멈칫하지 않는 화면**을 만드는 / 프론트엔드 개발자 전병주입니다 — "멈칫하지 않는 화면"에 포인트 컬러 형광펜 밑줄 (`linear-gradient(transparent 60%, var(--color-accent) 60%)`) |
| 증명사진 | `public/images/profile.jpg` (EXIF 제거). 원본 비율(7:9) 그대로 표시해 잘리지 않게 — 데스크톱 폭 300px(≈300×386, 모바일도 최대 300px), radius 20px. `src/data/about.ts`의 `PROFILE_PHOTO`가 null이면 3:4 placeholder |
| 소개글 3단락 | 1) 개발 태도 2) 문제 해결 사례(티밍 · Verty) 3) 팀 환경(ZZAZO · Verty) — 문구는 시안 그대로 사용 |
| 연락처 (항상 노출) | 소개글 아래, 상단 구분선 + 아이콘 3개: 010-9165-7205 (`tel:`), wjsqudwn981789@gmail.com (`mailto:`), 인천광역시 남동구 담방로 21번길 24 |

### 폴더 4개 (EDUCATION · ACTIVITIES · AWARDS · CERTIFICATES)
| 폴더 | 번호 | 부제 | 서류 파일명 | 서류 내용 |
|---|---|---|---|---|
| EDUCATION | 01 | 학력 · 전공 학점 | education.md | 성공회대학교 IT융합자율학부 · SW / 컴퓨터공학 전공, 2021 – 2027.02 졸업 예정, 전공 학점 SW 4.30 · 컴퓨터공학 4.25 (/ 4.5, 큰 숫자) |
| ACTIVITIES | 02 | 대외 활동 4건 | activities.md | 제목 + 기간만 (최신순): KUSITMS(큐시즘) 34기 2026.08.15 – ing / Leets · IT 창업 동아리 (가천대학교) 2026.07.01 – 2026.08.06 / 성공회대학교 제16회 IT 경진대회 2025.09.14 – 2025.10.24 / GDG on Campus SKHU 3기 2024.09.12 – 2025.06.19 |
| AWARDS | 03 | 수상 3건 | awards.md | 2025 은상 · 인기상 (성공회대학교 제16회 IT 경진대회) / 2025 장려상 (성공회대학교 창업 아이디어 경진대회) / 2025 최우수 창업동아리 선정 (GoodWin Incubating) |
| CERTIFICATES | 04 | 자격증 N건 (없으면 "자격증 · 준비 중") | certificates.md | 취득일 · 자격증명 · 발급기관. 아직 없음 → 안내 문구. `src/data/about.ts`의 `CERTIFICATES`에 추가하면 목록으로 바뀐다 |

- 콘텐츠 데이터(학력·활동·수상·연락처)는 컴포넌트에 하드코딩하지 않고 데이터 파일로 분리해 map으로 렌더링한다.
- 폴더 모양: 검정 뒷판 + 탭(폭 44%), 안에 흰 미니 서류(회색 줄 4개), 앞판은 포인트 컬러. 앞판에 번호·이름(mono)·부제.
- 데스크톱 4열 grid gap 40px, 폴더 높이 230px / 모바일 2×2 grid gap 10px, 높이 132px(부제 숨김). 모바일 4열은 폴더가 80px로 좁아져 이름이 들어가지 않는다. 폴더 이름은 데스크톱에서 `clamp(14px, 1.39vw, 20px)`.
- 폴더 위에 안내 문구 `// 폴더를 눌러 서류를 꺼내보세요` (mono, `--color-text-sub`).

### 폴더 인터랙션 (필수 동작)
1. **초기 상태**: 전부 닫힘.
2. **hover / focus-visible**: 미니 서류가 위로 살짝 나옴(translateY -30px), 앞판 `rotateX(-12deg)` (부모 perspective 900px, origin 하단).
3. **클릭**: 해당 서류가 그 폴더 위치에서 `scale(.45)` → 원래 크기로 커지며 폴더 **위쪽으로** 올라와 사진·소개글 영역을 **일부만** 덮는다 (데스크톱 폭 880px 가운데 정렬·높이 460px / 모바일 좌우 10px·높이 420px). 페이지 높이는 변하지 않는다 (오버레이, 아래 콘텐츠 밀지 않음).
4. 서류는 폴더보다 **뒤 레이어**(폴더 z-index 위)라서 폴더 뒤에서 뽑혀 나오는 느낌을 준다. 열린 폴더는 미니 서류가 사라지고 앞판 `rotateX(-20deg)` 유지.
5. **다른 폴더 클릭**: 현재 서류는 즉시 들어가고, 새 서류는 0.18초 지연 후 나온다. 한 번에 하나만 열림. (닫힌 상태에서 처음 열 때는 지연 없음)
6. **닫기**: 같은 폴더 재클릭, 서류의 X 버튼, `Esc` 키.
7. 이징 `cubic-bezier(.2,.8,.2,1)`, 서류 0.36s / 폴더 0.32s.

구현 메모: 닫힌 서류는 자기 폴더 중심(열 번호·행 번호 기준)에서 출발한다 — 모바일 2×2, 데스크톱 4열. About 섹션은 `overflow-x: clip`(맨 오른쪽 폴더 뒤 서류가 좁은 화면에서 가로 스크롤을 만들지 않게). 닫힌 서류가 내려가는 정도는 데스크톱 75% / 모바일 55%. 모바일 폴더(132px)가 낮아 75%면 줄어든 서류가 폴더 아래로 삐져나온다. 서류는 각 폴더 버튼 바로 뒤 DOM에 두어 Tab 순서가 폴더 → 열린 서류 → 다음 폴더로 흐른다. X·Esc로 닫으면 포커스를 해당 폴더로 돌려준다.

### 접근성 (필수)
- 폴더는 `<button>` + `aria-expanded` + `aria-controls`, 서류는 `role="region"` + `aria-label`.
- 닫힌 서류는 `visibility: hidden`(트랜지션 끝난 뒤 적용)으로 Tab 순서·스크린 리더에서 제외, `aria-hidden` 동기화. 내용은 DOM에 유지(SEO).
- X 버튼은 `aria-label="서류 닫기"`, 터치 타깃 40px 이상(모바일 44px).
- `prefers-reduced-motion: reduce`이면 트랜지션 없이 즉시 전환.

---

## 7. Projects 섹션 명세 (Home, About 바로 아래)

참고 시안(로컬 전용, 커밋하지 않음): `design/projects-desktop.reference.html`, `design/projects-mobile.reference.html`

### 섹션 헤더
- 라벨 `<Projects />` (mono) + 가로선 64px
- `<h2>` 주요 프로젝트 / 우측(모바일은 아래) 보조 문구: 자세한 과정과 트러블슈팅은 각 프로젝트 상세에서 볼 수 있어요.

### 프로젝트 데이터 (이 순서대로)
| # | 이름 | 한 줄 소개 | TEAM | PERIOD | STACK (앞 6개 노출, 나머지는 +N) |
|---|---|---|---|---|---|
| 00 | GraVerty | UAM 기업 Verty의 브랜드·기술 소개 랜딩 페이지 (Verty 기업 연계, 맨 위) | 기획 2 · 디자인 2 · Frontend 2 · Backend 2 | 2026.09.02 – 2026.09.18 | Next.js, React, TypeScript, Tailwind, GSAP, next-intl, Lenis, Vitest, React Testing Library, pnpm — GitHub 비공개, 사이트 https://gra-verty-fe.vercel.app |
| 01 | ZZAZO | 조건에 맞는 시간표를 자동으로 추천하는 가천대학교 수강신청 보조 서비스 | PM 1 · Frontend 3 · Backend 3 | 2026.07.01 – 2026.08.06 | Next.js, React, TypeScript, Tailwind, TanStack Query, Zustand, React Hook Form, Zod, MSW, Storybook, pnpm, Husky, CodeRabbit |
| 02 | SKHU BOX | 성공회대학교 스마트 사물함 예약 시스템 | Frontend 1 · Backend 2 | 2026.03.25 – 2026.06.16 | Next.js, React, TypeScript, Tailwind, Recharts, react-hot-toast, ESLint |
| 03 | 티밍 | 결제 기반 팀플 매칭방부터 실시간 채팅, 과제 제출, 벌칙까지 지원하는 팀 프로젝트 협업 서비스 | Frontend 2 (Web 1 · App 1) · Backend 2 | 2025.09.14 – 2025.10.24 | Next.js, React, TypeScript, Toss Payments, NextAuth.js, CSS Modules, STOMP/SockJS |
| 04 | Portfolio | 완성도·성능·접근성을 기준으로 직접 설계하고 구현하고 있는 개인 포트폴리오 사이트 | 개인 프로젝트 | 2026.10.01 – ing (진행 중) | Next.js, React, TypeScript, Tailwind, CSS Modules, ESLint |

- 데이터는 projects 데이터 파일로 분리하고 map으로 렌더링한다. 필드: `slug, name, tagline, team, start, end, stack[], image, imageAlt, githubUrl, tint`. `end: null`이면 진행 중(● ing, `OngoingBadge`). (상세는 페이지가 아니라 모달로 띄울 예정이라 `detailHref` 없음)
- 대표 이미지는 사용자가 직접 넣는다. 경로 규칙: `public/images/projects/{slug}.webp` (16:10). 이미지가 없으면 placeholder(배경색 + 흰 브라우저 창)를 보여준다.
  - 화면 캡처는 카드 창 비율(데스크톱 약 1.72, 모바일 약 1.80)에 맞춰 잘라 넣어야 아래 빈 여백 없이 보인다.
  - 같은 파일 이름으로 이미지를 교체하면 next/image 최적화 캐시가 크기별로 예전 이미지를 계속 보낸다. 교체 후 `.next/dev/cache/images`(개발 서버)와 `.next/cache/images`(`next start`)를 지운다.
- 배경 tint: GraVerty `#DFE5EA`, ZZAZO `#EAE6DC`, SKHU BOX `#E9E3E5`, 티밍 `#E2E6EC`, Portfolio `#E3E8E2` — 토큰(`--tint-*`)으로 등록해서 사용.
- GitHub: ZZAZO `https://github.com/Leets-Official/ZZAZO-FE`, SKHU BOX `https://github.com/SKHU-BOX/SKHU_BOX-FrontEnd`, 티밍 `https://github.com/GoodSpace-Kr/Teaming-FrontEnd`, Portfolio `https://github.com/ByeongJu0411/Portfolio`

### 카드 레이아웃
- 데스크톱: grid 640px | 1fr, gap 72px, 세로 가운데 정렬. 프로젝트 사이 간격 112px. 카드 테두리·박스 그림자 없음 (여백으로만 구분).
- 모바일: 이미지(전체 폭, 16:10) → 정보 세로 스택, 프로젝트 사이 64px.
- 대표 이미지: radius 24px(모바일 18px), tint 배경 위에 흰 브라우저 창(상단 점 3개, 그림자 `0 18px 40px rgba(20,20,20,.10)`)이 하단에 붙어 있고 실제 스크린샷은 창 안에 들어간다.
- 정보 순서: 번호 `01 / 04`(mono) → 이름 `<h3>` 40px(모바일 28px) → 한 줄 소개 17px → 구분선 → TEAM · PERIOD 2열(`<dl>`, 라벨 mono 12px) → STACK 칩 → 버튼 2개.
- 스택 칩: 높이 30px, pill, 흰 배경 + 1px `#D6D4CC` 테두리. +N 칩은 검정 채움, `title`(마우스)과 sr-only 텍스트(스크린리더)로 숨긴 스택 이름 제공.
- placeholder 안내 문구는 대비 기준을 위해 `--color-text-sub` (시안의 `#9a988f`는 흰 배경 대비 부족).
- 버튼: `자세히 보기 →`(검정 채움) + `GitHub`(아웃라인, 코드 아이콘). 높이 48px(모바일 46px, 자세히 보기는 flex-grow).

### 인터랙션
- 대표 이미지 hover, `자세히 보기` focus-visible: 브라우저 창이 위로 10px 떠오름 (0.45s, `cubic-bezier(.2,.8,.2,1)`).
- `자세히 보기`는 상세 **모달**을 여는 `<button>` (모달은 다음 단계 — 그 전까지 `aria-disabled`). 대표 이미지도 같은 모달을 열되 마우스 전용(Tab 순서 제외)으로 두어 같은 목적지가 두 번 포커스되지 않게 한다.
- 자세히 보기 hover: 위로 2px / GitHub hover: 검정으로 채워짐.
- GitHub 링크는 새 탭(`target="_blank" rel="noopener noreferrer"`), 저장소가 비공개면 버튼을 숨기거나 비활성 표시.
- reduced-motion이면 트랜지션 제거.

---

## 8. 프로젝트 상세 모달 명세

참고 시안(로컬 전용, 커밋하지 않음): `design/detail-desktop.reference.html`, `design/detail-mobile.reference.html` (ZZAZO 예시, 아코디언 동작 포함)
콘텐츠 원본: `design/project-details.json` → 프로젝트 데이터 파일로 옮겨 slug로 연결 (ZZAZO · SKHU BOX · 티밍 3개. Portfolio는 상세 없음 → 카드의 `자세히 보기` 숨김)

### 열고 닫기
- Projects 카드의 `자세히 보기`(그리고 대표 이미지) 클릭 시 열림. 데스크톱은 가운데 모달(폭 920px, radius 24px, 상하 여백 48px, 배경 딤), 모바일(≤ 640px)은 화면 전체를 덮는 형태.
- 닫기: 우측 상단 X 버튼(`aria-label="상세 닫기"`), 딤 클릭, `Esc`, 뒤로가기.
- URL 동기화: 열면 `?project={slug}`가 붙어 새로고침·공유 시 같은 모달이 열린다. 뒤로가기로 닫힌다. `다음` 버튼은 모달을 닫지 않고 내용만 바꾼다.
- 접근성: `role="dialog"` + `aria-modal="true"` + `aria-labelledby`(프로젝트명 `<h2>`), 포커스 트랩, 열릴 때 닫기 버튼(또는 제목)으로 포커스 이동, 닫히면 연 버튼으로 포커스 복귀, 배경 스크롤 잠금.
- 모달 내부만 스크롤. 하단 바(GitHub · 다음 프로젝트)는 `position: sticky; bottom: 0`.
- 열림 애니메이션: 딤 페이드 + 모달 `translateY(24px) → 0`, 0.3s. reduced-motion이면 즉시.

### 구성 (위 → 아래) — 문서처럼 읽히게, 장식 최소화
배지·mono 라벨·섹션 번호·형광펜·pill 태그·아코디언·숫자 타일은 쓰지 않는다 (AI 생성물처럼 보이는 장식 제거).
1. **대표 이미지**: 창 틀 없이 16:9 둥근 상자(`DetailImage`). 우측 상단에 닫기 버튼.
2. **헤더**: `<h2>` 프로젝트명 → 기본 정보 한 줄(구분 · 역할 · 팀 · 기간, `<dl>`) → 스택 칩 **전체**.
3. **프로젝트 소개**: 한 문장(`tagline`).
4. **주요 기능**: 점 목록(`features`). 비어 있으면 섹션을 숨긴다 — TODO: 내용 채우기.
5. **나의 기여 (N%)**: 점 목록(`contrib`).
6. **트러블슈팅**: 사례마다 제목 → (도식 이미지가 있으면) → 상황 문단 → 한 일 점 목록 → 결과 한 줄(굵게). 사례 사이 연한 구분선.
7. **마무리**(learnings) / **결과**(stats): 점 목록. stats는 `라벨 값 (보조 설명)` 한 줄씩.
8. **하단 고정 바**: `GitHub` · `사이트 보기`(`projects.ts`의 `siteUrl`, 없으면 "사이트 주소를 준비 중입니다." 토스트 — TODO: 주소 채우기) / `다음 · {다음 프로젝트명} →`. 모바일은 GitHub·사이트 보기를 아이콘만(스크린리더 이름은 유지).
- 토스트(`Toaster`)는 popover(top layer)로 띄워 열린 모달 위에도 보인다.

### 콘텐츠 주의
- JSON 안의 `[ ... ]` 대괄호 문구는 아직 확정되지 않은 placeholder(티밍 04-3의 해결·결과). 화면에 그대로 노출하지 말고 TODO 처리 — 현재 04-3은 `todo` 표시로 사례 전체를 숨김. 확정되면 `src/data/projectDetails.ts`에 채우고 `todo`를 지운다.
- 이름·기간·스택·GitHub·대표 이미지는 `projects.ts` 한 곳에서 관리하고, 모달 전용 정보(배지·역할·축약 팀 표기·기여도·사례 등)만 `projectDetails.ts`에 둔다.
- 도식 이미지는 Figma 포트폴리오의 각 사례 슬라이드를 내보내 `public/images/projects/{slug}/{caseId}.webp`로 넣는다.

---

## 9. Skills 섹션 명세 (Home, Projects 바로 아래)

참고 시안(로컬 전용, 커밋하지 않음): `design/skills-desktop.reference.html`, `design/skills-mobile.reference.html`

**원칙: 단순하게.** 카드, 아이콘, 로고, 색 배경, 숙련도 바, 호버 효과를 넣지 않는다. 글자와 선만 쓴다.

- 섹션 헤더: 라벨 `<Skills />`(mono) + 가로선 64px → `<h2>` 기술 스택. 보조 문구 없음.
- 카테고리 5개, 데스크톱은 5단 grid(gap 40px), 모바일은 2단(column-gap 20px, row-gap 40px).
- 각 단: 번호(mono 13px, `--color-text-sub`) → 카테고리명 `<h3>` 22px(모바일 18px) → 아래 1.5px 검정 밑줄 → 기술 이름 목록(`<ul>`, 17px / 모바일 15px, `--color-text-muted`, 항목 간격 12px).
- 섹션 높이는 콘텐츠만큼 (상하 패딩 120px / 모바일 72px).

| 번호 | 카테고리 | 기술 |
|---|---|---|
| 01 | 언어 | HTML, JavaScript, TypeScript |
| 02 | 프론트엔드 | React, Next.js, Zustand, TanStack Query, React Hook Form, Zod, pnpm |
| 03 | 스타일링 | CSS, CSS Modules, Tailwind CSS |
| 04 | 개발 · 테스트 | MSW, Storybook |
| 05 | 워크 툴 | Git, GitHub, Notion, Figma |

- 데이터는 `skills` 데이터 파일로 분리하고 map으로 렌더링한다.

---

## 10. Contact 섹션 명세 (Home 마지막 섹션 · 푸터)

참고 시안(로컬 전용, 커밋하지 않음): `design/contact-desktop.reference.html`, `design/contact-mobile.reference.html`

페이지의 마지막 섹션이자 푸터. 히어로와 짝을 이루는 마무리 화면이다 (FRONT END.로 시작해 GROW.로 끝난다).

### 콘텐츠
| 요소 | 내용 |
|---|---|
| 배경 | 히어로와 같은 도트 그리드 (`.bg-dots`) |
| 코드 라벨 | `<Contact value="성장" />` — 속성값만 `--color-text`, 나머지 `--color-text-sub` |
| 제목 `<h2>` | 제 인생에서 가장 중요한 / 가치는 **성장**입니다. — "성장"에 포인트 컬러 형광펜 밑줄 (60% 지점부터) |
| 본문 | 성장은 힘들고, 어렵고, 새롭게 배워야 하는 일을 할 때 일어난다고 생각합니다. 이곳에서 더 어려운 문제를 풀며, **사용자가 멈칫하지 않는 화면**을 만들어내고 싶습니다. (굵은 부분은 `--color-text`, 나머지 `--color-text-muted`) |
| 버튼 위 라벨 | `// 연락은 여기로` (mono, `--color-text-sub`) |
| 큰 글자 | `GROW` + 포인트 컬러 `.` — 히어로 타이틀과 같은 `--text-hero` 스타일. 장식이므로 `aria-hidden="true"` |
| 장식 | 반짝이 2개 (노랑 44px, 검정 20px) — GROW. 오른쪽 위. 모바일은 노랑 1개 |
| 푸터 | `맨 위로 ↑` · `© 2026 전병주` 줄은 사이트 푸터(`SiteFooter`)로 옮김 — Contact는 GROW.로 끝난다 |

### 연락 버튼 4개 (이 순서)
| 이름 | 표시 값 | href | 새 탭 |
|---|---|---|---|
| Email | wjsqudwn981789@gmail.com | `mailto:wjsqudwn981789@gmail.com` | — |
| Phone | 010-9165-7205 | `tel:010-9165-7205` | — |
| LinkedIn | 병주 전 | `https://www.linkedin.com/in/%EB%B3%91%EC%A3%BC-%EC%A0%84-964428440/` | O |
| GitHub | ByeongJu0411 | `https://github.com/ByeongJu0411` | O |

- 각 버튼은 `<a>` 하나가 전체 클릭 영역. 구성: 원형 아이콘(48px, 모바일 40px) → 이름(mono 12px) + 값(17px, 한 줄 말줄임) → ↗ 화살표.
- 높이 76px(모바일 64px), radius 18px(모바일 16px), 테두리 1.5px `--color-text`, 세로로 쌓고 gap 12px.
- Email만 검정 채움(대표 연락 수단, 아이콘 원은 포인트 컬러). 나머지는 `--color-bg` 배경 + 검정 원 아이콘.
- hover / focus-visible: 검정으로 채워지고 `translateX(6px)`, 아이콘 원은 포인트 컬러, 화살표는 `translate(3px,-3px)`. 0.25s.
- 새 탭 링크는 `target="_blank" rel="noopener noreferrer"`. 모든 버튼에 `aria-label` (예: "메일 보내기: wjsqudwn981789@gmail.com", "LinkedIn 프로필 열기, 새 탭: 병주 전").
- 아이콘은 인라인 stroke SVG. LinkedIn · GitHub은 공식 로고 아이콘으로 바꿔도 된다 (같은 원 안, 단색).
- 데이터는 `contacts` 데이터 파일로 분리.

### 레이아웃
- 데스크톱(1440×900 기준, 최소 높이 100vh 권장): 상단 패딩 120px, 좌우 80px, 하단 48px.
  - 라벨 → 2열 grid `1fr | 480px`, gap 96px: 왼쪽 제목(60px, 행간 1.25, 자간 -0.04em) + 본문(20px, 행간 1.8, 최대 폭 620px), 오른쪽 버튼 열.
  - 하단(`margin-top: auto`): 왼쪽 GROW.(250px), 오른쪽 아래 푸터(오른쪽 정렬, 세로 2줄).
- 모바일(390): 세로 스택 — 라벨 → 제목(31px) → 본문(16px) → 버튼 4개 → GROW.(108px) → 푸터(좌우 양끝).
- GROW.는 `clamp()`로 히어로 타이틀과 같은 비율로 줄어들고, 어떤 폭에서도 가로 스크롤을 만들지 않는다.
- 구현 메모: 제목 칸 + 버튼 열(480px) 2열은 제목이 들어가는 `xl:`(1280px)부터. 그 아래는 세로로 쌓고 버튼 열은 최대 480px. 제목·본문 크기는 `clamp()`로 화면 폭에 비례.
- GROW.는 히어로와 같은 `DISPLAY_TITLE`(`src/components/ui/displayTitle.ts`), 코드 라벨은 공용 `CodeLabel`을 쓴다. 반짝이 위치·크기는 em 단위라 GROW.와 함께 줄어든다.
- 연락처는 `src/data/contacts.ts` 한 곳에서 관리하고 About 연락처 줄과 Contact 버튼이 함께 쓴다.
- reduced-motion이면 버튼 트랜지션 제거.

---

## 11. 인터랙션 계획

우선순위 순. 각 항목은 reduced-motion 대응 필수.

1. **진입 애니메이션**: 코드 라벨 → 타이틀 → 캐릭터 → 텍스트 블록 순 stagger. 전체 0.8초 이내. CSS 애니메이션 우선(JS 라이브러리 도입 전 상의).
2. **마우스 패럴랙스**: 타이틀 / 캐릭터 / 장식을 서로 다른 속도로 미세 이동 (최대 ±12px). `transform`만 사용하고 `requestAnimationFrame`으로 스로틀. `(hover: hover) and (pointer: fine)`일 때만 활성(터치 기기 비활성).
3. **캐릭터 눈동자 추적 + 깜빡임**: 눈 레이어 분리된 SVG 에셋 필요 (현재 PNG로는 불가 — 에셋 준비 후 진행).
4. **hover**: 버튼·링크 미세 반응, 스티커 hover 시 살짝 회전. 모든 hover 상태에 대응하는 `:focus-visible` 스타일도 제공.
5. **스크롤 힌트**: 세로선이 아래로 흐르는 루프 애니메이션.

### 금지
- 수 초짜리 로딩 인트로
- 스크롤 가로채기 (scroll-jacking)
- 기본 커서를 숨기는 커스텀 커서
- 무거운 3D / 큰 그라데이션 블롭 배경
- 직무명이 바뀌는 타이핑 효과
