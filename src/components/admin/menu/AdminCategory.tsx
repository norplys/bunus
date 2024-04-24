import MenuItem from "@/components/menu/MenuItem";
import { useCategoriesMenus } from "@/helper/hooks/useMenusData";
import MenuLoading from "../MenuLoading";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

type CategoryProps = {
  id: string;
  name: string;
  orderIndex: number;
};

type MenuProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const LoadingArray = new Array(3).fill(0);

export default function AdminCategory({
  category,
  setIsOpen,
  setModalId,
  isOpen,
  count,
}: {
  category: CategoryProps;
  setIsOpen: (value: boolean) => void;
  setModalId: (value: string) => void;
  isOpen: boolean;
  count: number;
}) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useCategoriesMenus(category?.id);
  const deleteCategory = async (id: string) => {
    try {
      const res = axios.delete(
        `https://bunus-be-production.up.railway.app/v1/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      await toast.promise(res, {
        loading: "Menghapus kategori...",
        success: "Kategori berhasil dihapus",
        error: "Gagal menghapus kategori",
      });
      queryClient.invalidateQueries("categories");
      queryClient.invalidateQueries("categoriesCount");
    } catch (error) {
      console.log(error);
    }
  };
  const changeCategoryOrder = async (id: string, orderIndex: number) => {
    try {
      const res = axios.put(
        `https://bunus-be-production.up.railway.app/v1/categories/order`,
        {
          id,
          newIndex: orderIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      await toast.promise(res, {
        loading: "Mengubah urutan kategori...",
        success: "Urutan kategori berhasil diubah",
        error: "Gagal mengubah urutan kategori",
      });
      queryClient.invalidateQueries("categories");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="grid justify-items-center gap-4 mx-2">
      <h1 className="font-extrabold md:text-xl text-lg flex gap-2 items-center">
        <select
          onChange={(e) =>
            changeCategoryOrder(category.id, parseInt(e.target.value))
          }
          className="border rounded-md p-1 border-black"
          value={category.orderIndex}
        >
          {new Array(count).fill(0).map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        {category.name.toUpperCase()}{" "}
        <FaTrash
          className="text-base text-primary-red cursor-pointer"
          onClick={() => deleteCategory(category?.id)}
        />
      </h1>
      <section className="flex flex-wrap gap-6 justify-center items-center">
        {isLoading
          ? LoadingArray.map((item) => <MenuLoading />)
          : data?.map((menu: MenuProps, i: number) => {
              return (
                <MenuItem
                  key={i}
                  menu={menu}
                  setIsOpen={setIsOpen}
                  setModalId={setModalId}
                  isOpen={isOpen}
                />
              );
            })}
      </section>
    </section>
  );
}
