"use client";
import Chef from "@/components/home/Chef";
import Intro from "../../components/home/Intro";
import FavouriteMenu from "../../components/home/FavouriteMenu";
import Testimoni from "@/components/home/Testimoni";
import Contact from "../../components/home/Contact";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/helper/context/userContext";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const mockData = new Array(5).fill(0);

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { setUser } = useUser();

  const fetchUser = async (token: string | null) => {
    try {
      if (token) {
        const response = await axios.get(
          "https://bunus-be-production.up.railway.app/v1/get-me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUser(response.data.data);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchUser(token);
    }
  }, [token]);
  return (
    <section className="grid gap-14">
      <Intro />
      <Chef />
      <FavouriteMenu />
      <Testimoni />
      <Contact />
    </section>
  );
}
