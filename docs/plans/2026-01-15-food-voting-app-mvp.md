# Food Voting App MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a token-based, realtime food voting web app where groups can vote for restaurants within a time window, with async email notifications and background job processing.

**Architecture:** Hybrid monolith with API+WebSocket in main NestJS process, separate worker process for background jobs (emails, room expiry). BullMQ+Valkey for job queue, PostgreSQL for data, React+Vite frontend with WebSocket client.

**Tech Stack:** NestJS, Prisma, PostgreSQL, BullMQ, Valkey, Nodemailer, WebSocket (@nestjs/websockets), React, Vite, TypeScript

---

## Prerequisites

**Environment Setup:**

- PostgreSQL running locally
- Valkey (Redis) running locally on default port 6379
- SMTP credentials ready (Gmail app password or SendGrid)
- Node.js 18+

**Initial Dependencies Already Installed:**

- @nestjs/core, @nestjs/common, @nestjs/platform-express
- @prisma/client, prisma
- TypeScript, reflect-metadata

---

## Task 1: Database Schema & Migrations

**Files:**

- Modify: `server/prisma/schema.prisma`
- Create migration

**Current State Analysis:**
Schema already has most entities. Need to verify alignment with requirements:

- ✅ Rooms (has owner_token, winner_restaurant_id)
- ✅ Participants (compound PK: room_id + email)
- ✅ Invitations (has token, expires_at)
- ✅ Restaurants (global, has menu_image_url)
- ✅ Votes (compound PK: room_id + participant_email)

**Changes Needed:**

- Add `created_at` timestamp to Rooms
- Add `id` field to Participants (for easier referencing)
- Add indexes for performance

**Step 1: Update Prisma schema**

```prisma
// server/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ROOM_STATUS {
  ACTIVE
  CLOSED
}

enum PARTICIPANT_ROLE {
  HOST
  GUEST
}

model Rooms {
  id                    String        @id @default(uuid())
  room_name             String
  start_at              DateTime
  end_at                DateTime
  status                ROOM_STATUS   @default(ACTIVE)
  owner_id              String        // participant id (email)
  owner_token           String        @unique
  winner_restaurant_id  String?
  created_at            DateTime      @default(now())

  participants          Participants[]
  invitations           Invitations[]
  votes                 Votes[]
  winner                Restaurants?   @relation("WinnerRestaurant", fields: [winner_restaurant_id], references: [id])

  @@index([status, end_at])
}

model Participants {
  id                String             @id @default(uuid())
  room_id           String
  email             String
  participant_name  String
  role              PARTICIPANT_ROLE   @default(GUEST)
  joined_at         DateTime           @default(now())

  room              Rooms              @relation(fields: [room_id], references: [id], onDelete: Cascade)
  votes             Votes[]

  @@unique([room_id, email])
  @@index([room_id])
}

model Invitations {
  id          String    @id @default(uuid())
  room_id     String
  email       String
  token       String    @unique
  expires_at  DateTime
  used_at     DateTime?
  created_at  DateTime  @default(now())

  room        Rooms     @relation(fields: [room_id], references: [id], onDelete: Cascade)

  @@unique([room_id, email])
  @@index([token])
}

model Restaurants {
  id              String   @id @default(uuid())
  name            String   @unique
  menu_image_url  String?
  created_at      DateTime @default(now())

  votes           Votes[]
  winner_rooms    Rooms[]  @relation("WinnerRestaurant")
}

model Votes {
  id                 String       @id @default(uuid())
  room_id            String
  participant_id     String
  participant_email  String
  restaurant_id      String
  voted_at           DateTime     @default(now())

  room               Rooms        @relation(fields: [room_id], references: [id], onDelete: Cascade)
  participant        Participants @relation(fields: [participant_id], references: [id], onDelete: Cascade)
  restaurant         Restaurants  @relation(fields: [restaurant_id], references: [id])

  @@unique([room_id, participant_id])
  @@index([room_id])
}
```

**Step 2: Set up environment variables**

Create `server/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vote_app"
REDIS_HOST="localhost"
REDIS_PORT=6379
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="Vote App <noreply@voteapp.com>"
FRONTEND_URL="http://localhost:5173"
```

**Step 3: Create migration**

Run:

```bash
cd server
npx prisma migrate dev --name init_schema
```

Expected: Migration created and applied successfully.

**Step 4: Generate Prisma Client**

Run:

```bash
npx prisma generate
```

Expected: Prisma Client generated in `server/generated/prisma/`.

**Step 5: Seed preset restaurants (optional)**

Create `server/prisma/seed.ts`:

```typescript
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
	const restaurants = [
		{ name: "KFC", menu_image_url: null },
		{ name: "McDonald's", menu_image_url: null },
		{ name: "Burger King", menu_image_url: null },
		{ name: "Pizza Hut", menu_image_url: null },
		{ name: "Domino's Pizza", menu_image_url: null },
	];

	for (const restaurant of restaurants) {
		await prisma.restaurants.upsert({
			where: { name: restaurant.name },
			update: {},
			create: restaurant,
		});
	}

	console.log("Seeded restaurants");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
```

Add to `server/package.json`:

```json
{
	"prisma": {
		"seed": "tsx prisma/seed.ts"
	}
}
```

Install tsx: `npm install -D tsx`

Run: `npx prisma db seed`

Expected: 5 restaurants seeded.

---

## Task 2: Core Configuration & Modules

**Files:**

- Create: `server/src/config/env.config.ts`
- Create: `server/src/config/database.config.ts`
- Modify: `server/src/app.module.ts`

**Step 1: Install dependencies**

```bash
cd server
npm install @nestjs/config @nestjs/websockets @nestjs/platform-socket.io socket.io
npm install bullmq nodemailer
npm install -D @types/nodemailer
```

**Step 2: Create environment configuration**

Create `server/src/config/env.config.ts`:

```typescript
export const envConfig = () => ({
	port: parseInt(process.env.PORT || "3000", 10),
	database: {
		url: process.env.DATABASE_URL,
	},
	redis: {
		host: process.env.REDIS_HOST || "localhost",
		port: parseInt(process.env.REDIS_PORT || "6379", 10),
	},
	smtp: {
		host: process.env.SMTP_HOST,
		port: parseInt(process.env.SMTP_PORT || "587", 10),
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
		from: process.env.SMTP_FROM,
	},
	frontend: {
		url: process.env.FRONTEND_URL || "http://localhost:5173",
	},
});
```

**Step 3: Create database module**

Create `server/src/config/database.config.ts`:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
```

**Step 4: Update app module**

Modify `server/src/app.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envConfig } from "./config/env.config";
import { PrismaService } from "./config/database.config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
		}),
	],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
```

**Step 5: Update main.ts for CORS**

Modify `server/src/main.ts`:

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.enableCors({
		origin: configService.get("frontend.url"),
		credentials: true,
	});

	const port = configService.get("port");
	await app.listen(port);
	console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
```

**Step 6: Test server starts**

Run: `npm run start:dev`

Expected: Server starts on port 3000 without errors.

---

## Task 3: BullMQ Queue Setup

**Files:**

- Create: `server/src/queue/queue.module.ts`
- Create: `server/src/queue/queue.service.ts`
- Create: `server/src/queue/queues.constant.ts`

**Step 1: Define queue constants**

Create `server/src/queue/queues.constant.ts`:

```typescript
export const QUEUE_NAMES = {
	EMAIL: "email",
	ROOM_CLOSER: "room-closer",
} as const;

export const JOB_NAMES = {
	SEND_INVITE: "send-invite",
	SEND_REMINDER: "send-reminder",
	CHECK_EXPIRED_ROOMS: "check-expired-rooms",
} as const;
```

**Step 2: Create queue service**

Create `server/src/queue/queue.service.ts`:

```typescript
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "./queues.constant";

@Injectable()
export class QueueService implements OnModuleInit {
	public emailQueue: Queue;
	public roomCloserQueue: Queue;

	constructor(private configService: ConfigService) {}

	onModuleInit() {
		const connection = {
			host: this.configService.get("redis.host"),
			port: this.configService.get("redis.port"),
		};

		this.emailQueue = new Queue(QUEUE_NAMES.EMAIL, { connection });
		this.roomCloserQueue = new Queue(QUEUE_NAMES.ROOM_CLOSER, { connection });
	}
}
```

**Step 3: Create queue module**

Create `server/src/queue/queue.module.ts`:

```typescript
import { Module, Global } from "@nestjs/common";
import { QueueService } from "./queue.service";

@Global()
@Module({
	providers: [QueueService],
	exports: [QueueService],
})
export class QueueModule {}
```

**Step 4: Import queue module in app**

Modify `server/src/app.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envConfig } from "./config/env.config";
import { PrismaService } from "./config/database.config";
import { QueueModule } from "./queue/queue.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
		}),
		QueueModule,
	],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
```

**Step 5: Test queue initialization**

Run: `npm run start:dev`

Expected: Server starts, BullMQ queues initialized without errors.

---

## Task 4: Email Worker Implementation

**Files:**

- Create: `server/src/workers/email.worker.ts`
- Create: `server/src/workers/worker.module.ts`
- Create: `server/src/workers/main.worker.ts`
- Create: `server/src/templates/email.templates.ts`

**Step 1: Create email templates**

Create `server/src/templates/email.templates.ts`:

```typescript
export interface InviteEmailData {
	roomName: string;
	ownerName: string;
	inviteLink: string;
	endAt: string;
}

export interface ReminderEmailData {
	roomName: string;
	participantName: string;
	roomLink: string;
	endAt: string;
}

export const emailTemplates = {
	invite: (data: InviteEmailData) => ({
		subject: `Chọn quán trong room này nè: ${data.roomName}`,
		html: `
      <h2>Chọn quán</h2>
      <p><strong>${data.ownerName}</strong> mời chọn món trong room"<strong>${data.roomName}</strong>".</p>
      <p>Hết hạn lúc: <strong>${data.endAt}</strong></p>
      <p><a href="${data.inviteLink}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Join & Vote</a></p>
      <p>Copy link: ${data.inviteLink}</p>
    `,
		text: `
${data.ownerName} mời vote "${data.roomName}".

Hết hạn: ${data.endAt}

Bấm để tham gia: ${data.inviteLink}
    `,
	}),

	reminder: (data: ReminderEmailData) => ({
		subject: `Nhắc nhở vote: ${data.roomName}!`,
		html: `
      <p>Vote dùm đi: "<strong>${data.roomName}</strong>"!</p>
      <p>Vote hết hạn: <strong>${data.endAt}</strong></p>
      <p><a href="${data.roomLink}" style="background: #FF9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Vote Now</a></p>
      <p>Copy link: ${data.roomLink}</p>
    `,
		text: `
Vote dùm đi:  "${data.roomName}"!

Vote hết hạn: ${data.endAt}

${data.roomLink}
    `,
	}),
};
```

**Step 2: Create email worker**

Create `server/src/workers/email.worker.ts`:

```typescript
import { Worker, Job } from "bullmq";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import { QUEUE_NAMES, JOB_NAMES } from "../queue/queues.constant";
import { emailTemplates } from "../templates/email.templates";

export class EmailWorker {
	private worker: Worker;
	private transporter;

	constructor(private configService: ConfigService) {
		this.transporter = createTransport({
			host: this.configService.get("smtp.host"),
			port: this.configService.get("smtp.port"),
			secure: false,
			auth: {
				user: this.configService.get("smtp.user"),
				pass: this.configService.get("smtp.pass"),
			},
		});

		const connection = {
			host: this.configService.get("redis.host"),
			port: this.configService.get("redis.port"),
		};

		this.worker = new Worker(QUEUE_NAMES.EMAIL, async (job: Job) => this.processJob(job), { connection });

		this.worker.on("completed", (job) => {
			console.log(`Email job ${job.id} completed`);
		});

		this.worker.on("failed", (job, err) => {
			console.error(`Email job ${job?.id} failed:`, err);
		});
	}

	private async processJob(job: Job) {
		console.log(`Processing email job: ${job.name}`, job.data);

		switch (job.name) {
			case JOB_NAMES.SEND_INVITE:
				return this.sendInvite(job.data);
			case JOB_NAMES.SEND_REMINDER:
				return this.sendReminder(job.data);
			default:
				throw new Error(`Unknown job name: ${job.name}`);
		}
	}

	private async sendInvite(data: any) {
		const { to, roomName, ownerName, inviteToken, endAt } = data;
		const inviteLink = `${this.configService.get("frontend.url")}/join/${inviteToken}`;

		const template = emailTemplates.invite({
			roomName,
			ownerName,
			inviteLink,
			endAt: new Date(endAt).toLocaleString(),
		});

		await this.transporter.sendMail({
			from: this.configService.get("smtp.from"),
			to,
			subject: template.subject,
			html: template.html,
			text: template.text,
		});

		console.log(`Invite email sent to ${to}`);
	}

	private async sendReminder(data: any) {
		const { to, roomName, participantName, roomId, endAt } = data;
		const roomLink = `${this.configService.get("frontend.url")}/room/${roomId}`;

		const template = emailTemplates.reminder({
			roomName,
			participantName,
			roomLink,
			endAt: new Date(endAt).toLocaleString(),
		});

		await this.transporter.sendMail({
			from: this.configService.get("smtp.from"),
			to,
			subject: template.subject,
			html: template.html,
			text: template.text,
		});

		console.log(`Reminder email sent to ${to}`);
	}

	async close() {
		await this.worker.close();
	}
}
```

**Step 3: Create room closer worker**

Create `server/src/workers/room-closer.worker.ts`:

```typescript
import { Worker, Job } from "bullmq";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../config/database.config";
import { QUEUE_NAMES, JOB_NAMES } from "../queue/queues.constant";
import { ROOM_STATUS } from "../../generated/prisma";

export class RoomCloserWorker {
	private worker: Worker;

	constructor(private configService: ConfigService, private prisma: PrismaService) {
		const connection = {
			host: this.configService.get("redis.host"),
			port: this.configService.get("redis.port"),
		};

		this.worker = new Worker(QUEUE_NAMES.ROOM_CLOSER, async (job: Job) => this.processJob(job), { connection });

		this.worker.on("completed", (job) => {
			console.log(`Room closer job ${job.id} completed`);
		});

		this.worker.on("failed", (job, err) => {
			console.error(`Room closer job ${job?.id} failed:`, err);
		});
	}

	private async processJob(job: Job) {
		console.log(`Processing room closer job: ${job.name}`);

		if (job.name === JOB_NAMES.CHECK_EXPIRED_ROOMS) {
			return this.checkExpiredRooms();
		}

		throw new Error(`Unknown job name: ${job.name}`);
	}

	private async checkExpiredRooms() {
		const now = new Date();

		const expiredRooms = await this.prisma.rooms.findMany({
			where: {
				status: ROOM_STATUS.ACTIVE,
				end_at: { lte: now },
			},
			include: {
				votes: {
					include: {
						restaurant: true,
					},
				},
			},
		});

		console.log(`Found ${expiredRooms.length} expired rooms`);

		for (const room of expiredRooms) {
			// Calculate winner (most voted restaurant)
			const voteCounts = room.votes.reduce((acc, vote) => {
				acc[vote.restaurant_id] = (acc[vote.restaurant_id] || 0) + 1;
				return acc;
			}, {} as Record<string, number>);

			const winnerId = Object.entries(voteCounts).sort(([, a], [, b]) => b - a)[0]?.[0];

			await this.prisma.rooms.update({
				where: { id: room.id },
				data: {
					status: ROOM_STATUS.CLOSED,
					winner_restaurant_id: winnerId || null,
				},
			});

			console.log(`Closed room ${room.id}, winner: ${winnerId || "none"}`);
		}

		return { processed: expiredRooms.length };
	}

	async close() {
		await this.worker.close();
	}
}
```

**Step 4: Create worker entry point**

Create `server/src/workers/main.worker.ts`:

```typescript
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "../app.module";
import { PrismaService } from "../config/database.config";
import { EmailWorker } from "./email.worker";
import { RoomCloserWorker } from "./room-closer.worker";

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule);
	const configService = app.get(ConfigService);
	const prisma = app.get(PrismaService);

	const emailWorker = new EmailWorker(configService);
	const roomCloserWorker = new RoomCloserWorker(configService, prisma);

	console.log("Workers started successfully");
	console.log('- Email Worker: listening on queue "email"');
	console.log('- Room Closer Worker: listening on queue "room-closer"');

	// Graceful shutdown
	process.on("SIGINT", async () => {
		console.log("Shutting down workers...");
		await emailWorker.close();
		await roomCloserWorker.close();
		await app.close();
		process.exit(0);
	});
}

bootstrap();
```

**Step 5: Add worker start script**

Modify `server/package.json`:

```json
{
	"scripts": {
		"build": "nest build",
		"start:dev": "nest start --watch",
		"start:prod": "node .",
		"start:worker": "tsx --watch src/workers/main.worker.ts"
	}
}
```

**Step 6: Test workers start**

Run in separate terminal: `npm run start:worker`

Expected: Workers start and listen on queues.

**Step 7: Commit**

```bash
git add server/src/workers server/src/templates server/package.json
git commit -m "feat: implement email and room-closer workers"
```

---

## Task 5: Rooms Module - Create Room

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

---

## Task 6: Invitations Module - Send Invites

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

---

## Task 7: Join Room via Invite

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

---

## Task 8: Restaurants Module - List & Create

**Files:**

- Create: `server/src/restaurants/restaurants.module.ts`
- Create: `server/src/restaurants/restaurants.service.ts`
- Create: `server/src/restaurants/restaurants.controller.ts`
- Create: `server/src/restaurants/dto/create-restaurant.dto.ts`

**Step 1: Write tests**

Create `server/src/restaurants/__tests__/restaurants.service.spec.ts`:

```typescript
import { Test } from "@nestjs/testing";
import { RestaurantsService } from "../restaurants.service";
import { PrismaService } from "../../config/database.config";

describe("RestaurantsService", () => {
	let service: RestaurantsService;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				RestaurantsService,
				{
					provide: PrismaService,
					useValue: {
						restaurants: {
							findMany: jest.fn(),
							upsert: jest.fn(),
						},
					},
				},
			],
		}).compile();

		service = module.get(RestaurantsService);
		prisma = module.get(PrismaService);
	});

	it("should list all restaurants", async () => {
		const mockRestaurants = [
			{ id: "1", name: "KFC", menu_image_url: null },
			{ id: "2", name: "McDonalds", menu_image_url: null },
		];

		jest.spyOn(prisma.restaurants, "findMany").mockResolvedValue(mockRestaurants as any);

		const result = await service.listRestaurants();

		expect(result).toEqual(mockRestaurants);
	});

	it("should create or get existing restaurant", async () => {
		const dto = { name: "Pizza Hut" };
		const mockRestaurant = { id: "3", name: "Pizza Hut", menu_image_url: null };

		jest.spyOn(prisma.restaurants, "upsert").mockResolvedValue(mockRestaurant as any);

		const result = await service.createRestaurant(dto);

		expect(result).toEqual(mockRestaurant);
	});
});
```

**Step 2: Run test**

Run: `npm test -- restaurants.service.spec.ts`

Expected: FAIL.

**Step 3: Create DTO**

Create `server/src/restaurants/dto/create-restaurant.dto.ts`:

```typescript
export class CreateRestaurantDto {
	name: string;
	menuImageUrl?: string;
}
```

**Step 4: Implement service**

Create `server/src/restaurants/restaurants.service.ts`:

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../config/database.config";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Injectable()
export class RestaurantsService {
	constructor(private prisma: PrismaService) {}

	async listRestaurants() {
		return this.prisma.restaurants.findMany({
			orderBy: { name: "asc" },
		});
	}

	async createRestaurant(dto: CreateRestaurantDto) {
		return this.prisma.restaurants.upsert({
			where: { name: dto.name },
			update: {},
			create: {
				name: dto.name,
				menu_image_url: dto.menuImageUrl || null,
			},
		});
	}
}
```

**Step 5: Create controller**

Create `server/src/restaurants/restaurants.controller.ts`:

```typescript
import { Controller, Get, Post, Body } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Controller("restaurants")
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Get()
	async list() {
		return this.restaurantsService.listRestaurants();
	}

	@Post()
	async create(@Body() dto: CreateRestaurantDto) {
		return this.restaurantsService.createRestaurant(dto);
	}
}
```

**Step 6: Create module**

Create `server/src/restaurants/restaurants.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";
import { PrismaService } from "../config/database.config";

@Module({
	controllers: [RestaurantsController],
	providers: [RestaurantsService, PrismaService],
})
export class RestaurantsModule {}
```

**Step 7: Import in app module**

Add to `server/src/app.module.ts` imports array:

```typescript
import { RestaurantsModule } from './restaurants/restaurants.module';

imports: [
  // ...
  RestaurantsModule,
],
```

**Step 8: Run test**

Run: `npm test -- restaurants.service.spec.ts`

Expected: PASS.

**Step 9: Commit**

```bash
git add server/src/restaurants server/src/app.module.ts
git commit -m "feat: implement restaurants list and create endpoints"
```

---

## Task 9: Votes Module - Submit & Change Vote

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

---

## Task 10: WebSocket Gateway for Realtime Updates

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

---

## Task 11: Scheduled Jobs - Room Closer & Reminders

**Files:**

- Modify: `server/src/rooms/rooms.service.ts`
- Create: `server/src/workers/scheduler.service.ts`

**Step 1: Create scheduler service**

Create `server/src/workers/scheduler.service.ts`:

```typescript
import { Injectable, OnModuleInit } from "@nestjs/common";
import { QueueService } from "../queue/queue.service";
import { JOB_NAMES } from "../queue/queues.constant";

@Injectable()
export class SchedulerService implements OnModuleInit {
	constructor(private queueService: QueueService) {}

	async onModuleInit() {
		// Schedule room closer check every minute
		await this.queueService.roomCloserQueue.add(
			JOB_NAMES.CHECK_EXPIRED_ROOMS,
			{},
			{
				repeat: {
					every: 60000, // 1 minute
				},
			}
		);

		console.log("Scheduled room closer job");
	}

	async scheduleReminder(roomId: string, endAt: Date) {
		const reminderTime = new Date(endAt.getTime() - 60 * 60 * 1000); // 1 hour before

		if (reminderTime > new Date()) {
			await this.queueService.emailQueue.add(
				JOB_NAMES.SEND_REMINDER,
				{ roomId },
				{
					delay: reminderTime.getTime() - Date.now(),
				}
			);

			console.log(`Scheduled reminder for room ${roomId} at ${reminderTime}`);
		}
	}
}
```

**Step 2: Update reminder worker to fetch participants**

Modify `server/src/workers/email.worker.ts` sendReminder method:

```typescript
private async sendReminder(data: any) {
  const { roomId } = data;

  // Need to fetch room and participants who haven't voted
  // This requires Prisma access in worker
  // For now, accept full data from scheduler

  const { to, roomName, participantName, endAt } = data;
  const roomLink = `${this.configService.get('frontend.url')}/room/${roomId}`;

  const template = emailTemplates.reminder({
    roomName,
    participantName,
    roomLink,
    endAt: new Date(endAt).toLocaleString(),
  });

  await this.transporter.sendMail({
    from: this.configService.get('smtp.from'),
    to,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });

  console.log(`Reminder email sent to ${to}`);
}
```

**Step 3: Create a separate reminder scheduler in rooms service**

Modify `server/src/rooms/rooms.service.ts`:

```typescript
import { SchedulerService } from "../workers/scheduler.service";

@Injectable()
export class RoomsService {
	constructor(
		private prisma: PrismaService,
		private queueService: QueueService,
		private schedulerService: SchedulerService
	) {}

	async createRoom(dto: CreateRoomDto) {
		// ... existing code ...

		// Schedule reminder
		await this.schedulerService.scheduleReminder(room.id, room.end_at);

		return {
			roomId: room.id,
			ownerToken: room.owner_token,
			roomName: room.room_name,
			startAt: room.start_at,
			endAt: room.end_at,
		};
	}
}
```

**Step 4: Add SchedulerService to app**

Create `server/src/workers/workers.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { SchedulerService } from "./scheduler.service";

@Module({
	providers: [SchedulerService],
	exports: [SchedulerService],
})
export class WorkersModule {}
```

Import in app module:

```typescript
import { WorkersModule } from './workers/workers.module';

imports: [
  // ...
  WorkersModule,
],
```

**Step 5: Update RoomsModule to import WorkersModule**

```typescript
import { WorkersModule } from "../workers/workers.module";

@Module({
	imports: [WorkersModule],
	controllers: [RoomsController],
	providers: [RoomsService, PrismaService],
	exports: [RoomsService],
})
export class RoomsModule {}
```

**Step 6: Test scheduled jobs**

Run server: `npm run start:dev`
Run worker: `npm run start:worker`

Expected: Room closer job scheduled and runs every minute.

**Step 7: Commit**

```bash
git add server/src/workers server/src/rooms server/src/app.module.ts
git commit -m "feat: implement scheduled jobs for room closing and reminders"
```

---

## Task 12: Frontend Setup - React + Vite + TypeScript

**Files:**

- Create: `client/package.json`
- Create: `client/vite.config.ts`
- Create: `client/tsconfig.json`
- Create: `client/index.html`
- Create: `client/src/main.tsx`
- Create: `client/src/App.tsx`

**Step 1: Initialize frontend**

```bash
cd client
npm create vite@latest . -- --template react-ts
```

Accept overwriting files if prompted.

**Step 2: Install dependencies**

```bash
npm install
npm install socket.io-client react-router-dom
npm install -D @types/react @types/react-dom
```

**Step 3: Create API client**

Create `client/src/api/client.ts`:

```typescript
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
	async createRoom(data: { roomName: string; ownerEmail: string; ownerName: string; startAt: string; endAt: string }) {
		const res = await fetch(`${API_BASE}/rooms`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async sendInvites(data: { roomId: string; ownerToken: string; emails: string[] }) {
		const res = await fetch(`${API_BASE}/invitations/send`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async joinRoom(data: { token: string; name: string }) {
		const res = await fetch(`${API_BASE}/invitations/join`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async getRestaurants() {
		const res = await fetch(`${API_BASE}/restaurants`);
		return res.json();
	},

	async createRestaurant(data: { name: string; menuImageUrl?: string }) {
		const res = await fetch(`${API_BASE}/restaurants`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async submitVote(data: { roomId: string; participantId: string; restaurantId: string }) {
		const res = await fetch(`${API_BASE}/votes`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async getRoomVotes(roomId: string) {
		const res = await fetch(`${API_BASE}/votes/room/${roomId}`);
		return res.json();
	},
};
```

**Step 4: Create WebSocket hook**

Create `client/src/hooks/useSocket.ts`:

```typescript
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
```

**Step 5: Create basic App router**

Modify `client/src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomPage from "./pages/RoomPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<CreateRoomPage />}
				/>
				<Route
					path="/join/:token"
					element={<JoinRoomPage />}
				/>
				<Route
					path="/room/:roomId"
					element={<RoomPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
```

**Step 6: Create environment file**

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000
```

**Step 7: Test frontend dev server**

Run: `npm run dev`

Expected: Frontend runs on http://localhost:5173

**Step 8: Commit**

```bash
git add client
git commit -m "feat: setup React frontend with Vite and TypeScript"
```

---

## Task 13: Create Room Page

**Files:**

- Create: `client/src/pages/CreateRoomPage.tsx`

**Step 1: Create CreateRoomPage component**

Create `client/src/pages/CreateRoomPage.tsx`:

```tsx
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function CreateRoomPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		roomName: "",
		ownerEmail: "",
		ownerName: "",
		startAt: "",
		endAt: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const result = await api.createRoom(formData);
			localStorage.setItem("ownerToken", result.ownerToken);
			navigate(`/room/${result.roomId}?owner=true`);
		} catch (err) {
			setError("Failed to create room. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
			<h1>Create Food Voting Room</h1>

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 15 }}>
					<label>
						Room Name:
						<input
							type="text"
							value={formData.roomName}
							onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 15 }}>
					<label>
						Your Email:
						<input
							type="email"
							value={formData.ownerEmail}
							onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 15 }}>
					<label>
						Your Name:
						<input
							type="text"
							value={formData.ownerName}
							onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 15 }}>
					<label>
						Voting Starts At:
						<input
							type="datetime-local"
							value={formData.startAt}
							onChange={(e) => setFormData({ ...formData, startAt: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 15 }}>
					<label>
						Voting Ends At:
						<input
							type="datetime-local"
							value={formData.endAt}
							onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
						/>
					</label>
				</div>

				{error && <p style={{ color: "red" }}>{error}</p>}

				<button
					type="submit"
					disabled={loading}
					style={{ padding: "10px 20px", fontSize: 16 }}>
					{loading ? "Creating..." : "Create Room"}
				</button>
			</form>
		</div>
	);
}
```

**Step 2: Test page**

Run: `npm run dev`

Navigate to http://localhost:5173

Expected: Form renders, can fill and submit (assuming backend is running).

**Step 3: Commit**

```bash
git add client/src/pages/CreateRoomPage.tsx
git commit -m "feat: create room page UI"
```

---

## Task 14: Join Room Page

**Files:**

- Create: `client/src/pages/JoinRoomPage.tsx`

**Step 1: Create JoinRoomPage**

Create `client/src/pages/JoinRoomPage.tsx`:

```tsx
import { useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

export default function JoinRoomPage() {
	const navigate = useNavigate();
	const { token } = useParams<{ token: string }>();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!token) return;

		setLoading(true);
		setError("");

		try {
			const result = await api.joinRoom({ token, name });
			localStorage.setItem("participantId", result.participantId);
			navigate(`/room/${result.roomId}`);
		} catch (err: any) {
			setError(err.message || "Failed to join room. Invalid or expired invitation.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: 500, margin: "100px auto", padding: 20 }}>
			<h1>Join Voting Room</h1>
			<p>You've been invited to vote for food!</p>

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 15 }}>
					<label>
						Your Name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							style={{ width: "100%", padding: 8, marginTop: 5 }}
							placeholder="Enter your name"
						/>
					</label>
				</div>

				{error && <p style={{ color: "red" }}>{error}</p>}

				<button
					type="submit"
					disabled={loading}
					style={{ padding: "10px 20px", fontSize: 16 }}>
					{loading ? "Joining..." : "Join Room"}
				</button>
			</form>
		</div>
	);
}
```

**Step 2: Test join flow**

Run frontend and backend.

Expected: Can join via invite token link.

**Step 3: Commit**

```bash
git add client/src/pages/JoinRoomPage.tsx
git commit -m "feat: join room page UI"
```

---

## Task 15: Room Voting Page with Realtime

**Files:**

- Create: `client/src/pages/RoomPage.tsx`

**Step 1: Create RoomPage**

Create `client/src/pages/RoomPage.tsx`:

```tsx
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import { useSocket } from "../hooks/useSocket";

export default function RoomPage() {
	const { roomId } = useParams<{ roomId: string }>();
	const [searchParams] = useSearchParams();
	const isOwner = searchParams.get("owner") === "true";

	const [restaurants, setRestaurants] = useState<any[]>([]);
	const [votes, setVotes] = useState<any[]>([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState("");
	const [loading, setLoading] = useState(false);

	const { socket, isConnected } = useSocket(roomId || null);

	useEffect(() => {
		loadData();
	}, [roomId]);

	useEffect(() => {
		if (!socket) return;

		socket.on("vote-updated", (data) => {
			console.log("Vote updated:", data);
			loadVotes();
		});

		socket.on("room-closed", (data) => {
			console.log("Room closed:", data);
			alert(`Room closed! Winner: ${data.winnerName || "No votes"}`);
		});

		return () => {
			socket.off("vote-updated");
			socket.off("room-closed");
		};
	}, [socket]);

	const loadData = async () => {
		const [restaurantsData, votesData] = await Promise.all([api.getRestaurants(), api.getRoomVotes(roomId!)]);

		setRestaurants(restaurantsData);
		setVotes(votesData);
	};

	const loadVotes = async () => {
		const votesData = await api.getRoomVotes(roomId!);
		setVotes(votesData);
	};

	const handleVote = async () => {
		if (!selectedRestaurant) {
			alert("Please select a restaurant");
			return;
		}

		setLoading(true);
		try {
			const participantId = localStorage.getItem("participantId") || "";
			await api.submitVote({
				roomId: roomId!,
				participantId,
				restaurantId: selectedRestaurant,
			});
			await loadVotes();
			alert("Vote submitted!");
		} catch (err) {
			console.error(err);
			alert("Failed to submit vote");
		} finally {
			setLoading(false);
		}
	};

	const voteCounts = votes.reduce((acc, vote) => {
		const restaurantName = vote.restaurant.name;
		acc[restaurantName] = (acc[restaurantName] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	return (
		<div style={{ maxWidth: 800, margin: "50px auto", padding: 20 }}>
			<h1>Food Voting Room</h1>
			<p>Connection: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>

			<div style={{ marginBottom: 30 }}>
				<h2>Cast Your Vote</h2>
				<select
					value={selectedRestaurant}
					onChange={(e) => setSelectedRestaurant(e.target.value)}
					style={{ width: "100%", padding: 10, fontSize: 16 }}>
					<option value="">-- Select a restaurant --</option>
					{restaurants.map((r) => (
						<option
							key={r.id}
							value={r.id}>
							{r.name}
						</option>
					))}
				</select>

				<button
					onClick={handleVote}
					disabled={loading}
					style={{ marginTop: 10, padding: "10px 20px", fontSize: 16 }}>
					{loading ? "Submitting..." : "Submit Vote"}
				</button>
			</div>

			<div>
				<h2>Live Results ({votes.length} votes)</h2>
				<ul>
					{Object.entries(voteCounts)
						.sort(([, a], [, b]) => b - a)
						.map(([name, count]) => (
							<li
								key={name}
								style={{ fontSize: 18, marginBottom: 10 }}>
								<strong>{name}</strong>: {count} vote{count !== 1 ? "s" : ""}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
```

**Step 2: Test full flow**

1. Create room
2. Get invite link (manually copy from DB or add invite UI)
3. Join via invite
4. Vote
5. See realtime updates

Expected: Votes update in realtime across clients.

**Step 3: Commit**

```bash
git add client/src/pages/RoomPage.tsx
git commit -m "feat: room voting page with realtime updates"
```

---

## Task 16: Add Invite UI for Owners

**Files:**

- Modify: `client/src/pages/RoomPage.tsx`

**Step 1: Add invite section to RoomPage**

Modify `client/src/pages/RoomPage.tsx`:

```tsx
// Add state
const [inviteEmails, setInviteEmails] = useState("");
const [sendingInvites, setSendingInvites] = useState(false);

// Add function
const handleSendInvites = async () => {
	const emails = inviteEmails
		.split(",")
		.map((e) => e.trim())
		.filter(Boolean);
	if (emails.length === 0) {
		alert("Enter at least one email");
		return;
	}

	setSendingInvites(true);
	try {
		const ownerToken = localStorage.getItem("ownerToken") || "";
		await api.sendInvites({ roomId: roomId!, ownerToken, emails });
		alert(`Invites sent to ${emails.length} people!`);
		setInviteEmails("");
	} catch (err) {
		console.error(err);
		alert("Failed to send invites");
	} finally {
		setSendingInvites(false);
	}
};

// Add to JSX before voting section
{
	isOwner && (
		<div style={{ marginBottom: 30, padding: 20, background: "#f0f0f0", borderRadius: 8 }}>
			<h2>Invite Participants</h2>
			<p>Enter emails separated by commas:</p>
			<textarea
				value={inviteEmails}
				onChange={(e) => setInviteEmails(e.target.value)}
				placeholder="alice@example.com, bob@example.com"
				rows={3}
				style={{ width: "100%", padding: 10, fontSize: 14 }}
			/>
			<button
				onClick={handleSendInvites}
				disabled={sendingInvites}
				style={{ marginTop: 10, padding: "10px 20px", fontSize: 16 }}>
				{sendingInvites ? "Sending..." : "Send Invites"}
			</button>
		</div>
	);
}
```

**Step 2: Test invite flow**

Create room → see invite section → enter emails → send invites → check email

Expected: Invites sent, emails received.

**Step 3: Commit**

```bash
git add client/src/pages/RoomPage.tsx
git commit -m "feat: add invite UI for room owners"
```

---

## Task 17: End-to-End Testing & Documentation

**Files:**

- Create: `README.md`
- Create: `docs/API.md`

**Step 1: Create README**

Create `README.md`:

````markdown
# Food Voting App MVP

A realtime web app for groups to vote on restaurants within a time window.

## Features

- Token-based authentication (no accounts)
- Realtime voting with WebSocket
- Email invitations & reminders
- Background job processing (BullMQ + Valkey)
- Winner determination (most votes)

## Tech Stack

**Backend:** NestJS, Prisma, PostgreSQL, BullMQ, Valkey, Nodemailer, WebSocket

**Frontend:** React, Vite, TypeScript, Socket.io Client

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL
- Valkey (Redis)

### Backend Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
````

2. Configure environment:

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Run migrations:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start backend:

   ```bash
   npm run start:dev
   ```

5. Start workers (in separate terminal):
   ```bash
   npm run start:worker
   ```

### Frontend Setup

1. Install dependencies:

   ```bash
   cd client
   npm install
   ```

2. Configure environment:

   ```bash
   cp .env.example .env
   ```

3. Start frontend:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to http://localhost:5173
2. Create a new voting room
3. Send invites to participants
4. Participants join via invite link
5. Everyone votes for restaurants
6. See realtime results
7. Room closes automatically at end time

## Testing

Run backend tests:

```bash
cd server
npm test
```

## API Documentation

See [docs/API.md](docs/API.md)

## Architecture

- **Main App**: API + WebSocket (port 3000)
- **Workers**: Separate process for email + room closing
- **Queue**: BullMQ with Valkey
- **Database**: PostgreSQL with Prisma ORM

````

**Step 2: Create API documentation**

Create `docs/API.md`:

```markdown
# API Documentation

Base URL: `http://localhost:3000`

## Rooms

### Create Room
`POST /rooms`

Request:
```json
{
  "roomName": "Team Lunch",
  "ownerEmail": "owner@example.com",
  "ownerName": "Alice",
  "startAt": "2026-01-15T12:00:00Z",
  "endAt": "2026-01-15T13:00:00Z"
}
````

Response:

```json
{
	"roomId": "uuid",
	"ownerToken": "token",
	"roomName": "Team Lunch",
	"startAt": "2026-01-15T12:00:00Z",
	"endAt": "2026-01-15T13:00:00Z"
}
```

## Invitations

### Send Invites

`POST /invitations/send`

Request:

```json
{
	"roomId": "uuid",
	"ownerToken": "token",
	"emails": ["user1@example.com", "user2@example.com"]
}
```

### Join Room

`POST /invitations/join`

Request:

```json
{
	"token": "invite-token",
	"name": "Bob"
}
```

## Restaurants

### List Restaurants

`GET /restaurants`

### Create Restaurant

`POST /restaurants`

Request:

```json
{
	"name": "Pizza Hut",
	"menuImageUrl": "https://..."
}
```

## Votes

### Submit Vote

`POST /votes`

Request:

```json
{
	"roomId": "uuid",
	"participantId": "uuid",
	"restaurantId": "uuid"
}
```

### Get Room Votes

`GET /votes/room/:roomId`

## WebSocket Events

Connect to `ws://localhost:3000`

### Client → Server

**Join Room:**

```json
["join-room", { "roomId": "uuid" }]
```

**Leave Room:**

```json
["leave-room", { "roomId": "uuid" }]
```

### Server → Client

**Vote Updated:**

```json
[
	"vote-updated",
	{
		"voteId": "uuid",
		"participantName": "Alice",
		"restaurantName": "KFC",
		"votedAt": "2026-01-15T12:30:00Z"
	}
]
```

**Room Closed:**

```json
[
	"room-closed",
	{
		"roomId": "uuid",
		"winnerName": "KFC"
	}
]
```

````

**Step 3: Manual E2E test**

Run through complete flow:
1. Start PostgreSQL, Valkey
2. Start backend server
3. Start worker process
4. Start frontend
5. Create room
6. Send invites
7. Join via invite (different browser/incognito)
8. Vote from both clients
9. Verify realtime updates
10. Wait for room to close (or manually update end_at to past time)
11. Verify winner calculated

**Step 4: Commit**

```bash
git add README.md docs/API.md
git commit -m "docs: add README and API documentation"
````

---

## Task 18: Production Build & Deployment Prep

**Files:**

- Create: `server/Dockerfile`
- Create: `client/Dockerfile`
- Create: `docker-compose.yml`
- Modify: `server/package.json`
- Modify: `client/package.json`

**Step 1: Add production scripts**

Modify `server/package.json`:

```json
{
	"scripts": {
		"build": "nest build",
		"start:dev": "nest start --watch",
		"start:prod": "node dist/src/main",
		"start:worker": "tsx --watch src/workers/main.worker.ts",
		"start:worker:prod": "node dist/src/workers/main.worker"
	}
}
```

**Step 2: Create server Dockerfile**

Create `server/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

**Step 3: Create client Dockerfile**

Create `client/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Step 4: Create docker-compose**

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: voteapp
      POSTGRES_PASSWORD: password
      POSTGRES_DB: vote_app
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  valkey:
    image: valkey/valkey:latest
    ports:
      - "6379:6379"

  backend:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://voteapp:password@postgres:5432/vote_app
      REDIS_HOST: valkey
      REDIS_PORT: 6379
    depends_on:
      - postgres
      - valkey

  worker:
    build: ./server
    command: npm run start:worker:prod
    environment:
      DATABASE_URL: postgresql://voteapp:password@postgres:5432/vote_app
      REDIS_HOST: valkey
      REDIS_PORT: 6379
    depends_on:
      - postgres
      - valkey

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

**Step 5: Test production build**

```bash
docker-compose up --build
```

Expected: All services start successfully.

**Step 6: Create .dockerignore files**

Create `server/.dockerignore`:

```
node_modules
dist
.env
```

Create `client/.dockerignore`:

```
node_modules
dist
.env
```

**Step 7: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore server/package.json
git commit -m "feat: add Docker support and production build"
```

---

## Completion Checklist

- [x] Database schema with Prisma
- [x] BullMQ queue setup
- [x] Email & room-closer workers
- [x] REST API endpoints (rooms, invitations, restaurants, votes)
- [x] WebSocket gateway for realtime
- [x] Scheduled jobs (room closer, reminders)
- [x] React frontend with routing
- [x] Create room UI
- [x] Join room UI
- [x] Voting UI with realtime updates
- [x] Invite management UI
- [x] Unit & integration tests
- [x] Documentation (README, API docs)
- [x] Docker support
- [ ] Deploy to production (optional)

---

## Next Steps After MVP

**Performance:**

- Add caching (Redis for restaurant lists)
- Database indexing optimization
- WebSocket horizontal scaling (Redis adapter)

**Features:**

- Room settings (allow participants to add restaurants toggle)
- Multiple reminder times
- Vote history
- Analytics dashboard for owners

**Security:**

- Rate limiting
- Input validation (class-validator)
- CSRF protection
- Helmet.js for headers

**DevOps:**

- CI/CD pipeline (GitHub Actions)
- Monitoring (Sentry, DataDog)
- Logging (Winston, Pino)
- Health checks

