"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import LoginInput from "@/components/login/loginInput";
import Link from "next/link";

const inputArray = [
  { label: "Email", type: "email" },
  { label: "Telephone", type: "tel" },
  { label: "Password", type: "password" },
  { label: "Confirm Password", type: "password" },
];

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<Record<string, any>> = (data) =>
    console.log(data);
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
            />
          ))}
          <button className="bg-gradient-to-r from-primary-red via-purple-500 bg-800% bg-50% hover:bg-100% duration-700 to-primary-orange text-white font-bold rounded-md p-2 ">
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
