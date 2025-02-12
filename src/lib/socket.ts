import { io } from "socket.io-client";
import { NEXT_PUBLIC_BACKEND_URL } from "./env";

const socket = io(NEXT_PUBLIC_BACKEND_URL);

export default socket;
