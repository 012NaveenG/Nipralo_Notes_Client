import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL = "http://localhost:12345";

export const connectSocket = () => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"],
            autoConnect: true,
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket?.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    }

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};



export const getSocket = () => socket;
