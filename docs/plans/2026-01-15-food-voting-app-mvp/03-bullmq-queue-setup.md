# Task 3: BullMQ Queue Setup

> **Note:** Setup theo NestJS Official Documentation: https://docs.nestjs.com/techniques/queues

**Files:**

- Create: `server/src/queue/queue.constant.ts`
- Modify: `server/src/app.module.ts`

**Step 1: Define queue constants**

Create `server/src/queue/queue.constant.ts`:

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

**Step 2: Setup BullModule in app.module.ts**

Modify `server/src/app.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { envConfig } from "./config/env.config";
import { validate } from "./config/env.validation";
import { PrismaService } from "./config/database.config";
import { QUEUE_NAMES } from "./queue/queue.constant";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
			validate,
			cache: true,
		}),
		// Setup BullMQ connection
		BullModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				connection: {
					host: configService.get<string>("redis.host"),
					port: configService.get<number>("redis.port"),
				},
			}),
			inject: [ConfigService],
		}),
		// Register queues
		BullModule.registerQueue(
			{
				name: QUEUE_NAMES.EMAIL,
			},
			{
				name: QUEUE_NAMES.ROOM_CLOSER,
			}
		),
	],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
```

**Step 3: Using queues in services**

To use a queue in a service, inject it using `@InjectQueue()`:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { QUEUE_NAMES, JOB_NAMES } from "./queue/queue.constant";

@Injectable()
export class SomeService {
	constructor(
		@InjectQueue(QUEUE_NAMES.EMAIL) private emailQueue: Queue
	) {}

	async addEmailJob(data: any) {
		await this.emailQueue.add(JOB_NAMES.SEND_INVITE, data);
	}
}
```

**Step 5: Test queue initialization**

Run: `npm run start:dev`

Expected: Server starts, BullMQ queues initialized without errors.
