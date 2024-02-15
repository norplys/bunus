import MenuItem from "./MenuItem"
import { useCategoriesMenus } from "@/helper/hooks/useMenusData"

type CategoryProps = {
    id : string,
    name : string,
}

type MenuProps = {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
}

export default function Category ({category}: {category: CategoryProps}) {
    const {data, isLoading} = useCategoriesMenus(category?.id);
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <section className="grid justify-items-center gap-4 mx-2">
            <h1 className="font-extrabold text-xl">{category.name.toUpperCase()}</h1>
            <section className="flex flex-wrap gap-6 justify-center items-center">
            {
                data?.map((menu : MenuProps, i : number) => {
                    return (
                        <MenuItem key={i} menu={menu}/>
                    )
                })
            }
            </section>
        </section>
    )
}