"use client";

import Image from "next/image";
import Imagee from "@/../public/ChatGPT_Image_13_de_mai._de_2025__15_35_35-removebg-preview.png";
import { redirect } from "next/navigation";

export default function Card() {
  return (
    <button
      onClick={() => redirect("/inspect")}
      className="w-1/3 flex flex-col border my-20 cursor-pointer transition-colors ease-in-out duration-300 border-black items-center justify-center rounded-2xl hover:bg-teal-600 hover:border-teal-600"
    >
      <Image src={Imagee} className="w-1/3" alt="" />
      <h1>Projeto</h1>
      <span>Modelo de alguma coisa</span>
    </button>
  );
}
