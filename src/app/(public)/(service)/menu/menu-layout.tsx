"use client";

import React, { ReactNode } from "react";
import { clsx } from "clsx";
import { useCategories } from "@/lib/hooks/query/use-categories";
import { CategoryTab } from "@/components/category/category-tab";
import { useSearchParams } from "next/navigation";
import { CartNotification } from "@/components/cart/cart-notification";

export function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mt-20">
      <CategoryDashboard className="bg-white border-b top-20" />
      {children}
      <CartNotification />
    </main>
  );
}

const allCategoryTab = {
  id: "ALL",
  name: "Semua",
};

type CategoryDashboardProps = {
  isService?: boolean;
  className?: string;
};

export function CategoryDashboard({
  isService,
  className,
}: CategoryDashboardProps) {
  const { data } = useCategories();
  const categories = [allCategoryTab, ...(data?.data || [])];

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const selectedId = categoryId || "ALL";

  return (
    <div className={clsx("min-h-14 sticky z-30 py-4", className)}>
      <ul className="layout flex overflow-x-auto gap-5">
        {categories?.length ? (
          categories.map((category) => (
            <CategoryTab
              key={category.id}
              name={category.name}
              id={category.id}
              selectedId={selectedId}
              isService={isService}
            />
          ))
        ) : (
          <p>Tidak ada kategori</p>
        )}
      </ul>
    </div>
  );
}
