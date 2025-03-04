import { FaHome } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { CiGift } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";

const links = [
  {
    name: "Home",
    href: "/",
    icon: <FaHome />,
  },
  {
    name: "Menu",
    href: "/menu",
    icon: <BiSolidFoodMenu />,
  },
  {
    name: "Promo",
    href: "/deals",
    icon: <CiGift className="text-lg" />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <RxAvatar className="text-lg" />,
  },
];

export function MobileNavbar() {
  return (
    <div className="md:hidden flex justify-between items-center bg-foreground sticky bottom-0 py-3 w-full z-40 text-primary-foreground">
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
