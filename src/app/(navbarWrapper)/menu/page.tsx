"use client";
import Category from "@/components/menu/Category";
import { useState, useRef, useEffect } from "react";
import DetailModal from "@/components/menu/DetailModal";
import { useCategories } from "@/lib/hooks/query/use-categories";
import LoadingImage from "@/components/LoadingImage";
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
