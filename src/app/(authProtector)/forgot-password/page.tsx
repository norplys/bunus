"use client";
import SideLogo from "@/components/SideLogo";
import LoginInput from "@/components/login/loginInput";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex-1 min-h-screen bg-gradient-to-r from-transparent from-75% to-orange-400 flex justify-center items-center flex-col gap-5">
        <h1 className="text-5xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Lupa Password ?
        </h1>
        <form action="" className="flex flex-col gap-5 max-w-96">
          <p>Masukkan Email Anda untuk mendapatkan link reset password</p>
          <LoginInput
            label="Email"
            type="email"
            register={register}
            placeholder="contoh@gmail.com"
            error={errors}
          />
          <button className="bg-gradient-to-l from-primary-orange via-purple-500 to-primary-red text-white font-bold rounded-md p-2 duration-700 w-96 shadow-2xl bg-800% bg-50% hover:bg-100%">
            Kirim
          </button>
        </form>
      </div>
      <SideLogo />
    </section>
  );
}
