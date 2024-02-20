import Image from "next/image";

export default function SideLogo() {
  return (
    <div className="flex items-center justify-center gap-2 flex-1 bg-orange-400 min-h-screen">
      <Image
        src="./logo.svg"
        alt="logo"
        width={350}
        height={350}
        className="object-cover duration-300 rounded-full animate-spin-slow"
      />
      <h1 className="text-5xl font-extrabold text-white">BUBUR NUSANTARA</h1>
    </div>
  );
}
