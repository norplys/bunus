"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/");
    }, 5000);
  }, []);
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
        Terima Kasih, Pembayaran Anda Telah Kami Terima !
      </p>
      <p className="text-2xl text-white ">
        Anda Akan Dialihkan ke Halaman Utama dalam 5 detik
      </p>
      <button className="bg-primary-cyan rounded-lg p-2 text-white font-bold shadow-xl">
        Atau Klik Disini
      </button>
    </div>
  );
}
