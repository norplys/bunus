"use client";

import React, { ReactNode } from "react";
import { useCategories } from "@/lib/hooks/query/use-categories";
import { CategoryTab } from "@/components/category/category-tab";

export function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <CategoryDashboard />
      {children}
    </main>
  );
}

const allCategoryTab = {
  id: "ALL",
  name: "Semua",
};

function CategoryDashboard() {
  const { data, isLoading } = useCategories();
  const categories = [allCategoryTab, ...(data?.data || [])];

  return (
    <div className="bg-white py-4 border-b">
      <ul className="layout flex overflow-x-auto gap-5">
        {categories?.length ? (
          categories.map((category) => (
            <CategoryTab
              key={category.id}
              name={category.name}
              id={category.id}
            />
          ))
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>Tidak ada kategori</p>
        )}
      </ul>
    </div>
  );
}
