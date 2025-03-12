import { useRef } from "react";

export function useMenuId() {
  const menuId = useRef<string | null>(null);

  const changeMenuId = (id: string | null) => {
    if (id) {
      menuId.current = id;

      return;
    }

    menuId.current = null;
  };

  return { menuId, changeMenuId };
}
