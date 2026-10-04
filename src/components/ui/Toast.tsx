"use client";

import { useEffect, useRef, useState } from "react";

type Toast = { id: number; message: string };
type Listener = (toast: Toast) => void;

const listeners = new Set<Listener>();
let nextId = 0;

/** 어디서든 호출해 화면 아래에 짧은 안내 메시지를 띄운다 */
export function showToast(message: string) {
  const toast = { id: ++nextId, message };
  listeners.forEach((listener) => listener(toast));
}

const DURATION = 2600;

/**
 * 토스트 표시 영역 — layout에 한 번만 둔다.
 * popover(top layer)로 띄워 열린 상세 모달(<dialog>) 위에도 보이게 한다.
 * role="status" 영역은 항상 떠 있어야 내용이 바뀔 때 스크린리더가 읽는다.
 */
export function Toaster() {
  const [toast, setToast] = useState<Toast | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const region = regionRef.current;
    region?.showPopover();

    function onToast(next: Toast) {
      // 나중에 열린 모달보다 위로 오도록 top layer에 다시 올린 뒤 내용을 바꾼다
      if (region?.matches(":popover-open")) region.hidePopover();
      region?.showPopover();
      setToast(next);
    }
    listeners.add(onToast);
    return () => void listeners.delete(onToast);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), DURATION);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div
      ref={regionRef}
      popover="manual"
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-auto bottom-6 m-0 flex w-auto max-w-none justify-center overflow-visible border-0 bg-transparent p-0 px-(--page-gutter) md:bottom-10"
    >
      {toast && (
        // key가 바뀌면 같은 문구를 다시 눌러도 새로 나타나고 다시 읽힌다
        <p
          key={toast.id}
          className="flex items-center gap-2.5 rounded-pill bg-text px-5 py-3 text-body font-medium text-on-dark shadow-paper motion-safe:animate-toast-in"
        >
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
          {toast.message}
        </p>
      )}
    </div>
  );
}
