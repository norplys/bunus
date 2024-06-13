"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import playAudio from "@/helper/audio/playAudio";

export default function MerchantForm({
  type,
}: {
  type: string | null;
}): JSX.Element {
  const { register, handleSubmit, setFocus } = useForm();
  const { push } = useRouter();
  const handleTable: SubmitHandler<Record<string, any>> = (data) => {
    push(`/merchant/menu?table=${data.table}&type=${type}`);
    playAudio("/audio/sound4.mp3");
  };
  useEffect(() => {
    if (type) {
      setFocus("table");
    }
  }, [type]);

  return (
    <form
      className={`flex flex-col gap-5 ${type ? "" : "hidden"}`}
      onSubmit={handleSubmit(handleTable)}
    >
      <label className="font-bold text-4xl text-center">
        Masukkan nomor antrian
      </label>
      <input
        type="number"
        {...register("table", { required: true })}
        placeholder="No Meja"
        className="border-2 border-gray-400 p-2 rounded-xl focus text-xl"
        autoFocus={true}
      />
      <button
        type="submit"
        className="bg-orange-500 text-white rounded-xl p-2 text-xl font-bold"
      >
        Ok
      </button>
    </form>
  );
}
