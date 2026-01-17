import { useEffect, useState } from "react";
import { socket } from "./socket";

type ConnectedUser = {
    id: number;
    name: string;
};

export const useSocket = () => {
    const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            setConnected(true);
        });

        socket.on("note:users", (users: ConnectedUser[]) => {
            setConnectedUsers(users);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
            setConnected(false);
            setConnectedUsers([]);
        });

        return () => {
            socket.off("connect");
            socket.off("note:users");
            socket.off("disconnect");
            socket.disconnect();
        };
    }, [socket]);

    return {
        socket,
        connected,
        connectedUsers,
    };
};
