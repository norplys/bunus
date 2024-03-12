"use client";
import SideLogo from "@/components/SideLogo";
import ResetForm from "@/components/reset-password/ResetForm";
export default function ResetPassword() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex-1 min-h-screen bg-gradient-to-r from-transparent from-75% to-orange-400 flex justify-center items-center flex-col gap-5">
        <h1 className="text-5xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Ubah Password
        </h1>
        <ResetForm />
      </div>
      <SideLogo />
    </section>
  );
}
