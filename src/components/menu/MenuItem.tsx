import Image from "next/image"

export default function MenuItem() {
    return (
    <section className="grid justify-items-center gap-2 border rounded-2xl overflow-hidden shadow-lg">
        <div className="h-60 overflow-hidden"><Image src="https://res.cloudinary.com/dpg0tbbot/image/upload/v1704978248/bunus/rcqltvzeguzxmldbamko.webp" alt="menu1" width={300} height={300} className="object-cover h-60 hover:scale-110 duration-300" /></div>
        <h1 className="text-lg font-semibold">Menu 1</h1>
        <p className=" text-primary-orange font-semibold">Rp. 25000</p>
        <p className="text-sm">Deskripsi</p>
        <button className="py-1 px-3 font-bold rounded-xl mb-4 w-fit bg-primary-red text-white text-lg">Pesan Sekarang</button>
    </section>
    )
}