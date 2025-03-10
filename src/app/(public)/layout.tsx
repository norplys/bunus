import { ReactNode } from "react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { MobileNavbar } from "@/components/footer/mobile-navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
