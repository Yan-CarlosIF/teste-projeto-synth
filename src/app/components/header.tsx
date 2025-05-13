"use client";

import { redirect } from "next/navigation";
import { LogoShape } from "./symbol";
import { Canvas } from "@react-three/fiber";

export default function Header() {
  return (
    <div className="flex h-24 justify-between items-center px-30 w-full">
      <div className="flex items-center justify-center">
        <Canvas className="!w-[80px]" camera={{ position: [0, 0, 5], fov: 50 }}>
          {/* Luzes */}
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          {/* Objeto 3D */}
          <LogoShape scale={0.3} />
        </Canvas>
        <h1 className="font-semibold text-xl">SynthAct</h1>
      </div>
      <button
        onClick={() => {
          redirect("#info");
        }}
        className="group cursor-pointer relative h-12 overflow-hidden overflow-x-hidden rounded-full border-2 border-[#313a49b8] px-8 py-2 text-gray-200"
      >
        <span className="relative z-10">Explorar</span>
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-teal-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
        </span>
      </button>
    </div>
  );
}
