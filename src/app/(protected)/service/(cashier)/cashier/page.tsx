"use client";
import { Loading } from "@/components/ui/loading";
import { useServiceOrder } from "@/lib/hooks/query/use-service-order";
import { CashierCard } from "@/components/cashier/cashier-card";
import { useModal } from "@/lib/hooks/use-modal";
import { useState } from "react";
import { CashierCardModal } from "@/components/cashier/cashier-card-modal";

export default function Page() {
  const { data, isPending } = useServiceOrder();
  const orders = data?.data;

  const [id, setId] = useState<string | null>(null);

  const { open, openModal, closeModal } = useModal();

  const changeId = (id: string) => {
    setId(id);
    openModal();
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <CashierCardModal open={open} closeModal={closeModal} id={id} />
      <section className="grid pt-2">
        {orders?.map((order) => {
          return (
            <CashierCard order={order} key={order.id} changeId={changeId} />
          );
        })}
      </section>
    </>
  );
}
