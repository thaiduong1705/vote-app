import { Module } from "@nestjs/common";
import { EmailWorker } from "./email.worker";
import { RoomCloserWorker } from "./room-closer.worker";
import { QUEUE_NAMES } from "src/queue/queue.constant";
import { BullModule } from "@nestjs/bullmq/dist/bull.module";
import { PrismaService } from "src/config/database.config";
import { InvitationsService } from "src/modules/invitations/invitations.service";
import { RoomsService } from "src/modules/rooms/rooms.service";

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
	providers: [EmailWorker, RoomCloserWorker, PrismaService, InvitationsService, RoomsService],
})
export class WorkerModule {}
