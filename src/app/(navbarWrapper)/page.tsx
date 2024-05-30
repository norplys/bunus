"use client";
import Chef from "@/components/home/Chef";
import Intro from "../../components/home/Intro";
import FavouriteMenu from "../../components/home/FavouriteMenu";
import Testimoni from "@/components/home/Testimoni";
import Contact from "../../components/home/Contact";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/helper/context/userContext";
import "swiper/css";
import "swiper/css/pagination";

const mockData = new Array(5).fill(0);

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { useAuth } = useUser();

  const validateToken = async () => {
    try {
      await useAuth(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
    validateToken();
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
