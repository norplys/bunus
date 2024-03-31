import Image from "next/image";
import Link from "next/link";
import SideBarAdmin from "@/components/admin/SideBarAdmin";
import OrderItem from "@/components/admin/dashboard/OrderItem";

const arrays = new Array(10).fill(0);
export default function Dashboard() {
  return (
    <section className="w-screen flex min-h-screen">
      <SideBarAdmin />
      <div className="flex-1 w-full">
        <nav className="w-full bg-primary-orange p-2 flex justify-end items-center">
          <p className="text-white text-lg font-bold">Dashboard</p>
        </nav>
        <div className="flex gap-10 p-2 justify-center shadow-xl h-16 items-center">
          <p className="font-bold text-lg">Sedang Disiapkan</p>
          <p className="font-bold text-lg">Selesai</p>
        </div>
        <div className="flex flex-wrap pt-5 px-5 gap-5">
          {arrays.map((_, index) => (
            <OrderItem key={index} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
