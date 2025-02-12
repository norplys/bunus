import { ReactNode } from "react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
