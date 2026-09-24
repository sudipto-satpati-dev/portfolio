"use client";

import React, { useState } from "react";
import { PromptLabel } from "./PromptLabel";
import { Github, Linkedin, Code2, FileText, Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import { INITIAL_SITE_CONFIG } from "@/lib/mockData";

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(INITIAL_SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="border-t border-border-subtle bg-surface/50 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            <PromptLabel label="./contact.sh" />
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
              Let&apos;s build production systems together.
            </h2>
            <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-lg">
              Open for full-time engineering roles, technical consultancies, or open-source collaborations.
              Drop an email or connect across networks.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail className="w-4 h-4 text-accent-primary" />
                <span>{INITIAL_SITE_CONFIG.email}</span>
                <button
                  onClick={copyEmail}
                  className="p-1 hover:text-accent-primary transition-colors border border-border-subtle rounded"
                  title="Copy Email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-accent-secondary" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-3 text-text-secondary">
                <Phone className="w-4 h-4 text-accent-primary" />
                <span>+91 {INITIAL_SITE_CONFIG.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="w-4 h-4 text-accent-primary" />
                <span>{INITIAL_SITE_CONFIG.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Social Links & CTAs */}
          <div className="space-y-6 lg:pl-12 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider block">
                Network & Profile Links
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={INITIAL_SITE_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded border border-border-subtle bg-surface hover:border-accent-primary hover:text-accent-primary text-text-secondary transition-all font-mono text-xs"
                >
                  <Github className="w-4 h-4 text-accent-primary" />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href={INITIAL_SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded border border-border-subtle bg-surface hover:border-accent-primary hover:text-accent-primary text-text-secondary transition-all font-mono text-xs"
                >
                  <Linkedin className="w-4 h-4 text-accent-primary" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={INITIAL_SITE_CONFIG.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded border border-border-subtle bg-surface hover:border-accent-primary hover:text-accent-primary text-text-secondary transition-all font-mono text-xs"
                >
                  <Code2 className="w-4 h-4 text-accent-warn" />
                  <span>LeetCode Stats</span>
                </a>

                <a
                  href={INITIAL_SITE_CONFIG.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded border border-accent-secondary/50 bg-accent-secondary/5 hover:bg-accent-secondary/10 text-accent-secondary transition-all font-mono text-xs font-semibold"
                >
                  <FileText className="w-4 h-4 text-accent-secondary" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-border-subtle/50 font-mono text-[11px] text-text-muted flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>© {new Date().getFullYear()} Sudipto Satpati. All rights reserved.</span>
              <span className="text-text-muted">Built with Next.js 14 & Three.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
