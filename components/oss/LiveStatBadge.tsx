import React from "react";
import { Download, Star } from "lucide-react";

interface LiveStatBadgeProps {
  type: "npm" | "stars";
  value: string | number;
}

export const LiveStatBadge: React.FC<LiveStatBadgeProps> = ({ type, value }) => {
  if (type === "npm") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-secondary/10 border border-accent-secondary/30 text-accent-secondary font-mono text-[11px] font-semibold">
        <Download className="w-3 h-3 text-accent-secondary" />
        <span>{value}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-primary/10 border border-accent-primary/30 text-accent-primary font-mono text-[11px] font-semibold">
      <Star className="w-3 h-3 text-accent-primary" />
      <span>★ {value}</span>
    </span>
  );
};
