import { ContactList } from "./ContactList";

export function AboutIntro() {
  return (
    <div className="@container flex flex-col gap-4 text-intro text-text-muted lg:gap-6">
      <p>
        안녕하세요, 전병주입니다. 사용자가 화면 앞에서 멈칫하는 순간을 그냥 넘기지 않습니다. 왜 멈칫했는지{" "}
        <strong className="font-bold text-text">
          원인을 끝까지 찾고, 같은 문제가 다시 생기지 않도록 구조부터
        </strong>{" "}
        고칩니다.
      </p>
      <p>
        팀 협업 서비스 &apos;티밍&apos;에서는 타이핑할 때마다 채팅 화면 전체가 다시 그려지는 문제를 추적해{" "}
        <strong className="font-bold text-text">렌더링 시간을 52배 줄였습니다.</strong> UAM 기업 Verty의 랜딩
        페이지에서는 Safari에서만 영상이 검게 깨지는 문제를 실기기로 재현한 뒤, 어떤 브라우저에서도 콘텐츠가
        보이도록 대체 화면을 마련했습니다. 두 번 모두 추측으로 고치지 않고, 측정하고 재현한 다음에 고쳤습니다.
      </p>
      <p>
        혼자 잘 만드는 것만큼 <strong className="font-bold text-text">팀이 막힘없이 일하는 환경</strong>도
        중요하게 생각합니다. ZZAZO와 Verty 프로젝트에서 프론트엔드 리드를 맡아 커밋 규칙, 폴더 구조, 디자인 토큰을
        먼저 세웠고, 백엔드가 완성되기 전에도 개발이 멈추지 않도록 목 서버를 만들었습니다.
      </p>
      <ContactList />
    </div>
  );
}
