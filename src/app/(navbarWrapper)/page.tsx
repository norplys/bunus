"use client";
import Chef from "@/components/home/Chef";
import Intro from "../../components/home/Intro";
import FavouriteMenu from "../../components/home/FavouriteMenu";
import Contact from "../../components/home/Contact";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/helper/context/userContext";
import axios from "axios";

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
      <Contact />
    </section>
  );
}
