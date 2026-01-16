# Task 11: Scheduled Jobs - Room Closer & Reminders

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
