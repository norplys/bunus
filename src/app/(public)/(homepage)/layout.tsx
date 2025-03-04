import { ReactNode } from "react";
import { MobileNavbar } from "@/components/footer/mobile-navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <MobileNavbar />
    </>
  );
}
