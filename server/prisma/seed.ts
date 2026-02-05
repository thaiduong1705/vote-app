import { PrismaPg } from "node_modules/@prisma/adapter-pg/dist";
import { PrismaClient } from "../prisma/generated/client";
import "dotenv/config";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
	const restaurants = [
		{ name: "Bún bò" },
		{ name: "Bún chả" },
		{ name: "Cơm tấm Long Xuyên" },
		{ name: "Cơm sườn xa" },
		{ name: "Hủ tiếu gần" },
		{ name: "Cơm gà xối mỡ" },
		{ name: "Bún riêu" },
		{ name: "Cơm gà xé" },
	];

	for (const restaurant of restaurants) {
		await prisma.restaurants.upsert({
			where: { name: restaurant.name },
			update: {},
			create: restaurant,
		});
	}

	console.log("Seeding completed.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
