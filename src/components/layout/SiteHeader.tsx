import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { AutoHideHeader } from "./AutoHideHeader";
import { MobileMenu } from "./MobileMenu";

/** 헤더 마크업(서버 컴포넌트). 스크롤 숨김 동작만 AutoHideHeader(클라이언트)가 맡는다. */
export function SiteHeader() {
  return (
    <AutoHideHeader>
      <div className="relative mx-auto max-w-page px-(--page-gutter) pt-(--header-pt) pb-(--header-pb)">
        <div className="flex h-(--header-bar) items-center justify-between">
          <Link href="/#top" className="font-display text-logo font-extrabold">
            {SITE.name}
            <span className="text-accent">.</span>
          </Link>

          <nav aria-label="주요 메뉴" className="hidden md:block">
            <ul className="flex gap-11 text-body font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-link-hover">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-pill border-(length:--border-width) border-text px-5 text-body font-medium hover:border-link-hover hover:text-link-hover md:inline-flex"
          >
            이력서
            <ArrowUpRightIcon size={14} />
            <span className="sr-only">(새 창)</span>
          </a>

          <MobileMenu />
        </div>
      </div>
    </AutoHideHeader>
  );
}
