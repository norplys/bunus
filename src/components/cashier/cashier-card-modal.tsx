import { Modal } from "../modal/modal";
import { Dialog } from "@headlessui/react";
import { useDetailOrder } from "@/lib/hooks/query/use-detail-order";
import { Loading } from "../ui/loading";
import { formatCurrency } from "@/lib/currency-formatter";
import { CartCard } from "../cart/cart-card";
import { useState } from "react";
import { Button } from "../ui/button";
import { Divider } from "../ui/divider";
import { useMutationOrder } from "@/lib/hooks/mutation/use-mutation-order";
import { PaymentForm } from "../payment/payment-form";
import { OrderStatus } from "@/lib/types/schema";
import toast from "react-hot-toast";

type CashierCardModalProps = {
  open: boolean;
  closeModal: () => void;
  id: string | null;
};

export function CashierCardModal({
  open,
  closeModal,
  id,
}: CashierCardModalProps) {
  if (!id) {
    closeModal();
    return null;
  }

  const { data, isPending } = useDetailOrder(id);
  const order = data?.data;

  const profile = order?.queue || order?.user.name;
  const parsedType = order?.type.split("_").join(" ");
  const parsedStatus = order?.status.split("_") || [];
  const cartItem = order?.cart?.cartItem;

  const [showPayment, setShowPayment] = useState(false);

  const handleColor =
    parsedStatus[0] === "UNPAID"
      ? "text-red-500"
      : parsedStatus[0] === "COMPLETED"
        ? "text-green-500"
        : "text-yellow-500";

  return (
    <Modal open={open} closeModal={closeModal}>
      {isPending ? (
        <Loading />
      ) : showPayment ? (
        <PaymentForm
          setShowPayment={setShowPayment}
          closeModal={closeModal}
          order={order}
        />
      ) : (
        <div className="bg-white p-5 rounded-lg grid gap-4 w-screen max-w-lg">
          <Dialog.Title className="text-2xl font-bold">
            Detail Order - {profile}
          </Dialog.Title>
          <div className="flex justify-between font-semibold">
            <p>{parsedType}</p>
            <p className={handleColor}>{parsedStatus.join(" ")}</p>
          </div>
          <div className="flex justify-between">
            <h2>Total</h2>
            <p>{formatCurrency(order?.total || 0)}</p>
          </div>
          <Divider />
          <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
            {cartItem?.map((item) => (
              <CartCard cartItem={item} key={item.id} isService={true} />
            ))}
          </div>
          <CashierActionButton
            setShowPayment={setShowPayment}
            parsedStatus={parsedStatus}
            orderId={id}
            closeModal={closeModal}
          />
        </div>
      )}
    </Modal>
  );
}

type CashierActionButtonProps = {
  setShowPayment: (value: boolean) => void;
  parsedStatus: string[];
  orderId: string;
  closeModal: () => void;
};

function CashierActionButton({
  setShowPayment,
  parsedStatus,
  orderId,
  closeModal,
}: CashierActionButtonProps) {
  const { updateOrderMutation } = useMutationOrder();

  const unpaid = parsedStatus[0] === "UNPAID";

  const handleShowPayment = () => {
    setShowPayment(true);
  };

  const handleUpdateOrderStatus = (status: OrderStatus) => {
    updateOrderMutation.mutate(
      {
        data: {
          status,
        },
        id: orderId,
      },
      {
        onSuccess: () => {
          toast.success("Order berhasil diselesaikan");
          closeModal();
        },
        onError: () => {
          toast.error("Gagal menyelesaikan order");
        },
      },
    );
  };

  return (
    <div className="flex justify-around items-center text-sm">
      {unpaid ? (
        <>
          <Button
            className=" bg-foreground px-4 py-2 text-primary-foreground"
            onClick={handleShowPayment}
          >
            Bayar
          </Button>
          <Button
            className=" bg-foreground px-4 py-2 text-primary-foreground"
            onClick={() => handleUpdateOrderStatus("UNPAID_COOKING")}
          >
            Kirim Ke Dapur
          </Button>
        </>
      ) : parsedStatus[0] !== "COMPLETED" ? (
        <Button
          className=" bg-foreground px-4 py-2 text-primary-foreground"
          onClick={() => handleUpdateOrderStatus("COMPLETED")}
        >
          Selesaikan
        </Button>
      ) : (
        ""
      )}
      <Button className=" bg-foreground px-4 py-2 text-primary-foreground">
        Print
      </Button>
    </div>
  );
}
