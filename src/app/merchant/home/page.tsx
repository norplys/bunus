"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function MerchantHome() {
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  return (
    <section className="flex justify-center items-center min-h-screen flex-col gap-5">
      <h1 className="font-bold text-3xl text-center">Masukkan no meja</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit((data) => {
          push(`/merchant/menu?table=${data.table}`);
        })}
      >
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
