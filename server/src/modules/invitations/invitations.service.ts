import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "src/queue/queue.constant";

@Injectable()
export class InvitationsService {
	constructor(@InjectQueue(QUEUE_NAMES.EMAIL) private emailQueue: Queue) {}

	async sendInvitationEmail() {}
	async sendReminderEmail() {}
}
