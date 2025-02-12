"use client";

import Link from "next/link";
import { Logo } from "../common/placeholder";
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-primary-foreground/70">
      <div className="layout flex w-full justify-between items-center gap-4 p-4 md:gap-8">
        <Logo text={true} clickable={true} />
        <nav className="flex gap-5">
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
              className="flex items-center gap-1 bg-accent p-2 rounded-md cursor-pointer text-primary"
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
    <li className="flex items-center text-primary">
      <Link href={href}>
        <p>{name}</p>
      </Link>
    </li>
  );
}
