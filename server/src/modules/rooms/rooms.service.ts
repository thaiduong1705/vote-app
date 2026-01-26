import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { QUEUE_NAMES } from "src/queue/queue.constant";

@Injectable()
export class RoomsService {
	constructor(@InjectQueue(QUEUE_NAMES.ROOM_CLOSER) private roomCloserQueue: Queue) {}

	async scheduleRoomClosure(roomId: string, closeAt: Date) {}
}
