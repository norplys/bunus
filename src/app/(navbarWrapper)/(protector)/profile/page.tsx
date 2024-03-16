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
    <section className="min-h-screen grid justify-items-center grid-rows-4">
      <div className="bg-gradient-to-r from-primary-red via-purple-500 to-primary-orange bg-800% bg-50% w-screen animate-gradient"></div>
      <div className="row-span-3 w-[50%] relative -top-20 bg-white rounded-xl shadow-2xl grid grid-cols-3 justify-items-center gap-40 items-center p-20 max-h-[710px]">
        <button
          className="absolute top-8 right-8 text-4xl"
          onClick={() => setIsProfile(!isProfile)}
        >
          {isProfile ? <RiBillFill /> : <LuUtensilsCrossed />}
        </button>

        <div className="text-9xl">
          <CgProfile />
        </div>
        {isProfile ? <ProfileForm /> : <PaymentHistory />}
      </div>
    </section>
  );
}
