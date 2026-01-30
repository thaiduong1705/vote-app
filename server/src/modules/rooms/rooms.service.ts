import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { PrismaService } from "src/config/database.config";
import { QUEUE_NAMES } from "src/utils/constant";
import { CreateRoomDto } from "./dto/create-room-dto";
import { randomBytes } from "node:crypto";
import { PARTICIPANT_ROLE } from "prisma/generated/enums";

@Injectable()
export class RoomsService {
	constructor(
		@InjectQueue(QUEUE_NAMES.ROOM_CLOSER) private roomCloserQueue: Queue,
		private prismaService: PrismaService,
	) {}

	async scheduleRoomClosure(roomId: string, closeAt: Date) {}

	async createRoom(dto: CreateRoomDto) {
		const ownerId = this.generateToken(16, "hex");
		const room = await this.prismaService.rooms.create({
			data: {
				room_name: dto.roomName,
				owner_id: ownerId,
				start_at: dto.startAt,
				end_at: dto.endAt,
				participants: {
					create: {
						id: ownerId,
						email: dto.ownerEmail,
						joined_at: new Date(),
						role: PARTICIPANT_ROLE.HOST,
					},
				},
			},
		});
		return room;
	}

	private generateToken(byteLength: number, stringType: BufferEncoding): string {
		return randomBytes(byteLength).toString(stringType);
	}
}
