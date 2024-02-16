"use client"
import Chef from "@/components/home/Chef";
import Intro from "../../components/home/Intro";
import FavouriteMenu from "../../components/home/FavouriteMenu";
import Contact from "../../components/home/Contact";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      console.log(token);      
      localStorage.setItem("token", token);
    }
  }, [token]);
  return (
    <section className="grid gap-14">
        <Intro />
        <Chef />
        <FavouriteMenu />
        <Contact />
    </section>
  );
}
