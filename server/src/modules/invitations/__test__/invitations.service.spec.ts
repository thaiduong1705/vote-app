import { Test } from "@nestjs/testing";
import { InvitationsService } from "../invitations.service";
import { PrismaService } from "../../../config/database.config";
import { Queue } from "bullmq";
import { getQueueToken } from "@nestjs/bullmq";
import { QUEUE_NAMES } from "../../../utils/constant";
import { JwtService } from "@nestjs/jwt";
import { SendInvitesDto } from "../dto/send-invites.dto";

describe("InvitationsService", () => {
	let service: InvitationsService;
	let prisma: PrismaService;
	let queueService: Queue;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				InvitationsService,
				{
					provide: PrismaService,
					useValue: {
						rooms: { findUnique: jest.fn() },
						invitations: { createMany: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
						participants: { create: jest.fn() },
					},
				},
				{
					provide: getQueueToken(QUEUE_NAMES.EMAIL),
					useValue: {
						add: jest.fn(),
					},
				},
				{
					provide: JwtService,
					useValue: {
						verify: jest.fn(),
						sign: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get(InvitationsService);
		prisma = module.get(PrismaService);
		queueService = module.get<Queue>(getQueueToken(QUEUE_NAMES.EMAIL));
		jwtService = module.get(JwtService);
	});

	describe("sendInvites", () => {
		it("should create invitations and queue email jobs", async () => {
			const dto: SendInvitesDto = {
				roomId: "room-123",
				emails: ["user1@test.com", "user2@test.com"],
			};
			const ownerToken = "valid-jwt-token";

			const mockRoom = {
				id: "room-123",
				room_name: "Test Room",
				end_at: new Date(Date.now() + 3600000), // 1 hour from now
				status: "ACTIVE",
				participants: [{ email: "owner@test.com", role: "HOST" }],
			};

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "owner@test.com" });
			jest.spyOn(jwtService, "sign").mockReturnValue("invite-token-123");
			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
			jest.spyOn(prisma.invitations, "createMany").mockResolvedValue({ count: 2 } as any);

			const result = await service.sendInvites(dto, ownerToken);

			expect(jwtService.verify).toHaveBeenCalledWith(ownerToken);
			expect(result.invited).toBe(2);
			expect(queueService.add).toHaveBeenCalledTimes(2);
			expect(prisma.invitations.createMany).toHaveBeenCalledWith({
				data: expect.arrayContaining([
					expect.objectContaining({ email: "user1@test.com", room_id: "room-123" }),
					expect.objectContaining({ email: "user2@test.com", room_id: "room-123" }),
				]),
				skipDuplicates: true,
			});
		});

		it("should throw UnauthorizedException if owner token is invalid", async () => {
			const dto = {
				roomId: "room-123",
				emails: ["user1@test.com"],
			};
			const ownerToken = "invalid-token";

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "different-room", email: "owner@test.com" });

			await expect(service.sendInvites(dto, ownerToken)).rejects.toThrow("Invalid owner token");
		});

		it("should throw NotFoundException if room not found or inactive", async () => {
			const dto = {
				roomId: "room-123",
				emails: ["user1@test.com"],
			};
			const ownerToken = "valid-token";

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "owner@test.com" });
			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(null);

			await expect(service.sendInvites(dto, ownerToken)).rejects.toThrow("Room not found");
		});
	});

	describe("joinRoom", () => {
		it("should create participant and mark invitation as used", async () => {
			const token = "valid-invite-token";

			const mockInvite = {
				id: "invitation-123",
				room_id: "room-123",
				email: "bob@test.com",
				expires_at: new Date(Date.now() + 10000),
				used_at: null,
			};

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "bob@test.com" });
			jest.spyOn(prisma.invitations, "findUnique").mockResolvedValue(mockInvite as any);
			jest.spyOn(prisma.invitations, "update").mockResolvedValue({} as any);
			jest.spyOn(prisma.participants, "create").mockResolvedValue({
				id: "participant-123",
				room_id: "room-123",
				email: "bob@test.com",
				role: "GUEST",
			} as any);

			await service.joinRoom(token);

			expect(jwtService.verify).toHaveBeenCalledWith(token);
			expect(prisma.invitations.findUnique).toHaveBeenCalledWith({
				where: {
					room_id_email: {
						room_id: "room-123",
						email: "bob@test.com",
					},
				},
			});
			expect(prisma.invitations.update).toHaveBeenCalledWith({
				where: { id: "invitation-123" },
				data: { used_at: expect.any(Date) },
			});
			expect(prisma.participants.create).toHaveBeenCalledWith({
				data: {
					room_id: "room-123",
					email: "bob@test.com",
					role: "GUEST",
				},
			});
		});

		it("should throw NotFoundException if invitation not found", async () => {
			const token = "invalid-token";

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "bob@test.com" });
			jest.spyOn(prisma.invitations, "findUnique").mockResolvedValue(null);

			await expect(service.joinRoom(token)).rejects.toThrow("Invalid or expired invitation token");
		});

		it("should throw BadRequestException if invitation expired", async () => {
			const token = "expired-token";

			const mockInvite = {
				id: "invitation-123",
				room_id: "room-123",
				email: "bob@test.com",
				expires_at: new Date(Date.now() - 10000), // expired
				used_at: null,
			};

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "bob@test.com" });
			jest.spyOn(prisma.invitations, "findUnique").mockResolvedValue(mockInvite as any);

			await expect(service.joinRoom(token)).rejects.toThrow("Invitation token has expired");
		});

		it("should throw BadRequestException if invitation already used", async () => {
			const token = "used-token";

			const mockInvite = {
				id: "invitation-123",
				room_id: "room-123",
				email: "bob@test.com",
				expires_at: new Date(Date.now() + 10000),
				used_at: new Date(Date.now() - 5000), // already used
			};

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "bob@test.com" });
			jest.spyOn(prisma.invitations, "findUnique").mockResolvedValue(mockInvite as any);

			await expect(service.joinRoom(token)).rejects.toThrow("Invitation token has already been used");
		});
	});
});
