# Task 5: Rooms Module - Create Room

**Files:**

- Create: `server/src/rooms/rooms.module.ts`
- Create: `server/src/rooms/rooms.service.ts`
- Create: `server/src/rooms/rooms.controller.ts`
- Create: `server/src/rooms/dto/create-room.dto.ts`
- Create: `server/src/rooms/__tests__/rooms.service.spec.ts`

**Step 1: Write failing test for room creation**

Create `server/src/rooms/__tests__/rooms.service.spec.ts`:

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { RoomsService } from "../rooms.service";
import { PrismaService } from "../../config/database.config";
import { QueueService } from "../../queue/queue.service";
import { ConfigService } from "@nestjs/config";

describe("RoomsService", () => {
	let service: RoomsService;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RoomsService,
				{
					provide: PrismaService,
					useValue: {
						rooms: {
							create: jest.fn(),
						},
						participants: {
							create: jest.fn(),
						},
					},
				},
				{
					provide: QueueService,
					useValue: {
						emailQueue: {
							add: jest.fn(),
						},
					},
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<RoomsService>(RoomsService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("createRoom", () => {
		it("should create room with owner participant and return owner token", async () => {
			const createRoomDto = {
				roomName: "Lunch Vote",
				ownerEmail: "owner@test.com",
				ownerName: "John Doe",
				startAt: new Date("2026-01-15T12:00:00Z"),
				endAt: new Date("2026-01-15T13:00:00Z"),
			};

			const mockRoom = {
				id: "room-123",
				room_name: createRoomDto.roomName,
				owner_token: "token-abc",
				...createRoomDto,
			};

			jest.spyOn(prisma.rooms, "create").mockResolvedValue(mockRoom as any);

			const result = await service.createRoom(createRoomDto);

			expect(result).toHaveProperty("roomId", "room-123");
			expect(result).toHaveProperty("ownerToken", "token-abc");
			expect(prisma.rooms.create).toHaveBeenCalled();
		});
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- rooms.service.spec.ts`

Expected: FAIL - RoomsService not found.

**Step 3: Create DTO**

Create `server/src/rooms/dto/create-room.dto.ts`:

```typescript
export class CreateRoomDto {
	roomName: string;
	ownerEmail: string;
	ownerName: string;
	startAt: Date;
	endAt: Date;
}
```

**Step 4: Implement rooms service**

Create `server/src/rooms/rooms.service.ts`:

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../config/database.config";
import { QueueService } from "../queue/queue.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { PARTICIPANT_ROLE } from "../../generated/prisma";
import { randomBytes } from "crypto";

@Injectable()
export class RoomsService {
	constructor(private prisma: PrismaService, private queueService: QueueService) {}

	async createRoom(dto: CreateRoomDto) {
		const ownerToken = this.generateToken();
		const ownerId = randomBytes(16).toString("hex");

		const room = await this.prisma.rooms.create({
			data: {
				room_name: dto.roomName,
				start_at: new Date(dto.startAt),
				end_at: new Date(dto.endAt),
				owner_id: dto.ownerEmail,
				owner_token: ownerToken,
				participants: {
					create: {
						id: ownerId,
						email: dto.ownerEmail,
						participant_name: dto.ownerName,
						role: PARTICIPANT_ROLE.HOST,
					},
				},
			},
		});

		return {
			roomId: room.id,
			ownerToken: room.owner_token,
			roomName: room.room_name,
			startAt: room.start_at,
			endAt: room.end_at,
		};
	}

	private generateToken(): string {
		return randomBytes(32).toString("base64url");
	}
}
```

**Step 5: Create controller**

Create `server/src/rooms/rooms.controller.ts`:

```typescript
import { Controller, Post, Body } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";

@Controller("rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@Post()
	async createRoom(@Body() dto: CreateRoomDto) {
		return this.roomsService.createRoom(dto);
	}
}
```

**Step 6: Create module**

Create `server/src/rooms/rooms.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";
import { PrismaService } from "../config/database.config";

@Module({
	controllers: [RoomsController],
	providers: [RoomsService, PrismaService],
	exports: [RoomsService],
})
export class RoomsModule {}
```

**Step 7: Import in app module**

Modify `server/src/app.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envConfig } from "./config/env.config";
import { PrismaService } from "./config/database.config";
import { QueueModule } from "./queue/queue.module";
import { RoomsModule } from "./rooms/rooms.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
		}),
		QueueModule,
		RoomsModule,
	],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
```

**Step 8: Install test dependencies**

```bash
npm install -D @nestjs/testing jest @types/jest ts-jest
```

Create `server/jest.config.js`:

```javascript
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	testMatch: ["**/__tests__/**/*.spec.ts"],
	collectCoverageFrom: ["src/**/*.ts", "!src/**/*.spec.ts"],
};
```

**Step 9: Run test to verify it passes**

Run: `npm test -- rooms.service.spec.ts`

Expected: PASS - createRoom test passes.

**Step 10: Test API manually**

Run server: `npm run start:dev`

Test with curl:

```bash
curl -X POST http://localhost:3000/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "roomName": "Team Lunch",
    "ownerEmail": "owner@test.com",
    "ownerName": "Alice",
    "startAt": "2026-01-15T12:00:00Z",
    "endAt": "2026-01-15T13:00:00Z"
  }'
```

Expected: Returns roomId and ownerToken.

**Step 11: Commit**

```bash
git add server/src/rooms server/src/app.module.ts server/jest.config.js server/package.json
git commit -m "feat: implement create room endpoint with tests"
```
