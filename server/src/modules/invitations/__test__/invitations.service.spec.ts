import { Test } from "@nestjs/testing";
import { InvitationsService } from "../invitations.service";
import { PrismaService } from "../../../config/database.config";
import { Queue } from "bullmq";
import { getQueueToken } from "@nestjs/bullmq";
import { QUEUE_NAMES } from "../../../utils/constant";

describe("InvitationsService", () => {
	let service: InvitationsService;
	let prisma: PrismaService;
	let queueService: Queue;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				InvitationsService,
				{
					provide: PrismaService,
					useValue: {
						rooms: { findUnique: jest.fn() },
						invitations: { createMany: jest.fn() },
					},
				},
				{
					provide: getQueueToken(QUEUE_NAMES.EMAIL),
					useValue: {
						add: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get(InvitationsService);
		prisma = module.get(PrismaService);
		queueService = module.get<Queue>(getQueueToken(QUEUE_NAMES.EMAIL));
	});

	describe("sendInvites", () => {
		it("should create invitations and queue email jobs", async () => {
			const dto = {
				roomId: "room-123",
				ownerToken: "valid-token",
				emails: ["user1@test.com", "user2@test.com"],
			};

			const mockRoom = {
				id: "room-123",
				owner_token: "valid-token",
				room_name: "Test Room",
				end_at: new Date(),
				participants: [{ email: "owner@test.com", participant_name: "Owner" }],
			};

			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
			jest.spyOn(prisma.invitations, "createMany").mockResolvedValue({ count: 2 } as any);

			const result = await service.sendInvites(dto);

			expect(result.invited).toBe(2);
			expect(queueService.add).toHaveBeenCalledTimes(2);
		});
	});
});
