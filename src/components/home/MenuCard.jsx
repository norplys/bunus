export default function MenuCard({ menu }) {
    return (
        <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
            <Image
            src={menu.image}
            width={500}
            height={500}
            className="object-cover"
            ></Image>
        </div>
        <h1 className="font-bold text-2xl">{menu.name}</h1>
        <div className="text-center">{menu.description}</div>
        <div className="text-center">Rp. {menu.price}</div>
        <button className="py-2 px-4 font-bold rounded-xl mt-2 w-fit bg-primary-red shadow-xl text-white text-xl">
            Pesan Sekarang !
        </button>
        </div>
    );
}
