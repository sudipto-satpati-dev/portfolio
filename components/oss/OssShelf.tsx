import React from "react";
import { PromptLabel } from "../ui/PromptLabel";
import { OssToolCard } from "./OssToolCard";
import { OssTool } from "@/lib/mockData";
import { Terminal, PackageSearch, Layers } from "lucide-react";

interface OssShelfProps {
  tools: OssTool[];
}

export const OssShelf: React.FC<OssShelfProps> = ({ tools }) => {
  const npmAndCli = tools.filter((t) => t.type === "npm" || t.type === "cli");
  const extensions = tools.filter((t) => t.type === "chrome-extension");

  return (
    <section id="oss" className="py-20 relative bg-surface/30 border-y border-border-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <PromptLabel label="npm ls --global && ls ./extensions" />
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            Open-Source Shelf
          </h2>
          <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Developer tools, npm packages, and Chrome extensions shipped for public usage with real-time download & star metrics.
          </p>
        </div>

        {/* NPM Packages & CLI Section */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-2 border-b border-border-subtle/50 pb-2">
            <PackageSearch className="w-4 h-4 text-accent-secondary" />
            <h3 className="font-mono text-sm font-semibold text-text-primary tracking-wide">
              NPM Packages & CLI Utilities
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {npmAndCli.map((tool) => (
              <OssToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Chrome Extensions Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border-subtle/50 pb-2">
            <Terminal className="w-4 h-4 text-accent-warn" />
            <h3 className="font-mono text-sm font-semibold text-text-primary tracking-wide">
              Browser & Chrome Extensions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {extensions.map((tool) => (
              <OssToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
