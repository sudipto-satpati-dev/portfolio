"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ConstellationField } from "./ConstellationField";

export const HeroCanvas: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check reduced motion or mobile view to conserve resources
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || window.innerWidth < 768) {
      setIsLowPower(true);
    }
  }, []);

  if (!mounted || isLowPower) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-accent-primary/5 via-transparent to-accent-secondary/5 rounded-lg border border-border-subtle/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#26263815_1px,transparent_1px),linear-gradient(to_bottom,#26263815_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-32 h-32 rounded-full border border-accent-primary/20 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-accent-secondary/30 animate-ping" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[360px] sm:h-[460px] relative rounded-lg border border-border-subtle/40 bg-surface/30 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#26263815_1px,transparent_1px),linear-gradient(to_bottom,#26263815_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ConstellationField />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
