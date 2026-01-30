import { Test } from "@nestjs/testing";
import { InvitationsService } from "../invitations.service";
import { PrismaService } from "../../../config/database.config";
import { EmailWorker } from "../../../workers/email.worker";
import { ConfigService } from "@nestjs/config";
import { Queue } from "bullmq";
import { getQueueToken } from "@nestjs/bullmq";
import { QUEUE_NAMES, JOB_NAMES } from "../../../utils/constant";
import { JwtService } from "@nestjs/jwt";

/**
 * INTEGRATION TEST
 * Test toàn bộ flow: InvitationsService → Queue → EmailWorker
 *
 * Cách test:
 * 1. Mock Queue.add() để capture job data
 * 2. Lấy job data và pass vào EmailWorker.process()
 * 3. Verify email được gửi đúng
 */
describe("InvitationsService - Integration with Email Queue", () => {
	let service: InvitationsService;
	let prisma: PrismaService;
	let emailWorker: EmailWorker;
	let emailQueue: Queue;
	let jwtService: JwtService;
	let mockTransporter: any;

	beforeEach(async () => {
		// Mock email transporter
		mockTransporter = {
			sendMail: jest.fn().mockResolvedValue({ messageId: "test-id" }),
		};

		const module = await Test.createTestingModule({
			providers: [
				InvitationsService,
				EmailWorker,
				{
					provide: PrismaService,
					useValue: {
						rooms: { findUnique: jest.fn() },
						invitations: { createMany: jest.fn() },
					},
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn((key: string) => {
							const config: Record<string, any> = {
								EMAIL_HOST: "smtp.test.com",
								EMAIL_PORT: 587,
								EMAIL_USER: "test@test.com",
								EMAIL_PASS: "password",
								FRONTEND_URL: "http://localhost:3000",
							};
							return config[key];
						}),
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
						sign: jest.fn().mockReturnValue("mock-invite-token-123"),
					},
				},
			],
		}).compile();

		service = module.get(InvitationsService);
		prisma = module.get(PrismaService);
		emailWorker = module.get(EmailWorker);
		emailQueue = module.get(getQueueToken(QUEUE_NAMES.EMAIL));
		jwtService = module.get(JwtService);

		// Replace worker's transporter with mock
		(emailWorker as any).transporter = mockTransporter;
	});

	describe("Full flow: sendInvites → queue → email sent", () => {
		it("should queue jobs and process them to send emails", async () => {
			// Setup test data
			const dto = {
				roomId: "room-123",
				emails: ["user1@test.com", "user2@test.com"],
			};
			const ownerToken = "valid-jwt-token";

			const mockRoom = {
				id: "room-123",
				room_name: "Test Room",
				end_at: new Date("2026-01-15T13:00:00Z"),
				status: "ACTIVE",
				participants: [{ email: "owner@test.com", role: "HOST" }],
			};

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "owner@test.com" });
			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
			jest.spyOn(prisma.invitations, "createMany").mockResolvedValue({ count: 2 } as any);

			// Capture queued jobs
			const queuedJobs: any[] = [];
			(emailQueue.add as jest.Mock).mockImplementation((jobName, jobData) => {
				queuedJobs.push({ name: jobName, data: jobData });
				return Promise.resolve({ id: "job-id" });
			});

			// Step 1: Service queues jobs
			await service.sendInvites(dto, ownerToken);

			// Verify jobs were queued
			expect(emailQueue.add).toHaveBeenCalledTimes(2);
			expect(queuedJobs).toHaveLength(2);

			// Step 2: Simulate worker processing jobs
			for (const job of queuedJobs) {
				await emailWorker.process(job as any);
			}

			// Step 3: Verify emails were sent
			expect(mockTransporter.sendMail).toHaveBeenCalledTimes(2);

			// Verify first email
			expect(mockTransporter.sendMail).toHaveBeenCalledWith(
				expect.objectContaining({
					to: "user1@test.com",
					from: '"Vote App" <test@test.com>',
					subject: expect.stringContaining("Test Room"),
				}),
			);

			// Verify second email
			expect(mockTransporter.sendMail).toHaveBeenCalledWith(
				expect.objectContaining({
					to: "user2@test.com",
					from: '"Vote App" <test@test.com>',
					subject: expect.stringContaining("Test Room"),
				}),
			);
		});

		it("should include correct invite tokens in emails", async () => {
			const dto = {
				roomId: "room-123",
				emails: ["user1@test.com"],
			};
			const ownerToken = "valid-jwt-token";

			const mockRoom = {
				id: "room-123",
				room_name: "Test Room",
				end_at: new Date("2026-01-15T13:00:00Z"),
				status: "ACTIVE",
				participants: [{ email: "owner@test.com", role: "HOST" }],
			};

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "owner@test.com" });
			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
			jest.spyOn(prisma.invitations, "createMany").mockResolvedValue({ count: 1 } as any);

			const queuedJobs: any[] = [];
			(emailQueue.add as jest.Mock).mockImplementation((jobName, jobData) => {
				queuedJobs.push({ name: jobName, data: jobData });
				return Promise.resolve({ id: "job-id" });
			});

			await service.sendInvites(dto, ownerToken);

			// Process the job
			await emailWorker.process(queuedJobs[0] as any);

			// Verify email contains invite link with token
			const emailCall = mockTransporter.sendMail.mock.calls[0][0];
			expect(emailCall.html).toMatch(/\/join\/[a-f0-9-]+/);
		});

		it("should handle email sending failures", async () => {
			const dto = {
				roomId: "room-123",
				emails: ["user1@test.com"],
			};
			const ownerToken = "valid-jwt-token";

			const mockRoom = {
				id: "room-123",
				room_name: "Test Room",
				end_at: new Date("2026-01-15T13:00:00Z"),
				status: "ACTIVE",
				participants: [{ email: "owner@test.com", role: "HOST" }],
			};

			// Mock email sending failure
			mockTransporter.sendMail.mockRejectedValue(new Error("SMTP connection failed"));

			jest.spyOn(jwtService, "verify").mockReturnValue({ roomId: "room-123", email: "owner@test.com" });
			jest.spyOn(prisma.rooms, "findUnique").mockResolvedValue(mockRoom as any);
			jest.spyOn(prisma.invitations, "createMany").mockResolvedValue({ count: 1 } as any);

			const queuedJobs: any[] = [];
			(emailQueue.add as jest.Mock).mockImplementation((jobName, jobData) => {
				queuedJobs.push({ name: jobName, data: jobData });
				return Promise.resolve({ id: "job-id" });
			});

			await service.sendInvites(dto, ownerToken);

			// Worker should throw error when processing
			await expect(emailWorker.process(queuedJobs[0] as any)).rejects.toThrow("SMTP connection failed");
		});
	});
});
