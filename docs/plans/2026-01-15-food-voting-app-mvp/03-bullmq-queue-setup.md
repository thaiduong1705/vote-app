# Task 3: BullMQ Queue Setup

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
