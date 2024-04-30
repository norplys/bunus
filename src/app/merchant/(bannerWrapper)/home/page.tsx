"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LiaUtensilsSolid } from "react-icons/lia";
import { RiTakeawayFill } from "react-icons/ri";

export default function MerchantHome(): JSX.Element {
  const [type, setType] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className={`${type ? "hidden" : ""} flex gap-10`}>
        <button
          className="bg-orange-400 text-white rounded-xl text-3xl font-bold flex items-center justify-center py-2 px-4"
          onClick={() => setType("dineIn")}
        >
          <LiaUtensilsSolid className="text-5xl" />
          Makan Ditempat
        </button>
        <button
          className="bg-orange-400 text-white rounded-xl flex items-center justify-center text-3xl font-bold py-2 px-4 gap-2"
          onClick={() => setType("takeAway")}
        >
          <RiTakeawayFill className="text-5xl font-normal" />
          Take Away
        </button>
      </div>
      <form
        className={`flex flex-col gap-5 ${type ? "" : "hidden"}`}
        onSubmit={handleSubmit((data) => {
          push(`/merchant/menu?table=${data.table}&type=${type}`);
        })}
      >
        <label className="font-bold text-3xl text-center">
          Masukkan no meja
        </label>
        <input
          type="number"
          {...register("table", { required: true })}
          placeholder="No Meja"
          className="border-2 border-gray-400 p-2 rounded-xl"
        />
        <button
          type="submit"
          className="bg-orange-400 text-white rounded-xl p-2"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
