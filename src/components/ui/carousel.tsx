"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
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
      modules={[FreeMode, Autoplay]}
      className={clsx("w-full", className)}
    >
      {items.map((item, index) => (
        <SwiperSlide
          key={index}
          className={slideClassName}
          style={{ width: "fit-content" }}
        >
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
