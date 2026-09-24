import React from "react";
import { PromptLabel } from "../ui/PromptLabel";
import { SKILLS_DATA } from "@/lib/mockData";
import { Badge } from "../ui/Badge";
import { Code2, Server, Database, Wrench, Languages } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code2 className="w-4 h-4 text-accent-primary" />;
      case "Backend & Cloud":
        return <Server className="w-4 h-4 text-accent-secondary" />;
      case "Database":
        return <Database className="w-4 h-4 text-accent-warn" />;
      case "Tools & DevOps":
        return <Wrench className="w-4 h-4 text-accent-primary" />;
      case "Languages":
        return <Languages className="w-4 h-4 text-accent-secondary" />;
      default:
        return <Code2 className="w-4 h-4 text-accent-primary" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-surface/30 border-t border-border-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <PromptLabel label="cat skills.json" />
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            Technical Stack & Tooling
          </h2>
          <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Technologies, frameworks, databases, and cloud services utilized in building enterprise web systems & dev tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-lg border border-border-subtle bg-surface hover:border-accent-primary/40 transition-all space-y-4"
            >
              <div className="flex items-center gap-2 border-b border-border-subtle/50 pb-3">
                {getCategoryIcon(group.category)}
                <h3 className="font-mono text-sm font-bold text-text-primary">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="tech">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
