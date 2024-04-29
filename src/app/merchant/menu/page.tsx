"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Category from "@/components/menu/Category";
import DetailModal from "@/components/menu/DetailModal";
import { useCategoriesData } from "@/helper/hooks/useCategoryData";
import { useUser } from "@/helper/context/userContext";
import LoadingImage from "@/components/LoadingImage";
import { useState, useRef } from "react";
import { useCartNotif } from "@/helper/hooks/useCartNotif";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

type CategoryProps = {
  id: string;
  name: string;
};

export default function MerchantMenu() {
  const mockData = new Array(5).fill(0);
  const { token, setToken } = useUser();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const [open, setOpen] = useState(false);
  const modalId = useRef("");
  const { data, isLoading } = useCategoriesData();
  const setModalId = (id: string) => {
    modalId.current = id;
  };
  const { data: notif, isLoading: cartLoading } = useCartNotif(token);
  return (
    <section className="bg-white min-h-screen overflow-auto z-0 pb-20">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        className="border-b-8 border-orange-400 bg-gray-600 "
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        {mockData.map((_, i) => (
          <SwiperSlide key={i}>
            <div className="bg-gray-300 w-full h-fit">
              <Image
                src={`/comingSoon.png`}
                width={1000}
                height={1000}
                alt={`banner${i}`}
              ></Image>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="grid gap-14 my-8">
        {isLoading ? (
          <LoadingImage />
        ) : (
          data.map((category: CategoryProps, i: number) => {
            return (
              <Category
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
      <button className="fixed bottom-5 right-20 flex gap-5 w-[80%] bg-orange-400 h-20 rounded-xl items-center p-5 text-white text-2xl justify-between">
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
    </section>
  );
}
