import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ReactNode } from "react";

export function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
