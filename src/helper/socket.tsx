import io from "socket.io-client";

const getSockets = () => {
  const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/`);
  return socket;
};

export { getSockets };
