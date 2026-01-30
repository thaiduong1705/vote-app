import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/config/database.config";
import { SubmitVoteDto } from "./dto/submit-vote.dto";
import { ROOM_STATUS } from "prisma/generated/enums";

@Injectable()
export class VotesService {
	constructor(private readonly prismaService: PrismaService) {}

	async submitVote(dto: SubmitVoteDto, userId: string) {
		const room = await this.prismaService.rooms.findUnique({
			where: { id: dto.roomId },
		});

		if (!room) {
			throw new NotFoundException("Room not found");
		}

		if (room.status !== ROOM_STATUS.ACTIVE) {
			throw new BadRequestException("Room is not active");
		}

		const participant = await this.prismaService.participants.findUnique({
			where: {
				id: userId,
				room_id: dto.roomId,
			},
		});

		if (!participant) {
			throw new NotFoundException("Participant not found in the room");
		}

		const vote = await this.prismaService.votes.upsert({
			where: {
				room_id_participant_id: {
					room_id: dto.roomId,
					participant_id: userId,
				},
			},
			update: {
				restaurant_id: dto.restaurantId,
				voted_at: new Date(),
			},
			create: {
				room_id: dto.roomId,
				participant_id: participant.id,
				participant_email: participant.email,
				restaurant_id: dto.restaurantId,
				voted_at: new Date(),
			},
			include: {
				restaurant: true,
				participant: true,
			},
		});

		return vote;
	}

	async getRoomVotes(roomId: string) {
		return this.prismaService.votes.findMany({
			where: { room_id: roomId },
			include: {
				restaurant: true,
				participant: {
					select: {
						id: true,
						email: true,
					},
				},
			},
		});
	}
}
