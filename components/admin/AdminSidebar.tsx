"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Wrench, Briefcase, Settings, LogOut, ExternalLink } from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects/new", icon: FolderKanban },
    { label: "OSS Tools", href: "/admin/tools/new", icon: Wrench },
    { label: "Experience", href: "/admin/experience/new", icon: Briefcase },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border-subtle flex flex-col justify-between p-4 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-border-subtle">
          <div className="w-8 h-8 rounded bg-accent-primary/10 border border-accent-primary flex items-center justify-center font-mono font-bold text-accent-primary text-xs">
            SYS
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-text-primary">Admin Control Console</div>
            <div className="font-mono text-[10px] text-accent-secondary">● System Online</div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="space-y-1 font-mono text-xs">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all ${
                  isActive
                    ? "bg-accent-primary/10 text-accent-primary border-l-2 border-accent-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-tier2"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-3 pt-4 border-t border-border-subtle font-mono text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded border border-border-subtle text-text-secondary hover:text-accent-primary transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-2 px-3 py-2 rounded text-accent-warn hover:bg-accent-warn/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Session</span>
        </Link>
      </div>
    </aside>
  );
};
