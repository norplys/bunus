"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const mockData = new Array(5).fill(0);

export default function Banner() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      className="border-b-8 border-orange-400 bg-gray-600 -mb-28"
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
    >
      {mockData.map((_, i) => (
        <SwiperSlide key={i}>
          <div className="bg-gray-300 w-full h-40">
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
  );
}
