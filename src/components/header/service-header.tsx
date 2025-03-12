"use client";

import { Logo } from "../common/logo";
import { HeaderProfile } from "./header-profile";

type ServiceHeaderProps = {
  isAdmin?: boolean;
};

export function ServiceHeader({ isAdmin }: ServiceHeaderProps) {
  return (
    <header className="sticky top-0 w-full z-40 backdrop-blur-md bg-primary/70 text-primary-foreground h-20 p-4">
      <section className="layout flex items-center justify-between">
        <Logo text={true} clickable={false} icon={true} logoClassName="w-12" />
        {isAdmin && <HeaderProfile />}
      </section>
    </header>
  );
}
