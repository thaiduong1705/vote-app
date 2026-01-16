# Task 10: WebSocket Gateway for Realtime Updates

**Files:**

- Create: `server/src/realtime/realtime.gateway.ts`
- Create: `server/src/realtime/realtime.module.ts`
- Modify: `server/src/votes/votes.service.ts`

**Step 1: Create WebSocket gateway**

Create `server/src/realtime/realtime.gateway.ts`:

```typescript
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
	cors: {
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	},
})
export class RealtimeGateway {
	@WebSocketServer()
	server: Server;

	@SubscribeMessage("join-room")
	handleJoinRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
		client.join(`room:${data.roomId}`);
		console.log(`Client ${client.id} joined room ${data.roomId}`);
		return { success: true };
	}

	@SubscribeMessage("leave-room")
	handleLeaveRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
		client.leave(`room:${data.roomId}`);
		console.log(`Client ${client.id} left room ${data.roomId}`);
		return { success: true };
	}

	broadcastVoteUpdate(roomId: string, voteData: any) {
		this.server.to(`room:${roomId}`).emit("vote-updated", voteData);
	}

	broadcastRoomClosed(roomId: string, data: any) {
		this.server.to(`room:${roomId}`).emit("room-closed", data);
	}
}
```

**Step 2: Create realtime module**

Create `server/src/realtime/realtime.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { RealtimeGateway } from "./realtime.gateway";

@Module({
	providers: [RealtimeGateway],
	exports: [RealtimeGateway],
})
export class RealtimeModule {}
```

**Step 3: Import in app module**

```typescript
import { RealtimeModule } from './realtime/realtime.module';

imports: [
  // ...
  RealtimeModule,
],
```

**Step 4: Inject gateway into votes service**

Modify `server/src/votes/votes.service.ts`:

```typescript
import { RealtimeGateway } from "../realtime/realtime.gateway";

@Injectable()
export class VotesService {
	constructor(private prisma: PrismaService, private realtimeGateway: RealtimeGateway) {}

	async submitVote(dto: SubmitVoteDto) {
		// ... existing code ...

		// After upserting vote, broadcast update
		this.realtimeGateway.broadcastVoteUpdate(dto.roomId, {
			voteId: vote.id,
			participantName: vote.participant.participant_name,
			restaurantName: vote.restaurant.name,
			votedAt: vote.voted_at,
		});

		return vote;
	}
}
```

**Step 5: Update votes module to import RealtimeModule**

Modify `server/src/votes/votes.module.ts`:

```typescript
import { RealtimeModule } from "../realtime/realtime.module";

@Module({
	imports: [RealtimeModule],
	controllers: [VotesController],
	providers: [VotesService, PrismaService],
	exports: [VotesService],
})
export class VotesModule {}
```

**Step 6: Test WebSocket connection**

Run server: `npm run start:dev`

Use a WebSocket client (e.g., wscat):

```bash
npm install -g wscat
wscat -c ws://localhost:3000
```

Send: `42["join-room",{"roomId":"test-room"}]`

Expected: Connection successful, joined room.

**Step 7: Commit**

```bash
git add server/src/realtime server/src/votes server/src/app.module.ts
git commit -m "feat: implement WebSocket gateway for realtime updates"
```
