"use client";
import Link from "next/link";
import SideMerchant from "@/components/merchant/SideMerchant";
import LoginMerchant from "@/components/merchant/LoginMerchant";

export default function MerchantLogin() {
  return (
    <section className="flex h-screen items-center justify-center md:flex-col xl:flex-row overflow-hidden">
      <div className="xl:flex-1  bg-white flex justify-center items-center flex-col gap-5 xl:min-h-screen xl:p-2 shadow-2xl border xl:border p-10 rounded-xl">
        <h1 className="xl:text-5xl text-4xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Selamat Datang !
        </h1>
        <LoginMerchant />
        <p>
          Bukan Merchant ?{" "}
          <Link
            href={"/login"}
            className="font-bold  hover:text-blue-500 duration-300"
          >
            Klik Disini
          </Link>
        </p>
      </div>
      <SideMerchant />
    </section>
  );
}
