"use client";
import { useState } from "react";
import { LiaUtensilsSolid } from "react-icons/lia";
import { RiTakeawayFill } from "react-icons/ri";
import MerchantForm from "@/components/merchant/MerchantForm";
import playAudio from "@/helper/audio/playAudio";

export default function MerchantHome(): JSX.Element {
  const [type, setType] = useState<string | null>(null);

  const handleClick = (type: string) => {
    setType(type);
    playAudio("/audio/sound2.mp3");
  };

  return (
    <section className="flex justify-center items-center h-screen overflow-hidden">
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
