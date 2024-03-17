import Image from "next/image";
import SlideIn from "@/helper/animation-framer/SlideIn";
import Link from "next/link";
export default function Intro() {
  return (
    <SlideIn>
      <div className="flex min-w-full items-center justify-center xl:gap-52 py-8 md:gap-10">
        <div className=" grid gap-2">
          <h1 className="font-bold xl:text-6xl md:text-4xl">
            Selamat Datang !
          </h1>
          <div className="mt-2 text-lg">
            Laper ?? Tapi bingung mau makan apa ? <br />
            Bubur Nusantara jawabannya !
          </div>
          <Link
            href="/menu"
            className="py-2 px-4 font-bold rounded-xl mt-2 w-fit bg-primary-red shadow-xl text-white xl:text-xl md:text-lg scale-95 hover:scale-100 duration-300 hover:shadow-2xl"
          >
            Pesan Sekarang !
          </Link>
        </div>
        <div className="overflow-hidden rounded-full border-primary-orange border-4 border-dashed shadow-2xl hover:scale-95 hover:shadow-none duration-300">
          <Image
            src={"/logo.svg"}
            width={400}
            height={400}
            className="object-cover xl:w-96 animate-spin-slow md:w-72"
            alt="logo"
          ></Image>
        </div>
      </div>
    </SlideIn>
  );
}
