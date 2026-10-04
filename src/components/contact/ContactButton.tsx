import type { ComponentType, SVGProps } from "react";
import { ArrowUpRightIcon, CodeIcon, LinkedInIcon, MailIcon, PhoneIcon, MapPinIcon } from "@/components/icons";
import type { ContactItem, ContactKind } from "@/data/contacts";
import styles from "./Contact.module.css";

const ICONS: Record<ContactKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: MailIcon,
  phone: PhoneIcon,
  linkedin: LinkedInIcon,
  github: CodeIcon,
  address: MapPinIcon,
};

/** <a> 하나가 전체 클릭 영역 — 원형 아이콘 · 이름 · 값 · ↗ */
export function ContactButton({ contact, primary = false }: { contact: ContactItem; primary?: boolean }) {
  const Icon = ICONS[contact.kind];

  return (
    <a
      href={contact.href}
      aria-label={contact.ariaLabel}
      {...(contact.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${styles.button} ${primary ? styles.primary : ""}`}
    >
      <span className={styles.icon}>
        <Icon className="size-5 lg:size-5.5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-mono text-label tracking-normal opacity-65">{contact.name}</span>
        <span className="truncate text-contact-value font-medium">{contact.value}</span>
      </span>
      <ArrowUpRightIcon size={20} className={styles.arrow} />
    </a>
  );
}
