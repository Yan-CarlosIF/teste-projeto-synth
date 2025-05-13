"use client";

import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CarModelo } from "../components/car";
import { useGLTF } from "@react-three/drei";
import { X } from "lucide-react";

useGLTF.preload("/models/meu-modelo.gltf");

export default function InspectPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [avaliableToDownload, setAvaliableToDownload] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  function startRecording() {
    const canvas = wrapperRef.current?.querySelector("canvas");
    if (!canvas) return;

    setIsRecording(true);

    const stream = canvas.captureStream(30); // 30 FPS
    const chunks: BlobPart[] = [];
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);
  }

  useEffect(() => {
    if (videoUrl) {
      setAvaliableToDownload(true);
    }
  }, [videoUrl]);

  function stopRecording() {
    if (recorder) {
      recorder.stop();
      setRecorder(null);
      setIsRecording(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-screen h-screen">
      <Canvas frameloop="demand" camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={10} />
        <directionalLight position={[5, 5, 5]} />
        <CarModelo scale={1.5} position={[0, 0, 0]} />
        <OrbitControls />
      </Canvas>

      {/* Botões de controle */}
      <div className="absolute top-4 left-4 space-x-2 z-10">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`bg-green-600 cursor-pointer text-white px-4 py-2 rounded ${
            isRecording && "bg-red-600"
          }`}
        >
          {isRecording ? "🛑 Parar e Baixar" : "🎥 Iniciar Gravação"}
        </button>
      </div>

      {/* Link para baixar o vídeo */}
      {avaliableToDownload && videoUrl && (
        <div className="absolute bottom-4 left-4 z-10 bg-neutral-700 p-2 rounded shadow">
          <div className="flex justify-between items-center">
            <p className="text-white">⬇️ Vídeo gerado:</p>
            <button
              onClick={() => setAvaliableToDownload(false)}
              className="text-white/80 cursor-pointer"
            >
              <X />
            </button>
          </div>
          <a
            href={videoUrl}
            download="modelo.webm"
            className="text-blue-400 underline"
          >
            Baixar Vídeo
          </a>
          <video
            src={videoUrl}
            controls
            className="mt-2 max-w-xs max-h-48 rounded"
          />
        </div>
      )}
    </div>
  );
}
