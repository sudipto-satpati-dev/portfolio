import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { OssShelf } from "@/components/oss/OssShelf";
import { Timeline } from "@/components/experience/Timeline";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { Footer } from "@/components/ui/Footer";
import { INITIAL_PROJECTS, INITIAL_OSS_TOOLS, INITIAL_EXPERIENCE } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent-primary selection:text-background flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 space-y-12">
        <HeroSection />
        <ProjectGrid projects={INITIAL_PROJECTS} />
        <OssShelf tools={INITIAL_OSS_TOOLS} />
        <Timeline experience={INITIAL_EXPERIENCE} />
        <SkillsSection />
      </main>

      <Footer />
    </div>
  );
}
