"use client";

import { useState } from "react";
import { Loading } from "@/components/ui/loading";
import { useCategories } from "@/lib/hooks/query/use-categories";
import { useMenu } from "@/lib/hooks/query/use-menu";
import { Category, Menu } from "@/lib/types/schema";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { useModal } from "@/lib/hooks/use-modal";
import { DashboardMenuCard } from "@/components/dashboard/dashboard-menu-card";
import { Button } from "@/components/ui/button";
import { useMenuId } from "@/lib/hooks/use-menu-id";
import { DashboardMenuModal } from "@/components/modal/dashboard-menu-modal";
import { DashboardCategoryModal } from "@/components/modal/dashboard-category-modal";
import { useMutationCategory } from "@/lib/hooks/mutation/use-mutation-category";
import toast from "react-hot-toast";

export default function Page() {
  const { data, isLoading } = useCategories();

  const [isEditMode, setIsEditMode] = useState(false);
  const { open, openModal, closeModal } = useModal();

  const {
    open: categoryOpen,
    openModal: categoryOpenModal,
    closeModal: categoryCloseModal,
  } = useModal();

  const [isCategoryEditMode, setIsCategoryEditMode] = useState<boolean>(false);
  const [initialCategoryName, setInitialCategoryName] = useState<string | null>(
    null,
  );
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const { menuId, changeMenuId } = useMenuId();

  const handleOpenMenuModal = (menuId: string | null, isEditMode: boolean) => {
    setIsEditMode(isEditMode);
    changeMenuId(menuId);
    openModal();
  };

  const handleOpenModal = (menuId: string) => {
    handleOpenMenuModal(menuId, true);
  };

  const handleCreateOpenModal = () => {
    handleOpenMenuModal(null, false);
  };

  const handleOpenCategoryModal = (
    categoryId: string | null,
    initialName: string | null,
    isEditMode: boolean,
  ) => {
    setIsCategoryEditMode(isEditMode);
    setInitialCategoryName(initialName);

    setCategoryId(categoryId);
    categoryOpenModal();
  };

  const handleCreateCategoryOpenModal = () => {
    handleOpenCategoryModal(null, null, false);
  };

  const handleEditCategory = (categoryId: string, initialName: string) => {
    handleOpenCategoryModal(categoryId, initialName, true);
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
      <DashboardCategoryModal
        open={categoryOpen}
        CloseModal={categoryCloseModal}
        categoryId={categoryId}
        isEditMode={isCategoryEditMode}
        initialName={initialCategoryName}
      />
      <ActionButton
        openMenuModal={handleCreateOpenModal}
        openCategoryModal={handleCreateCategoryOpenModal}
      />
      <div className="grid gap-5">
        {isLoading ? (
          <Loading />
        ) : categories?.length ? (
          categories?.map((category, i) => (
            <MenuCategoryCard
              key={i}
              category={category}
              handleOpenModal={handleOpenModal}
              handleEditCategory={handleEditCategory}
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
  handleEditCategory: (categoryId: string, initialName: string) => void;
};

function MenuCategoryCard({
  category,
  handleOpenModal,
  handleEditCategory,
}: MenucategoryCardProps) {
  const { data, isLoading } = useMenu(category.id);
  const { deleteCategoryMutation } = useMutationCategory();

  const menus = data?.data;

  const editCategory = () => {
    handleEditCategory(category.id, category.name);
  };

  const handleDeleteCategory = () => {
    deleteCategoryMutation.mutate(category.id, {
      onSuccess: () => {
        toast.success("Kategori berhasil dihapus");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div>
      <div className="flex text-center items-center gap-2 text-xl">
        <h1 className="text-2xl font-bold py-5">{category.name}</h1>
        <BiTrash className="cursor-pointer" onClick={handleDeleteCategory} />
        <FaEdit className="cursor-pointer" onClick={editCategory} />
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
  openCategoryModal: () => void;
};

function ActionButton({ openMenuModal, openCategoryModal }: ActionButtonProps) {
  return (
    <div className="flex gap-4 items-center py-4 border-b">
      <Button
        className="bg-accent px-2 py-1 font-bold text-primary-foreground"
        onClick={openCategoryModal}
      >
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
