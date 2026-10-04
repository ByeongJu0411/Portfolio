import { CERTIFICATES } from "@/data/about";

export function CertificatesDoc() {
  if (CERTIFICATES.length === 0) {
    return (
      <p className="border-t border-paper-line pt-4 text-doc-body text-text-muted">
        아직 취득한 자격증이 없습니다. 취득하는 대로 이곳에 정리할 예정입니다.
      </p>
    );
  }

  return (
    <ul>
      {CERTIFICATES.map((certificate) => (
        <li
          key={certificate.name}
          className="flex flex-col gap-1 border-t border-paper-line py-3 lg:grid lg:grid-cols-[5rem_minmax(0,1fr)_auto] lg:items-baseline lg:gap-4 lg:py-4.5"
        >
          <span className="font-mono text-meta text-text-sub">{certificate.date}</span>
          <span className="text-doc-item font-bold">{certificate.name}</span>
          <span className="text-detail text-text-muted">{certificate.issuer}</span>
        </li>
      ))}
    </ul>
  );
}
