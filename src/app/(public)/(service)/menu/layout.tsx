import { ReactNode } from "react";
import { MenuLayout } from "./menu-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return <MenuLayout>{children}</MenuLayout>;
}
