"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { INITIAL_OSS_TOOLS, OssTool } from "@/lib/mockData";
import { Save, ArrowLeft } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

export default function AdminToolEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";

  const [tool, setTool] = useState<Partial<OssTool>>({
    name: "",
    type: "npm",
    description: "",
    githubUrl: "",
    liveUrl: "",
    npmPackageName: "",
    downloads: "1.0k/wk",
    stars: 10,
    order: 1,
    status: "published",
  });

  useEffect(() => {
    if (!isNew) {
      const existing = INITIAL_OSS_TOOLS.find((t) => t.id === params.id);
      if (existing) {
        setTool(existing);
      }
    }
  }, [params.id, isNew]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-4xl">
        <div className="flex items-center justify-between border-b border-border-subtle pb-6">
          <div className="space-y-1">
            <button
              onClick={() => router.back()}
              className="font-mono text-xs text-text-muted hover:text-accent-primary flex items-center gap-1 mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to dashboard</span>
            </button>
            <h1 className="font-mono text-2xl font-bold text-text-primary">
              {isNew ? "Create Open-Source Tool" : `Edit Tool: ${tool.name}`}
            </h1>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent-primary hover:bg-accent-primary-hover text-background font-mono text-xs font-bold transition-all shadow-glow"
          >
            <Save className="w-4 h-4" />
            <span>Save Tool</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
          <TerminalWindow title="form://oss.tool.editor">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">Tool Name</label>
                  <input
                    type="text"
                    value={tool.name}
                    onChange={(e) => setTool({ ...tool, name: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">Type Category</label>
                  <select
                    value={tool.type}
                    onChange={(e) => setTool({ ...tool, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  >
                    <option value="npm">NPM Package</option>
                    <option value="cli">CLI Utility</option>
                    <option value="chrome-extension">Chrome Extension</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-secondary">Short Description</label>
                <textarea
                  rows={3}
                  value={tool.description}
                  onChange={(e) => setTool({ ...tool, description: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={tool.githubUrl}
                    onChange={(e) => setTool({ ...tool, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">NPM / Store / Live URL</label>
                  <input
                    type="url"
                    value={tool.liveUrl || tool.storeUrl || ""}
                    onChange={(e) => setTool({ ...tool, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">NPM Package Name (for Live Downloads API)</label>
                  <input
                    type="text"
                    value={tool.npmPackageName || ""}
                    onChange={(e) => setTool({ ...tool, npmPackageName: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">Display Order</label>
                  <input
                    type="number"
                    value={tool.order || 1}
                    onChange={(e) => setTool({ ...tool, order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </TerminalWindow>
        </form>
      </main>
    </div>
  );
}
