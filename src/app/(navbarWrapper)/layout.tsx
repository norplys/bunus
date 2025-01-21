"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ReactNode } from "react";

export default function NavbarWrapper({ children }: { children: ReactNode }) {
  return (
    <section>
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </section>
  );
}
