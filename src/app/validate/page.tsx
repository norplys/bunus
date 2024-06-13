"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Protector from "@/components/Protector";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Validate() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const token = searchParams.get("token");
  useEffect(() => {
    if (!token) {
      push("/login");
      return;
    }
    verify(token!);
  }, [token]);

  const verify = async (token: string) => {
    try {
      const res = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/validate-email/${token}`,
      );
      await toast.promise(res, {
        loading: "Loading...",
        success: "Email berhasil diverifikasi, Mengalihkan...",
        error: "Email gagal diverifikasi, silahkan coba lagi",
      });
      setLoading(false);
      setTimeout(() => {
        push("/login");
      }, 5000);
    } catch (error) {
      push("/login");
      console.log(error);
    }
  };
  if (loading) {
    return <Protector />;
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10 bg-[url('/pattern.svg')]">
      <Image
        src="/thumbs-up.svg"
        alt="icon"
        width={500}
        height={500}
        className="border-8 border-white bg-orange-100 rounded-full shadow-2xl hover:scale-95 hover:shadow-none duration-300"
      />
      <p className="text-white font-extrabold text-5xl">
        Verifikasi Email Anda Berhasil !
      </p>
      <p className="text-2xl text-white ">
        Silahkan Login Dengan Menggunakan Email Anda !
      </p>
    </div>
  );
}
