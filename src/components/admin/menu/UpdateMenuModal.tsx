import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useDetailMenu } from "@/lib/hooks/query/use-detail-menu";
import { useQueryClient } from "react-query";
import axios from "axios";
import imageValidator from "@/lib/imageValidator";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import AdminInput from "./CashierInput";
import { useCategories } from "@/lib/hooks/query/use-categories";
import LoadingImage from "@/components/LoadingImage";

const inputArray = [
  {
    label: "Nama",
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    label: "Harga",
    name: "price",
    type: "text",
    placeholder: "Price",
  },
  {
    label: "Deskripsi",
    name: "description",
    type: "text",
    placeholder: "Description",
  },
];
export default function UpdateMenuModal({
  isOpen,
  setIsOpen,
  id,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id: any;
}) {
  const { data, isLoading } = useDetailMenu(id.current);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    values: {
      name: data?.name,
      price: data?.price,
      description: data?.description,
      category: data?.category?.id,
      image: null,
      id: data?.id,
    },
  });
  const [image, setImage] = useState<any>(null);
  const imageFile = watch<any>("image");
  useEffect(() => {
    imageValidator(imageFile, setImage, image, reset);
  }, [imageFile]);
  const queryClient = useQueryClient();
  const handleUpdateMenu = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoryId", data.category);
    if (imageFile) {
      formData.append("image", imageFile[0]);
    }
    try {
      const res = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/menus/${data.id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );
      await toast.promise(res, {
        loading: "Memperbaharui menu...",
        success: "Menu berhasil dibaharui",
        error: "Gagal memperbaharui menu",
      });
      queryClient.invalidateQueries("categoryMenus");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMenu = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = axios.delete(`https://bunus.joywinata.my.id/v1/menus/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await toast.promise(res, {
        loading: "Loading...",
        success: "Menu Berhasil Dihapus",
        error: "Gagal menghapus menu",
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
            {isLoading ? (
              <LoadingImage />
            ) : (
              <>
                <Dialog.Title>
                  <div className="text-xl font-bold">Edit Menu</div>
                </Dialog.Title>
                <div className="flex gap-5 flex-col md:flex-row">
                  <div className="overflow-hidden rounded-2xl shadow-xl h-72">
                    <Image
                      src={image ? image : data?.image}
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
                      <label className="font-bold">Gambar</label>
                      <input
                        type="file"
                        placeholder="gambar"
                        className="border border-primary-orange rounded-md p-1"
                        {...register("image")}
                      />
                      {errors.name && (
                        <span className="text-red-500">
                          {errors.image?.message}
                        </span>
                      )}
                    </div>
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
                <div className="flex gap-2">
                  <button
                    className="py-1 md:px-3 font-bold rounded-xl mb-4 text-white md:text-lg shadow-lg bg-gradient-to-r from-primary-red via-purple-500 to-primary-orange bg-800% bg-50% hover:bg-100% duration-700 text-base px-2"
                    onClick={() => deleteMenu(data.id)}
                  >
                    Hapus Menu
                  </button>
                  <button
                    className="py-1 md:px-3 font-bold rounded-xl mb-4 text-white md:text-lg shadow-lg bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange bg-800% bg-50% hover:bg-100% duration-700 text-base px-2"
                    onClick={handleSubmit(handleUpdateMenu)}
                  >
                    Update Menu
                  </button>
                </div>
              </>
            )}
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
