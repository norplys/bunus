import { ReactNode } from "react";
import { Header } from "@/components/header/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <h1>Footer</h1>
    </>
  );
}
