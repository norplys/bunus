import MenuItem from "./menu-item";
import { useMenuData } from "@/lib/hooks/query/use-menu-data";
import MenuLoading from "../cashier/menu-loading";

type CategoryProps = {
  id: string;
  name: string;
};

type MenuProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const LoadingArray = new Array(3).fill(0);

export default function Category({
  category,
  setIsOpen,
  setModalId,
  isOpen,
}: {
  category: CategoryProps;
  setIsOpen: (value: boolean) => void;
  setModalId: (value: string) => void;
  isOpen: boolean;
}) {
  const { data, isLoading } = useMenuData(category?.id);

  const menus = data?.data;

  return (
    <section className="grid justify-items-center gap-4 mx-2">
      <h1 className="font-extrabold md:text-xl text-lg">
        {category.name.toUpperCase()}
      </h1>
      <section className="flex flex-wrap gap-6 justify-center items-center">
        {isLoading
          ? LoadingArray.map((item, i) => <MenuLoading key={i} />)
          : menus?.map((menu: MenuProps, i: number) => {
              return (
                <MenuItem
                  key={i}
                  menu={menu}
                  setIsOpen={setIsOpen}
                  setModalId={setModalId}
                  isOpen={isOpen}
                />
              );
            })}
      </section>
    </section>
  );
}
