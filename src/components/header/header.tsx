"use client";

import Link from "next/link";
import { Logo } from "../common/logo";
import { HeaderProfile } from "./header-profile";
import { useAuth } from "@/lib/context/auth-context";
import { MdLogin } from "react-icons/md";

const headerNavList = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Testimony", href: "/testimony" },
  { name: "Contact Us", href: "/contact-us" },
];

export function Header() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 w-full z-40 backdrop-blur-md bg-primary/70 text-primary-foreground md:h-20 flex items-center">
      <div className="layout flex w-full justify-between items-center gap-4 p-4 md:gap-8">
        <Logo text={true} clickable={true} />
        <nav className="hidden md:flex gap-5">
          <ul className="flex gap-4">
            {headerNavList.map((navItem, index) => (
              <NavItem key={index} {...navItem} />
            ))}
          </ul>
          {user ? (
            <HeaderProfile />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 bg-accent p-2 rounded-md cursor-pointer"
            >
              <MdLogin />
              Masuk
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

type NavItemProps = {
  name: string;
  href: string;
};

function NavItem({ name, href }: NavItemProps) {
  return (
    <li className="flex items-center">
      <Link href={href}>
        <p>{name}</p>
      </Link>
    </li>
  );
}
