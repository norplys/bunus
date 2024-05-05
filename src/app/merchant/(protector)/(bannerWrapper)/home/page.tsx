"use client";
import { useRouter } from "next/navigation";
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
  const { push } = useRouter();
  const handleTakeAway = () => {
    push("/merchant/menu?type=TAKE_AWAY");
    playAudio("/audio/sound4.mp3");
  };
  return (
    <section className="flex justify-center items-center h-screen overflow-hidden">
      <div
        className={`absolute bg-white w-full h-screen z-50 top-0 justify-center items-center flex-col ${play ? "hidden" : "flex"}`}
        onClick={() => handleStart("/audio/sound1.mp3")}
      >
        <h1 className="text-6xl font-bold text-center border-b-4 border-primary-orange pb-5">
          Selamat Datang
        </h1>
        <p className="text-center text-2xl mt-2 animate-pulse">
          Tekan untuk memesan
        </p>
      </div>
      <div className={`${type ? "hidden" : ""} flex gap-10`}>
        <button
          className="bg-orange-400 text-white rounded-xl text-3xl font-bold flex items-center justify-center py-2 px-4"
          onClick={() => {
            setType("DINE_IN"), playAudio("/audio/sound2.mp3");
          }}
        >
          <LiaUtensilsSolid className="text-5xl" />
          Makan Ditempat
        </button>
        <button
          className="bg-orange-400 text-white rounded-xl flex items-center justify-center text-3xl font-bold py-2 px-4 gap-2"
          onClick={handleTakeAway}
        >
          <RiTakeawayFill className="text-5xl font-normal" />
          Bawa Pulang
        </button>
      </div>
      <MerchantForm type={type} />
    </section>
  );
}
