"use client";
import formatCurrency from "@/lib/currencyFormatter";
import { useAdminOrder } from "@/lib/hooks/query/use-admin-order";
import { useUser } from "@/lib/context/user-context";
import LoadingImage from "@/components/LoadingImage";
import { useState, ChangeEvent } from "react";

const array = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "QRIS",
    value: "qris",
  },
  {
    label: "Debit",
    value: "debit",
  },
  {
    label: "Total",
    value: "total",
  },
];

export default function Analytics() {
  const { token } = useUser();
  const [date, setDate] = useState(new Date());
  const { data, isLoading } = useAdminOrder(
    token,
    date.toISOString().split("T")[0],
  );
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value ? e.target.value : new Date()));
  };
  return (
    <div className="flex-1 w-full">
      <h1 className="w-full bg-primary-orange p-2 flex justify-end items-center">
        <p className="text-white text-lg font-bold">Analytics</p>
      </h1>
      <div className="w-full bg-orange-200 p-2 text-end h-10">
        <h1 className="text-lg font-bold">Total Penjualan Hari Ini</h1>
      </div>
      <div className="grid justify-center">
        <label className="font-bold text-center pt-2">Tanggal :</label>
        <input
          id="date"
          type="date"
          className="onFocus:outline-none border-b-2 border-primary-orange p-1 w-40 text-lg font-bold bg-transparent h-fit"
          value={date.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </div>
      <section className="flex flex-wrap w-full justify-center pt-5 gap-10">
        {array.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-lg shadow-lg border-primary-orange border-4 min-w-80"
          >
            <h1 className="text-center text-xl font-bold">{item.label}</h1>
            {isLoading ? (
              <LoadingImage />
            ) : (
              <p className="text-center text-2xl font-bold">
                {formatCurrency(data[item.value])}
              </p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
