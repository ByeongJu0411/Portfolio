@AGENTS.md

# 전병주 포트폴리오 — 프로젝트 규칙

프론트엔드 개발자 포트폴리오 사이트. 이 사이트 자체가 실력 증명이므로 **완성도, 성능, 접근성**을 화려함보다 우선한다.

- 기술 스택: Next.js 16 (App Router, `src/app`) / React 19 / TypeScript / Tailwind CSS v4 (`@tailwindcss/postcss`)
- 페이지: Home(`/`) · About(`/about`) · Projects(`/projects`) · Skills(`/skills`) · Contact(`/contact`) — 각각 별도 라우트. 메뉴·링크 정의는 `src/lib/site.ts`. 현재 명세는 **Home 히어로**까지.
- 디자인 원본: Figma [TODO: 링크 기입]
- 기준 해상도: Desktop 1440×900, Mobile 390×844
- 브레이크포인트: Mobile `< 768px`, Desktop `≥ 768px` (Tailwind `md:`). 모바일 우선으로 작성하고 `md:`로 데스크톱을 덮어쓴다.

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
| 헤더 우측 버튼 | 이력서 ↗ (외부 링크 — `target="_blank" rel="noopener noreferrer"`, 새 창 안내 텍스트 포함) |
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

---

## 6. 인터랙션 계획

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
