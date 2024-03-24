import Image from "next/image";
export default function Protector() {
  return (
    <div className="bg-[url(/pattern.svg)] h-screen grid justify-items-center items-center absolute top-0 left-0 w-screen z-30">
      <div className="flex justify-center items-center gap-5 animate-pulse">
        <Image
          src="/logo.svg"
          alt="icon"
          width={300}
          height={300}
          className="w-24 h-24 border-8 border-white bg-orange-100 rounded-full shadow-2xl hover:scale-95 hover:shadow-none duration-300 md:w-52 md:h-52 xl:w-80 xl:h-80"
        />
        <h1 className="xl:text-7xl font-bold text-white md:text-5xl text-xl">
          BUBUR NUSANTARA
        </h1>
      </div>
    </div>
  );
}
