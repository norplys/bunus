"use client";
import Link from "next/link";
import SideLogo from "@/components/SideLogo";
import RegisterForm from "@/components/register/RegisterForm";

export default function Register() {
  return (
    <section className="flex min-h-screen items-center justify-center md:flex-col xl:flex-row">
      <div className="flex-1 xl:min-h-screen bg-white flex justify-center items-center flex-col gap-5 p-2 xl:p-5">
        <RegisterForm />
        <p>
          Sudah Punya Akun ?{" "}
          <Link
            href={"/login"}
            className="font-bold hover:text-blue-600 duration-300"
          >
            Masuk Disini !
          </Link>
        </p>
      </div>
      <SideLogo />
    </section>
  );
}
