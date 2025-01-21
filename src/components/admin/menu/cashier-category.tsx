import MenuItem from "@/components/menu/menu-item";
import { useMenuData } from "@/lib/hooks/query/use-menu-data";
import MenuLoading from "@/components/cashier/menu-loading";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useUser } from "@/lib/context/user-context";

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
  const { token } = useUser();

  const queryClient = useQueryClient();

  const { data, isLoading } = useMenuData(category?.id);

  const menuData = data?.data;

  const deleteCategory = async (id: string) => {
    try {
      const res = axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/categories/order`,
        {
          id,
          newIndex: orderIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
          : menuData?.map((menu: MenuProps, i: number) => {
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
