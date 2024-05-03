import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MerchantForm({
  type,
}: {
  type: string | null;
}): JSX.Element {
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  return (
    <form
      className={`flex flex-col gap-5 ${type ? "" : "hidden"}`}
      onSubmit={handleSubmit((data) => {
        push(`/merchant/menu?table=${data.table}&type=${type}`);
      })}
    >
      <label className="font-bold text-3xl text-center">Masukkan no meja</label>
      <input
        type="number"
        {...register("table", { required: true })}
        placeholder="No Meja"
        className="border-2 border-gray-400 p-2 rounded-xl"
      />
      <button type="submit" className="bg-orange-400 text-white rounded-xl p-2">
        Submit
      </button>
    </form>
  );
}
