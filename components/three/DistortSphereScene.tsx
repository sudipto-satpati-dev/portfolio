"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const DistortSphereScene: React.FC = () => {
  const globeGroupRef = useRef<THREE.Group>(null!);
  const globeGridMaterialRef = useRef<THREE.MeshBasicMaterial>(null!);
  const sat1Ref = useRef<THREE.Mesh>(null!);
  const sat2Ref = useRef<THREE.Mesh>(null!);
  const sat3Ref = useRef<THREE.Mesh>(null!);

  const [hovered, setHovered] = useState(false);

  // Smooth lerped animation state variables
  const currentScale = useRef(1.0);
  const currentSpeed = useRef(0.35);
  const currentColor = useRef(new THREE.Color("#4d9fff"));
  const targetColorBlue = useMemo(() => new THREE.Color("#4d9fff"), []);
  const targetColorGreen = useMemo(() => new THREE.Color("#00ff9d"), []);

  // Generate 36 surface node dots on the scaled-up globe (radius 0.95)
  const [nodePositions] = useMemo(() => {
    const pos = new Float32Array(36 * 3);
    const radius = 0.95;
    for (let i = 0; i < 36; i++) {
      const lat = (Math.random() - 0.5) * Math.PI;
      const lon = Math.random() * Math.PI * 2;
      pos[i * 3] = radius * Math.cos(lat) * Math.cos(lon);
      pos[i * 3 + 1] = radius * Math.sin(lat);
      pos[i * 3 + 2] = radius * Math.cos(lat) * Math.sin(lon);
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smooth lerped scale, speed & color transitions on hover
    const targetScale = hovered ? 1.06 : 1.0;
    const targetSpeed = hovered ? 0.8 : 0.35;
    const targetCol = hovered ? targetColorGreen : targetColorBlue;

    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.08);
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, 0.08);
    currentColor.current.lerp(targetCol, 0.08);

    if (globeGroupRef.current) {
      globeGroupRef.current.scale.set(
        currentScale.current,
        currentScale.current,
        currentScale.current
      );
      globeGroupRef.current.rotation.y += delta * currentSpeed.current;
    }

    if (globeGridMaterialRef.current) {
      globeGridMaterialRef.current.color = currentColor.current;
    }

    // Animate Satellites orbiting along their scaled 3D Torus paths
    const r1 = 1.22;
    if (sat1Ref.current) {
      sat1Ref.current.position.x = Math.cos(time * 1.4) * r1;
      sat1Ref.current.position.z = Math.sin(time * 1.4) * r1;
    }

    const r2 = 1.40;
    if (sat2Ref.current) {
      sat2Ref.current.position.x = Math.cos(-time * 1.1) * r2;
      sat2Ref.current.position.z = Math.sin(-time * 1.1) * r2;
    }

    const r3 = 1.58;
    if (sat3Ref.current) {
      sat3Ref.current.position.x = Math.sin(time * 1.6) * r3;
      sat3Ref.current.position.y = Math.cos(time * 1.6) * r3;
    }
  });

  return (
    // Earth Axial Tilt (23.5 degrees)
    <group rotation={[0, 0, (23.5 * Math.PI) / 180]}>
      {/* Central Rotating Globe Group */}
      <group
        ref={globeGroupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Inner Solid Core (Radius 0.92) */}
        <mesh>
          <sphereGeometry args={[0.92, 32, 32]} />
          <meshStandardMaterial
            color="#12121a"
            roughness={0.3}
            metalness={0.8}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Outer Wireframe Tech Globe Grid (Radius 0.94) */}
        <mesh>
          <sphereGeometry args={[0.94, 24, 24]} />
          <meshBasicMaterial
            ref={globeGridMaterialRef}
            wireframe
            transparent
            opacity={hovered ? 0.65 : 0.35}
          />
        </mesh>

        {/* Surface Node Dots */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color={hovered ? "#00ff9d" : "#16ff9e"}
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </points>
      </group>

      {/* 3D SATELLITE ORBIT TUBES & REVOLVING SATELLITE ORBS */}
      {/* Satellite Orbit 1: Tilted 3D Torus Tube (Radius 1.22) */}
      <group rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[1.22, 0.014, 16, 100]} />
          <meshStandardMaterial
            color="#00ff9d"
            emissive="#00ff9d"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Revolving Satellite 1 */}
        <mesh ref={sat1Ref}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            color="#00ff9d"
            emissive="#00ff9d"
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* Satellite Orbit 2: Tilted Reverse 3D Torus Tube (Radius 1.40) */}
      <group rotation={[-Math.PI / 4, Math.PI / 3, Math.PI / 8]}>
        <mesh>
          <torusGeometry args={[1.40, 0.014, 16, 100]} />
          <meshStandardMaterial
            color="#4d9fff"
            emissive="#4d9fff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Revolving Satellite 2 */}
        <mesh ref={sat2Ref}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            color="#4d9fff"
            emissive="#4d9fff"
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* Satellite Orbit 3: Inclined Polar 3D Torus Tube (Radius 1.58) */}
      <group rotation={[Math.PI / 6, -Math.PI / 4, Math.PI / 3]}>
        <mesh>
          <torusGeometry args={[1.58, 0.014, 16, 100]} />
          <meshStandardMaterial
            color="#a4c8ff"
            emissive="#a4c8ff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Revolving Satellite 3 */}
        <mesh ref={sat3Ref}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            color="#a4c8ff"
            emissive="#a4c8ff"
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>
    </group>
  );
};
