import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { JOB_NAMES, QUEUE_NAMES } from "src/utils/constant";

@Injectable()
export class SchedulerService implements OnModuleInit {
	constructor(
		@InjectQueue(QUEUE_NAMES.ROOM_CLOSER) private roomCloserQueue: Queue,
		@InjectQueue(QUEUE_NAMES.EMAIL) private emailQueue: Queue,
	) {}

	async onModuleInit() {
		await this.roomCloserQueue.add(JOB_NAMES.CHECK_EXPIRED_ROOMS, {}, { repeat: { every: 60000 } });
		console.log("Scheduled room closer job");
	}

	async scheduleReminder(roomId: string, endAt: Date) {
		const reminderTime = new Date(endAt.getTime() - 15 * 60 * 1000); // 15 minutes before endAt

		if (reminderTime > new Date()) {
			await this.emailQueue.add(JOB_NAMES.SEND_REMINDER, { roomId }, { delay: reminderTime.getTime() - Date.now() });
			console.log(`Scheduled reminder for room ${roomId} at ${reminderTime.toISOString()}`);
		}
	}
}
