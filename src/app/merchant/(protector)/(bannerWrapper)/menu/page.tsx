"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import MerchantCategory from "@/components/merchant/MerchantCategory";
import DetailModal from "@/components/menu/DetailModal";
import { useCategoriesData } from "@/helper/hooks/useCategoryData";
import { useUser } from "@/helper/context/userContext";
import LoadingImage from "@/components/LoadingImage";
import { useState, useRef, useEffect } from "react";
import { useCartNotif } from "@/helper/hooks/useCartNotif";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import CartModal from "@/components/merchant/CartModal";

type CategoryProps = {
  id: string;
  name: string;
};

export default function MerchantMenu() {
  const { token } = useUser();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const modalId = useRef("");
  const { data, isLoading } = useCategoriesData();
  const setModalId = (id: string) => {
    modalId.current = id;
  };
  const { data: notif, isLoading: cartLoading } = useCartNotif(token);
  return (
    <section className="bg-white min-h-screen overflow-auto z-0 pb-20 mt-28">
      {isLoading ? (
        "loading"
      ) : (
        <div className="flex flex-wrap justify-center shadow-lg">
          {data.map((category: CategoryProps, i: number) => (
            <button
              key={i}
              className="flex items-center justify-between px-5 py-3"
            >
              <h1 className="text-2xl font-bold">
                {category.name.toUpperCase()}
              </h1>
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-14 my-8">
        {isLoading ? (
          <LoadingImage />
        ) : (
          data.map((category: CategoryProps, i: number) => {
            return (
              <MerchantCategory
                key={i}
                category={category}
                setIsOpen={setOpen}
                isOpen={open}
                setModalId={setModalId}
              />
            );
          })
        )}
      </div>
      <button
        className="fixed bottom-5 right-20 flex gap-5 w-[80%] bg-orange-400 h-20 rounded-xl items-center p-5 text-white text-2xl justify-between"
        onClick={() => setCartOpen(true)}
        disabled={notif === 0}
      >
        <div className="flex items-center justify-center gap-2">
          <FaShoppingCart />
          <p className="font-bold">{cartLoading ? "" : notif}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="font-bold">Lihat Keranjang</p>
          <FaArrowRight />
        </div>
      </button>
      <DetailModal isOpen={open} setIsOpen={setOpen} id={modalId} />
      <CartModal isOpen={cartOpen} setIsOpen={setCartOpen} />
    </section>
  );
}
