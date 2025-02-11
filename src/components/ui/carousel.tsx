"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import clsx from "clsx";
import type { SwiperProps } from "swiper/react";

type CarouselProps = {
  items: React.ReactNode[];
  className?: string;
  slideClassName?: string;
} & SwiperProps;

export function Carousel({
  items,
  className,
  slideClassName,
  ...rest
}: CarouselProps): JSX.Element {
  return (
    <Swiper
      {...rest}
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={10}
      pagination={{ clickable: true }}
      className={clsx("w-full", className)}
    >
      {items.map((item, index) => (
        <SwiperSlide
          className={clsx("flex justify-center items-center", slideClassName)}
          key={index}
        >
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
