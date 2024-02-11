import MenuItem from "./MenuItem"

export default function Category () {
    return (
        <section className="grid justify-items-center gap-4 mx-2">
            <h1 className="font-extrabold text-xl">Category Title</h1>
            <section className="flex flex-wrap gap-6 justify-center items-center">
            <MenuItem />
            <MenuItem />
            <MenuItem />
            </section>
        </section>
    )
}