import Link from "next/link";
import { ArrowUpIcon, ArrowUpRightIcon } from "@/components/icons";
import { CONTACTS } from "@/data/contacts";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { NAV_ITEMS, SITE } from "@/lib/site";

/** 외부·연락 링크 — 새 탭 여부는 연락처 데이터를 따른다 */
const LINKS = [
  { label: "GitHub", href: CONTACTS.github.href!, newTab: true },
  { label: "LinkedIn", href: CONTACTS.linkedin.href!, newTab: true },
  { label: "Email", href: CONTACTS.email.href!, newTab: false },
];

const LINK = "inline-flex items-center gap-1.5 text-body text-text-muted hover:text-link-hover";
const COLUMN_LABEL = "font-mono text-label text-text-sub";

/** 사이트 푸터 — 로고·소개 / 메뉴 / 링크, 아래 저작권 줄. 글자와 선만 쓴다. */
export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-page px-(--page-gutter)">
      <div className="flex flex-col gap-10 border-t-(length:--border-width) border-text pt-10 pb-8 md:flex-row md:justify-between md:gap-16 lg:pt-14">
        <div className="flex flex-col gap-3">
          <Link href="/#top" className="self-start font-display text-logo font-extrabold">
            {SITE.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="text-body text-text-sub">
            사용자가 멈칫하는 순간을 찾아
            <br />
            원인부터 구조까지 다시 설계합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:gap-16 lg:gap-24">
          <nav aria-labelledby="footer-sections" className="flex flex-col gap-3.5">
            {/* 라벨은 목록·메뉴 이름(aria-labelledby)으로만 읽히게 숨김 */}
            <p id="footer-sections" aria-hidden="true" className={COLUMN_LABEL}>
              SECTIONS
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3.5">
            <p id="footer-links" aria-hidden="true" className={COLUMN_LABEL}>
              LINKS
            </p>
            <ul aria-labelledby="footer-links" className="flex flex-col gap-2.5">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={LINK}
                  >
                    {link.label}
                    {link.newTab && (
                      <>
                        <ArrowUpRightIcon size={12} />
                        <span className="sr-only">(새 창)</span>
                      </>
                    )}
                  </a>
                </li>
              ))}
              <li>
                <ResumeLink className={LINK}>
                  이력서
                  <ArrowUpRightIcon size={12} />
                </ResumeLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border py-5 font-mono text-project-index text-text-sub lg:py-6">
        <span>© 2026 {SITE.name}. All rights reserved.</span>
        <a href="#top" className="inline-flex items-center gap-1.5 hover:text-text">
          맨 위로
          <ArrowUpIcon size={14} />
        </a>
      </div>
    </footer>
  );
}
