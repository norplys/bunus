import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SideBarAdmin() {
  const [now, setNow] = useState("dashboard");
  return (
    <nav className="flex flex-col p-2 shadow-2xl bg-primary-orange min-h-screen fixed top-0">
      <div className="flex gap-2 py-2">
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          className="h-16 w-16 rounded-full"
        />
        <h1 className="text-xl flex items-center font-bold text-white  ">
          BUBUR NUSANTARA
        </h1>
      </div>
      <Link
        href="/admin/dashboard"
        onClick={() => setNow("dashboard")}
        className={`text-center text-lg text-white  border-t-2 border-orange-300 py-5 ${now === "dashboard" ? "bg-orange-400" : ""}`}
      >
        Dashboard
      </Link>
      <Link
        href="/admin/menu"
        onClick={() => setNow("menu")}
        className={`text-center text-lg text-white  border-t-2 border-orange-300 py-5 ${now === "menu" ? "bg-orange-400" : ""}`}
      >
        Menu
      </Link>
      <Link
        href="/admin/analytics"
        onClick={() => setNow("analytics")}
        className={`text-center text-lg text-white  border-t-2 border-orange-300 py-5 ${now === "analytics" ? "bg-orange-400" : ""}`}
      >
        Analytics
      </Link>
    </nav>
  );
}
