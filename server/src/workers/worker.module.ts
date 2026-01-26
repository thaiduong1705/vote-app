import { Module } from "@nestjs/common";
import { EmailWorker } from "./email.worker";
import { RoomCloserWorker } from "./room-closer.worker";
import { QUEUE_NAMES } from "src/queue/queue.constant";
import { BullModule } from "@nestjs/bullmq/dist/bull.module";
import { PrismaService } from "src/config/database.config";

@Module({
	imports: [
		BullModule.registerQueue(
			{
				name: QUEUE_NAMES.EMAIL,
			},
			{
				name: QUEUE_NAMES.ROOM_CLOSER,
			},
		),
	],
	providers: [EmailWorker, RoomCloserWorker, PrismaService],
	exports: [BullModule],
})
export class WorkerModule {}
