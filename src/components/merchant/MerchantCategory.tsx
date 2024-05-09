import MerchantMenuItem from "./MerchantMenuItem";
import { useCategoriesMenus } from "@/helper/hooks/useMenusData";
import MenuLoading from "../cashier/MenuLoading";

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

export default function MerchantCategory({
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
  const { data, isLoading } = useCategoriesMenus(category?.id);
  return (
    <section className="grid justify-items-center gap-4 mx-2">
      <h1 className="font-extrabold text-xl">{category.name.toUpperCase()}</h1>
      <section className="flex flex-wrap justify-center items-center">
        {isLoading
          ? LoadingArray.map((item, i) => <MenuLoading key={i} />)
          : data?.map((menu: MenuProps, i: number) => {
              return (
                <MerchantMenuItem
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