import Image from "next/image";
export default function MenuCard() {
  return (
    <div className="grid justify-items-center shadow-lg justify-between min-w-80 max-w-96 rounded-xl overflow-hidden scale-95 hover:scale-100 duration-300 hover:shadow-2xl gap-3">
      <div className="overflow-hidden w-full">
        <Image
          src="https://res.cloudinary.com/dpg0tbbot/image/upload/v1704978248/bunus/rcqltvzeguzxmldbamko.webp"
          width={100}
          height={100}
          className="object-cover w-full max-h-52"
          alt="Menu"
        ></Image>
      </div>
      <h1 className="font-bold text-xl">Bubur Ayam Kampung</h1>
      <p className="text-justify font-light text-slate-500 p-5">Bubur dengan daging ayam pilihan ditambah cakwe, dibalur dengan minyak wijen impor yang spesial dibuat di Malaysia menghasilkan bubur yang bukan hanya mengenyangkan, tetapi juga bermakna di hati</p>
    </div>
  );
}
