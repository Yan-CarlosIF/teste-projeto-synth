"use client";

import Image from "next/image";
import labelImage from "@/../public/ChatGPT_Image_13_de_mai._de_2025__15_35_35-removebg-preview.png";
import { redirect } from "next/navigation";

export default function Card() {
  return (
    <button
      onClick={() => redirect("/inspect")}
      className="group w-[400px] p-10 cursor-pointer relative overflow-hidden overflow-x-hidden rounded-sm border-2 border-[#313a49b8] text-gray-200"
    >
      <span className="relative z-10 flex items-center gap-10">
        <Image width={100} src={labelImage} alt="label" />
        <div>
          <p className="font-bold">Modelo Carro</p>
          <span>Acessar modelo</span>
        </div>
      </span>
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-teal-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
      </span>
    </button>
  );
}
