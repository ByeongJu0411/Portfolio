import type { ComponentType, SVGProps } from "react";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { CONTACTS, type ContactKind } from "@/data/about";

const ICONS: Record<ContactKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  phone: PhoneIcon,
  email: MailIcon,
  address: MapPinIcon,
};

const LABELS: Record<ContactKind, string> = {
  phone: "전화",
  email: "이메일",
  address: "주소",
};

export function ContactList() {
  return (
    <ul className="mt-1 flex flex-col gap-2.5 border-t border-border pt-4 text-detail text-text lg:mt-2 lg:flex-row lg:flex-wrap lg:gap-x-8 lg:pt-5">
      {CONTACTS.map((contact) => {
        const Icon = ICONS[contact.kind];
        return (
          <li key={contact.kind} className="flex items-center gap-2.5">
            <Icon className="size-4 shrink-0 lg:size-4.5" />
            <span className="sr-only">{LABELS[contact.kind]}: </span>
            <span className="min-w-0 break-all">
              {contact.href ? (
                <a
                  href={contact.href}
                  className={`hover:text-link-hover ${contact.kind === "email" ? "underline underline-offset-2" : ""}`}
                >
                  {contact.label}
                </a>
              ) : (
                contact.label
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
