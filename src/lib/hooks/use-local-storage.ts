import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return saved ? (saved as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value as string);
  }, [key, value]);

  return [value, setValue];
}
