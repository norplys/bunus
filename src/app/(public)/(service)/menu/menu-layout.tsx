"use client";

import React, { ReactNode } from "react";
import { CategoryDashboard } from "@/components/category/category-dashboard";
import { CartNotification } from "@/components/cart/cart-notification";

export function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <main className="md:mt-20">
      <CategoryDashboard className="bg-white border-b md:top-20 top-14" />
      {children}
      <CartNotification />
    </main>
  );
}
