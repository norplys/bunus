"use client"
import Category from "@/components/menu/Category";
import {useState } from "react";
import DetailModal from "@/components/menu/DetailModal";

export default function menu () {
  const [open, setOpen] = useState(true);
  return (
    <>
    <section className="grid gap-14 my-8">
      <Category />
      <Category />
    </section>
    <DetailModal isOpen={open} setIsOpen={setOpen} />
    </>
  );
}