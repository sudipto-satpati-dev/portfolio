"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CursorRepelScene } from "./CursorRepelScene";

export const CursorRepelCanvas: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  if (!mounted || isMobile) {
    return null; // Gracefully disable on mobile
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <CursorRepelScene />
      </Canvas>
    </div>
  );
};

export default CursorRepelCanvas;
