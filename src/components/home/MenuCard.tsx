import Image from "next/image";
import BottomSlide from "@/helper/animation-framer/BottomSlide";
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
          className="object-cover w-full h-52"
          alt="Menu"
        ></Image>
      </div>
      <h1 className="font-bold text-xl">{menu.name}</h1>
      <p className="text-justify font-light text-slate-500 p-5">{menu.desc}</p>
    </BottomSlide>
  );
}
