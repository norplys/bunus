"use client";

import { CategoryDashboard } from "@/components/category/category-dashboard";
import { Menu } from "@headlessui/react";
import { ReactNode } from "react";
import { BiPlus } from "react-icons/bi";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <Menu as={"div"} className="fixed bottom-0 right-0">
        <Menu.Button>
          <BiPlus />
        </Menu.Button>
        <Menu.Items>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
        </Menu.Items>
      </Menu> */}
      <CategoryDashboard className="bg-white border-b md:top-20 top-14" />
      {children}
    </>
  );
}
