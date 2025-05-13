import React from "react";
import { useGLTF } from "@react-three/drei";

export function CarModelo(props: any) {
  const gltf = useGLTF("/car/car.gltf");

  return <primitive object={gltf.scene} {...props} />;
}
