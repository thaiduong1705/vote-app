import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000/ws";

export const useSocket = (roomId: string | null) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		if (!roomId) return;

		const socketInstance = io(SOCKET_URL);

		socketInstance.on("connect", () => {
			setIsConnected(true);
			socketInstance.emit("join-room", { roomId });
		});

		socketInstance.on("disconnect", () => {
			setIsConnected(false);
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.emit("leave-room", { roomId });
			socketInstance.disconnect();
		};
	}, [roomId]);

	return { socket, isConnected };
};
