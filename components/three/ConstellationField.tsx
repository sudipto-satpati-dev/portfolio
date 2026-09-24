"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface TechNode {
  id: string;
  label: string;
  category: "frontend" | "backend" | "database" | "cloud" | "tool";
  position: [number, number, number];
  relatedIds: string[];
}

const TECH_LIST: Omit<TechNode, "position">[] = [
  { id: "react", label: "React.js", category: "frontend", relatedIds: ["nextjs", "typescript", "socketio"] },
  { id: "angular", label: "Angular 14", category: "frontend", relatedIds: ["springboot", "rxjs", "typescript"] },
  { id: "springboot", label: "Spring Boot", category: "backend", relatedIds: ["java", "postgresql", "angular"] },
  { id: "java", label: "Core Java 17", category: "backend", relatedIds: ["springboot", "postgresql"] },
  { id: "nodejs", label: "Node.js", category: "backend", relatedIds: ["socketio", "mongodb", "redis", "lambda"] },
  { id: "lambda", label: "AWS Lambda", category: "cloud", relatedIds: ["nodejs", "firebase"] },
  { id: "firebase", label: "Firebase", category: "cloud", relatedIds: ["nextjs", "lambda"] },
  { id: "mongodb", label: "MongoDB", category: "database", relatedIds: ["nodejs", "socketio"] },
  { id: "postgresql", label: "PostgreSQL", category: "database", relatedIds: ["springboot", "java"] },
  { id: "redis", label: "Redis", category: "database", relatedIds: ["socketio", "nodejs"] },
  { id: "socketio", label: "Socket.io", category: "backend", relatedIds: ["react", "redis", "nodejs"] },
  { id: "typescript", label: "TypeScript", category: "frontend", relatedIds: ["react", "angular", "nextjs"] },
  { id: "nextjs", label: "Next.js 14", category: "frontend", relatedIds: ["react", "firebase", "typescript"] },
  { id: "rxjs", label: "RxJS", category: "frontend", relatedIds: ["angular", "typescript"] },
  { id: "aggrid", label: "AG Grid", category: "tool", relatedIds: ["react", "angular"] },
];

export const ConstellationField: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fibonacci sphere layout to position nodes evenly on 3D sphere
  const nodes = useMemo<TechNode[]>(() => {
    const radius = 2.4;
    const n = TECH_LIST.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    return TECH_LIST.map((item, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      const py = y * radius;

      return {
        ...item,
        position: [x, py, z],
      };
    });
  }, []);

  // Map nodes by ID for fast lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, TechNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Compute connecting lines geometry
  const lineSegmentsPositions = useMemo(() => {
    const points: number[] = [];
    nodes.forEach((node) => {
      node.relatedIds.forEach((relId) => {
        const target = nodeMap.get(relId);
        if (target) {
          points.push(...node.position);
          points.push(...target.position);
        }
      });
    });
    return new Float32Array(points);
  }, [nodes, nodeMap]);

  // Auto-rotate and lerp scale/position driven by scrollProgress
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotation speed speeds up slightly as sphere contracts
      groupRef.current.rotation.y += delta * (0.15 + scrollProgress * 0.3);
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.08;

      // Scale down sphere smoothly from 1.0 to 0.25 as user scrolls past hero
      const targetScale = 1.0 - scrollProgress * 0.75;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lineSegmentsPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4d9fff"
          transparent
          opacity={Math.max(0.05, (1 - scrollProgress) * (hoveredNodeId ? 0.3 : 0.18))}
        />
      </lineSegments>

      {/* Sphere Outer Wireframe Outline Ring */}
      <mesh>
        <sphereGeometry args={[2.45, 16, 16]} />
        <meshBasicMaterial
          color="#262638"
          wireframe
          transparent
          opacity={Math.max(0.02, (1 - scrollProgress) * 0.08)}
        />
      </mesh>

      {/* Tech Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const isRelated =
          hoveredNodeId !== null &&
          nodeMap.get(hoveredNodeId)?.relatedIds.includes(node.id);

        return (
          <group key={node.id} position={node.position}>
            {/* 3D Sphere Node Marker */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNodeId(node.id);
              }}
              onPointerOut={() => setHoveredNodeId(null)}
            >
              <sphereGeometry args={[isHovered ? 0.12 : 0.07, 16, 16]} />
              <meshBasicMaterial
                color={
                  isHovered
                    ? "#00ff9d"
                    : isRelated
                    ? "#4d9fff"
                    : "#a4c8ff"
                }
              />
            </mesh>

            {/* Glowing Ring around active/hovered node */}
            {(isHovered || isRelated) && (
              <mesh>
                <ringGeometry args={[0.15, 0.22, 32]} />
                <meshBasicMaterial
                  color={isHovered ? "#00ff9d" : "#4d9fff"}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}

            {/* 3D CSS Html Tech Badge Overlay (fades out as sphere contracts on scroll) */}
            {scrollProgress < 0.6 && (
              <Html
                center
                distanceFactor={8}
                className="pointer-events-none select-none transition-opacity duration-300"
                style={{ opacity: 1 - scrollProgress * 1.5 }}
              >
                <div
                  className={`px-2 py-0.5 rounded font-mono text-[10px] whitespace-nowrap transition-all duration-200 border ${
                    isHovered
                      ? "bg-accent-secondary/20 border-accent-secondary text-accent-secondary font-bold scale-110 shadow-glow-green"
                      : isRelated
                      ? "bg-accent-primary/20 border-accent-primary text-accent-primary font-semibold"
                      : "bg-surface/80 border-border-subtle/80 text-text-secondary"
                  }`}
                >
                  {node.label}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};
