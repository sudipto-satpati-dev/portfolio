"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { INITIAL_SITE_CONFIG, SiteConfig } from "@/lib/mockData";
import { Save, FileText, Upload } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-4xl">
        <div className="flex items-center justify-between border-b border-border-subtle pb-6">
          <div>
            <h1 className="font-mono text-2xl font-bold text-text-primary">
              Global Site Settings
            </h1>
            <p className="font-mono text-xs text-text-muted">
              $ firestore.doc(&apos;siteConfig/main&apos;).update()
            </p>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent-primary hover:bg-accent-primary-hover text-background font-mono text-xs font-bold transition-all shadow-glow"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? "Saved Successfully!" : "Save Site Config"}</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
          <TerminalWindow title="config://siteConfig.main">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">Owner Name</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">Professional Role Label</label>
                  <input
                    type="text"
                    value={config.role}
                    onChange={(e) => setConfig({ ...config, role: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-secondary">Hero Typewriter Tagline</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                />
              </div>

              {/* Social links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={config.socials.github}
                    onChange={(e) => setConfig({ ...config, socials: { ...config.socials, github: e.target.value } })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={config.socials.linkedin}
                    onChange={(e) => setConfig({ ...config, socials: { ...config.socials, linkedin: e.target.value } })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary">LeetCode Profile URL</label>
                  <input
                    type="url"
                    value={config.socials.leetcode}
                    onChange={(e) => setConfig({ ...config, socials: { ...config.socials, leetcode: e.target.value } })}
                    className="w-full px-3 py-2 bg-surface-tier2 border border-border-subtle rounded text-text-primary focus:border-accent-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-1.5">
                <label className="text-text-secondary">Resume PDF File Upload (Firebase Storage)</label>
                <div className="border border-border-subtle bg-surface-tier2 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-accent-secondary" />
                    <div>
                      <div className="text-text-primary font-bold">sudipto_satpati_resume.pdf</div>
                      <div className="text-text-muted text-[10px]">Latest Resume PDF linked to public site CTA</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-border-subtle hover:border-accent-primary text-text-primary"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New PDF</span>
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
