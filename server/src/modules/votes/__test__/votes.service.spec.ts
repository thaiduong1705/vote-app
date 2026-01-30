import { Test, TestingModule } from "@nestjs/testing";
import { VotesService } from "../votes.service";
import { PrismaService } from "../../../config/database.config";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { ROOM_STATUS } from "prisma/generated/enums";

describe("VotesService", () => {
	let service: VotesService;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				VotesService,
				{
					provide: PrismaService,
					useValue: {
						rooms: { findUnique: jest.fn() },
						participants: { findUnique: jest.fn() },
						votes: { upsert: jest.fn(), findMany: jest.fn() },
					},
				},
			],
		}).compile();

		service = module.get<VotesService>(VotesService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("submitVote", () => {
		it("should submit a vote successfully", async () => {
			const dto = {
				roomId: "room-123",
				restaurantId: "restaurant-123",
			};
			const userId = "user-123";

			const mockRoom = {
				id: "room-123",
				status: ROOM_STATUS.ACTIVE,
			};

			const mockParticipant = {
				id: "user-123",
				email: "user@test.com",
				room_id: "room-123",
			};

			const mockVote = {
				id: "vote-123",
				room_id: "room-123",
				participant_id: "user-123",
				participant_email: "user@test.com",
				restaurant_id: "restaurant-123",
				voted_at: new Date(),
				restaurant: { id: "restaurant-123", name: "Test Restaurant" },
				participant: mockParticipant,
			};

			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
			jest.spyOn(prisma.participants, "findUnique").mockResolvedValue(mockParticipant as any);
			jest.spyOn(prisma.votes, "upsert").mockResolvedValue(mockVote as any);

			const result = await service.submitVote(dto, userId);

			expect(result).toEqual(mockVote);
			expect(prisma.rooms.findUnique).toHaveBeenCalledWith({
				where: { id: dto.roomId },
			});
			expect(prisma.participants.findUnique).toHaveBeenCalledWith({
				where: {
					id: userId,
					room_id: dto.roomId,
				},
			});
			expect(prisma.votes.upsert).toHaveBeenCalled();
		});

		it("should throw NotFoundException if room not found", async () => {
			const dto = {
				roomId: "room-123",
				restaurantId: "restaurant-123",
			};
			const userId = "user-123";

			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(null);

			await expect(service.submitVote(dto, userId)).rejects.toThrow(NotFoundException);
			await expect(service.submitVote(dto, userId)).rejects.toThrow("Room not found");
		});

		it("should throw BadRequestException if room is not active", async () => {
			const dto = {
				roomId: "room-123",
				restaurantId: "restaurant-123",
			};
			const userId = "user-123";

			const mockRoom = {
				id: "room-123",
				status: ROOM_STATUS.CLOSED,
			};

			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);

			await expect(service.submitVote(dto, userId)).rejects.toThrow(BadRequestException);
			await expect(service.submitVote(dto, userId)).rejects.toThrow("Room is not active");
		});

		it("should throw NotFoundException if participant not found in room", async () => {
			const dto = {
				roomId: "room-123",
				restaurantId: "restaurant-123",
			};
			const userId = "user-123";

			const mockRoom = {
				id: "room-123",
				status: ROOM_STATUS.ACTIVE,
			};

			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
			jest.spyOn(prisma.participants, "findUnique").mockResolvedValue(null);

			await expect(service.submitVote(dto, userId)).rejects.toThrow(NotFoundException);
			await expect(service.submitVote(dto, userId)).rejects.toThrow("Participant not found in the room");
		});
	});

	describe("getRoomVotes", () => {
		it("should return all votes for a room", async () => {
			const roomId = "room-123";

			const mockVotes = [
				{
					id: "vote-1",
					room_id: roomId,
					participant_id: "user-1",
					participant_email: "user1@test.com",
					restaurant_id: "restaurant-1",
					voted_at: new Date(),
					restaurant: { id: "restaurant-1", name: "Restaurant 1" },
					participant: { id: "user-1", email: "user1@test.com" },
				},
				{
					id: "vote-2",
					room_id: roomId,
					participant_id: "user-2",
					participant_email: "user2@test.com",
					restaurant_id: "restaurant-2",
					voted_at: new Date(),
					restaurant: { id: "restaurant-2", name: "Restaurant 2" },
					participant: { id: "user-2", email: "user2@test.com" },
				},
			];

			jest.spyOn(prisma.votes, "findMany").mockResolvedValue(mockVotes as any);

			const result = await service.getRoomVotes(roomId);

			expect(result).toEqual(mockVotes);
			expect(prisma.votes.findMany).toHaveBeenCalledWith({
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
		});

		it("should return empty array if no votes found", async () => {
			const roomId = "room-123";

			jest.spyOn(prisma.votes, "findMany").mockResolvedValue([]);

			const result = await service.getRoomVotes(roomId);

			expect(result).toEqual([]);
		});
	});
});
