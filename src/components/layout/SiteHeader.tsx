import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="relative z-50 mx-auto max-w-page px-(--page-gutter) pt-5 md:pt-8">
      <div className="flex h-11 items-center justify-between md:h-13">
        <Link href="/" className="font-display text-logo font-extrabold">
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
    </header>
  );
}
