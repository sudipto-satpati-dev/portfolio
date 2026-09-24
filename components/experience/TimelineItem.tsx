import React from "react";
import Link from "next/link";
import { ExperienceItem } from "@/lib/mockData";
import { Briefcase, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Badge } from "../ui/Badge";

interface TimelineItemProps {
  item: ExperienceItem;
  isLast: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  return (
    <div className="relative pl-8 sm:pl-10 pb-12 group">
      {/* Vertical Line Segment */}
      {!isLast && (
        <span
          className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border-subtle group-hover:bg-accent-primary/40 transition-colors"
          aria-hidden="true"
        />
      )}

      {/* Glowing Node Dot */}
      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-border-subtle bg-surface flex items-center justify-center group-hover:border-accent-primary group-hover:shadow-glow-blue transition-all">
        <span className="w-2 h-2 rounded-full bg-accent-primary group-hover:scale-125 transition-transform" />
      </div>

      {/* Experience Content Box */}
      <div className="p-6 rounded-lg border border-border-subtle bg-surface hover:border-accent-primary/40 transition-all space-y-4">
        {/* Role & Company Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle/50 pb-3">
          <div>
            <h3 className="font-mono text-base sm:text-lg font-bold text-text-primary">
              {item.company}
            </h3>
            <div className="font-mono text-sm font-semibold text-accent-primary flex items-center gap-2 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-accent-primary" />
              <span>{item.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-accent-secondary" />
              <span>
                {item.startDate} — {item.endDate ? item.endDate : "Present"}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-text-muted" />
              <span>{item.location}</span>
            </div>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 font-sans text-xs text-text-secondary leading-relaxed">
          {item.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent-secondary font-mono text-xs mt-0.5">›</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Linked Projects */}
        {item.linkedProjectSlugs && item.linkedProjectSlugs.length > 0 && (
          <div className="flex items-center gap-2 pt-2">
            <span className="font-mono text-[10px] text-text-muted uppercase">Linked Project:</span>
            {item.linkedProjectSlugs.map((slug) => (
              <Link key={slug} href={`/projects/${slug}`}>
                <Badge variant="github" className="group/badge">
                  <span>→ {slug.toUpperCase()}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover/badge:translate-x-0.5 transition-transform" />
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
