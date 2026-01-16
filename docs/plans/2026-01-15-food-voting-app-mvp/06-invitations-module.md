# Task 6: Invitations Module - Send Invites

**Files:**

- Create: `server/src/invitations/invitations.module.ts`
- Create: `server/src/invitations/invitations.service.ts`
- Create: `server/src/invitations/invitations.controller.ts`
- Create: `server/src/invitations/dto/send-invites.dto.ts`
- Create: `server/src/invitations/__tests__/invitations.service.spec.ts`

**Step 1: Write failing test**

Create `server/src/invitations/__tests__/invitations.service.spec.ts`:

```typescript
import { Test } from "@nestjs/testing";
import { InvitationsService } from "../invitations.service";
import { PrismaService } from "../../config/database.config";
import { QueueService } from "../../queue/queue.service";

describe("InvitationsService", () => {
	let service: InvitationsService;
	let prisma: PrismaService;
	let queueService: QueueService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				InvitationsService,
				{
					provide: PrismaService,
					useValue: {
						rooms: { findUnique: jest.fn() },
						invitations: { createMany: jest.fn() },
					},
				},
				{
					provide: QueueService,
					useValue: {
						emailQueue: { add: jest.fn() },
					},
				},
			],
		}).compile();

		service = module.get(InvitationsService);
		prisma = module.get(PrismaService);
		queueService = module.get(QueueService);
	});

	describe("sendInvites", () => {
		it("should create invitations and queue email jobs", async () => {
			const dto = {
				roomId: "room-123",
				ownerToken: "valid-token",
				emails: ["user1@test.com", "user2@test.com"],
			};

			const mockRoom = {
				id: "room-123",
				owner_token: "valid-token",
				room_name: "Test Room",
				end_at: new Date(),
				participants: [{ email: "owner@test.com", participant_name: "Owner" }],
			};

			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
			jest.spyOn(prisma.invitations, "createMany").mockResolvedValue({ count: 2 } as any);

			const result = await service.sendInvites(dto);

			expect(result.invited).toBe(2);
			expect(queueService.emailQueue.add).toHaveBeenCalledTimes(2);
		});
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- invitations.service.spec.ts`

Expected: FAIL - InvitationsService not found.

**Step 3: Create DTO**

Create `server/src/invitations/dto/send-invites.dto.ts`:

```typescript
export class SendInvitesDto {
	roomId: string;
	ownerToken: string;
	emails: string[];
}
```

**Step 4: Implement service**

Create `server/src/invitations/invitations.service.ts`:

```typescript
import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../config/database.config";
import { QueueService } from "../queue/queue.service";
import { SendInvitesDto } from "./dto/send-invites.dto";
import { JOB_NAMES } from "../queue/queues.constant";
import { randomBytes } from "crypto";

@Injectable()
export class InvitationsService {
	constructor(private prisma: PrismaService, private queueService: QueueService) {}

	async sendInvites(dto: SendInvitesDto) {
		const room = await this.prisma.rooms.findUnique({
			where: { id: dto.roomId },
			include: {
				participants: {
					where: { role: "HOST" },
				},
			},
		});

		if (!room) {
			throw new NotFoundException("Room not found");
		}

		if (room.owner_token !== dto.ownerToken) {
			throw new UnauthorizedException("Invalid owner token");
		}

		const expiresAt = new Date(room.end_at);
		const invitations = dto.emails.map((email) => ({
			room_id: room.id,
			email,
			token: randomBytes(32).toString("base64url"),
			expires_at: expiresAt,
		}));

		await this.prisma.invitations.createMany({
			data: invitations,
			skipDuplicates: true,
		});

		const owner = room.participants[0];

		for (const inv of invitations) {
			await this.queueService.emailQueue.add(JOB_NAMES.SEND_INVITE, {
				to: inv.email,
				roomName: room.room_name,
				ownerName: owner.participant_name,
				inviteToken: inv.token,
				endAt: room.end_at,
			});
		}

		return { invited: invitations.length };
	}
}
```

**Step 5: Create controller**

Create `server/src/invitations/invitations.controller.ts`:

```typescript
import { Controller, Post, Body } from "@nestjs/common";
import { InvitationsService } from "./invitations.service";
import { SendInvitesDto } from "./dto/send-invites.dto";

@Controller("invitations")
export class InvitationsController {
	constructor(private readonly invitationsService: InvitationsService) {}

	@Post("send")
	async sendInvites(@Body() dto: SendInvitesDto) {
		return this.invitationsService.sendInvites(dto);
	}
}
```

**Step 6: Create module**

Create `server/src/invitations/invitations.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";
import { PrismaService } from "../config/database.config";

@Module({
	controllers: [InvitationsController],
	providers: [InvitationsService, PrismaService],
})
export class InvitationsModule {}
```

**Step 7: Import in app module**

Add to `server/src/app.module.ts`:

```typescript
import { InvitationsModule } from './invitations/invitations.module';

// Add to imports array
imports: [
  // ...existing
  InvitationsModule,
],
```

**Step 8: Run test**

Run: `npm test -- invitations.service.spec.ts`

Expected: PASS.

**Step 9: Commit**

```bash
git add server/src/invitations server/src/app.module.ts
git commit -m "feat: implement send invitations with email queue"
```
