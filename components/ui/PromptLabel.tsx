import React from "react";

interface PromptLabelProps {
  label: string;
  className?: string;
}

export const PromptLabel: React.FC<PromptLabelProps> = ({ label, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 font-mono text-xs text-text-muted tracking-wider select-none ${className}`}>
      <span className="text-accent-primary font-semibold">$</span>
      <span>{label}</span>
    </div>
  );
};
