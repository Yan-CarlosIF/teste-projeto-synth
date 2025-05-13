"use client";

import { useRef } from "react";
import { Group } from "three";

export function LogoShape({ scale = 1 }: { scale: number }) {
  const group = useRef<Group>(null);

  const petals = Array.from({ length: 6 });

  return (
    <group ref={group} scale={scale}>
      {petals.map((_, i) => {
        const angle = (i / petals.length) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0]}
            rotation={[0.2, 0, angle]}
          >
            <coneGeometry args={[1, 0.7, 100, 100]} />
            <meshStandardMaterial color="white" />
          </mesh>
        );
      })}
    </group>
  );
}
