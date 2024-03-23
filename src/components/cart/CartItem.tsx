import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

export default function CartItem({ item }: { item: any }) {
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = axios.delete(
        `https://bunus-be-production.up.railway.app/v1/cart-item/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await toast.promise(res, {
        loading: "Mohon Tunggu...",
        success: "Berhasil Menghapus Item !",
        error: "Gagal Menghapus Item !",
      });
      await queryClient.invalidateQueries(["cart", token]);
      await queryClient.invalidateQueries(["cartNotif", token]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="md:flex grid grid-cols-6 grid-rows-2 gap-5 border-b pb-5 border-primary-orange">
      <div className="md:w-40 w-32 bg-gray-300 rounded-md md:h-40 h-32 overflow-hidden shadow-lg col-span-2">
        <Image
          src={item.menu.image}
          alt="menu1"
          width={300}
          height={300}
          className="object-cover hover:scale-110 duration-300 md:h-40 h-32 "
        />
      </div>
      <div className="flex-1 row-start-2 col-span-6">
        <h1 className="md:text-lg font-bold">{item.menu.name}</h1>
        <p className="md:text-sm text-xs">
          Harga per pcs: Rp. {item.menu.price}
        </p>
        <p className="md:text-sm text-xs font-bold">
          Quantity: {item.quantity}
        </p>
      </div>
      <div className="grid justify-items-end items-center col-span-4">
        <p className="font-bold text-sm md:text-lg">Rp. {item.total}</p>
        <button className="text-primary-red text-xl" onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
