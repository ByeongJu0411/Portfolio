import { ContactList } from "./ContactList";

export function AboutIntro() {
  return (
    <div className="flex max-w-about-text flex-col gap-4 text-intro text-text-muted lg:gap-6">
      <p>
        안녕하세요, 전병주입니다. 사용자가 화면 앞에서 멈칫하는 순간을 그냥 넘기지 않습니다. 불편이 생긴{" "}
        <strong className="font-bold text-text">
          원인을 끝까지 찾고, 같은 문제가 다시 생기지 않도록 구조부터
        </strong>{" "}
        고칩니다.
      </p>
      <p>
        팀 프로젝트 &apos;티밍&apos;에서는 기획부터 배포까지 웹 프론트엔드를 단독으로 맡아, 사용자가 가입부터
        소통, 결제까지 막힘없이 이어갈 수 있도록 NextAuth 소셜 로그인, WebSocket 실시간 채팅, 결제 시스템을
        구현했습니다. 이 프로젝트로 교내 IT 경진대회 은상과 인기상을 받았습니다.
      </p>
      <p>
        시간표 추천 서비스 ZZAZO에서는 프론트엔드 파트 리더로 일하며, 화면이 버벅이는{" "}
        <strong className="font-bold text-text">렌더링 병목을 찾아 성능을 개선</strong>하고, 여러 요청이 동시에
        만료될 때 토큰 재발급이 꼬이지 않도록 요청을 하나로 묶었습니다. 지금은 큐시즘에서 기업 연계 프로젝트의
        스크롤 인터랙션을 구현하고 있습니다.
      </p>
      <ContactList />
    </div>
  );
}
