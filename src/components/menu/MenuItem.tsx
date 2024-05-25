import Image from "next/image";

type MenuProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function MenuItem({
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
      className="grid justify-items-center gap-2 border rounded-2xl overflow-hidden shadow-lg cursor-pointer scale-95 hover:scale-100 duration-300"
      onClick={() => {
        setIsOpen(!isOpen), setModalId(menu.id);
      }}
    >
      <div className="md:h-60 overflow-hidden h-40">
        <Image
          src={menu.image}
          alt="menuImage"
          width={300}
          height={300}
          className="object-cover md:h-60 h-40 hover:scale-110 duration-300"
        />
      </div>
      <h1 className="text-lg font-semibold">{menu.name}</h1>
      <p className=" text-primary-orange font-semibold mb-3">
        Rp. {menu.price}
      </p>
    </section>
  );
}
