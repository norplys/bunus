"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export default function Validate() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
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
