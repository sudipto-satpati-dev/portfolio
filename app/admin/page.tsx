"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { INITIAL_PROJECTS, INITIAL_OSS_TOOLS, INITIAL_EXPERIENCE, Project, OssTool } from "@/lib/mockData";
import { Plus, Edit3, Trash2, ExternalLink, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tools, setTools] = useState<OssTool[]>(INITIAL_OSS_TOOLS);

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteTool = (id: string) => {
    setTools((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <h1 className="font-mono text-2xl font-bold text-text-primary">
              System CMS Dashboard
            </h1>
            <p className="font-mono text-xs text-text-muted">
              $ firestore.query --all --status live
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent-primary hover:bg-accent-primary-hover text-background font-mono text-xs font-bold transition-all shadow-glow"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Project</span>
            </Link>
          </div>
        </div>

        {/* Projects Section Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-base font-bold text-text-primary flex items-center gap-2">
              <span>Flagship Projects ({projects.length})</span>
            </h2>
            <Link
              href="/admin/projects/new"
              className="font-mono text-xs text-accent-primary hover:underline"
            >
              + Add item
            </Link>
          </div>

          <div className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-surface-tier2 text-text-muted border-b border-border-subtle">
                <tr>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Order</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-surface-tier2/60 transition-colors">
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 text-accent-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Published</span>
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-text-primary max-w-xs truncate">
                      {project.title}
                    </td>
                    <td className="p-3.5 text-text-secondary">
                      <Badge variant="tech">{project.category}</Badge>
                    </td>
                    <td className="p-3.5 text-text-muted">#{project.order}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="inline-block p-1.5 rounded border border-border-subtle text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-1.5 rounded border border-border-subtle text-text-secondary hover:text-accent-warn hover:border-accent-warn transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* OSS Tools Table */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-base font-bold text-text-primary">
              Open-Source Shelf Tools ({tools.length})
            </h2>
            <Link
              href="/admin/tools/new"
              className="font-mono text-xs text-accent-primary hover:underline"
            >
              + Add tool
            </Link>
          </div>

          <div className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-surface-tier2 text-text-muted border-b border-border-subtle">
                <tr>
                  <th className="p-3.5">Tool Name</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Live Stats</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                {tools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-surface-tier2/60 transition-colors">
                    <td className="p-3.5 font-bold text-text-primary">{tool.name}</td>
                    <td className="p-3.5">
                      <Badge variant={tool.type === "npm" ? "npm" : "github"}>
                        {tool.type}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-text-secondary">
                      {tool.downloads || `★ ${tool.stars}`}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <Link
                        href={`/admin/tools/${tool.id}`}
                        className="inline-block p-1.5 rounded border border-border-subtle text-text-secondary hover:text-accent-primary transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteTool(tool.id)}
                        className="p-1.5 rounded border border-border-subtle text-text-secondary hover:text-accent-warn transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
