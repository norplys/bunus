"use client";
import Link from "next/link";
import { useUser } from "@/helper/context/userContext";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useCartNotif } from "@/helper/hooks/useCartNotif";

export default function Navbar() {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  const { data, isLoading } = useCartNotif(token);
  const { push } = useRouter();
  const { user, setUser } = useUser();
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    push("/");
  };
  return (
    <div className="navbar w-full bg-opacity-5 backdrop-blur-3xl flex sticky top-0 z-10 shadow-xl min-h-16">
      <div className="flex mx-auto justify-between items-center  w-full max-w-7xl min-h-full py-5">
        <Link href={"/"} className="text-black font-bold text-lg">
          BUBUR NUSANTARA
        </Link>
        <nav>
          <ul className="text-black flex gap-4">
            <Link href={"/menu"}>Menu</Link>
            <a href="#testimoni">Testimoni</a>
            <Link href={"/"}>Promo</Link>
          </ul>
        </nav>
        <div>
          {user ? (
            <div className="flex gap-5 justify-center items-center">
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
              className="border border-primary-cyan font-bold text-primary-cyan px-4 py-1 rounded-md hover:text-white hover:bg-primary-cyan duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
