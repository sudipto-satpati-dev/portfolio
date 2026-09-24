import React from "react";
import { PromptLabel } from "../ui/PromptLabel";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/lib/mockData";

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <PromptLabel label="ls ./projects --featured" />
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            Flagship Production Systems
          </h2>
          <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Case studies detailing real enterprise problems, architectural decisions, and outcome metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
