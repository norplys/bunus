"use client";

import { IoMdArrowRoundBack } from "react-icons/io";
import { ChangeEvent, useState } from "react";
import type {
  OrderDetail,
  PaymentMethod,
  PaymentStatus,
} from "@/lib/types/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/currency-formatter";
import { useMutationPayment } from "@/lib/hooks/mutation/use-mutation-payment";
import toast from "react-hot-toast";

type PaymentFormProps = {
  setShowPayment: (showPayment: boolean) => void;
  closeModal: () => void;
  order?: OrderDetail;
};

const updatePaymentPayload = z.object({
  memberEmail: z.string().email().optional(),
});

type UpdatePaymentSchema = z.infer<typeof updatePaymentPayload>;

export function PaymentForm({
  setShowPayment,
  closeModal,
  order,
}: PaymentFormProps) {
  const profile = order?.queue || order?.user.name;

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(updatePaymentPayload),
  });

  const { updatePaymentMutation } = useMutationPayment();

  const [cashValue, setCashValue] = useState(0);
  const handleCashValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCashValue(Number(e.target.value));
  };

  const [paymentMethod, setpaymentMethod] = useState("QRIS");
  const isCash = paymentMethod === "CASH";
  const handlePaymentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setpaymentMethod(e.target.value);
  };

  const handleBackButton = () => {
    setShowPayment(false);
  };

  const onSubmit = (data: UpdatePaymentSchema) => {
    const payload = {
      memberEmail: data.memberEmail,
      method: paymentMethod as PaymentMethod,
      status: "SUCCESS" as PaymentStatus,
    };

    updatePaymentMutation.mutate(
      {
        data: payload,
        id: order?.payment.id || "",
      },
      {
        onSuccess: () => {
          toast.success("Pembayaran berhasil");
          closeModal();
        },
        onError: () => {
          toast.error("Pembayaran gagal, mohon coba kembali");
        },
      },
    );
  };

  return (
    <form
      className="bg-white p-5 rounded-lg grid gap-4 w-screen max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <IoMdArrowRoundBack onClick={handleBackButton} />
        Pembayaran - {profile}
      </h1>
      <select className="custom-input" onChange={handlePaymentChange}>
        <option value="QRIS">QRIS</option>
        <option value="CASH">Tunai</option>
        <option value="DEBIT">Debit</option>
      </select>
      <Input
        label="Email Member (optional)"
        {...register("memberEmail")}
        id="member-email"
        type="text"
      />
      {isCash && (
        <Input
          label="Jumlah Pembayaran"
          type="number"
          id="payment-total"
          onChange={handleCashValueChange}
        />
      )}
      <div className="flex justify-between font-semibold">
        <h2>Total</h2>
        <p>{formatCurrency(order?.total || 0)}</p>
      </div>
      {isCash && (
        <div className="flex justify-between font-semibold">
          <h2>Kembalian</h2>
          <p>{formatCurrency(cashValue - (order?.total || 0))}</p>
        </div>
      )}
      <div className="flex justify-between font-semibold">
        <h2>Point</h2>
        <p>{order?.point}</p>
      </div>
      <Button type="submit" className="bg-accent py-2 text-primary-foreground">
        Bayar
      </Button>
    </form>
  );
}
