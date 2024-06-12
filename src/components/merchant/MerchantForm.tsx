"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import playAudio from "@/helper/audio/playAudio";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@/helper/context/userContext";
import { VscLoading } from "react-icons/vsc";

export default function MerchantForm({
  type,
  data,
}: {
  data: any;
  type: string | null;
}): JSX.Element {
  const { token } = useUser();
  const { register, handleSubmit, setFocus } = useForm();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    if (type) {
      setFocus("table");
    }
  }, [type]);
  const handleCheckout = async (formData: any) => {
    try {
      setLoading(true);
      const items = data?.items.map((item: any) => {
        return {
          menuId: item.menu.id,
          quantity: item.quantity,
          total: item.total,
        };
      });
      if (!items.length) {
        setLoading(false);
        return;
      }
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders`,
        {
          total: data?.total,
          items,
          merchant: "PUSAT",
          table: formData.table ? Number(formData.table) : null,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await toast.promise(
        res,
        {
          loading: "Mohon Tunggu...",
          success: "Berhasil Checkout !",
          error: "Gagal Checkout, Mohon Coba Kembali !",
        },
        {
          position: "bottom-left",
        },
      );
      setLoading(false);
      push("/merchant/success");
      playAudio("/audio/sound3.mp3");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <form
      className={`flex flex-col gap-5 justify-center items-center px-5 border-primary-orange ${type ? "" : "hidden"}`}
      onSubmit={handleSubmit(handleCheckout)}
    >
      <label className="font-bold text-4xl text-center">
        Masukkan nomor antrian
      </label>
      <input
        type="number"
        {...register("table", { required: true })}
        placeholder="No Antrian"
        className="border-2 border-gray-400 p-2 rounded-xl focus text-xl w-full"
        autoFocus={true}
      />
      {loading ? (
        <VscLoading className="animate-spin text-3xl font-extrabold text-primary-orange w-full" />
      ) : (
        <button
          type="submit"
          className="bg-orange-500 text-white rounded-xl p-2 text-xl font-bold w-full"
          disabled={loading}
        >
          Ok
        </button>
      )}
    </form>
  );
}
