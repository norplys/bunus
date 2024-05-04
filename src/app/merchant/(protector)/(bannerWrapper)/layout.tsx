import Banner from "@/components/merchant/Banner";
import { ReactNode } from "react";

export default function BannerWrapper({ children }: { children: ReactNode }) {
  return (
    <section>
      <Banner />
      {children}
    </section>
  );
}
