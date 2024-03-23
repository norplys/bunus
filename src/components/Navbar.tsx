"use client";
import Link from "next/link";
import { useUser } from "@/helper/context/userContext";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useCartNotif } from "@/helper/hooks/useCartNotif";
import { Menu } from "@headlessui/react";
import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpoon } from "react-icons/fa6";
import { TbGrillFork } from "react-icons/tb";
import { useEffect } from "react";

export default function Navbar() {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useCartNotif(token);
  const { push } = useRouter();
  const { user, setUser } = useUser();
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    push("/");
  };
  return (
    <div className="navbar w-full bg-opacity-5 backdrop-blur-3xl flex fixed top-0 z-10 shadow-xl min-h-16 px-5 md:px-2">
      <div className="flex mx-auto justify-between items-center  w-full max-w-7xl min-h-full py-5">
        <Link href={"/"} className="text-black font-bold text-lg">
          BUBUR NUSANTARA
        </Link>
        <nav>
          <ul className="text-black flex gap-4">
            <Link
              href={"/menu"}
              className="hover:-translate-y-1 duration-300 md:block hidden"
            >
              Menu
            </Link>
            <a
              href="#testimoni"
              className="hover:-translate-y-1 duration-300 md:block hidden"
            >
              Testimoni
            </a>
          </ul>
        </nav>
        <div>
          {user ? (
            <div className="hidden md:flex gap-5 justify-center items-center">
              <p className="font-bold text-primary-orange">Halo, {user.name}</p>
              <button
                onClick={logOut}
                className="border border-primary-red font-bold text-primary-red px-4 py-1 rounded-md hover:text-white hover:bg-primary-red duration-300"
              >
                Keluar
              </button>
              <Link
                href={"/cart"}
                className="relative bg-primary-cyan rounded-full p-2"
              >
                {isLoading ? (
                  ""
                ) : (
                  <div className="rounded-full w-4 h-4 text-center bg-primary-red absolute -right-1 -top-1 text-xs text-white font-bold">
                    {data}
                  </div>
                )}
                <FaShoppingCart className="text-md text-white" />
              </Link>
              <Link href={"/profile"}>
                <CgProfile className="text-3xl" />
              </Link>
            </div>
          ) : (
            <Link
              href={"/login"}
              className="border border-primary-cyan font-bold text-primary-cyan px-4 py-1 rounded-md hover:text-white hover:bg-primary-cyan duration-300 hidden md:block"
            >
              Login
            </Link>
          )}
          <Menu>
            <Menu.Button onClick={() => setOpen(!open)} className="md:hidden">
              <div className="relative w-9 h-9">
                <FaSpoon
                  className={`text-2xl  top-1 absolute -right-1 ${open ? "rotate-0 right-0" : "-rotate-45"} duration-300`}
                />
                <TbGrillFork
                  className={`text-3xl  absolute top-0 -left-1 ${open ? "rotate-0 left-1" : "rotate-45"} duration-300`}
                />
              </div>
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className="absolute right-0 top-16 w-40 bg-white shadow-md rounded-md p-3 flex flex-col gap-2 md:hidden"
                  static
                  initial={{ scale: 0, rotate: -360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -360 }}
                  as={motion.div}
                >
                  {user ? (
                    <div className="flex gap-3 items-center flex-col">
                      <p className="font-bold text-primary-orange">
                        Halo, {user.name}
                      </p>
                      <Link href={"/menu"}>Menu</Link>
                      <Link href={"/#testimoni"}>Testimoni</Link>
                      <button
                        onClick={logOut}
                        className="border border-primary-red font-bold text-primary-red px-4 py-1 rounded-md hover:text-white hover:bg-primary-red duration-300"
                      >
                        Keluar
                      </button>
                      <Link
                        href={"/cart"}
                        className="relative bg-primary-cyan rounded-full p-2"
                      >
                        {isLoading ? (
                          ""
                        ) : (
                          <div className="rounded-full w-4 h-4 text-center bg-primary-red absolute -right-1 -top-1 text-xs text-white font-bold">
                            {data}
                          </div>
                        )}
                        <FaShoppingCart className="text-md text-white" />
                      </Link>
                      <Link href={"/profile"}>
                        <CgProfile className="text-3xl" />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={"/login"}
                      className="border border-primary-cyan font-bold text-primary-cyan px-4 py-1 rounded-md hover:text-white hover:bg-primary-cyan duration-300 text-center"
                    >
                      Login
                    </Link>
                  )}
                </Menu.Items>
              )}
            </AnimatePresence>
          </Menu>
        </div>
      </div>
    </div>
  );
}
