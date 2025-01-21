import Image from "next/image";
import BottomSlide from "@/lib/animation-framer/bottom-slide";
export default function MenuCard({
  menu,
}: {
  menu: { name: string; desc: string; image: string };
}) {
  return (
    <BottomSlide
      design="flex flex-col justify-beetwen shadow-lg max-w-96  rounded-xl overflow-hidden scale-95 hover:scale-100 duration-300 hover:shadow-2xl gap-3 items-center"
      delay={0}
    >
      <div className="overflow-hidden w-full">
        <Image
          src={menu.image}
          width={100}
          height={100}
          className="object-cover w-full xl:h-52 h-32"
          alt="Menu"
        ></Image>
      </div>
      <h1 className="font-bold xl:text-xl md:text-lg">{menu.name}</h1>
      <p className="text-justify font-light text-slate-500 p-5 md:text-xs xl:text-base">
        {menu.desc}
      </p>
    </BottomSlide>
  );
}
