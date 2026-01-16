import { PrismaPg } from "node_modules/@prisma/adapter-pg/dist";
import { PrismaClient } from "./generated";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
	const restaurants = [
		{ name: "Bún bò", menu_image_url: null },
		{ name: "Bún chả", menu_image_url: null },
		{ name: "Cơm tấm Long Xuyên", menu_image_url: null },
		{ name: "Cơm sườn xa", menu_image_url: null },
		{ name: "Hủ tiếu gần", menu_image_url: null },
		{ name: "Cơm gà xối mỡ", menu_image_url: null },
		{ name: "Bún riêu", menu_image_url: null },
		{ name: "Cơm gà xé", menu_image_url: null },
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
