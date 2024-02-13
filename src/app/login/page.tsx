'use client';
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
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
            <form className="grid justify-center gap-5" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-5xl font-extrabold border-b-2 border-b-primary-orange pb-2">Selamat Datang !</h1>
                {inputArray.map((input, index) => (
                    <LoginInput key={index} label={input.label} type={input.type} register={register} error={errors} />
                ))}
                <button className="bg-primary-cyan text-white font-bold rounded-md p-2" type="submit">Login</button>
            </form>
                <button onClick={googleLogin} className="bg-primary-green text-black flex items-center justify-center gap-2 font-bold rounded-md p-2 border  border-orange-600 "><FcGoogle className="inline" />Login dengan Google</button>
                <p>Belum Punya Akun ? <Link href={"/register"} className="font-bold  hover:text-blue-500 duration-300">Daftar Disini !</Link></p>
            </div>
            <div className="flex items-center justify-center gap-2 flex-1 bg-orange-400 min-h-screen">
                <Image src="./logo.svg" alt="logo" width={350} height={350} className="object-cover duration-300 rounded-full animate-spin-slow" />
                <h1 className="text-5xl font-extrabold text-white">BUBUR NUSANTARA</h1>
                
            </div>
      </section>
    );
}