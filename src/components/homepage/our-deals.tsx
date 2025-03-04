import Link from "next/link";

export function OurDeals() {
  return (
    <section className="layout md:mt-30 mt-10">
      <div className="flex justify-between items-center">
        <h1 className="title">Cek Promo Kami !</h1>{" "}
        <Link
          className="hover:text-accent duration-300 hidden md:block"
          href={"/deals"}
        >
          Lihat semua
        </Link>
      </div>
      <div className="md:mt-10 mt-5 md:min-h-64 min-h-32">
        <p className="md:text-md text-xs">Belum Ada Promo Saat Ini</p>
      </div>
    </section>
  );
}
