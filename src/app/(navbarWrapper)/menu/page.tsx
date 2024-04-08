"use client";
import Category from "@/components/menu/Category";
import { useState, useRef, useEffect } from "react";
import DetailModal from "@/components/menu/DetailModal";
import { useCategoriesData } from "@/helper/hooks/useCategoryData";
import { useUser } from "@/helper/context/userContext";

type CategoryProps = {
  id: string;
  name: string;
};

export default function menu() {
  const { setToken } = useUser();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const [open, setOpen] = useState(false);
  const modalId = useRef("");
  const { data, isLoading } = useCategoriesData();

  const setModalId = (id: string) => {
    modalId.current = id;
  };

  return (
    <section className="min-h-screen">
      <div className="grid gap-14 my-8">
        {isLoading ? (
          <h1>Loading...</h1>
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
      <DetailModal isOpen={open} setIsOpen={setOpen} id={modalId} />
    </section>
  );
}
