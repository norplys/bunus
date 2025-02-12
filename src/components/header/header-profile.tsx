import { useAuth } from "@/lib/context/auth-context";
import { Menu } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LazyImage } from "../ui/lazy-image";

export function HeaderProfile() {
  const { user, handleLogout } = useAuth();

  const { name, image, email } = user || {};

  return (
    <Menu className="relative" as="div">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center gap-2">
            <LazyImage
              src={image ?? "/images/default-profile.jpg"}
              alt={name as string}
              width={32}
              height={32}
            />
            <span className="text-primary">Hello, {name}</span>
          </Menu.Button>
          <AnimatePresence mode="wait">
            {open && (
              <Menu.Items
                as="ul"
                className="absolute right-0 flex flex-col gap-2 p-2 bg-white rounded-md shadow-lg"
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
        <i>{name}</i>
      </Link>
    </Menu.Item>
  );
}
