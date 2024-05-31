"use client";
import { useState } from "react";
import { LiaUtensilsSolid } from "react-icons/lia";
import { RiTakeawayFill } from "react-icons/ri";
import MerchantForm from "@/components/merchant/MerchantForm";
import playAudio from "@/helper/audio/playAudio";

export default function MerchantHome(): JSX.Element {
  const [play, setPlay] = useState(false);

  const handleStart = (url: string) => {
    setPlay(true);
    playAudio(url);
  };
  const [type, setType] = useState<string | null>(null);

  const handleClick = (type: string) => {
    setType(type);
    playAudio("/audio/sound2.mp3");
  };

  return (
    <section className="flex justify-center items-center h-screen overflow-hidden">
      <div
        className={`absolute bg-[url(/pattern.svg)] animate-gradient bg-800% w-full h-screen z-50 top-0 justify-center items-center flex-col text-white ${play ? "hidden" : "flex"}`}
        onClick={() => handleStart("/audio/sound1.mp3")}
      >
        <h1 className="text-6xl font-bold text-center border-b-4 border-white pb-5">
          Selamat Datang
        </h1>
        <p className="text-center text-3xl mt-2">Sentuh untuk pesan</p>
      </div>
      <div className={`${type ? "hidden" : ""} grid gap-10`}>
        <button
          className="bg-orange-500 text-white rounded-xl text-5xl font-bold flex items-center justify-center py-2 px-4"
          onClick={() => handleClick("DINE_IN")}
        >
          <LiaUtensilsSolid className="text-6xl" />
          Makan Ditempat
        </button>
        <button
          className="bg-orange-500 text-white rounded-xl flex items-center justify-center text-5xl font-bold py-3 px-4 gap-2"
          onClick={() => handleClick("TAKE_AWAY")}
        >
          <RiTakeawayFill className="text-5xl font-normal" />
          Bawa Pulang
        </button>
      </div>
      <MerchantForm type={type} />
    </section>
  );
}
