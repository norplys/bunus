import Image from "next/image";
export default function MenuCard() {
  return (
    <div className="flex flex-col items-center shadow-lg justify-between min-w-80 max-w-96 rounded-lg overflow-hidden scale-95 hover:scale-100 duration-300 hover:shadow-2xl">
      <div className="overflow-hidden w-full h-[30%]">
        <Image
          src="https://res.cloudinary.com/dpg0tbbot/image/upload/v1704978248/bunus/rcqltvzeguzxmldbamko.webp"
          width={100}
          height={100}
          className="object-cover w-full max-h-52"
          alt="Menu"
        ></Image>
      </div>
      <h1 className="font-bold text-xl">Bubur Ayam Kampung</h1>
      <p className="text-center font-light text-slate-500 p-2">Bubur dengan daging ayam pilihan ditambah cakwe, dibalur dengan minyak wijen impor yang spesial dibuat di Malaysia menghasilkan bubur yang bukan hanya mengenyangkan, tetapi juga bermakna di hati</p>
      <div className="text-center font-bold text-lg text-primary-orange">Rp. 100000</div>
      <button className="py-1 px-3 font-bold rounded-xl mb-4 w-fit bg-primary-red  text-white text-lg">
        Pesan Sekarang !
      </button>
    </div>
  );
}
