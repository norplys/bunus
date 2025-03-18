"use client";

import { useAuth } from "@/lib/context/auth-context";
import { Menu } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { LazyImage } from "../ui/lazy-image";

export function HeaderProfile() {
  const { user, handleLogout } = useAuth();

  const { image } = user || {};

  return (
    <Menu className="relative" as="div">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center gap-2 md:py-2">
            {image ? (
              <LazyImage
                src={image}
                alt="Profile picture"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <RxAvatar className="md:w-8 md:h-8 w-6 h-6" />
            )}
          </Menu.Button>
          <AnimatePresence mode="wait">
            {open && (
              <Menu.Items
                as="ul"
                className="absolute right-10 bottom-0 md:bottom-auto md:right-0 flex flex-col gap-2 bg-foreground rounded-md shadow-lg px-5 py-2"
              >
                <MenuItem name="Profile" href="/profile" />
                <MenuItem name="Logout" href="/" onClick={handleLogout} />
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}

type MenuItemProps = {
  name: string;
  href: string;
  onClick?: () => void;
};

function MenuItem({ name, href, onClick }: MenuItemProps) {
  return (
    <Menu.Item as="li">
      <Link href={href} onClick={onClick}>
        {name}
      </Link>
    </Menu.Item>
  );
}
