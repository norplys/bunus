import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navArray = [
  {
    name: "Order",
    path: "/cashier/dashboard",
  },
  {
    name: "Menu",
    path: "/cashier/menu",
  },
  {
    name: "Analytics",
    path: "/cashier/analytics",
  },
];

export default function SideBarAdmin() {
  const pathname = usePathname();
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
      <section className="flex flex-col gap-2">
        {navArray.map((nav, i) => (
          <Link
            href={nav.path}
            key={i}
            className={`${
              pathname.includes(nav.path) ? "bg-orange-400" : ""
            } p-3 rounded-md text-white text-lg duration-300 text-center`}
          >
            {nav.name}
          </Link>
        ))}
      </section>
    </nav>
  );
}
