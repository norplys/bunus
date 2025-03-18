"use client";
import { FaHome } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { CiGift } from "react-icons/ci";
import { HeaderProfile } from "../header/header-profile";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { MdLogin } from "react-icons/md";

const links = [
  {
    name: "Home",
    href: "/",
    icon: <FaHome className="w-6 h-6" />,
  },
  {
    name: "Menu",
    href: "/menu",
    icon: <BiSolidFoodMenu className="w-6 h-6" />,
  },
  {
    name: "Promo",
    href: "/",
    // disabled for now
    icon: <CiGift className="w-6 h-6" />,
  },
];

export function MobileNavbar() {
  const { user } = useAuth();

  return (
    <div className="md:hidden flex bg-foreground sticky bottom-0 py-3 w-full z-40 text-primary-foreground text-xs">
      {links.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex flex-col justify-between items-center w-full h-full gap-1"
        >
          {item.icon}
          <p>{item.name}</p>
        </Link>
      ))}

      {user ? (
        <div className="flex flex-col justify-between items-center w-full h-full gap-1">
          <HeaderProfile />
          <p>Profile</p>
        </div>
      ) : (
        <Link
          href="/login"
          className="flex flex-col justify-between items-center w-full h-full gap-1"
        >
          <MdLogin className="w-6 h-6" />
          Masuk
        </Link>
      )}
    </div>
  );
}
