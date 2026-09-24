import React from "react";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
  activeGlow?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title,
  children,
  className = "",
  headerRight,
  activeGlow = false,
}) => {
  return (
    <div
      className={`rounded-lg border border-border-subtle bg-surface transition-all duration-300 overflow-hidden ${
        activeGlow ? "border-accent-primary/40 shadow-glow" : "hover:border-border-subtle hover:shadow-card"
      } ${className}`}
    >
      {/* Chrome Top Bar */}
      <div className="h-9 px-3.5 bg-surface-tier2 border-b border-border-subtle flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
          </div>
          {title && (
            <span className="ml-2 font-mono text-xs text-text-secondary truncate max-w-[200px] sm:max-w-[320px]">
              {title}
            </span>
          )}
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>

      {/* Terminal Window Content */}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};
