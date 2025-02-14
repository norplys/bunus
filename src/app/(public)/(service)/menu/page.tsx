"use client";

import { useSearchParams } from "next/navigation";
import { useMenu } from "@/lib/hooks/query/use-menu";
import { Loading } from "@/components/ui/loading";
import { MenuCard } from "@/components/menu/menu-card";

export default function Menu() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { data, isLoading } = useMenu(categoryId);

  const menus = data?.data;

  return (
    <section className="layout min-h-screen pt-5">
      {isLoading ? (
        <Loading />
      ) : menus?.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menus?.map((menu) => <MenuCard key={menu.id} {...menu} />)}
        </div>
      ) : (
        "Kategori ini tidak memiliki menu"
      )}
    </section>
  );
}
