import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
export default function DetailModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
const [count, setCount] = useState(0);
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className="fixed inset-1 flex justify-center items-center"
    >
      <Dialog.Panel className="bg-white p-5 z-30 rounded-xl grid justify-items-center gap-5">
        <Dialog.Title>
          <h1 className="text-xl font-bold">Menu Title</h1>
        </Dialog.Title>
        <div className="flex gap-5">
          <div className="overflow-hidden h-60 rounded-2xl">
            <Image
              src="https://res.cloudinary.com/dpg0tbbot/image/upload/v1704978248/bunus/rcqltvzeguzxmldbamko.webp"
              alt="menu1"
              width={300}
              height={300}
              className="object-cover hover:scale-110 duration-300 h-60"
            />
          </div>
          <Dialog.Description>
            <p className="overflow-y-auto text-justify text-sm w-72 border border-primary-orange h-full rounded-2xl p-2 bg-orange-50">
              Deskripsi Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Eligendi magnam odio, doloribus nemo error quod quia
              architecto ex mollitia aperiam cum inventore expedita perspiciatis
              eum illum temporibus consectetur beatae asperiores?
            </p>
          </Dialog.Description>
          '
        </div>
        <div className="w-full grid grid-rows-1 grid-cols-2">
        <p className="text-xl font-semibold flex text-orange-600">Rp. 25000<p className="text-xs flex items-end">/pcs</p></p>
        <p className="text-orange-600 font-semibold text-xl">Total : Rp. {count * 25000}</p>
        </div>
        <div className="flex gap-5 justify-beetween items-center">
          <button className="text-xl bg-primary-orange text-white p-1 rounded-full" onClick={() => count > 0 ? setCount(count - 1) : setCount(count)}>
            -
          </button>
          <div className="flex items-center p-1 font-bold">{count}</div>
          <button className="text-xl bg-primary-orange text-white p-1 rounded-full" onClick={() => setCount(count + 1)}>+</button>
        </div>
        <button className="py-1 px-3 font-bold rounded-xl mb-4 w-fit bg-primary-red text-white text-lg hover:bg-red-300 duration-300">
          Tambahkan Ke Keranjang
        </button>
      </Dialog.Panel>
      <div className="fixed inset-0 bg-black/70 z-20" aria-hidden="true" />
    </Dialog>
  );
}
