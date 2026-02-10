import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	MessageBody,
	ConnectedSocket,
	OnGatewayConnection,
	OnGatewayInit,
	OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
	cors: {
		origin: "*",
		credentials: true,
	},
	namespace: "/ws",
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
	@WebSocketServer()
	server!: Server;

	afterInit(server: Server) {
		console.log("WebSocket server initialized");
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage("join-room")
	handleJoinRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
		client.join(data.roomId);
		console.log(`Client ${client.id} joined room ${data.roomId}`);
	}

	@SubscribeMessage("leave-room")
	handleLeaveRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
		client.leave(data.roomId);
		console.log(`Client ${client.id} left room ${data.roomId}`);
	}

	broadcastVoteUpdate(roomId: string, voteData: any) {
		this.server.to(roomId).emit("vote-updated", voteData);
	}

	broadcastRoomClosed(roomId: string, data: any) {
		this.server.to(roomId).emit("room-closed", data);
	}

	broadcastRestaurantsUpdated(roomId: string) {
		this.server.to(roomId).emit("restaurants-updated", {
			timestamp: new Date().toISOString(),
		});
	}
}
