# Task 4: Email Worker Implementation

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
