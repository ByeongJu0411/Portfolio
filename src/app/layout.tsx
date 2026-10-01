import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans_KR, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  // 시안은 opsz 축(12~96)으로 큰 글자에서 자형이 조여진다. axes는 가변 weight에서만 지정 가능.
  axes: ["opsz"],
});

const plexKr = IBM_Plex_Sans_KR({
  variable: "--font-plex-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "전병주 — Frontend Developer",
  description: "사용자가 멈칫하는 순간을 찾아 원인부터 구조까지 다시 설계하는 프론트엔드 개발자 전병주의 포트폴리오입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${bricolage.variable} ${plexKr.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="bg-dots min-h-svh">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
