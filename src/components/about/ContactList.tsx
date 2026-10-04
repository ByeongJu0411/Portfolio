import type { ComponentType, SVGProps } from "react";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { ABOUT_CONTACTS } from "@/data/contacts";

type AboutKind = "phone" | "email" | "address";

const ICONS: Record<AboutKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  phone: PhoneIcon,
  email: MailIcon,
  address: MapPinIcon,
};

const LABELS: Record<AboutKind, string> = {
  phone: "전화",
  email: "이메일",
  address: "주소",
};

export function ContactList() {
  return (
    // 소개글 블록 폭이 한 줄에 셋을 담을 만큼(@2xl = 42rem) 될 때만 가로로 — 양 끝 정렬 + 같은 간격
    <ul
      className="mt-1 flex flex-col gap-2.5 border-t border-border pt-4 text-detail text-text lg:mt-2 lg:pt-5 @2xl:flex-row @2xl:justify-between @2xl:gap-8">
      {ABOUT_CONTACTS.map((contact) => {
        const kind = contact.kind as AboutKind;
        const Icon = ICONS[kind];
        return (
          <li key={contact.kind} className="flex items-center gap-2.5">
            <Icon className="size-4 shrink-0 lg:size-4.5" />
            <span className="sr-only">{LABELS[kind]}: </span>
            <span className="min-w-0 break-all">
              {contact.href ? (
                <a
                  href={contact.href}
                  className={`hover:text-link-hover ${contact.kind === "email" ? "underline underline-offset-2" : ""}`}
                >
                  {contact.value}
                </a>
              ) : (
                contact.value
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
