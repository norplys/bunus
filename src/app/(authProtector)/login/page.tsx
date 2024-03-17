"use client";
import { IoLogoGoogle } from "react-icons/io5";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import SideLogo from "@/components/SideLogo";
import LoginForm from "@/components/login/LoginForm";

export default function Login() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const googleLogin = () => {
    toast.loading("Mohon Tunggu...", {
      position: "bottom-left",
      duration: 1500,
    });
    push("https://bunus-be-production.up.railway.app/auth/google");
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex-1 min-h-screen bg-white flex justify-center items-center flex-col gap-5">
        <h1 className="text-5xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Selamat Datang !
        </h1>
        <LoginForm redirect={redirect} />
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
        <p>
          Lupa Password ?{" "}
          <Link
            href={"/forgot-password"}
            className="font-bold  hover:text-blue-500 duration-300"
          >
            Klik Disini
          </Link>
        </p>
      </div>
      <SideLogo />
    </section>
  );
}
