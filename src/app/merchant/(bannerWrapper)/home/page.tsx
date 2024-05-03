"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LiaUtensilsSolid } from "react-icons/lia";
import { RiTakeawayFill } from "react-icons/ri";
import MerchantForm from "@/components/merchant/MerchantForm";

export default function MerchantHome(): JSX.Element {
  const [type, setType] = useState<string | null>(null);
  const { push } = useRouter();
  const handleTakeAway = () => {
    push("/merchant/menu?type=TAKE_AWAY");
  };
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className={`${type ? "hidden" : ""} flex gap-10`}>
        <button
          className="bg-orange-400 text-white rounded-xl text-3xl font-bold flex items-center justify-center py-2 px-4"
          onClick={() => setType("DINE_IN")}
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
