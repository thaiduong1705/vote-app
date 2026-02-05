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
		return { room, token };
	}

	async verifyOwner(roomId: string, token: string): Promise<{ isOwner: boolean; role?: string }> {
		if (!token) {
			return { isOwner: false };
		}

		try {
			const decoded = this.jwtService.verify<{ participantEmail: string; roomId: string }>(token);

			// Verify roomId matches
			if (decoded.roomId !== roomId) {
				return { isOwner: false };
			}

			// Check if participant is HOST in this room
			const participant = await this.prismaService.participants.findFirst({
				where: {
					room_id: roomId,
					email: decoded.participantEmail,
					role: PARTICIPANT_ROLE.HOST,
				},
			});

			if (participant) {
				return { isOwner: true, role: participant.role };
			}

			return { isOwner: false };
		} catch (error) {
			return { isOwner: false };
		}
	}

	async verifyRoomAccess(roomId: string, email: string): Promise<boolean> {
		const participant = await this.prismaService.rooms.findFirst({
			where: {
				id: roomId,
			},
			include: {
				participants: {
					where: {
						email: email,
					},
				},
			},
		});

		if (!participant) {
			return false;
		}

		return true;
	}

	private generateToken(byteLength: number, stringType: BufferEncoding): string {
		return randomBytes(byteLength).toString(stringType);
	}
}
