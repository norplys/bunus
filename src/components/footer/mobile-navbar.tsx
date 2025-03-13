import { FaHome } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { CiGift } from "react-icons/ci";
import { HeaderProfile } from "../header/header-profile";
import Link from "next/link";

const links = [
  {
    name: "Home",
    href: "/",
    icon: <FaHome className="w-8 h-8" />,
  },
  {
    name: "Menu",
    href: "/menu",
    icon: <BiSolidFoodMenu className="w-8 h-8" />,
  },
  {
    name: "Promo",
    href: "/deals",
    icon: <CiGift className="w-8 h-8" />,
  },
  {
    name: "Profile",
    href: "/",
    icon: <HeaderProfile />,
  },
];

export function MobileNavbar() {
  return (
    <div className="md:hidden flex bg-foreground sticky bottom-0 py-3 w-full z-40 text-primary-foreground">
      {links.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex flex-col justify-between items-center w-full h-full gap-1"
        >
          {item.icon}
          <p className="text-xs">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}
