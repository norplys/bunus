import Link from "next/link";
const linkArray = [
  { href: "/cashier/login", label: "Cashier" },
  { href: "/kitchen/login", label: "Kitchen" },
  { href: "/merchant/login", label: "Merchant" },
];
export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden flex-col bg-[url(/pattern.svg)]  bg-cover">
      <h1 className="text-4xl font-bold text-center pb-5 ">Login</h1>
      <div className="grid gap-5 pt-5">
        {linkArray.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-2 py-1 font-semibold text-2xl text-center border rounded-lg bg-orange-200 hover:scale-105 duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
