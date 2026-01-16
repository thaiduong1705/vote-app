# Task 7: Join Room via Invite

**Files:**

- Create: `server/src/invitations/dto/join-room.dto.ts`
- Modify: `server/src/invitations/invitations.service.ts`
- Modify: `server/src/invitations/invitations.controller.ts`

**Step 1: Write failing test**

Add to `server/src/invitations/__tests__/invitations.service.spec.ts`:

```typescript
describe("joinRoom", () => {
	it("should create participant and mark invitation as used", async () => {
		const dto = {
			token: "invite-token",
			name: "Bob",
		};

		const mockInvite = {
			room_id: "room-123",
			email: "bob@test.com",
			token: "invite-token",
			expires_at: new Date(Date.now() + 10000),
			used_at: null,
		};

		jest.spyOn(prisma.invitations, "findUnique").mockResolvedValue(mockInvite as any);
		jest.spyOn(prisma.invitations, "update").mockResolvedValue({} as any);
		jest.spyOn(prisma.participants, "create").mockResolvedValue({
			id: "participant-123",
			room_id: "room-123",
			email: "bob@test.com",
			participant_name: "Bob",
		} as any);

		const result = await service.joinRoom(dto);

		expect(result.participantId).toBe("participant-123");
		expect(prisma.invitations.update).toHaveBeenCalledWith({
			where: { token: "invite-token" },
			data: { used_at: expect.any(Date) },
		});
	});
});
```

**Step 2: Run test**

Run: `npm test -- invitations.service.spec.ts`

Expected: FAIL - joinRoom method not defined.

**Step 3: Create DTO**

Create `server/src/invitations/dto/join-room.dto.ts`:

```typescript
export class JoinRoomDto {
	token: string;
	name: string;
}
```

**Step 4: Implement joinRoom in service**

Add to `server/src/invitations/invitations.service.ts`:

```typescript
import { BadRequestException } from '@nestjs/common';
import { JoinRoomDto } from './dto/join-room.dto';
import { PARTICIPANT_ROLE } from '../../generated/prisma';

// Add method to InvitationsService
async joinRoom(dto: JoinRoomDto) {
  const invitation = await this.prisma.invitations.findUnique({
    where: { token: dto.token },
  });

  if (!invitation) {
    throw new NotFoundException('Invitation not found');
  }

  if (invitation.used_at) {
    throw new BadRequestException('Invitation already used');
  }

  if (new Date() > invitation.expires_at) {
    throw new BadRequestException('Invitation expired');
  }

  const participant = await this.prisma.participants.create({
    data: {
      room_id: invitation.room_id,
      email: invitation.email,
      participant_name: dto.name,
      role: PARTICIPANT_ROLE.GUEST,
    },
  });

  await this.prisma.invitations.update({
    where: { token: dto.token },
    data: { used_at: new Date() },
  });

  return {
    participantId: participant.id,
    roomId: participant.room_id,
    email: participant.email,
    name: participant.participant_name,
  };
}
```

**Step 5: Add controller endpoint**

Add to `server/src/invitations/invitations.controller.ts`:

```typescript
import { JoinRoomDto } from './dto/join-room.dto';

@Post('join')
async joinRoom(@Body() dto: JoinRoomDto) {
  return this.invitationsService.joinRoom(dto);
}
```

**Step 6: Run test**

Run: `npm test -- invitations.service.spec.ts`

Expected: PASS.

**Step 7: Commit**

```bash
git add server/src/invitations
git commit -m "feat: implement join room via invitation token"
```
