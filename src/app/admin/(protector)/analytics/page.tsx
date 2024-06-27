"use client";
import formatCurrency from "@/helper/currencyFormatter";
import { useAdminOrder } from "@/helper/hooks/useAdminOrder";
import { useUser } from "@/helper/context/userContext";
import LoadingImage from "@/components/LoadingImage";
import { useState, ChangeEvent } from "react";
import { useQueryClient } from "react-query";

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
    console.log("refetching");
  };
  return (
    <div className="flex-1 w-full">
      <h1 className="w-full bg-primary-orange p-2 flex justify-end items-center">
        <p className="text-white text-lg font-bold">Analytics</p>
      </h1>
      <div className="w-full bg-orange-200 p-2 text-end h-10">
        <h1 className="text-lg font-bold">Total Penjualan Hari Ini</h1>
      </div>
      <section className="flex flex-wrap w-full justify-center pt-5 gap-10">
        <input
          type="date"
          className="onFocus:outline-none border-b-2 border-primary-orange p-1 w-40 text-lg font-bold bg-transparent h-fit"
          value={date.toISOString().split("T")[0]}
          onChange={handleChange}
        />
        <div className="grid gap-2">
          {array.map((item, index) => (
            <div
              key={index}
              className="bg-orange-200 p-5 rounded-lg shadow-lg border-primary-orange border-4 min-w-80"
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
        </div>
      </section>
    </div>
  );
}
