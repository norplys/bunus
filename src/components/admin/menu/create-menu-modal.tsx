import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import imageValidator from "@/lib/image-validator";
import { useForm } from "react-hook-form";
import AdminInput from "./cashier-input";
import { useCategories } from "@/lib/hooks/query/use-categories";
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
    type: "number",
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
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const categoriesData = categories?.data;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const [image, setImage] = useState(null);

  const imageFile = watch("image");

  useEffect(() => {
    imageValidator(imageFile, setImage, image, reset);
  }, [imageFile]);

  useEffect(() => {}, [isOpen]);
  const handleAddToCart = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoryId", data.category);
    formData.append("image", imageFile[0]);
    try {
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/menus`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );
      await toast.promise(res, {
        loading: "Menambahkan menu...",
        success: "Menu berhasil ditambahkan",
        error: "Gagal menambahkan menu",
      });
      queryClient.invalidateQueries("categoryMenus");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
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
                <div className="text-xl font-bold">Tambah Menu</div>
              </Dialog.Title>
              <div className="flex gap-5 flex-col md:flex-row">
                <div className="overflow-hidden rounded-2xl shadow-xl h-72 w-72">
                  <Image
                    src={
                      image
                        ? image
                        : "https://res.cloudinary.com/dpg0tbbot/image/upload/v1704978359/bunus/ntqqtbkh2zme9tpo3zcn.svg"
                    }
                    alt="menu1"
                    width={300}
                    height={300}
                    className="object-cover hover:scale-110 duration-300 h-72"
                  />
                </div>
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
                      {categoriesData?.map((category: any, i: number) => (
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
                onClick={handleSubmit(handleAddToCart)}
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
