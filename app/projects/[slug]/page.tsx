import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INITIAL_PROJECTS } from "@/lib/mockData";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { Badge } from "@/components/ui/Badge";
import { PromptLabel } from "@/components/ui/PromptLabel";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ArrowLeft, Github, ExternalLink, ShieldCheck, Cpu, BarChart3, Layers } from "lucide-react";

export async function generateStaticParams() {
  return INITIAL_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = INITIAL_PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent-primary selection:text-background flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/#projects font-mono"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to flagship projects</span>
          </Link>
        </div>

        {/* Title & Metadata Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-primary" />
            <span className="font-mono text-xs text-accent-primary font-semibold uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <h1 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
            {project.title}
          </h1>

          <p className="font-sans text-base text-text-secondary leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="tech">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-surface border border-border-subtle hover:border-accent-primary text-text-primary hover:text-accent-primary font-mono text-xs transition-all"
              >
                <Github className="w-4 h-4 text-accent-primary" />
                <span>View Source Code</span>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent-secondary/10 border border-accent-secondary/40 text-accent-secondary hover:bg-accent-secondary/20 font-mono text-xs font-semibold transition-all"
              >
                <ExternalLink className="w-4 h-4 text-accent-secondary" />
                <span>Live System Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Terminal Chrome Showcase Panel */}
        <TerminalWindow title={`case-study://${project.slug}`} activeGlow>
          <div className="space-y-6">
            <div className="w-full h-48 sm:h-72 rounded bg-surface-tier2 border border-border-subtle flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#26263820_1px,transparent_1px),linear-gradient(to_bottom,#26263820_1px,transparent_1px)] bg-[size:16px_16px]" />
              <Layers className="w-12 h-12 text-accent-primary/40 mb-2" />
              <span className="font-mono text-xs text-text-muted">
                [ {project.title} — System Architecture & Live Canvas ]
              </span>
            </div>
          </div>
        </TerminalWindow>

        {/* 3-Part Case Study Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Problem */}
          <div className="p-6 rounded-lg border border-border-subtle bg-surface space-y-3">
            <PromptLabel label="cat problem.md" />
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-text-primary">
              <ShieldCheck className="w-4 h-4 text-accent-warn" />
              <span>The Core Challenge</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Approach */}
          <div className="p-6 rounded-lg border border-border-subtle bg-surface space-y-3">
            <PromptLabel label="cat approach.arch" />
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-text-primary">
              <Cpu className="w-4 h-4 text-accent-primary" />
              <span>Architecture & Strategy</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              {project.approach}
            </p>
          </div>

          {/* Outcome */}
          <div className="p-6 rounded-lg border border-border-subtle bg-surface space-y-3">
            <PromptLabel label="cat outcome.telemetry" />
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-text-primary">
              <BarChart3 className="w-4 h-4 text-accent-secondary" />
              <span>Measurable Impact</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="p-6 rounded-lg border border-border-subtle bg-surface space-y-4">
          <PromptLabel label="sys.inspect --features" />
          <h3 className="font-mono text-base font-bold text-text-primary">
            Key Architecture Modules & Deliverables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded bg-surface-tier2 border border-border-subtle font-mono text-xs text-text-secondary">
                <span className="text-accent-secondary font-bold">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
