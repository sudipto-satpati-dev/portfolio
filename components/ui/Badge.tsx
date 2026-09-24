import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "live" | "npm" | "github" | "tech" | "outline" | "warn";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "tech",
  className = "",
  icon,
}) => {
  const getStyles = () => {
    switch (variant) {
      case "live":
        return "bg-accent-secondary/10 border-accent-secondary/30 text-accent-secondary font-mono";
      case "npm":
        return "bg-accent-secondary/10 border-accent-secondary/30 text-accent-secondary font-mono";
      case "github":
        return "bg-accent-primary/10 border-accent-primary/30 text-accent-primary font-mono";
      case "warn":
        return "bg-accent-warn/10 border-accent-warn/30 text-accent-warn font-mono";
      case "outline":
        return "bg-transparent border-border-subtle text-text-secondary font-mono";
      case "tech":
      default:
        return "bg-surface-tier2 border-border-subtle text-text-secondary font-mono hover:text-text-primary hover:border-text-muted";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs border transition-colors ${getStyles()} ${className}`}
    >
      {variant === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse shadow-glow-green" />
      )}
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </span>
  );
};
