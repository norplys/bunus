"use client";
import LeftSlide from "@/helper/animation-framer/LeftSlide";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit: SubmitHandler<Record<string, any>> = async (
    data: Record<string, string>,
  ) => {
    console.log(data);
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <LeftSlide design="flex flex-col gap-5 md:min-w-96" delay={0}>
        <input
          {...register("name", { required: "Mohon Isi Kolom Ini" })}
          type="text"
          placeholder="Nama"
          className="border-2 border-primary-orange rounded-xl px-3 py-1 w-full"
        />

        <input
          {...register("email", { required: "Mohon Isi Kolom Ini" })}
          type="text"
          placeholder="Email"
          className="border-2 border-primary-orange rounded-xl px-3 py-1 w-full"
        />

        <textarea
          {...register("message", { required: "Mohon Isi Kolom Ini" })}
          placeholder="Pesan"
          className="border-2 border-primary-orange rounded-xl px-3 py-1 w-full h-40"
        ></textarea>

        <button className="py-1 px-3 font-bold rounded-xl mb-4 w-fit bg-primary-cyan shadow-xl text-white xl:text-lg scale-95 hover:shadow-2xl hover:scale-100 duration-300 md:text-sm">
          Kirim Pesan
        </button>
      </LeftSlide>
    </form>
  );
}
