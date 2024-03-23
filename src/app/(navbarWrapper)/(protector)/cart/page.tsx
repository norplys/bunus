"use client";
import CartItem from "@/components/cart/CartItem";
import { FaTrash } from "react-icons/fa";
import { useCartData } from "@/helper/hooks/useCartData";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Cart() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { data, isLoading } = useCartData(token);
  const handleCheckout = async (total: number) => {
    try {
      setLoading(true);
      const items = data?.items.map((item: any) => {
        return {
          menuId: item.menu.id,
          quantity: item.quantity,
          total: item.total,
        };
      });
      if (!items.length) {
        setLoading(false);
        return;
      }
      const res = axios.post(
        "https://bunus-be-production.up.railway.app/v1/orders",
        {
          total,
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res2 = await toast.promise(
        res,
        {
          loading: "Mohon Tunggu...",
          success: "Berhasil Checkout !",
          error: "Gagal Checkout, Mohon Coba Kembali !",
        },
        {
          position: "bottom-left",
        },
      );
      setLoading(false);
      push(res2.data.data.snap_redirect_url);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-blue-50 pt-9">
      <div className="flex gap-5 justify-center items-start px-3 mx-auto xl:w-[80%] flex-col lg:flex-row">
        <div className="flex-1 grid gap-2 w-full ">
          <div className="lg:text-xl text-lg font-bold bg-white rounded-t-xl  p-5 flex justify-between">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <p>Total item ({data?.items.length})</p>
            )}
            <button className="text-primary-red text-base">
              <FaTrash />
            </button>
          </div>
          {/* Item */}
          <div className="bg-white rounded-b-xl  p-5 grid gap-5">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              data?.items.map((item: any, i: any) => {
                return <CartItem key={i} item={item} />;
              })
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl lg:w-96 p-5 grid gap-5 w-full">
          <h1 className="md:text-xl font-bold text-primary-orange">
            Ringkasan Belanja
          </h1>
          <p className="md:text-lg flex justify-between border-b pb-2">
            Total{" "}
            <p className="font-bold text-sm md:text-base">
              Rp. {isLoading ? <h1>Loading...</h1> : data?.total}
            </p>
          </p>
          <button
            className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white font-bold rounded-md md:p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl py-1"
            onClick={() => handleCheckout(data?.total)}
            disabled={loading}
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}
