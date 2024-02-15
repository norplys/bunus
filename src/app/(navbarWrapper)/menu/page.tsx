"use client"
import Category from "@/components/menu/Category";
import {useState } from "react";
import DetailModal from "@/components/menu/DetailModal";
import { useCategoriesData } from "@/helper/hooks/useCategoryData";

type CategoryProps = {
  id: string,
  name: string,
}

export default function menu () {
  const [open, setOpen] = useState(true);
  const { data, isLoading } = useCategoriesData();

  return (
    <section className="min-h-screen">
    <div className="grid gap-14 my-8">
      {
        isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data.map((category : CategoryProps , i : number) => {
            return (
              <Category key={i} category={category}/>
            )
          })
        )
      }
    </div>
    <DetailModal isOpen={open} setIsOpen={setOpen} />
    </section>
  );
}