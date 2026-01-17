import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../config/server";

const SOCKET_URL = SERVER_URL;

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});
