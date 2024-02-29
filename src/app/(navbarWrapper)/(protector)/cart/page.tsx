"use client";
import CartItem from "@/components/cart/CartItem";
import { FaTrash } from "react-icons/fa";
import { useCartData } from "@/helper/hooks/useCartData";
export default function Cart() {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useCartData(token);
  console.log(data);
  return (
    <div className="min-h-screen bg-blue-50 pt-9">
      <div className="flex gap-5 justify-center items-start px-3 mx-auto w-[80%]">
        <div className=" flex-1 grid gap-2">
          <div className="text-xl font-bold bg-white rounded-t-xl  p-5 flex justify-between">
            <p>Total item (2)</p>
            <button className="text-primary-red text-base">
              <FaTrash />
            </button>
          </div>
          {/* Item */}
          <div className="bg-white rounded-b-xl  p-5 grid gap-5">
            {data?.items.map((item: any, i: any) => {
              return <CartItem key={i} item={item} />;
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl w-96 p-5 grid gap-5">
          <h1 className="text-xl font-bold text-primary-orange">
            Ringkasan Belanja
          </h1>
          <p className="text-lg flex justify-between border-b pb-2">
            Total <p className="font-bold">Rp. {data.total}</p>
          </p>
          <button className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white font-bold rounded-md p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl">
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}
