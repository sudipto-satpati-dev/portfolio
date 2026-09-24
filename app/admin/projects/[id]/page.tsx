"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { INITIAL_PROJECTS, Project } from "@/lib/mockData";
import { Save, ArrowLeft, Upload, Plus, X } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

export default function AdminProjectEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";

  const [project, setProject] = useState<Partial<Project>>({
    title: "",
    slug: "",
    category: "Web Platform",
    shortDescription: "",
    problem: "",
    approach: "",
    outcome: "",
    features: [],
    techStack: ["React.js", "TypeScript", "Tailwind CSS"],
    links: { github: "", live: "" },
    featured: true,
    order: 1,
    status: "published",
  });

  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (!isNew) {
      const existing = INITIAL_PROJECTS.find((p) => p.id === params.id || p.slug === params.id);
      if (existing) {
        setProject(existing);
      }
    }
  }, [params.id, isNew]);

  const addTechTag = () => {
    if (tagInput.trim() && !project.techStack?.includes(tagInput.trim())) {
      setProject((prev) => ({
        ...prev,
        techStack: [...(prev.techStack || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTechTag = (tag: string) => {
    setProject((prev) => ({
      ...prev,
      techStack: prev.techStack?.filter((t) => t !== tag),
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setProject((prev) => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setProject((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-5xl">
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
              {isNew ? "Create Flagship Project" : `Edit Project: ${project.title}`}
            </h1>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent-primary hover:bg-accent-primary-hover text-background font-mono text-xs font-bold transition-all shadow-glow"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
          <TerminalWindow title="form://project.editor">
            <div className="space-y-6">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">URL Slug</label>
                  <input
                    type="text"
                    value={project.slug}
                    onChange={(e) => setProject({ ...project, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">Category</label>
                  <input
                    type="text"
                    value={project.category}
                    onChange={(e) => setProject({ ...project, category: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">Publication Status</label>
                  <select
                    value={project.status}
                    onChange={(e) => setProject({ ...project, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-text-secondary">Short Overview / Card Description</label>
                <textarea
                  rows={2}
                  value={project.shortDescription}
                  onChange={(e) => setProject({ ...project, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                />
              </div>

              {/* Problem / Approach / Outcome Breakdown */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-accent-warn">Case Study: Problem Statement</label>
                  <textarea
                    rows={3}
                    value={project.problem}
                    onChange={(e) => setProject({ ...project, problem: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-accent-primary">Case Study: Architectural Approach</label>
                  <textarea
                    rows={3}
                    value={project.approach}
                    onChange={(e) => setProject({ ...project, approach: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-accent-secondary">Case Study: Measurable Outcome</label>
                  <textarea
                    rows={3}
                    value={project.outcome}
                    onChange={(e) => setProject({ ...project, outcome: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Tech Stack Chip Input */}
              <div className="space-y-2">
                <label className="text-text-secondary">Tech Stack Chips</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.techStack?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-tier2 border border-border-subtle text-text-primary text-xs"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTechTag(tag)}
                        className="text-text-muted hover:text-accent-warn"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type technology name..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechTag();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addTechTag}
                    className="px-3 py-2 rounded bg-surface-tier2 border border-border-subtle hover:border-accent-primary text-text-primary"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={project.links?.github || ""}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        links: { ...project.links, github: e.target.value, live: project.links?.live || null },
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">Live System URL</label>
                  <input
                    type="url"
                    value={project.links?.live || ""}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        links: { ...project.links, live: e.target.value, github: project.links?.github || null },
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover Image Upload Area */}
              <div className="space-y-1.5">
                <label className="text-text-secondary">Cover Image / Screenshot Upload</label>
                <div className="border-2 border-dashed border-border-subtle rounded-lg p-6 text-center hover:border-accent-primary/50 transition-colors cursor-pointer space-y-2">
                  <Upload className="w-8 h-8 text-accent-primary mx-auto" />
                  <div className="text-text-secondary">Drag and drop project screenshots or click to browse</div>
                  <div className="text-[10px] text-text-muted">PNG, JPG or WebP up to 5MB</div>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </form>
      </main>
    </div>
  );
}
