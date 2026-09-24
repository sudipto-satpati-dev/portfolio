"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CursorRepelScene: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const [pointer, setPointer] = useState({ x: -999, y: -999 });

  // Ultra-fine micro-square grid mesh (3,150 micro-nodes)
  const gridCols = 70;
  const gridRows = 45;
  const totalCount = gridCols * gridRows;

  // Base original dense grid coordinates
  const [basePositions, currentPositions, linePositions] = useMemo(() => {
    const basePos = new Float32Array(totalCount * 3);
    const currPos = new Float32Array(totalCount * 3);

    const xSpacing = 0.16;
    const ySpacing = 0.16; // Extra small square cell size
    const xOffset = ((gridCols - 1) * xSpacing) / 2;
    const yOffset = ((gridRows - 1) * ySpacing) / 2;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        const x = c * xSpacing - xOffset;
        const y = r * ySpacing - yOffset;
        const z = 0;

        basePos[idx * 3] = x;
        basePos[idx * 3 + 1] = y;
        basePos[idx * 3 + 2] = z;

        currPos[idx * 3] = x;
        currPos[idx * 3 + 1] = y;
        currPos[idx * 3 + 2] = z;
      }
    }

    // Build micro-square grid lines (horizontal + vertical)
    const lineCoords: number[] = [];
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        // Right neighbor
        if (c < gridCols - 1) {
          const rightIdx = r * gridCols + (c + 1);
          lineCoords.push(basePos[idx * 3], basePos[idx * 3 + 1], basePos[idx * 3 + 2]);
          lineCoords.push(basePos[rightIdx * 3], basePos[rightIdx * 3 + 1], basePos[rightIdx * 3 + 2]);
        }
        // Top neighbor
        if (r < gridRows - 1) {
          const topIdx = (r + 1) * gridCols + c;
          lineCoords.push(basePos[idx * 3], basePos[idx * 3 + 1], basePos[idx * 3 + 2]);
          lineCoords.push(basePos[topIdx * 3], basePos[topIdx * 3 + 1], basePos[topIdx * 3 + 2]);
        }
      }
    }

    return [basePos, currPos, new Float32Array(lineCoords)];
  }, [gridCols, gridRows, totalCount]);

  // Track pointer in 3D world space coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = document.getElementById("experience");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const normX = ((e.clientX - rect.left) / rect.width) * 14 - 7;
        const normY = -(((e.clientY - rect.top) / rect.height) * 9 - 4.5);
        setPointer({ x: normX, y: normY });
      } else {
        setPointer({ x: -999, y: -999 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    const repelRadius = 2.4;
    const repelStrength = 1.3;

    for (let i = 0; i < totalCount; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];

      const dx = bx - pointer.x;
      const dy = by - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetX = bx;
      let targetY = by;
      let targetZ = 0;

      if (dist < repelRadius && dist > 0.001) {
        const force = (1 - dist / repelRadius) * repelStrength;
        targetX = bx + (dx / dist) * force;
        targetY = by + (dy / dist) * force;
        targetZ = force * 1.1;
      }

      posArr[i * 3] += (targetX - posArr[i * 3]) * 0.16;
      posArr[i * 3 + 1] += (targetY - posArr[i * 3 + 1]) * 0.16;
      posArr[i * 3 + 2] += (targetZ - posArr[i * 3 + 2]) * 0.16;
    }

    posAttr.needsUpdate = true;

    // Update line positions dynamically for fine micro-squares
    const lineArr = lineAttr.array as Float32Array;
    let lineIdx = 0;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        if (c < gridCols - 1) {
          const rightIdx = r * gridCols + (c + 1);
          lineArr[lineIdx * 3] = posArr[idx * 3];
          lineArr[lineIdx * 3 + 1] = posArr[idx * 3 + 1];
          lineArr[lineIdx * 3 + 2] = posArr[idx * 3 + 2];
          lineArr[(lineIdx + 1) * 3] = posArr[rightIdx * 3];
          lineArr[(lineIdx + 1) * 3 + 1] = posArr[rightIdx * 3 + 1];
          lineArr[(lineIdx + 1) * 3 + 2] = posArr[rightIdx * 3 + 2];
          lineIdx += 2;
        }
        if (r < gridRows - 1) {
          const topIdx = (r + 1) * gridCols + c;
          lineArr[lineIdx * 3] = posArr[idx * 3];
          lineArr[lineIdx * 3 + 1] = posArr[idx * 3 + 1];
          lineArr[lineIdx * 3 + 2] = posArr[idx * 3 + 2];
          lineArr[(lineIdx + 1) * 3] = posArr[topIdx * 3];
          lineArr[(lineIdx + 1) * 3 + 1] = posArr[topIdx * 3 + 1];
          lineArr[(lineIdx + 1) * 3 + 2] = posArr[topIdx * 3 + 2];
          lineIdx += 2;
        }
      }
    }
    lineAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Nano Micro-Square Node Dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[currentPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#00ff9d"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Fine Micro-Square Grid Lines */}
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
          opacity={0.35}
        />
      </lineSegments>
    </group>
  );
};
