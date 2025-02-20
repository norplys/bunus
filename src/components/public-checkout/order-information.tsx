import { IoChevronBack } from "react-icons/io5";
import { useAuth } from "@/lib/context/auth-context";
import { useCart } from "@/lib/hooks/query/use-cart";
import { CartCard } from "@/components/cart/cart-card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CiSquarePlus } from "react-icons/ci";

export function OrderInformation() {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <IoChevronBack className="text-2xl" onClick={router.back} />
        <h1 className="title text-2xl">CheckOut</h1>
      </div>
      <h2 className="font-semibold text-lg">Informasi Order</h2>
      <Input label="Tipe Order" id="orderType" type="text" />
      <ContactInformation />
      <OrderSummary />
    </section>
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

function OrderSummary() {
  const { data } = useCart();
  const cartItems = data?.data?.cartItem;

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="title text-xl">Ringkasan Pesanan</h1>
        <Link className="text-accent flex items-center gap-1" href={"/menu"}>
          <CiSquarePlus className="text-2xl" />
          Tambah Makanan
        </Link>
      </div>
      <div className="grid gap-5 max-h-64 mt-5 overflow-y-auto">
        {cartItems?.map((cartItem) => (
          <CartCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
    </section>
  );
}
