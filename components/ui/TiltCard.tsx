"use client";

import React, { useState, useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glareOpacity?: number;
  glareColor?: "green" | "blue" | "custom";
  customGlareRgb?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glareOpacity = 0.35,
  glareColor = "green",
  customGlareRgb = "0, 255, 157",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [glareStyle, setGlareStyle] = useState<{
    opacity: number;
    background: string;
  }>({
    opacity: 0,
    background: "",
  });
  const [transition, setTransition] = useState<string>(
    "transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)"
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate pitch (rotateX) and yaw (rotateY)
    const rotateX = ((0.5 - y) * maxTilt * 2).toFixed(2);
    const rotateY = ((x - 0.5) * maxTilt * 2).toFixed(2);

    setTransition("transform 0.1s ease-out");
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    const glareX = (x * 100).toFixed(1);
    const glareY = (y * 100).toFixed(1);

    const rgb =
      glareColor === "green"
        ? "0, 255, 157"
        : glareColor === "blue"
        ? "77, 159, 255"
        : customGlareRgb;

    setGlareStyle({
      opacity: glareOpacity,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(${rgb}, 0.35) 0%, rgba(${rgb}, 0.14) 40%, transparent 75%)`,
    });
  };

  const handleMouseLeave = () => {
    setTransition("transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)");
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
    setGlareStyle({ opacity: 0, background: "" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-lg group select-none ${className}`}
      style={{
        transform,
        transition,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Light Sweep Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 rounded-lg transition-opacity duration-300 overflow-hidden"
        style={{
          opacity: glareStyle.opacity,
          background: glareStyle.background,
        }}
      />

      {/* Card Content with 3D Depth Support */}
      <div className="h-full w-full [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
