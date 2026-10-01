"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { NAV_ITEMS, SITE } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.querySelector("a")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    }
    // 데스크톱 폭으로 넘어가면 패널이 숨겨지므로 상태도 닫아둔다
    const desktop = window.matchMedia("(width >= 48rem)");
    function onBreakpoint(e: MediaQueryListEvent) {
      if (e.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-button border-(length:--border-width) border-text"
      >
        {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-(--page-gutter) top-full mt-3 rounded-button border-(length:--border-width) border-text bg-bg p-2"
      >
        <nav aria-label="모바일 메뉴">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex h-12 items-center rounded-button px-4 text-body font-medium hover:text-link-hover"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-2">
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex h-12 items-center gap-2 rounded-button px-4 text-body font-medium hover:text-link-hover"
              >
                GitHub
                <ArrowUpRightIcon size={14} />
                <span className="sr-only">(새 창)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
