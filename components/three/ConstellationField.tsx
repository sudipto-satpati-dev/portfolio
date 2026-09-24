"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const ConstellationField: React.FC = () => {
  const count = 120;
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const [positions, linePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    // Build connections between nearby points
    const lineCoords: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.5) {
          lineCoords.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
          lineCoords.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
      }
    }

    return [pos, new Float32Array(lineCoords)];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.04;
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.04;
      linesRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
    }
  });

  return (
    <group>
      {/* Particle points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#4d9fff"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Network lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4d9fff"
          transparent
          opacity={0.18}
        />
      </lineSegments>
    </group>
  );
};
