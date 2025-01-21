import Banner from "@/components/merchant/banner";
import { ReactNode } from "react";

export default function BannerWrapper({ children }: { children: ReactNode }) {
  return (
    <section>
      <Banner />
      {children}
    </section>
  );
}
