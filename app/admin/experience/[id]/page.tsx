"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { INITIAL_EXPERIENCE, ExperienceItem } from "@/lib/mockData";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

export default function AdminExperienceEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";

  const [exp, setExp] = useState<Partial<ExperienceItem>>({
    company: "",
    role: "",
    startDate: "",
    endDate: null,
    location: "Kolkata, India",
    bullets: [],
    order: 1,
  });

  const [bulletInput, setBulletInput] = useState("");

  useEffect(() => {
    if (!isNew) {
      const existing = INITIAL_EXPERIENCE.find((e) => e.id === params.id);
      if (existing) {
        setExp(existing);
      }
    }
  }, [params.id, isNew]);

  const addBullet = () => {
    if (bulletInput.trim()) {
      setExp((prev) => ({
        ...prev,
        bullets: [...(prev.bullets || []), bulletInput.trim()],
      }));
      setBulletInput("");
    }
  };

  const removeBullet = (index: number) => {
    setExp((prev) => ({
      ...prev,
      bullets: prev.bullets?.filter((_, i) => i !== index),
    }));
  };

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
              {isNew ? "Create Experience Log" : `Edit Experience: ${exp.company}`}
            </h1>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent-primary hover:bg-accent-primary-hover text-background font-mono text-xs font-bold transition-all shadow-glow"
          >
            <Save className="w-4 h-4" />
            <span>Save Entry</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
          <TerminalWindow title="form://experience.log.editor">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">Company Name</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => setExp({ ...exp, company: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">Role Title</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => setExp({ ...exp, role: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">Start Date</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM"
                    value={exp.startDate}
                    onChange={(e) => setExp({ ...exp, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">End Date (Leave blank for Present)</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM or Present"
                    value={exp.endDate || ""}
                    onChange={(e) => setExp({ ...exp, endDate: e.target.value || null })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => setExp({ ...exp, location: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Bullets List */}
              <div className="space-y-2">
                <label className="text-text-secondary">Bullet Achievements</label>
                <ul className="space-y-2 mb-3">
                  {exp.bullets?.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded bg-surface-tier2 border border-border-subtle text-text-secondary">
                      <span className="text-accent-secondary mt-0.5">›</span>
                      <span className="flex-1">{b}</span>
                      <button
                        type="button"
                        onClick={() => removeBullet(i)}
                        className="text-text-muted hover:text-accent-warn"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2">
                  <textarea
                    rows={2}
                    placeholder="Add bullet achievement..."
                    value={bulletInput}
                    onChange={(e) => setBulletInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addBullet}
                    className="px-4 py-2 rounded bg-surface-tier2 border border-border-subtle hover:border-accent-primary text-text-primary"
                  >
                    + Add Bullet
                  </button>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </form>
      </main>
    </div>
  );
}
