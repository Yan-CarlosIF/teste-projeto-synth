"use client";

import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./box"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Informations() {
  const ref = useRef(null);
  const canvaRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%", // quando o topo do elemento atingir 80% da viewport
          toggleActions: "play none none none", // só anima uma vez
        },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      id="info"
      className="my-30 justify-center opacity-0 transition-opacity flex px-36"
    >
      <div className="flex w-3/4 flex-col gap-10">
        <h1 className="font-semibold text-4xl">
          Synth Act: Modelagem 3D de Dataset Sintético de Atividades
        </h1>
        <span className="text-neutral-300 w-9/10 text-justify">
          Detecção de anomalias em vídeos de vigilância é uma tarefa aplicável
          em uma miríade de cenários, como detecção de quedas e reconhecimento
          de atividades não usuais, como acidentes e crimes. A captura de cenas
          em ambientes reais envolve desafios e custos associados à configuração
          de câmeras, além do fato de situações anômalas geralmente ocorrem em
          menor frequência que eventos normais. Deste modo, este projeto de
          pesquisa propõe o uso de modelagem 3D para a concepção de um dataset
          sintético para detecção de anomalias em vídeo de vigilância. Os dados
          gerados permitirão apoiar análises para detecção de atividades não
          usuais em cenários de monitoramento, visando a melhoria da atividade
          de video de vigilância automatizada e impacto positivo na segurança e
          bem estar.
        </span>
      </div>
      <Canvas ref={canvaRef} className="!w-1/2 !h-[300px]">
        <Scene triggerRef={canvaRef} />
      </Canvas>
    </div>
  );
}
