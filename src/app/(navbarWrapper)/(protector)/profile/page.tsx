"use client";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "@/components/profile/ProfileForm";
import { useState } from "react";
import { RiBillFill } from "react-icons/ri";
import { LuUtensilsCrossed } from "react-icons/lu";
import PaymentHistory from "@/components/profile/PaymentHistory";

export default function Profile() {
  const [isProfile, setIsProfile] = useState(true);
  return (
    <section className="min-h-screen grid justify-items-center">
      <div className="bg-gradient-to-r from-primary-red via-purple-500 to-primary-orange bg-800% bg-50% w-screen animate-gradient"></div>
      <div className="xl:w-[50%] relative -top-20 bg-white rounded-xl shadow-2xl grid md:grid-cols-3 justify-items-center md:gap-40 items-center md:p-20 max-h-[710px] w-[90%]">
        <button
          className="absolute top-8 right-8 text-4xl"
          onClick={() => setIsProfile(!isProfile)}
        >
          {isProfile ? <RiBillFill /> : <LuUtensilsCrossed />}
        </button>

        <div className="text-7xl md:text-9xl col-span-2 pt-8 md:pt-0 md:col-auto">
          <CgProfile />
        </div>
        {isProfile ? <ProfileForm /> : <PaymentHistory />}
      </div>
    </section>
  );
}
