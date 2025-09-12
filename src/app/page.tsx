import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    
      <main className="row-start-2">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
      <footer className="row-start-3">
    
      </footer>
    </div>
  );
}
