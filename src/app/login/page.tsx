'use client';
import Image from "next/image";
import { IoLogoGoogle } from "react-icons/io5";
import LoginInput from "@/components/login/loginInput";
import {useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

const inputArray = [
    {label: "Email", type: "email"},
    {label: "Password", type: "password"}
]
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const googleLogin = () => {
        console.log("Google Login");
    }
    const onSubmit: SubmitHandler<Record<string, any>> = data => console.log(data);
    return (
      <section className="flex min-h-screen items-center justify-center">
            <div className="flex-1 min-h-screen bg-gradient-to-r from-transparent from-75% to-orange-400 flex justify-center items-center flex-col gap-5">
            <h1 className="text-5xl font-extrabold border-b-2 border-b-primary-orange pb-2">Selamat Datang !</h1>
            <form className="grid gap-5 w-96" onSubmit={handleSubmit(onSubmit)}>
                {inputArray.map((input, index) => (
                    <LoginInput key={index} label={input.label} type={input.type} register={register} error={errors} />
                ))}
                <button className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white font-bold rounded-md p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl" type="submit">Masuk</button>
            </form>
                <button onClick={googleLogin} className="bg-gradient-to-l from-primary-orange via-purple-500 to-primary-red text-white flex items-center justify-center gap-2 font-bold rounded-md p-2 duration-700 w-96 shadow-2xl bg-800% bg-50% hover:bg-100%"><IoLogoGoogle className="inline border rounded-full text-2xl p-1" />Masuk dengan Google</button>
                <p>Belum Punya Akun ? <Link href={"/register"} className="font-bold  hover:text-blue-500 duration-300">Daftar Disini !</Link></p>
            </div>
            <div className="flex items-center justify-center gap-2 flex-1 bg-orange-400 min-h-screen">
                <Image src="./logo.svg" alt="logo" width={350} height={350} className="object-cover duration-300 rounded-full animate-spin-slow" />
                <h1 className="text-5xl font-extrabold text-white">BUBUR NUSANTARA</h1>
                
            </div>
      </section>
    );
}