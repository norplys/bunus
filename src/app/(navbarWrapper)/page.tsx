"use client";
import Chef from "@/components/home/chef";
import Intro from "@/components/home/intro";
import FavouriteMenu from "@/components/home/favourite-menu";
import Testimoni from "@/components/home/testimony";
import Contact from "@/components/home/contact";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/lib/context/user-context";
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
