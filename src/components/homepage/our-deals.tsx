import Link from "next/link";

export function OurDeals() {
  return (
    <section className="layout mt-10">
      <div className="flex justify-between items-center">
        <h1 className="title">Cek Promo Kami !</h1>{" "}
        <Link className="hover:text-accent duration-300" href={"/deals"}>
          Lihat semua
        </Link>
      </div>
      <div className="mt-10 min-h-64">
        <p className="text-md">Belum Ada Promo Saat Ini</p>
      </div>
    </section>
  );
}
