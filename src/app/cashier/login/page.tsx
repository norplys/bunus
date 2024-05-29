"use client";
import Link from "next/link";
import SideCashier from "@/components/cashier/SideCashier";
import LoginCashier from "@/components/cashier/login/LoginCashier";
import { useEffect, useState } from "react";
import Protector from "@/components/Protector";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CashierLogin() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const validateJWT = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/validate/cashier`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      push("/cashier/dashboard");
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    validateJWT();
  }, []);
  if (loading) {
    return <Protector />;
  }
  return (
    <section className="flex h-screen items-center justify-center md:flex-col xl:flex-row overflow-hidden">
      <div className="flex-1  bg-white flex justify-center items-center flex-col gap-5 xl:min-h-screen md:p-5 p-2">
        <h1 className="xl:text-5xl text-4xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Selamat Datang !
        </h1>
        <LoginCashier />
        <p>
          Bukan Kasir ?{" "}
          <Link
            href={"/login"}
            className="font-bold  hover:text-blue-500 duration-300"
          >
            Klik Disini
          </Link>
        </p>
      </div>
      <SideCashier />
    </section>
  );
}
