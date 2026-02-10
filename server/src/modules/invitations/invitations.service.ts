import { InjectQueue } from "@nestjs/bullmq";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Queue } from "bullmq";
import { JOB_NAMES, QUEUE_NAMES } from "src/utils/constant";
import { SendInvitesDto } from "./dto/send-invites.dto";
import { PrismaService } from "src/config/database.config";
import { JwtService } from "@nestjs/jwt";
import { getNameFromEmail } from "src/utils/helpers";
import { RealtimeGateway } from "src/realtime/realtime.gateway";

@Injectable()
export class InvitationsService {
	constructor(
		@InjectQueue(QUEUE_NAMES.EMAIL) private emailQueue: Queue,
		private prismaService: PrismaService,
		private jwtService: JwtService,
		private realtimeGateway: RealtimeGateway,
	) {}

	async sendInvites(dto: SendInvitesDto, ownerToken: string) {
		// decode and verify owner token
		const decoded = this.jwtService.verify<{ roomId: string; email: string }>(ownerToken);
		if (decoded.roomId !== dto.roomId) {
			throw new UnauthorizedException("Invalid owner token");
		}
		const room = await this.prismaService.rooms.findUnique({
			where: { id: dto.roomId, status: "ACTIVE" },
			include: {
				participants: {
					where: { role: "HOST", email: decoded.email },
				},
			},
		});
		if (!room) {
			throw new NotFoundException("Room not found");
		}

		const expireAt = room.endAt;
		const invitations = dto.emails.map((email) => {
			return {
				roomId: room.id,
				email,
				expiresAt: expireAt,
			};
		});

		await this.prismaService.invitations.createMany({
			data: invitations,
			skipDuplicates: true,
		});

		const owner = room.participants[0];

		invitations.forEach(async (invitation) => {
			await this.emailQueue.add(JOB_NAMES.SEND_INVITE, {
				to: invitation.email,
				roomName: room.roomName,
				ownerName: getNameFromEmail(owner.email),
				inviteToken: this.jwtService.sign(
					{
						roomId: room.id,
						email: invitation.email,
					},
					{ expiresIn: Math.floor((expireAt.getTime() - Date.now()) / 1000) },
				),
				endAt: room.endAt,
			});
		});

		return { invited: invitations.length };
	}

	async joinRoom(token: string) {
		console.log(token);
		const decoded = this.jwtService.verify<{ roomId: string; email: string }>(token.trim());
		const invitation = await this.prismaService.invitations.findUnique({
			where: {
				roomId_email: {
					roomId: decoded.roomId,
					email: decoded.email,
				},
			},
		});

		if (!invitation) {
			throw new NotFoundException("Invalid or expired invitation token");
		}
		if (invitation.expiresAt < new Date()) {
			throw new BadRequestException("Invitation token has expired");
		}
		if (invitation.usedAt) {
			throw new BadRequestException("Invitation token has already been used");
		}

		// Mark invitation as used
		await this.prismaService.invitations.update({
			where: { id: invitation.id },
			data: { usedAt: new Date() },
		});

		// update participant list of that room
		await this.prismaService.participants.create({
			data: {
				roomId: invitation.roomId,
				email: invitation.email,
				role: "GUEST",
				joinedAt: new Date(),
			},
		});

		// get the endAt of the room to set token expiry
		const room = await this.prismaService.rooms.findUnique({
			where: { id: invitation.roomId },
		});

		if (!room) {
			throw new NotFoundException("Room not found");
		}

		// notify
		this.realtimeGateway.broadcastRestaurantsUpdated(invitation.roomId);

		const accessToken = this.jwtService.sign(
			{
				roomId: invitation.roomId,
				email: invitation.email,
			},
			{
				expiresIn: Math.floor((room.endAt.getTime() - Date.now()) / 1000),
			},
		);

		return { roomId: invitation.roomId, token: accessToken };
	}
}
