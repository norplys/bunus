import { VscLoading } from "react-icons/vsc";
import CartItem from "../cart/CartItem";
import formatCurrency from "@/helper/currencyFormatter";
import playAudio from "@/helper/audio/playAudio";
import { use, useEffect } from "react";

export default function CartModalItem({
  data,
  isLoading,
  setNow,
  setIsOpen,
}: {
  data: any;
  isLoading: boolean;
  setNow: (value: string) => void;
  setIsOpen: (value: boolean) => void;
}) {
  useEffect(() => {
    if (data.total === 0 && !isLoading) {
      setIsOpen(false);
    }
  }, [data, isLoading]);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <VscLoading className="animate-spin text-6xl font-bold text-primary-orange" />
        </div>
      ) : data.total ? (
        <div className="bg-blue-50 py-9 ">
          <div className="flex gap-5 justify-center items-start px-3 mx-auto xl:w-[80%] flex-col lg:flex-row">
            <div className="flex-1 grid gap-2 w-full">
              <div className="lg:text-xl text-lg font-bold bg-white rounded-t-xl  p-5 flex justify-between border border-primary-orange">
                <h6>Total Makanan ({data?.items.length})</h6>
              </div>
              {/* Item */}
              <div className="bg-white rounded-b-xl  p-5 grid gap-5 overflow-y-scroll h-96 border border-primary-orange">
                {data?.items.map((item: any, i: any) => {
                  return <CartItem key={i} item={item} />;
                })}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl lg:w-96 p-5 grid gap-5 w-full border border-black">
              <h1 className="text-xl font-bold ">Ringkasan Belanja</h1>
              <div className="text-lg font-semibold flex justify-between border-b border-primary-orange pb-2">
                Total{" "}
                <h6 className="font-bold text-xl">
                  {formatCurrency(data?.total)}
                </h6>
              </div>
              <button
                className="bg-blue-900 text-white font-bold rounded-md md:p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl py-1 text-xl flex justify-center"
                onClick={() => {
                  setNow("type"), playAudio("/audio/sound1.mp3");
                }}
              >
                Lanjut Pilih Tipe Pesanan
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full flex-col gap-2">
          <h6 className="text-2xl font-bold text-primary-orange animate-pulse">
            Mohon Tunggu...
          </h6>
        </div>
      )}
    </>
  );
}
