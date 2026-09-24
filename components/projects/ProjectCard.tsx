import React from "react";
import Link from "next/link";
import { TerminalWindow } from "../ui/TerminalWindow";
import { Badge } from "../ui/Badge";
import { TiltCard } from "../ui/TiltCard";
import { Project } from "@/lib/mockData";
import { Github, ExternalLink, ArrowRight, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <TiltCard maxTilt={12} scale={1.02} glareOpacity={0.28} className="h-full">
      <TerminalWindow
        title={`./projects/${project.slug}.sys`}
        headerRight={<Badge variant="live">live</Badge>}
        className="h-full flex flex-col justify-between"
      >
        <div className="space-y-4 [transform:translateZ(10px)]">
          {/* Category & Title */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-accent-primary" />
              <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                {project.category}
              </span>
            </div>
            <h3 className="font-mono text-lg font-bold text-text-primary hover:text-accent-primary transition-colors">
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
          </div>

          {/* Short Description */}
          <p className="font-sans text-xs text-text-secondary leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Key Features Bullet List */}
          <div className="space-y-1.5 pt-2 border-t border-border-subtle/40">
            <span className="font-mono text-[10px] text-accent-primary uppercase tracking-widest block">
              System Highlights
            </span>
            <ul className="space-y-1 font-sans text-[11px] text-text-secondary">
              {project.features.slice(0, 3).map((feat, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-accent-secondary font-mono">›</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="tech">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-6 mt-4 border-t border-border-subtle/50 [transform:translateZ(15px)]">
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-primary transition-colors p-1"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-secondary transition-colors p-1"
                title="Live Deployment"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-primary hover:text-accent-primary-hover transition-colors group"
          >
            <span>View case study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </TerminalWindow>
    </TiltCard>
  );
};
