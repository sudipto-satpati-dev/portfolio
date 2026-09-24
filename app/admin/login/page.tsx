"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { Lock, ShieldAlert, KeyRound, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sudiptosatpatiofficial@gmail.com");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#26263815_1px,transparent_1px),linear-gradient(to_bottom,#26263815_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-surface border border-border-subtle text-accent-primary mx-auto flex items-center justify-center shadow-glow">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-mono text-2xl font-bold text-text-primary">
            Admin Auth Terminal
          </h1>
          <p className="font-mono text-xs text-text-muted">
            $ sudo authenticate --user owner
          </p>
        </div>

        <TerminalWindow title="security://login.auth" activeGlow>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-text-secondary flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-accent-primary" />
                <span>Admin Identifier / Email</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-mono text-xs text-text-muted">$</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-7 pr-3 py-2 bg-surface-tier2 border border-border-subtle rounded font-mono text-xs text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-text-secondary flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-accent-secondary" />
                <span>Access Passcode</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-mono text-xs text-text-muted">#</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-7 pr-3 py-2 bg-surface-tier2 border border-border-subtle rounded font-mono text-xs text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded bg-accent-primary hover:bg-accent-primary-hover text-background font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-glow"
            >
              <span>{loading ? "Authenticating Session..." : "Log In to Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border-subtle/50 font-mono text-[10px] text-text-muted text-center flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-accent-warn" />
            <span>Restricted access — authorized owner session only</span>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
