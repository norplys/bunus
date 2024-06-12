"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/merchant/home");
    }, 5000);
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10 bg-[url('/pattern.svg')]">
      <Image
        src="/thumbs-up.svg"
        alt="icon"
        width={500}
        height={500}
        className="border-8 border-white bg-orange-100 rounded-full shadow-2xl hover:scale-95 hover:shadow-none duration-300 md:w-96 w-60"
      />
      <p className="text-3xl text-white font-extrabold xl:text-5xl md:text-4xl text-center px-2">
        Pesanan Anda Telah Kami Terima !
      </p>
      <p className=" text-white md:text-4xl text-center font-bold text-2xl">
        Silahkan lakukan pembayaran di kasir
      </p>
    </div>
  );
}
