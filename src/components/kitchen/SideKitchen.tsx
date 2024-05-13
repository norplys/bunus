import Image from "next/image";

export default function SideKitchen() {
  return (
    <div className="hidden xl:flex items-center justify-center gap-2 xl:flex-1 bg-orange-400 xl:min-h-screen md:w-screen px-2 py-2">
      <Image
        src="/logo.svg"
        alt="logo"
        width={300}
        height={300}
        className="object-cover duration-300 rounded-full animate-spin-slow w-60 xl:w-72"
      />
      <h1 className="xl:text-5xl font-extrabold text-white md:text-4xl">
        BUBUR NUSANTARA
        <p className="text-xs md:text-lg text-end">Kitchen</p>
      </h1>
    </div>
  );
}
