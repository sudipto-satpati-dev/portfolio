"use client";

import React from "react";
import dynamic from "next/dynamic";
import { PromptLabel } from "../ui/PromptLabel";
import { TypewriterTagline } from "./TypewriterTagline";
import { HeroStats } from "./HeroStats";
import { INITIAL_SITE_CONFIG } from "@/lib/mockData";
import { ArrowDownRight, FileText, ChevronRight } from "lucide-react";

const HeroCanvas = dynamic(() => import("../three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[460px] rounded-lg border border-border-subtle/40 bg-surface/30 animate-pulse flex items-center justify-center">
      <span className="font-mono text-xs text-text-muted">$ loading 3d telemetry...</span>
    </div>
  ),
});

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#26263810_1px,transparent_1px),linear-gradient(to_bottom,#26263810_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <PromptLabel label="whoami" />

            <div className="space-y-2">
              <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight">
                {INITIAL_SITE_CONFIG.name}
              </h1>
              <div className="font-mono text-lg sm:text-xl font-semibold text-accent-primary">
                {INITIAL_SITE_CONFIG.role}
              </div>
            </div>

            <TypewriterTagline text={INITIAL_SITE_CONFIG.tagline} />

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accent-primary hover:bg-accent-primary-hover text-background font-mono text-xs font-bold transition-all shadow-glow"
              >
                <span>View Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href={INITIAL_SITE_CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded border border-border-subtle hover:border-accent-primary bg-surface/60 text-text-primary hover:text-accent-primary font-mono text-xs transition-all"
              >
                <FileText className="w-4 h-4 text-accent-secondary" />
                <span>Resume PDF</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1 font-mono text-xs text-text-secondary hover:text-accent-primary transition-colors py-2 px-3"
              >
                <span>$ ./contact.sh</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Headline Stats */}
            <HeroStats stats={INITIAL_SITE_CONFIG.headlineStats} />
          </div>

          {/* Right Column: R3F 3D Scene (5 Cols) */}
          <div className="lg:col-span-5">
            <HeroCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
