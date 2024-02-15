import Link from "next/link";
export default function Navbar() {
  return (
    <div className="navbar w-full bg-opacity-5 backdrop-blur-3xl flex sticky top-0 z-10 shadow-xl">
      <div className="flex mx-auto justify-between items-center  w-full max-w-7xl min-h-full py-5">
        <Link href={"/"} className="text-black font-bold text-lg">BUBUR NUSANTARA</Link>
        <nav>
          <ul className="text-black flex gap-4">
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/'}>Services</Link>
            <Link href={'/'}>Promo</Link>
          </ul>
        </nav>
        <div>
            <Link href={"/login"} className="border border-primary-cyan font-bold text-primary-cyan px-4 py-1 rounded-md hover:text-white hover:bg-primary-cyan duration-300">Login</Link>
        </div>
      </div>
    </div>
  );
}
