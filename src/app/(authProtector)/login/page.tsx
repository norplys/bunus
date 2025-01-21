"use client";
import { IoLogoGoogle } from "react-icons/io5";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import SideLogo from "@/components/side-logo";
import LoginForm from "@/components/login/login-form";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/env";

export default function Login() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const googleLogin = () => {
    toast.loading("Mohon Tunggu...", {
      position: "bottom-left",
      duration: 1500,
    });
    push(`${NEXT_PUBLIC_BACKEND_URL}/auth/google`);
  };

  return (
    <section className="flex h-screen items-center justify-center md:flex-col xl:flex-row overflow-hidden">
      <div className="flex-1  bg-white flex justify-center items-center flex-col gap-5 xl:min-h-screen md:p-5 p-2">
        <h1 className="xl:text-5xl text-4xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Selamat Datang !
        </h1>
        <LoginForm redirect={redirect} />
        <button
          onClick={googleLogin}
          className="bg-gradient-to-l from-primary-orange via-purple-500 to-primary-red text-white flex items-center justify-center gap-2 font-bold rounded-md p-2 duration-700 max-w-96 w-full shadow-2xl bg-800% bg-50% hover:bg-100%"
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
