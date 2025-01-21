"use client";
import SideLogo from "@/components/side-logo";
import LoginInput from "@/components/login/login-input";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleForgot: SubmitHandler<Record<string, string>> = async (data) => {
    try {
      const { Email } = data;
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/forgot-password`,
        {
          email: Email,
        },
      );
      await toast.promise(
        res,
        {
          loading: "Loading...",
          success: "Email berhasil dikirim, silahkan cek email anda",
          error: "Email gagal dikirim",
        },
        {
          position: "bottom-left",
        },
      );
      push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          toast.error("Email tidak ditemukan", {
            position: "bottom-left",
          });
        }
      }
      console.log(error);
    }
  };

  return (
    <section className="flex h-screen overflow-hidden items-center justify-center md:flex-col xl:flex-row">
      <div className="flex-1 xl:min-h-screen flex justify-center items-center flex-col gap-5 p-2">
        <h1 className="xl:text-5xl text-4xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Lupa Password ?
        </h1>
        <form
          action=""
          className="flex flex-col gap-5 max-w-96"
          onSubmit={handleSubmit(handleForgot)}
        >
          <p>Masukkan Email Anda untuk mendapatkan link reset password</p>
          <LoginInput
            label="Email"
            type="email"
            register={register}
            placeholder="contoh@gmail.com"
            error={errors}
          />
          <button className="bg-gradient-to-l from-primary-orange via-purple-500 to-primary-red text-white font-bold rounded-md p-2 duration-700 xl:w-96 shadow-2xl bg-800% bg-50% hover:bg-100%">
            Kirim
          </button>
        </form>
      </div>
      <SideLogo />
    </section>
  );
}
