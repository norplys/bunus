"use client";

import { useSearchParams } from "next/navigation";
import { useMenu } from "@/lib/hooks/query/use-menu";
import { Loading } from "@/components/ui/loading";
import { MenuCard } from "@/components/menu/menu-card";
import { useModal } from "@/lib/hooks/use-modal";
import { MenuCardModal } from "@/components/modal/menu-card-modal";
import { useState } from "react";

export default function Menu() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const { open, openModal, closeModal } = useModal();
  const { data, isLoading } = useMenu(categoryId);

  const [id, setId] = useState<string | null>(null);
  const changeId = (id: string) => {
    setId(id);
    openModal();
  };

  const menus = data?.data ?? [];

  if (isLoading) {
    return (
      <Loading className="min-h-screen flex justify-center items-center" />
    );
  }

  return (
    <>
      <MenuCardModal open={open} closeModal={closeModal} id={id!} />
      <section className="layout min-h-screen pt-5">
        {menus?.length ? (
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {menus?.map((menu) => (
              <MenuCard key={menu.id} {...menu} changeId={changeId} />
            ))}
          </div>
        ) : (
          "Kategori ini belum memiliki menu"
        )}
      </section>
    </>
  );
}
