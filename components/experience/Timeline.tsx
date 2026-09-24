"use client";

import React from "react";
import dynamic from "next/dynamic";
import { PromptLabel } from "../ui/PromptLabel";
import { TimelineItem } from "./TimelineItem";
import { ExperienceItem } from "@/lib/mockData";

const CursorRepelCanvas = dynamic(() => import("../three/CursorRepelCanvas"), {
  ssr: false,
});

interface TimelineProps {
  experience: ExperienceItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* 3D Cursor-Repelling Particle Field Background */}
      <CursorRepelCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-3 mb-12">
          <PromptLabel label="cat experience.log" />
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            Professional Experience Log
          </h2>
          <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Engineering roles, serverless architecture migrations, enterprise product deliveries, and core platform contributions.
          </p>
        </div>

        <div className="max-w-4xl relative">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
