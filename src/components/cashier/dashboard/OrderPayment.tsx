import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import formatCurrency from "@/helper/currencyFormatter";
import LoadingImage from "@/components/LoadingImage";

const typeArray = ["cash", "qris", "debit"];

export default function OrderPayment({
  data,
  setIsOpen,
  refId,
  setIsPayment,
}: {
  data: any;
  isPayment: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
  setIsPayment: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const [type, setType] = useState<string | null>(null);
  useEffect(() => {
    type === "cash" ? setFocus("money") : "";
  }, [type]);
  const money = watch("money");
  const queryClient = useQueryClient();
  const setPaid = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/payment/${id}`,
        {
          status: "settlement",
          method: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await toast.promise(res, {
        loading: "Loading...",
        success: "Pembayaran Berhasil",
        error: "Gagal bayar order",
      });
      await queryClient.invalidateQueries(["orderCashier", token]);
      await queryClient.invalidateQueries(["orderDetail", id]);
      setIsOpen(false);
      setIsPayment(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col md:hidden min-h-96 p-2 gap-5 justify-center">
      <div className="flex gap-2 justify-center">
        {typeArray.map((item, index) => (
          <button
            key={index}
            className={`font-bold p-2 rounded-md ${type === item ? "bg-primary-orange text-white" : "border border-black"}`}
            onClick={() => setType(item)}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
      <p className="text-center text-3xl font-bold border-b-2 border-primary-orange pb-2">
        {formatCurrency(data.total)}
      </p>
      <p
        className={`text-center text-xl font-bold ${(money - data.total < 1 || type !== "cash") && "hidden"}`}
      >
        Kembali : {formatCurrency(money - data.total)}
      </p>
      <form
        className="flex gap-2 flex-col"
        onSubmit={handleSubmit(() => setPaid(refId.current))}
      >
        <button
          type="button"
          onClick={() => setValue("money", data.total)}
          className={`bg-primary-orange text-white font-bold p-2 rounded-md ${type === "cash" ? "block" : "hidden"}`}
        >
          Uang Pas
        </button>
        <input
          type="number"
          className={`border border-black p-1 rounded-md ${type === "cash" ? "block" : "hidden"}`}
          {...register("money")}
        />
        <p className="font-bold text-center pb-2">
          Pastikan Pembayaran Telah Diterima, sebelum menekan tombol bayar
        </p>
        <button
          type="submit"
          className={`bg-green-500 text-white font-bold p-2 rounded-md`}
        >
          {isSubmitting ? <LoadingImage /> : "Bayar"}
        </button>
      </form>
    </section>
  );
}
