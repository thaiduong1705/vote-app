import { Processor, WorkerHost } from "@nestjs/bullmq";
import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import { Job } from "bullmq";
import { JOB_NAMES, QUEUE_NAMES } from "src/utils/constant";
import { emailTemplates } from "src/templates/email.templates";
import { ConfigService } from "@nestjs/config";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { PrismaService } from "src/config/database.config";

@Processor(QUEUE_NAMES.EMAIL)
export class EmailWorker extends WorkerHost {
	private transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
	constructor(
		private configService: ConfigService,
		private readonly prismaService: PrismaService,
	) {
		super();
		try {
			const smtpPort = this.configService.get<number>("SMTP_PORT");
			// Port 465 = implicit TLS (secure: true), Port 587 = STARTTLS (secure: false)
			const isSecurePort = smtpPort === 465;

			this.transporter = nodemailer.createTransport({
				host: this.configService.get<string>("SMTP_HOST"),
				port: smtpPort,
				secure: isSecurePort, // true for 465 (implicit TLS), false for 587 (STARTTLS)
				auth: {
					user: this.configService.get<string>("SMTP_USER"),
					pass: this.configService.get<string>("SMTP_PASS"),
				},
			});
			console.log(`Email transporter created successfully (port: ${smtpPort}, secure: ${isSecurePort})`);
		} catch (error) {
			console.error("Error creating email transporter:", error);
		}
	}

	async process(job: Job): Promise<any> {
		switch (job.name) {
			case JOB_NAMES.SEND_INVITE:
				return await this.sendInvite(job.data);
			case JOB_NAMES.SEND_REMINDER:
				return await this.sendReminder(job.data);
			default:
				throw new Error(`Unknown job name: ${job.name}`);
		}
	}

	private async sendInvite(data: any) {
		const { to, roomName, ownerName, inviteToken, endAt } = data;
		const inviteLink = `${this.configService.get<string>("FRONTEND_URL")}/join/${inviteToken}`;

		const template = emailTemplates.invite({
			roomName,
			ownerName,
			inviteLink,
			endAt: new Date(endAt).toDateString(),
		});

		try {
			// Test connection before sending
			const testResult = await this.transporter.verify();
			if (!testResult) {
				throw new Error("SMTP connection verification failed");
			}

			await this.transporter.sendMail({
				from: `"Vote App" <${this.configService.get<string>("SMTP_USER")}>`,
				to,
				subject: template.subject,
				text: template.text,
				html: template.html,
			});
			console.log(`Invite email sent to ${to} for room "${roomName}"`);
		} catch (error: any) {
			console.error(`Error sending invite email to ${to}:`, {
				message: error?.message,
				code: error?.code,
				command: error?.command,
				response: error?.response,
				errno: error?.errno,
				syscall: error?.syscall,
			});
			throw error;
		}
	}

	private async sendReminder(data: any) {
		const { roomId } = data;

		try {
			// Test connection before sending
			const testResult = await this.transporter.verify();
			if (!testResult) {
				throw new Error("SMTP connection verification failed");
			}

			// Fetch users in that room who have not voted yet
			const users = await this.prismaService.participants.findMany({
				where: {
					room_id: roomId,
					votes: {
						none: {},
					},
				},
				select: {
					email: true,
					room: {
						select: {
							room_name: true,
							end_at: true,
						},
					},
				},
			});

			const roomLink = `${this.configService.get<string>("FRONTEND_URL")}/room/${roomId}`;

			let sentCount = 0;
			for (const user of users) {
				const template = emailTemplates.reminder({
					roomLink,
					roomName: user.room.room_name,
					participantName: user.email,
					endAt: new Date(user.room.end_at).toDateString(),
				});

				try {
					await this.transporter.sendMail({
						from: `"Vote App" <${this.configService.get<string>("SMTP_USER")}>`,
						to: user.email,
						subject: template.subject,
						text: template.text,
						html: template.html,
					});
					sentCount++;
					console.log(`Reminder email sent to ${user.email}`);
				} catch (userError: any) {
					console.error(`Error sending reminder to ${user.email}:`, {
						message: userError?.message,
						code: userError?.code,
					});
				}
			}

			console.log(`Reminder emails sent to ${sentCount}/${users.length} participants for room ID ${roomId}`);
		} catch (error: any) {
			console.error(`Error in sendReminder for room ${roomId}:`, {
				message: error?.message,
				code: error?.code,
				command: error?.command,
				response: error?.response,
			});
			throw error;
		}
	}
}
