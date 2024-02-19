"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import LoginInput from "@/components/login/loginInput";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const inputArray = [
  { label: "Email", type: "email", placeholder: "contoh@gmail.com" },
  { label: "Telephone", type: "tel", placeholder: "081234567890" },
  { label: "Password", type: "password", placeholder: "Password" },
  {
    label: "Ulangi Password",
    type: "password",
    placeholder: "Ulangi Password",
  },
];

export default function Register() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    try {
      const postData = {
        email: data.Email,
        password: data.Password,
        phone: data.Telephone,
      };
      const res = axios.post(
        "https://bunus-be-production.up.railway.app/v1/register",
        postData,
      );
      await toast.promise(
        res,
        {
          loading: "Mohon Tunggu...",
          success: "Berhasil Mendaftar !, Silahkan Verifikasi Email Anda !",
          error: "Gagal Mendaftar !, Mohon Coba Lagi !",
        },
        {
          position: "bottom-left",
        },
      );
      push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          toast.error("Email Sudah Terdaftar !", {
            position: "bottom-left",
          });
          return;
        }
      }
    }
  };
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex-1 min-h-screen bg-gradient-to-r from-transparent from-75% to-orange-400 flex justify-center items-center">
        <form
          className="grid justify-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-5xl font-extrabold border-b-2 border-b-primary-orange pb-2">
            Selamat Datang !
          </h1>
          {inputArray.map((input, index) => (
            <LoginInput
              key={index}
              label={input.label}
              type={input.type}
              register={register}
              error={errors}
              getValues={getValues}
              placeholder={input.placeholder}
            />
          ))}
          <button
            className="bg-gradient-to-r from-primary-red via-purple-500 bg-800% bg-50% hover:bg-100% duration-700 to-primary-orange text-white font-bold rounded-md p-2 "
            disabled={isSubmitting}
          >
            Register
          </button>
          <p>
            Sudah Punya Akun ?{" "}
            <Link
              href={"/login"}
              className="font-bold hover:text-blue-600 duration-300"
            >
              Masuk Disini !
            </Link>
          </p>
        </form>
      </div>
      <div className="flex items-center justify-center gap-2 flex-1 bg-orange-400 min-h-screen">
        <Image
          src="./logo.svg"
          alt="logo"
          width={350}
          height={350}
          className="object-cover duration-300 rounded-full animate-spin-slow"
        />
        <h1 className="text-5xl font-extrabold text-white">BUBUR NUSANTARA</h1>
      </div>
    </section>
  );
}
