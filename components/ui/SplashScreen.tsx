"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export const SplashScreen: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Check session storage so splash screen only runs once per session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setMounted(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadingOut(true);
          setTimeout(() => {
            setMounted(false);
            sessionStorage.setItem("hasSeenSplash", "true");
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 select-none transition-opacity duration-600 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#26263815_1px,transparent_1px),linear-gradient(to_bottom,#26263815_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm w-full">
        {/* Glowing Splash Logo */}
        <div className="relative w-20 h-20 rounded-xl bg-surface border border-accent-primary/60 flex items-center justify-center shadow-glow-blue animate-pulse overflow-hidden p-2">
          <Image
            src="/assets/splash-logo.png"
            alt="Sudipto Satpati Splash Logo"
            width={80}
            height={80}
            priority
            className="w-full h-full object-contain"
          />
        </div>

        {/* Brand Name */}
        <div className="text-center space-y-1 font-mono">
          <h1 className="text-xl font-extrabold text-text-primary">Sudipto Satpati</h1>
          <p className="text-xs text-accent-primary">Full-Stack Software Engineer</p>
        </div>

        {/* Boot Sequence Text */}
        <div className="w-full bg-surface-tier2 p-4 rounded-lg border border-border-subtle font-mono text-xs space-y-2 text-text-secondary">
          <div className="flex items-center gap-2 text-accent-primary font-bold">
            <span>$</span>
            <span>init.system --user owner</span>
          </div>

          <div className="text-[11px] text-text-muted space-y-1 pt-1">
            <div className="flex items-center justify-between">
              <span>Telemetry Core:</span>
              <span className="text-accent-secondary">[READY]</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3D Constellation:</span>
              <span className="text-accent-secondary">[OK]</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[10px] text-text-muted mb-1">
              <span>Booting Console</span>
              <span className="text-accent-secondary font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden border border-border-subtle">
              <div
                className="h-full bg-accent-secondary transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
