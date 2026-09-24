"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DistortSphereScene } from "./DistortSphereScene";

export const DistortSphereCanvas: React.FC = () => {
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
    <div className="w-full max-w-[280px] h-[230px] sm:h-[250px] relative overflow-hidden select-none pointer-events-auto flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 6.0], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 8]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <DistortSphereScene />
      </Canvas>
    </div>
  );
};

export default DistortSphereCanvas;
