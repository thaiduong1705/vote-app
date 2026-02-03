import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/database.config";
import { CreateRoomDto } from "./dto/create-room-dto";
import { randomBytes } from "node:crypto";
import { PARTICIPANT_ROLE } from "prisma/generated/enums";
import { SchedulerService } from "src/workers/scheduler.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoomsService {
	constructor(
		private prismaService: PrismaService,
		private schedulerService: SchedulerService,
		private jwtService: JwtService,
	) {}

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

		const token = this.jwtService.sign(
			{ participantEmail: dto.ownerEmail, roomId: room.id },
			{ expiresIn: new Date(dto.endAt).getTime() - Date.now() },
		);

		await this.schedulerService.scheduleReminder(room.id, dto.endAt);
		return { room, ownerToken: token };
	}

	private generateToken(byteLength: number, stringType: BufferEncoding): string {
		return randomBytes(byteLength).toString(stringType);
	}
}
