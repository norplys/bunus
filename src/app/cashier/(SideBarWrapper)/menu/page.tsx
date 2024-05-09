"use client";
import CashierCategory from "@/components/cashier/menu/CashierCategory";
import { useState, useRef, useEffect } from "react";
import CashierForm from "@/components/cashier/menu/UpdateMenuModal";
import { useCategoriesData } from "@/helper/hooks/useCategoryData";
import { useUser } from "@/helper/context/userContext";
import { FaPlusSquare } from "react-icons/fa";
import CreateMenuModal from "@/components/cashier/menu/CreateMenuModal";
import CreateCategoryModal from "@/components/cashier/menu/CreateCategoryModal";
import LoadingImage from "@/components/LoadingImage";
import { useCategoriesCount } from "@/helper/hooks/useCategoriesCount";

type CategoryProps = {
  id: string;
  name: string;
  orderIndex: number;
};

export default function CashierMenu() {
  const { setToken } = useUser();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const [open, setOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const modalId = useRef("");
  const { data, isLoading } = useCategoriesData();
  const { data: categoryCount, isLoading: categoryCountLoading } =
    useCategoriesCount();

  const setModalId = (id: string) => {
    modalId.current = id;
  };

  return (
    <div className="flex-1 w-full pl-72">
      <h1 className="w-full bg-primary-orange p-2 flex justify-end items-center">
        <p className="text-white text-lg font-bold">Menu</p>
      </h1>
      <div className="w-full bg-orange-200 p-2 flex gap-2">
        <button
          className="flex bg-green-500 border border-green-200 justify-center items-center px-2 py-1 rounded-lg font-bold gap-2 text-white shadow-lg"
          onClick={() => setIsCreateOpen(true)}
        >
          {" "}
          <FaPlusSquare /> Tambah Menu
        </button>
        <button
          className="flex bg-green-500 border border-green-200 justify-center items-center px-2 py-1 rounded-lg font-bold gap-2 text-white shadow-lg"
          onClick={() => setIsCategoryOpen(true)}
        >
          {" "}
          <FaPlusSquare /> Tambah Kategori
        </button>
      </div>
      <section className="flex justify-center items-center w-full">
        <div className="grid gap-14 my-8">
          {isLoading || categoryCountLoading ? (
            <LoadingImage />
          ) : (
            data.map((category: CategoryProps, i: number) => {
              return (
                <CashierCategory
                  key={i}
                  category={category}
                  setIsOpen={setOpen}
                  isOpen={open}
                  setModalId={setModalId}
                  count={categoryCount}
                />
              );
            })
          )}
        </div>
        <CashierForm isOpen={open} setIsOpen={setOpen} id={modalId} />
        <CreateMenuModal isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />
        <CreateCategoryModal
          isOpen={isCategoryOpen}
          setIsOpen={setIsCategoryOpen}
        />
      </section>
    </div>
  );
}