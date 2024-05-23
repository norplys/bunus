import Image from "next/image";
import playAudio from "@/helper/audio/playAudio";

type MenuProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function MerchantMenuItem({
  menu,
  setIsOpen,
  setModalId,
  isOpen,
}: {
  menu: MenuProps;
  setIsOpen: (value: boolean) => void;
  setModalId: (value: string) => void;
  isOpen: boolean;
}) {
  return (
    <section
      className="grid justify-items-center gap-2 border rounded-2xl overflow-hidden shadow-lg cursor-pointer scale-95 hover:scale-100 duration-300 w-80"
      onClick={() => {
        setIsOpen(!isOpen), setModalId(menu.id), playAudio("/audio/sound5.mp3");
      }}
    >
      <div className="w-full overflow-hidden h-40">
        <Image
          src={menu.image}
          alt="menu1"
          width={260}
          height={300}
          className="object-cover md:h-60 h-40 hover:scale-110 duration-300 w-full"
        />
      </div>
      <h1 className="text-xl font-semibold border-b-2 border-primary-orange pb-2 px-2">
        {menu.name}
      </h1>
      <p className="font-semibold mb-3 text-lg">Rp. {menu.price}</p>
    </section>
  );
}
