import { Processor, WorkerHost } from "@nestjs/bullmq";
import { ConfigService } from "@nestjs/config";
import { Job } from "bullmq";
import { ROOM_STATUS } from "prisma/generated/enums";
import { PrismaService } from "src/config/database.config";
import { JOB_NAMES, QUEUE_NAMES } from "src/utils/constant";

@Processor(QUEUE_NAMES.ROOM_CLOSER)
export class RoomCloserWorker extends WorkerHost {
	constructor(private prisma: PrismaService) {
		super();
	}
	async process(job: Job): Promise<any> {
		if (job.name === JOB_NAMES.CHECK_EXPIRED_ROOMS) {
			return this.checkExpriredRooms();
		}

		throw new Error(`Unknown job name: ${job.name}`);
	}

	private async checkExpriredRooms() {
		const now = new Date();

		const expiredRooms = await this.prisma.rooms.findMany({
			where: {
				status: ROOM_STATUS.ACTIVE,
				endAt: {
					lt: now,
				},
			},
			include: {
				votes: {
					include: {
						restaurant: true,
					},
				},
			},
		});

		for (const room of expiredRooms) {
			const voteCounts = room.votes.reduce(
				(acc, vote) => {
					const restaurantId = vote.restaurantId;
					if (acc[restaurantId]) {
						acc[restaurantId] += 1;
					} else {
						acc[restaurantId] = 1;
					}
					return acc;
				},
				{} as Record<string, number>,
			);

			const winningRestaurantId = Object.entries(voteCounts).reduce(
				(max, entry) => {
					const [restaurantId, count] = entry;
					return count > max[1] ? [restaurantId, count] : max;
				},
				["", 0],
			)[0];

			await this.prisma.rooms.update({
				where: { id: room.id },
				data: {
					status: ROOM_STATUS.CLOSED,
					winnerRestaurantId: winningRestaurantId || null,
				},
			});
		}
	}
}
