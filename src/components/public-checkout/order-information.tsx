import { IoChevronBack } from "react-icons/io5";
import { useAuth } from "@/lib/context/auth-context";
import { useCart } from "@/lib/hooks/query/use-cart";
import { CartCard } from "@/components/cart/cart-card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CiSquarePlus } from "react-icons/ci";
import clsx from "clsx";

export function OrderInformation() {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <IoChevronBack className="text-2xl" onClick={router.back} />
        <h1 className="title text-2xl">CheckOut</h1>
      </div>
      <OrderInput />
      <ContactInformation />
      <OrderSummary />
    </section>
  );
}

const optionValue = [
  { value: "DINE_IN", label: "Dine In" },
  { value: "TAKE_AWAY", label: "Take Away" },
  { value: "SELF_PICKUP", label: "Self Pickup" },
];

function OrderInput() {
  const router = useRouter();

  return (
    <>
      <label htmlFor="orderType" className="font-bold">
        Tipe Pesanan
      </label>
      <select
        id="orderType"
        name="orderType"
        className="custom-input"
        onChange={(e) => router.push(`/checkout?type=${e.target.value}`)}
      >
        {optionValue.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

function ContactInformation() {
  const { user } = useAuth();

  return (
    <section className="grid gap-5">
      <h1 className="title text-xl">Informasi Kontak</h1>
      <Input
        label="Email"
        id="email"
        type="email"
        value={user?.email}
        disabled
      />
      <Input
        label="Nomor Telephone"
        id="phoneNumber"
        type="text"
        value={user?.phoneNumber}
        disabled
      />
    </section>
  );
}

type OrderSummaryProps = {
  isService?: boolean;
};

export function OrderSummary({ isService }: OrderSummaryProps) {
  const { data } = useCart();
  const cartItems = data?.data?.cartItem;

  const rootUrl = isService ? "/service/merchant" : "/menu";

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="title text-xl">Ringkasan Pesanan</h1>
        <Link className="text-accent flex items-center gap-1" href={rootUrl}>
          <CiSquarePlus className="text-2xl" />
          Tambah Makanan
        </Link>
      </div>
      <div
        className={clsx(
          "grid gap-5 mt-5 ",
          !isService && "max-h-64 overflow-y-auto",
        )}
      >
        {cartItems?.map((cartItem) => (
          <CartCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
    </section>
  );
}
