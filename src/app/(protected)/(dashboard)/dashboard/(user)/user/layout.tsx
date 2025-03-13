import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className="text-2xl font-bold py-2 border-b">Service User List</h1>
      {children}
    </>
  );
}
