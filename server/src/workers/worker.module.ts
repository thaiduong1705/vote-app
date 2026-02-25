import { Module } from "@nestjs/common";
import { EmailWorker } from "./email.worker";
import { RoomCloserWorker } from "./room-closer.worker";
import { QUEUE_NAMES } from "src/utils/constant";
import { BullModule } from "@nestjs/bullmq/dist/bull.module";
import { PrismaService } from "src/config/database.config";
import { SchedulerService } from "./scheduler.service";
import { RealtimeModule } from "src/realtime/realtime.module";

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
		RealtimeModule,
	],
	providers: [EmailWorker, RoomCloserWorker, PrismaService, SchedulerService],
	exports: [BullModule, SchedulerService],
})
export class WorkerModule {}
