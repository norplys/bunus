import io from "socket.io-client";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/env";

const getSockets = () => {
  const socket = io(`${NEXT_PUBLIC_BACKEND_URL}/`);
  return socket;
};

export { getSockets };
