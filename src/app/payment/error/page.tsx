"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentError() {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/");
    }, 5000);
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10 bg-[url('/pattern.svg')]">
      <Image
        src="/setting.svg"
        alt="icon"
        width={500}
        height={500}
        className="border-8 border-white bg-orange-100 rounded-full shadow-2xl hover:scale-95 hover:shadow-none duration-300 md:w-96 w-60"
      />
      <p className="text-white font-extrabold xl:text-5xl md:text-4xl text-center text-xl px-2">
        Mohon Maaf, Pembayaran Anda Gagal !
      </p>
      <p className="xl:text-2xl text-white md:text-xl text-center text-base">
        Anda Akan Dialihkan ke Halaman Utama dalam 5 detik
      </p>
      <button className="bg-primary-cyan rounded-lg p-2 text-white font-bold shadow-xl">
        Atau Klik Disini
      </button>
    </div>
  );
}
