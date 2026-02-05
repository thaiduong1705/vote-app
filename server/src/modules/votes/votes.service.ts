import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/config/database.config";
import { SubmitVoteDto } from "./dto/submit-vote.dto";
import { ROOM_STATUS } from "prisma/generated/enums";
import { RealtimeGateway } from "src/realtime/realtime.gateway";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class VotesService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly realtimeGateway: RealtimeGateway,
		private readonly jwtService: JwtService,
	) {}

	async submitVote(dto: SubmitVoteDto, participantEmail: string) {
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
				room_id_email: {
					room_id: dto.roomId,
					email: participantEmail,
				},
			},
		});

		if (!participant) {
			throw new NotFoundException("Participant not found in the room");
		}

		const vote = await this.prismaService.votes.upsert({
			where: {
				room_id_participant_id: {
					room_id: dto.roomId,
					participant_id: participant.id,
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

		this.realtimeGateway.broadcastVoteUpdate(dto.roomId, {
			voteId: vote.id,
			participantEmail: vote.participant.email,
			restaurantName: vote.restaurant.name,
			votedAt: vote.voted_at,
		});

		return vote;
	}

	async getRoomVotes(roomId: string, token?: string) {
		const votes = await this.prismaService.votes.findMany({
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

		const restaurants = await this.prismaService.restaurants.findMany();
		const participants = await this.prismaService.participants.findMany({
			where: { room_id: roomId },
			select: {
				id: true,
				email: true,
				joined_at: true,
				role: true,
			},
		});

		let currentUserRole: string | null = null;

		// Determine current user's role if token provided
		if (token) {
			try {
				const decoded = this.jwtService.verify<{ participantEmail: string; roomId: string }>(token);

				if (decoded && decoded.roomId === roomId) {
					const participant = participants.find((p) => p.email === decoded.participantEmail);
					if (participant) {
						currentUserRole = participant.role;
					}
				}
			} catch (error) {
				// Invalid token, ignore
			}
		}

		return {
			votes,
			restaurants,
			participants: participants.map((p) => ({
				id: p.id,
				name: p.email.split("@")[0],
				createdAt: p.joined_at,
			})),
			currentUserRole,
		};
	}
}
