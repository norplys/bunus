"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
const mockData = new Array(5).fill(0);
export default function Testimoni() {
  return (
    <section className="w-full min-h-screen flex items-center flex-col pt-32 gap-3">
      <h1 className="text-5xl font-bold text-primary-red rounded-2xl py-2 w-fit px-5">
        Testimoni
      </h1>
      <div className="max-w-3xl text-center justify-self-center">
        Apa kata pelanggan kami tentang bubur nusantara ?
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        className="w-[50%]"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        {mockData.map((_, i) => (
          <SwiperSlide key={i}>
            <div className="bg-gray-300 w-fit h-96 rounded-xl mx-auto overflow-hidden flex justify-center items-center p-5">
              <Image
                src={`/testimoni/testi${i + 1}.png`}
                width={500}
                height={500}
                alt={`testi${i}`}
              ></Image>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
