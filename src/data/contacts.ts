import { SITE } from "@/lib/site";

/* 연락처 (CLAUDE.md 6장 About 연락처 줄, 10장 Contact 버튼) — 한 곳에서 관리한다 */

export type ContactKind = "email" | "phone" | "linkedin" | "github" | "address";

export type ContactItem = {
  kind: ContactKind;
  /** 버튼 위 작은 이름 (mono) */
  name: string;
  /** 화면에 보이는 값 */
  value: string;
  href?: string;
  /** 새 탭으로 열기 (외부 프로필) */
  newTab?: boolean;
  /** Contact 버튼의 스크린리더용 이름 */
  ariaLabel?: string;
};

export const CONTACTS: Record<ContactKind, ContactItem> = {
  email: {
    kind: "email",
    name: "Email",
    value: "wjsqudwn981789@gmail.com",
    href: "mailto:wjsqudwn981789@gmail.com",
    ariaLabel: "메일 보내기: wjsqudwn981789@gmail.com",
  },
  phone: {
    kind: "phone",
    name: "Phone",
    value: "010-9165-7205",
    href: "tel:010-9165-7205",
    ariaLabel: "전화 걸기: 010-9165-7205",
  },
  linkedin: {
    kind: "linkedin",
    name: "LinkedIn",
    value: "병주 전",
    href: "https://www.linkedin.com/in/%EB%B3%91%EC%A3%BC-%EC%A0%84-964428440/",
    newTab: true,
    ariaLabel: "LinkedIn 프로필 열기, 새 탭: 병주 전",
  },
  github: {
    kind: "github",
    name: "GitHub",
    value: "ByeongJu0411",
    href: SITE.githubUrl,
    newTab: true,
    ariaLabel: "GitHub 프로필 열기, 새 탭: ByeongJu0411",
  },
  address: {
    kind: "address",
    name: "Address",
    value: "인천광역시 남동구 담방로 21번길 24",
  },
};

/** Contact 섹션 버튼 — 이 순서. 첫 번째(Email)가 대표 연락 수단으로 검정 채움 */
export const CONTACT_BUTTONS: ContactItem[] = [CONTACTS.email, CONTACTS.phone, CONTACTS.linkedin, CONTACTS.github];

/** About 소개글 아래 연락처 줄 */
export const ABOUT_CONTACTS: ContactItem[] = [CONTACTS.phone, CONTACTS.email, CONTACTS.address];
