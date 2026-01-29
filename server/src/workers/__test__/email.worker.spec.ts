import { Test } from "@nestjs/testing";
import { EmailWorker } from "../email.worker";
import { ConfigService } from "@nestjs/config";
import { Job } from "bullmq";
import { JOB_NAMES } from "../../utils/constant";

describe("EmailWorker", () => {
	let worker: EmailWorker;
	let configService: ConfigService;
	let mockTransporter: any;

	beforeEach(async () => {
		// Mock transporter
		mockTransporter = {
			sendMail: jest.fn().mockResolvedValue({ messageId: "test-id" }),
		};

		const module = await Test.createTestingModule({
			providers: [
				EmailWorker,
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
			],
		}).compile();

		worker = module.get(EmailWorker);
		configService = module.get(ConfigService);

		// Replace real transporter with mock
		(worker as any).transporter = mockTransporter;
	});

	describe("process - SEND_INVITE", () => {
		it("should send invite email with correct data", async () => {
			const jobData = {
				to: "user@test.com",
				roomName: "Team Lunch",
				ownerName: "Alice",
				inviteToken: "token-123",
				endAt: new Date("2026-01-15T13:00:00Z"),
			};

			const mockJob = {
				name: JOB_NAMES.SEND_INVITE,
				data: jobData,
			} as Job;

			await worker.process(mockJob);

			expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
			expect(mockTransporter.sendMail).toHaveBeenCalledWith(
				expect.objectContaining({
					to: "user@test.com",
					from: '"Vote App" <test@test.com>',
					subject: expect.stringContaining("Team Lunch"),
				}),
			);
		});

		it("should include invite link in email", async () => {
			const jobData = {
				to: "user@test.com",
				roomName: "Team Lunch",
				ownerName: "Alice",
				inviteToken: "token-123",
				endAt: new Date("2026-01-15T13:00:00Z"),
			};

			const mockJob = {
				name: JOB_NAMES.SEND_INVITE,
				data: jobData,
			} as Job;

			await worker.process(mockJob);

			const callArgs = mockTransporter.sendMail.mock.calls[0][0];
			expect(callArgs.html).toContain("http://localhost:3000/join/token-123");
		});
	});

	describe("process - SEND_REMINDER", () => {
		it("should send reminder email with correct data", async () => {
			const jobData = {
				to: "user@test.com",
				roomName: "Team Lunch",
				participantName: "Bob",
				roomId: "room-123",
				endAt: new Date("2026-01-15T13:00:00Z"),
			};

			const mockJob = {
				name: JOB_NAMES.SEND_REMINDER,
				data: jobData,
			} as Job;

			await worker.process(mockJob);

			expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
			expect(mockTransporter.sendMail).toHaveBeenCalledWith(
				expect.objectContaining({
					to: "user@test.com",
					from: '"Vote App" <test@test.com>',
				}),
			);
		});

		it("should include room link in reminder email", async () => {
			const jobData = {
				to: "user@test.com",
				roomName: "Team Lunch",
				participantName: "Bob",
				roomId: "room-123",
				endAt: new Date("2026-01-15T13:00:00Z"),
			};

			const mockJob = {
				name: JOB_NAMES.SEND_REMINDER,
				data: jobData,
			} as Job;

			await worker.process(mockJob);

			const callArgs = mockTransporter.sendMail.mock.calls[0][0];
			expect(callArgs.html).toContain("http://localhost:3000/room/room-123");
		});
	});

	describe("process - unknown job", () => {
		it("should throw error for unknown job name", async () => {
			const mockJob = {
				name: "UNKNOWN_JOB",
				data: {},
			} as Job;

			await expect(worker.process(mockJob)).rejects.toThrow("Unknown job name: UNKNOWN_JOB");
		});
	});

	describe("error handling", () => {
		it("should throw error when email sending fails", async () => {
			mockTransporter.sendMail.mockRejectedValue(new Error("SMTP error"));

			const jobData = {
				to: "user@test.com",
				roomName: "Team Lunch",
				ownerName: "Alice",
				inviteToken: "token-123",
				endAt: new Date("2026-01-15T13:00:00Z"),
			};

			const mockJob = {
				name: JOB_NAMES.SEND_INVITE,
				data: jobData,
			} as Job;

			await expect(worker.process(mockJob)).rejects.toThrow("SMTP error");
		});
	});
});
