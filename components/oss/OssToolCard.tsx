import React from "react";
import { OssTool } from "@/lib/mockData";
import { LiveStatBadge } from "./LiveStatBadge";
import { Github, ExternalLink, Package, Terminal, Chrome } from "lucide-react";

interface OssToolCardProps {
  tool: OssTool;
}

export const OssToolCard: React.FC<OssToolCardProps> = ({ tool }) => {
  const getToolIcon = () => {
    switch (tool.type) {
      case "npm":
        return <Package className="w-4 h-4 text-accent-secondary" />;
      case "cli":
        return <Terminal className="w-4 h-4 text-accent-primary" />;
      case "chrome-extension":
        return <Chrome className="w-4 h-4 text-accent-warn" />;
      default:
        return <Package className="w-4 h-4 text-accent-primary" />;
    }
  };

  return (
    <div className="p-5 rounded-lg border border-border-subtle bg-surface hover:border-accent-primary/50 hover:shadow-card transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Header: Icon & Type Badge */}
        <div className="flex items-center justify-between">
          <div className="p-2 rounded bg-surface-tier2 border border-border-subtle">
            {getToolIcon()}
          </div>
          <div className="flex items-center gap-2">
            {tool.downloads && <LiveStatBadge type="npm" value={tool.downloads} />}
            {tool.stars && <LiveStatBadge type="stars" value={tool.stars} />}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-mono text-base font-bold text-text-primary hover:text-accent-primary transition-colors">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs text-text-secondary leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer Links */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-subtle/40 font-mono text-xs">
        <span className="text-[10px] text-text-muted uppercase tracking-wider">
          {tool.type.toUpperCase()}
        </span>

        <div className="flex items-center gap-3">
          {tool.githubUrl && (
            <a
              href={tool.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-primary transition-colors flex items-center gap-1"
              title="GitHub Repo"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Repo</span>
            </a>
          )}
          {(tool.liveUrl || tool.storeUrl) && (
            <a
              href={tool.liveUrl || tool.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-secondary transition-colors flex items-center gap-1"
              title="Registry / Store"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Install</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
