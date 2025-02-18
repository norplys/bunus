"use client";

import React, { ReactNode } from "react";
import { useCategories } from "@/lib/hooks/query/use-categories";
import { CategoryTab } from "@/components/category/category-tab";
import { useSearchParams } from "next/navigation";
import { CartNotification } from "@/components/cart/cart-notification";

export function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mt-20">
      <CategoryDashboard />
      {children}
      <CartNotification />
    </main>
  );
}

const allCategoryTab = {
  id: "ALL",
  name: "Semua",
};

function CategoryDashboard() {
  const { data } = useCategories();
  const categories = [allCategoryTab, ...(data?.data || [])];

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const selectedId = categoryId || "ALL";

  return (
    <div className="bg-white py-4 border-b min-h-14 sticky top-20 z-50">
      <ul className="layout flex overflow-x-auto gap-5 bg-white">
        {categories?.length ? (
          categories.map((category) => (
            <CategoryTab
              key={category.id}
              name={category.name}
              id={category.id}
              selectedId={selectedId}
            />
          ))
        ) : (
          <p>Tidak ada kategori</p>
        )}
      </ul>
    </div>
  );
}
