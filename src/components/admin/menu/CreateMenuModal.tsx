import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDetailMenu } from "@/helper/hooks/useDetailMenu";
import { useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import AdminInput from "./AdminInput";
import { useCategoriesData } from "@/helper/hooks/useCategoryData";
import { AnimatePresence, motion } from "framer-motion";

const inputArray = [
  {
    label: "Nama",
    name: "name",
    type: "text",
    placeholder: "Nama Menu",
  },
  {
    label: "Gambar",
    name: "image",
    type: "file",
    placeholder: "Image",
  },
  {
    label: "Harga",
    name: "price",
    type: "text",
    placeholder: "Harga Menu",
  },
  {
    label: "Deskripsi",
    name: "description",
    type: "text",
    placeholder: "Deskripsi Menu",
  },
];

export default function CreateMenuModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  useEffect(() => {}, [isOpen]);
  const handleAddToCart = async (data: any) => {
    console.log(data);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          static
          onClose={() => setIsOpen(false)}
          as={motion.div}
          className="fixed inset-1 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog.Panel className="bg-white p-5 rounded-xl grid justify-items-center gap-5 z-30 min-w-[315px] px-1 md:px-5">
            <>
              <Dialog.Title>
                <div className="text-xl font-bold text-green-600">
                  Tambah Menu
                </div>
              </Dialog.Title>
              <div className="flex gap-5 flex-col md:flex-row">
                <div className="overflow-hidden rounded-2xl shadow-xl h-72 w-72 bg-gray-300"></div>
                <form className="overflow-y-auto overflow-x-hidden text-justify text-sm min-w-72 md:h-full rounded-2xl p-2  shadow-xl flex flex-col gap-3 border">
                  {inputArray.map((input, i) => (
                    <AdminInput
                      key={i}
                      register={register}
                      errors={errors}
                      label={input.label}
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  ))}
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Category</label>
                    <select
                      className="border border-primary-orange rounded-md p-1"
                      {...register("category", { required: true })}
                    >
                      {categories?.map((category: any, i: number) => (
                        <option key={i} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <button
                className="py-1 md:px-3 font-bold rounded-xl mb-4 text-white md:text-lg shadow-lg bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange bg-800% bg-50% hover:bg-100% duration-700 text-base px-2"
                onClick={handleAddToCart}
              >
                Tambah Menu
              </button>
            </>
          </Dialog.Panel>
          <div
            className="fixed inset-0 bg-black/70 z-auto"
            aria-hidden="true"
          />
        </Dialog>
      )}
    </AnimatePresence>
  );
}
