import { FaTrash } from "react-icons/fa";

export default function CartItem() {
  return (
    <div className="flex gap-5 border-b pb-5 border-primary-orange">
      <div className="w-40 bg-gray-300 rounded-md"></div>
      <div className="flex-1">
        <h1 className="text-lg font-bold">Nama Produk</h1>
        <p className="text-sm">Deskripsi Produk</p>
        <p className="text-sm">Harga per pcs: Rp. 25.000</p>
        <p className="text-sm font-bold">Quantity: 5</p>
      </div>
      <div className="grid justify-items-end items-center">
        <p className="font-bold">Rp. 100.000</p>
        <button className="text-primary-red text-xl">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
