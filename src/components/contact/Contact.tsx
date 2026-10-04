import { SparkleIcon } from "@/components/icons";
import { CodeLabel } from "@/components/ui/CodeLabel";
import { DISPLAY_TITLE } from "@/components/ui/displayTitle";
import { CONTACT_BUTTONS } from "@/data/contacts";
import { ContactButton } from "./ContactButton";

/**
 * 마지막 섹션이자 페이지 푸터. 히어로(FRONT END.)와 짝을 이루는 GROW.로 끝난다.
 * 도트 배경은 body(bg-dots)에서 이어진다.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="overflow-hidden">
      <div className="mx-auto flex min-h-svh max-w-page flex-col px-(--page-gutter) pt-18 pb-7 lg:pt-30 lg:pb-12">
        <CodeLabel tag="Contact" attrs={[{ name: "value", value: "성장" }]} />

        {/* 제목 칸과 버튼 열(480px) 2열은 제목이 충분히 들어가는 xl(1280)부터 */}
        <div className="mt-5 flex flex-col xl:mt-8 xl:grid xl:grid-cols-[minmax(0,1fr)_var(--container-contact-actions)] xl:items-start xl:gap-(--about-grid-gap)">
          <div className="flex flex-col gap-4.5 xl:gap-7">
            <h2 id="contact-title" className="text-contact-title font-bold">
              제 인생에서 가장 중요한
              <br />
              가치는{" "}
              <span className="bg-[linear-gradient(transparent_60%,var(--color-accent)_60%)]">성장</span>
              입니다.
            </h2>
            <p className="max-w-contact-body text-contact-body text-text-muted">
              성장은 힘들고, 어렵고, 새롭게 배워야 하는 일을 할 때 일어난다고 생각합니다. 이곳에서 더 어려운 문제를
              풀며, <strong className="font-bold text-text">사용자가 멈칫하지 않는 화면</strong>을 만들어내고
              싶습니다.
            </p>
          </div>

          <div className="mt-9 flex w-full flex-col gap-3.5 md:max-w-contact-actions xl:mt-0 xl:gap-4 xl:pt-2.5">
            <p className="font-mono text-project-index tracking-[0.12em] text-text-sub">{"// 연락은 여기로"}</p>
            <ul className="flex flex-col gap-2.5 lg:gap-3">
              {CONTACT_BUTTONS.map((contact, index) => (
                <li key={contact.kind}>
                  <ContactButton contact={contact} primary={index === 0} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 저작권·맨 위로는 사이트 푸터(SiteFooter)로 옮김 */}
        <div className="mt-auto pt-12">
          {/* 히어로 FRONT END.와 같은 디스플레이 스타일. 장식이라 스크린리더에서 숨김 */}
          <div aria-hidden="true" className={`relative whitespace-nowrap ${DISPLAY_TITLE}`}>
            GROW<span className="text-accent">.</span>
            {/* 반짝이는 글자 크기(em) 기준이라 GROW.와 함께 줄어든다 */}
            <SparkleIcon className="absolute top-[-0.074em] left-[2.69em] w-[0.24em] text-accent md:top-[0.024em] md:left-[2.72em] md:w-[0.176em]" />
            <SparkleIcon className="absolute top-[0.28em] left-[3em] hidden w-[0.08em] text-text md:block" />
          </div>

        </div>
      </div>
    </section>
  );
}
