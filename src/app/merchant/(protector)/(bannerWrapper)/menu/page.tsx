"use client";

import DetailModal from "@/components/menu/detail-modal";
import { useCategories } from "@/lib/hooks/query/use-categories";
import { useUser } from "@/lib/context/user-context";
import LoadingImage from "@/components/loading-image";
import { useState, useRef, useEffect } from "react";
import { useCartNotif } from "@/lib/hooks/query/use-cart-notif";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import CartModal from "@/components/merchant/cart-modal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMenuData } from "@/lib/hooks/query/use-menu-data";
import MerchantMenuItem from "@/components/merchant/merchant-menu-item";

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
  useEffect(() => {
    const viewportmeta = document.querySelector('meta[name="viewport"]');

    if (viewportmeta instanceof HTMLMetaElement) {
      viewportmeta.content =
        "width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0";
    }
  }, []);

  const { token } = useUser();

  const [open, setOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const modalId = useRef("");

  const [category, setCategory] = useState<string>(
    "f338198b-9eee-43fc-a496-f99b0fd2cb67",
  );

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const pathname = usePathname();

  const { push } = useRouter();

  const { data, isLoading } = useCategories();

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

  const { data: notifData, isLoading: cartLoading } = useCartNotif(token);

  const { data: itemData, isLoading: itemLoading } = useMenuData(category);

  const categories = data?.data;
  const notif = notifData?.data;
  const menuData = itemData?.data;

  return (
    <section className="bg-white z-0 mt-28 pb-32">
      <ul className="flex flex-wrap py-2 shadow-lg gap-x-3 gap-y-2 justify-center items-center">
        {isLoading ? (
          <LoadingImage />
        ) : (
          categories?.map((categoryItem: CategoryProps, i: number) => {
            return (
              <li
                key={i}
                className={`font-extrabold text-2xl  px-2 py-1 rounded-xl bg-orange-100 ${category === categoryItem.id && "text-white bg-orange-700 underline"} duration-300`}
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
      <div className="flex flex-wrap justify-center items-center pt-5">
        {itemLoading ? (
          <LoadingImage />
        ) : (
          menuData?.map((menu: MenuProps, i: number) => {
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
        className="fixed bottom-5 right-20 flex gap-5 w-[80%] bg-orange-950 h-20 rounded-xl items-center p-5 text-white text-2xl justify-between"
        onClick={() => setCartOpen(true)}
        disabled={notif === 0}
      >
        <div className="flex items-center justify-center gap-2">
          <FaShoppingCart />
          <p className="font-bold">{cartLoading ? "" : notif}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="font-bold">Buat Pesanan</p>
          <FaArrowRight />
        </div>
      </button>
      <DetailModal isOpen={open} setIsOpen={setOpen} id={modalId} />
      <CartModal isOpen={cartOpen} setIsOpen={setCartOpen} />
    </section>
  );
}
