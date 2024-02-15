import Image from "next/image"

type MenuProps = {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
}


export default function MenuItem({menu} : {menu: MenuProps}) {
    return (
    <section className="grid justify-items-center gap-2 border rounded-2xl overflow-hidden shadow-lg">
        <div className="h-60 overflow-hidden"><Image src={menu.image} alt="menu1" width={300} height={300} className="object-cover h-60 hover:scale-110 duration-300" /></div>
        <h1 className="text-lg font-semibold">{menu.name}</h1>
        <p className=" text-primary-orange font-semibold mb-3">Rp. {menu.price}</p>
    </section>
    )
}