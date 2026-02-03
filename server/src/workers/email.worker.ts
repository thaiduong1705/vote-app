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
		this.transporter = nodemailer.createTransport({
			host: this.configService.get<string>("EMAIL_HOST"),
			port: this.configService.get<number>("EMAIL_PORT"),
			secure: true,
			auth: {
				user: this.configService.get<string>("EMAIL_USER"),
				pass: this.configService.get<string>("EMAIL_PASS"),
			},
		});
	}
	async process(job: Job): Promise<any> {
		switch (job.name) {
			case JOB_NAMES.SEND_INVITE:
				return this.sendInvite(job.data);
			case JOB_NAMES.SEND_REMINDER:
				return this.sendReminder(job.data);
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

		await this.transporter.sendMail({
			from: `"Vote App" <${this.configService.get<string>("EMAIL_USER")}>`,
			to,
			subject: template.subject,
			text: template.text,
			html: template.html,
		});
		console.log(`Invite email sent to ${to} for room ${roomName}`);
	}

	private async sendReminder(data: any) {
		const { roomId } = data;
		// fetch user in that room id have not voted yet
		const users = await this.prismaService.participants.findMany({
			where: {
				room_id: data.roomId,
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

		for (const user of users) {
			const template = emailTemplates.reminder({
				roomLink,
				roomName: user.room.room_name,
				participantName: user.email, // Use email as identifier since name field doesn't exist
				endAt: new Date(user.room.end_at).toDateString(),
			});

			await this.transporter.sendMail({
				from: `"Vote App" <${this.configService.get<string>("EMAIL_USER")}>`,
				to: user.email,
				subject: template.subject,
				text: template.text,
				html: template.html,
			});
		}

		console.log(`Reminder emails sent to ${users.length} participants for room ID ${roomId}`);
	}
}
