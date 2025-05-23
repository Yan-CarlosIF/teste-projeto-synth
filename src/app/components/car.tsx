/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

// importação do modelo 3D
export function CarModelo(props: any) {
  const { scene } = useGLTF("/car/car.gltf");

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return <primitive object={clonedScene} {...props} />;
}
