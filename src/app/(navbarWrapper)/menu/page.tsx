"use client";
import Category from "@/components/menu/category";
import { useState, useRef, useEffect } from "react";
import DetailModal from "@/components/menu/detail-modal";
import { useCategories } from "@/lib/hooks/query/use-categories";
import LoadingImage from "@/components/loading-image";
import { useUser } from "@/lib/context/user-context";

type CategoryProps = {
  id: string;
  name: string;
};

export default function menu() {
  const [open, setOpen] = useState(false);
  const modalId = useRef("");
  const { data, isLoading } = useCategories();
  const { useAuth } = useUser();
  const validateToken = async () => {
    try {
      await useAuth(null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    validateToken();
  }, []);

  const setModalId = (id: string) => {
    modalId.current = id;
  };

  const categories = data?.data;

  return (
    <section className="min-h-screen">
      <div className="grid gap-14 my-8">
        {isLoading ? (
          <LoadingImage />
        ) : (
          categories?.map((category: CategoryProps, i: number) => {
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
