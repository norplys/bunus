import Image from "next/image";
import Link from "next/link";

export default function SideBarAdmin() {
  return (
    <nav className="flex flex-col p-2 gap-5 shadow-2xl bg-primary-orange">
      <div className="flex gap-2">
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
      <Link
        href="/dashboard"
        className="text-center text-lg text-white  border-t-2 border-orange-300 pt-3"
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard"
        className="text-center text-lg  text-white  border-t-2 border-orange-300 pt-3"
      >
        Setting
      </Link>
      <Link
        href="/dashboard"
        className="text-center text-lg text-white  border-t-2 border-orange-300 pt-3"
      >
        LogOut
      </Link>
    </nav>
  );
}
