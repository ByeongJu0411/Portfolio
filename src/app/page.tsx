import { About } from "@/components/about/About";
import { Hero } from "@/components/hero/Hero";
import { PlaceholderSection } from "@/components/sections/PlaceholderSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* TODO: 섹션 구현 시 교체 */}
      <PlaceholderSection id="projects" label="Projects" />
      <PlaceholderSection id="skills" label="Skills" />
      <PlaceholderSection id="contact" label="Contact" />
    </>
  );
}
