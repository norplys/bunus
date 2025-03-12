"use client";

import { useSearchParams } from "next/navigation";
import { useMenu } from "@/lib/hooks/query/use-menu";
import { Loading } from "@/components/ui/loading";
import { MenuCard } from "@/components/menu/menu-card";
import { useModal } from "@/lib/hooks/use-modal";
import { MenuCardModal } from "@/components/modal/menu-card-modal";
import { useCart } from "@/lib/hooks/query/use-cart";
import { useState } from "react";

export default function Menu() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { open, openModal, closeModal } = useModal();

  const { data, isLoading } = useMenu(categoryId);
  const menus = data?.data ?? [];

  const { data: cartData, isLoading: isCartPending } = useCart();
  const cart = cartData?.data;

  const [menuId, setMenuId] = useState<string | null>(null);
  const changeId = (id: string) => {
    setMenuId(id);
    openModal();
  };

  if (isLoading) {
    return (
      <Loading className="min-h-screen flex justify-center items-center" />
    );
  }

  return (
    <>
      <MenuCardModal
        open={open}
        closeModal={closeModal}
        menuId={menuId}
        cart={cart}
        isCartPending={isCartPending}
      />
      <section className="layout min-h-screen md:pt-5 py-16">
        {menus?.length ? (
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:grid-cols-3">
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
