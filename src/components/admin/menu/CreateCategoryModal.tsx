import { Dialog } from "@headlessui/react";
import { useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

export default function CreateCategoryModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const handleAddToCategory = async (data: any) => {
    try {
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/categories`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      await toast.promise(res, {
        loading: "Menambahkan kategori...",
        success: "Kategori berhasil ditambahkan",
        error: "Gagal menambahkan kategori",
      });
      queryClient.invalidateQueries("categories");
      queryClient.invalidateQueries("categoriesCount");
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
                <div className="text-xl font-bold">Tambah Kategori</div>
              </Dialog.Title>
              <form className="overflow-y-auto overflow-x-hidden text-justify text-sm min-w-72 md:h-full rounded-2xl p-2  shadow-xl flex flex-col gap-3 border">
                <div className="flex flex-col gap-2">
                  <label className="font-bold">Nama</label>
                  <input
                    type="text"
                    placeholder="Topping"
                    className="border border-primary-orange rounded-md p-1"
                    {...register("name", { required: "Kolom ini wajib diisi" })}
                  />
                  {errors.name && (
                    <span className="text-red-500">
                      {errors.name?.message?.toString()}
                    </span>
                  )}
                </div>
              </form>

              <button
                className="py-1 md:px-3 font-bold rounded-xl mb-4 text-white md:text-lg shadow-lg bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange bg-800% bg-50% hover:bg-100% duration-700 text-base px-2"
                onClick={handleSubmit(handleAddToCategory)}
              >
                Tambah Kategori
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
