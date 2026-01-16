# Task 9: Votes Module - Submit & Change Vote

**Files:**

- Create: `server/src/votes/votes.module.ts`
- Create: `server/src/votes/votes.service.ts`
- Create: `server/src/votes/votes.controller.ts`
- Create: `server/src/votes/dto/submit-vote.dto.ts`

**Step 1: Write tests**

Create `server/src/votes/__tests__/votes.service.spec.ts`:

```typescript
import { Test } from "@nestjs/testing";
import { VotesService } from "../votes.service";
import { PrismaService } from "../../config/database.config";
import { ROOM_STATUS } from "../../../generated/prisma";

describe("VotesService", () => {
	let service: VotesService;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				VotesService,
				{
					provide: PrismaService,
					useValue: {
						rooms: { findUnique: jest.fn() },
						votes: { upsert: jest.fn() },
					},
				},
			],
		}).compile();

		service = module.get(VotesService);
		prisma = module.get(PrismaService);
	});

	it("should submit vote for active room", async () => {
		const dto = {
			roomId: "room-123",
			participantId: "participant-123",
			restaurantId: "restaurant-123",
		};

		const mockRoom = { id: "room-123", status: ROOM_STATUS.ACTIVE };

		jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
		jest.spyOn(prisma.votes, "upsert").mockResolvedValue({
			id: "vote-123",
			...dto,
		} as any);

		const result = await service.submitVote(dto);

		expect(result.id).toBe("vote-123");
	});
});
```

**Step 2: Run test**

Run: `npm test -- votes.service.spec.ts`

Expected: FAIL.

**Step 3: Create DTO**

Create `server/src/votes/dto/submit-vote.dto.ts`:

```typescript
export class SubmitVoteDto {
	roomId: string;
	participantId: string;
	restaurantId: string;
}
```

**Step 4: Implement service**

Create `server/src/votes/votes.service.ts`:

```typescript
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../config/database.config";
import { SubmitVoteDto } from "./dto/submit-vote.dto";
import { ROOM_STATUS } from "../../generated/prisma";

@Injectable()
export class VotesService {
	constructor(private prisma: PrismaService) {}

	async submitVote(dto: SubmitVoteDto) {
		const room = await this.prisma.rooms.findUnique({
			where: { id: dto.roomId },
		});

		if (!room) {
			throw new NotFoundException("Room not found");
		}

		if (room.status !== ROOM_STATUS.ACTIVE) {
			throw new BadRequestException("Room is closed");
		}

		const participant = await this.prisma.participants.findUnique({
			where: {
				room_id_email: {
					room_id: dto.roomId,
					email: dto.participantId, // assuming participantId is email for now
				},
			},
		});

		if (!participant) {
			throw new NotFoundException("Participant not found in this room");
		}

		const vote = await this.prisma.votes.upsert({
			where: {
				room_id_participant_id: {
					room_id: dto.roomId,
					participant_id: participant.id,
				},
			},
			update: {
				restaurant_id: dto.restaurantId,
				voted_at: new Date(),
			},
			create: {
				room_id: dto.roomId,
				participant_id: participant.id,
				participant_email: participant.email,
				restaurant_id: dto.restaurantId,
			},
			include: {
				restaurant: true,
				participant: true,
			},
		});

		return vote;
	}

	async getRoomVotes(roomId: string) {
		return this.prisma.votes.findMany({
			where: { room_id: roomId },
			include: {
				restaurant: true,
				participant: {
					select: {
						id: true,
						participant_name: true,
						email: true,
					},
				},
			},
		});
	}
}
```

**Step 5: Create controller**

Create `server/src/votes/votes.controller.ts`:

```typescript
import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { SubmitVoteDto } from "./dto/submit-vote.dto";

@Controller("votes")
export class VotesController {
	constructor(private readonly votesService: VotesService) {}

	@Post()
	async submitVote(@Body() dto: SubmitVoteDto) {
		return this.votesService.submitVote(dto);
	}

	@Get("room/:roomId")
	async getRoomVotes(@Param("roomId") roomId: string) {
		return this.votesService.getRoomVotes(roomId);
	}
}
```

**Step 6: Create module**

Create `server/src/votes/votes.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { VotesController } from "./votes.controller";
import { VotesService } from "./votes.service";
import { PrismaService } from "../config/database.config";

@Module({
	controllers: [VotesController],
	providers: [VotesService, PrismaService],
	exports: [VotesService],
})
export class VotesModule {}
```

**Step 7: Import in app module**

```typescript
import { VotesModule } from './votes/votes.module';

imports: [
  // ...
  VotesModule,
],
```

**Step 8: Run test**

Run: `npm test -- votes.service.spec.ts`

Expected: PASS.

**Step 9: Commit**

```bash
git add server/src/votes server/src/app.module.ts
git commit -m "feat: implement vote submission and retrieval"
```
