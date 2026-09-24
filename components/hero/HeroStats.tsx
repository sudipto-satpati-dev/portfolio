import React from "react";

interface StatItem {
  label: string;
  value: string;
}

interface HeroStatsProps {
  stats: StatItem[];
}

export const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-subtle/60">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-3 rounded bg-surface/60 border border-border-subtle/50 hover:border-accent-secondary/40 transition-colors"
        >
          <div className="font-mono text-2xl sm:text-3xl font-bold text-accent-secondary tracking-tight">
            {stat.value}
          </div>
          <div className="font-sans text-xs text-text-muted mt-1 leading-snug">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
