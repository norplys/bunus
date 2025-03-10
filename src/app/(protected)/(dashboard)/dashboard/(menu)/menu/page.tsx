"use client";

import { useState } from "react";
import { Loading } from "@/components/ui/loading";
import { useCategories } from "@/lib/hooks/query/use-categories";
import { useMenu } from "@/lib/hooks/query/use-menu";
import { Category, Menu } from "@/lib/types/schema";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { useModal } from "@/lib/hooks/use-modal";
import { MenuCardModal } from "@/components/modal/menu-card-modal";
import { DashboardMenuCard } from "@/components/dashboard/dashboard-menu-card";
import { Button } from "@/components/ui/button";
import { useMenuId } from "@/lib/hooks/use-menu-id";
import { DashboardMenuModal } from "@/components/dashboard/dashboard-menu-modal";

export default function Page() {
  const { data, isLoading } = useCategories();

  const [isEditMode, setIsEditMode] = useState(false);

  const { open, openModal, closeModal } = useModal();
  const { menuId, changeMenuId } = useMenuId();

  const handleOpenModal = (menuId: string) => {
    setIsEditMode(true);
    changeMenuId(menuId);
    openModal();
  };

  const categories = data?.data;
  return (
    <>
      <DashboardMenuModal
        open={open}
        CloseModal={closeModal}
        menuId={menuId.current}
        isEditMode={isEditMode}
      />
      <ActionButton openMenuModal={openModal} />
      <div className="grid gap-5">
        {isLoading ? (
          <Loading />
        ) : categories?.length ? (
          categories?.map((category, i) => (
            <MenuCategoryCard
              key={i}
              category={category}
              handleOpenModal={handleOpenModal}
            />
          ))
        ) : (
          <p>Belum ada kategori</p>
        )}
      </div>
    </>
  );
}

type MenucategoryCardProps = {
  category: Category;
  handleOpenModal: (menuId: string) => void;
};

function MenuCategoryCard({
  category,
  handleOpenModal,
}: MenucategoryCardProps) {
  const { data, isLoading } = useMenu(category.id);

  const menus = data?.data;

  return (
    <div>
      <div className="flex text-center items-center gap-2 text-xl">
        <h1 className="text-2xl font-bold py-5">{category.name}</h1>
        <BiTrash />
        <FaEdit />
      </div>
      {isLoading ? (
        <Loading />
      ) : menus?.length ? (
        <ul className="grid gap-2">
          {menus?.map((menu) => (
            <DashboardMenuCard menu={menu} handleOpenModal={handleOpenModal} />
          ))}
        </ul>
      ) : (
        <p>Belum ada menu</p>
      )}
    </div>
  );
}

type ActionButtonProps = {
  openMenuModal: () => void;
};

function ActionButton({ openMenuModal }: ActionButtonProps) {
  return (
    <div className="flex gap-4 items-center py-4 border-b">
      <Button className="bg-accent px-2 py-1 font-bold text-primary-foreground">
        Tambah Kategori
      </Button>
      <Button
        className="bg-accent px-2 py-1 font-bold text-primary-foreground"
        onClick={openMenuModal}
      >
        Tambah Produk
      </Button>
    </div>
  );
}
