import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <section className="w-screen flex min-h-screen">
      <nav className="flex flex-col bg-primary-orange p-2 gap-5">
        <div className="flex gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="h-16 w-16 rounded-full"
          />
          <h1 className="text-xl flex items-center font-bold text-white">
            BUBUR NUSANTARA
          </h1>
        </div>
        <Link
          href="/dashboard"
          className="text-center text-lg text-white border-t-2 border-orange-300 pt-3"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard"
          className="text-center text-lg text-white border-t-2 border-orange-300 pt-3"
        >
          Setting
        </Link>
        <Link
          href="/dashboard"
          className="text-center text-lg text-white border-t-2 border-orange-300 pt-3"
        >
          LogOut
        </Link>
      </nav>
      <div className="flex-1 w-full">
        <nav className="w-full bg-primary-orange h-24 p-2 flex justify-end items-center">
          <p className="text-white text-lg font-bold">Halo, Admin</p>
        </nav>
        <div className="flex"></div>
      </div>
    </section>
  );
}
