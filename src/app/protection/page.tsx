import Image from "next/image";
export default function Protection() {
  return (
    <div className="bg-[url(/pattern.svg)] min-h-screen grid justify-items-center items-center absolute top-0 z-50 min-w-full">
      <div className="flex justify-center items-center gap-5 animate-pulse">
        <Image
          src="/logo.svg"
          alt="icon"
          width={300}
          height={300}
          className="border-8 border-white bg-orange-100 rounded-full shadow-2xl hover:scale-95 hover:shadow-none duration-300"
        />
        <h1 className="text-7xl font-bold text-white">BUBUR NUSANTARA</h1>
      </div>
    </div>
  );
}
