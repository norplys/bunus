"use client";
import Category from "@/components/menu/Category";
import { useState, useRef, useEffect } from "react";
import DetailModal from "@/components/menu/DetailModal";
import { useCategoriesData } from "@/helper/hooks/useCategoryData";
import LoadingImage from "@/components/LoadingImage";

type CategoryProps = {
  id: string;
  name: string;
};

export default function menu() {
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
          <LoadingImage />
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
