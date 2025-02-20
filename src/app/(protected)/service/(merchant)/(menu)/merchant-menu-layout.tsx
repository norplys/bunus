import { MerchantBanner } from "@/components/merchant/merchant-banner";
import { CategoryDashboard } from "@/app/(public)/(service)/menu/menu-layout";
import type { ReactNode } from "react";
import { CartNotification } from "@/components/cart/cart-notification";

export function MerchantMenuLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-[url(/images/background/white-marmer.png)] bg-cover bg-center min-h-screen">
      <MerchantBanner />
      <CategoryDashboard
        isService={true}
        className="layout top-0 text-primary-foreground bg-foreground/70 rounded-b-lg backdrop-blur-md"
      />
      {children}
      <CartNotification isService={true} />
    </main>
  );
}
