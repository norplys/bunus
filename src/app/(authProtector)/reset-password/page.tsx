"use client";
import SideLogo from "@/components/SideLogo";
import ResetForm from "@/components/reset-password/ResetForm";
export default function ResetPassword() {
  return (
    <section className="flex h-screen items-center justify-center md:flex-col xl:flex-row overflow-hidden">
      <div className="flex-1 xl:min-h-screen bg-white flex justify-center items-center flex-col gap-5 p-2 xl:p-5">
        <h1 className="xl:text-5xl text-4xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Ubah Password
        </h1>
        <ResetForm />
      </div>
      <SideLogo />
    </section>
  );
}
