"use client";
import LeftSlide from "@/lib/animation-framer/left-slide";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit: SubmitHandler<Record<string, any>> = async (
    data: Record<string, string>,
  ) => {
    try {
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/send-email`,
        data,
      );
      await toast.promise(
        res,
        {
          loading: "Mengirim Pesan",
          success: "Pesan Terkirim",
          error: "Gagal Mengirim Pesan",
        },
        {
          position: "bottom-left",
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <LeftSlide design="flex flex-col gap-5 md:min-w-96" delay={0}>
        <input
          {...register("name", { required: "Nama Wajib Diisi" })}
          type="text"
          placeholder="Nama"
          className={`border-2 rounded-xl px-3 py-1 w-full ${errors.name ? "border-red-500" : "border-primary-orange"} focus:outline-none`}
        />

        <input
          {...register("email", {
            required: "Email Wajib Diisi",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email Tidak Valid",
            },
          })}
          type="text"
          placeholder="Email"
          className={`border-2 rounded-xl px-3 py-1 w-full ${errors.email ? "border-red-500" : "border-primary-orange"} focus:outline-none`}
        />

        <textarea
          {...register("message", { required: "Pesan Wajib Diisi" })}
          placeholder="Pesan"
          className={`border-2 rounded-xl px-3 py-1 w-full h-40 ${errors.message ? "border-red-500" : "border-primary-orange"} focus:outline-none`}
        ></textarea>
        <button
          className="py-1 px-3 font-bold rounded-xl mb-4 w-fit bg-primary-cyan shadow-xl text-white xl:text-lg scale-95 hover:shadow-2xl hover:scale-100 duration-300 md:text-sm"
          disabled={isSubmitting}
        >
          Kirim Pesan
        </button>
      </LeftSlide>
    </form>
  );
}
