"use client";
import Image from "next/image";
import { IoLogoGoogle } from "react-icons/io5";
import LoginInput from "@/components/login/loginInput";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUser } from "@/helper/context/userContext";

const inputArray = [
  { label: "Email", type: "email" },
  { label: "Password", type: "password" },
];

export default function Login() {
  const { setUser } = useUser();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const googleLogin = () => {
    toast.loading("Mohon Tunggu...", {
      position: "bottom-left",
      duration: 1500,
    });
    push("https://bunus-be-production.up.railway.app/auth/google");
  };
  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    try {
      const postData = {
        email: data.Email,
        password: data.Password,
      };
      const res = axios.post(
        "https://bunus-be-production.up.railway.app/v1/login",
        postData,
      );
      const res2 = await toast.promise(
        res,
        {
          loading: "Mohon Tunggu...",
          success: "Berhasil Masuk !",
          error: "Gagal Masuk !",
        },
        {
          position: "bottom-left",
        },
      );
      setUser(res2.data.data);
      localStorage.setItem("token", res2.data.data.token);
      push("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          toast.error("Email Atau Password Salah !", {
            position: "bottom-left",
          });
          return;
        }
        if (err.response?.status === 404) {
          toast.error(
            "Email tidak ditemukan, Silahkan daftar terlebih dahulu !",
            {
              position: "bottom-left",
            },
          );
          return;
        }
        if (err.response?.status === 401) {
          toast.error("Email belum terverifikasi silahkan periksa email anda", {
            position: "bottom-left",
          });
          return;
        }
      }
      toast.error("Terjadi Kesalahan, mohon coba kembali !", {
        position: "bottom-left",
      });
    }
  };
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex-1 min-h-screen bg-gradient-to-r from-transparent from-75% to-orange-400 flex justify-center items-center flex-col gap-5">
        <h1 className="text-5xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Selamat Datang !
        </h1>
        <form className="grid gap-5 w-96" onSubmit={handleSubmit(onSubmit)}>
          {inputArray.map((input, index) => (
            <LoginInput
              key={index}
              label={input.label}
              type={input.type}
              register={register}
              error={errors}
            />
          ))}
          <button
            className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white font-bold rounded-md p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl"
            type="submit"
          >
            Masuk
          </button>
        </form>
        <button
          onClick={googleLogin}
          className="bg-gradient-to-l from-primary-orange via-purple-500 to-primary-red text-white flex items-center justify-center gap-2 font-bold rounded-md p-2 duration-700 w-96 shadow-2xl bg-800% bg-50% hover:bg-100%"
        >
          <IoLogoGoogle className="inline border rounded-full text-2xl p-1" />
          Masuk dengan Google
        </button>
        <p>
          Belum Punya Akun ?{" "}
          <Link
            href={"/register"}
            className="font-bold  hover:text-blue-500 duration-300"
          >
            Daftar Disini !
          </Link>
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 flex-1 bg-orange-400 min-h-screen">
        <Image
          src="./logo.svg"
          alt="logo"
          width={350}
          height={350}
          className="object-cover duration-300 rounded-full animate-spin-slow shadow-xl"
        />
        <h1 className="text-5xl font-extrabold text-white">BUBUR NUSANTARA</h1>
      </div>
    </section>
  );
}
