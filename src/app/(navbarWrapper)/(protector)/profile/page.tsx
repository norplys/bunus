"use client";

import { CgProfile } from "react-icons/cg";
import LoginInput from "@/components/login/loginInput";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useUser } from "@/helper/context/userContext";

const inputArray = [
  { label: "Nama", type: "text", placeholder: "Nama" },
  { label: "Telepon", type: "text", placeholder: "Telepon" },
  { label: "Email", type: "email", placeholder: "email@gmail.com" },
  { label: "Password", type: "password", placeholder: "Password" },
];

export default function Profile() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      Nama: user?.name || "",
      Telepon: user?.phone || "",
      Email: user?.email || "",
      Password: "",
    },
  });
  return (
    <section className="min-h-screen grid justify-items-center grid-rows-4">
      <div className="bg-gradient-to-r from-primary-red via-purple-500 to-primary-orange bg-800% bg-50% w-screen animate-gradient"></div>
      <div className="row-span-3 w-[50%] relative -top-20 bg-white rounded-xl shadow-2xl flex justify-center gap-40 items-center p-20">
        <div className="text-9xl">
          <CgProfile />
        </div>
        <form
          action=""
          className="grid gap-5 border-l-2 pl-10 border-primary-orange border-dashed"
        >
          {inputArray.map((input, index) => (
            <LoginInput
              key={index}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              register={register}
              error={errors}
            />
          ))}
          <button
            className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white font-bold rounded-md p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl"
            type="submit"
            disabled={isSubmitting}
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
}
