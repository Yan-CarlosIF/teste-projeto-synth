"use client";

import { Box } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  Mesh,
  BufferGeometry,
  Material,
  Object3DEventMap,
  SpotLight,
  Object3D,
} from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scene({
  triggerRef,
}: {
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const box =
    useRef<Mesh<BufferGeometry, Material | Material[], Object3DEventMap>>(null);
  const lightRef = useRef<SpotLight>(null);
  const targetRef = useRef<Object3D>(new Object3D());
  const { scene } = useThree();

  useEffect(() => {
    if (box.current) {
      gsap.fromTo(
        box.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 2,
          y: 2,
          z: 2,
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%", // quando o topo do elemento atingir 80% da viewport
            toggleActions: "play none none none", // só anima uma vez
          },
        }
      );
    }
  }, []);

  // Adiciona o alvo ao grafo da cena
  useEffect(() => {
    scene.add(targetRef.current);

    // Garante que a luz aponte para o centro da cena (onde está a box)
    if (lightRef.current) {
      lightRef.current.target = targetRef.current;
      targetRef.current.position.set(0, 0, 0); // Posição da Box
    }
  }, [scene]);

  // Rotaciona a box constantemente
  useFrame(() => {
    if (box.current) {
      box.current.rotation.x += 0.015;
      box.current.rotation.y += 0.015;
      box.current.rotation.z += 0.015;
    }
  });

  return (
    <>
      <spotLight
        ref={lightRef}
        position={[2, 1, 5]}
        angle={1}
        penumbra={0.5}
        intensity={100}
        castShadow
      />
      <hemisphereLight groundColor={"gray"} intensity={1} />

      <Box ref={box} scale={0.1}>
        <meshStandardMaterial color="white" />
      </Box>
    </>
  );
}
