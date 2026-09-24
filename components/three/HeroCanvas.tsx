"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
      <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-tr from-accent-primary/5 via-transparent to-accent-secondary/5 rounded-lg border border-border-subtle/50 p-6 space-y-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#26263815_1px,transparent_1px),linear-gradient(to_bottom,#26263815_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-24 h-24 rounded-full border border-accent-primary/30 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-accent-secondary/40 animate-ping" />
        </div>
        <div className="font-mono text-xs text-text-secondary text-center">
          $ tech.constellation --nodes [React, SpringBoot, AWS, Redis, Node, Angular]
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[380px] sm:h-[480px] relative rounded-lg border border-border-subtle/40 bg-surface/30 overflow-hidden group">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#26263815_1px,transparent_1px),linear-gradient(to_bottom,#26263815_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header Overlay Label */}
      <div className="absolute top-3 left-4 z-10 font-mono text-[10px] text-text-muted flex items-center gap-2 select-none">
        <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
        <span>3D Tech Constellation (Drag to rotate, hover node)</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <ConstellationField />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
