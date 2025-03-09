import { useRef } from "react";

export function useMenuId() {
  const menuId = useRef<string | null>(null);

  const changeMenuId = (id: string) => {
    menuId.current = id;
  };

  return { menuId, changeMenuId };
}
