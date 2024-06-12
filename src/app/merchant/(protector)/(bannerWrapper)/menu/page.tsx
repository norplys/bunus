"use client";

import DetailModal from "@/components/menu/DetailModal";
import { useCategoriesData } from "@/helper/hooks/useCategoryData";
import { useUser } from "@/helper/context/userContext";
import LoadingImage from "@/components/LoadingImage";
import { useState, useRef, useEffect } from "react";
import { useCartNotif } from "@/helper/hooks/useCartNotif";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import CartModal from "@/components/merchant/CartModal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCategoriesMenus } from "@/helper/hooks/useMenusData";
import MerchantMenuItem from "@/components/merchant/MerchantMenuItem";

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

export default function MerchantMenu() {
  const { token } = useUser();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const modalId = useRef("");
  const [category, setCategory] = useState<string>(
    "f338198b-9eee-43fc-a496-f99b0fd2cb67",
  );
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { push } = useRouter();
  // const { data, isLoading } = useCategoriesData();
  const setModalId = (id: string) => {
    modalId.current = id;
  };
  const createQueryString = (name: string, value: string) => {
    params.set(name, value);
    return params.toString();
  };
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCategory(category.toLocaleLowerCase());
    }
  }, [searchParams]);
  useEffect(() => {
    push(pathname + "?" + createQueryString("category", category));
  }, [category]);

  const { data: notif, isLoading: cartLoading } = useCartNotif(token);
  const { data: itemData, isLoading: itemLoading } =
    useCategoriesMenus(category);
  return (
    <section className="bg-white overflow-auto z-0 mt-28 pb-20">
      {/* <div className="w-screen overflow-x-scroll shadow-lg">
        <ul className="flex gap-5 w-max py-2 shadow-lg px-1">
          {isLoading ? (
            <LoadingImage />
          ) : (
            data.map((categoryItem: CategoryProps, i: number) => {
              return (
                <li
                  key={i}
                  className={`font-extrabold text-2xl ${category === categoryItem.id && "text-primary-orange underline"} duration-300`}
                  onClick={() => {
                    setCategory(categoryItem.id);
                  }}
                >
                  {categoryItem.name.toLocaleUpperCase()}
                </li>
              );
            })
          )}
        </ul>
      </div> */}
      <div className="flex flex-wrap justify-center items-center pt-5">
        {itemLoading ? (
          <LoadingImage />
        ) : (
          itemData.map((menu: MenuProps, i: number) => {
            return (
              <MerchantMenuItem
                key={i}
                menu={menu}
                setIsOpen={setOpen}
                setModalId={setModalId}
                isOpen={open}
              />
            );
          })
        )}
      </div>
      <button
        className="fixed bottom-5 right-20 flex gap-5 w-[80%] bg-orange-400 h-20 rounded-xl items-center p-5 text-white text-2xl justify-between"
        onClick={() => setCartOpen(true)}
        disabled={notif === 0}
      >
        <div className="flex items-center justify-center gap-2">
          <FaShoppingCart />
          <p className="font-bold">{cartLoading ? "" : notif}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="font-bold">Lihat Keranjang</p>
          <FaArrowRight />
        </div>
      </button>
      <DetailModal isOpen={open} setIsOpen={setOpen} id={modalId} />
      <CartModal isOpen={cartOpen} setIsOpen={setCartOpen} />
    </section>
  );
}
