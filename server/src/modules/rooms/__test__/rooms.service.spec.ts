import { Test, TestingModule } from "@nestjs/testing";
import { RoomsService } from "../rooms.service";
import { PrismaService } from "src/config/database.config";
import { ConfigService } from "@nestjs/config";
import { getQueueToken } from "@nestjs/bullmq";
import { QUEUE_NAMES } from "src/queue/queue.constant";

describe("RoomsService", () => {
	let service: RoomsService;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RoomsService,
				{
					provide: PrismaService,
					useValue: {
						rooms: {
							create: jest.fn(),
						},
						participants: {
							create: jest.fn(),
						},
					},
				},
				{
					provide: getQueueToken(QUEUE_NAMES.ROOM_CLOSER),
					useValue: {
						emailQueue: {
							add: jest.fn(),
						},
					},
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<RoomsService>(RoomsService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("createRoom", () => {
		it("should create room with owner participant and return owner token", async () => {
			const createRoomDto = {
				roomName: "Lunch Vote",
				ownerEmail: "owner@test.com",
				ownerName: "John Doe",
				startAt: new Date("2026-01-15T12:00:00Z"),
				endAt: new Date("2026-01-15T13:00:00Z"),
			};

			const mockRoom = {
				id: "room-123",
				room_name: createRoomDto.roomName,
				owner_token: "token-abc",
				...createRoomDto,
			};

			jest.spyOn(prisma.rooms, "create").mockResolvedValue(mockRoom as any);

			const result = await service.createRoom(createRoomDto);

			expect(result).toHaveProperty("roomId", "room-123");
			expect(result).toHaveProperty("ownerToken", "token-abc");
			expect(prisma.rooms.create).toHaveBeenCalled();
		});
	});
});
