"use client";
import formatCurrency from "@/helper/currencyFormatter";
import { useAdminOrder } from "@/helper/hooks/useAdminOrder";
import { useUser } from "@/helper/context/userContext";
import LoadingImage from "@/components/LoadingImage";

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
  const { data, isLoading } = useAdminOrder(token);
  return (
    <div className="flex-1 w-full">
      <h1 className="w-full bg-primary-orange p-2 flex justify-end items-center">
        <p className="text-white text-lg font-bold">Analytics</p>
      </h1>
      <div className="w-full bg-orange-200 p-2 flex gap-2 h-10">
        <h1 className="text-lg font-bold">Total Penjualan Hari Ini</h1>
      </div>
      {isLoading ? (
        <LoadingImage />
      ) : (
        <section className="flex flex-wrap w-full justify-center pt-5 gap-10">
          {array.map((item, index) => (
            <div
              key={index}
              className="bg-orange-200 p-5 rounded-lg shadow-lg border-primary-orange border-4 min-w-80"
            >
              <h1 className="text-center text-xl font-bold">{item.label}</h1>
              <p className="text-center text-2xl font-bold">
                {formatCurrency(data[item.value])}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
